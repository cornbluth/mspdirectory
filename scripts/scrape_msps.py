"""
MSP scraping pipeline.

Sources (in order):
1. Datto partner locator  (https://www.datto.com/partners/find-a-partner/)
2. Google Maps search for "managed service provider <city>" for top 20 US metros
   (used as fallback / supplementary source)

Output: ~/sites/mspdirectory/data/msps.json
Deduplication: by normalized root domain
"""

import asyncio
import json
import os
import re
from urllib.parse import urlparse

from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

OUTPUT_FILE = os.path.expanduser("~/sites/mspdirectory/data/msps.json")

# Top 20 US metros (city, state abbreviation)
TOP_METROS = [
    ("New York", "NY"),
    ("Los Angeles", "CA"),
    ("Chicago", "IL"),
    ("Houston", "TX"),
    ("Phoenix", "AZ"),
    ("Philadelphia", "PA"),
    ("San Antonio", "TX"),
    ("San Diego", "CA"),
    ("Dallas", "TX"),
    ("San Jose", "CA"),
    ("Austin", "TX"),
    ("Jacksonville", "FL"),
    ("Fort Worth", "TX"),
    ("Columbus", "OH"),
    ("Charlotte", "NC"),
    ("Indianapolis", "IN"),
    ("San Francisco", "CA"),
    ("Seattle", "WA"),
    ("Denver", "CO"),
    ("Nashville", "TN"),
]

# ──────────────────────────────────────────────
# Utility helpers
# ──────────────────────────────────────────────

def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "")).strip()


def normalize_name(text: str) -> str:
    """Strip marketing suffixes before slugifying / deduping by name."""
    text = clean_text(text)
    # Remove common descriptor suffixes that appear in Google Maps titles
    text = re.sub(
        r"\s*[-|–]\s*(Managed\s+IT\s+Services?|IT\s+Support|IT\s+Services?|"
        r"MSP|Managed\s+Services?|Outsourced\s+IT|IT\s+Consulting)[^$]*$",
        "",
        text,
        flags=re.IGNORECASE,
    )
    return clean_text(text)


def root_domain(url: str) -> str:
    """Return e.g. 'example.com' from any URL, stripping www. and path."""
    if not url:
        return ""
    try:
        host = urlparse(url.strip()).netloc.lower()
        host = re.sub(r"^www\d*\.", "", host)
        return host
    except Exception:
        return ""


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


# ──────────────────────────────────────────────
# Fetch helper
# ──────────────────────────────────────────────

async def fetch(crawler, url: str, js_code: str = "", delay: float = 3.0):
    """Fetch a URL and return (markdown_str, html_str, success)."""
    try:
        result = await crawler.arun(
            url=url,
            config=CrawlerRunConfig(
                wait_for="body",
                page_timeout=40000,
                delay_before_return_html=delay,
                js_code=js_code or None,
            ),
        )
    except Exception as exc:
        print(f"  ✗ fetch error for {url}: {exc}")
        return "", "", False

    if not result.success:
        return "", "", False

    md = result.markdown
    if not isinstance(md, str):
        md = getattr(md, "raw_markdown", None) or str(md)

    html = getattr(result, "html", "") or getattr(result, "cleaned_html", "") or ""
    return (md or ""), (html or ""), True


# ──────────────────────────────────────────────
# Source 1 – Datto partner locator
# ──────────────────────────────────────────────

DATTO_URL = "https://www.datto.com/partners/find-a-partner/"

# JS to dismiss any cookie banner and wait for the partner list to render
DATTO_JS = """
await new Promise(r => setTimeout(r, 3000));
const btn = document.querySelector('[id*=cookie] button, .cookie-accept, #onetrust-accept-btn-handler');
if (btn) btn.click();
await new Promise(r => setTimeout(r, 2000));
"""


def parse_datto(html: str) -> list[dict]:
    """
    Extract partner cards from the Datto find-a-partner page.

    The page embeds partner data as JSON inside a <script> tag or renders
    cards with class patterns.  We try both approaches.
    """
    items: list[dict] = []

    # ── Attempt 1: embedded JSON ──────────────────────────────────────────
    # Datto sometimes inlines partner data as a JS variable or JSON blob
    json_match = re.search(
        r'partnerLocator["\']?\s*[:=]\s*(\[[\s\S]{100,}?\])\s*[,;]', html
    )
    if not json_match:
        json_match = re.search(r'"partners"\s*:\s*(\[[\s\S]{100,}?\])\s*[,}]', html)

    if json_match:
        try:
            raw = json.loads(json_match.group(1))
            for entry in raw:
                name = clean_text(entry.get("name") or entry.get("companyName") or "")
                if not name:
                    continue
                items.append(
                    {
                        "name": normalize_name(name),
                        "city": clean_text(entry.get("city") or ""),
                        "website": entry.get("website") or entry.get("url") or "",
                        "phone": clean_text(entry.get("phone") or ""),
                        "description": clean_text(entry.get("description") or ""),
                        "source": "datto",
                    }
                )
            if items:
                print(f"  ✓ Datto JSON: {len(items)} partners")
                return items
        except Exception:
            pass

    # ── Attempt 2: HTML card patterns ────────────────────────────────────
    # Partner cards typically look like:
    #   <div class="partner-card ..."><h3>Acme IT</h3>...</div>
    card_blocks = re.findall(
        r'<(?:div|article)[^>]+class="[^"]*partner[^"]*"[^>]*>([\s\S]{50,600}?)</(?:div|article)>',
        html,
        flags=re.IGNORECASE,
    )
    for block in card_blocks:
        name_m = re.search(r"<h[23][^>]*>(.*?)</h[23]>", block, re.S)
        name = clean_text(re.sub(r"<[^>]+>", "", name_m.group(1))) if name_m else ""
        if not name:
            continue
        phone_m = re.search(r"(\+?[\d][\d\s\-\(\)\.]{7,18}\d)", block)
        url_m = re.search(r'href="(https?://[^"]+)"', block)
        city_m = re.search(r"([A-Z][a-zA-Z\s]+),\s*([A-Z]{2})\b", block)
        items.append(
            {
                "name": normalize_name(name),
                "city": f"{city_m.group(1)}, {city_m.group(2)}" if city_m else "",
                "website": url_m.group(1) if url_m else "",
                "phone": phone_m.group(1) if phone_m else "",
                "description": "",
                "source": "datto",
            }
        )

    if items:
        print(f"  ✓ Datto HTML cards: {len(items)} partners")
    else:
        print("  ✗ Datto: no partner data extracted (page may have changed or 404)")

    return items


# ──────────────────────────────────────────────
# Source 2 – Google Maps
# ──────────────────────────────────────────────

# JS to dismiss consent dialog (EU / cookie banner) and wait for listings to
# fully render in the left panel.
MAPS_JS = """
await new Promise(r => setTimeout(r, 2000));
const consent = document.querySelector('button[aria-label*="Accept"], form[action*="consent"] button');
if (consent) consent.click();
await new Promise(r => setTimeout(r, 3000));
const feed = document.querySelector('[role=feed]') || document.querySelector('.m6QErb');
if (feed) {
  feed.scrollTop = 1500;
  await new Promise(r => setTimeout(r, 1500));
}
"""


def parse_maps_html(html: str, city: str, state: str) -> list[dict]:
    """
    Extract business listings from a rendered Google Maps search results page.

    Google Maps HTML is obfuscated but two reliable patterns exist:
    * aria-label="Visit <Name>'s website"  → company name
    * data-value="Website" … href="https://…"  → external website URL
    * Phone pattern: (NNN) NNN-NNNN
    """
    # Company names (in listing order)
    names_raw = re.findall(r'aria-label="Visit ([^"]+?)\'s website"', html)

    # External website links (attached to data-value="Website")
    websites_raw = re.findall(
        r'data-value="Website"[^>]*href="(https?://[^"]+)"', html
    )

    # Phone numbers: (NNN) NNN-NNNN or NNN-NNN-NNNN
    phones_raw = re.findall(
        r"(\(\d{3}\)\s*\d{3}[- ]\d{4}|\d{3}[-.]\d{3}[-.]\d{4})", html
    )

    # Zip the lists together; use empty string where data is missing
    count = max(len(names_raw), len(websites_raw))
    items = []
    for i in range(count):
        name = normalize_name(names_raw[i]) if i < len(names_raw) else ""
        if not name:
            continue
        website = websites_raw[i] if i < len(websites_raw) else ""
        phone = phones_raw[i] if i < len(phones_raw) else ""
        items.append(
            {
                "name": name,
                "city": f"{city}, {state}",
                "website": website,
                "phone": phone,
                "description": "",
                "source": "google_maps",
            }
        )

    return items


async def scrape_maps_city(crawler, city: str, state: str) -> list[dict]:
    query = f"managed service provider {city} {state}".replace(" ", "+")
    url = f"https://www.google.com/maps/search/{query}"
    print(f"  {city}, {state}", end=" ... ", flush=True)

    _, html, ok = await fetch(crawler, url, js_code=MAPS_JS, delay=7.0)
    if not ok or not html:
        print("FAILED")
        return []

    items = parse_maps_html(html, city, state)
    print(f"{len(items)} found")
    return items


# ──────────────────────────────────────────────
# Deduplication
# ──────────────────────────────────────────────

def dedupe(records: list[dict]) -> list[dict]:
    """
    Deduplicate by root domain.  If two records share a domain, keep the one
    with more complete data (more non-empty fields).
    Falls back to name-based dedup for records without a website.
    """
    by_domain: dict[str, dict] = {}
    no_domain: list[dict] = []

    for r in records:
        r.setdefault("name", "")
        r.setdefault("city", "")
        r.setdefault("website", "")
        r.setdefault("phone", "")
        r.setdefault("description", "")
        r.setdefault("source", "")
        r.setdefault("specialties", [])

        domain = root_domain(r["website"])
        if domain:
            existing = by_domain.get(domain)
            if existing is None:
                by_domain[domain] = r
            else:
                # Keep record with more non-empty fields; merge source tag
                def filled(x):
                    return sum(1 for v in x.values() if v)

                if filled(r) > filled(existing):
                    r["source"] = existing["source"] + "+" + r["source"]
                    by_domain[domain] = r
        else:
            no_domain.append(r)

    # Secondary dedup for domain-less records: by normalized name
    seen_names: set[str] = set()
    domain_names = {re.sub(r"[^a-z0-9]", "", r["name"].lower()) for r in by_domain.values()}

    extra: list[dict] = []
    for r in no_domain:
        key = re.sub(r"[^a-z0-9]", "", r["name"].lower())
        if key and key not in seen_names and key not in domain_names:
            seen_names.add(key)
            extra.append(r)

    out = list(by_domain.values()) + extra

    # Add slug
    for r in out:
        r["slug"] = slugify(r["name"])

    out.sort(key=lambda x: x["name"].lower())
    return out


# ──────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────

async def main():
    print("🚀 MSP scraper — Datto + Google Maps")
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    all_items: list[dict] = []
    browser_config = BrowserConfig(headless=True, verbose=False)

    async with AsyncWebCrawler(config=browser_config) as crawler:
        # ── Source 1: Datto partner locator ──────────────────────────────
        print("\n[1/2] Datto partner locator")
        _, datto_html, datto_ok = await fetch(
            crawler, DATTO_URL, js_code=DATTO_JS, delay=5.0
        )
        if datto_ok and datto_html:
            datto_items = parse_datto(datto_html)
            all_items.extend(datto_items)
        else:
            print("  ✗ Datto page unreachable — skipping to Google Maps fallback")

        await asyncio.sleep(2)

        # ── Source 2: Google Maps for top 20 metros ──────────────────────
        print(f"\n[2/2] Google Maps — {len(TOP_METROS)} metros")
        for city, state in TOP_METROS:
            items = await scrape_maps_city(crawler, city, state)
            all_items.extend(items)
            await asyncio.sleep(2)

    # ── Dedup & save ─────────────────────────────────────────────────────
    unique = dedupe(all_items)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(unique, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Saved {len(unique)} unique MSPs to {OUTPUT_FILE}")
    print("Sample (first 10):")
    for item in unique[:10]:
        print(f"  {item['name']:<40} {item['city']:<20} {item['source']}")


if __name__ == "__main__":
    asyncio.run(main())
