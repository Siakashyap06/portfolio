#!/usr/bin/env python3
"""
Simple Live Server for Digital Lab Notebook
Auto-reloads on file changes
"""
import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

PORT = 5500
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"🚀 Live Server running!")
        print(f"📡 Server: {url}")
        print(f"📁 Directory: {DIRECTORY}")
        print(f"\n✨ Opening browser...")
        print(f"Press Ctrl+C to stop\n")
        
        # Open browser
        webbrowser.open(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped")

if __name__ == "__main__":
    main()

