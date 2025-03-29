// Realistic Leaves Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        enhanceRealisticLeaves();
    }, 7000);
    
    function enhanceRealisticLeaves() {
        console.log("Enhancing leaves with realistic effects");
        
        // Add CSS for enhanced realistic leaves
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced realistic leaf styles */
            .leaf {
                transform-origin: center bottom;
                filter: drop-shadow(0 5px 5px rgba(0,0,0,0.15));
                transition: filter 0.3s ease;
            }
            
            /* More realistic leaf shapes */
            .leaf-realistic-1 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%2343A047" d="M50,5 C60,5 75,15 80,30 C85,45 85,65 75,80 C65,95 55,95 50,95 C45,95 35,95 25,80 C15,65 15,45 20,30 C25,15 40,5 50,5 Z"/><path fill="%23388E3C" d="M50,5 C55,20 60,40 55,60 C50,80 50,90 50,95 C50,90 50,80 45,60 C40,40 45,20 50,5 Z"/></svg>');
            }
            
            .leaf-realistic-2 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%234CAF50" d="M30,10 C50,0 80,10 90,30 C100,50 90,80 70,90 C50,100 20,90 10,70 C0,50 10,20 30,10 Z"/><path fill="%23388E3C" d="M50,10 C60,30 65,50 60,70 C55,90 50,95 50,95 C50,95 45,90 40,70 C35,50 40,30 50,10 Z"/></svg>');
            }
            
            .leaf-realistic-3 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%2381C784" d="M50,5 C70,5 85,20 90,40 C95,60 90,80 70,90 C60,95 40,95 30,90 C10,80 5,60 10,40 C15,20 30,5 50,5 Z"/><path fill="%2366BB6A" d="M50,5 C55,25 55,50 50,75 C45,95 50,95 50,95 C50,95 55,95 50,75 C45,50 45,25 50,5 Z"/><path fill="%2366BB6A" d="M30,20 C40,30 45,50 45,70 M70,20 C60,30 55,50 55,70" stroke="%2366BB6A" stroke-width="1" fill="none"/></svg>');
            }
            
            .leaf-realistic-4 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%237CB342" d="M20,20 C40,0 70,0 80,20 C90,40 80,70 60,80 C40,90 10,80 5,60 C0,40 0,40 20,20 Z"/><path fill="%23558B2F" d="M50,10 C60,30 60,50 55,70 C50,90 50,90 50,90 C50,90 50,90 45,70 C40,50 40,30 50,10 Z"/><path fill="%23558B2F" d="M25,25 C35,35 40,50 40,65 M75,25 C65,35 60,50 60,65" stroke="%23558B2F" stroke-width="1" fill="none"/></svg>');
            }
            
            .leaf-realistic-5 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%238BC34A" d="M50,0 C65,0 80,10 90,30 C100,50 90,75 75,90 C60,100 40,100 25,90 C10,75 0,50 10,30 C20,10 35,0 50,0 Z"/><path fill="%237CB342" d="M50,0 C55,20 55,40 50,60 C45,80 50,90 50,90 C50,90 55,80 50,60 C45,40 45,20 50,0 Z"/><path fill="%237CB342" d="M30,20 C40,40 45,60 45,80 M70,20 C60,40 55,60 55,80" stroke="%237CB342" stroke-width="1" fill="none"/></svg>');
            }
            
            /* Realistic autumn leaves */
            .leaf-realistic-autumn-1 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23FF8F00" d="M50,5 C60,5 75,15 80,30 C85,45 85,65 75,80 C65,95 55,95 50,95 C45,95 35,95 25,80 C15,65 15,45 20,30 C25,15 40,5 50,5 Z"/><path fill="%23F57F17" d="M50,5 C55,20 60,40 55,60 C50,80 50,90 50,95 C50,90 50,80 45,60 C40,40 45,20 50,5 Z"/><path fill="%23F57F17" d="M30,30 C40,40 45,60 45,80 M70,30 C60,40 55,60 55,80" stroke="%23F57F17" stroke-width="1" fill="none"/></svg>');
            }
            
            .leaf-realistic-autumn-2 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23FF5722" d="M30,10 C50,0 80,10 90,30 C100,50 90,80 70,90 C50,100 20,90 10,70 C0,50 10,20 30,10 Z"/><path fill="%23E64A19" d="M50,10 C60,30 65,50 60,70 C55,90 50,95 50,95 C50,95 45,90 40,70 C35,50 40,30 50,10 Z"/><path fill="%23E64A19" d="M30,30 C40,40 45,60 45,80 M70,30 C60,40 55,60 55,80" stroke="%23E64A19" stroke-width="1" fill="none"/></svg>');
            }
            
            .leaf-realistic-autumn-3 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23F9A825" d="M50,5 C70,5 85,20 90,40 C95,60 90,80 70,90 C60,95 40,95 30,90 C10,80 5,60 10,40 C15,20 30,5 50,5 Z"/><path fill="%23F57F17" d="M50,5 C55,25 55,50 50,75 C45,95 50,95 50,95 C50,95 55,95 50,75 C45,50 45,25 50,5 Z"/><path fill="%23F57F17" d="M30,20 C40,30 45,50 45,70 M70,20 C60,30 55,50 55,70" stroke="%23F57F17" stroke-width="1" fill="none"/></svg>');
            }
            
            /* Wet leaf effect */
            .leaf.wet {
                filter: drop-shadow(0 5px 5px rgba(0,0,0,0.25)) brightness(0.8) saturate(1.5);
            }
            
            /* Leaf lighting effects based on wind direction */
            .leaf.wind-right {
                filter: drop-shadow(3px 5px 5px rgba(0,0,0,0.2)) brightness(1.05);
            }
            
            .leaf.wind-left {
                filter: drop-shadow(-3px 5px 5px rgba(0,0,0,0.2)) brightness(1.05);
            }
            
            /* Enhanced leaf animation */
            @keyframes leafWobble {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(5deg); }
                75% { transform: rotate(-5deg); }
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .leaf.wet {
                    filter: drop-shadow(0 3px 3px rgba(0,0,0,0.2)) brightness(0.85) saturate(1.3);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Enhance existing leaves
        enhanceExistingLeaves();
        
        // Set up interval to enhance new leaves
        setInterval(enhanceExistingLeaves, 1000);
        
        // Function to enhance existing leaves
        function enhanceExistingLeaves() {
            const leaves = document.querySelectorAll('.leaf:not(.enhanced)');
            
            leaves.forEach(leaf => {
                // Mark as enhanced
                leaf.classList.add('enhanced');
                
                // Replace basic leaf classes with realistic ones
                if (leaf.classList.contains('leaf-1') || leaf.classList.contains('leaf-2') || 
                    leaf.classList.contains('leaf-3') || leaf.classList.contains('leaf-4') || 
                    leaf.classList.contains('leaf-5')) {
                    
                    // Remove old class
                    leaf.classList.remove('leaf-1', 'leaf-2', 'leaf-3', 'leaf-4', 'leaf-5');
                    
                    // Add realistic leaf class
                    const realisticLeafType = Math.floor(Math.random() * 5) + 1;
                    leaf.classList.add(`leaf-realistic-${realisticLeafType}`);
                }
                
                // Replace basic autumn leaf classes with realistic ones
                if (leaf.classList.contains('leaf-autumn-1') || leaf.classList.contains('leaf-autumn-2') || 
                    leaf.classList.contains('leaf-autumn-3')) {
                    
                    // Remove old class
                    leaf.classList.remove('leaf-autumn-1', 'leaf-autumn-2', 'leaf-autumn-3');
                    
                    // Add realistic autumn leaf class
                    const realisticAutumnType = Math.floor(Math.random() * 3) + 1;
                    leaf.classList.add(`leaf-realistic-autumn-${realisticAutumnType}`);
                }
                
                // Randomly make some leaves appear wet (from the rain)
                if (Math.random() < 0.6) {
                    leaf.classList.add('wet');
                }
                
                // Add wind direction class based on global wind direction
                // This assumes the falling-leaves.js script has a windDirection variable
                // We'll check for it in the window object
                if (typeof window.windDirection !== 'undefined') {
                    if (window.windDirection > 0) {
                        leaf.classList.add('wind-right');
                        leaf.classList.remove('wind-left');
                    } else {
                        leaf.classList.add('wind-left');
                        leaf.classList.remove('wind-right');
                    }
                }
                
                // Add subtle wobble animation
                leaf.style.animation = `leafWobble ${2 + Math.random() * 2}s ease-in-out infinite`;
            });
        }
        
        // Expose wind direction for coordination with leaf-falling.js
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'windDirectionChange') {
                window.windDirection = event.data.direction;
                updateLeavesForWind();
            }
        });
        
        // Update leaves based on wind
        function updateLeavesForWind() {
            const leaves = document.querySelectorAll('.leaf.enhanced');
            
            leaves.forEach(leaf => {
                if (window.windDirection > 0) {
                    leaf.classList.add('wind-right');
                    leaf.classList.remove('wind-left');
                } else {
                    leaf.classList.add('wind-left');
                    leaf.classList.remove('wind-right');
                }
            });
        }
        
        console.log("Realistic leaves enhancement initialized");
    }
}); 