# Website Showcase Platform

A pure vanilla HTML/CSS/JS platform for showcasing websites through protected iframes, featuring elegant design interactions and dynamic visual effects.

## Features

- Display external websites via iframe with protection against content copying
- Show detailed website metadata (technologies, creation date, organization, etc.)
- Luxurious visual effects with animated rain drops and elegant UI elements
- Responsive, mobile-friendly design
- Copy protection mechanisms to prevent content inspection
- GitHub Pages compatible (pure HTML, CSS, and JavaScript)

## Technologies Used

- Vanilla HTML5
- CSS3 with modern features (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (ES6+)
- SVG for vector graphics

## How to Use

1. Clone this repository
2. Open `index.html` in your browser to view the gallery
3. Click on any website to view its showcase page with iframe display and metadata

## Structure

```
/
├── index.html             # Main gallery page
├── showcase.html          # Individual website showcase page
└── assets/
    ├── css/               # Style sheets
    │   ├── normalize.css  # CSS reset
    │   ├── styles.css     # Main styles
    │   └── rain.css       # Rain animation styles
    ├── js/                # JavaScript files
    │   ├── data.js        # Website data and metadata
    │   ├── script.js      # Main app functionality
    │   ├── protection.js  # Copy protection mechanisms
    │   └── rain-direct.js # Rain animation effects
    └── images/            # Images and SVGs
        └── logo.svg       # Logo
```

## Deployment

This site is designed to be deployed directly to GitHub Pages without any build process or server requirements.

## License

MIT License