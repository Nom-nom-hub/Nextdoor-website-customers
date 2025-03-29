// Advanced Thunder Effect to complement water drops
document.addEventListener('DOMContentLoaded', function() {
    // Initialize thunder effect after other effects are loaded
    setTimeout(() => {
        initThunderEffect();
    }, 2000);
    
    function initThunderEffect() {
        console.log("Initializing thunder effect");
        
        // Create thunder overlay
        const thunderOverlay = document.createElement('div');
        thunderOverlay.className = 'thunder-overlay';
        document.body.appendChild(thunderOverlay);
        
        // Create lightning canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'lightning-canvas';
        document.body.appendChild(canvas);
        
        // Set up canvas
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Add CSS for thunder effects
        const style = document.createElement('style');
        style.textContent = `
            .thunder-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9997;
                opacity: 0;
                background: radial-gradient(
                    ellipse at center,
                    rgba(99, 102, 241, 0.05) 0%,
                    rgba(99, 102, 241, 0.02) 50%,
                    transparent 70%
                );
                mix-blend-mode: screen;
                transition: opacity 0.2s ease;
            }
            
            .lightning-canvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9998;
                opacity: 0.9;
                mix-blend-mode: screen;
            }
            
            .thunder-highlight {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.8) 0%,
                    rgba(99, 102, 241, 0.4) 30%,
                    transparent 70%
                );
                pointer-events: none;
                z-index: 9996;
                opacity: 0;
                mix-blend-mode: screen;
                transform: translate(-50%, -50%);
                filter: blur(3px);
            }
            
            .element-electricity {
                position: absolute;
                width: 2px;
                height: 10px;
                background-color: rgba(99, 102, 241, 0.8);
                box-shadow: 0 0 5px rgba(99, 102, 241, 0.8), 0 0 10px rgba(255, 255, 255, 0.5);
                pointer-events: none;
                z-index: 9995;
                opacity: 0;
                transform-origin: center;
            }
            
            .thunder-glow {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(
                    circle,
                    rgba(99, 102, 241, 0.3) 0%,
                    rgba(99, 102, 241, 0.1) 50%,
                    transparent 70%
                );
                pointer-events: none;
                z-index: 9994;
                opacity: 0;
                mix-blend-mode: screen;
                transform: translate(-50%, -50%);
            }
            
            @keyframes electricityPulse {
                0% { opacity: 0; transform: scaleY(1); }
                50% { opacity: 1; transform: scaleY(1.2); }
                100% { opacity: 0; transform: scaleY(1); }
            }
            
            @keyframes thunderGlow {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
            }
            
            /* Add subtle electric glow to interactive elements */
            h1, h2, h3, .btn, .portfolio-item, .service-card, .skill-level, .nav-links a {
                position: relative;
                overflow: hidden;
            }
            
            h1::after, h2::after, h3::after, .btn::after, .portfolio-item::after, .service-card::after, .skill-level::after, .nav-links a::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, 
                    rgba(99, 102, 241, 0) 0%,
                    rgba(99, 102, 241, 0.05) 50%,
                    rgba(99, 102, 241, 0) 100%
                );
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 1;
            }
            
            .thunder-active h1::after, .thunder-active h2::after, .thunder-active h3::after, 
            .thunder-active .btn::after, .thunder-active .portfolio-item::after, 
            .thunder-active .service-card::after, .thunder-active .skill-level::after,
            .thunder-active .nav-links a::after {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
        
        // Track interactive elements
        const interactiveElements = document.querySelectorAll('h1, h2, h3, .btn, .portfolio-item, .service-card, .skill-level, .nav-links a');
        
        // Lightning bolt parameters
        const lightningParams = {
            minSegmentLength: 5,
            maxSegmentLength: 15,
            maxOffsetPercent: 0.3,
            roughness: 2.5,
            width: 2,
            color: 'rgba(99, 102, 241, 0.8)',
            glow: 'rgba(255, 255, 255, 0.5)',
            shadowBlur: 15
        };
        
        // Create a lightning bolt
        function createLightningBolt(startX, startY, endX, endY, roughness, branchChance) {
            const points = [];
            points.push({ x: startX, y: startY });
            
            let currX = startX;
            let currY = startY;
            
            // Calculate distance and angle to end point
            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            // Determine number of segments based on distance
            const numSegments = Math.ceil(distance / lightningParams.maxSegmentLength);
            const segmentLength = distance / numSegments;
            
            // Create lightning path
            for (let i = 0; i < numSegments; i++) {
                // Calculate ideal position along the line
                const idealX = startX + Math.cos(angle) * segmentLength * (i + 1);
                const idealY = startY + Math.sin(angle) * segmentLength * (i + 1);
                
                // Add randomness based on roughness
                const offsetAmount = Math.pow(segmentLength * lightningParams.maxOffsetPercent, roughness);
                const offsetX = (Math.random() * 2 - 1) * offsetAmount;
                const offsetY = (Math.random() * 2 - 1) * offsetAmount;
                
                // Set new point
                currX = idealX + offsetX;
                currY = idealY + offsetY;
                
                // Add point to path
                points.push({ x: currX, y: currY });
                
                // Possibly create a branch
                if (i > 0 && i < numSegments - 1 && Math.random() < branchChance) {
                    const branchLength = segmentLength * (0.3 + Math.random() * 0.4);
                    const branchAngle = angle + (Math.random() * Math.PI / 2 - Math.PI / 4);
                    
                    const branchEndX = currX + Math.cos(branchAngle) * branchLength;
                    const branchEndY = currY + Math.sin(branchAngle) * branchLength;
                    
                    createLightningBolt(currX, currY, branchEndX, branchEndY, roughness + 0.2, branchChance * 0.5);
                }
            }
            
            // Ensure the last point is exactly the end point
            points.push({ x: endX, y: endY });
            
            // Draw the lightning bolt
            drawLightningPath(points);
            
            return points;
        }
        
        // Draw a lightning path
        function drawLightningPath(points) {
            if (points.length < 2) return;
            
            // Draw glow
            ctx.shadowColor = lightningParams.glow;
            ctx.shadowBlur = lightningParams.shadowBlur;
            ctx.strokeStyle = lightningParams.color;
            ctx.lineWidth = lightningParams.width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            
            ctx.stroke();
        }
        
        // Create a thunder highlight effect
        function createThunderHighlight(x, y, size) {
            const highlight = document.createElement('div');
            highlight.className = 'thunder-highlight';
            highlight.style.width = `${size}px`;
            highlight.style.height = `${size}px`;
            highlight.style.left = `${x}px`;
            highlight.style.top = `${y}px`;
            
            document.body.appendChild(highlight);
            
            // Animate highlight
            let opacity = 0;
            const maxOpacity = 0.8;
            const fadeSpeed = 0.1;
            
            const fadeIn = setInterval(() => {
                opacity += fadeSpeed;
                highlight.style.opacity = opacity.toString();
                
                if (opacity >= maxOpacity) {
                    clearInterval(fadeIn);
                    
                    // Fade out
                    const fadeOut = setInterval(() => {
                        opacity -= fadeSpeed / 2;
                        highlight.style.opacity = opacity.toString();
                        
                        if (opacity <= 0) {
                            clearInterval(fadeOut);
                            highlight.remove();
                        }
                    }, 30);
                }
            }, 30);
        }
        
        // Create electricity effect between elements
        function createElectricityBetweenElements(element1, element2) {
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();
            
            // Calculate start and end points
            const startX = rect1.left + rect1.width / 2;
            const startY = rect1.top + rect1.height / 2;
            const endX = rect2.left + rect2.width / 2;
            const endY = rect2.top + rect2.height / 2;
            
            // Create lightning bolt
            createLightningBolt(startX, startY, endX, endY, lightningParams.roughness, 0.3);
            
            // Create highlights at both ends
            createThunderHighlight(startX, startY, 30 + Math.random() * 20);
            createThunderHighlight(endX, endY, 30 + Math.random() * 20);
        }
        
        // Create electricity effect on an element
        function createElectricityOnElement(element) {
            const rect = element.getBoundingClientRect();
            
            // Number of electricity particles
            const particleCount = Math.ceil(rect.width / 30);
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'element-electricity';
                
                // Random position along the element
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top + Math.random() * rect.height;
                
                // Random size
                const height = 5 + Math.random() * 15;
                particle.style.height = `${height}px`;
                
                // Position
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                // Random rotation
                const rotation = Math.random() * 360;
                particle.style.transform = `rotate(${rotation}deg)`;
                
                // Add to DOM
                document.body.appendChild(particle);
                
                // Animate
                particle.style.animation = `electricityPulse ${0.5 + Math.random() * 0.5}s ease-in-out`;
                
                // Remove after animation
                setTimeout(() => {
                    particle.remove();
                }, 1000);
            }
            
            // Create glow effect
            const glow = document.createElement('div');
            glow.className = 'thunder-glow';
            
            // Size based on element
            const size = Math.max(rect.width, rect.height) * 1.5;
            glow.style.width = `${size}px`;
            glow.style.height = `${size}px`;
            
            // Position at center of element
            glow.style.left = `${rect.left + rect.width / 2}px`;
            glow.style.top = `${rect.top + rect.height / 2}px`;
            
            // Add to DOM
            document.body.appendChild(glow);
            
            // Animate
            glow.style.animation = `thunderGlow ${0.8 + Math.random() * 0.4}s ease-in-out`;
            
            // Remove after animation
            setTimeout(() => {
                glow.remove();
            }, 1200);
        }
        
        // Create thunder effect
        function createThunderEffect() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Show thunder overlay
            thunderOverlay.style.opacity = '1';
            
            // Add thunder active class to body
            document.body.classList.add('thunder-active');
            
            // Create main lightning bolt
            const startX = Math.random() * canvas.width;
            const startY = 0;
            const endX = Math.random() * canvas.width;
            const endY = canvas.height;
            
            createLightningBolt(startX, startY, endX, endY, lightningParams.roughness, 0.5);
            
            // Create electricity on random elements
            const elementsToElectrify = [];
            interactiveElements.forEach(element => {
                if (Math.random() < 0.3) {
                    elementsToElectrify.push(element);
                }
            });
            
            // Stagger electricity effects
            elementsToElectrify.forEach((element, index) => {
                setTimeout(() => {
                    createElectricityOnElement(element);
                }, index * 100);
            });
            
            // Create electricity between some elements
            if (elementsToElectrify.length >= 2) {
                for (let i = 0; i < Math.min(3, elementsToElectrify.length - 1); i++) {
                    const index1 = Math.floor(Math.random() * elementsToElectrify.length);
                    let index2 = Math.floor(Math.random() * elementsToElectrify.length);
                    
                    // Ensure different elements
                    while (index2 === index1) {
                        index2 = Math.floor(Math.random() * elementsToElectrify.length);
                    }
                    
                    setTimeout(() => {
                        createElectricityBetweenElements(
                            elementsToElectrify[index1],
                            elementsToElectrify[index2]
                        );
                    }, (i + elementsToElectrify.length) * 100);
                }
            }
            
            // Fade out thunder overlay
            setTimeout(() => {
                thunderOverlay.style.opacity = '0';
                document.body.classList.remove('thunder-active');
            }, 1000);
            
            // Clear canvas after effect
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 1500);
        }
        
        // Create thunder effect at random intervals
        function scheduleThunderEffect() {
            // Random interval between 5-15 seconds
            const interval = 5000 + Math.random() * 10000;
            
            setTimeout(() => {
                createThunderEffect();
                scheduleThunderEffect();
            }, interval);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Create initial thunder effect
        setTimeout(() => {
            createThunderEffect();
            scheduleThunderEffect();
        }, 1000);
        
        // Add thunder effect on water splash
        if (window.createRealisticSplash) {
            const originalSplash = window.createRealisticSplash;
            
            window.createRealisticSplash = function(x, y, size) {
                // Call original function
                originalSplash(x, y, size);
                
                // Add thunder effect occasionally
                if (Math.random() < 0.2) {
                    // Create mini lightning from splash point
                    for (let i = 0; i < 2 + Math.random() * 3; i++) {
                        const angle = Math.random() * Math.PI * 2;
                        const distance = 50 + Math.random() * 100;
                        
                        const endX = x + Math.cos(angle) * distance;
                        const endY = y + Math.sin(angle) * distance;
                        
                        setTimeout(() => {
                            createLightningBolt(x, y, endX, endY, lightningParams.roughness + 0.5, 0.3);
                        }, i * 50);
                    }
                    
                    // Create thunder highlight
                    createThunderHighlight(x, y, size * 5);
                }
            };
        }
        
        console.log('Thunder effect initialized');
    }
}); 