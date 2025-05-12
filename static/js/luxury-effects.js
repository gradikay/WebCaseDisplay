/**
 * Luxury visual effects for Website Showcase Platform
 * Adds elegant rain animation and shimmer effects
 */

// Initialize immediately
window.onload = function() {
    console.log('Initializing luxury effects');
    initializeLuxuryEffects();
};

// Also try DOMContentLoaded as a backup
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - initializing luxury effects');
    initializeLuxuryEffects();
});

/**
 * Initialize luxury visual effects
 */
function initializeLuxuryEffects() {
    console.log('Starting luxury effects initialization');
    createRainContainer();
    createRainDrops();
    trackMouseForGlowEffect();
    console.log('Luxury effects initialized');
}

    /**
     * Create the container for rain animation
     */
    function createRainContainer() {
        const rainContainer = document.createElement('div');
        rainContainer.classList.add('rain-container');
        document.body.appendChild(rainContainer);
    }

    /**
     * Create animated rain drops
     */
    function createRainDrops() {
        const rainContainer = document.querySelector('.rain-container');
        const screenWidth = window.innerWidth;
        
        // Create initial drops
        for (let i = 0; i < 60; i++) {
            createDrop(rainContainer, screenWidth);
        }
        
        // Create occasional shimmer drops (special effects)
        setInterval(() => {
            const shimmerDrop = createDrop(rainContainer, screenWidth, true);
            shimmerDrop.classList.add('shimmer');
        }, 500);
    }

    /**
     * Create a single rain drop with random properties
     */
    function createDrop(container, screenWidth, isShimmer = false) {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        
        // Add color variation
        const dropTypes = ['', 'gold', 'purple'];
        if (!isShimmer) {
            drop.classList.add(dropTypes[Math.floor(Math.random() * dropTypes.length)]);
        }
        
        // Set random horizontal position
        const left = Math.random() * screenWidth;
        drop.style.left = `${left}px`;
        
        // Set random size and speed
        const size = isShimmer ? 
                    Math.random() * 2 + 1 : 
                    Math.random() * 1 + 0.5;
        drop.style.height = `${Math.random() * 20 + 10}px`;
        drop.style.width = `${size}px`;
        
        const duration = Math.random() * 1 + 0.5;
        drop.style.animationDuration = `${duration}s`;
        
        // Add delay for natural look
        const delay = Math.random() * 2;
        drop.style.animationDelay = `${delay}s`;
        
        container.appendChild(drop);
        
        // Remove and recreate drop after animation ends
        setTimeout(() => {
            drop.remove();
            createDrop(container, screenWidth, isShimmer);
        }, (duration + delay) * 1000);
        
        return drop;
    }

    /**
     * Create ripple effect when rain hits
     */
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        document.querySelector('.rain-container').appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    /**
     * Track mouse movement for glow effect
     */
    function trackMouseForGlowEffect() {
        const luxuryGlow = document.createElement('div');
        luxuryGlow.classList.add('luxury-glow');
        document.body.appendChild(luxuryGlow);
        
        document.addEventListener('mousemove', (e) => {
            // Position the glow effect with slight lag for smoother feel
            setTimeout(() => {
                luxuryGlow.style.left = `${e.clientX - 100}px`;
                luxuryGlow.style.top = `${e.clientY - 100}px`;
                luxuryGlow.style.opacity = '1';
            }, 50);
            
            // Occasionally create ripple effect
            if (Math.random() > 0.97) {
                createRipple(e.clientX, e.clientY);
            }
        });
    }
})();