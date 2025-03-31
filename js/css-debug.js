document.addEventListener('DOMContentLoaded', function() {
    console.log('Debugging CSS loading issues...');
    
    // List all stylesheets
    console.log('All stylesheets:');
    for (let i = 0; i < document.styleSheets.length; i++) {
        try {
            const sheet = document.styleSheets[i];
            console.log(`[${i}] ${sheet.href || 'inline stylesheet'}`);
        } catch (e) {
            console.error(`Error accessing stylesheet ${i}:`, e);
        }
    }
    
    // Check specifically for styles.css
    let mainCssFound = false;
    let mainCssLoaded = false;
    
    for (let i = 0; i < document.styleSheets.length; i++) {
        try {
            const href = document.styleSheets[i].href;
            if (href && href.includes('styles.css')) {
                mainCssFound = true;
                console.log('Found styles.css at index', i);
                
                // Check if it has rules
                try {
                    const rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
                    if (rules && rules.length > 0) {
                        mainCssLoaded = true;
                        console.log(`styles.css loaded successfully with ${rules.length} rules`);
                    } else {
                        console.error('styles.css found but contains no rules');
                    }
                } catch (e) {
                    console.error('Error accessing rules in styles.css:', e);
                    if (e.name === 'SecurityError') {
                        console.log('This is likely a CORS issue with the stylesheet');
                        // For CORS issues, we can't check rules but the file might still be loaded
                        mainCssLoaded = true;
                    }
                }
                break;
            }
        } catch (e) {
            console.error(`Error checking stylesheet ${i}:`, e);
        }
    }
    
    if (!mainCssFound) {
        console.error('styles.css not found in the document!');
        
        // Check if the link element exists
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        console.log('CSS links in document:');
        cssLinks.forEach((link, i) => {
            console.log(`[${i}] ${link.href}`);
        });
        
        // Try to load the CSS file directly
        const testLink = document.createElement('link');
        testLink.rel = 'stylesheet';
        testLink.href = 'css/styles.css?' + new Date().getTime(); // Add cache-busting parameter
        testLink.onload = () => console.log('Successfully loaded styles.css dynamically');
        testLink.onerror = () => {
            console.error('Failed to load styles.css dynamically - file may not exist');
            
            // Create a visible error message
            showErrorMessage('CSS file not found. Check if css/styles.css exists.');
        };
        document.head.appendChild(testLink);
    } else if (!mainCssLoaded) {
        showErrorMessage('CSS file found but not loaded correctly. Check for syntax errors.');
    }
    
    function showErrorMessage(message) {
        const errorMsg = document.createElement('div');
        errorMsg.style.position = 'fixed';
        errorMsg.style.top = '0';
        errorMsg.style.left = '0';
        errorMsg.style.right = '0';
        errorMsg.style.padding = '10px';
        errorMsg.style.backgroundColor = 'red';
        errorMsg.style.color = 'white';
        errorMsg.style.textAlign = 'center';
        errorMsg.style.zIndex = '9999';
        errorMsg.textContent = message;
        document.body.appendChild(errorMsg);
    }
}); 