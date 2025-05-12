import os
import logging
from flask import Flask, render_template, request, redirect, url_for

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

# Sample showcase websites with detailed metadata
SHOWCASE_WEBSITES = [
    {
        "id": 1,
        "title": "MDN Web Docs",
        "description": "Comprehensive resources for developers by Mozilla",
        "url": "https://developer.mozilla.org/en-US/",
        "thumbnail": "https://via.placeholder.com/600x400/0984E3/FFFFFF?text=MDN+Web+Docs",
        "metadata": {
            "created": "February 23, 2005",
            "technologies": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
            "organization": "Mozilla Foundation",
            "type": "Documentation",
            "monthly_visitors": "25 million+",
            "last_updated": "Daily updates",
            "languages_supported": 10
        }
    },
    {
        "id": 2,
        "title": "Wikipedia",
        "description": "Online encyclopedia with millions of articles",
        "url": "https://en.wikipedia.org/wiki/Main_Page",
        "thumbnail": "https://via.placeholder.com/600x400/2D3436/FFFFFF?text=Wikipedia",
        "metadata": {
            "created": "January 15, 2001",
            "technologies": ["PHP", "MySQL", "JavaScript", "MediaWiki"],
            "organization": "Wikimedia Foundation",
            "type": "Online Encyclopedia",
            "monthly_visitors": "1.5 billion+",
            "articles": "6.5 million+ (English)",
            "languages_supported": 300
        }
    },
    {
        "id": 3,
        "title": "CSS-Tricks",
        "description": "Tips, tricks, and techniques for web developers",
        "url": "https://css-tricks.com/",
        "thumbnail": "https://via.placeholder.com/600x400/636E72/FFFFFF?text=CSS-Tricks",
        "metadata": {
            "created": "July 4, 2007",
            "technologies": ["WordPress", "CSS", "HTML", "JavaScript", "SVG"],
            "organization": "DigitalOcean",
            "type": "Web Development Blog",
            "monthly_visitors": "5 million+",
            "articles": "2,000+",
            "focus": "Frontend Development"
        }
    },
    {
        "id": 4,
        "title": "GitHub",
        "description": "Software development platform for open source collaboration",
        "url": "https://github.com/",
        "thumbnail": "https://via.placeholder.com/600x400/0984E3/FFFFFF?text=GitHub",
        "metadata": {
            "created": "April 10, 2008",
            "technologies": ["Ruby on Rails", "Erlang", "Go", "React", "GraphQL"],
            "organization": "Microsoft (acquired in 2018)",
            "type": "Version Control & Collaboration",
            "monthly_visitors": "140 million+",
            "repositories": "200 million+",
            "active_users": "83 million+"
        }
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
