from playwright.sync_api import sync_playwright
import os

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local HTML file
        # ensure full path
        cwd = os.getcwd()
        url = f"file://{cwd}/verification/index.html"
        print(f"Navigating to {url}")
        page.goto(url)

        # 1. Screenshot LTR (Light)
        page.screenshot(path="verification/1_ltr_light.png")
        print("Captured LTR Light")

        # 2. Toggle RTL
        page.click("#toggle-rtl")
        page.screenshot(path="verification/2_rtl_light.png")
        print("Captured RTL Light")

        # 3. Toggle Dark Mode (still RTL)
        page.click("#toggle-dark")
        page.screenshot(path="verification/3_rtl_dark.png")
        print("Captured RTL Dark")

        # 4. Toggle LTR (Dark)
        page.click("#toggle-rtl")
        page.screenshot(path="verification/4_ltr_dark.png")
        print("Captured LTR Dark")

        browser.close()

if __name__ == "__main__":
    run_verification()
