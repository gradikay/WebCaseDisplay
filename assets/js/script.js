/**
 * Website Showcase Platform
 * Main JavaScript file for general functionality
 */

(function() {
    'use strict';

    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });

    /**
     * Initialize the application
     */
    function initializeApp() {
        // Add any general functionality here
        console.log('Website Showcase Platform initialized');

        // Check if we're on the index page
        if (document.getElementById('gallery-container')) {
            // Populate gallery with website items
            populateGallery();
            
            // Add animation to gallery items
            animateGalleryItems();
        }
        
        // Check if we're on the showcase page
        if (document.getElementById('showcase-details')) {
            // Get the website ID from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const websiteId = parseInt(urlParams.get('id'));
            
            if (websiteId) {
                // Load and display the website details
                displayWebsiteDetails(websiteId);
            } else {
                // Redirect to home page if no ID provided
                window.location.href = 'index.html';
            }
        }
    }

    /**
     * Populate the gallery with website items
     */
    function populateGallery() {
        const galleryContainer = document.getElementById('gallery-container');
        
        if (!galleryContainer) return;
        
        // Clear any existing content
        galleryContainer.innerHTML = '';
        
        // Add each website to the gallery
        SHOWCASE_WEBSITES.forEach(website => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <a href="showcase.html?id=${website.id}" class="card">
                    <div class="card-image">
                        <img src="${website.thumbnail}" alt="${website.title}">
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h3>${website.title}</h3>
                            <span class="card-date">${website.metadata.created.split(' ')[0]}</span>
                        </div>
                        <p>${website.description}</p>
                        <div class="card-tech-preview">
                            ${website.metadata.technologies.slice(0, 3).map(tech => 
                                `<span class="tech-badge">${tech}</span>`
                            ).join('')}
                            ${website.metadata.technologies.length > 3 ? 
                                `<span class="tech-badge more">+${website.metadata.technologies.length - 3}</span>` : 
                                ''}
                        </div>
                    </div>
                </a>
            `;
            
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    /**
     * Display website details on the showcase page
     */
    function displayWebsiteDetails(websiteId) {
        // Find the website with the matching ID
        const website = SHOWCASE_WEBSITES.find(site => site.id === websiteId);
        
        if (!website) {
            // Website not found, redirect to home page
            window.location.href = 'index.html';
            return;
        }
        
        // Update the page title
        document.title = `${website.title} - Website Showcase Platform`;
        
        // Display website details
        const showcaseDetails = document.getElementById('showcase-details');
        showcaseDetails.innerHTML = `
            <h1>${website.title}</h1>
            <p class="description">${website.description}</p>
            
            <!-- Website Metadata Display -->
            <div class="metadata-container">
                <div class="metadata-header">
                    <h3>Website Metadata</h3>
                    <span class="created-date">Created: ${website.metadata.created}</span>
                </div>
                
                <div class="metadata-grid">
                    <!-- Technologies Used -->
                    <div class="metadata-item">
                        <div class="metadata-label">Technologies</div>
                        <div class="tech-stack">
                            ${website.metadata.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <!-- Organization -->
                    <div class="metadata-item">
                        <div class="metadata-label">Organization</div>
                        <div class="metadata-value">${website.metadata.organization}</div>
                    </div>
                    
                    <!-- Website Type -->
                    <div class="metadata-item">
                        <div class="metadata-label">Type</div>
                        <div class="metadata-value">${website.metadata.type}</div>
                    </div>
                    
                    <!-- Monthly Visitors -->
                    <div class="metadata-item">
                        <div class="metadata-label">Monthly Visitors</div>
                        <div class="metadata-value">${website.metadata.monthly_visitors}</div>
                    </div>
                    
                    ${website.metadata.languages_supported ? `
                    <div class="metadata-item">
                        <div class="metadata-label">Languages Supported</div>
                        <div class="metadata-value">${website.metadata.languages_supported}</div>
                    </div>
                    ` : ''}
                    
                    ${website.metadata.articles ? `
                    <div class="metadata-item">
                        <div class="metadata-label">Articles</div>
                        <div class="metadata-value">${website.metadata.articles}</div>
                    </div>
                    ` : ''}
                    
                    ${website.metadata.repositories ? `
                    <div class="metadata-item">
                        <div class="metadata-label">Repositories</div>
                        <div class="metadata-value">${website.metadata.repositories}</div>
                    </div>
                    ` : ''}
                    
                    ${website.metadata.active_users ? `
                    <div class="metadata-item">
                        <div class="metadata-label">Active Users</div>
                        <div class="metadata-value">${website.metadata.active_users}</div>
                    </div>
                    ` : ''}
                    
                    ${website.metadata.focus ? `
                    <div class="metadata-item">
                        <div class="metadata-label">Focus</div>
                        <div class="metadata-value">${website.metadata.focus}</div>
                    </div>
                    ` : ''}
                    
                    ${website.metadata.last_updated ? `
                    <div class="metadata-item">
                        <div class="metadata-label">Last Updated</div>
                        <div class="metadata-value">${website.metadata.last_updated}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Set the iframe source
        const iframe = document.getElementById('website-frame');
        if (iframe) {
            iframe.src = website.url;
            iframe.title = website.title;
        }
    }

    /**
     * Add animation effects to gallery items
     */
    function animateGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (galleryItems.length) {
            // Add fade-in animation as user scrolls
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            galleryItems.forEach(item => {
                // Set initial style
                item.style.opacity = 0;
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                // Observe the item
                observer.observe(item);
            });
        }
    }
})();