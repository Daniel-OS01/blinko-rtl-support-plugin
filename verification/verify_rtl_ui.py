from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local HTML file
        cwd = os.getcwd()
        file_path = f"file://{cwd}/verification/mock_rtl.html"
        print(f"Loading: {file_path}")
        page.goto(file_path)

        # Take screenshot of the top area where the button should be
        page.screenshot(path="verification/rtl_ui_verification.png")

        # Verify button styles via JS (double check)
        btn_pos = page.eval_on_selector('.rtl-toggle-btn', 'el => window.getComputedStyle(el).position')
        btn_top = page.eval_on_selector('.rtl-toggle-btn', 'el => window.getComputedStyle(el).top')
        btn_right = page.eval_on_selector('.rtl-toggle-btn', 'el => window.getComputedStyle(el).right')

        print(f"Button Position: {btn_pos}, Top: {btn_top}, Right: {btn_right}")

        # Verify RTL application
        p_rtl_align = page.eval_on_selector('p.rtl-force', 'el => window.getComputedStyle(el).textAlign')
        p_rtl_dir = page.eval_on_selector('p.rtl-force', 'el => window.getComputedStyle(el).direction')

        print(f"Paragraph RTL - Align: {p_rtl_align}, Direction: {p_rtl_dir}")

        browser.close()

if __name__ == "__main__":
    run()
