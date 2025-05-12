/**
 * Website Showcase Platform
 * Rain animation direct implementation
 */

(function() {
    'use strict';

    // Constants
    const DROP_COUNT = 30;         // Number of raindrops
    const SHIMMER_RATIO = 0.2;     // Percentage of drops that should be gold shimmer
    const PURPLE_RATIO = 0.15;     // Percentage of drops that should be purple shimmer

    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        createRaindrops();
    });

    /**
     * Create and animate raindrops
     */
    function createRaindrops() {
        console.log('Rain animation initialized directly');
        
        // Create rain container if it doesn't exist
        let rainContainer = document.querySelector('.rain-container');
        if (!rainContainer) {
            rainContainer = document.createElement('div');
            rainContainer.className = 'rain-container';
            document.body.appendChild(rainContainer);
        }
        
        // Get screen dimensions
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Create individual drops
        for (let i = 0; i < DROP_COUNT; i++) {
            // Determine if this should be a shimmer drop
            let isShimmer = Math.random() < SHIMMER_RATIO;
            let isPurple = Math.random() < PURPLE_RATIO;
            
            // Create the drop
            createDrop(rainContainer, screenWidth, screenHeight, isShimmer, isPurple);
        }
        
        // Add glow effect following mouse
        addMouseGlowEffect(rainContainer);
    }
    
    /**
     * Create a single raindrop
     */
    function createDrop(container, screenWidth, screenHeight, isShimmer, isPurple) {
        // Create drop element
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        
        // Add appropriate class based on type
        if (isShimmer) {
            drop.classList.add('shimmer');
        } else if (isPurple) {
            drop.classList.add('purple');
        } else {
            drop.classList.add('normal');
        }
        
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
        
        // Add event listener for animation end to create ripple and recycle the drop
        drop.addEventListener('animationiteration', function() {
            // Create ripple effect at the bottom of the screen
            createRipple(left, screenHeight - 20);
            
            // Move drop to new position
            drop.style.left = `${Math.random() * screenWidth}px`;
        });
    }
    
    /**
     * Create ripple effect when rain hits the bottom
     */
    function createRipple(x, y) {
        // Only create ripples occasionally
        if (Math.random() > 0.3) return;
        
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'rain-ripple';
        
        // Position it
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Add to body
        document.body.appendChild(ripple);
        
        // Remove after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
    
    /**
     * Add glow effect that follows mouse cursor
     */
    function addMouseGlowEffect(container) {
        // Create glow element
        const glow = document.createElement('div');
        glow.className = 'mouse-glow';
        document.body.appendChild(glow);
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
            
            // Show glow
            glow.classList.add('visible');
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