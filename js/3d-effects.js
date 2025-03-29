// 3D Effects and Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
    // 3D Parallax Hero Effect
    initParallaxHero();
    
    // Animated Skill Bars
    initAnimatedSkillBars();
    
    // Interactive Portfolio Grid
    initInteractivePortfolio();
    
    // 3D Parallax Hero Effect
    function initParallaxHero() {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (!hero || !heroContent || !heroImage) return;
        
        // Add 3D perspective to hero section
        hero.style.perspective = '1000px';
        heroContent.style.transform = 'translateZ(50px)';
        heroImage.style.transform = 'translateZ(100px)';
        
        // Add parallax effect on mouse move
        hero.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            heroContent.style.transform = `translateZ(50px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
            heroImage.style.transform = `translateZ(100px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateX(${x * 15}px) translateY(${y * 15}px)`;
        });
        
        // Reset on mouse leave
        hero.addEventListener('mouseleave', function() {
            heroContent.style.transform = 'translateZ(50px)';
            heroImage.style.transform = 'translateZ(100px)';
        });
        
        // Add CSS for smooth transitions
        const style = document.createElement('style');
        style.textContent = `
            .hero-content, .hero-image {
                transition: transform 0.2s ease-out;
                will-change: transform;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Animated Skill Bars with Gradient and Particles
    function initAnimatedSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        
        if (skillBars.length === 0) return;
        
        // Add gradient and animation to skill bars
        skillBars.forEach(bar => {
            // Add gradient
            bar.style.background = 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))';
            
            // Add particles
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('span');
                particle.className = 'skill-particle';
                bar.appendChild(particle);
                
                // Random position along the bar
                const position = Math.random() * 100;
                particle.style.left = `${position}%`;
                
                // Random animation delay
                const delay = Math.random() * 3;
                particle.style.animationDelay = `${delay}s`;
            }
        });
        
        // Add CSS for skill particles
        const style = document.createElement('style');
        style.textContent = `
            .skill-level {
                position: relative;
                overflow: hidden;
            }
            
            .skill-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                top: 50%;
                transform: translateY(-50%);
                animation: skillParticle 3s ease-in-out infinite;
            }
            
            @keyframes skillParticle {
                0%, 100% {
                    opacity: 0;
                    transform: translateY(-50%) scale(0);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Animate skill bars on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillsSection = entry.target;
                    const bars = skillsSection.querySelectorAll('.skill-level');
                    
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.style.width;
                            bar.style.width = '0';
                            
                            setTimeout(() => {
                                bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.45, 0.1, 1)';
                                bar.style.width = width;
                            }, 100);
                        }, index * 200);
                    });
                    
                    observer.unobserve(skillsSection);
                }
            });
        }, { threshold: 0.5 });
        
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
    
    // Interactive Portfolio Grid with Hover Effects
    function initInteractivePortfolio() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const portfolioGrid = document.querySelector('.portfolio-grid');
        
        if (!portfolioGrid || portfolioItems.length === 0) return;
        
        // Add interactive hover effect
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Dim other items
                portfolioItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.opacity = '0.5';
                        otherItem.style.transform = 'scale(0.95)';
                    }
                });
                
                // Highlight current item
                this.style.opacity = '1';
                this.style.transform = 'scale(1.05)';
                this.style.zIndex = '2';
            });
            
            item.addEventListener('mouseleave', function() {
                // Reset all items
                portfolioItems.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                    otherItem.style.transform = 'scale(1)';
                    otherItem.style.zIndex = '1';
                });
            });
        });
        
        // Add CSS for smooth transitions
        const style = document.createElement('style');
        style.textContent = `
            .portfolio-item {
                transition: opacity 0.3s ease, transform 0.3s ease, z-index 0s 0.3s;
                z-index: 1;
            }
            
            .portfolio-item:hover {
                transition: opacity 0.3s ease, transform 0.3s ease, z-index 0s;
            }
        `;
        document.head.appendChild(style);
        
        // Add interactive filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add active class to clicked button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter items with animation
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        // Show item with animation
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        item.style.display = 'block';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        // Hide item with animation
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}); 