// Realistic Cloud Effect for Rain
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        initCloudEffect();
    }, 4500);
    
    function initCloudEffect() {
        console.log("Initializing cloud effect");
        
        // Create cloud container
        const cloudContainer = document.createElement('div');
        cloudContainer.className = 'cloud-container';
        document.body.appendChild(cloudContainer);
        
        // Add CSS for clouds
        const style = document.createElement('style');
        style.textContent = `
            .cloud-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 90;
                overflow: hidden;
            }
            
            .cloud {
                position: absolute;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                filter: blur(20px);
                opacity: 0.4;
                box-shadow: 0 0 40px 20px rgba(255, 255, 255, 0.5);
                transform: scale(1);
                transition: opacity 2s ease;
            }
            
            .cloud::before,
            .cloud::after {
                content: '';
                position: absolute;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
            }
            
            .cloud::before {
                width: 60%;
                height: 60%;
                top: -30%;
                left: 20%;
                filter: blur(15px);
            }
            
            .cloud::after {
                width: 70%;
                height: 70%;
                top: -20%;
                right: 10%;
                filter: blur(15px);
            }
            
            .cloud-dark {
                background: rgba(50, 50, 70, 0.6);
                box-shadow: 0 0 40px 20px rgba(50, 50, 70, 0.4);
            }
            
            .cloud-dark::before,
            .cloud-dark::after {
                background: rgba(50, 50, 70, 0.6);
            }
            
            .cloud-highlight {
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                filter: blur(5px);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            /* Ensure clouds work with the comparison slider */
            body:not(.effects-disabled) .cloud-container {
                clip-path: polygon(var(--slider-position, 0%) 0, 100% 0, 100% 100%, var(--slider-position, 0%) 100%);
            }
            
            /* Hide clouds when effects are disabled */
            body.effects-disabled .cloud-container {
                display: none !important;
            }
            
            /* Simple clouds for the basic side */
            .basic-cloud-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 30%;
                pointer-events: none;
                z-index: 89;
                overflow: hidden;
                clip-path: polygon(0 0, var(--slider-position, 100%) 0, var(--slider-position, 100%) 100%, 0 100%);
            }
            
            .basic-cloud {
                position: absolute;
                background: rgba(200, 200, 220, 0.4);
                border-radius: 50%;
                filter: blur(10px);
            }
        `;
        document.head.appendChild(style);
        
        // Create basic cloud container for the left side of the comparison
        const basicCloudContainer = document.createElement('div');
        basicCloudContainer.className = 'basic-cloud-container';
        document.body.appendChild(basicCloudContainer);
        
        // Create basic clouds
        for (let i = 0; i < 5; i++) {
            createBasicCloud();
        }
        
        // Create initial clouds
        for (let i = 0; i < 4; i++) {
            createCloud();
        }
        
        // Schedule cloud creation
        setInterval(createCloud, 8000);
        
        // Create a cloud
        function createCloud() {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            
            // Randomize cloud appearance
            const size = 150 + Math.random() * 250;
            const posX = -size/2 + Math.random() * (window.innerWidth + size);
            const posY = -size/2 + Math.random() * (window.innerHeight * 0.5);
            const duration = 60 + Math.random() * 60;
            const delay = Math.random() * 10;
            
            // Set cloud style
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size * 0.6}px`;
            cloud.style.left = `${posX}px`;
            cloud.style.top = `${posY}px`;
            cloud.style.opacity = '0';
            
            // Randomly make some clouds darker
            if (Math.random() > 0.6) {
                cloud.classList.add('cloud-dark');
            }
            
            // Add cloud to container
            cloudContainer.appendChild(cloud);
            
            // Animate cloud appearance
            setTimeout(() => {
                cloud.style.opacity = `${0.2 + Math.random() * 0.3}`;
                
                // Animate cloud movement
                cloud.style.transition = `opacity 2s ease, transform ${duration}s linear, left ${duration}s linear`;
                
                setTimeout(() => {
                    const moveX = Math.random() * 100 - 50;
                    cloud.style.left = `${posX + moveX}px`;
                    cloud.style.transform = 'scale(1.1)';
                    
                    // Add lightning effect to cloud occasionally
                    if (Math.random() > 0.7) {
                        addCloudLightning(cloud);
                    }
                    
                    // Remove cloud after duration
                    setTimeout(() => {
                        cloud.style.opacity = '0';
                        
                        // Remove from DOM after fade out
                        setTimeout(() => {
                            cloud.remove();
                        }, 2000);
                    }, duration * 1000 - 2000);
                }, delay * 1000);
            }, 100);
        }
        
        // Create a basic cloud for the left side
        function createBasicCloud() {
            const cloud = document.createElement('div');
            cloud.className = 'basic-cloud';
            
            // Randomize cloud appearance
            const size = 100 + Math.random() * 150;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * (window.innerHeight * 0.3);
            
            // Set cloud style
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size * 0.6}px`;
            cloud.style.left = `${posX}px`;
            cloud.style.top = `${posY}px`;
            
            // Add cloud to container
            basicCloudContainer.appendChild(cloud);
        }
        
        // Add lightning effect to a cloud
        function addCloudLightning(cloud) {
            // Only proceed if lightning effect is available
            if (!window.createRealisticLightning) return;
            
            // Schedule lightning flashes
            const flashCount = 1 + Math.floor(Math.random() * 3);
            
            for (let i = 0; i < flashCount; i++) {
                setTimeout(() => {
                    // Create cloud highlight
                    const highlight = document.createElement('div');
                    highlight.className = 'cloud-highlight';
                    
                    // Position highlight within cloud
                    const cloudRect = cloud.getBoundingClientRect();
                    const highlightSize = cloudRect.width * 0.7;
                    
                    highlight.style.width = `${highlightSize}px`;
                    highlight.style.height = `${highlightSize}px`;
                    highlight.style.left = `${cloudRect.width * 0.3 + Math.random() * (cloudRect.width * 0.4)}px`;
                    highlight.style.top = `${cloudRect.height * 0.3 + Math.random() * (cloudRect.height * 0.4)}px`;
                    
                    cloud.appendChild(highlight);
                    
                    // Flash the highlight
                    setTimeout(() => {
                        highlight.style.opacity = '0.8';
                        
                        // Create lightning from cloud
                        if (window.createRealisticLightning) {
                            const cloudCenterX = cloudRect.left + cloudRect.width/2;
                            const cloudBottomY = cloudRect.top + cloudRect.height;
                            
                            // Random end position below the cloud
                            const endX = cloudCenterX - cloudRect.width/4 + Math.random() * (cloudRect.width/2);
                            const endY = cloudBottomY + 100 + Math.random() * 300;
                            
                            // Create lightning bolt
                            window.createRealisticLightning(
                                cloudCenterX, 
                                cloudBottomY,
                                endX,
                                endY,
                                0.8, // roughness
                                0.3  // branch chance
                            );
                        }
                        
                        // Fade out highlight
                        setTimeout(() => {
                            highlight.style.opacity = '0';
                            
                            // Remove highlight after fade
                            setTimeout(() => {
                                highlight.remove();
                            }, 300);
                        }, 100);
                    }, 50);
                }, i * (1000 + Math.random() * 2000));
            }
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Adjust cloud positions if needed
        });
        
        console.log("Cloud effect initialized");
    }
}); 