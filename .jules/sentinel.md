## 2025-05-22 - [Unsafe window.fetch monkey patching]
**Vulnerability:** Unsafe window.fetch monkey patching without proper bounds. Attackers could construct URLs that pass the `isAIEndpointUrl` check but point elsewhere.
**Learning:** Loose string matching (`url.includes`) is insufficient for identifying internal API calls in a fetch interceptor, especially when handling absolute URLs.
**Prevention:** Always parse the URL using the `URL` constructor, validate that the `origin` matches `window.location.origin`, and use strict `pathname` matching for identifying specific endpoints.
