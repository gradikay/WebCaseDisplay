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
     * Note: This is not foolproof but adds multiple layers of protection
     */
    function disableDevTools() {
        // Listen for keyboard shortcuts commonly used to open dev tools
        document.addEventListener('keydown', function(e) {
            // F12 key
            if (e.keyCode === 123) {
                e.preventDefault();
                showCopyProtectionMessage();
                return false;
            }
            
            // Ctrl+Shift+I or Command+Option+I
            if ((e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
                (e.metaKey && e.altKey && e.keyCode === 73)) {
                e.preventDefault();
                showCopyProtectionMessage();
                return false;
            }
            
            // Ctrl+Shift+J or Command+Option+J
            if ((e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
                (e.metaKey && e.altKey && e.keyCode === 74)) {
                e.preventDefault();
                showCopyProtectionMessage();
                return false;
            }
            
            // Ctrl+Shift+C or Command+Option+C
            if ((e.ctrlKey && e.shiftKey && e.keyCode === 67) || 
                (e.metaKey && e.altKey && e.keyCode === 67)) {
                e.preventDefault();
                showCopyProtectionMessage();
                return false;
            }
            
            // Ctrl+S or Command+S
            if ((e.ctrlKey && e.keyCode === 83) || 
                (e.metaKey && e.keyCode === 83)) {
                e.preventDefault();
                showCopyProtectionMessage();
                return false;
            }
        });
        
        // Advanced DevTools detection - multiple techniques
        // 1. Window size difference detection
        function checkWindowSizeDevTools() {
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                showDevToolsWarning();
            }
        }
        
        // 2. Console clear override detection
        const consoleProperties = [
            'debug', 'error', 'info', 'log', 'warn', 'dir', 'dirxml', 
            'table', 'trace', 'group', 'groupCollapsed', 'groupEnd', 
            'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 
            'time', 'timeLog', 'timeEnd', 'timeStamp'
        ];
        
        // Override console methods to detect usage
        consoleProperties.forEach(prop => {
            if (console[prop]) {
                const originalMethod = console[prop];
                console[prop] = function() {
                    if (prop === 'clear') {
                        showDevToolsWarning();
                    }
                    return originalMethod.apply(console, arguments);
                };
            }
        });
        
        // 3. Function.prototype.toString detection
        const originalToString = Function.prototype.toString;
        Object.defineProperty(Function.prototype, 'toString', {
            value: function() {
                try {
                    // This will throw for native methods but not for our own functions
                    // Can be used to detect DevTools inspection
                    if (this === Function.prototype.toString) {
                        showDevToolsWarning();
                    }
                } catch (e) {}
                return originalToString.apply(this, arguments);
            },
            writable: true
        });
        
        function showDevToolsWarning() {
            const overlayEl = document.createElement('div');
            overlayEl.id = 'devtools-blocker';
            overlayEl.style.position = 'fixed';
            overlayEl.style.top = '0';
            overlayEl.style.left = '0';
            overlayEl.style.width = '100%';
            overlayEl.style.height = '100%';
            overlayEl.style.background = 'rgba(45, 52, 54, 0.95)';
            overlayEl.style.zIndex = '9999999';
            overlayEl.style.display = 'flex';
            overlayEl.style.alignItems = 'center';
            overlayEl.style.justifyContent = 'center';
            overlayEl.style.color = 'white';
            overlayEl.style.fontSize = '18px';
            overlayEl.style.textAlign = 'center';
            overlayEl.style.padding = '20px';
            
            overlayEl.innerHTML = '<div><h2>Developer Tools Detected</h2><p>This site is protected against inspection and content copying.</p></div>';
            
            // Remove any existing overlay
            const existingOverlay = document.getElementById('devtools-blocker');
            if (existingOverlay) {
                document.body.removeChild(existingOverlay);
            }
            
            document.body.appendChild(overlayEl);
            
            // Remove after 3 seconds
            setTimeout(() => {
                if (document.body.contains(overlayEl)) {
                    document.body.removeChild(overlayEl);
                }
            }, 3000);
        }
        
        // Check periodically for dev tools using multiple techniques
        setInterval(checkWindowSizeDevTools, 1000);
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
        
        // Set the iframe to be fully interactive (websites will load and function normally)
        iframe.style.pointerEvents = 'auto';
        
        // Add advanced dev tools detection and prevention
        const devToolsDetector = document.createElement('div');
        devToolsDetector.style.display = 'none';
        document.body.appendChild(devToolsDetector);
        
        // Detect DevTools via debugger
        function detectDevTools() {
            const startTime = new Date();
            debugger;
            const endTime = new Date();
            const timeDiff = endTime - startTime;
            
            if (timeDiff > 100) {
                showDevToolsWarning();
            }
        }
        
        function showDevToolsWarning() {
            const warningEl = document.createElement('div');
            warningEl.style.position = 'fixed';
            warningEl.style.top = '0';
            warningEl.style.left = '0';
            warningEl.style.width = '100%';
            warningEl.style.height = '100%';
            warningEl.style.backgroundColor = 'rgba(0,0,0,0.9)';
            warningEl.style.color = 'white';
            warningEl.style.padding = '50px';
            warningEl.style.textAlign = 'center';
            warningEl.style.zIndex = '9999999';
            warningEl.style.fontSize = '24px';
            warningEl.innerHTML = '<h2>Developer Tools Detected</h2><p>This website is protected against inspection and copying.</p>';
            document.body.appendChild(warningEl);
            
            // Remove after a few seconds
            setTimeout(() => {
                document.body.removeChild(warningEl);
            }, 3000);
        }
        
        // Run detector periodically
        setInterval(detectDevTools, 1000);
        
        // For wheel events (scrolling)
        overlay.addEventListener('wheel', function(e) {
            // Let the scroll pass through to the iframe
            // This allows normal scrolling behavior
        });
    }
})();
