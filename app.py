import os
import logging
from flask import Flask, render_template, request, redirect, url_for

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

# Sample showcase websites
SHOWCASE_WEBSITES = [
    {
        "id": 1,
        "title": "Website 1",
        "description": "A modern e-commerce platform with minimalist design",
        "url": "https://www.example.com",
        "thumbnail": "https://via.placeholder.com/600x400/0984E3/FFFFFF?text=Website+1"
    },
    {
        "id": 2,
        "title": "Website 2",
        "description": "Professional portfolio site with advanced animations",
        "url": "https://www.example.org",
        "thumbnail": "https://via.placeholder.com/600x400/2D3436/FFFFFF?text=Website+2"
    },
    {
        "id": 3,
        "title": "Website 3",
        "description": "Responsive blog with clean typography",
        "url": "https://www.example.net",
        "thumbnail": "https://via.placeholder.com/600x400/636E72/FFFFFF?text=Website+3"
    },
    {
        "id": 4,
        "title": "Website 4",
        "description": "Interactive dashboard with data visualization",
        "url": "https://www.example.io",
        "thumbnail": "https://via.placeholder.com/600x400/0984E3/FFFFFF?text=Website+4"
    }
]


@app.route('/')
def index():
    """Render the homepage with website showcases"""
    return render_template('index.html', websites=SHOWCASE_WEBSITES)


@app.route('/showcase/<int:website_id>')
def showcase(website_id):
    """Display a specific website in an iframe with protection"""
    website = None
    for site in SHOWCASE_WEBSITES:
        if site['id'] == website_id:
            website = site
            break
    
    if website is None:
        return redirect(url_for('index'))
    
    return render_template('showcase.html', website=website)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
