// Enhanced Playful Nav Links with Play Fighting
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initEnhancedPlayfulNavLinks();
    }, 1000);
    
    function initEnhancedPlayfulNavLinks() {
        console.log("Initializing enhanced playful nav links with play fighting");
        
        // Add CSS for enhanced playful nav links
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced playful nav links styles */
            .nav-links {
                position: relative;
                perspective: 800px;
            }
            
            .nav-links li {
                transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                will-change: transform, position;
                position: relative;
                z-index: 1;
                transform-origin: center center;
            }
            
            .nav-links li a {
                position: relative;
                z-index: 2;
                transition: color 0.3s ease, text-shadow 0.3s ease;
                display: inline-block;
            }
            
            /* Play fighting state */
            .nav-links.play-fighting li {
                position: absolute;
                top: 0;
                left: 0;
                animation: none !important;
            }
            
            /* When nav is hovered, links return to normal */
            .nav-links:hover li {
                position: relative !important;
                top: auto !important;
                left: auto !important;
                transform: translateX(0) translateY(0) rotate(0deg) !important;
                transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
            }
            
            .nav-links li:hover {
                transform: translateY(-5px) scale(1.1) !important;
                z-index: 10;
            }
            
            .nav-links li:hover a {
                color: #4CAF50;
                text-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
            }
            
            /* Fighting effects */
            .nav-links li.punch {
                animation: punchAnimation 0.5s ease-in-out;
                z-index: 5;
            }
            
            .nav-links li.dodge {
                animation: dodgeAnimation 0.5s ease-in-out;
            }
            
            .nav-links li.spin {
                animation: spinAnimation 0.7s ease-in-out;
            }
            
            .nav-links li.jump {
                animation: jumpAnimation 0.6s ease-in-out;
            }
            
            @keyframes punchAnimation {
                0% { transform: translateX(0) rotate(0deg); }
                25% { transform: translateX(-10px) rotate(-5deg); }
                50% { transform: translateX(30px) rotate(5deg) scale(1.1); }
                75% { transform: translateX(15px) rotate(3deg); }
                100% { transform: translateX(0) rotate(0deg); }
            }
            
            @keyframes dodgeAnimation {
                0% { transform: translateY(0); }
                50% { transform: translateY(-20px) translateX(15px) rotate(10deg); }
                100% { transform: translateY(0); }
            }
            
            @keyframes spinAnimation {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes jumpAnimation {
                0% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-30px) scale(1.2); }
                100% { transform: translateY(0) scale(1); }
            }
            
            /* Enhanced particles */
            .nav-particle {
                position: absolute;
                width: 8px;
                height: 8px;
                background: #4CAF50;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                z-index: 1;
                box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
            }
            
            /* Action text bubbles */
            .action-text {
                position: absolute;
                font-size: 12px;
                font-weight: bold;
                color: #333;
                background: rgba(255, 255, 255, 0.8);
                padding: 3px 8px;
                border-radius: 10px;
                pointer-events: none;
                opacity: 0;
                transform: scale(0);
                z-index: 100;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                animation: actionTextAppear 1s forwards;
            }
            
            @keyframes actionTextAppear {
                0% { opacity: 0; transform: scale(0); }
                20% { opacity: 1; transform: scale(1.2); }
                30% { transform: scale(1); }
                80% { opacity: 1; }
                100% { opacity: 0; transform: translateY(-20px) scale(0.8); }
            }
            
            /* Impact effects */
            .impact-effect {
                position: absolute;
                width: 40px;
                height: 40px;
                background: radial-gradient(circle, rgba(76,175,80,0.8) 0%, rgba(76,175,80,0) 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                opacity: 0;
                transform: scale(0.5);
                animation: impactAnimation 0.5s ease-out forwards;
            }
            
            @keyframes impactAnimation {
                0% { opacity: 0.8; transform: scale(0.5); }
                100% { opacity: 0; transform: scale(2); }
            }
        `;
        document.head.appendChild(style);
        
        // Get nav links
        const navLinks = document.querySelectorAll('.nav-links li');
        const navLinksContainer = document.querySelector('.nav-links');
        
        // Initialize playful behavior
        if (navLinks.length > 0 && navLinksContainer) {
            // Add play-fighting class to container
            navLinksContainer.classList.add('play-fighting');
            
            // Store original positions for restoration
            const originalPositions = [];
            navLinks.forEach(link => {
                const rect = link.getBoundingClientRect();
                const containerRect = navLinksContainer.getBoundingClientRect();
                originalPositions.push({
                    left: rect.left - containerRect.left,
                    top: rect.top - containerRect.top
                });
            });
            
            // Randomize initial positions for play fighting
            randomizePositions(navLinks, navLinksContainer);
            
            // Set up fighting interactions
            setupFightingInteractions(navLinks, navLinksContainer);
            
            // Add particle effects
            setupEnhancedParticleEffects(navLinks);
            
            // When nav is hovered, restore original positions
            navLinksContainer.addEventListener('mouseenter', () => {
                navLinks.forEach((link, index) => {
                    // Clear any ongoing animations
                    link.className = link.className.replace(/punch|dodge|spin|jump/g, '');
                    
                    // Remove any inline styles that might interfere
                    link.style.animation = 'none';
                });
                
                // Add a small delay for visual effect
                setTimeout(() => {
                    createActionText(navLinksContainer, "Order restored!", 
                        navLinksContainer.offsetWidth / 2, 
                        navLinksContainer.offsetHeight / 2);
                }, 300);
            });
            
            // When nav is left, go back to play fighting
            navLinksContainer.addEventListener('mouseleave', () => {
                // Wait a moment before resuming the fight
                setTimeout(() => {
                    randomizePositions(navLinks, navLinksContainer);
                    createActionText(navLinksContainer, "Chaos resumes!", 
                        navLinksContainer.offsetWidth / 2, 
                        navLinksContainer.offsetHeight / 2);
                }, 500);
            });
        }
        
        // Randomize positions for play fighting
        function randomizePositions(links, container) {
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            
            links.forEach(link => {
                // Generate random position within container
                const randomX = Math.random() * (containerWidth - link.offsetWidth);
                const randomY = Math.random() * (containerHeight - link.offsetHeight);
                const randomRotation = (Math.random() * 40) - 20;
                
                // Apply random position
                link.style.position = 'absolute';
                link.style.left = `${randomX}px`;
                link.style.top = `${randomY}px`;
                link.style.transform = `rotate(${randomRotation}deg)`;
            });
        }
        
        // Set up fighting interactions
        function setupFightingInteractions(links, container) {
            // Periodically make links interact with each other
            const fightInterval = setInterval(() => {
                // Only interact if not being hovered
                if (!container.matches(':hover')) {
                    // Pick two random links to interact
                    const linkCount = links.length;
                    const fighter1Index = Math.floor(Math.random() * linkCount);
                    let fighter2Index = Math.floor(Math.random() * linkCount);
                    
                    // Make sure we have two different links
                    while (fighter2Index === fighter1Index && linkCount > 1) {
                        fighter2Index = Math.floor(Math.random() * linkCount);
                    }
                    
                    const fighter1 = links[fighter1Index];
                    const fighter2 = links[fighter2Index];
                    
                    // Determine interaction type
                    const interactionType = Math.random();
                    
                    if (interactionType < 0.3) {
                        // Fighter 1 punches, Fighter 2 dodges
                        fightAction(fighter1, fighter2, 'punch', 'dodge');
                    } else if (interactionType < 0.6) {
                        // Fighter 2 punches, Fighter 1 dodges
                        fightAction(fighter2, fighter1, 'punch', 'dodge');
                    } else if (interactionType < 0.8) {
                        // One fighter spins
                        const spinner = Math.random() < 0.5 ? fighter1 : fighter2;
                        fightAction(spinner, null, 'spin', null);
                    } else {
                        // One fighter jumps
                        const jumper = Math.random() < 0.5 ? fighter1 : fighter2;
                        fightAction(jumper, null, 'jump', null);
                    }
                }
            }, 2000);
            
            // Clear interval when page is unloaded
            window.addEventListener('beforeunload', () => {
                clearInterval(fightInterval);
            });
        }
        
        // Execute a fighting action between two links
        function fightAction(link1, link2, action1, action2) {
            // Remove any existing action classes
            link1.classList.remove('punch', 'dodge', 'spin', 'jump');
            if (link2) link2.classList.remove('punch', 'dodge', 'spin', 'jump');
            
            // Force reflow
            void link1.offsetWidth;
            if (link2) void link2.offsetWidth;
            
            // Add action classes
            link1.classList.add(action1);
            if (link2 && action2) link2.classList.add(action2);
            
            // Create action text
            const rect1 = link1.getBoundingClientRect();
            
            // Create appropriate action text
            if (action1 === 'punch' && action2 === 'dodge') {
                createActionText(link1, "Punch!", rect1.width / 2, rect1.height / 2);
                
                const rect2 = link2.getBoundingClientRect();
                createActionText(link2, "Dodge!", rect2.width / 2, rect2.height / 2);
                
                // Create impact effect between the two elements
                const impactX = (rect1.left + rect2.left) / 2;
                const impactY = (rect1.top + rect2.top) / 2;
                createImpactEffect(impactX, impactY);
                
                // Create particles at impact point
                createEnhancedParticlesAtPoint(impactX, impactY, 8);
            } else if (action1 === 'spin') {
                createActionText(link1, "Spin!", rect1.width / 2, rect1.height / 2);
                
                // Create particles around spinning element
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createEnhancedParticles(link1, 2);
                    }, i * 100);
                }
            } else if (action1 === 'jump') {
                createActionText(link1, "Jump!", rect1.width / 2, rect1.height / 2);
                
                // Create particles below jumping element
                setTimeout(() => {
                    createEnhancedParticlesAtPoint(
                        rect1.left + rect1.width / 2,
                        rect1.bottom,
                        5
                    );
                }, 300);
            }
            
            // Remove classes after animation completes
            setTimeout(() => {
                link1.classList.remove(action1);
                if (link2 && action2) link2.classList.remove(action2);
            }, 700);
        }
        
        // Create action text bubble
        function createActionText(element, text, x, y) {
            const actionText = document.createElement('div');
            actionText.className = 'action-text';
            actionText.textContent = text;
            
            // Position relative to element
            actionText.style.left = `${x}px`;
            actionText.style.top = `${y}px`;
            
            // Add to element
            element.appendChild(actionText);
            
            // Remove after animation completes
            setTimeout(() => {
                actionText.remove();
            }, 1000);
        }
        
        // Create impact effect
        function createImpactEffect(x, y) {
            const container = document.querySelector('.nav-particle-container');
            if (!container) return;
            
            const impact = document.createElement('div');
            impact.className = 'impact-effect';
            
            // Position impact
            const navbarRect = container.getBoundingClientRect();
            impact.style.left = `${x - navbarRect.left - 20}px`;
            impact.style.top = `${y - navbarRect.top - 20}px`;
            
            // Add to container
            container.appendChild(impact);
            
            // Remove after animation completes
            setTimeout(() => {
                impact.remove();
            }, 500);
        }
        
        // Set up enhanced particle effects
        function setupEnhancedParticleEffects(links) {
            // Create container for particles if it doesn't exist
            if (!document.querySelector('.nav-particle-container')) {
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
        }
        
        // Create enhanced particles at a specific point
        function createEnhancedParticlesAtPoint(x, y, count) {
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
                const size = 4 + Math.random() * 6;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random direction animation
                const angle = Math.random() * Math.PI * 2;
                const distance = 20 + Math.random() * 30;
                const duration = 0.5 + Math.random() * 0.5;
                
                particle.style.animation = 'none';
                particle.style.opacity = '0.8';
                
                // Custom animation with random direction
                const keyframes = `
                    @keyframes particle${Date.now()}${i} {
                        0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
                        100% { transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0); opacity: 0; }
                    }
                `;
                
                // Add keyframes
                const styleSheet = document.createElement('style');
                styleSheet.textContent = keyframes;
                document.head.appendChild(styleSheet);
                
                // Apply animation
                particle.style.animation = `particle${Date.now()}${i} ${duration}s forwards ease-out`;
                
                // Add to container
                container.appendChild(particle);
                
                // Remove after animation completes
                setTimeout(() => {
                    particle.remove();
                    styleSheet.remove();
                }, duration * 1000);
            }
        }
        
        // Create enhanced particles around an element
        function createEnhancedParticles(element, count) {
            const rect = element.getBoundingClientRect();
            
            for (let i = 0; i < count; i++) {
                // Random position around the element
                const angle = Math.random() * Math.PI * 2;
                const distance = 10;
                const x = rect.left + rect.width/2 + Math.cos(angle) * distance;
                const y = rect.top + rect.height/2 + Math.sin(angle) * distance;
                
                createEnhancedParticlesAtPoint(x, y, 1);
            }
        }
        
        console.log("Enhanced playful nav links initialized");
    }
}); 