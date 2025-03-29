// Enhanced 3D Website Effect with Immediate Visual Impact
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sooner for immediate effect
    setTimeout(() => {
        initEnhanced3DWebsite();
    }, 2000);
    
    function initEnhanced3DWebsite() {
        console.log("Initializing enhanced 3D website effect");
        
        // Add CSS for more dramatic 3D transformations
        const style = document.createElement('style');
        style.textContent = `
            /* 3D Environment Setup */
            :root {
                --perspective: 1500px;
                --layer-depth-1: 50px;
                --layer-depth-2: 100px;
                --layer-depth-3: 150px;
                --layer-depth-4: 200px;
                --rotation-x: 0deg;
                --rotation-y: 0deg;
                --mouse-x: 0;
                --mouse-y: 0;
            }
            
            /* Main 3D container */
            .scene-3d-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
                perspective: var(--perspective);
                perspective-origin: 50% 50%;
                overflow: hidden;
            }
            
            /* 3D scene */
            .scene-3d {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform-style: preserve-3d;
                transform: rotateX(var(--rotation-x)) rotateY(var(--rotation-y));
                transition: transform 0.1s ease-out;
            }
            
            /* 3D layers with more dramatic depth */
            body.enable-3d .navbar,
            body.enable-3d .hero-content,
            body.enable-3d .hero-image,
            body.enable-3d .section-header,
            body.enable-3d .services-grid,
            body.enable-3d .portfolio-grid,
            body.enable-3d .portfolio-item,
            body.enable-3d .testimonial-slider,
            body.enable-3d .about-content,
            body.enable-3d .about-image,
            body.enable-3d .contact-content,
            body.enable-3d .footer-content,
            body.enable-3d .cta-buttons,
            body.enable-3d .btn {
                transform-style: preserve-3d;
                transition: transform 0.3s ease-out, box-shadow 0.3s ease;
                will-change: transform, box-shadow;
            }
            
            /* Layer depths with more dramatic effect */
            body.enable-3d .navbar {
                transform: translateZ(var(--layer-depth-4));
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
            }
            
            body.enable-3d .hero-content,
            body.enable-3d .section-header,
            body.enable-3d .cta-buttons {
                transform: translateZ(var(--layer-depth-3));
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            }
            
            body.enable-3d .hero-image,
            body.enable-3d .services-grid,
            body.enable-3d .portfolio-grid,
            body.enable-3d .testimonial-slider,
            body.enable-3d .about-content,
            body.enable-3d .contact-content {
                transform: translateZ(var(--layer-depth-2));
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            
            body.enable-3d .portfolio-item,
            body.enable-3d .about-image,
            body.enable-3d .footer-content {
                transform: translateZ(var(--layer-depth-1));
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
            }
            
            /* Individual element 3D effects */
            body.enable-3d .services-grid .service-card {
                transform: translateZ(30px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            body.enable-3d .services-grid .service-card:hover {
                transform: translateZ(60px) scale(1.05);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
            }
            
            body.enable-3d .portfolio-item {
                transition: transform 0.4s ease, box-shadow 0.4s ease;
            }
            
            body.enable-3d .portfolio-item:hover {
                transform: translateZ(80px) scale(1.08);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                z-index: 10;
            }
            
            body.enable-3d .btn {
                transform: translateZ(20px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s ease-out, background-color 0.3s, box-shadow 0.2s ease;
            }
            
            body.enable-3d .btn:hover {
                transform: translateZ(40px) scale(1.1);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }
            
            /* 3D text effects */
            body.enable-3d h1, 
            body.enable-3d h2 {
                text-shadow: 0px 1px 0px rgba(255,255,255,0.5), 
                             0px 2px 0px rgba(255,255,255,0.4),
                             0px 3px 0px rgba(255,255,255,0.3),
                             0px 4px 0px rgba(255,255,255,0.2),
                             0px 5px 0px rgba(255,255,255,0.1),
                             0px 6px 5px rgba(0,0,0,0.2);
                transform: translateZ(30px);
            }
            
            /* Parallax background with more dramatic effect */
            body.enable-3d .dark-bg-texture {
                transform: translateZ(-200px) scale(1.4);
                transition: transform 0.5s ease;
            }
            
            /* 3D toggle button with better visibility */
            .toggle-3d-btn {
                position: fixed;
                bottom: 80px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                border: none;
                border-radius: 50px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                z-index: 10001;
                display: flex;
                align-items: center;
                gap: 8px;
                pointer-events: auto;
                transition: background-color 0.3s, transform 0.3s;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .toggle-3d-btn:hover {
                background-color: rgba(0, 0, 0, 0.9);
                transform: scale(1.05);
            }
            
            .toggle-3d-btn i {
                font-size: 16px;
            }
            
            /* 3D depth indicator with better visibility */
            .depth-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                border-radius: 5px;
                padding: 8px 15px;
                font-size: 14px;
                font-weight: bold;
                z-index: 10001;
                display: none;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            body.enable-3d .depth-indicator {
                display: block;
            }
            
            /* Ensure comparison slider works with 3D effect */
            body.enable-3d .fullpage-comparison-container {
                transform-style: preserve-3d;
                transform: translateZ(100px);
            }
            
            /* 3D page transition effect */
            @keyframes pageTransition3D {
                0% { transform: translateZ(-1000px) rotateY(20deg); opacity: 0; }
                100% { transform: translateZ(0) rotateY(0); opacity: 1; }
            }
            
            body.enable-3d.page-transition main {
                animation: pageTransition3D 0.8s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
        
        // Create 3D scene container
        const sceneContainer = document.createElement('div');
        sceneContainer.className = 'scene-3d-container';
        
        const scene = document.createElement('div');
        scene.className = 'scene-3d';
        
        sceneContainer.appendChild(scene);
        document.body.appendChild(sceneContainer);
        
        // Create 3D toggle button with better visibility
        const toggle3DBtn = document.createElement('button');
        toggle3DBtn.className = 'toggle-3d-btn';
        toggle3DBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Effect: OFF';
        document.body.appendChild(toggle3DBtn);
        
        // Create depth indicator with better visibility
        const depthIndicator = document.createElement('div');
        depthIndicator.className = 'depth-indicator';
        depthIndicator.textContent = 'Depth: 0°';
        document.body.appendChild(depthIndicator);
        
        // Initialize variables
        let is3DEnabled = false;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let currentRotationX = 0;
        let currentRotationY = 0;
        
        // Toggle 3D effect with immediate visual feedback
        toggle3DBtn.addEventListener('click', function() {
            is3DEnabled = !is3DEnabled;
            
            if (is3DEnabled) {
                document.body.classList.add('enable-3d');
                document.body.classList.add('page-transition');
                toggle3DBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Effect: ON';
                
                // Apply immediate rotation for visual feedback
                targetRotationY = 5;
                setTimeout(() => {
                    targetRotationY = 0;
                }, 800);
                
                // Add dramatic shadow effect to all elements
                enhanceShadows();
            } else {
                document.body.classList.remove('enable-3d');
                toggle3DBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Effect: OFF';
                
                // Reset rotations
                document.documentElement.style.setProperty('--rotation-x', '0deg');
                document.documentElement.style.setProperty('--rotation-y', '0deg');
                
                // Reset shadows
                resetShadows();
                
                // Remove transition class after animation completes
                setTimeout(() => {
                    document.body.classList.remove('page-transition');
                }, 800);
            }
        });
        
        // Track mouse movement for 3D effect with more dramatic response
        document.addEventListener('mousemove', function(e) {
            if (!is3DEnabled) return;
            
            // Calculate mouse position relative to the center of the screen
            mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
            
            // Update CSS variables for use in other effects
            document.documentElement.style.setProperty('--mouse-x', mouseX);
            document.documentElement.style.setProperty('--mouse-y', mouseY);
            
            // Calculate target rotation (more dramatic range)
            targetRotationY = mouseX * 10; // -10 to 10 degrees
            targetRotationX = -mouseY * 10; // -10 to 10 degrees
            
            // Update depth indicator
            updateDepthIndicator();
            
            // Update element shadows based on mouse position
            if (is3DEnabled) {
                updateDynamicShadows(mouseX, mouseY);
            }
        });
        
        // Handle device orientation for mobile with more dramatic effect
        window.addEventListener('deviceorientation', function(e) {
            if (!is3DEnabled) return;
            
            // Only use this if device orientation is available
            if (e.beta !== null && e.gamma !== null) {
                // Convert orientation to rotation (more dramatic range)
                targetRotationX = Math.max(-10, Math.min(10, e.beta / 2 - 10));
                targetRotationY = Math.max(-10, Math.min(10, e.gamma));
                
                // Update depth indicator
                updateDepthIndicator();
                
                // Update element shadows based on orientation
                updateDynamicShadows(targetRotationY / 10, targetRotationX / 10);
            }
        });
        
        // Animate rotation smoothly
        function animateRotation() {
            if (!is3DEnabled) {
                requestAnimationFrame(animateRotation);
                return;
            }
            
            // Smooth transition to target rotation
            currentRotationX += (targetRotationX - currentRotationX) * 0.1;
            currentRotationY += (targetRotationY - currentRotationY) * 0.1;
            
            // Apply rotation to the scene
            document.documentElement.style.setProperty('--rotation-x', currentRotationX + 'deg');
            document.documentElement.style.setProperty('--rotation-y', currentRotationY + 'deg');
            
            requestAnimationFrame(animateRotation);
        }
        
        // Start animation loop
        animateRotation();
        
        // Update depth indicator with more information
        function updateDepthIndicator() {
            const depth = Math.abs(targetRotationX) + Math.abs(targetRotationY);
            depthIndicator.textContent = `3D Depth: ${depth.toFixed(1)}°`;
            
            // Change color based on depth for visual feedback
            const hue = Math.min(200, 120 + depth * 5);
            depthIndicator.style.backgroundColor = `hsla(${hue}, 80%, 40%, 0.8)`;
        }
        
        // Enhance shadows for all elements
        function enhanceShadows() {
            const elements = document.querySelectorAll('.navbar, .hero-content, .section-header, .services-grid .service-card, .portfolio-item, .testimonial-slide, .about-content, .contact-content, .btn');
            
            elements.forEach(el => {
                el.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            });
        }
        
        // Reset shadows
        function resetShadows() {
            const elements = document.querySelectorAll('.navbar, .hero-content, .section-header, .services-grid .service-card, .portfolio-item, .testimonial-slide, .about-content, .contact-content, .btn');
            
            elements.forEach(el => {
                el.style.boxShadow = '';
            });
        }
        
        // Update shadows dynamically based on mouse/device position
        function updateDynamicShadows(xRatio, yRatio) {
            if (!is3DEnabled) return;
            
            const elements = document.querySelectorAll('.navbar, .hero-content, .section-header, .services-grid .service-card, .portfolio-item, .testimonial-slide, .about-content, .contact-content');
            
            elements.forEach(el => {
                // Calculate shadow direction based on mouse/device position
                const shadowX = -xRatio * 15;
                const shadowY = -yRatio * 15;
                const shadowBlur = 30 + Math.abs(xRatio * yRatio) * 20;
                const shadowSpread = 5 + Math.abs(xRatio * yRatio) * 10;
                
                el.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.15)`;
            });
        }
        
        // Add 3D effect to scrolling with more dramatic response
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            if (!is3DEnabled) return;
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
            
            // Add more dramatic tilt based on scroll direction
            targetRotationX = scrollDirection * 5;
            
            lastScrollTop = scrollTop;
        });
        
        // Enable 3D by default for immediate impact
        setTimeout(() => {
            toggle3DBtn.click();
        }, 1000);
        
        console.log("Enhanced 3D website effect initialized");
    }
}); 