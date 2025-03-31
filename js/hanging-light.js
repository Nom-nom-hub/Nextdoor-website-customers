// Self-executing function to avoid global scope pollution
(function() {
    console.log("Hanging light script loaded");
    
    // Function to run when DOM is ready
    function init() {
        console.log("Hanging light init called");
        
        // Add CSS styles first
        addLightStyles();
        addWindEffectStyles();
        
        // Initialize wind simulation
        initWindSimulation();
        
        // Wait for the page to fully render
        setTimeout(function() {
            createHangingLight();
        }, 1000);
    }
    
    // Create the hanging light element
    function createHangingLight() {
        console.log("Creating hanging light");
        
        // Try to find the navigation bar
        const navbar = document.querySelector('nav') || document.querySelector('header nav') || document.querySelector('.navbar');
        
        if (!navbar) {
            console.error("Navigation bar not found");
            
            // Try to find by other means
            const possibleNavs = document.querySelectorAll('header, .header, .nav-container');
            console.log(`Found ${possibleNavs.length} possible navigation elements on the page`);
            
            // Try to find a section that might be the navigation
            for (const nav of possibleNavs) {
                if (nav.querySelector('ul') || nav.querySelector('.nav-links') || nav.querySelector('a')) {
                    console.log("Found potential navigation:", nav);
                    addLightToNav(nav);
                    return;
                }
            }
            
            console.error("Could not find any element that looks like navigation");
            return;
        }
        
        console.log("Navigation found:", navbar);
        addLightToNav(navbar);
    }

    function addLightToNav(navbar) {
        // Create light elements
        const lightContainer = document.createElement('div');
        lightContainer.className = 'hanging-light-container';
        lightContainer.id = 'hanging-light';
        
        const cord = document.createElement('div');
        cord.className = 'light-cord';
        
        const lightBulb = document.createElement('div');
        lightBulb.className = 'light-bulb';
        
        const lightGlow = document.createElement('div');
        lightGlow.className = 'light-glow';
        
        // Assemble the light
        lightBulb.appendChild(lightGlow);
        cord.appendChild(lightBulb);
        lightContainer.appendChild(cord);
        
        // Add light switch to navbar
        const lightSwitch = document.createElement('div');
        lightSwitch.className = 'light-switch';
        lightSwitch.innerHTML = '<i class="fas fa-lightbulb"></i>';
        lightSwitch.title = "Toggle hanging light";
        
        // Add light switch to nav controls
        const navControls = navbar.querySelector('.nav-controls');
        if (navControls) {
            navControls.insertBefore(lightSwitch, navControls.firstChild);
        } else {
            // If no nav controls, add to navbar
            navbar.appendChild(lightSwitch);
        }
        
        // Add click event to toggle light
        let lightOn = true;
        lightSwitch.addEventListener('click', function() {
            lightOn = !lightOn;
            
            // Update light container data attribute for CSS styling
            lightContainer.setAttribute('data-light-off', !lightOn);
            
            // Update light switch icon and title
            lightSwitch.innerHTML = lightOn ? '<i class="fas fa-lightbulb"></i>' : '<i class="far fa-lightbulb"></i>';
            lightSwitch.title = lightOn ? "Turn light off" : "Turn light on";
            
            // Immediately hide/show the light glow
            const lightGlow = lightContainer.querySelector('.light-glow');
            if (lightGlow) {
                lightGlow.style.opacity = '0';
                lightGlow.style.display = lightOn ? 'block' : 'none';
                if (lightOn) {
                    setTimeout(() => {
                        lightGlow.style.opacity = '0.9';
                    }, 10);
                }
            }
            
            // Toggle illumination effect on text
            if (heroHeading) {
                // Toggle class for shadow effect
                heroHeading.classList.toggle('light-off', !lightOn);
                
                const letters = heroHeading.querySelectorAll('.word-wrapper > span');
                if (letters.length) {
                    letters.forEach(letter => {
                        if (!lightOn) {
                            // Store current styles to restore later
                            letter.dataset.originalTextShadow = letter.style.textShadow;
                            letter.dataset.originalColor = letter.style.color;
                            letter.dataset.originalOpacity = letter.style.opacity;
                            
                            // Apply shadow effect
                            letter.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
                            letter.style.color = '#333';
                            letter.style.opacity = '0.9';
                        } else {
                            // Restore illumination
                            if (letter.dataset.originalTextShadow) {
                                letter.style.textShadow = letter.dataset.originalTextShadow;
                            }
                            if (letter.dataset.originalColor) {
                                letter.style.color = letter.dataset.originalColor;
                            }
                            if (letter.dataset.originalOpacity) {
                                letter.style.opacity = letter.dataset.originalOpacity;
                            }
                        }
                    });
                }
                
                // Toggle reflection element
                const reflection = heroHeading.querySelector('.light-reflection');
                if (reflection) {
                    reflection.style.display = lightOn ? 'block' : 'none';
                }
            }
            
            // Update global lightOn variable
            window.lightOn = lightOn;
        });
        
        // Find the hero section that will be illuminated
        const heroSection = document.querySelector('.hero') || document.querySelector('header.hero');
        const heroHeading = heroSection ? (heroSection.querySelector('h1') || heroSection.querySelector('.hero-content')) : null;
        
        if (!heroHeading) {
            console.error("Could not find heading in hero section to illuminate");
            return;
        }
        
        // Make sure the navbar has position relative
        const navbarStyle = window.getComputedStyle(navbar);
        if (navbarStyle.position === 'static') {
            navbar.style.position = 'relative';
        }
        
        // Position the light container at the bottom of the navbar
        lightContainer.style.position = 'absolute';
        lightContainer.style.top = '80%'; // Changed from 100% to 80% to lift it higher
        lightContainer.style.left = '50%';
        lightContainer.style.transform = 'translateX(-50%)';
        
        // Add the light to the navbar
        navbar.appendChild(lightContainer);
        
        // Calculate the distance between navbar and hero heading for cord length
        const navbarRect = navbar.getBoundingClientRect();
        const headingRect = heroHeading.getBoundingClientRect();
        const distance = headingRect.top - navbarRect.bottom;
        
        // Adjust cord length based on the distance - make it slightly shorter
        cord.style.height = `${Math.max(80, distance - 50)}px`; // Reduced from 100 to 80, and 30 to 50
        
        console.log("Distance between navbar and heading:", distance);
        
        // Make sure the container has position relative
        const containerStyle = window.getComputedStyle(heroHeading);
        if (containerStyle.position === 'static') {
            heroHeading.style.position = 'relative';
        }
        
        // Add illumination effect to the text
        illuminateText(heroHeading, lightContainer);
        
        // Add reflection overlay
        const reflection = document.createElement('div');
        reflection.className = 'light-reflection';
        heroHeading.appendChild(reflection);
        
        // Define global lightOn variable at the top level
        window.lightOn = lightOn;

        // Start swinging animation with faster speed and sync illumination
        startSwinging(cord, 0.8, heroHeading, reflection); // Increased from 0.6 to 0.8
        
        // Update cord length on scroll to maintain connection with heading
        window.addEventListener('scroll', function() {
            // Get updated positions
            const updatedNavRect = navbar.getBoundingClientRect();
            const updatedHeadingRect = heroHeading.getBoundingClientRect();
            
            // Calculate new distance
            const newDistance = Math.max(0, updatedHeadingRect.top - updatedNavRect.bottom);
            
            // Only update if heading is visible and below navbar
            if (updatedHeadingRect.top > updatedNavRect.bottom) {
                // Show the light when scrolling back up
                const lightBulb = lightContainer.querySelector('.light-bulb');
                const lightGlow = lightContainer.querySelector('.light-glow');
                
                // Only show the light if it's turned on
                if (lightBulb && lightOn) lightBulb.style.opacity = '1';
                if (lightGlow && lightOn) lightGlow.style.opacity = '1';
                
                // Always show the cord
                lightContainer.style.opacity = '1';
                cord.style.height = `${Math.max(100, newDistance - 30)}px`;
            } else {
                // If heading scrolled past navbar, hide the entire light
                lightContainer.style.opacity = '0';
            }
        });
        
        console.log("Hanging light added successfully to navbar");
    }
    
    // Illuminate the text by wrapping each letter in a span while preserving words
    function illuminateText(element, lightSource) {
        // Skip if already processed
        if (element.classList.contains('illuminated-text')) return;
        
        // Mark as processed
        element.classList.add('illuminated-text');
        
        // Get the text content
        const text = element.textContent.trim();
        
        // Split into words to preserve word boundaries
        const words = text.split(' ');
        let html = '';
        
        // Process each word
        words.forEach((word, wordIndex) => {
            // Create a word wrapper to keep letters together
            html += '<span class="word-wrapper" style="display: inline-block; white-space: nowrap;">';
            
            // Wrap each letter in the word
            for (let i = 0; i < word.length; i++) {
                html += `<span>${word[i]}</span>`;
            }
            
            html += '</span>';
            
            // Add space between words (except for the last word)
            if (wordIndex < words.length - 1) {
                html += ' ';
            }
        });
        
        element.innerHTML = html;
        
        // Preserve any gradient background that might be on the original element
        const computedStyle = window.getComputedStyle(element);
        const backgroundImage = computedStyle.backgroundImage;
        
        // If there's a gradient background, store it as a data attribute
        if (backgroundImage && backgroundImage !== 'none' && backgroundImage.includes('gradient')) {
            element.setAttribute('data-original-gradient', backgroundImage);
        }
        
        // Add a shadow element
        const shadowElement = document.createElement('div');
        shadowElement.className = 'text-shadow';
        element.appendChild(shadowElement);
        
        // Store original gradient if it exists
        if (computedStyle.backgroundImage && computedStyle.backgroundImage !== 'none') {
            element.setAttribute('data-original-gradient', computedStyle.backgroundImage);
        }
    }
    
    // Start the swinging animation with adjustable speed and update text illumination
    function startSwinging(cord, speed = 0.5, textElement, reflectionElement) {
        let angle = 0;
        let direction = 1;
        let momentum = 0;
        const maxAngle = 30; // Keep wide swings
        const friction = 0.995; // Keep low friction
        const gravity = 0.03; // Slightly increase gravity for better centering
        const centeringForce = 0.001; // Add a very small force to prevent getting stuck
        
        // Wind effect variables
        let windStrength = 0;
        let windDirection = 1;
        let gustTimer = null;
        
        // Initialize wind if not already defined
        if (typeof window.windStrength === 'undefined') {
            window.windStrength = 0;  // Start with no wind
        }
        if (typeof window.windDirection === 'undefined') {
            window.windDirection = 1;
        }
        
        function swing() {
            // Get current wind values from global variables
            windStrength = window.windStrength || 0;
            windDirection = window.windDirection || 1;
            
            // Apply physics for natural pendulum motion
            momentum += direction * speed;
            momentum *= friction;
            
            // Apply gravity-like force to create pendulum effect
            momentum -= angle * gravity;
            
            // Add wind effect - stronger wind pushes the light
            momentum += windStrength * windDirection * 0.01;
            
            // Add a very small centering force to prevent getting stuck
            if (Math.abs(angle) < 5 && Math.abs(momentum) < 0.1) {
                // Only add random movement if there's wind
                if (windStrength > 0.1) {
                    momentum -= Math.sign(angle) * centeringForce * (Math.random() + 0.5);
                } else {
                    // Strong centering force when no wind
                    momentum -= angle * 0.05;
                }
            }
            
            // Update angle based on momentum
            angle += momentum;
            
            // Limit maximum angle
            if (angle > maxAngle) {
                angle = maxAngle;
                momentum *= -0.5; // Bounce back with reduced momentum
            } else if (angle < -maxAngle) {
                angle = -maxAngle;
                momentum *= -0.5; // Bounce back with reduced momentum
            }
            
            // Apply rotation to cord
            cord.style.transform = `rotate(${angle}deg)`;
            
            // Update text illumination based on light position
            if (textElement && reflectionElement) {
                updateIllumination(textElement, angle, reflectionElement);
            }
            
            // Continue animation
            requestAnimationFrame(swing);
        }
        
        // Simulate changing wind if not already being simulated
        function simulateWind() {
            // Change wind every 3-8 seconds
            const changeWind = () => {
                // Random wind strength
                window.windStrength = 0.2 + Math.random() * 1.5;
                
                // Occasionally change direction
                if (Math.random() < 0.3) {
                    window.windDirection *= -1;
                }
                
                // Occasionally create a strong gust
                if (Math.random() < 0.2) {
                    createGust();
                }
                
                // Occasionally have periods of calm
                if (Math.random() < 0.15) {
                    window.windStrength = 0;
                }
                
                // Schedule next wind change
                clearTimeout(gustTimer);
                gustTimer = setTimeout(changeWind, 3000 + Math.random() * 5000);
            };
            
            // Create a strong gust of wind
            function createGust() {
                const originalStrength = window.windStrength;
                
                // Quickly increase wind strength
                window.windStrength = 2 + Math.random() * 2;
                
                // Return to normal after gust
                setTimeout(() => {
                    window.windStrength = originalStrength;
                }, 2000);
            }
            
            // Initial wind change - start with no wind
            window.windStrength = 0;
            
            // Wait a few seconds before starting wind
            setTimeout(changeWind, 3000);
        }
        
        // Only simulate wind if it's not already being simulated
        if (typeof window.windSimulated === 'undefined') {
            window.windSimulated = true;
            simulateWind();
        }
        
        // Start with no initial momentum for centered position
        momentum = 0;
        
        swing();
    }
    
    // Update the illumination effect on the text based on light position
    function updateIllumination(element, angle, reflectionElement) {
        // Calculate light position (percentage from center)
        // Adjust the multiplier to make illumination more responsive to light movement
        const lightX = 50 - (angle * 3.5); // Increased from 2 to 3.5 for more movement
        
        // Update the reflection gradient position
        reflectionElement.style.setProperty('--light-x', `${lightX}%`);
        
        // Get the shadow element
        const shadowElement = element.querySelector('.text-shadow');
        
        // Get wind direction and strength from global variables
        const windDirection = window.windDirection || 1;
        const windStrength = window.windStrength || 0.5;
        
        // If light is off, show shadow effect
        if (!window.lightOn) {
            // Add shadow effect when light is off
            const letters = element.querySelectorAll('.word-wrapper > span');
            if (letters.length) {
                letters.forEach(letter => {
                    letter.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.5)';
                    letter.style.color = '#333';
                    letter.style.opacity = '0.9';
                });
            }
            
            // Position shadow based on angle
            if (shadowElement) {
                shadowElement.style.transform = `translateX(${angle * 2}px) scaleX(0.9)`;
            }
            
            return;
        }
        
        // Hide shadow when light is on
        if (shadowElement) {
            shadowElement.style.opacity = '0';
        }
        
        // Get all letter spans (direct children of word-wrappers)
        const letters = element.querySelectorAll('.word-wrapper > span');
        if (!letters.length) return;
        
        // Get original gradient if it exists
        const originalGradient = element.getAttribute('data-original-gradient');
        
        // Calculate the center position
        const centerIndex = Math.floor(letters.length / 2);
        
        // Update each letter's illumination
        letters.forEach((letter, index) => {
            // Calculate distance from the light (based on angle and position)
            const letterPosition = index - centerIndex;
            // Adjust this calculation to make illumination follow light more closely
            const distanceFromLight = Math.abs(letterPosition + (angle * 0.8)); // Increased from 0.5 to 0.8
            
            // Calculate brightness based on distance from light
            const maxBrightness = 1.2; // Maximum brightness multiplier
            const brightness = Math.max(1, maxBrightness - (distanceFromLight * 0.04)); // Reduced from 0.05 to 0.04
            
            // Calculate glow intensity based on distance
            const maxGlow = 4; // Increased from 3 to 4
            const glowRadius = Math.max(0, maxGlow - (distanceFromLight * 1.2)); // Reduced from 1.5 to 1.2
            
            // Apply warm light color tint
            const warmLightColor = `rgba(255, ${Math.floor(240 + (brightness * 15))}, ${Math.floor(220 + (brightness * 35))}, ${brightness})`;
            
            // Apply the effects
            letter.style.textShadow = `0 0 ${glowRadius}px rgba(255, 255, 220, ${brightness - 0.7})`;
            
            // Apply original gradient to each letter if it exists
            if (originalGradient) {
                letter.style.backgroundImage = originalGradient;
                letter.style.webkitBackgroundClip = 'text';
                letter.style.backgroundClip = 'text';
                letter.style.webkitTextFillColor = 'transparent';
                letter.style.textFillColor = 'transparent';
                letter.style.opacity = brightness;
            } else {
                letter.style.color = warmLightColor;
            }
        });
    }
    
    // Add CSS styles for the light
    function addLightStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hanging-light-container {
                z-index: 10;
                transform-origin: top center;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            
            .light-cord {
                width: 2px;
                height: 160px; /* Will be dynamically adjusted */
                background: linear-gradient(to bottom, #222, #444);
                margin: 0 auto;
                transform-origin: top center;
                transition: height 0.3s ease;
                box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                position: relative;
            }
            
            /* Add socket at the bottom of cord */
            .light-cord::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                width: 10px;
                height: 8px;
                background-color: #333;
                border-radius: 5px 5px 0 0;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            }
            
            .light-bulb {
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 50px;
                background: radial-gradient(ellipse at center, 
                    rgba(255, 255, 255, 0.9) 0%, 
                    rgba(255, 250, 240, 0.8) 50%, 
                    rgba(255, 240, 220, 0.7) 100%);
                border-radius: 50% 50% 40% 40%;
                box-shadow: 
                    0 0 20px rgba(255, 255, 200, 0.8),
                    0 0 30px rgba(255, 255, 150, 0.4),
                    0 0 40px rgba(255, 255, 100, 0.2),
                    inset 0 -10px 10px rgba(255, 200, 0, 0.1),
                    inset 0 5px 5px rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
                overflow: visible;
            }
            
            /* Filament inside bulb */
            .light-bulb::before {
                content: '';
                position: absolute;
                top: 30%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 10px;
                height: 10px;
                border: 1px solid rgba(255, 200, 100, 0.5);
                border-radius: 50%;
                box-shadow: 0 0 5px rgba(255, 200, 0, 0.8);
            }
            
            /* Bulb base */
            .light-bulb::after {
                content: '';
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 15px;
                height: 10px;
                background: linear-gradient(to bottom, #ddd, #999);
                border-radius: 3px;
                box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
            }
            
            .light-glow {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 300px;
                height: 300px;
                background: radial-gradient(
                    circle,
                    rgba(255, 255, 220, 1) 0%,
                    rgba(255, 255, 200, 0.8) 10%,
                    rgba(255, 255, 180, 0.6) 20%,
                    rgba(255, 255, 150, 0.4) 30%,
                    rgba(255, 255, 100, 0.2) 50%,
                    rgba(255, 255, 50, 0) 70%
                );
                border-radius: 50%;
                opacity: 0.9;
                mix-blend-mode: screen;
                filter: blur(5px);
                animation: pulse 4s infinite alternate;
                transition: opacity 0.3s ease;
            }
            
            /* Light off state - remove ALL glow effects */
            .hanging-light-container[data-light-off="true"] .light-bulb {
                background: radial-gradient(ellipse at center, 
                    rgba(200, 200, 200, 0.7) 0%, 
                    rgba(180, 180, 180, 0.6) 50%, 
                    rgba(150, 150, 150, 0.5) 100%);
                box-shadow: none !important; /* Remove box shadow completely */
            }
            
            .hanging-light-container[data-light-off="true"] .light-glow {
                opacity: 0 !important;
                display: none; /* Completely hide the glow element */
            }
            
            /* Enhanced shadow effect for text when light is off */
            .illuminated-text.light-off span {
                text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5) !important;
                color: #333 !important;
                opacity: 0.9 !important;
            }
            
            /* Add a shadow element for the text */
            .text-shadow {
                position: absolute;
                bottom: -15px;
                left: 0;
                width: 100%;
                height: 20px;
                background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%);
                transform: scaleX(0.9);
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: -1;
                border-radius: 50%;
                filter: blur(3px);
            }
            
            .illuminated-text.light-off .text-shadow {
                opacity: 0.7;
            }
            
            /* Text illumination effect - text only, no box */
            .illuminated-text {
                position: relative;
                z-index: 1;
                filter: none !important; /* Ensure no blur on the text container */
            }
            
            .illuminated-text span {
                display: inline-block;
                transition: text-shadow 0.1s ease, opacity 0.1s ease, color 0.1s ease;
                border: none !important;
                box-shadow: none !important;
                padding: 0 !important;
                margin: 0 !important;
                filter: none !important; /* Ensure no blur on individual letters */
                text-rendering: geometricPrecision; /* Improve text sharpness */
                -webkit-font-smoothing: antialiased; /* Better text rendering */
                -moz-osx-font-smoothing: grayscale; /* Better text rendering */
            }
            
            .light-reflection {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(
                    circle at var(--light-x, 50%) var(--light-y, 0%),
                    rgba(255, 255, 220, 0.15) 0%,
                    rgba(255, 255, 200, 0.05) 50%,
                    transparent 70%
                );
                mix-blend-mode: overlay;
                pointer-events: none;
                z-index: 2;
                box-shadow: none !important;
                border: none !important;
                filter: none !important; /* Remove blur from reflection */
            }
            
            /* Light switch styling */
            .light-switch {
                position: absolute;
                top: -5px;
                right: -30px;
                width: 25px;
                height: 25px;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #fff;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
                pointer-events: auto;
                z-index: 11;
            }
            
            .light-switch:hover {
                background-color: rgba(0, 0, 0, 0.2);
                transform: scale(1.1);
            }
            
            @keyframes pulse {
                0% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.95); filter: blur(5px); }
                50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.05); filter: blur(6px); }
                100% { opacity: 0.85; transform: translate(-50%, -50%) scale(1); filter: blur(4px); }
            }
        `;
        document.head.appendChild(style);
        console.log("Hanging light styles added");
    }

    // Add wind effect CSS with more pronounced visual cues
    function addWindEffectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Wind effect on light */
            .light-bulb {
                transition: transform 0.5s ease, box-shadow 0.5s ease;
            }
            
            .light-glow {
                transition: transform 0.5s ease, background-size 0.5s ease;
            }
            
            /* Strong wind effect */
            .strong-wind .light-cord {
                animation: cordSway 2s ease-in-out infinite;
            }
            
            /* Medium wind effect */
            .medium-wind .light-cord {
                animation: cordSway 3s ease-in-out infinite;
            }
            
            /* Light wind effect */
            .light-wind .light-cord {
                animation: cordSway 4s ease-in-out infinite;
            }
            
            @keyframes cordSway {
                0%, 100% { transform: rotate(var(--wind-angle, 0deg)); }
                50% { transform: rotate(calc(var(--wind-angle, 0deg) + 5deg)); }
            }
            
            /* Wind indicator for debugging */
            .wind-indicator {
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: rgba(0,0,0,0.5);
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                z-index: 9999;
                pointer-events: none;
            }
            
            /* Wind direction arrow */
            .wind-arrow {
                display: inline-block;
                transform: rotate(var(--arrow-rotation, 0deg));
                transition: transform 0.5s ease;
                margin-left: 5px;
            }
        `;
        document.head.appendChild(style);
        
        // Create wind indicator for debugging
        const windIndicator = document.createElement('div');
        windIndicator.className = 'wind-indicator';
        windIndicator.innerHTML = 'Wind: <span class="wind-strength">0.5</span> <span class="wind-arrow">→</span>';
        document.body.appendChild(windIndicator);
        
        // Update wind class and indicator based on wind strength
        setInterval(() => {
            const lightContainer = document.querySelector('.hanging-light-container');
            const windStrengthEl = document.querySelector('.wind-strength');
            const windArrow = document.querySelector('.wind-arrow');
            
            if (lightContainer && typeof window.windStrength !== 'undefined') {
                // Remove all wind classes
                lightContainer.classList.remove('strong-wind', 'medium-wind', 'light-wind');
                
                // Add appropriate wind class
                if (window.windStrength > 1.5) {
                    lightContainer.classList.add('strong-wind');
                    lightContainer.style.setProperty('--wind-angle', `${window.windDirection * 8}deg`);
                } else if (window.windStrength > 0.8) {
                    lightContainer.classList.add('medium-wind');
                    lightContainer.style.setProperty('--wind-angle', `${window.windDirection * 5}deg`);
                } else {
                    lightContainer.classList.add('light-wind');
                    lightContainer.style.setProperty('--wind-angle', `${window.windDirection * 3}deg`);
                }
                
                // Update wind indicator
                if (windStrengthEl) {
                    windStrengthEl.textContent = window.windStrength.toFixed(1);
                }
                
                // Update arrow direction - COMPLETELY REVERSED LOGIC
                // If windDirection is 1, the light swings left, so wind is blowing from right to left (←)
                // If windDirection is -1, the light swings right, so wind is blowing from left to right (→)
                if (windArrow) {
                    if (window.windDirection > 0) {
                        windArrow.innerHTML = '←'; // Left arrow when windDirection is positive
                    } else {
                        windArrow.innerHTML = '→'; // Right arrow when windDirection is negative
                    }
                }
            }
        }, 500);
    }
    
    // Enhance wind simulation for more visible effects
    function initWindSimulation() {
        console.log("Initializing enhanced wind simulation");
        
        // Only initialize if wind variables aren't already set by other scripts
        if (typeof window.windSimulated === 'undefined') {
            // Set initial wind values
            window.windStrength = 0.5;
            window.windDirection = 1;
            window.windSimulated = true;
            
            let gustTimer = null;
            
            // Change wind every 3-8 seconds
            function changeWind() {
                // Random wind strength
                window.windStrength = 0.2 + Math.random() * 1.5;
                
                // Occasionally change direction
                if (Math.random() < 0.3) {
                    window.windDirection *= -1;
                }
                
                // Occasionally create a strong gust
                if (Math.random() < 0.2) {
                    createGust();
                }
                
                // Schedule next wind change
                clearTimeout(gustTimer);
                gustTimer = setTimeout(changeWind, 3000 + Math.random() * 5000);
                
                // Dispatch wind change event for other scripts
                window.dispatchEvent(new CustomEvent('windChange', {
                    detail: {
                        strength: window.windStrength,
                        direction: window.windDirection
                    }
                }));
                
                // Apply wind effects to other elements
                applyWindToElements();
            }
            
            // Create a strong gust of wind
            function createGust() {
                const originalStrength = window.windStrength;
                
                // Quickly increase wind strength
                window.windStrength = 2 + Math.random() * 2;
                
                // Dispatch gust event
                window.dispatchEvent(new CustomEvent('windGust', {
                    detail: {
                        strength: window.windStrength,
                        direction: window.windDirection
                    }
                }));
                
                // Apply gust effects to other elements
                applyWindToElements(true);
                
                // Return to normal after gust
                setTimeout(() => {
                    window.windStrength = originalStrength;
                    
                    // Dispatch wind change event
                    window.dispatchEvent(new CustomEvent('windChange', {
                        detail: {
                            strength: window.windStrength,
                            direction: window.windDirection
                        }
                    }));
                    
                    // Apply normal wind effects
                    applyWindToElements();
                }, 2000);
            }
            
            // Apply wind effects to other elements on the page
            function applyWindToElements(isGust = false) {
                // Find elements that could be affected by wind
                const elements = document.querySelectorAll('.hero-content h1, .hero-content p, .section-header, .card, .portfolio-item');
                
                elements.forEach(el => {
                    // Add subtle transform based on wind
                    const windEffect = window.windDirection * window.windStrength * (isGust ? 2 : 1);
                    el.style.transition = 'transform 1s ease';
                    el.style.transform = `skewX(${windEffect * 0.5}deg) translateX(${windEffect * 2}px)`;
                });
            }
            
            // Start wind simulation
            changeWind();
            
            console.log("Enhanced wind simulation initialized");
        } else {
            console.log("Wind simulation already running, using existing wind system");
        }
    }
    
    // Run init when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // If already loaded, run init immediately
        init();
    }
})();
