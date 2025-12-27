from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Load the local HTML file
    file_path = os.path.abspath("verification/index.html")
    page.goto(f"file://{file_path}")

    # Wait for content
    expect(page.locator("h1")).to_be_visible()

    # Check if the mock button exists
    btn = page.locator(".rtl-toggle-btn")
    expect(btn).to_be_visible()

    # Click the button (simulate toggle)
    btn.click()

    # Check if it got active class (simulated in JS)
    expect(btn).to_have_class("rtl-toggle-btn active")

    # Take screenshot
    page.screenshot(path="verification/rtl_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
