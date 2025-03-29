// Fixed Full-page Before/After Comparison Slider
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        initFixedComparisonSlider();
    }, 3000);
    
    function initFixedComparisonSlider() {
        console.log("Initializing fixed comparison slider");
        
        // Create the slider container
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'fullpage-comparison-container';
        
        // Create the slider HTML
        sliderContainer.innerHTML = `
            <div class="comparison-header">
                <h3>Drag to Compare</h3>
                <div class="comparison-labels">
                    <span class="basic-label">Basic Website</span>
                    <span class="advanced-label">Advanced Effects</span>
                </div>
            </div>
            <div class="comparison-divider">
                <div class="handle">
                    <div class="handle-icon">
                        <span class="arrow-left">◄</span>
                        <span class="arrow-right">►</span>
                    </div>
                </div>
            </div>
            <div class="toggle-container">
                <button class="toggle-comparison-btn">Hide Comparison</button>
            </div>
        `;
        
        // Add CSS for the slider
        const style = document.createElement('style');
        style.textContent = `
            .fullpage-comparison-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9990;
                pointer-events: none;
            }
            
            .comparison-header {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 30px;
                text-align: center;
                z-index: 9992;
                pointer-events: auto;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                transition: opacity 0.3s ease;
            }
            
            .comparison-header h3 {
                margin: 0 0 5px 0;
                font-size: 16px;
                font-weight: 600;
            }
            
            .comparison-labels {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                width: 200px;
                margin: 0 auto;
            }
            
            .basic-label {
                color: #f5f7fa;
            }
            
            .advanced-label {
                color: #4f46e5;
            }
            
            .comparison-divider {
                position: absolute;
                top: 0;
                left: 50%;
                height: 100%;
                width: 2px;
                background-color: rgba(255, 255, 255, 0.5);
                z-index: 9991;
                pointer-events: auto;
                cursor: ew-resize;
            }
            
            .handle {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                background-color: #4f46e5;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
                cursor: ew-resize;
                transition: transform 0.2s ease;
            }
            
            .handle:hover {
                transform: translate(-50%, -50%) scale(1.1);
            }
            
            .handle-icon {
                color: white;
                font-size: 14px;
                display: flex;
                align-items: center;
            }
            
            .arrow-left, .arrow-right {
                margin: 0 2px;
            }
            
            .toggle-container {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9992;
                pointer-events: auto;
            }
            
            .toggle-comparison-btn {
                background-color: #4f46e5;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                transition: background-color 0.3s ease;
            }
            
            .toggle-comparison-btn:hover {
                background-color: #3730a3;
            }
            
            /* Before/After effect styles */
            .effects-disabled-left {
                position: fixed;
                top: 0;
                left: 0;
                width: 50%;
                height: 100%;
                z-index: 9989;
                pointer-events: none;
                overflow: hidden;
            }
            
            /* Hide effects on the left side */
            .effects-disabled-left ~ .water-canvas,
            .effects-disabled-left ~ .lightning-canvas,
            .effects-disabled-left ~ .water-drop,
            .effects-disabled-left ~ .thunder-overlay,
            .effects-disabled-left ~ .lightning-flash,
            .effects-disabled-left ~ .thunder-glow,
            .effects-disabled-left ~ .water-ripple,
            .effects-disabled-left ~ .water-splash,
            .effects-disabled-left ~ .splash-particle,
            .effects-disabled-left ~ .water-trail,
            .effects-disabled-left ~ .element-electricity,
            .effects-disabled-left ~ .micro-spark {
                clip-path: polygon(var(--slider-position) 0, 100% 0, 100% 100%, var(--slider-position) 100%);
            }
            
            /* Hidden state */
            .comparison-hidden .comparison-divider {
                left: -100px;
                opacity: 0;
            }
            
            .comparison-hidden .comparison-header {
                opacity: 0;
            }
            
            .comparison-hidden .effects-disabled-left {
                width: 0;
            }
            
            .comparison-hidden .toggle-comparison-btn {
                background-color: #6b7280;
            }
            
            /* Basic version styling for left side */
            .basic-raindrops {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9988;
                overflow: hidden;
                clip-path: polygon(0 0, var(--slider-position) 0, var(--slider-position) 100%, 0 100%);
            }
            
            .basic-raindrop {
                position: absolute;
                width: 2px;
                height: 15px;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4));
                border-radius: 50%;
                opacity: 0.7;
                animation: basicRainFall 1.5s linear infinite;
            }
            
            @keyframes basicRainFall {
                0% {
                    transform: translateY(-100px);
                }
                100% {
                    transform: translateY(calc(100vh + 100px));
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add the slider to the page
        document.body.appendChild(sliderContainer);
        
        // Create the effects-disabled-left div
        const disabledEffectsDiv = document.createElement('div');
        disabledEffectsDiv.className = 'effects-disabled-left';
        document.body.appendChild(disabledEffectsDiv);
        
        // Create basic raindrops for the left side
        const basicRaindrops = document.createElement('div');
        basicRaindrops.className = 'basic-raindrops';
        document.body.appendChild(basicRaindrops);
        
        // Add some basic raindrops
        for (let i = 0; i < 50; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'basic-raindrop';
            raindrop.style.left = `${Math.random() * 100}%`;
            raindrop.style.animationDelay = `${Math.random() * 1.5}s`;
            raindrop.style.opacity = `${0.3 + Math.random() * 0.5}`;
            basicRaindrops.appendChild(raindrop);
        }
        
        // Get slider elements
        const divider = sliderContainer.querySelector('.comparison-divider');
        const toggleBtn = sliderContainer.querySelector('.toggle-comparison-btn');
        
        // Initialize slider position
        let sliderPosition = 50;
        let isDragging = false;
        
        // Update slider position
        function updateSliderPosition(position) {
            sliderPosition = position;
            divider.style.left = `${position}%`;
            disabledEffectsDiv.style.width = `${position}%`;
            
            // Update CSS variable for clip-path
            document.documentElement.style.setProperty('--slider-position', `${position}%`);
        }
        
        // Set initial position
        updateSliderPosition(50);
        
        // Handle mouse/touch events
        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
            document.body.style.cursor = 'ew-resize';
            updateDragPosition(e);
        }
        
        function endDrag() {
            isDragging = false;
            document.body.style.cursor = '';
        }
        
        function updateDragPosition(e) {
            if (!isDragging) return;
            
            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            const windowWidth = window.innerWidth;
            const position = Math.max(0, Math.min(100, (clientX / windowWidth) * 100));
            
            updateSliderPosition(position);
        }
        
        // Add event listeners for dragging
        divider.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', updateDragPosition);
        document.addEventListener('mouseup', endDrag);
        
        // Touch support
        divider.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', updateDragPosition, { passive: true });
        document.addEventListener('touchend', endDrag);
        
        // Toggle comparison view
        let comparisonVisible = true;
        toggleBtn.addEventListener('click', function() {
            comparisonVisible = !comparisonVisible;
            
            if (comparisonVisible) {
                sliderContainer.classList.remove('comparison-hidden');
                toggleBtn.textContent = 'Hide Comparison';
                updateSliderPosition(50); // Reset to middle
            } else {
                sliderContainer.classList.add('comparison-hidden');
                toggleBtn.textContent = 'Show Comparison';
                // When hidden, show full effects
                updateSliderPosition(0);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // Maintain the same percentage position
            updateSliderPosition(sliderPosition);
        });
        
        console.log('Fixed comparison slider initialized');
    }
}); 