/**
 * Website Showcase Protection
 * JavaScript file for implementing protection mechanisms against content copying
 */

(function() {
    'use strict';

    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeProtection();
    });

    /**
     * Initialize protection mechanisms
     */
    function initializeProtection() {
        // Get the iframe container if it exists
        const iframeWrapper = document.getElementById('iframe-wrapper');
        
        if (iframeWrapper) {
            // Get the iframe and overlay elements
            const iframe = iframeWrapper.querySelector('iframe');
            const overlay = iframeWrapper.querySelector('.iframe-overlay');
            
            // Apply protections
            preventRightClick();
            disableDevTools();
            preventSelection();
            preventDragAndDrop();
            
            // Enable iframe interaction but maintain protection
            enableIframeInteraction(iframeWrapper, iframe, overlay);
        }
    }

    /**
     * Prevent right-click context menu
     */
    function preventRightClick() {
        // Disable right-click on the entire document
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showCopyProtectionMessage();
            return false;
        });
    }

    /**
     * Display a message when copy is attempted
     */
    function showCopyProtectionMessage() {
        // Create or get the message element
        let messageEl = document.getElementById('copy-protection-message');
        
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'copy-protection-message';
            messageEl.style.position = 'fixed';
            messageEl.style.top = '50%';
            messageEl.style.left = '50%';
            messageEl.style.transform = 'translate(-50%, -50%)';
            messageEl.style.padding = '20px';
            messageEl.style.background = 'rgba(45, 52, 54, 0.9)';
            messageEl.style.color = 'white';
            messageEl.style.borderRadius = '8px';
            messageEl.style.zIndex = '9999';
            messageEl.style.textAlign = 'center';
            messageEl.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            messageEl.style.maxWidth = '300px';
            messageEl.style.fontSize = '14px';
            
            document.body.appendChild(messageEl);
        }
        
        messageEl.textContent = 'Copy function is disabled to protect the content.';
        messageEl.style.display = 'block';
        
        // Hide the message after 2 seconds
        setTimeout(function() {
            messageEl.style.display = 'none';
        }, 2000);
    }

    /**
     * Attempt to disable developer tools access
     * Note: This is not foolproof but adds a layer of difficulty
     */
    function disableDevTools() {
        // Listen for keyboard shortcuts commonly used to open dev tools
        document.addEventListener('keydown', function(e) {
            // F12 key
            if (e.keyCode === 123) {
                e.preventDefault();
                return false;
            }
            
            // Ctrl+Shift+I or Command+Option+I
            if ((e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
                (e.metaKey && e.altKey && e.keyCode === 73)) {
                e.preventDefault();
                return false;
            }
            
            // Ctrl+Shift+J or Command+Option+J
            if ((e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
                (e.metaKey && e.altKey && e.keyCode === 74)) {
                e.preventDefault();
                return false;
            }
            
            // Ctrl+Shift+C or Command+Option+C
            if ((e.ctrlKey && e.shiftKey && e.keyCode === 67) || 
                (e.metaKey && e.altKey && e.keyCode === 67)) {
                e.preventDefault();
                return false;
            }
            
            // Ctrl+S or Command+S
            if ((e.ctrlKey && e.keyCode === 83) || 
                (e.metaKey && e.keyCode === 83)) {
                e.preventDefault();
                return false;
            }
        });
        
        // Attempt to detect devtools opening
        let devtoolsOpen = false;
        
        const threshold = 160; // Threshold for width/height check
        
        function checkDevTools() {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    
                    // Add a dark overlay to the page when devtools is detected
                    const overlayEl = document.createElement('div');
                    overlayEl.id = 'devtools-blocker';
                    overlayEl.style.position = 'fixed';
                    overlayEl.style.top = '0';
                    overlayEl.style.left = '0';
                    overlayEl.style.width = '100%';
                    overlayEl.style.height = '100%';
                    overlayEl.style.background = 'rgba(45, 52, 54, 0.9)';
                    overlayEl.style.zIndex = '999999';
                    overlayEl.style.display = 'flex';
                    overlayEl.style.alignItems = 'center';
                    overlayEl.style.justifyContent = 'center';
                    overlayEl.style.color = 'white';
                    overlayEl.style.fontSize = '18px';
                    overlayEl.style.textAlign = 'center';
                    overlayEl.style.padding = '20px';
                    
                    overlayEl.innerHTML = '<div><h2>Developer Tools Detected</h2><p>This site is protected against inspection.</p></div>';
                    
                    document.body.appendChild(overlayEl);
                }
            } else {
                if (devtoolsOpen) {
                    devtoolsOpen = false;
                    const blocker = document.getElementById('devtools-blocker');
                    if (blocker) {
                        document.body.removeChild(blocker);
                    }
                }
            }
        }
        
        // Check periodically for dev tools
        setInterval(checkDevTools, 1000);
    }

    /**
     * Prevent text selection
     */
    function preventSelection() {
        // Disable text selection
        document.onselectstart = function() {
            return false;
        };
        
        // Apply CSS to prevent selection
        const style = document.createElement('style');
        style.innerHTML = `
            body {
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
        
        // Disable copy command
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            showCopyProtectionMessage();
            return false;
        });
    }

    /**
     * Prevent drag and drop
     */
    function preventDragAndDrop() {
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('drop', function(e) {
            e.preventDefault();
            return false;
        });
    }

    /**
     * Enable interaction with the iframe while maintaining protection
     */
    function enableIframeInteraction(wrapper, iframe, overlay) {
        // Add the protected class to enable interaction
        wrapper.classList.add('protected');
        
        // Create a transparent overlay that passes mouse events to iframe
        // but prevents direct interaction with iframe content
        overlay.addEventListener('mousemove', function(e) {
            // Calculate position within iframe
            const rect = iframe.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create a synthetic click event that's passed to the iframe
            // This allows interaction without direct access
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: x,
                clientY: y
            });
            
            // We're only simulating the event, not actually passing it
            // This gives the appearance of interaction
            
            // For scrolling, we'll need to manually handle that
            overlay.addEventListener('wheel', function(e) {
                // Calculate scroll amount
                const scrollY = iframe.contentWindow.scrollY + e.deltaY;
                
                // Apply scroll to iframe
                iframe.contentWindow.scrollTo(0, scrollY);
                
                // Prevent default to avoid page scroll
                e.preventDefault();
            });
        });
        
        // Handle clicks on the overlay
        overlay.addEventListener('click', function(e) {
            // We're not actually passing clicks to avoid direct manipulation
            // but giving the appearance of interaction
            e.preventDefault();
            e.stopPropagation();
        });
    }
})();
