// Leaf Fix - Ensure leaves are visible
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quickly to fix leaves
    setTimeout(() => {
        fixLeaves();
    }, 2000);
    
    function fixLeaves() {
        console.log("Fixing leaves visibility");
        
        // Check if leaves container exists
        let leavesContainer = document.querySelector('.leaves-container');
        
        // If container doesn't exist, create it
        if (!leavesContainer) {
            console.log("Creating missing leaves container");
            leavesContainer = document.createElement('div');
            leavesContainer.className = 'leaves-container';
            document.body.appendChild(leavesContainer);
        }
        
        // Check if there are leaves in the container
        const existingLeaves = document.querySelectorAll('.leaf');
        
        // If no leaves exist, create some immediately
        if (existingLeaves.length === 0) {
            console.log("Creating initial leaves");
            createInitialLeaves();
        }
        
        // Create initial leaves
        function createInitialLeaves() {
            // Add CSS for leaves if not already present
            if (!document.querySelector('style#leaf-fix-styles')) {
                const style = document.createElement('style');
                style.id = 'leaf-fix-styles';
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
                        filter: drop-shadow(0 5px 5px rgba(0,0,0,0.15));
                    }
                    
                    /* Direct leaf shapes for immediate visibility */
                    .leaf-direct-1 {
                        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%2343A047" d="M50,5 C60,5 75,15 80,30 C85,45 85,65 75,80 C65,95 55,95 50,95 C45,95 35,95 25,80 C15,65 15,45 20,30 C25,15 40,5 50,5 Z"/><path fill="%23388E3C" d="M50,5 C55,20 60,40 55,60 C50,80 50,90 50,95 C50,90 50,80 45,60 C40,40 45,20 50,5 Z"/></svg>');
                    }
                    
                    .leaf-direct-2 {
                        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23FF5722" d="M30,10 C50,0 80,10 90,30 C100,50 90,80 70,90 C50,100 20,90 10,70 C0,50 10,20 30,10 Z"/><path fill="%23E64A19" d="M50,10 C60,30 65,50 60,70 C55,90 50,95 50,95 C50,95 45,90 40,70 C35,50 40,30 50,10 Z"/></svg>');
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Create 20 leaves immediately
            for (let i = 0; i < 20; i++) {
                createDirectLeaf();
            }
        }
        
        // Create a single direct leaf
        function createDirectLeaf() {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            // Add direct leaf class
            const leafType = Math.random() > 0.5 ? 'leaf-direct-1' : 'leaf-direct-2';
            leaf.classList.add(leafType);
            
            // Random size (larger for visibility)
            const size = 20 + Math.random() * 30;
            leaf.style.width = `${size}px`;
            leaf.style.height = `${size}px`;
            
            // Random position
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight * 0.5; // Top half of screen
            leaf.style.left = `${startX}px`;
            leaf.style.top = `${startY}px`;
            
            // Add to container
            leavesContainer.appendChild(leaf);
            
            // Animate the leaf falling
            animateDirectLeaf(leaf);
        }
        
        // Animate a direct leaf
        function animateDirectLeaf(leaf) {
            // Random duration
            const duration = 10 + Math.random() * 15;
            
            // Random rotation
            const rotation = Math.random() * 360;
            
            // Get starting position
            const startX = parseFloat(leaf.style.left);
            const startY = parseFloat(leaf.style.top);
            
            // Create animation
            const startTime = Date.now();
            const animate = () => {
                const elapsed = (Date.now() - startTime) / 1000;
                const progress = elapsed / duration;
                
                if (progress < 1) {
                    // Vertical movement (falling)
                    const verticalPosition = startY + progress * (window.innerHeight + 100);
                    
                    // Horizontal movement (swaying)
                    const horizontalPosition = startX + Math.sin(progress * 5) * 100;
                    
                    // Rotation
                    const currentRotation = rotation + progress * 360;
                    
                    // Apply transforms
                    leaf.style.transform = `translate(${horizontalPosition - startX}px, ${verticalPosition - startY}px) rotate(${currentRotation}deg)`;
                    
                    // Continue animation
                    requestAnimationFrame(animate);
                } else {
                    // Remove leaf and create a new one
                    leaf.remove();
                    createDirectLeaf();
                }
            };
            
            // Start animation
            requestAnimationFrame(animate);
        }
        
        // Make window.windDirection available for other scripts
        if (typeof window.windDirection === 'undefined') {
            window.windDirection = 1;
        }
        
        console.log("Leaf fix initialized");
    }
}); 