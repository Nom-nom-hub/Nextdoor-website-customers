// Advanced Element Interaction for Water Effect
document.addEventListener('DOMContentLoaded', function() {
    // Initialize element interaction for water
    initElementInteraction();
    
    function initElementInteraction() {
        // Wait for realistic water to initialize
        setTimeout(() => {
            enhanceWaterWithElementInteraction();
        }, 1000);
        
        function enhanceWaterWithElementInteraction() {
            // Get all interactive elements
            const interactiveElements = document.querySelectorAll('h1, h2, h3, p, img, .btn, .card, .portfolio-item, .service-card, .about-image');
            
            // Create element map with positions and dimensions
            const elementMap = [];
            
            // Update element positions
            function updateElementMap() {
                elementMap.length = 0;
                
                interactiveElements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    
                    // Only include visible elements
                    if (rect.top < window.innerHeight && rect.bottom > 0 &&
                        rect.left < window.innerWidth && rect.right > 0) {
                        elementMap.push({
                            element: element,
                            rect: rect,
                            top: rect.top,
                            left: rect.left,
                            right: rect.right,
                            bottom: rect.bottom,
                            width: rect.width,
                            height: rect.height,
                            waterDrops: [],
                            maxDrops: Math.ceil(rect.width / 100) // Limit drops based on element width
                        });
                    }
                });
            }
            
            // Initial map creation
            updateElementMap();
            
            // Update on scroll and resize
            window.addEventListener('scroll', updateElementMap);
            window.addEventListener('resize', updateElementMap);
            
            // Extend existing water drop functionality
            const originalCreateDrop = window.createRealisticDrop;
            const originalUpdateDrops = window.updateWaterDrops;
            
            if (!originalCreateDrop || !originalUpdateDrops) {
                console.warn('Water effect functions not found');
                return;
            }
            
            // Override drop update function to check for element collisions
            window.updateWaterDrops = function() {
                const drops = window.waterDrops || [];
                
                for (let i = drops.length - 1; i >= 0; i--) {
                    const drop = drops[i];
                    
                    if (!drop.active) {
                        drops.splice(i, 1);
                        continue;
                    }
                    
                    // Standard physics update
                    drop.velocity += drop.acceleration;
                    if (drop.velocity > drop.terminalVelocity) {
                        drop.velocity = drop.terminalVelocity;
                    }
                    
                    const oldY = drop.y;
                    drop.y += drop.velocity;
                    
                    // Check for element collisions if drop is not already attached
                    if (!drop.attachedToElement) {
                        for (let j = 0; j < elementMap.length; j++) {
                            const elem = elementMap[j];
                            
                            // Check if drop will intersect with element in this frame
                            if (oldY <= elem.top && drop.y >= elem.top && 
                                drop.x >= elem.left && drop.x <= elem.right &&
                                elem.waterDrops.length < elem.maxDrops) {
                                
                                // Attach drop to element
                                drop.attachedToElement = elem;
                                drop.attachPosition = (drop.x - elem.left) / elem.width;
                                drop.attachTime = Date.now();
                                drop.stickDuration = 500 + Math.random() * 2000; // Random stick time
                                drop.y = elem.top;
                                drop.velocity *= 0.3; // Reduce velocity on impact
                                
                                // Add splash effect at impact point
                                createElementSplash(drop.x, elem.top, drop.width);
                                
                                // Add to element's water drops
                                elem.waterDrops.push(drop);
                                
                                break;
                            }
                        }
                    }
                    
                    // Handle attached drops
                    if (drop.attachedToElement) {
                        const elem = drop.attachedToElement;
                        const attachedTime = Date.now() - drop.attachTime;
                        
                        // Update position based on element (for scrolling/moving elements)
                        const newRect = elem.element.getBoundingClientRect();
                        drop.x = newRect.left + (drop.attachPosition * newRect.width);
                        
                        // Check if drop should detach
                        if (attachedTime > drop.stickDuration) {
                            // Detach drop
                            drop.attachedToElement.waterDrops = drop.attachedToElement.waterDrops.filter(d => d !== drop);
                            drop.attachedToElement = null;
                            drop.velocity = 1 + Math.random() * 2; // Initial velocity after detaching
                            
                            // Create small trail when detaching
                            createWaterTrail(drop.x, drop.y, drop.width * 0.4, 0);
                        } else {
                            // Slowly move down the element while attached
                            const slideProgress = Math.min(attachedTime / drop.stickDuration, 1);
                            const slideDistance = Math.min(10, elem.height);
                            drop.y = elem.top + (slideProgress * slideDistance);
                            
                            // Occasionally create a small drip effect
                            if (Math.random() < 0.01 && slideProgress > 0.5) {
                                createMiniDrip(drop.x, drop.y, drop.width * 0.7);
                            }
                            
                            // Make drop slightly wobble while on element
                            drop.wobblePhase += 0.05;
                            const wobble = Math.sin(drop.wobblePhase * drop.wobbleFrequency) * (drop.wobbleAmplitude * 0.5);
                            drop.element.style.transform = `translateX(${wobble * 2}px) scaleY(1.1) scaleX(0.9)`;
                        }
                    } else {
                        // Normal wobble and stretching for falling drops
                        drop.wobblePhase += 0.1;
                        const wobble = Math.sin(drop.wobblePhase * drop.wobbleFrequency) * drop.wobbleAmplitude;
                        const stretchFactor = 1 + (drop.velocity * 0.03);
                        drop.element.style.transform = `translateX(${wobble * 3}px) scaleY(${stretchFactor}) scaleX(${1/Math.sqrt(stretchFactor)})`;
                    }
                    
                    // Update position
                    drop.element.style.top = `${drop.y}px`;
                    drop.element.style.opacity = drop.opacity.toString();
                    
                    // Update opacity
                    if (drop.opacity < drop.targetOpacity) {
                        drop.opacity += drop.opacitySpeed;
                    }
                    
                    // Create trail for falling drops
                    if (!drop.attachedToElement) {
                        drop.trailTimer++;
                        if (drop.trailTimer >= drop.trailInterval) {
                            drop.trailTimer = 0;
                            createWaterTrail(drop.x, drop.y, drop.width * 0.5, 0);
                        }
                    }
                    
                    // Check if drop has fallen below viewport
                    if (drop.y > window.innerHeight) {
                        createRealisticSplash(drop.x, window.innerHeight - 20, drop.width * 2);
                        drop.element.remove();
                        drop.active = false;
                    }
                }
                
                // Create new drops if needed
                if (drops.length < window.maxDrops && Math.random() < 0.05) {
                    createRealisticDrop();
                }
            };
            
            // Create a mini drip that falls from an attached drop
            function createMiniDrip(x, y, size) {
                const drip = document.createElement('div');
                drip.className = 'water-drop mini-drip';
                
                // Smaller size for mini drip
                drip.style.width = `${size * 0.6}px`;
                drip.style.height = `${size * 0.8}px`;
                drip.style.left = `${x}px`;
                drip.style.top = `${y}px`;
                
                document.body.appendChild(drip);
                
                // Physics properties
                const dripObj = {
                    element: drip,
                    x: x,
                    y: y,
                    width: size * 0.6,
                    height: size * 0.8,
                    velocity: 0.5,
                    acceleration: 0.15 + Math.random() * 0.1,
                    terminalVelocity: 8 + Math.random() * 3,
                    wobblePhase: Math.random() * Math.PI * 2,
                    wobbleFrequency: 3 + Math.random() * 2,
                    wobbleAmplitude: 0.1 + Math.random() * 0.2,
                    active: true,
                    opacity: 0.6,
                    targetOpacity: 0.6,
                    opacitySpeed: 0.1,
                    trailTimer: 0,
                    trailInterval: 4 + Math.random() * 2,
                };
                
                // Add to drops array
                window.waterDrops.push(dripObj);
                
                // Animate opacity
                let opacity = 0;
                const fadeIn = setInterval(() => {
                    opacity += 0.1;
                    drip.style.opacity = opacity.toString();
                    if (opacity >= dripObj.targetOpacity) {
                        clearInterval(fadeIn);
                    }
                }, 30);
                
                return dripObj;
            }
            
            // Create splash effect when drop hits an element
            function createElementSplash(x, y, size) {
                // Create tiny splash particles
                const particleCount = 3 + Math.floor(Math.random() * 4);
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'splash-particle element-splash';
                    
                    // Tiny size for element splash
                    const particleSize = (Math.random() * size * 0.2) + (size * 0.1);
                    particle.style.width = `${particleSize}px`;
                    particle.style.height = `${particleSize}px`;
                    
                    // Position at impact point
                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;
                    
                    document.body.appendChild(particle);
                    
                    // Random angle (mostly upward and to sides)
                    const angle = (Math.random() * Math.PI) - (Math.PI/2);
                    const distance = 5 + Math.random() * 15;
                    const duration = 200 + Math.random() * 200;
                    
                    // Animate particle
                    let startTime = performance.now();
                    
                    function animateParticle() {
                        const elapsed = performance.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Quadratic ease out
                        const easeOut = progress * (2 - progress);
                        
                        // Calculate position with arc
                        const x_offset = Math.cos(angle) * distance * easeOut;
                        const y_offset = Math.sin(angle) * distance * easeOut - (10 * progress * progress);
                        
                        particle.style.transform = `translate(${x_offset}px, ${y_offset}px) scale(${1 - progress * 0.5})`;
                        particle.style.opacity = (1 - progress).toString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(animateParticle);
                        } else {
                            particle.remove();
                        }
                    }
                    
                    requestAnimationFrame(animateParticle);
                }
                
                // Create tiny ripple
                const ripple = document.createElement('div');
                ripple.className = 'water-ripple element-ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.style.width = '0';
                ripple.style.height = '0';
                ripple.style.borderWidth = '1px';
                
                document.body.appendChild(ripple);
                
                // Animate ripple
                let size = 0;
                let opacity = 0.7;
                const maxSize = size * 3;
                const growSpeed = 0.5;
                const fadeSpeed = 0.02;
                
                function animateRipple() {
                    size += growSpeed;
                    opacity -= fadeSpeed;
                    
                    ripple.style.width = `${size}px`;
                    ripple.style.height = `${size}px`;
                    ripple.style.marginLeft = `-${size/2}px`;
                    ripple.style.marginTop = `-${size/2}px`;
                    ripple.style.opacity = opacity.toString();
                    
                    if (opacity > 0 && size < maxSize) {
                        requestAnimationFrame(animateRipple);
                    } else {
                        ripple.remove();
                    }
                }
                
                requestAnimationFrame(animateRipple);
            }
            
            // Add CSS for new elements
            const style = document.createElement('style');
            style.textContent = `
                .mini-drip {
                    opacity: 0;
                    filter: blur(0.5px);
                }
                
                .element-splash {
                    background-color: rgba(255, 255, 255, 0.9);
                    filter: blur(0.5px);
                }
                
                .element-ripple {
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    position: absolute;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 1000;
                }
                
                .water-puddle {
                    position: absolute;
                    background: radial-gradient(
                        ellipse at center,
                        rgba(255, 255, 255, 0.15) 0%,
                        rgba(99, 102, 241, 0.1) 50%,
                        transparent 70%
                    );
                    border-radius: 50%;
                    transform: translateY(-50%) scaleY(0.3);
                    pointer-events: none;
                    z-index: 998;
                    mix-blend-mode: overlay;
                }
            `;
            document.head.appendChild(style);
            
            // Make window.waterDrops accessible
            if (window.drops) {
                window.waterDrops = window.drops;
            }
            
            console.log('Element interaction for water initialized');
        }
    }
}); 