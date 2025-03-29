// Lightning Effect Adjustment
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the lightning effect to initialize
    setTimeout(() => {
        adjustLightningEffects();
    }, 4000);
    
    function adjustLightningEffects() {
        console.log("Adjusting lightning effects to be less intrusive");
        
        // Add CSS to tone down lightning effects
        const style = document.createElement('style');
        style.textContent = `
            /* Reduce opacity and frequency of lightning effects */
            .lightning-canvas {
                opacity: 0.4 !important; /* Reduce overall opacity */
            }
            
            .lightning-flash {
                opacity: 0.3 !important; /* Reduce flash intensity */
            }
            
            .lightning-glow {
                opacity: 0.4 !important; /* Reduce glow intensity */
                filter: blur(8px) !important; /* Increase blur for softer effect */
            }
            
            .thunder-rumble {
                opacity: 0.2 !important; /* Reduce rumble effect */
            }
            
            .element-charge {
                opacity: 0.2 !important; /* Reduce charge effect on elements */
            }
            
            .charged-element::before {
                opacity: 0.2 !important; /* Reduce glow on charged elements */
            }
            
            /* Ensure content remains visible and interactive */
            .water-canvas, 
            .lightning-canvas {
                pointer-events: none !important; /* Ensure clicks pass through */
                z-index: 100 !important; /* Lower z-index to prevent covering interactive elements */
            }
            
            /* Ensure comparison slider stays on top */
            .fullpage-comparison-container,
            .comparison-divider,
            .handle {
                z-index: 10000 !important;
            }
            
            /* Make sure form elements and buttons remain interactive */
            form, 
            button, 
            a, 
            input, 
            textarea, 
            .portfolio-item,
            .nav-links li,
            .filter-btn,
            .toggle-comparison-btn {
                position: relative;
                z-index: 200 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Modify lightning frequency if the functions are available
        if (window.lightningParams) {
            // Reduce frequency of lightning
            window.lightningParams.stormInterval = [15000, 30000]; // Longer intervals between lightning
            window.lightningParams.elementInteractionChance = 0.1; // Reduce chance of element interaction
            window.lightningParams.branchChance = 0.3; // Reduce branching
            
            console.log("Lightning parameters adjusted for subtlety");
        }
        
        // Modify water effect frequency if available
        if (window.waterParams) {
            window.waterParams.dropFrequency = 0.05; // Reduce drop frequency
            window.waterParams.maxDrops = Math.min(window.waterParams.maxDrops, 20); // Limit max drops
            
            console.log("Water parameters adjusted for subtlety");
        }
        
        // Create a toggle button for effects
        const effectsToggle = document.createElement('div');
        effectsToggle.className = 'effects-toggle';
        effectsToggle.innerHTML = `
            <button class="effects-toggle-btn">
                <i class="fas fa-bolt"></i> Effects: ON
            </button>
        `;
        
        // Add CSS for the toggle button
        const toggleStyle = document.createElement('style');
        toggleStyle.textContent = `
            .effects-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10001;
            }
            
            .effects-toggle-btn {
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                border: none;
                border-radius: 50px;
                padding: 8px 15px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.3s;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .effects-toggle-btn:hover {
                background-color: rgba(0, 0, 0, 0.8);
            }
            
            .effects-toggle-btn i {
                font-size: 12px;
            }
            
            /* Effects disabled state */
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
            body.effects-disabled .micro-spark,
            body.effects-disabled .basic-raindrops {
                display: none !important;
            }
            
            /* Hide comparison when effects are disabled */
            body.effects-disabled .fullpage-comparison-container {
                display: none !important;
            }
        `;
        document.head.appendChild(toggleStyle);
        
        // Add the toggle button to the page
        document.body.appendChild(effectsToggle);
        
        // Add toggle functionality
        const toggleBtn = effectsToggle.querySelector('.effects-toggle-btn');
        let effectsEnabled = true;
        
        toggleBtn.addEventListener('click', function() {
            effectsEnabled = !effectsEnabled;
            
            if (effectsEnabled) {
                document.body.classList.remove('effects-disabled');
                toggleBtn.innerHTML = `<i class="fas fa-bolt"></i> Effects: ON`;
            } else {
                document.body.classList.add('effects-disabled');
                toggleBtn.innerHTML = `<i class="fas fa-bolt"></i> Effects: OFF`;
            }
        });
        
        console.log("Lightning effects adjusted for better content visibility");
    }
}); 