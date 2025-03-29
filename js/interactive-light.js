// Interactive Light Effect for Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive light effect
    initInteractiveLight();
    
    function initInteractiveLight() {
        const portfolioSection = document.querySelector('#portfolio');
        if (!portfolioSection) return;
        
        // Create light overlay
        const lightOverlay = document.createElement('div');
        lightOverlay.className = 'interactive-light';
        portfolioSection.appendChild(lightOverlay);
        
        // Add CSS for light effect
        const style = document.createElement('style');
        style.textContent = `
            #portfolio {
                position: relative;
                overflow: hidden;
            }
            
            .interactive-light {
                position: absolute;
                width: 500px;
                height: 500px;
                border-radius: 50%;
                background: radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.15) 0%,
                    rgba(255, 255, 255, 0.05) 40%,
                    transparent 70%
                );
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 2;
                opacity: 0;
                transition: opacity 0.3s ease;
                mix-blend-mode: overlay;
                will-change: transform;
            }
            
            .portfolio-item {
                position: relative;
                z-index: 1;
            }
            
            .portfolio-item::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, 
                    rgba(99, 102, 241, 0.1),
                    rgba(16, 185, 129, 0.1)
                );
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 1;
                pointer-events: none;
            }
            
            .portfolio-item.light-hover::after {
                opacity: 1;
            }
            
            /* Add subtle reflection to portfolio images */
            .portfolio-image img {
                transition: filter 0.3s ease;
            }
            
            .portfolio-item.light-hover .portfolio-image img {
                filter: brightness(1.1) contrast(1.05);
            }
            
            /* Add light particles */
            .light-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 3;
                opacity: 0;
                animation: floatParticle 3s ease-in-out infinite;
            }
            
            @keyframes floatParticle {
                0%, 100% {
                    transform: translateY(0) scale(1);
                    opacity: 0;
                }
                50% {
                    transform: translateY(-20px) scale(0.5);
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Track mouse movement
        portfolioSection.addEventListener('mouseenter', function() {
            lightOverlay.style.opacity = '1';
        });
        
        portfolioSection.addEventListener('mouseleave', function() {
            lightOverlay.style.opacity = '0';
            
            // Remove hover effect from all items
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.classList.remove('light-hover');
            });
        });
        
        portfolioSection.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Move light
            lightOverlay.style.left = `${x}px`;
            lightOverlay.style.top = `${y}px`;
            
            // Check if light is over a portfolio item
            document.querySelectorAll('.portfolio-item').forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const relativeRect = {
                    left: itemRect.left - rect.left,
                    top: itemRect.top - rect.top,
                    right: itemRect.right - rect.left,
                    bottom: itemRect.bottom - rect.top
                };
                
                // Check if light center is over this item
                if (
                    x >= relativeRect.left &&
                    x <= relativeRect.right &&
                    y >= relativeRect.top &&
                    y <= relativeRect.bottom
                ) {
                    item.classList.add('light-hover');
                    
                    // Create light particles on hover
                    if (Math.random() < 0.1) { // Limit particle creation rate
                        createLightParticle(x, y);
                    }
                } else {
                    item.classList.remove('light-hover');
                }
            });
        });
        
        // Create light particles
        function createLightParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'light-particle';
            
            // Random position near cursor
            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;
            
            particle.style.left = `${x + offsetX}px`;
            particle.style.top = `${y + offsetY}px`;
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation duration and delay
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 0.5;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Add to portfolio section
            portfolioSection.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, (duration + delay) * 1000);
        }
        
        // Add interactive 3D tilt effect to portfolio items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                // Calculate tilt angle
                const tiltX = y * 10;
                const tiltY = -x * 10;
                
                // Apply 3D transform
                this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
                
                // Move highlight based on cursor position
                const highlight = this.querySelector('.portfolio-overlay');
                if (highlight) {
                    highlight.style.background = `radial-gradient(
                        circle at ${x * 100 + 50}% ${y * 100 + 50}%,
                        rgba(255, 255, 255, 0.2),
                        rgba(255, 255, 255, 0.1) 40%,
                        transparent 80%
                    )`;
                }
            });
            
            item.addEventListener('mouseleave', function() {
                // Reset transform
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                
                // Reset highlight
                const highlight = this.querySelector('.portfolio-overlay');
                if (highlight) {
                    highlight.style.background = '';
                }
            });
        });
    }
}); 