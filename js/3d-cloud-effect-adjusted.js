// Adjusted 3D Cloud Effect with Content Visibility Improvements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        initAdjusted3DCloudEffect();
    }, 5000);
    
    function initAdjusted3DCloudEffect() {
        console.log("Initializing adjusted 3D cloud effect");
        
        // Create cloud container
        const cloudContainer = document.createElement('div');
        cloudContainer.className = 'cloud-3d-container';
        document.body.appendChild(cloudContainer);
        
        // Add CSS for 3D clouds with improved content visibility
        const style = document.createElement('style');
        style.textContent = `
            .cloud-3d-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 40%; /* Reduced height to keep clouds at the top */
                pointer-events: none;
                z-index: 91;
                overflow: hidden;
                perspective: 1000px;
                transform-style: preserve-3d;
            }
            
            .cloud-3d {
                position: absolute;
                transform-style: preserve-3d;
                will-change: transform;
                opacity: 0.6 !important; /* Reduced opacity for better content visibility */
            }
            
            .cloud-puff {
                position: absolute;
                background: rgba(255, 255, 255, 0.6); /* Reduced opacity */
                border-radius: 50%;
                filter: blur(8px);
                transform: translateZ(0);
                box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.3); /* Softer glow */
            }
            
            .cloud-puff-dark {
                background: rgba(70, 70, 90, 0.5); /* Reduced opacity */
                box-shadow: 0 0 20px 10px rgba(70, 70, 90, 0.3); /* Softer glow */
            }
            
            .cloud-shadow {
                position: absolute;
                background: radial-gradient(ellipse at center, 
                    rgba(0, 0, 0, 0.1) 0%, 
                    rgba(0, 0, 0, 0.05) 40%, 
                    rgba(0, 0, 0, 0) 70%);
                border-radius: 50%;
                transform: rotateX(90deg) translateZ(-100px);
                opacity: 0.2; /* Reduced shadow opacity */
            }
            
            .lightning-source {
                position: absolute;
                background: radial-gradient(ellipse at center, 
                    rgba(255, 255, 255, 0.7) 0%, 
                    rgba(200, 200, 255, 0.4) 40%, 
                    rgba(180, 180, 255, 0) 70%);
                border-radius: 50%;
                opacity: 0;
                transition: opacity 0.1s ease;
                filter: blur(5px);
            }
            
            /* Ensure clouds work with the comparison slider */
            body:not(.effects-disabled) .cloud-3d-container {
                clip-path: polygon(var(--slider-position, 0%) 0, 100% 0, 100% 100%, var(--slider-position, 0%) 100%);
            }
            
            /* Hide clouds when effects are disabled */
            body.effects-disabled .cloud-3d-container {
                display: none !important;
            }
            
            /* Ensure content remains visible and interactive */
            .navbar, 
            .hero-content, 
            .cta-buttons, 
            .section-header, 
            .services-grid, 
            .portfolio-grid, 
            .portfolio-item, 
            .testimonial-slider, 
            .about-content, 
            .contact-content, 
            .footer-content,
            .btn,
            a,
            form,
            input,
            textarea,
            button {
                position: relative;
                z-index: 100 !important; /* Ensure content stays above clouds */
            }
            
            /* Cloud movement animation */
            @keyframes cloudFloat {
                0% { transform: translateZ(0); }
                50% { transform: translateZ(20px); }
                100% { transform: translateZ(0); }
            }
            
            /* Cloud internal movement */
            @keyframes cloudPuffFloat {
                0% { transform: translateZ(0); }
                33% { transform: translateZ(10px); }
                66% { transform: translateZ(-5px); }
                100% { transform: translateZ(0); }
            }
        `;
        document.head.appendChild(style);
        
        // Create initial clouds - fewer clouds for less visual clutter
        for (let i = 0; i < 3; i++) {
            create3DCloud();
        }
        
        // Schedule cloud creation - longer interval for fewer clouds
        setInterval(create3DCloud, 20000);
        
        // Create a 3D cloud
        function create3DCloud() {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-3d';
            
            // Randomize cloud appearance - keep clouds higher in the viewport
            const size = 200 + Math.random() * 300;
            const posX = -size/2 + Math.random() * (window.innerWidth + size);
            const posY = -size/2 + Math.random() * (window.innerHeight * 0.3); // Keep clouds higher
            const posZ = -200 + Math.random() * 400;
            const duration = 80 + Math.random() * 60;
            const delay = Math.random() * 5;
            
            // Set cloud style
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size * 0.6}px`;
            cloud.style.left = `${posX}px`;
            cloud.style.top = `${posY}px`;
            cloud.style.transform = `translateZ(${posZ}px)`;
            
            // Determine if this is a dark cloud
            const isDarkCloud = Math.random() > 0.6;
            
            // Create cloud puffs (the 3D elements that make up the cloud)
            const puffCount = 8 + Math.floor(Math.random() * 10); // Fewer puffs for better performance
            
            for (let i = 0; i < puffCount; i++) {
                const puff = document.createElement('div');
                puff.className = 'cloud-puff';
                
                if (isDarkCloud) {
                    puff.classList.add('cloud-puff-dark');
                }
                
                // Randomize puff size and position
                const puffSize = (0.2 + Math.random() * 0.6) * size;
                const puffX = Math.random() * size - puffSize/2;
                const puffY = Math.random() * (size * 0.6) - puffSize/2;
                const puffZ = Math.random() * 50 - 25;
                
                // Set puff style
                puff.style.width = `${puffSize}px`;
                puff.style.height = `${puffSize}px`;
                puff.style.left = `${puffX}px`;
                puff.style.top = `${puffY}px`;
                puff.style.transform = `translateZ(${puffZ}px)`;
                
                // Add animation
                const animDuration = 10 + Math.random() * 20;
                const animDelay = Math.random() * 10;
                puff.style.animation = `cloudPuffFloat ${animDuration}s ease-in-out ${animDelay}s infinite`;
                
                // Add puff to cloud
                cloud.appendChild(puff);
            }
            
            // Create cloud shadow - smaller and less visible
            const shadow = document.createElement('div');
            shadow.className = 'cloud-shadow';
            shadow.style.width = `${size * 0.7}px`;
            shadow.style.height = `${size * 0.4}px`;
            shadow.style.left = `${size * 0.15}px`;
            shadow.style.top = `${size * 0.6}px`;
            cloud.appendChild(shadow);
            
            // Add cloud to container
            cloudContainer.appendChild(cloud);
            
            // Animate cloud movement
            cloud.style.transition = `transform ${duration}s linear, opacity 2s ease`;
            cloud.style.opacity = '0';
            
            // Fade in
            setTimeout(() => {
                cloud.style.opacity = '0.6'; // Lower max opacity
                
                // Start movement
                setTimeout(() => {
                    const moveX = Math.random() * 200 - 100;
                    const moveY = Math.random() * 30 - 15; // Less vertical movement
                    const moveZ = Math.random() * 100 - 50;
                    
                    cloud.style.transform = `translate3d(${posX + moveX}px, ${posY + moveY}px, ${posZ + moveZ}px)`;
                    
                    // Add lightning effect to cloud occasionally - less frequent
                    if (isDarkCloud && Math.random() > 0.7) {
                        add3DCloudLightning(cloud, size);
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
        
        // Add lightning effect to a 3D cloud - less intense
        function add3DCloudLightning(cloud, size) {
            // Only proceed if lightning effect is available
            if (!window.createRealisticLightning) return;
            
            // Create lightning source inside cloud
            const lightningSource = document.createElement('div');
            lightningSource.className = 'lightning-source';
            
            // Position lightning source within cloud
            const sourceSize = size * 0.3;
            const sourceX = size * 0.3 + Math.random() * (size * 0.4);
            const sourceY = size * 0.3 + Math.random() * (size * 0.3);
            
            lightningSource.style.width = `${sourceSize}px`;
            lightningSource.style.height = `${sourceSize}px`;
            lightningSource.style.left = `${sourceX}px`;
            lightningSource.style.top = `${sourceY}px`;
            
            cloud.appendChild(lightningSource);
            
            // Schedule lightning flashes - fewer flashes
            const flashCount = 1 + Math.floor(Math.random() * 2);
            
            for (let i = 0; i < flashCount; i++) {
                setTimeout(() => {
                    // Get cloud position
                    const cloudRect = cloud.getBoundingClientRect();
                    
                    // Flash the lightning source
                    lightningSource.style.opacity = '0.7'; // Less intense flash
                    
                    // Create lightning from cloud
                    if (window.createRealisticLightning) {
                        const cloudCenterX = cloudRect.left + sourceX;
                        const cloudBottomY = cloudRect.top + sourceY;
                        
                        // Random end position below the cloud
                        const endX = cloudCenterX - 100 + Math.random() * 200;
                        const endY = cloudBottomY + 100 + Math.random() * 200;
                        
                        // Create lightning bolt with more branches for 3D effect
                        window.createRealisticLightning(
                            cloudCenterX, 
                            cloudBottomY,
                            endX,
                            endY,
                            0.7, // roughness
                            0.4  // branch chance - slightly reduced
                        );
                        
                        // Illuminate cloud puffs - less intense
                        const puffs = cloud.querySelectorAll('.cloud-puff');
                        puffs.forEach(puff => {
                            puff.style.filter = 'brightness(1.3) blur(8px)'; // Less bright
                            setTimeout(() => {
                                puff.style.filter = 'blur(8px)';
                            }, 100);
                        });
                    }
                    
                    // Fade out lightning source
                    setTimeout(() => {
                        lightningSource.style.opacity = '0';
                    }, 100);
                }, i * (2000 + Math.random() * 4000)); // Longer intervals between flashes
            }
            
            // Remove lightning source after all flashes
            setTimeout(() => {
                lightningSource.remove();
            }, flashCount * 6000);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Adjust cloud positions if needed
        });
        
        console.log("Adjusted 3D cloud effect initialized");
    }
}); 