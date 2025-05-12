/**
 * Website Showcase Platform
 * Luxury visual effects for the website
 */

(function() {
    'use strict';

    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeLuxuryEffects();
    });

    /**
     * Initialize luxury visual effects
     */
    function initializeLuxuryEffects() {
        // Create rain container
        createRainContainer();
        
        // Create animated rain drops
        createRainDrops();
        
        // Track mouse for glow effect
        trackMouseForGlowEffect();
    }

    /**
     * Create the container for rain animation
     */
    function createRainContainer() {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';
        document.body.appendChild(rainContainer);
    }

    /**
     * Create animated rain drops
     */
    function createRainDrops() {
        const rainContainer = document.querySelector('.rain-container');
        if (!rainContainer) return;
        
        const screenWidth = window.innerWidth;
        
        // Create regular rain drops
        for (let i = 0; i < 30; i++) {
            createDrop(rainContainer, screenWidth);
        }
        
        // Create some shimmer (gold) rain drops
        for (let i = 0; i < 6; i++) {
            createDrop(rainContainer, screenWidth, true);
        }
    }

    /**
     * Create a single rain drop with random properties
     */
    function createDrop(container, screenWidth, isShimmer = false) {
        // Create drop element
        const drop = document.createElement('div');
        
        // Set class based on type
        drop.className = isShimmer ? 'rain-drop shimmer' : 'rain-drop normal';
        
        // Set random properties
        const width = isShimmer ? Math.random() * 3 + 2 : Math.random() * 2 + 1;
        const height = Math.random() * 50 + 30;
        const left = Math.random() * screenWidth;
        const duration = Math.random() * 2 + 3; // 3-5 seconds
        const delay = Math.random() * 3;
        
        // Apply styles
        drop.style.width = `${width}px`;
        drop.style.height = `${height}px`;
        drop.style.left = `${left}px`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        
        // Add to container
        container.appendChild(drop);
        
        // Add event listener for animation end to create ripple effect
        drop.addEventListener('animationiteration', function() {
            createRipple(left, window.innerHeight - 20);
        });
    }

    /**
     * Create ripple effect when rain hits
     */
    function createRipple(x, y) {
        // Only create ripples occasionally
        if (Math.random() > 0.3) return;
        
        const rainContainer = document.querySelector('.rain-container');
        if (!rainContainer) return;
        
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'rain-ripple';
        
        // Position it
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Add to container
        rainContainer.appendChild(ripple);
        
        // Remove after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    /**
     * Track mouse movement for glow effect
     */
    function trackMouseForGlowEffect() {
        // Create glow element
        const glow = document.createElement('div');
        glow.className = 'mouse-glow';
        document.body.appendChild(glow);
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            // Get the element that the mouse is over
            const elementMouseIsOver = document.elementFromPoint(e.clientX, e.clientY);
            
            // Check if mouse is over the iframe or its container
            const isOverIframe = elementMouseIsOver && (
                elementMouseIsOver.tagName === 'IFRAME' || 
                elementMouseIsOver.id === 'iframe-wrapper' || 
                elementMouseIsOver.closest('#iframe-wrapper')
            );
            
            // Only show glow when not over iframe
            if (!isOverIframe) {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
                
                // Show glow
                glow.classList.add('visible');
            } else {
                // Hide glow when over iframe
                glow.classList.remove('visible');
            }
        });
        
        // Hide glow when mouse is inactive
        let timeout;
        document.addEventListener('mousemove', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                glow.classList.remove('visible');
            }, 3000);
        });
    }
})();