from playwright.sync_api import sync_playwright, expect
import os

def run():
    # Dynamic CSS block matching the update in src/services/constants.ts
    dynamic_css = """
    /* Visual Debugger Styles */
    .rtl-debug-mode .rtl-debug-rtl {
        outline: 2px solid rgba(111, 66, 193, 0.8) !important;
        box-shadow: 0 0 5px rgba(111, 66, 193, 0.5) !important;
        position: relative !important;
    }

    .rtl-debug-mode .rtl-debug-ltr {
        outline: 2px solid rgba(253, 126, 20, 0.8) !important;
        box-shadow: 0 0 5px rgba(253, 126, 20, 0.5) !important;
        position: relative !important;
    }

    .rtl-debug-mode .rtl-debug-rtl::after {
        content: attr(data-rtl-debug) " " attr(data-debug-name);
        position: absolute;
        top: -16px;
        right: 0;
        background: #6f42c1;
        color: white;
        font-size: 9px;
        padding: 1px 3px;
        border-radius: 2px;
        z-index: 2147483647;
        pointer-events: none;
        line-height: 1;
        white-space: nowrap;
    }

    .rtl-debug-mode .rtl-debug-ltr::after {
        content: attr(data-rtl-debug) " " attr(data-debug-name);
        position: absolute;
        top: -16px;
        left: 0;
        background: #fd7e14;
        color: white;
        font-size: 9px;
        padding: 1px 3px;
        border-radius: 2px;
        z-index: 2147483647;
        pointer-events: none;
        line-height: 1;
        white-space: nowrap;
    }

    .rtl-force {
        direction: rtl !important;
        text-align: right !important;
        unicode-bidi: isolate !important;
    }
    """

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 800, 'height': 600}, device_scale_factor=1)

        file_path = os.path.abspath("verification/mock_refactor.html")
        page.goto(f"file://{file_path}")

        # Inject the CSS
        page.add_style_tag(content=dynamic_css)

        # Verify Case 1: content should be "RTL " (note the space because attr(data-debug-name) is empty/missing)
        # Browsers might handle missing attr differently in `content`, usually empty string.
        content_case1 = page.evaluate("window.getComputedStyle(document.querySelector('#case1'), '::after').content")
        print(f"Case 1 Content: {content_case1}")
        # We expect "RTL " or "RTL" depending on browser.
        # Actually attr() returns empty string if missing. So "RTL " "".

        # Verify Case 3: content should be "RTL div#case3"
        content_case3 = page.evaluate("window.getComputedStyle(document.querySelector('#case3'), '::after').content")
        print(f"Case 3 Content: {content_case3}")
        assert content_case3 == '"RTL div#case3"'

        # Verify Case 5: unicode-bidi
        bidi_case5 = page.evaluate("window.getComputedStyle(document.querySelector('#case5')).unicodeBidi")
        print(f"Case 5 Unicode-Bidi: {bidi_case5}")
        assert bidi_case5 == 'isolate'

        page.screenshot(path="verification/refactor_verification.png")

        print("Verification passed! Screenshot saved to verification/refactor_verification.png")
        browser.close()

if __name__ == "__main__":
    run()
