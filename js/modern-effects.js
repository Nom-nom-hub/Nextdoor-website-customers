// Modern website effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initParallaxEffect();
    initSmoothScrolling();
    
    // Scroll animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.card, .section-header, .hero-content');
        
        // Add animation classes
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-up {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in-up.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        // Add initial class
        animatedElements.forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        // Check if elements are in viewport
        function checkVisibility() {
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top <= windowHeight * 0.85) {
                    el.classList.add('visible');
                }
            });
        }
        
        // Run on scroll and load
        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
    }
    
    // Parallax effect
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero, .section-header');
        
        window.addEventListener('scroll', function() {
            parallaxElements.forEach(el => {
                const scrollPosition = window.pageYOffset;
                const speed = el.dataset.speed || 0.5;
                
                el.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
});