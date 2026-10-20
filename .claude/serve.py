# Minimal static file server for previewing the site locally.
import os, sys
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()
    def log_message(self, *a):
        pass

ThreadingHTTPServer(("127.0.0.1", port), partial(Handler, directory=root)).serve_forever()
