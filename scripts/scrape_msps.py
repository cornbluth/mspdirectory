import asyncio
import json
import os
import re
from urllib.parse import urlparse

from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

OUTPUT_FILE = os.path.expanduser("~/sites/mspdirectory/data/msps.json")

SOURCES = [
    ("mssp_alert", "https://www.msspalert.com/top-250-2024"),
    ("clutch", "https://clutch.co/it-services/msp?page=1"),
    ("clutch", "https://clutch.co/it-services/msp?page=2"),
    ("clutch", "https://clutch.co/it-services/msp?page=3"),
]

def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "")).strip()

def normalize_name(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "", name.lower())

def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")

def likely_company_name(text: str) -> bool:
    text = clean_text(text)

    if not text or len(text) < 3 or len(text) > 80:
        return False

    lower = text.lower()

    bad_phrases = [
        "newsletter", "sign up", "subscribe", "advertise",
        "events", "analytics", "desktop", "iot", "artificial intelligence",
        "menu", "navigation", "filter", "sort", "login", "sign in",
        "channel futures", "resources", "webcasts", "sponsors",
        "learn more", "see all", "related topics", "recent in",
        "home", "search", "post a project", "get matched",
        "pricing", "packages", "services guide", "leaders matrix",
        "all companies", "view shortlist", "view new messages",
        "about", "contact", "rss", "view conferences", "create account"
    ]

    if lower in ["about", "contact", "rss"]:
        return False

    for bad in bad_phrases:
        if bad in lower:
            return False

    if len(text.split()) > 6:
        return False

    if any(x in text for x in ["|", ">", "<", "{", "}", "="]):
        return False

    if text.startswith("!["):
        return False

    if not re.search(r"[A-Za-z]", text):
        return False

    return True

def dedupe(records):
    seen = set()
    out = []

    for r in records:
        name = clean_text(r.get("name", ""))
        key = normalize_name(name)

        if not key or key in seen:
            continue

        seen.add(key)

        r["name"] = name
        r["slug"] = slugify(name)
        r.setdefault("city", "")
        r.setdefault("description", "")
        r.setdefault("website", "")
        r.setdefault("phone", "")
        r.setdefault("source", "")
        r.setdefault("specialties", [])
        r.setdefault("certifications", [])
        r.setdefault("techStack", [])

        out.append(r)

    return out

def parse_mssp_markdown(md: str):
    items = []

    matches = re.findall(r"\*\s*\d+\s+\[([^\]]+)\]\((https?://[^)]+)\)", md)

    for name, url in matches:
        name = clean_text(name)

        if likely_company_name(name):
            items.append({
                "name": name,
                "website": url,
                "source": "mssp_alert"
            })

    return items

def parse_clutch_html(html: str):
    items = []

    matches = re.findall(
        r"<h3[^>]*>\s*<a[^>]*>(.*?)</a>",
        html,
        flags=re.I | re.S
    )

    for inner in matches:
        text = clean_text(re.sub(r"<[^>]+>", "", inner))

        if likely_company_name(text):
            items.append({
                "name": text,
                "source": "clutch"
            })

    return items

async def fetch_page(crawler, url):
    result = await crawler.arun(
        url=url,
        config=CrawlerRunConfig(
            wait_for="body",
            page_timeout=45000,
            delay_before_return_html=3.0,
        ),
    )

    if not result.success:
        return "", ""

    md = result.markdown
    if not isinstance(md, str):
        md = getattr(md, "raw_markdown", None) or str(md)

    html = getattr(result, "cleaned_html", None) or getattr(result, "html", "")

    return md or "", html or ""

async def main():
    print("🚀 MSP scraper (clean version)")
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    all_items = []
    browser_config = BrowserConfig(headless=True, verbose=False)

    async with AsyncWebCrawler(config=browser_config) as crawler:
        for source_name, url in SOURCES:
            print(f"\nScraping {source_name}: {url}")

            md, html = await fetch_page(crawler, url)

            if source_name == "mssp_alert":
                items = parse_mssp_markdown(md)
            else:
                items = parse_clutch_html(html)

            print(f"  -> extracted {len(items)} items")
            all_items.extend(items)

            await asyncio.sleep(2)

    unique = dedupe(all_items)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(unique, f, indent=2)

    print(f"\n✅ Saved {len(unique)} MSPs to {OUTPUT_FILE}")

    for item in unique[:10]:
        print(f"- {item['name']} | {item['source']}")

if __name__ == "__main__":
    asyncio.run(main())
