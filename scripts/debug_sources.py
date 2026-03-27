import asyncio
import json
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

URLS = [
    "https://www.channelfutures.com/msp-501/2024-msp-501-rankings",
    "https://www.msspalert.com/top-250-2024",
    "https://clutch.co/it-services/msp?page=1",
]

async def main():
    browser_config = BrowserConfig(headless=True, verbose=True)

    async with AsyncWebCrawler(config=browser_config) as crawler:
        for url in URLS:
            print("\n" + "=" * 80)
            print("URL:", url)

            result = await crawler.arun(
                url=url,
                config=CrawlerRunConfig(
                    wait_for="body",
                    page_timeout=45000,
                    delay_before_return_html=3.0,
                ),
            )

            print("SUCCESS:", result.success)
            if not result.success:
                print("ERROR:", getattr(result, "error_message", "unknown"))
                continue

            md = result.markdown
            if not isinstance(md, str):
                # Handle newer markdown object shapes safely
                md = getattr(md, "raw_markdown", None) or getattr(md, "fit_markdown", None) or str(md)

            html = getattr(result, "cleaned_html", None) or getattr(result, "html", "")

            print("\n--- MARKDOWN SAMPLE ---")
            print((md or "")[:4000])

            print("\n--- HTML SAMPLE ---")
            print((html or "")[:4000])

            with open(f"/tmp/debug_{url.split('//')[1].replace('/', '_').replace('?', '_')}.md", "w", encoding="utf-8") as f:
                f.write(md or "")

            with open(f"/tmp/debug_{url.split('//')[1].replace('/', '_').replace('?', '_')}.html", "w", encoding="utf-8") as f:
                f.write(html or "")

asyncio.run(main())
