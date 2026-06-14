## 2026-06-14 - Prevent DoS from Large RegEx Processing
**Vulnerability:** Processing arbitrarily large inputs via regular expressions (like checking for mixed RTL/LTR content on paste) can lead to a Denial of Service (DoS) due to high CPU utilization.
**Learning:** In a security-focused environment, always enforce bounds on input data length before executing expensive operations, such as regex matches, on that data.
**Prevention:** Introduce early exits by adding simple `text.length > MAX_ALLOWED` validations prior to passing inputs to text processors or parsers.
