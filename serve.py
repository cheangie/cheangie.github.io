#!/usr/bin/env python3
"""Local dev server with caching disabled — reloads always show the latest.

Usage:
    python3 serve.py [port]     # default port 8767

Only for local development. GitHub Pages ignores this file and serves the
static HTML/CSS/JS directly.
"""
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8767
    print(f"Serving http://localhost:{port}  (no-cache) — Ctrl+C to stop")
    try:
        HTTPServer(("", port), NoCacheHandler).serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
