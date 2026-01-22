from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the mock verification file
        file_path = os.path.abspath("verification/mock_verification.html")
        page.goto(f"file://{file_path}")

        # Verify RTL class application
        p_rtl = page.locator("#p-rtl")
        expect(p_rtl).to_have_class("rtl-force rtl-debug-rtl")

        # Verify LTR class application
        p_ltr = page.locator("#p-ltr")
        expect(p_ltr).to_have_class("ltr-force rtl-debug-ltr")

        # Verify Code Block
        # In the updated mock, code block contains Hebrew so it should be RTL
        code_block = page.locator("#code-block")
        expect(code_block).to_have_class("rtl-force rtl-debug-rtl")

        # Take screenshot
        page.screenshot(path="verification/verification.png", full_page=True)
        print("Screenshot saved to verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()
