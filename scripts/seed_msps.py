"""
Seed MSP data using the Google Maps Places API.

Searches "managed service provider" and "IT support" across the top 20 US cities.
Collects: name, website, phone, address, city, state, rating, review_count,
          google_maps_url, slug.
Deduplicates by website domain, then saves to data/msps.json.
"""

import json
import os
import re
import time
from urllib.parse import urlparse

import requests

API_KEY = "AIzaSyCMEBvIMvNh1qEXNe1Qa6_oNXBM2ytMkqo"
OUTPUT_FILE = os.path.expanduser("~/sites/mspdirectory/data/msps.json")

CITIES = [
    ("New York", "NY"),
    ("Los Angeles", "CA"),
    ("Chicago", "IL"),
    ("Houston", "TX"),
    ("Phoenix", "AZ"),
    ("Philadelphia", "PA"),
    ("Dallas", "TX"),
    ("San Antonio", "TX"),
    ("San Diego", "CA"),
    ("Austin", "TX"),
    ("Charlotte", "NC"),
    ("Columbus", "OH"),
    ("Seattle", "WA"),
    ("Denver", "CO"),
    ("Boston", "MA"),
    ("Atlanta", "GA"),
    ("Miami", "FL"),
    ("Minneapolis", "MN"),
    ("Portland", "OR"),
    ("Las Vegas", "NV"),
]

SEARCH_TERMS = [
    "managed service provider",
    "IT support",
]

TEXTSEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"
DETAIL_FIELDS = "name,website,formatted_phone_number,url,formatted_address,rating,user_ratings_total"


# ── Helpers ───────────────────────────────────────────────────────────────────

def root_domain(url: str) -> str:
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


def normalize_name(text: str) -> str:
    text = re.sub(r"\s+", " ", (text or "")).strip()
    text = re.sub(
        r"\s*[-|–]\s*(Managed\s+IT\s+Services?|IT\s+Support|IT\s+Services?|"
        r"MSP|Managed\s+Services?|Outsourced\s+IT|IT\s+Consulting)[^$]*$",
        "",
        text,
        flags=re.IGNORECASE,
    )
    return re.sub(r"\s+", " ", text).strip()


def parse_city_state(formatted_address: str) -> tuple[str, str]:
    """Extract city and state from a formatted address string."""
    # Typical format: "123 Main St, CityName, ST 12345, USA"
    parts = [p.strip() for p in formatted_address.split(",")]
    city = ""
    state = ""
    for part in reversed(parts):
        # Match "ST 12345" or just "ST"
        m = re.match(r"^([A-Z]{2})\s*\d*$", part.strip())
        if m:
            state = m.group(1)
        elif state and not city:
            city = part.strip()
    return city, state


# ── API calls ─────────────────────────────────────────────────────────────────

def text_search(query: str, page_token: str = None) -> dict:
    params = {"query": query, "key": API_KEY, "type": "establishment"}
    if page_token:
        params["pagetoken"] = page_token
    try:
        r = requests.get(TEXTSEARCH_URL, params=params, timeout=15)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        print(f"    textsearch error: {e}")
        return {}


def place_details(place_id: str) -> dict:
    params = {"place_id": place_id, "fields": DETAIL_FIELDS, "key": API_KEY}
    try:
        r = requests.get(DETAILS_URL, params=params, timeout=15)
        r.raise_for_status()
        data = r.json()
        return data.get("result", {})
    except Exception as e:
        print(f"    details error for {place_id}: {e}")
        return {}


# ── Search one city / term combo ──────────────────────────────────────────────

def search_city(city: str, state: str, term: str) -> list[dict]:
    query = f"{term} {city} {state}"
    print(f"  Searching: {query!r}", end=" ... ", flush=True)

    results = []
    page_token = None
    pages = 0

    while pages < 3:  # API allows up to 3 pages (60 results)
        if page_token:
            time.sleep(2)  # Required delay before using page token
        data = text_search(query, page_token)
        status = data.get("status", "")
        if status not in ("OK", "ZERO_RESULTS"):
            print(f"[{status}]")
            break

        candidates = data.get("results", [])
        results.extend(candidates)
        pages += 1

        page_token = data.get("next_page_token")
        if not page_token:
            break

    print(f"{len(results)} candidates")
    return results


# ── Enrich with Place Details ─────────────────────────────────────────────────

def enrich(candidates: list[dict], default_city: str, default_state: str) -> list[dict]:
    enriched = []
    for place in candidates:
        place_id = place.get("place_id", "")
        if not place_id:
            continue

        details = place_details(place_id)
        time.sleep(0.05)  # Gentle rate-limit

        name = normalize_name(details.get("name") or place.get("name") or "")
        if not name:
            continue

        formatted_address = details.get("formatted_address") or place.get("formatted_address", "")
        city, state = parse_city_state(formatted_address)
        city = city or default_city
        state = state or default_state

        enriched.append({
            "name": name,
            "address": formatted_address,
            "city": city,
            "state": state,
            "website": details.get("website", ""),
            "phone": details.get("formatted_phone_number", ""),
            "rating": details.get("rating") or place.get("rating"),
            "review_count": details.get("user_ratings_total") or place.get("user_ratings_total"),
            "google_maps_url": details.get("url", ""),
            "slug": slugify(name),
            "source": "google_maps_api",
        })

    return enriched


# ── Deduplication ─────────────────────────────────────────────────────────────

def dedupe(records: list[dict]) -> list[dict]:
    by_domain: dict[str, dict] = {}
    no_domain: list[dict] = []

    def filled(r: dict) -> int:
        return sum(1 for v in r.values() if v)

    for r in records:
        domain = root_domain(r.get("website", ""))
        if domain:
            existing = by_domain.get(domain)
            if existing is None:
                by_domain[domain] = r
            elif filled(r) > filled(existing):
                by_domain[domain] = r
        else:
            no_domain.append(r)

    # Secondary dedup: by normalized name (for records without a website)
    seen_names: set[str] = {
        re.sub(r"[^a-z0-9]", "", r["name"].lower()) for r in by_domain.values()
    }
    extra: list[dict] = []
    seen_extra: set[str] = set()
    for r in no_domain:
        key = re.sub(r"[^a-z0-9]", "", r["name"].lower())
        if key and key not in seen_names and key not in seen_extra:
            seen_extra.add(key)
            extra.append(r)

    result = list(by_domain.values()) + extra
    result.sort(key=lambda x: x["name"].lower())
    return result


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("🚀 MSP seeder — Google Maps Places API")
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    all_candidates: list[dict] = []

    for city, state in CITIES:
        print(f"\n[{city}, {state}]")
        for term in SEARCH_TERMS:
            candidates = search_city(city, state, term)
            enriched = enrich(candidates, city, state)
            print(f"    → {len(enriched)} enriched")
            all_candidates.extend(enriched)
            time.sleep(0.5)

    unique = dedupe(all_candidates)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(unique, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Saved {len(unique)} unique MSPs to {OUTPUT_FILE}")
    print("\nSample (first 10):")
    for item in unique[:10]:
        print(f"  {item['name']:<40} {item['city']}, {item['state']}")


if __name__ == "__main__":
    main()
