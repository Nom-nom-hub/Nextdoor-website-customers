// Ultra-Realistic Lightning Effect
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        initHyperRealisticLightning();
    }, 2500);
    
    function initHyperRealisticLightning() {
        console.log("Initializing hyper-realistic lightning");
        
        // Create high-resolution canvas for lightning
        const canvas = document.createElement('canvas');
        canvas.className = 'lightning-canvas';
        document.body.appendChild(canvas);
        
        // Set up canvas with device pixel ratio for crisp rendering
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio || 1;
        
        function setupCanvas() {
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(pixelRatio, pixelRatio);
        }
        
        setupCanvas();
        
        // Add CSS for enhanced lightning effects
        const style = document.createElement('style');
        style.textContent = `
            .lightning-canvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9998;
                mix-blend-mode: screen;
            }
            
            .lightning-flash {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(190, 190, 255, 0);
                pointer-events: none;
                z-index: 9997;
                mix-blend-mode: screen;
                transition: background-color 0.1s ease;
            }
            
            .lightning-glow {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.9) 0%,
                    rgba(180, 180, 255, 0.7) 20%,
                    rgba(120, 120, 255, 0.5) 40%,
                    rgba(99, 102, 241, 0.3) 60%,
                    transparent 80%
                );
                filter: blur(5px);
                pointer-events: none;
                z-index: 9996;
                mix-blend-mode: screen;
                transform: translate(-50%, -50%);
                opacity: 0;
            }
            
            .thunder-rumble {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9995;
                background: radial-gradient(
                    circle at 50% 100%,
                    rgba(20, 20, 40, 0.2) 0%,
                    transparent 70%
                );
                opacity: 0;
                transition: opacity 2s ease;
            }
            
            .element-charge {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
                background: linear-gradient(135deg,
                    rgba(99, 102, 241, 0) 0%,
                    rgba(99, 102, 241, 0.05) 50%,
                    rgba(99, 102, 241, 0) 100%
                );
                opacity: 0;
                z-index: 1;
                transition: opacity 0.3s ease;
            }
            
            .charged-element {
                position: relative;
                z-index: 1;
            }
            
            .charged-element::before {
                content: '';
                position: absolute;
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                border-radius: inherit;
                background: rgba(99, 102, 241, 0.1);
                box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
                opacity: 0;
                z-index: -1;
                transition: opacity 0.3s ease;
            }
            
            .charged-element.active::before {
                opacity: 1;
            }
            
            .micro-spark {
                position: absolute;
                width: 1px;
                height: 3px;
                background-color: rgba(255, 255, 255, 0.9);
                box-shadow: 0 0 3px rgba(255, 255, 255, 0.8), 0 0 5px rgba(99, 102, 241, 0.5);
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
        
        // Create flash overlay
        const flashOverlay = document.createElement('div');
        flashOverlay.className = 'lightning-flash';
        document.body.appendChild(flashOverlay);
        
        // Create thunder rumble overlay
        const rumbleOverlay = document.createElement('div');
        rumbleOverlay.className = 'thunder-rumble';
        document.body.appendChild(rumbleOverlay);
        
        // Lightning parameters
        const lightningParams = {
            // Core bolt parameters
            minSegmentLength: 3,
            maxSegmentLength: 10,
            maxOffsetPercent: 0.15,
            roughness: 1.3,
            
            // Visual parameters
            boltWidth: 1.5,
            glowWidth: 6,
            coreBrightness: 0.95,
            branchBrightness: 0.7,
            
            // Branch parameters
            branchChance: 0.4,
            maxBranchDepth: 4,
            branchFade: 0.6,
            
            // Colors
            coreColor: 'rgba(255, 255, 255, 0.9)',
            glowColor: 'rgba(180, 180, 255, 0.5)',
            secondaryGlowColor: 'rgba(120, 120, 255, 0.3)',
            
            // Animation
            fadeSpeed: 0.06,
            propagationSpeed: 0.2,
            
            // Atmospheric effects
            cloudOpacity: 0.15,
            rumbleDuration: 3000,
            
            // Interaction
            elementInteractionChance: 0.4,
            microSparkCount: 5,
            chargeEffectDuration: 2000
        };
        
        // Track interactive elements
        const interactiveElements = document.querySelectorAll('h1, h2, h3, .btn, .portfolio-item, .service-card, .skill-level, .nav-links a, img, .logo, .section-header');
        
        // Prepare elements for lightning interaction
        interactiveElements.forEach(element => {
            // Add charge layer
            const chargeLayer = document.createElement('div');
            chargeLayer.className = 'element-charge';
            
            // Only add if element has position relative/absolute/fixed
            const position = window.getComputedStyle(element).position;
            if (position === 'static') {
                element.style.position = 'relative';
            }
            
            element.classList.add('charged-element');
            element.appendChild(chargeLayer);
        });
        
        // Create a realistic lightning bolt
        function createRealisticLightning(startX, startY, endX, endY, roughness, branchChance, depth = 0, opacity = 1) {
            // Generate points for the lightning path
            const points = generateLightningPoints(startX, startY, endX, endY, roughness);
            
            // Draw the main bolt with glow
            drawLightningBolt(points, depth, opacity);
            
            // Create branches
            if (depth < lightningParams.maxBranchDepth) {
                for (let i = 1; i < points.length - 1; i++) {
                    if (Math.random() < branchChance) {
                        const point = points[i];
                        
                        // Random angle for branch
                        const angle = Math.random() * Math.PI * 1.5 - Math.PI * 0.75;
                        
                        // Branch length decreases with depth
                        const branchLength = (50 + Math.random() * 50) * (1 - depth * 0.2);
                        
                        const branchEndX = point.x + Math.cos(angle) * branchLength;
                        const branchEndY = point.y + Math.sin(angle) * branchLength;
                        
                        // Create branch with increased roughness and reduced opacity
                        setTimeout(() => {
                            createRealisticLightning(
                                point.x, point.y, 
                                branchEndX, branchEndY, 
                                roughness * 1.2, 
                                branchChance * 0.7, 
                                depth + 1,
                                opacity * lightningParams.branchFade
                            );
                        }, i * lightningParams.propagationSpeed * 100);
                    }
                }
            }
            
            return points;
        }
        
        // Generate points for a lightning path
        function generateLightningPoints(startX, startY, endX, endY, roughness) {
            const points = [];
            points.push({ x: startX, y: startY });
            
            // Calculate distance and angle to end point
            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            // Determine number of segments based on distance
            const numSegments = Math.max(5, Math.ceil(distance / lightningParams.maxSegmentLength));
            const segmentLength = distance / numSegments;
            
            // Create lightning path with fractal-like displacement
            let currX = startX;
            let currY = startY;
            
            for (let i = 0; i < numSegments; i++) {
                // Calculate ideal position along the line
                const idealX = startX + Math.cos(angle) * segmentLength * (i + 1);
                const idealY = startY + Math.sin(angle) * segmentLength * (i + 1);
                
                // Add randomness based on roughness and distance from endpoints
                const segmentRoughness = roughness * Math.sin(Math.PI * (i + 1) / numSegments);
                const offsetAmount = Math.pow(segmentLength * lightningParams.maxOffsetPercent, segmentRoughness);
                
                // More displacement in the middle, less at endpoints
                const distFromEnd = Math.min(i + 1, numSegments - i - 1) / numSegments;
                const scaledOffset = offsetAmount * (distFromEnd * 2);
                
                const offsetX = (Math.random() * 2 - 1) * scaledOffset;
                const offsetY = (Math.random() * 2 - 1) * scaledOffset;
                
                // Set new point
                currX = idealX + offsetX;
                currY = idealY + offsetY;
                
                // Add point to path
                points.push({ x: currX, y: currY });
            }
            
            // Ensure the last point is exactly the end point
            points.push({ x: endX, y: endY });
            
            return points;
        }
        
        // Draw a lightning bolt with glow effects
        function drawLightningBolt(points, depth, opacity) {
            if (points.length < 2) return;
            
            // Draw outer glow
            ctx.strokeStyle = lightningParams.secondaryGlowColor;
            ctx.lineWidth = lightningParams.glowWidth * 2 * (1 - depth * 0.2);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = opacity * 0.4;
            
            drawPath(points);
            
            // Draw middle glow
            ctx.strokeStyle = lightningParams.glowColor;
            ctx.lineWidth = lightningParams.glowWidth * (1 - depth * 0.2);
            ctx.globalAlpha = opacity * 0.7;
            
            drawPath(points);
            
            // Draw core
            ctx.strokeStyle = lightningParams.coreColor;
            ctx.lineWidth = lightningParams.boltWidth * (1 - depth * 0.2);
            ctx.globalAlpha = opacity;
            
            drawPath(points);
            
            // Reset global alpha
            ctx.globalAlpha = 1.0;
        }
        
        // Draw a path with the current context settings
        function drawPath(points) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            
            ctx.stroke();
        }
        
        // Create a lightning flash effect
        function createLightningFlash(intensity) {
            // Flash the screen
            flashOverlay.style.backgroundColor = `rgba(190, 190, 255, ${intensity * 0.2})`;
            
            // Fade out flash
            setTimeout(() => {
                flashOverlay.style.backgroundColor = 'rgba(190, 190, 255, 0)';
            }, 100);
            
            // Create rumble effect
            rumbleOverlay.style.opacity = intensity * 0.3;
            
            // Fade out rumble
            setTimeout(() => {
                rumbleOverlay.style.opacity = '0';
            }, lightningParams.rumbleDuration);
        }
        
        // Create a glow effect at a point
        function createLightningGlow(x, y, size, intensity) {
            const glow = document.createElement('div');
            glow.className = 'lightning-glow';
            
            // Size and position
            glow.style.width = `${size}px`;
            glow.style.height = `${size}px`;
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            
            document.body.appendChild(glow);
            
            // Animate glow
            let opacity = 0;
            const fadeIn = setInterval(() => {
                opacity += 0.1;
                glow.style.opacity = (opacity * intensity).toString();
                
                if (opacity >= 1) {
                    clearInterval(fadeIn);
                    
                    // Fade out
                    const fadeOut = setInterval(() => {
                        opacity -= 0.05;
                        glow.style.opacity = (opacity * intensity).toString();
                        
                        if (opacity <= 0) {
                            clearInterval(fadeOut);
                            glow.remove();
                        }
                    }, 30);
                }
            }, 20);
        }
        
        // Create micro sparks on an element
        function createMicroSparks(element) {
            const rect = element.getBoundingClientRect();
            
            // Create multiple micro sparks
            for (let i = 0; i < lightningParams.microSparkCount; i++) {
                setTimeout(() => {
                    // Create spark element
                    const spark = document.createElement('div');
                    spark.className = 'micro-spark';
                    
                    // Random position on element edge
                    let x, y;
                    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
                    
                    switch (edge) {
                        case 0: // top
                            x = rect.left + Math.random() * rect.width;
                            y = rect.top;
                            spark.style.transform = 'rotate(0deg)';
                            break;
                        case 1: // right
                            x = rect.right;
                            y = rect.top + Math.random() * rect.height;
                            spark.style.transform = 'rotate(90deg)';
                            break;
                        case 2: // bottom
                            x = rect.left + Math.random() * rect.width;
                            y = rect.bottom;
                            spark.style.transform = 'rotate(180deg)';
                            break;
                        case 3: // left
                            x = rect.left;
                            y = rect.top + Math.random() * rect.height;
                            spark.style.transform = 'rotate(270deg)';
                            break;
                    }
                    
                    spark.style.left = `${x}px`;
                    spark.style.top = `${y}px`;
                    
                    document.body.appendChild(spark);
                    
                    // Animate spark
                    let opacity = 0;
                    const duration = 100 + Math.random() * 200;
                    const startTime = performance.now();
                    
                    function animateSpark() {
                        const elapsed = performance.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        if (progress < 0.5) {
                            opacity = progress * 2;
                        } else {
                            opacity = (1 - progress) * 2;
                        }
                        
                        spark.style.opacity = opacity.toString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(animateSpark);
                        } else {
                            spark.remove();
                        }
                    }
                    
                    requestAnimationFrame(animateSpark);
                }, i * 50 + Math.random() * 100);
            }
        }
        
        // Charge an element with electricity
        function chargeElement(element) {
            // Add active class
            element.classList.add('active');
            
            // Find charge layer
            const chargeLayer = element.querySelector('.element-charge');
            if (chargeLayer) {
                chargeLayer.style.opacity = '1';
            }
            
            // Create micro sparks
            createMicroSparks(element);
            
            // Remove charge after duration
            setTimeout(() => {
                element.classList.remove('active');
                if (chargeLayer) {
                    chargeLayer.style.opacity = '0';
                }
            }, lightningParams.chargeEffectDuration);
        }
        
        // Create a complete lightning storm effect
        function createLightningStorm() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
            
            // Determine lightning intensity (0.5 - 1.0)
            const intensity = 0.5 + Math.random() * 0.5;
            
            // Create flash effect
            createLightningFlash(intensity);
            
            // Create main lightning bolt
            const startX = Math.random() * window.innerWidth;
            const startY = 0;
            const endX = Math.random() * window.innerWidth;
            const endY = window.innerHeight;
            
            const mainBolt = createRealisticLightning(
                startX, startY, 
                endX, endY, 
                lightningParams.roughness, 
                lightningParams.branchChance
            );
            
            // Create glow at impact point
            createLightningGlow(endX, endY, 100 + Math.random() * 100, intensity);
            
            // Charge random elements
            interactiveElements.forEach(element => {
                if (Math.random() < lightningParams.elementInteractionChance) {
                    setTimeout(() => {
                        chargeElement(element);
                    }, Math.random() * 500);
                }
            });
            
            // Create secondary bolts
            const secondaryBoltCount = Math.floor(Math.random() * 3);
            
            for (let i = 0; i < secondaryBoltCount; i++) {
                setTimeout(() => {
                    const secStartX = Math.random() * window.innerWidth;
                    const secStartY = 0;
                    const secEndX = Math.random() * window.innerWidth;
                    const secEndY = window.innerHeight;
                    
                    createRealisticLightning(
                        secStartX, secStartY, 
                        secEndX, secEndY, 
                        lightningParams.roughness * 1.2, 
                        lightningParams.branchChance * 0.8,
                        0,
                        0.7
                    );
                    
                    // Create smaller glow at impact point
                    createLightningGlow(secEndX, secEndY, 50 + Math.random() * 50, intensity * 0.7);
                }, 200 + i * 300);
            }
            
            // Fade out lightning
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
            }, 1500);
        }
        
        // Schedule lightning storms
        function scheduleLightningStorm() {
            // Random interval between 8-20 seconds
            const interval = 8000 + Math.random() * 12000;
            
            setTimeout(() => {
                createLightningStorm();
                scheduleLightningStorm();
            }, interval);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            setupCanvas();
        });
        
        // Create initial lightning after a delay
        setTimeout(() => {
            createLightningStorm();
            scheduleLightningStorm();
        }, 3000);
        
        // Integrate with water effect if available
        if (window.createRealisticSplash) {
            const originalSplash = window.createRealisticSplash;
            
            window.createRealisticSplash = function(x, y, size) {
                // Call original function
                originalSplash(x, y, size);
                
                // Add lightning effect occasionally
                if (Math.random() < 0.15) {
                    // Create micro lightning from splash point
                    for (let i = 0; i < 1 + Math.random() * 2; i++) {
                        setTimeout(() => {
                            const angle = Math.random() * Math.PI * 2;
                            const distance = 30 + Math.random() * 70;
                            
                            const endX = x + Math.cos(angle) * distance;
                            const endY = y + Math.sin(angle) * distance;
                            
                            createRealisticLightning(
                                x, y, 
                                endX, endY, 
                                lightningParams.roughness * 1.5, 
                                lightningParams.branchChance * 0.5,
                                1,
                                0.6
                            );
                            
                            // Create small glow
                            createLightningGlow(x, y, size * 3, 0.4);
                        }, i * 50);
                    }
                }
            };
        }
        
        console.log('Hyper-realistic lightning initialized');
    }
}); 