#!/bin/bash
# Simple server launcher - no external apps needed
# Just uses Python's built-in HTTP server

echo "🚀 Starting Digital Lab Notebook server..."
echo "📡 Server running at: http://localhost:5500"
echo "🌐 Opening in browser..."
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start server and open browser
cd "$(dirname "$0")"
python3 -m http.server 5500 &
SERVER_PID=$!

# Wait a moment then open browser
sleep 1
open http://localhost:5500

# Wait for server
wait $SERVER_PID

