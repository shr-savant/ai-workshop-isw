#!/usr/bin/env python3
"""
Workshop proxy server — serves static files and proxies /api/claude to Anthropic.
Run:  python3 server.py
Requires: Python 3.6+  (no pip installs needed)
"""
import http.server
import json
import os
import urllib.request
import urllib.error
from pathlib import Path

# Load .env without python-dotenv
_env = Path(__file__).parent / '.env'
if _env.exists():
    for line in _env.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            key, _, val = line.partition('=')
            os.environ.setdefault(key.strip(), val.strip())

PORT    = int(os.environ.get('PORT', 3000))
API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
ROOT    = Path(__file__).parent


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path != '/api/claude':
            self.send_error(404)
            return

        if not API_KEY:
            self._send_json(500, {'error': {'message': 'ANTHROPIC_API_KEY not set in .env'}})
            return

        length = int(self.headers.get('Content-Length', 0))
        body   = self.rfile.read(length)

        req = urllib.request.Request(
            'https://api.anthropic.com/v1/messages',
            data=body,
            headers={
                'Content-Type':      'application/json',
                'x-api-key':         API_KEY,
                'anthropic-version': '2023-06-01',
            },
            method='POST'
        )

        try:
            with urllib.request.urlopen(req) as resp:
                self._send_raw(resp.status, resp.read())
        except urllib.error.HTTPError as e:
            data = e.read()
            print(f'\n[Anthropic {e.code}] {data.decode()}\n')
            self._send_raw(e.code, data)
        except Exception as e:
            print(f'\n[Proxy error] {e}\n')
            self._send_json(500, {'error': {'message': str(e)}})

    def _send_json(self, status, obj):
        self._send_raw(status, json.dumps(obj).encode())

    def _send_raw(self, status, data):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def handle(self):
        try:
            super().handle()
        except (ConnectionResetError, BrokenPipeError):
            pass

    def log_message(self, fmt, *args):
        pass


if __name__ == '__main__':
    if not API_KEY or API_KEY == 'sk-ant-your-key-here':
        print('\n⚠️  No API key found — set ANTHROPIC_API_KEY in .env\n')
    else:
        print(f'\n✓  API key loaded: {API_KEY[:18]}…')
    with http.server.HTTPServer(('', PORT), Handler) as srv:
        print(f'Workshop server running → http://localhost:{PORT}')
        print('Attendees on the same network can use your machine IP.')
        print('Press Ctrl+C to stop.\n')
        srv.serve_forever()
