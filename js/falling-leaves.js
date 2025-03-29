// Falling Leaves Effect
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        initFallingLeaves();
    }, 6500);
    
    function initFallingLeaves() {
        console.log("Initializing falling leaves effect");
        
        // Create container for leaves
        const leavesContainer = document.createElement('div');
        leavesContainer.className = 'leaves-container';
        document.body.appendChild(leavesContainer);
        
        // Add CSS for leaves
        const style = document.createElement('style');
        style.textContent = `
            .leaves-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 92;
                overflow: hidden;
            }
            
            .leaf {
                position: absolute;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                opacity: 0.8;
                will-change: transform;
                z-index: 92;
                filter: drop-shadow(0 5px 5px rgba(0,0,0,0.1));
            }
            
            .leaf-1 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23558B2F" d="M50,0 C70,15 100,40 90,60 C80,80 60,85 50,100 C40,85 20,80 10,60 C0,40 30,15 50,0 Z"/></svg>');
            }
            
            .leaf-2 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%237CB342" d="M30,10 C60,0 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 10,20 30,10 Z"/></svg>');
            }
            
            .leaf-3 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%238BC34A" d="M50,0 C80,20 90,50 80,80 C60,95 40,95 20,80 C10,50 20,20 50,0 Z"/></svg>');
            }
            
            .leaf-4 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23689F38" d="M80,20 C95,40 90,70 70,85 C50,95 30,90 15,70 C5,50 10,30 30,15 C50,5 65,5 80,20 Z"/></svg>');
            }
            
            .leaf-5 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23A5D6A7" d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z M50,20 C35,20 20,35 20,50 C20,65 35,80 50,80 C65,80 80,65 80,50 C80,35 65,20 50,20 Z"/></svg>');
            }
            
            /* Autumn color variations */
            .leaf-autumn-1 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23FF5722" d="M50,0 C70,15 100,40 90,60 C80,80 60,85 50,100 C40,85 20,80 10,60 C0,40 30,15 50,0 Z"/></svg>');
            }
            
            .leaf-autumn-2 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23F57C00" d="M30,10 C60,0 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 10,20 30,10 Z"/></svg>');
            }
            
            .leaf-autumn-3 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23FFB300" d="M50,0 C80,20 90,50 80,80 C60,95 40,95 20,80 C10,50 20,20 50,0 Z"/></svg>');
            }
            
            /* Ensure leaves work with the comparison slider */
            body:not(.effects-disabled) .leaves-container {
                clip-path: polygon(var(--slider-position, 0%) 0, 100% 0, 100% 100%, var(--slider-position, 0%) 100%);
            }
            
            /* Hide leaves when effects are disabled */
            body.effects-disabled .leaves-container {
                display: none;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .leaf {
                    opacity: 0.6; /* Reduce opacity on mobile */
                }
            }
        `;
        document.head.appendChild(style);
        
        // Leaf parameters
        const leafCount = 30;
        const leafTypes = 8; // 5 green + 3 autumn
        const minSize = 15;
        const maxSize = 35;
        const minDuration = 10;
        const maxDuration = 25;
        
        // Wind parameters
        let windStrength = 0.5;
        let windDirection = 1; // 1 = right, -1 = left
        let gustTimer = null;
        
        // Create initial leaves
        createLeaves();
        
        // Start wind simulation
        simulateWind();
        
        // Create leaves
        function createLeaves() {
            for (let i = 0; i < leafCount; i++) {
                setTimeout(() => {
                    createLeaf();
                }, i * 300); // Stagger leaf creation
            }
        }
        
        // Create a single leaf
        function createLeaf() {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            // Randomly select leaf type
            const leafTypeNum = Math.floor(Math.random() * leafTypes) + 1;
            if (leafTypeNum <= 5) {
                leaf.classList.add(`leaf-${leafTypeNum}`);
            } else {
                leaf.classList.add(`leaf-autumn-${leafTypeNum - 5}`);
            }
            
            // Random size
            const size = minSize + Math.random() * (maxSize - minSize);
            leaf.style.width = `${size}px`;
            leaf.style.height = `${size}px`;
            
            // Initial position - start from top, random horizontal position
            const startX = Math.random() * window.innerWidth;
            leaf.style.left = `${startX}px`;
            leaf.style.top = '-50px';
            
            // Add to container
            leavesContainer.appendChild(leaf);
            
            // Animate the leaf
            animateLeaf(leaf);
        }
        
        // Animate a leaf falling
        function animateLeaf(leaf) {
            // Random duration
            const duration = minDuration + Math.random() * (maxDuration - minDuration);
            
            // Random horizontal movement range
            const horizontalRange = 150 + Math.random() * 150;
            
            // Random rotation
            const rotation = Math.random() * 360;
            const rotationSpeed = (Math.random() * 2 - 1) * 360;
            
            // Get starting position
            const startX = parseFloat(leaf.style.left);
            
            // Create animation
            const startTime = Date.now();
            const animate = () => {
                const elapsed = (Date.now() - startTime) / 1000;
                const progress = elapsed / duration;
                
                if (progress < 1) {
                    // Vertical movement (falling)
                    const verticalPosition = progress * (window.innerHeight + 100);
                    
                    // Horizontal movement (swaying + wind)
                    const swayAmount = Math.sin(progress * 10) * 15;
                    const windEffect = windStrength * windDirection * progress * 100;
                    const horizontalPosition = startX + Math.sin(progress * 5) * horizontalRange + swayAmount + windEffect;
                    
                    // Rotation
                    const currentRotation = rotation + progress * rotationSpeed;
                    
                    // Apply transforms
                    leaf.style.transform = `translate(${horizontalPosition - startX}px, ${verticalPosition}px) rotate(${currentRotation}deg)`;
                    
                    // Continue animation
                    requestAnimationFrame(animate);
                } else {
                    // Remove leaf and create a new one
                    leaf.remove();
                    createLeaf();
                }
            };
            
            // Start animation
            requestAnimationFrame(animate);
        }
        
        // Simulate changing wind conditions
        function simulateWind() {
            // Change wind every 3-8 seconds
            const changeWind = () => {
                // Random wind strength
                windStrength = 0.2 + Math.random() * 1.5;
                
                // Occasionally change direction
                if (Math.random() < 0.3) {
                    windDirection *= -1;
                }
                
                // Occasionally create a strong gust
                if (Math.random() < 0.2) {
                    createGust();
                }
                
                // Schedule next wind change
                clearTimeout(gustTimer);
                gustTimer = setTimeout(changeWind, 3000 + Math.random() * 5000);
            };
            
            // Initial wind change
            changeWind();
        }
        
        // Create a strong gust of wind
        function createGust() {
            const originalStrength = windStrength;
            
            // Quickly increase wind strength
            windStrength = 2 + Math.random() * 2;
            
            // Create more leaves during gust
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createLeaf();
                }, i * 100);
            }
            
            // Return to normal after gust
            setTimeout(() => {
                windStrength = originalStrength;
            }, 2000);
        }
        
        console.log("Falling leaves effect initialized");
    }
}); 