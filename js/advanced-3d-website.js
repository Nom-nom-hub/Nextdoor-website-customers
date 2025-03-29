// Advanced 3D Website Effect
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        initAdvanced3DWebsite();
    }, 5500);
    
    function initAdvanced3DWebsite() {
        console.log("Initializing advanced 3D website effect");
        
        // Add CSS for 3D transformations
        const style = document.createElement('style');
        style.textContent = `
            /* 3D Environment Setup */
            :root {
                --perspective: 1000px;
                --layer-depth-1: 20px;
                --layer-depth-2: 40px;
                --layer-depth-3: 60px;
                --layer-depth-4: 80px;
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
            
            /* 3D layers */
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
                transition: transform 0.3s ease-out;
                will-change: transform;
            }
            
            /* Layer depths */
            body.enable-3d .navbar {
                transform: translateZ(var(--layer-depth-4));
            }
            
            body.enable-3d .hero-content,
            body.enable-3d .section-header,
            body.enable-3d .cta-buttons {
                transform: translateZ(var(--layer-depth-3));
            }
            
            body.enable-3d .hero-image,
            body.enable-3d .services-grid,
            body.enable-3d .portfolio-grid,
            body.enable-3d .testimonial-slider,
            body.enable-3d .about-content,
            body.enable-3d .contact-content {
                transform: translateZ(var(--layer-depth-2));
            }
            
            body.enable-3d .portfolio-item,
            body.enable-3d .about-image,
            body.enable-3d .footer-content {
                transform: translateZ(var(--layer-depth-1));
            }
            
            body.enable-3d .btn {
                transform: translateZ(10px);
                transition: transform 0.2s ease-out, background-color 0.3s;
            }
            
            body.enable-3d .btn:hover {
                transform: translateZ(20px) scale(1.05);
            }
            
            /* 3D hover effects */
            body.enable-3d .portfolio-item:hover {
                transform: translateZ(40px) scale(1.03);
            }
            
            /* Parallax background */
            body.enable-3d .dark-bg-texture {
                transform: translateZ(-100px) scale(1.2);
            }
            
            /* 3D shadows */
            body.enable-3d .navbar,
            body.enable-3d .hero-content,
            body.enable-3d .section-header,
            body.enable-3d .services-grid .service-card,
            body.enable-3d .portfolio-item,
            body.enable-3d .testimonial-slide,
            body.enable-3d .about-content,
            body.enable-3d .about-image,
            body.enable-3d .contact-content,
            body.enable-3d .btn {
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
            }
            
            /* 3D toggle button */
            .toggle-3d-btn {
                position: fixed;
                bottom: 80px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                border: none;
                border-radius: 50px;
                padding: 8px 15px;
                font-size: 14px;
                cursor: pointer;
                z-index: 10001;
                display: flex;
                align-items: center;
                gap: 5px;
                pointer-events: auto;
                transition: background-color 0.3s;
            }
            
            .toggle-3d-btn:hover {
                background-color: rgba(0, 0, 0, 0.8);
            }
            
            .toggle-3d-btn i {
                font-size: 12px;
            }
            
            /* 3D depth indicator */
            .depth-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 12px;
                z-index: 10001;
                display: none;
            }
            
            body.enable-3d .depth-indicator {
                display: block;
            }
            
            /* Ensure comparison slider works with 3D effect */
            body.enable-3d .fullpage-comparison-container {
                transform-style: preserve-3d;
                transform: translateZ(100px);
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
        
        // Create 3D toggle button
        const toggle3DBtn = document.createElement('button');
        toggle3DBtn.className = 'toggle-3d-btn';
        toggle3DBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Effect: OFF';
        document.body.appendChild(toggle3DBtn);
        
        // Create depth indicator
        const depthIndicator = document.createElement('div');
        depthIndicator.className = 'depth-indicator';
        depthIndicator.textContent = 'Depth: 0px';
        document.body.appendChild(depthIndicator);
        
        // Initialize variables
        let is3DEnabled = false;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let currentRotationX = 0;
        let currentRotationY = 0;
        
        // Toggle 3D effect
        toggle3DBtn.addEventListener('click', function() {
            is3DEnabled = !is3DEnabled;
            
            if (is3DEnabled) {
                document.body.classList.add('enable-3d');
                toggle3DBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Effect: ON';
                
                // Move all content into the 3D scene
                moveContentTo3DScene();
            } else {
                document.body.classList.remove('enable-3d');
                toggle3DBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Effect: OFF';
                
                // Reset rotations
                document.documentElement.style.setProperty('--rotation-x', '0deg');
                document.documentElement.style.setProperty('--rotation-y', '0deg');
                
                // Move content back to body
                restoreContentFromScene();
            }
        });
        
        // Track mouse movement for 3D effect
        document.addEventListener('mousemove', function(e) {
            if (!is3DEnabled) return;
            
            // Calculate mouse position relative to the center of the screen
            mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
            
            // Update CSS variables for use in other effects
            document.documentElement.style.setProperty('--mouse-x', mouseX);
            document.documentElement.style.setProperty('--mouse-y', mouseY);
            
            // Calculate target rotation (limited range)
            targetRotationY = mouseX * 5; // -5 to 5 degrees
            targetRotationX = -mouseY * 5; // -5 to 5 degrees
            
            // Update depth indicator
            updateDepthIndicator();
        });
        
        // Handle device orientation for mobile
        window.addEventListener('deviceorientation', function(e) {
            if (!is3DEnabled) return;
            
            // Only use this if device orientation is available
            if (e.beta !== null && e.gamma !== null) {
                // Convert orientation to rotation (limited range)
                targetRotationX = Math.max(-5, Math.min(5, e.beta / 3 - 10));
                targetRotationY = Math.max(-5, Math.min(5, e.gamma / 2));
                
                // Update depth indicator
                updateDepthIndicator();
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
        
        // Update depth indicator
        function updateDepthIndicator() {
            const depth = Math.abs(targetRotationX) + Math.abs(targetRotationY);
            depthIndicator.textContent = `Depth: ${depth.toFixed(1)}°`;
        }
        
        // Move content to 3D scene
        function moveContentTo3DScene() {
            // This is a visual effect only - we don't actually move the DOM elements
            // The 3D effect is achieved through CSS transforms
        }
        
        // Restore content from 3D scene
        function restoreContentFromScene() {
            // Reset any transforms or styles applied
        }
        
        // Add 3D effect to scrolling
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            if (!is3DEnabled) return;
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
            
            // Add subtle tilt based on scroll direction
            targetRotationX = scrollDirection * 2;
            
            lastScrollTop = scrollTop;
        });
        
        console.log("Advanced 3D website effect initialized");
    }
}); 