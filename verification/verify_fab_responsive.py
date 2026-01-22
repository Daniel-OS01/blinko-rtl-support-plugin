from playwright.sync_api import sync_playwright
import os

def test_rtl_fab():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the mock HTML file
        mock_path = os.path.abspath("verification/test_rtl_fab.html")
        page.goto(f"file://{mock_path}")

        # Inject the CSS changes we made (simulating what the plugin does)
        # We need to simulate the responsive FAB style
        css = """
        .rtl-toggle-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            font-size: 18px;
        }
        @media (max-width: 768px) {
          .rtl-toggle-btn {
            width: 36px !important;
            height: 36px !important;
            font-size: 14px !important;
            bottom: 15px !important; /* Changed from top to bottom for mobile usually */
            top: auto !important;
            right: 15px !important;
          }
        }
        """
        page.add_style_tag(content=css)

        # Add the button
        page.evaluate("""
            const btn = document.createElement('button');
            btn.className = 'rtl-toggle-btn';
            btn.innerText = 'ع/א';
            document.body.appendChild(btn);
        """)

        # Set viewport to mobile size
        page.set_viewport_size({"width": 375, "height": 667})

        # Take screenshot of mobile view
        page.screenshot(path="verification/rtl_fab_mobile.png")

        # Set viewport to desktop size
        page.set_viewport_size({"width": 1280, "height": 800})

        # Take screenshot of desktop view
        page.screenshot(path="verification/rtl_fab_desktop.png")

        browser.close()

if __name__ == "__main__":
    test_rtl_fab()
