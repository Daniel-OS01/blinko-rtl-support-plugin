from playwright.sync_api import sync_playwright, expect
import os

def run():
    # Read the actual CSS file to test
    # Adjust path if running from root
    css_path = os.path.abspath("src/assets/styles/Blinko-RTL.css")
    if not os.path.exists(css_path):
        print(f"Error: CSS file not found at {css_path}")
        return

    with open(css_path, "r") as f:
        css_content = f.read()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop Test
        print("Running Desktop Test...")
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        file_path = os.path.abspath("verification/mock_verification.html")
        page.goto(f"file://{file_path}")

        # Inject CSS
        page.add_style_tag(content=css_content)

        # Verify RTL class application
        p_rtl = page.locator("#p-rtl")
        expect(p_rtl).to_have_class("rtl-force rtl-debug-rtl")

        page.screenshot(path="verification/desktop_verification.png", full_page=True)
        page.close()

        # 2. Mobile Emulation Test
        print("Running Mobile Test...")
        iphone_12 = p.devices['iPhone 12']
        mobile_context = browser.new_context(**iphone_12)
        mobile_page = mobile_context.new_page()
        mobile_page.goto(f"file://{file_path}")

        # Inject CSS
        mobile_page.add_style_tag(content=css_content)

        # Simulate enabling "Mobile View" setting (adding class)
        mobile_page.evaluate("document.body.classList.add('blinko-rtl-mobile-view')")

        # Verify Overflow Hidden (Mobile View Feature)
        body = mobile_page.locator("body")
        expect(body).to_have_css("overflow-x", "hidden")

        # Verify FAB styles via media query
        mobile_page.evaluate("""
            const btn = document.createElement('button');
            btn.className = 'rtl-toggle-btn';
            document.body.appendChild(btn);
        """)
        fab = mobile_page.locator(".rtl-toggle-btn")
        # Media query sets width to 36px for max-width 768px
        expect(fab).to_have_css("width", "36px")

        mobile_page.screenshot(path="verification/mobile_verification.png", full_page=True)
        mobile_context.close()

        print("Verification complete. Screenshots saved.")
        browser.close()

if __name__ == "__main__":
    run()
