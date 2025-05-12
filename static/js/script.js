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
        
        // Initialize responsive navigation if needed
        initializeResponsiveNav();
        
        // Add animation to gallery items
        animateGalleryItems();
    }

    /**
     * Initialize responsive navigation
     */
    function initializeResponsiveNav() {
        // This would be implemented if we had a more complex navigation
        // For this simple version, we don't need additional navigation logic
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
