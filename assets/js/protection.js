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
        // Only initialize protection on showcase page (with iframe)
        const iframe = document.getElementById('website-frame');
        const iframeWrapper = document.getElementById('iframe-wrapper');
        
        if (iframe && iframeWrapper) {
            console.log('Protection mechanisms initialized');
            
            // Prevent right-click context menu
            preventRightClick();
            
            // Show message when copy is attempted
            showCopyProtectionMessage();
            
            // Attempt to disable developer tools access
            disableDevTools();
            
            // Prevent text selection
            preventSelection();
            
            // Prevent drag and drop
            preventDragAndDrop();
            
            // Enable iframe interaction while maintaining protection
            enableIframeInteraction(iframeWrapper, iframe);
        }
    }

    /**
     * Prevent right-click context menu
     */
    function preventRightClick() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showMessage('Right-click disabled to protect content');
            return false;
        });
    }

    /**
     * Display a message when copy is attempted
     */
    function showCopyProtectionMessage() {
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            showMessage('Copying disabled to protect content');
            return false;
        });
        
        document.addEventListener('cut', function(e) {
            e.preventDefault();
            showMessage('Cutting disabled to protect content');
            return false;
        });
    }

    /**
     * Show a temporary message to the user
     */
    function showMessage(text) {
        // Create message element if it doesn't exist
        let messageElement = document.getElementById('protection-message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'protection-message';
            messageElement.className = 'protection-message';
            document.body.appendChild(messageElement);
            
            // Add styles if not already in stylesheet
            const style = document.createElement('style');
            style.textContent = `
                .protection-message {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(45, 52, 54, 0.9);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 4px;
                    z-index: 10000;
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .protection-message.show {
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Set message text and show
        messageElement.textContent = text;
        messageElement.classList.add('show');
        
        // Hide after timeout
        setTimeout(function() {
            messageElement.classList.remove('show');
        }, 2000);
    }

    /**
     * Attempt to disable developer tools access
     * Note: This is not foolproof but adds multiple layers of protection
     */
    function disableDevTools() {
        // Check for devtools using window size
        window.addEventListener('resize', checkWindowSizeDevTools);
        
        // Initial check
        checkWindowSizeDevTools();
        
        // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        document.addEventListener('keydown', function(e) {
            // F12 key
            if (e.key === 'F12') {
                e.preventDefault();
                showDevToolsWarning();
                return false;
            }
            
            // Ctrl+Shift+I or Ctrl+Shift+J
            if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
                (e.ctrlKey && (e.key === 'U' || e.key === 'u'))) {
                e.preventDefault();
                showDevToolsWarning();
                return false;
            }
        });
        
        // Override browser development features
        function checkWindowSizeDevTools() {
            const heightThreshold = window.outerHeight - window.innerHeight > 200;
            const widthThreshold = window.outerWidth - window.innerWidth > 200;
            
            if (heightThreshold || widthThreshold) {
                showDevToolsWarning();
            }
        }
        
        function showDevToolsWarning() {
            showMessage('Developer tools are disabled for content protection');
        }
    }

    /**
     * Prevent text selection
     */
    function preventSelection() {
        // CSS approach (more reliable)
        const style = document.createElement('style');
        style.textContent = `
            .iframe-protector {
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            }
        `;
        document.head.appendChild(style);
        
        // JavaScript approach (backup)
        document.addEventListener('selectstart', function(e) {
            const target = e.target;
            if (target.closest('.iframe-protector')) {
                e.preventDefault();
                return false;
            }
        });
    }

    /**
     * Prevent drag and drop
     */
    function preventDragAndDrop() {
        document.addEventListener('dragstart', function(e) {
            const target = e.target;
            if (target.closest('.iframe-protector') || target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });
        
        document.addEventListener('drop', function(e) {
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('dragover', function(e) {
            e.preventDefault();
            return false;
        });
    }

    /**
     * Enable interaction with the iframe while maintaining protection
     */
    function enableIframeInteraction(wrapper, iframe) {
        if (!wrapper || !iframe) return;
        
        // Create a transparent overlay to catch right-clicks and other events
        const overlay = document.createElement('div');
        overlay.className = 'iframe-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            pointer-events: none;
        `;
        
        wrapper.appendChild(overlay);
        
        // Make the overlay block right-clicks but pass through other interactions
        overlay.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showMessage('Right-click disabled to protect content');
            return false;
        });
        
        // Add click-through capability for normal interactions
        overlay.addEventListener('click', function(e) {
            // Allow clicks to pass through to the iframe
            overlay.style.pointerEvents = 'none';
            
            // Re-enable the overlay after a short delay
            setTimeout(function() {
                overlay.style.pointerEvents = 'auto';
            }, 100);
        });
        
        // Periodically check if someone is trying to inspect the page
        setInterval(detectDevTools, 1000);
        
        function detectDevTools() {
            if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
                showDevToolsWarning();
                return true;
            }
            
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (widthThreshold || heightThreshold) {
                showDevToolsWarning();
                return true;
            }
            
            return false;
        }
        
        function showDevToolsWarning() {
            showMessage('Developer tools are disabled for content protection');
        }
    }
})();