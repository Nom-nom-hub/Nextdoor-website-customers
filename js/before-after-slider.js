// Before/After Slider to showcase JavaScript effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        initBeforeAfterSlider();
    }, 3000);
    
    function initBeforeAfterSlider() {
        console.log("Initializing before/after slider");
        
        // Create slider container
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'effects-comparison-slider';
        
        // Create slider elements
        const sliderHTML = `
            <div class="comparison-container">
                <div class="comparison-header">
                    <h3>Experience the Difference</h3>
                    <p>Drag the slider to compare basic vs. advanced JavaScript effects</p>
                </div>
                <div class="comparison-slider">
                    <div class="comparison-before">
                        <div class="comparison-label">Basic</div>
                    </div>
                    <div class="comparison-after">
                        <div class="comparison-label">Advanced</div>
                    </div>
                    <div class="comparison-handle">
                        <div class="handle-circle">
                            <div class="handle-arrows">
                                <span class="arrow-left">◄</span>
                                <span class="arrow-right">►</span>
                            </div>
                        </div>
                        <div class="handle-line"></div>
                    </div>
                </div>
                <div class="comparison-features">
                    <div class="feature-item">
                        <i class="fas fa-tint"></i>
                        <span>Realistic Water</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-bolt"></i>
                        <span>Lightning Effects</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-moon"></i>
                        <span>Dark/Light Mode</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-cube"></i>
                        <span>3D Elements</span>
                    </div>
                </div>
                <button class="btn btn-primary toggle-effects-btn">Toggle All Effects</button>
            </div>
        `;
        
        sliderContainer.innerHTML = sliderHTML;
        
        // Add CSS for slider
        const style = document.createElement('style');
        style.textContent = `
            .effects-comparison-slider {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: inherit;
                color: var(--text-color);
                transition: transform 0.3s ease;
                transform: translateX(calc(100% - 50px));
            }
            
            .effects-comparison-slider:hover {
                transform: translateX(0);
            }
            
            .effects-comparison-slider::before {
                content: '◄ Effects';
                position: absolute;
                left: -80px;
                top: 50%;
                transform: translateY(-50%) rotate(-90deg);
                background: var(--primary-color);
                color: white;
                padding: 10px 15px;
                border-radius: 10px 10px 0 0;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1);
            }
            
            .comparison-container {
                width: 350px;
                background: var(--darker-color);
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                border: 1px solid var(--border-color);
            }
            
            .comparison-header {
                padding: 15px 20px;
                text-align: center;
                border-bottom: 1px solid var(--border-color);
            }
            
            .comparison-header h3 {
                margin: 0 0 5px 0;
                font-size: 18px;
                color: var(--heading-color);
            }
            
            .comparison-header p {
                margin: 0;
                font-size: 14px;
                color: var(--text-muted);
            }
            
            .comparison-slider {
                position: relative;
                height: 200px;
                overflow: hidden;
                user-select: none;
            }
            
            .comparison-before,
            .comparison-after {
                position: absolute;
                top: 0;
                height: 100%;
                width: 100%;
                overflow: hidden;
            }
            
            .comparison-before {
                left: 0;
                background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
            }
            
            .comparison-after {
                right: 0;
                background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
                width: 50%;
            }
            
            .comparison-label {
                position: absolute;
                top: 15px;
                color: white;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 4px;
                padding: 5px 10px;
                font-size: 12px;
                font-weight: bold;
                pointer-events: none;
            }
            
            .comparison-before .comparison-label {
                left: 15px;
            }
            
            .comparison-after .comparison-label {
                right: 15px;
            }
            
            .comparison-handle {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                width: 2px;
                transform: translateX(-50%);
                cursor: ew-resize;
                z-index: 10;
            }
            
            .handle-line {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                width: 2px;
                background-color: white;
                transform: translateX(-50%);
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            }
            
            .handle-circle {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: white;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .handle-arrows {
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary-color);
                font-size: 12px;
                font-weight: bold;
            }
            
            .arrow-left, .arrow-right {
                margin: 0 2px;
            }
            
            .comparison-features {
                display: flex;
                flex-wrap: wrap;
                padding: 15px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .feature-item {
                display: flex;
                align-items: center;
                width: 50%;
                padding: 8px 0;
                font-size: 14px;
            }
            
            .feature-item i {
                color: var(--primary-color);
                margin-right: 8px;
                font-size: 16px;
            }
            
            .toggle-effects-btn {
                margin: 15px auto;
                display: block;
                padding: 10px 20px;
            }
            
            /* Animations for the slider elements */
            @keyframes basicRain {
                0% { transform: translateY(-10px); opacity: 0; }
                100% { transform: translateY(210px); opacity: 0.3; }
            }
            
            @keyframes advancedRain {
                0% { transform: translateY(-10px) rotate(5deg); opacity: 0; }
                50% { opacity: 0.8; }
                100% { transform: translateY(210px) rotate(-5deg); opacity: 0; }
            }
            
            .basic-raindrop, .advanced-raindrop {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
            }
            
            .basic-raindrop {
                width: 2px;
                height: 10px;
                animation: basicRain 1.5s linear infinite;
            }
            
            .advanced-raindrop {
                background: radial-gradient(
                    ellipse at 50% 30%, 
                    rgba(255, 255, 255, 0.9) 0%,
                    rgba(255, 255, 255, 0.5) 25%,
                    rgba(99, 102, 241, 0.3) 50%,
                    rgba(99, 102, 241, 0.1) 75%,
                    transparent 100%
                );
                width: 8px;
                height: 12px;
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                filter: blur(0.5px);
                animation: advancedRain 2s ease-in infinite;
                box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
            }
            
            .basic-lightning, .advanced-lightning {
                position: absolute;
                pointer-events: none;
            }
            
            .basic-lightning {
                width: 2px;
                height: 50px;
                background-color: rgba(255, 255, 255, 0.7);
                transform: rotate(45deg);
                top: 50px;
                left: 50px;
                opacity: 0;
            }
            
            .advanced-lightning {
                width: 100%;
                height: 100%;
                background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwLDEwIEwxMjAsMTAwIEw4MCwxMjAgTDEwMCwxOTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+') no-repeat center center;
                filter: brightness(1.5) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
                opacity: 0;
            }
            
            .lightning-flash {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0);
                pointer-events: none;
            }
            
            @keyframes basicLightningFlash {
                0%, 100% { opacity: 0; }
                50% { opacity: 0.5; }
            }
            
            @keyframes advancedLightningFlash {
                0%, 100% { opacity: 0; }
                10% { opacity: 0.8; }
                20% { opacity: 0.2; }
                30% { opacity: 0.6; }
                40% { opacity: 0; }
            }
            
            /* Responsive styles */
            @media (max-width: 768px) {
                .effects-comparison-slider {
                    bottom: 10px;
                    right: 10px;
                }
                
                .comparison-container {
                    width: 300px;
                }
                
                .comparison-slider {
                    height: 150px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add slider to the page
        document.body.appendChild(sliderContainer);
        
        // Get slider elements
        const slider = sliderContainer.querySelector('.comparison-slider');
        const beforeEl = sliderContainer.querySelector('.comparison-before');
        const afterEl = sliderContainer.querySelector('.comparison-after');
        const handle = sliderContainer.querySelector('.comparison-handle');
        const toggleBtn = sliderContainer.querySelector('.toggle-effects-btn');
        
        // Initialize slider position
        let sliderPosition = 50;
        let isDragging = false;
        
        // Add demo effects to the slider panels
        addDemoEffects(beforeEl, afterEl);
        
        // Update slider position
        function updateSliderPosition(position) {
            sliderPosition = position;
            afterEl.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        }
        
        // Handle mouse/touch events
        function startDrag(e) {
            isDragging = true;
            slider.classList.add('dragging');
            updateDragPosition(e);
        }
        
        function endDrag() {
            isDragging = false;
            slider.classList.remove('dragging');
        }
        
        function updateDragPosition(e) {
            if (!isDragging) return;
            
            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            const rect = slider.getBoundingClientRect();
            const position = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
            
            updateSliderPosition(position);
        }
        
        // Add event listeners for dragging
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', updateDragPosition);
        document.addEventListener('mouseup', endDrag);
        
        // Touch support
        handle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', updateDragPosition);
        document.addEventListener('touchend', endDrag);
        
        // Toggle all effects button
        let effectsEnabled = true;
        toggleBtn.addEventListener('click', function() {
            effectsEnabled = !effectsEnabled;
            
            // Toggle classes on body to enable/disable effects
            if (effectsEnabled) {
                document.body.classList.remove('effects-disabled');
                toggleBtn.textContent = 'Disable All Effects';
            } else {
                document.body.classList.add('effects-disabled');
                toggleBtn.textContent = 'Enable All Effects';
            }
            
            // Add CSS to disable effects
            if (!document.getElementById('effects-toggle-style')) {
                const toggleStyle = document.createElement('style');
                toggleStyle.id = 'effects-toggle-style';
                toggleStyle.textContent = `
                    body.effects-disabled .water-canvas,
                    body.effects-disabled .lightning-canvas,
                    body.effects-disabled .water-drop,
                    body.effects-disabled .thunder-overlay,
                    body.effects-disabled .lightning-flash,
                    body.effects-disabled .thunder-glow,
                    body.effects-disabled .water-ripple,
                    body.effects-disabled .water-splash,
                    body.effects-disabled .splash-particle,
                    body.effects-disabled .water-trail,
                    body.effects-disabled .element-electricity,
                    body.effects-disabled .micro-spark {
                        display: none !important;
                    }
                `;
                document.head.appendChild(toggleStyle);
            }
        });
        
        // Add demo effects to the slider panels
        function addDemoEffects(beforeEl, afterEl) {
            // Add basic raindrops to before panel
            for (let i = 0; i < 10; i++) {
                const raindrop = document.createElement('div');
                raindrop.className = 'basic-raindrop';
                raindrop.style.left = `${Math.random() * 100}%`;
                raindrop.style.animationDelay = `${Math.random() * 1.5}s`;
                beforeEl.appendChild(raindrop);
            }
            
            // Add advanced raindrops to after panel
            for (let i = 0; i < 15; i++) {
                const raindrop = document.createElement('div');
                raindrop.className = 'advanced-raindrop';
                raindrop.style.left = `${Math.random() * 100}%`;
                raindrop.style.animationDelay = `${Math.random() * 2}s`;
                afterEl.appendChild(raindrop);
            }
            
            // Add basic lightning to before panel
            const basicLightning = document.createElement('div');
            basicLightning.className = 'basic-lightning';
            beforeEl.appendChild(basicLightning);
            
            // Add advanced lightning to after panel
            const advancedLightning = document.createElement('div');
            advancedLightning.className = 'advanced-lightning';
            afterEl.appendChild(advancedLightning);
            
            // Add flash effects
            const beforeFlash = document.createElement('div');
            beforeFlash.className = 'lightning-flash';
            beforeEl.appendChild(beforeFlash);
            
            const afterFlash = document.createElement('div');
            afterFlash.className = 'lightning-flash';
            afterEl.appendChild(afterFlash);
            
            // Animate lightning effects
            function animateLightning() {
                // Basic lightning animation
                if (Math.random() < 0.2) {
                    basicLightning.style.opacity = '1';
                    beforeFlash.style.animation = 'basicLightningFlash 0.5s ease';
                    
                    setTimeout(() => {
                        basicLightning.style.opacity = '0';
                        beforeFlash.style.animation = '';
                    }, 500);
                }
                
                // Advanced lightning animation
                if (Math.random() < 0.3) {
                    advancedLightning.style.opacity = '1';
                    afterFlash.style.animation = 'advancedLightningFlash 0.8s ease';
                    
                    setTimeout(() => {
                        advancedLightning.style.opacity = '0';
                        afterFlash.style.animation = '';
                    }, 800);
                }
                
                // Schedule next animation
                setTimeout(animateLightning, 2000 + Math.random() * 3000);
            }
            
            // Start animations
            animateLightning();
        }
        
        console.log('Before/After slider initialized');
    }
}); 