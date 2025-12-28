from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local HTML file
        file_path = os.path.abspath("verification/test_rtl.html")
        page.goto(f"file://{file_path}")

        # Hover over elements to trigger opacity transition if applicable
        page.hover(".rtl-debug-rtl")
        page.wait_for_timeout(500) # Wait for transition

        page.screenshot(path="verification/verification.png")
        browser.close()

if __name__ == "__main__":
    run()
