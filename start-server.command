#!/bin/bash
# Double-click to start server (macOS)
cd "$(dirname "$0")"
echo "🚀 Starting server at http://localhost:5500"
python3 -m http.server 5500

