// Advanced Water Drip Effect
document.addEventListener('DOMContentLoaded', function() {
    // Initialize water drip effect
    initWaterDripEffect();
    
    function initWaterDripEffect() {
        const header = document.querySelector('header');
        if (!header) return;
        
        // Create canvas for water effect
        const canvas = document.createElement('canvas');
        canvas.className = 'water-canvas';
        document.body.appendChild(canvas);
        
        // Add CSS for water effect
        const style = document.createElement('style');
        style.textContent = `
            .water-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 999;
            }
            
            .water-drop {
                position: absolute;
                background: radial-gradient(
                    circle at 50% 30%, 
                    rgba(255, 255, 255, 0.8), 
                    rgba(99, 102, 241, 0.4) 40%, 
                    rgba(99, 102, 241, 0.2) 60%,
                    transparent 70%
                );
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
                filter: blur(1px);
                opacity: 0;
                transform-origin: center bottom;
                pointer-events: none;
                z-index: 1000;
            }
            
            .water-splash {
                position: absolute;
                width: 1px;
                height: 1px;
                background-color: rgba(99, 102, 241, 0.6);
                border-radius: 50%;
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                z-index: 1000;
            }
            
            .water-ripple {
                position: absolute;
                border: 2px solid rgba(99, 102, 241, 0.5);
                border-radius: 50%;
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                z-index: 999;
            }
            
            .water-trail {
                position: absolute;
                width: 2px;
                height: 10px;
                background: linear-gradient(
                    to bottom,
                    rgba(99, 102, 241, 0.1),
                    rgba(99, 102, 241, 0.4)
                );
                border-radius: 50%;
                opacity: 0;
                pointer-events: none;
                z-index: 999;
            }
            
            @keyframes dropFall {
                0% {
                    transform: translateY(0) scaleY(1) scaleX(1);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                30% {
                    transform: translateY(10px) scaleY(1.1) scaleX(0.9);
                    opacity: 0.8;
                }
                60% {
                    transform: translateY(60px) scaleY(1.3) scaleX(0.8);
                    opacity: 0.6;
                }
                80% {
                    transform: translateY(80px) scaleY(1.2) scaleX(0.8);
                    opacity: 0.4;
                }
                100% {
                    transform: translateY(100px) scaleY(0.8) scaleX(1.2);
                    opacity: 0;
                }
            }
            
            @keyframes splash {
                0% {
                    transform: scale(0);
                    opacity: 0.8;
                }
                80% {
                    opacity: 0.5;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(10);
                    opacity: 0;
                }
            }
            
            @keyframes trail {
                0% {
                    height: 0;
                    opacity: 0;
                }
                30% {
                    opacity: 0.5;
                }
                100% {
                    height: 20px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Set up canvas
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Water physics parameters
        const drops = [];
        const splashes = [];
        const ripples = [];
        const trails = [];
        const headerBottom = header.offsetTop + header.offsetHeight;
        
        // Create water drops at random intervals
        function createDrop() {
            // Random position along the header
            const x = Math.random() * window.innerWidth;
            
            // Create drop element
            const drop = document.createElement('div');
            drop.className = 'water-drop';
            
            // Random size
            const size = Math.random() * 10 + 5;
            drop.style.width = `${size}px`;
            drop.style.height = `${size * 1.2}px`;
            
            // Position at bottom of header
            drop.style.left = `${x}px`;
            drop.style.top = `${headerBottom}px`;
            
            // Random animation duration
            const duration = Math.random() * 1.5 + 1;
            drop.style.animation = `dropFall ${duration}s cubic-bezier(0.2, 0.8, 0.3, 1) forwards`;
            
            // Add to DOM
            document.body.appendChild(drop);
            
            // Track drop
            const dropObj = {
                element: drop,
                x: x,
                y: headerBottom,
                size: size,
                speed: 2 + Math.random() * 2,
                opacity: 0.8,
                remove: false
            };
            drops.push(dropObj);
            
            // Create trail
            createTrail(x, headerBottom, size);
            
            // Remove after animation
            setTimeout(() => {
                // Create splash when drop hits "ground"
                createSplash(x, headerBottom + 100, size);
                
                // Remove drop
                drop.remove();
                dropObj.remove = true;
                
                // Filter out removed drops
                const index = drops.indexOf(dropObj);
                if (index > -1) {
                    drops.splice(index, 1);
                }
            }, duration * 1000);
        }
        
        // Create splash effect
        function createSplash(x, y, size) {
            const splash = document.createElement('div');
            splash.className = 'water-splash';
            splash.style.left = `${x}px`;
            splash.style.top = `${y}px`;
            
            // Random animation duration
            const duration = Math.random() * 0.5 + 0.5;
            splash.style.animation = `splash ${duration}s ease-out forwards`;
            
            // Add to DOM
            document.body.appendChild(splash);
            
            // Create ripple
            createRipple(x, y, size * 2);
            
            // Remove after animation
            setTimeout(() => {
                splash.remove();
            }, duration * 1000);
        }
        
        // Create ripple effect
        function createRipple(x, y, size) {
            const ripple = document.createElement('div');
            ripple.className = 'water-ripple';
            ripple.style.left = `${x - size/2}px`;
            ripple.style.top = `${y - size/2}px`;
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            
            // Random animation duration
            const duration = Math.random() * 1 + 1;
            ripple.style.animation = `ripple ${duration}s ease-out forwards`;
            
            // Add to DOM
            document.body.appendChild(ripple);
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, duration * 1000);
        }
        
        // Create water trail
        function createTrail(x, y, size) {
            const trail = document.createElement('div');
            trail.className = 'water-trail';
            trail.style.left = `${x + size/2 - 1}px`;
            trail.style.top = `${y}px`;
            
            // Random animation duration
            const duration = Math.random() * 0.5 + 0.5;
            trail.style.animation = `trail ${duration}s ease-out forwards`;
            
            // Add to DOM
            document.body.appendChild(trail);
            
            // Remove after animation
            setTimeout(() => {
                trail.remove();
            }, duration * 1000);
        }
        
        // Create water drops at random intervals
        function startWaterEffect() {
            // Initial drops
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createDrop();
                }, i * 200);
            }
            
            // Continue creating drops
            setInterval(() => {
                if (Math.random() < 0.3) {
                    createDrop();
                }
            }, 300);
        }
        
        // Add interactive water effect on hover
        header.addEventListener('mousemove', function(e) {
            if (Math.random() < 0.1) {
                const x = e.clientX;
                const y = headerBottom;
                const size = Math.random() * 8 + 4;
                
                // Create interactive drop
                const drop = document.createElement('div');
                drop.className = 'water-drop';
                drop.style.width = `${size}px`;
                drop.style.height = `${size * 1.2}px`;
                drop.style.left = `${x}px`;
                drop.style.top = `${y}px`;
                
                const duration = Math.random() * 1.5 + 1;
                drop.style.animation = `dropFall ${duration}s cubic-bezier(0.2, 0.8, 0.3, 1) forwards`;
                
                document.body.appendChild(drop);
                
                // Create trail
                createTrail(x, y, size);
                
                // Remove after animation
                setTimeout(() => {
                    createSplash(x, y + 100, size);
                    drop.remove();
                }, duration * 1000);
            }
        });
        
        // Start water effect
        startWaterEffect();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Advanced water simulation on canvas
        function drawWaterSimulation() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw water connections
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < drops.length; i++) {
                for (let j = i + 1; j < drops.length; j++) {
                    const drop1 = drops[i];
                    const drop2 = drops[j];
                    
                    const dx = drop1.x - drop2.x;
                    const dy = drop1.y - drop2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(drop1.x, drop1.y);
                        ctx.lineTo(drop2.x, drop2.y);
                        ctx.stroke();
                    }
                }
            }
            
            // Request next frame
            requestAnimationFrame(drawWaterSimulation);
        }
        
        // Start water simulation
        drawWaterSimulation();
    }
}); 