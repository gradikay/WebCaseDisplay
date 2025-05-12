// Direct Rain Animation Script - Execute immediately

// Create rain container
const rainContainer = document.createElement('div');
rainContainer.className = 'rain-container';
document.body.appendChild(rainContainer);

// Create rain drops
function createRaindrops() {
    const screenWidth = window.innerWidth;
    
    // Create 100 drops with different properties
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        
        // Random position
        drop.style.left = Math.random() * screenWidth + 'px';
        drop.style.top = -100 + 'px';
        
        // Random size
        const size = Math.random() * 2 + 0.5;
        drop.style.width = size + 'px';
        drop.style.height = (Math.random() * 20 + 10) + 'px';
        
        // Random animation properties
        const duration = Math.random() * 1 + 0.5;
        const delay = Math.random() * 2;
        
        drop.style.animationDuration = duration + 's';
        drop.style.animationDelay = delay + 's';
        
        // Add color variation
        if (Math.random() > 0.6) {
            drop.classList.add('gold');
        } else if (Math.random() > 0.6) {
            drop.classList.add('purple');
        }
        
        // Add shimmer effect to some drops
        if (Math.random() > 0.9) {
            drop.classList.add('shimmer');
        }
        
        rainContainer.appendChild(drop);
    }
}

// Create the luxury glow effect
const luxuryGlow = document.createElement('div');
luxuryGlow.className = 'luxury-glow';
document.body.appendChild(luxuryGlow);

// Track mouse for glow effect
document.addEventListener('mousemove', (e) => {
    luxuryGlow.style.left = (e.clientX - 100) + 'px';
    luxuryGlow.style.top = (e.clientY - 100) + 'px';
    luxuryGlow.style.opacity = '1';
    
    // Occasional ripple effect
    if (Math.random() > 0.95) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
});

// Initialize raindrops
createRaindrops();

// Add more drops periodically
setInterval(() => {
    const newDrop = document.createElement('div');
    newDrop.className = 'rain-drop';
    
    // Style the new drop
    newDrop.style.left = Math.random() * window.innerWidth + 'px';
    newDrop.style.width = (Math.random() * 2 + 0.5) + 'px';
    newDrop.style.height = (Math.random() * 20 + 10) + 'px';
    newDrop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
    
    // Add color variation
    if (Math.random() > 0.6) {
        newDrop.classList.add('gold');
    } else if (Math.random() > 0.6) {
        newDrop.classList.add('purple');
    }
    
    // Add shimmer to some drops
    if (Math.random() > 0.9) {
        newDrop.classList.add('shimmer');
    }
    
    rainContainer.appendChild(newDrop);
    
    // Remove old drops to prevent memory issues
    if (rainContainer.children.length > 200) {
        rainContainer.removeChild(rainContainer.children[0]);
    }
}, 300);

console.log('Rain animation initialized directly');