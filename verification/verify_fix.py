from playwright.sync_api import sync_playwright, expect
import os
import re

def get_file_content(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def run():
    # Read CSS files
    blinko_rtl_css = get_file_content("src/assets/styles/Blinko-RTL.css")

    # Extract DEFAULT_DYNAMIC_CSS from constants.ts (simplistic extraction)
    constants_ts = get_file_content("src/services/constants.ts")
    match = re.search(r'export const DEFAULT_DYNAMIC_CSS = `(.*?)`;', constants_ts, re.DOTALL)
    if match:
        default_dynamic_css = match.group(1)
    else:
        print("Error: Could not extract DEFAULT_DYNAMIC_CSS")
        return

    # Create HTML
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Fix Verification</title>
        <style>
            /* Inject Blinko-RTL.css */
            {blinko_rtl_css}
        </style>
        <style>
            /* Inject DEFAULT_DYNAMIC_CSS */
            {default_dynamic_css}
        </style>
    </head>
    <body>
        <div id="container">
            <!-- Test Generic Paragraph -->
            <p id="generic-p" class="rtl-force">This should be RTL</p>

            <!-- Test Button -->
            <button id="toggle-btn" class="rtl-toggle-btn">Toggle</button>

            <!-- Test Button with rtl-force -->
            <button id="forced-btn" class="rtl-force">Forced RTL Button</button>
        </div>
    </body>
    </html>
    """

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_content(html_content)

        # 1. Verify Generic Paragraph RTL
        p_el = page.locator("#generic-p")
        direction = p_el.evaluate("el => getComputedStyle(el).direction")
        print(f"Generic Paragraph Direction: {direction}")
        if direction != "rtl":
            print("FAIL: Generic Paragraph is not RTL")
            exit(1)

        # 2. Verify Toggle Button Position
        btn = page.locator("#toggle-btn")
        position = btn.evaluate("el => getComputedStyle(el).position")
        bottom = btn.evaluate("el => getComputedStyle(el).bottom")
        right = btn.evaluate("el => getComputedStyle(el).right")

        print(f"Toggle Button Position: {position}, Bottom: {bottom}, Right: {right}")

        if position != "fixed":
            print("FAIL: Toggle Button is not fixed position")
            exit(1)

        if bottom != "20px" or right != "20px":
             print("FAIL: Toggle Button coordinates are wrong")
             # Note: might vary if computed style converts to pixels differently, but 20px is standard
             exit(1)

        # 3. Verify Forced Button RTL (should override Blinko-RTL.css LTR force)
        forced_btn = page.locator("#forced-btn")
        btn_direction = forced_btn.evaluate("el => getComputedStyle(el).direction")
        print(f"Forced Button Direction: {btn_direction}")

        if btn_direction != "rtl":
             print("FAIL: Forced Button is not RTL (CSS specificity issue?)")
             exit(1)

        print("SUCCESS: All verification checks passed.")
        browser.close()

if __name__ == "__main__":
    run()
