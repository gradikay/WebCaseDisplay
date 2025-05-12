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
        "title": "MDN Web Docs",
        "description": "Comprehensive resources for developers by Mozilla",
        "url": "https://developer.mozilla.org/en-US/",
        "thumbnail": "https://via.placeholder.com/600x400/0984E3/FFFFFF?text=MDN+Web+Docs"
    },
    {
        "id": 2,
        "title": "Wikipedia",
        "description": "Online encyclopedia with millions of articles",
        "url": "https://en.wikipedia.org/wiki/Main_Page",
        "thumbnail": "https://via.placeholder.com/600x400/2D3436/FFFFFF?text=Wikipedia"
    },
    {
        "id": 3,
        "title": "CSS-Tricks",
        "description": "Tips, tricks, and techniques for web developers",
        "url": "https://css-tricks.com/",
        "thumbnail": "https://via.placeholder.com/600x400/636E72/FFFFFF?text=CSS-Tricks"
    },
    {
        "id": 4,
        "title": "GitHub",
        "description": "Software development platform for open source collaboration",
        "url": "https://github.com/",
        "thumbnail": "https://via.placeholder.com/600x400/0984E3/FFFFFF?text=GitHub"
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
