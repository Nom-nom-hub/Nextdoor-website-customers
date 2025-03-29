// Playful Nav Links Animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initPlayfulNavLinks();
    }, 1000);
    
    function initPlayfulNavLinks() {
        console.log("Initializing playful nav links");
        
        // Add CSS for playful nav links
        const style = document.createElement('style');
        style.textContent = `
            /* Playful nav links styles */
            .nav-links {
                position: relative;
            }
            
            .nav-links li {
                transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), 
                            color 0.3s ease;
                will-change: transform;
                position: relative;
                z-index: 1;
            }
            
            .nav-links li a {
                position: relative;
                z-index: 2;
                transition: color 0.3s ease, text-shadow 0.3s ease;
            }
            
            .nav-links li.playing {
                animation: navItemFloat 3s infinite alternate ease-in-out;
            }
            
            .nav-links:hover li.playing {
                animation-play-state: paused;
            }
            
            .nav-links li:hover {
                transform: translateY(-5px) scale(1.1);
                z-index: 10;
            }
            
            .nav-links li:hover a {
                color: #4CAF50;
                text-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
            }
            
            /* Playful animations */
            @keyframes navItemFloat {
                0% {
                    transform: translateY(0) rotate(0deg);
                }
                25% {
                    transform: translateY(-5px) rotate(2deg);
                }
                50% {
                    transform: translateY(0) rotate(0deg);
                }
                75% {
                    transform: translateY(5px) rotate(-2deg);
                }
                100% {
                    transform: translateY(0) rotate(0deg);
                }
            }
            
            /* Playful interaction effects */
            .nav-links li.bump-left {
                animation: bumpLeft 0.5s ease-in-out;
            }
            
            .nav-links li.bump-right {
                animation: bumpRight 0.5s ease-in-out;
            }
            
            @keyframes bumpLeft {
                0% { transform: translateX(0); }
                25% { transform: translateX(-10px) rotate(-5deg); }
                50% { transform: translateX(5px) rotate(2deg); }
                75% { transform: translateX(-3px) rotate(-1deg); }
                100% { transform: translateX(0) rotate(0); }
            }
            
            @keyframes bumpRight {
                0% { transform: translateX(0); }
                25% { transform: translateX(10px) rotate(5deg); }
                50% { transform: translateX(-5px) rotate(-2deg); }
                75% { transform: translateX(3px) rotate(1deg); }
                100% { transform: translateX(0) rotate(0); }
            }
            
            /* Playful particles */
            .nav-particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: #4CAF50;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                z-index: 1;
            }
            
            @keyframes particleFade {
                0% { transform: translateY(0) scale(0); opacity: 0; }
                20% { opacity: 0.8; }
                100% { transform: translateY(-20px) scale(1.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Get nav links
        const navLinks = document.querySelectorAll('.nav-links li');
        
        // Initialize playful behavior
        if (navLinks.length > 0) {
            // Add playing class to all links initially
            navLinks.forEach(link => {
                link.classList.add('playing');
                
                // Set random animation delay for each link
                const delay = Math.random() * 2;
                link.style.animationDelay = `${delay}s`;
            });
            
            // Set up interaction between links
            setupLinkInteractions(navLinks);
            
            // Add particle effects
            setupParticleEffects(navLinks);
        }
        
        // Set up interactions between links
        function setupLinkInteractions(links) {
            // Periodically make links interact with each other
            setInterval(() => {
                // Only interact if not being hovered
                if (!document.querySelector('.nav-links:hover')) {
                    const randomIndex = Math.floor(Math.random() * links.length);
                    const randomLink = links[randomIndex];
                    
                    // Determine interaction type
                    const interactionType = Math.random();
                    
                    if (interactionType < 0.5) {
                        // Bump with previous link
                        if (randomIndex > 0) {
                            const prevLink = links[randomIndex - 1];
                            bumpLinks(randomLink, prevLink, 'left');
                        }
                    } else {
                        // Bump with next link
                        if (randomIndex < links.length - 1) {
                            const nextLink = links[randomIndex + 1];
                            bumpLinks(randomLink, nextLink, 'right');
                        }
                    }
                }
            }, 3000);
            
            // Handle hover effects
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    // Create particles on hover
                    createParticles(link, 5);
                    
                    // Pause all animations temporarily
                    links.forEach(otherLink => {
                        otherLink.style.animationPlayState = 'paused';
                    });
                });
                
                link.addEventListener('mouseleave', () => {
                    // Resume animations
                    links.forEach(otherLink => {
                        otherLink.style.animationPlayState = 'running';
                    });
                });
            });
        }
        
        // Bump two links together
        function bumpLinks(link1, link2, direction) {
            // Remove any existing bump classes
            link1.classList.remove('bump-left', 'bump-right');
            link2.classList.remove('bump-left', 'bump-right');
            
            // Force reflow
            void link1.offsetWidth;
            void link2.offsetWidth;
            
            // Add appropriate bump classes
            if (direction === 'left') {
                link1.classList.add('bump-left');
                link2.classList.add('bump-right');
            } else {
                link1.classList.add('bump-right');
                link2.classList.add('bump-left');
            }
            
            // Create particles at the collision point
            const link1Rect = link1.getBoundingClientRect();
            const link2Rect = link2.getBoundingClientRect();
            
            const collisionX = direction === 'left' 
                ? (link1Rect.left + link2Rect.right) / 2
                : (link1Rect.right + link2Rect.left) / 2;
                
            const collisionY = (link1Rect.top + link2Rect.bottom) / 2;
            
            // Create particles at collision point
            createParticlesAtPoint(collisionX, collisionY, 3);
            
            // Remove classes after animation completes
            setTimeout(() => {
                link1.classList.remove('bump-left', 'bump-right');
                link2.classList.remove('bump-left', 'bump-right');
            }, 500);
        }
        
        // Set up particle effects
        function setupParticleEffects(links) {
            // Create container for particles
            const particleContainer = document.createElement('div');
            particleContainer.className = 'nav-particle-container';
            particleContainer.style.position = 'absolute';
            particleContainer.style.top = '0';
            particleContainer.style.left = '0';
            particleContainer.style.width = '100%';
            particleContainer.style.height = '100%';
            particleContainer.style.pointerEvents = 'none';
            particleContainer.style.zIndex = '1';
            
            // Add container to navbar
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.position = 'relative';
                navbar.appendChild(particleContainer);
            }
        }
        
        // Create particles at a specific point
        function createParticlesAtPoint(x, y, count) {
            const container = document.querySelector('.nav-particle-container');
            if (!container) return;
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'nav-particle';
                
                // Position particle
                const navbarRect = container.getBoundingClientRect();
                particle.style.left = `${x - navbarRect.left}px`;
                particle.style.top = `${y - navbarRect.top}px`;
                
                // Random color variation
                const hue = 100 + Math.random() * 40; // Green variations
                particle.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
                
                // Random size
                const size = 4 + Math.random() * 4;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Add animation
                particle.style.animation = `particleFade 0.8s ease-out forwards`;
                
                // Add to container
                container.appendChild(particle);
                
                // Remove after animation completes
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        }
        
        // Create particles around an element
        function createParticles(element, count) {
            const rect = element.getBoundingClientRect();
            
            for (let i = 0; i < count; i++) {
                // Random position around the element
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top + Math.random() * rect.height;
                
                createParticlesAtPoint(x, y, 1);
            }
        }
        
        console.log("Playful nav links initialized");
    }
}); 