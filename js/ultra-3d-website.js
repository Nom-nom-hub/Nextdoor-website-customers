// Ultra 3D Website Effect with Advanced Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quickly for immediate impact
    setTimeout(() => {
        initUltra3DWebsite();
    }, 1500);
    
    function initUltra3DWebsite() {
        console.log("Initializing ultra 3D website effect");
        
        // Add CSS for advanced 3D transformations
        const style = document.createElement('style');
        style.textContent = `
            /* 3D Environment Setup */
            :root {
                --perspective: 2000px;
                --layer-depth-1: 80px;
                --layer-depth-2: 160px;
                --layer-depth-3: 240px;
                --layer-depth-4: 320px;
                --rotation-x: 0deg;
                --rotation-y: 0deg;
                --mouse-x: 0;
                --mouse-y: 0;
                --tilt-amount: 1;
                --depth-intensity: 1;
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
                transform-style: preserve-3d;
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
            
            /* 3D layers with dramatic depth */
            body.enable-3d * {
                transform-style: preserve-3d;
            }
            
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
                transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease;
                will-change: transform, box-shadow;
                backface-visibility: hidden;
            }
            
            /* Layer depths with dramatic effect */
            body.enable-3d .navbar {
                transform: translateZ(calc(var(--layer-depth-4) * var(--depth-intensity)));
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
                z-index: 1000;
            }
            
            body.enable-3d .hero-content,
            body.enable-3d .section-header,
            body.enable-3d .cta-buttons {
                transform: translateZ(calc(var(--layer-depth-3) * var(--depth-intensity)));
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
                z-index: 900;
            }
            
            body.enable-3d .hero-image,
            body.enable-3d .services-grid,
            body.enable-3d .portfolio-grid,
            body.enable-3d .testimonial-slider,
            body.enable-3d .about-content,
            body.enable-3d .contact-content {
                transform: translateZ(calc(var(--layer-depth-2) * var(--depth-intensity)));
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                z-index: 800;
            }
            
            body.enable-3d .portfolio-item,
            body.enable-3d .about-image,
            body.enable-3d .footer-content {
                transform: translateZ(calc(var(--layer-depth-1) * var(--depth-intensity)));
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                z-index: 700;
            }
            
            /* Individual element 3D effects */
            body.enable-3d .services-grid .service-card {
                transform: translateZ(50px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
                transform-origin: center bottom;
            }
            
            body.enable-3d .services-grid .service-card:hover {
                transform: translateZ(100px) scale(1.05) rotateX(-5deg);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                z-index: 10;
            }
            
            body.enable-3d .portfolio-item {
                transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease;
                transform-origin: center bottom;
            }
            
            body.enable-3d .portfolio-item:hover {
                transform: translateZ(120px) scale(1.1) rotateX(-8deg);
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
                z-index: 20;
            }
            
            body.enable-3d .btn {
                transform: translateZ(30px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s, box-shadow 0.3s ease;
                transform-origin: center bottom;
            }
            
            body.enable-3d .btn:hover {
                transform: translateZ(60px) scale(1.15) translateY(-5px);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            }
            
            /* 3D text effects with dramatic depth */
            body.enable-3d h1 {
                transform: translateZ(50px);
                text-shadow: 0px 1px 0px rgba(255,255,255,0.5), 
                             0px 2px 0px rgba(255,255,255,0.4),
                             0px 3px 0px rgba(255,255,255,0.3),
                             0px 4px 0px rgba(255,255,255,0.2),
                             0px 5px 0px rgba(255,255,255,0.1),
                             0px 10px 15px rgba(0,0,0,0.3);
            }
            
            body.enable-3d h2 {
                transform: translateZ(40px);
                text-shadow: 0px 1px 0px rgba(255,255,255,0.5), 
                             0px 2px 0px rgba(255,255,255,0.4),
                             0px 3px 0px rgba(255,255,255,0.3),
                             0px 8px 10px rgba(0,0,0,0.2);
            }
            
            /* Parallax background with dramatic effect */
            body.enable-3d .dark-bg-texture {
                transform: translateZ(-300px) scale(1.6);
                transition: transform 0.5s ease;
            }
            
            /* 3D controls panel */
            .controls-3d-panel {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                border-radius: 10px;
                padding: 15px;
                z-index: 10001;
                display: flex;
                flex-direction: column;
                gap: 10px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                transform: translateZ(400px);
                pointer-events: auto;
            }
            
            .controls-3d-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .controls-3d-header h3 {
                margin: 0;
                font-size: 16px;
            }
            
            .toggle-controls-btn {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 16px;
            }
            
            .controls-3d-body {
                display: flex;
                flex-direction: column;
                gap: 15px;
                overflow: hidden;
                transition: max-height 0.3s ease, opacity 0.3s ease;
                max-height: 300px;
                opacity: 1;
            }
            
            .controls-3d-body.collapsed {
                max-height: 0;
                opacity: 0;
            }
            
            .control-group {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .control-group label {
                font-size: 12px;
                opacity: 0.8;
            }
            
            .slider-control {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .slider-control input {
                flex: 1;
            }
            
            .slider-value {
                font-size: 12px;
                min-width: 30px;
                text-align: right;
            }
            
            .toggle-3d-btn {
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 8px 12px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: background-color 0.3s;
            }
            
            .toggle-3d-btn.off {
                background-color: #f44336;
            }
            
            .toggle-3d-btn:hover {
                filter: brightness(1.1);
            }
            
            /* 3D depth indicator */
            .depth-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 8px 15px;
                border-radius: 30px;
                font-size: 14px;
                z-index: 10001;
                pointer-events: none;
                transition: background-color 0.3s;
                opacity: 0;
            }
            
            body.enable-3d .depth-indicator {
                opacity: 1;
            }
            
            /* Page transition effect */
            .page-transition {
                animation: pageTransition 1s ease-out;
            }
            
            @keyframes pageTransition {
                0% { transform: scale(0.95) rotateX(10deg); opacity: 0.5; }
                100% { transform: scale(1) rotateX(0deg); opacity: 1; }
            }
            
            /* Ensure comparison slider works with 3D effect */
            body.enable-3d .fullpage-comparison-container {
                transform-style: preserve-3d;
                transform: translateZ(350px);
                z-index: 9995;
            }
            
            /* 3D floating animation for elements */
            @keyframes float {
                0% { transform: translateZ(0) translateY(0); }
                50% { transform: translateZ(20px) translateY(-10px); }
                100% { transform: translateZ(0) translateY(0); }
            }
            
            body.enable-3d.enable-float .hero-image img,
            body.enable-3d.enable-float .about-image img {
                animation: float 6s ease-in-out infinite;
            }
            
            body.enable-3d.enable-float .service-card {
                animation: float 8s ease-in-out infinite;
                animation-delay: calc(var(--item-index, 0) * 0.5s);
            }
            
            /* Staggered animations for grid items */
            body.enable-3d .services-grid .service-card,
            body.enable-3d .portfolio-grid .portfolio-item {
                opacity: 0;
                transform: translateZ(0) translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            
            body.enable-3d.items-revealed .services-grid .service-card,
            body.enable-3d.items-revealed .portfolio-grid .portfolio-item {
                opacity: 1;
                transform: translateZ(var(--item-z, 50px)) translateY(0);
                transition-delay: calc(var(--item-index, 0) * 0.1s);
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
        
        // Create 3D controls panel
        const controlsPanel = document.createElement('div');
        controlsPanel.className = 'controls-3d-panel';
        controlsPanel.innerHTML = `
            <div class="controls-3d-header">
                <h3>3D Controls</h3>
                <button class="toggle-controls-btn"><i class="fas fa-chevron-up"></i></button>
            </div>
            <div class="controls-3d-body">
                <button class="toggle-3d-btn"><i class="fas fa-cube"></i> 3D Effect: OFF</button>
                
                <div class="control-group">
                    <label>Depth Intensity</label>
                    <div class="slider-control">
                        <input type="range" min="0.2" max="2" step="0.1" value="1" class="depth-slider">
                        <span class="slider-value">1.0</span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label>Tilt Sensitivity</label>
                    <div class="slider-control">
                        <input type="range" min="0.2" max="2" step="0.1" value="1" class="tilt-slider">
                        <span class="slider-value">1.0</span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label>Special Effects</label>
                    <div class="checkbox-control">
                        <input type="checkbox" id="float-effect" class="float-checkbox">
                        <label for="float-effect">Floating Animation</label>
                    </div>
                    <div class="checkbox-control">
                        <input type="checkbox" id="stagger-effect" class="stagger-checkbox" checked>
                        <label for="stagger-effect">Staggered Reveal</label>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(controlsPanel);
        
        // Create depth indicator
        const depthIndicator = document.createElement('div');
        depthIndicator.className = 'depth-indicator';
        depthIndicator.textContent = '3D Depth: 0.0°';
        document.body.appendChild(depthIndicator);
        
        // Initialize variables
        let is3DEnabled = false;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let currentRotationX = 0;
        let currentRotationY = 0;
        let depthIntensity = 1;
        let tiltSensitivity = 1;
        let isFloatEnabled = false;
        let isStaggerEnabled = true;
        let isControlsPanelCollapsed = false;
        
        // Get control elements
        const toggle3DBtn = controlsPanel.querySelector('.toggle-3d-btn');
        const depthSlider = controlsPanel.querySelector('.depth-slider');
        const tiltSlider = controlsPanel.querySelector('.tilt-slider');
        const floatCheckbox = controlsPanel.querySelector('.float-checkbox');
        const staggerCheckbox = controlsPanel.querySelector('.stagger-checkbox');
        const toggleControlsBtn = controlsPanel.querySelector('.toggle-controls-btn');
        const controlsBody = controlsPanel.querySelector('.controls-3d-body');
        
        // Set up slider value displays
        const depthValue = controlsPanel.querySelector('.depth-slider + .slider-value');
        const tiltValue = controlsPanel.querySelector('.tilt-slider + .slider-value');
        
        // Toggle controls panel
        toggleControlsBtn.addEventListener('click', function() {
            isControlsPanelCollapsed = !isControlsPanelCollapsed;
            
            if (isControlsPanelCollapsed) {
                controlsBody.classList.add('collapsed');
                toggleControlsBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
            } else {
                controlsBody.classList.remove('collapsed');
                toggleControlsBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            }
        });
        
        // Toggle 3D effect with immediate visual feedback
        toggle3DBtn.addEventListener('click', function() {
            is3DEnabled = !is3DEnabled;
            
            if (is3DEnabled) {
                document.body.classList.add('enable-3d');
                document.body.classList.add('page-transition');
                toggle3DBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Effect: ON';
                toggle3DBtn.classList.remove('off');
                
                // Apply immediate rotation for visual feedback
                targetRotationY = 5;
                setTimeout(() => {
                    targetRotationY = 0;
                }, 800);
                
                // Set up staggered animations for grid items
                setupStaggeredItems();
                
                // Apply floating effect if enabled
                if (isFloatEnabled) {
                    document.body.classList.add('enable-float');
                }
                
                // Reveal items with staggered animation if enabled
                if (isStaggerEnabled) {
                    setTimeout(() => {
                        document.body.classList.add('items-revealed');
                    }, 300);
                } else {
                    document.body.classList.add('items-revealed');
                }
            } else {
                document.body.classList.remove('enable-3d', 'enable-float', 'items-revealed');
                toggle3DBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Effect: OFF';
                toggle3DBtn.classList.add('off');
                
                // Reset rotations
                document.documentElement.style.setProperty('--rotation-x', '0deg');
                document.documentElement.style.setProperty('--rotation-y', '0deg');
                
                // Remove transition class after animation completes
                setTimeout(() => {
                    document.body.classList.remove('page-transition');
                }, 800);
            }
        });
        
        // Depth intensity slider
        depthSlider.addEventListener('input', function() {
            depthIntensity = parseFloat(this.value);
            depthValue.textContent = depthIntensity.toFixed(1);
            document.documentElement.style.setProperty('--depth-intensity', depthIntensity);
        });
        
        // Tilt sensitivity slider
        tiltSlider.addEventListener('input', function() {
            tiltSensitivity = parseFloat(this.value);
            tiltValue.textContent = tiltSensitivity.toFixed(1);
            document.documentElement.style.setProperty('--tilt-amount', tiltSensitivity);
        });
        
        // Float effect checkbox
        floatCheckbox.addEventListener('change', function() {
            isFloatEnabled = this.checked;
            
            if (is3DEnabled) {
                if (isFloatEnabled) {
                    document.body.classList.add('enable-float');
                } else {
                    document.body.classList.remove('enable-float');
                }
            }
        });
        
        // Stagger effect checkbox
        staggerCheckbox.addEventListener('change', function() {
            isStaggerEnabled = this.checked;
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
            
            // Calculate target rotation with sensitivity adjustment
            targetRotationY = mouseX * 10 * tiltSensitivity;
            targetRotationX = -mouseY * 10 * tiltSensitivity;
            
            // Update depth indicator
            updateDepthIndicator();
        });
        
        // Handle device orientation for mobile
        window.addEventListener('deviceorientation', function(e) {
            if (!is3DEnabled) return;
            
            // Only use this if device orientation is available
            if (e.beta !== null && e.gamma !== null) {
                // Convert orientation to rotation with sensitivity adjustment
                targetRotationX = Math.max(-10, Math.min(10, e.beta / 2 - 10)) * tiltSensitivity;
                targetRotationY = Math.max(-10, Math.min(10, e.gamma)) * tiltSensitivity;
                
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
            depthIndicator.textContent = `3D Depth: ${depth.toFixed(1)}°`;
            
            // Change color based on depth for visual feedback
            const hue = Math.min(200, 120 + depth * 5);
            depthIndicator.style.backgroundColor = `hsla(${hue}, 80%, 40%, 0.8)`;
        }
        
        // Set up staggered items
        function setupStaggeredItems() {
            // Set index for service cards
            const serviceCards = document.querySelectorAll('.services-grid .service-card');
            serviceCards.forEach((card, index) => {
                card.style.setProperty('--item-index', index);
                card.style.setProperty('--item-z', 50 + Math.random() * 30 + 'px');
            });
            
            // Set index for portfolio items
            const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');
            portfolioItems.forEach((item, index) => {
                item.style.setProperty('--item-index', index);
                item.style.setProperty('--item-z', 50 + Math.random() * 30 + 'px');
            });
        }
        
        // Add 3D effect to scrolling
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            if (!is3DEnabled) return;
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
            
            // Add tilt based on scroll direction
            targetRotationX = scrollDirection * 5 * tiltSensitivity;
            
            lastScrollTop = scrollTop;
        });
        
        // Enable 3D by default for immediate impact
        setTimeout(() => {
            toggle3DBtn.click();
        }, 1000);
        
        console.log("Ultra 3D website effect initialized");
    }
}); 