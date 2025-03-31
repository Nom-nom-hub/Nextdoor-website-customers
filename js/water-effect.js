// Advanced Water Drip Effect with Rain
document.addEventListener('DOMContentLoaded', function() {
    // Initialize water drip effect
    initWaterDripEffect();
    
    function initWaterDripEffect() {
        const header = document.querySelector('header');
        if (!header) return;
        
        // Create canvas for water effect
        const canvas = document.createElement('canvas');
        canvas.className = 'water-canvas';
        document.body.appendChild(canvas);
        
        // Add CSS for water and rain effects
        const style = document.createElement('style');
        style.textContent = `
            .water-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 999;
            }
            
            /* Rain drop styles */
            .rain-drop {
                position: absolute;
                background: linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.1),
                    rgba(255, 255, 255, 0.4)
                );
                width: 1px;
                height: 15px;
                border-radius: 0 0 1px 1px;
                transform: rotate(10deg);
                opacity: 0.7;
                pointer-events: none;
                z-index: 998;
            }
            
            /* Rain splash styles */
            .rain-splash {
                position: absolute;
                background: radial-gradient(
                    circle at center,
                    rgba(255, 255, 255, 0.6),
                    rgba(255, 255, 255, 0.1) 70%,
                    transparent 100%
                );
                border-radius: 50%;
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                z-index: 998;
            }
            
            @keyframes rainFall {
                0% {
                    transform: translateY(-20px) rotate(10deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(100vh) rotate(10deg);
                    opacity: 0;
                }
            }
            
            @keyframes rainSplash {
                0% {
                    transform: scale(0);
                    opacity: 0.7;
                }
                100% {
                    transform: scale(10);
                    opacity: 0;
                }
            }
            
            /* Existing water effect styles */
            .water-drop {
                position: absolute;
                background: radial-gradient(
                    circle at 50% 30%, 
                    rgba(255, 255, 255, 0.8), 
                    rgba(99, 102, 241, 0.4) 40%, 
                    rgba(99, 102, 241, 0.2) 60%,
                    transparent 70%
                );
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
                filter: blur(1px);
                opacity: 0;
                transform-origin: center bottom;
                pointer-events: none;
                z-index: 1000;
            }
            
            .water-splash {
                position: absolute;
                width: 1px;
                height: 1px;
                background-color: rgba(99, 102, 241, 0.6);
                border-radius: 50%;
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                z-index: 1000;
            }
            
            .water-ripple {
                position: absolute;
                border: 2px solid rgba(99, 102, 241, 0.5);
                border-radius: 50%;
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                z-index: 999;
            }
            
            .water-trail {
                position: absolute;
                width: 2px;
                height: 10px;
                background: linear-gradient(
                    to bottom,
                    rgba(99, 102, 241, 0.1),
                    rgba(99, 102, 241, 0.4)
                );
                border-radius: 50%;
                opacity: 0;
                pointer-events: none;
                z-index: 999;
            }
            
            @keyframes dropFall {
                0% {
                    transform: translateY(0) scaleY(1) scaleX(1);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                30% {
                    transform: translateY(10px) scaleY(1.1) scaleX(0.9);
                    opacity: 0.8;
                }
                60% {
                    transform: translateY(60px) scaleY(1.3) scaleX(0.8);
                    opacity: 0.6;
                }
                80% {
                    transform: translateY(80px) scaleY(1.2) scaleX(0.8);
                    opacity: 0.4;
                }
                100% {
                    transform: translateY(100px) scaleY(0.8) scaleX(1.2);
                    opacity: 0;
                }
            }
            
            @keyframes splash {
                0% {
                    transform: scale(0);
                    opacity: 0.8;
                }
                80% {
                    opacity: 0.5;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(10);
                    opacity: 0;
                }
            }
            
            @keyframes trail {
                0% {
                    height: 0;
                    opacity: 0;
                }
                30% {
                    opacity: 0.5;
                }
                100% {
                    height: 20px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Add more realistic rain styles
        const rainStyles = `
            /* More realistic raindrop styles */
            .rain-drop {
                position: absolute;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
                width: 1px;
                height: 15px;
                border-radius: 0 0 1px 1px;
                box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
                opacity: 0;
                pointer-events: none;
                z-index: 999;
            }
            
            /* Enhanced rain splash styles */
            .rain-splash {
                position: absolute;
                background: radial-gradient(
                    circle at center,
                    rgba(255, 255, 255, 0.8),
                    rgba(255, 255, 255, 0.2) 60%,
                    transparent 100%
                );
                border-radius: 50%;
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                z-index: 998;
                mix-blend-mode: screen;
            }
            
            /* Rain ripple effect */
            .rain-ripple {
                position: absolute;
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                z-index: 997;
            }
            
            @keyframes rainRipple {
                0% {
                    transform: scale(0);
                    opacity: 0.7;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;

        // Add styles to document
        const rainStyleElement = document.createElement('style');
        rainStyleElement.textContent = rainStyles;
        document.head.appendChild(rainStyleElement);
        
        // Set up canvas
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Rain parameters
        const raindrops = [];
        let isRaining = false;
        let rainIntensity = 0.5; // 0 to 1
        
        // Create a raindrop
        function createRaindrop() {
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = -20; // Start above viewport
            
            // Create raindrop element
            const raindrop = document.createElement('div');
            raindrop.className = 'rain-drop';
            
            // Random size for variety
            const size = 0.8 + Math.random() * 0.4; // Slight variation in width
            const length = 10 + Math.random() * 10; // Variable length
            raindrop.style.width = `${size}px`;
            raindrop.style.height = `${length}px`;
            
            // Random wind and angle
            const windDirection = window.windDirection || 1;
            const windStrength = window.windStrength || 0.5;
            const angle = 15 + (windDirection * windStrength * 20); // More pronounced angle
            
            // Adjust horizontal position based on wind
            const horizontalOffset = windDirection * windStrength * 150;
            
            raindrop.style.transform = `rotate(${angle}deg)`;
            raindrop.style.left = `${x}px`;
            raindrop.style.top = `${y}px`;
            
            // Random animation duration - faster in stronger winds
            const duration = Math.max(0.4, 0.7 + Math.random() * 0.3 - (windStrength * 0.3));
            
            // Create custom animation with wind-affected trajectory
            const keyframes = `
                @keyframes rainFall${Math.floor(Math.random() * 1000)} {
                    0% {
                        transform: translateY(0) translateX(0) rotate(${angle}deg);
                        opacity: 0;
                    }
                    5% {
                        opacity: ${0.5 + Math.random() * 0.3};
                    }
                    90% {
                        opacity: ${0.5 + Math.random() * 0.3};
                    }
                    100% {
                        transform: translateY(${window.innerHeight + 50}px) translateX(${horizontalOffset}px) rotate(${angle}deg);
                        opacity: 0;
                    }
                }
            `;
            
            // Add keyframes to document
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            // Apply the custom animation
            const animationName = keyframes.match(/@keyframes\s+([^\s{]+)/)[1];
            raindrop.style.animation = `${animationName} ${duration}s linear forwards`;
            
            // Add to DOM
            document.body.appendChild(raindrop);
            
            // Calculate landing position with wind effect
            const landingX = x + horizontalOffset;
            
            // Remove after animation
            setTimeout(() => {
                // Create splash when raindrop hits "ground"
                createRainSplash(landingX, window.innerHeight - 10, size);
                
                // Remove raindrop and style element
                raindrop.remove();
                styleSheet.remove();
            }, duration * 1000);
        }
        
        // Create rain splash
        function createRainSplash(x, y, size) {
            const splash = document.createElement('div');
            splash.className = 'rain-splash';
            
            // Size based on raindrop size
            const splashSize = 3 + (size * 4);
            splash.style.width = `${splashSize}px`;
            splash.style.height = `${splashSize}px`;
            
            // Position
            splash.style.left = `${x - splashSize/2}px`;
            splash.style.top = `${y - splashSize/2}px`;
            
            // Animation
            const duration = 0.3 + Math.random() * 0.2;
            splash.style.animation = `rainSplash ${duration}s ease-out forwards`;
            
            // Add to DOM
            document.body.appendChild(splash);
            
            // Create ripple effect
            createRainRipple(x, y, splashSize * 3);
            
            // Remove after animation
            setTimeout(() => {
                splash.remove();
            }, duration * 1000);
        }

        // Create rain ripple effect
        function createRainRipple(x, y, size) {
            const ripple = document.createElement('div');
            ripple.className = 'rain-ripple';
            
            // Position
            ripple.style.left = `${x - size/2}px`;
            ripple.style.top = `${y - size/2}px`;
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            
            // Animation
            const duration = 0.8 + Math.random() * 0.4;
            ripple.style.animation = `rainRipple ${duration}s ease-out forwards`;
            
            // Add to DOM
            document.body.appendChild(ripple);
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, duration * 1000);
        }
        
        // Toggle rain effect
        function toggleRain() {
            isRaining = !isRaining;
            
            if (isRaining) {
                startRain();
            }
        }
        
        // Start rain effect
        function startRain() {
            if (!isRaining) return;
            
            // Create raindrops based on intensity and wind
            const baseCount = Math.floor(3 + (rainIntensity * 12));
            const windFactor = Math.min(1.5, 1 + (window.windStrength || 0));
            const count = Math.floor(baseCount * windFactor);
            
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    createRaindrop();
                }, i * (50 - rainIntensity * 20)); // Faster drops in higher intensity
            }
            
            // Schedule next batch of raindrops
            setTimeout(startRain, 300 + Math.random() * 200);
        }
        
        // Change rain intensity and behavior based on wind
        window.addEventListener('windChange', function(e) {
            if (e.detail) {
                // Increase rain intensity with stronger wind
                rainIntensity = Math.min(1, 0.3 + (e.detail.strength * 0.2));
                
                // Adjust rain angle based on wind direction and strength
                const windDirection = e.detail.direction;
                const windStrength = e.detail.strength;
                
                // Start rain automatically in stronger winds
                if (windStrength > 1.0 && !isRaining && Math.random() < 0.3) {
                    isRaining = true;
                    startRain();
                    
                    // Stop rain after a while if wind calms down
                    setTimeout(() => {
                        if (window.windStrength < 0.8) {
                            isRaining = false;
                        }
                    }, 8000);
                }
            }
        });
        
        // Start rain on wind gusts
        window.addEventListener('windGust', function() {
            if (!isRaining) {
                isRaining = true;
                rainIntensity = 0.8;
                startRain();
                
                // Stop rain after gust
                setTimeout(() => {
                    isRaining = false;
                }, 5000);
            } else {
                // Increase intensity during gust
                rainIntensity = 1;
            }
        });
        
        // Add rain toggle button
        const rainButton = document.createElement('button');
        rainButton.textContent = 'Toggle Rain';
        rainButton.style.position = 'fixed';
        rainButton.style.bottom = '10px';
        rainButton.style.right = '10px';
        rainButton.style.zIndex = '1000';
        rainButton.style.padding = '5px 10px';
        rainButton.style.background = 'rgba(0, 0, 0, 0.5)';
        rainButton.style.color = 'white';
        rainButton.style.border = 'none';
        rainButton.style.borderRadius = '4px';
        rainButton.style.cursor = 'pointer';
        
        rainButton.addEventListener('click', toggleRain);
        document.body.appendChild(rainButton);
        
        // Start with some rain
        isRaining = true;
        startRain();
        
        // Water physics parameters
        const drops = [];
        const splashes = [];
        const ripples = [];
        const trails = [];
        const headerBottom = header.offsetTop + header.offsetHeight;
        
        // Create water drops at random intervals
        function createDrop() {
            // Random position along the header
            const x = Math.random() * window.innerWidth;
            
            // Create drop element
            const drop = document.createElement('div');
            drop.className = 'water-drop';
            
            // Random size
            const size = Math.random() * 10 + 5;
            drop.style.width = `${size}px`;
            drop.style.height = `${size * 1.2}px`;
            
            // Position at bottom of header
            drop.style.left = `${x}px`;
            drop.style.top = `${headerBottom}px`;
            
            // Random animation duration
            const duration = Math.random() * 1.5 + 1;
            drop.style.animation = `dropFall ${duration}s cubic-bezier(0.2, 0.8, 0.3, 1) forwards`;
            
            // Add to DOM
            document.body.appendChild(drop);
            
            // Track drop
            const dropObj = {
                element: drop,
                x: x,
                y: headerBottom,
                size: size,
                speed: 2 + Math.random() * 2,
                opacity: 0.8,
                remove: false
            };
            drops.push(dropObj);
            
            // Create trail
            createTrail(x, headerBottom, size);
            
            // Remove after animation
            setTimeout(() => {
                // Create splash when drop hits "ground"
                createSplash(x, headerBottom + 100, size);
                
                // Remove drop
                drop.remove();
                dropObj.remove = true;
                
                // Filter out removed drops
                const index = drops.indexOf(dropObj);
                if (index > -1) {
                    drops.splice(index, 1);
                }
            }, duration * 1000);
        }
        
        // Create splash effect
        function createSplash(x, y, size) {
            const splash = document.createElement('div');
            splash.className = 'water-splash';
            splash.style.left = `${x}px`;
            splash.style.top = `${y}px`;
            
            // Random animation duration
            const duration = Math.random() * 0.5 + 0.5;
            splash.style.animation = `splash ${duration}s ease-out forwards`;
            
            // Add to DOM
            document.body.appendChild(splash);
            
            // Create ripple
            createRipple(x, y, size * 2);
            
            // Remove after animation
            setTimeout(() => {
                splash.remove();
            }, duration * 1000);
        }
        
        // Create ripple effect
        function createRipple(x, y, size) {
            const ripple = document.createElement('div');
            ripple.className = 'water-ripple';
            ripple.style.left = `${x - size/2}px`;
            ripple.style.top = `${y - size/2}px`;
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            
            // Random animation duration
            const duration = Math.random() * 1 + 1;
            ripple.style.animation = `ripple ${duration}s ease-out forwards`;
            
            // Add to DOM
            document.body.appendChild(ripple);
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, duration * 1000);
        }
        
        // Create water trail
        function createTrail(x, y, size) {
            const trail = document.createElement('div');
            trail.className = 'water-trail';
            trail.style.left = `${x + size/2 - 1}px`;
            trail.style.top = `${y}px`;
            
            // Random animation duration
            const duration = Math.random() * 0.5 + 0.5;
            trail.style.animation = `trail ${duration}s ease-out forwards`;
            
            // Add to DOM
            document.body.appendChild(trail);
            
            // Remove after animation
            setTimeout(() => {
                trail.remove();
            }, duration * 1000);
        }
        
        // Create water drops at random intervals
        function startWaterEffect() {
            // Initial drops
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createDrop();
                }, i * 200);
            }
            
            // Continue creating drops
            setInterval(() => {
                if (Math.random() < 0.3) {
                    createDrop();
                }
            }, 300);
        }
        
        // Add interactive water effect on hover
        header.addEventListener('mousemove', function(e) {
            if (Math.random() < 0.1) {
                const x = e.clientX;
                const y = headerBottom;
                const size = Math.random() * 8 + 4;
                
                // Create interactive drop
                const drop = document.createElement('div');
                drop.className = 'water-drop';
                drop.style.width = `${size}px`;
                drop.style.height = `${size * 1.2}px`;
                drop.style.left = `${x}px`;
                drop.style.top = `${y}px`;
                
                const duration = Math.random() * 1.5 + 1;
                drop.style.animation = `dropFall ${duration}s cubic-bezier(0.2, 0.8, 0.3, 1) forwards`;
                
                document.body.appendChild(drop);
                
                // Create trail
                createTrail(x, y, size);
                
                // Remove after animation
                setTimeout(() => {
                    createSplash(x, y + 100, size);
                    drop.remove();
                }, duration * 1000);
            }
        });
        
        // Start water effect
        startWaterEffect();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Advanced water simulation on canvas
        function drawWaterSimulation() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw water connections
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < drops.length; i++) {
                for (let j = i + 1; j < drops.length; j++) {
                    const drop1 = drops[i];
                    const drop2 = drops[j];
                    
                    const dx = drop1.x - drop2.x;
                    const dy = drop1.y - drop2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(drop1.x, drop1.y);
                        ctx.lineTo(drop2.x, drop2.y);
                        ctx.stroke();
                    }
                }
            }
            
            // Request next frame
            requestAnimationFrame(drawWaterSimulation);
        }
        
        // Start water simulation
        drawWaterSimulation();
    }
}); 
