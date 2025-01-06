import http.server
import socketserver
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Server started at http://localhost:{PORT}")
            print("Press Ctrl+C to stop the server")
            
            # Open the browser automatically
            webbrowser.open(f"http://localhost:{PORT}")
            
            # Start the server
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"Port {PORT} is already in use. Please choose a different port.")
        else:
            raise

if __name__ == "__main__":
    main() 