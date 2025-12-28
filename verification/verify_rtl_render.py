
import os
from playwright.sync_api import sync_playwright

def verify_rtl_support():
    # Construct the absolute path to the reproduction HTML file
    file_path = os.path.abspath("verification/repro_v2.html")
    file_url = f"file://{file_path}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the HTML file
        page.goto(file_url)

        # Inject the updated Dynamic CSS (Simulating the plugin's action)
        dynamic_css = """
        /* Dynamic CSS Rules (Simulated from RTLService) */

        /* Applied when RTL is detected */
        .rtl-force {
            direction: rtl !important;
            text-align: start !important;
            unicode-bidi: embed !important;
        }

        /* Applied when LTR is detected */
        .ltr-force {
            direction: ltr !important;
            text-align: start !important;
            unicode-bidi: embed !important;
        }

        /* Code Blocks: Default to LTR usually, but respect RTL if detected */
        pre.rtl-force, code.rtl-force, .code-block.rtl-force {
            direction: rtl !important;
            text-align: right !important;
        }
        pre.ltr-force, code.ltr-force, .code-block.ltr-force {
            direction: ltr !important;
            text-align: left !important;
        }

        /* Checkboxes and Labels */
        .checkbox-label.rtl-force, label.rtl-force {
            direction: rtl !important;
            text-align: right !important;
            margin-right: 5px; /* Adjust spacing */
        }
        input[type="checkbox"] + label.rtl-force {
            margin-left: 0;
            margin-right: 0.5em;
        }

        /* Inputs and Textareas */
        input.rtl-force, textarea.rtl-force {
            direction: rtl !important;
            text-align: right !important;
        }
        input.ltr-force, textarea.ltr-force {
            direction: ltr !important;
            text-align: left !important;
        }

        /* Buttons and Role Button */
        button.rtl-force, .btn.rtl-force, [role="button"].rtl-force {
            direction: rtl !important;
            text-align: center !important; /* Buttons usually center text */
        }

        /* Visual Debugger - RTL Detected */
        .rtl-debug-rtl {
            outline: 2px solid rgba(220, 53, 69, 0.8) !important;
            box-shadow: 0 0 5px rgba(220, 53, 69, 0.5) !important;
            position: relative !important;
        }
        .rtl-debug-rtl::after {
            content: "RTL";
            position: absolute;
            top: -18px;
            right: 0;
            background: #dc3545;
            color: white;
            font-size: 10px;
            font-weight: bold;
            padding: 2px 4px;
            border-radius: 3px;
            z-index: 2147483647;
            pointer-events: none;
            line-height: 1;
            white-space: nowrap;
        }

        .rtl-debug-ltr {
            outline: 2px solid rgba(0, 123, 255, 0.8) !important;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5) !important;
            position: relative !important;
        }
        .rtl-debug-ltr::after {
            content: "LTR";
            position: absolute;
            top: -18px;
            left: 0;
            background: #007bff;
            color: white;
            font-size: 10px;
            font-weight: bold;
            padding: 2px 4px;
            border-radius: 3px;
            z-index: 2147483647;
            pointer-events: none;
            line-height: 1;
            white-space: nowrap;
        }
        """
        page.add_style_tag(content=dynamic_css)

        # Apply classes based on "Detection" (Simulating the RTLService logic)
        # 1. Code Blocks
        page.evaluate("""() => {
            const pres = document.querySelectorAll('pre');
            // First pre: pure English -> should be LTR
            pres[0].classList.add('ltr-force', 'rtl-debug-ltr');

            // Second pre: Mixed Hebrew -> should be RTL (or at least detected as RTL content)
            // Based on our logic: "For code blocks, we bias towards LTR unless strong RTL is detected"
            // The mixed block has Hebrew. Let's assume detector returns true.
            pres[1].classList.add('rtl-force', 'rtl-debug-rtl');
        }""")

        # 2. Inputs
        page.evaluate("""() => {
            const inputs = document.querySelectorAll('input[type="text"]');
            inputs[0].classList.add('ltr-force', 'rtl-debug-ltr'); // English
            inputs[1].classList.add('rtl-force', 'rtl-debug-rtl'); // Hebrew

            const textareas = document.querySelectorAll('textarea');
            textareas[0].classList.add('ltr-force', 'rtl-debug-ltr'); // English
            textareas[1].classList.add('rtl-force', 'rtl-debug-rtl'); // Hebrew
        }""")

        # 3. Checkboxes (Labels)
        page.evaluate("""() => {
            const labels = document.querySelectorAll('.checkbox-label');
            labels[0].classList.add('ltr-force', 'rtl-debug-ltr');
            labels[1].classList.add('rtl-force', 'rtl-debug-rtl');
        }""")

        # 4. Buttons
        page.evaluate("""() => {
            const buttons = document.querySelectorAll('button, .btn');
            // Assuming buttons[0] is English
            buttons[0].classList.add('ltr-force', 'rtl-debug-ltr');
            // buttons[1] Hebrew
            buttons[1].classList.add('rtl-force', 'rtl-debug-rtl');
            // buttons[2] English div btn
            buttons[2].classList.add('ltr-force', 'rtl-debug-ltr');
            // buttons[3] Hebrew div btn
            buttons[3].classList.add('rtl-force', 'rtl-debug-rtl');
        }""")

        # Take screenshot
        output_path = "verification/rtl_verification.png"
        page.screenshot(path=output_path, full_page=True)
        print(f"Screenshot saved to {output_path}")

        browser.close()

if __name__ == "__main__":
    verify_rtl_support()
