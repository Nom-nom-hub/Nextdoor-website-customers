// Enhanced Hero Text Animation
document.addEventListener('DOMContentLoaded', function() {
    const heroHeading = document.querySelector('.hero-content h1');
    const heroText = document.querySelector('.hero-content p');
    const ctaButtons = document.querySelector('.hero-content .cta-buttons');
    
    // Split heading text into individual characters for advanced animation
    if (heroHeading && heroHeading.textContent.trim() !== '') {
        const text = heroHeading.textContent;
        let html = '';
        
        // Process text by words to prevent breaking words across lines
        const words = text.split(' ');
        
        words.forEach((word, wordIndex) => {
            html += '<span class="word-wrapper">';
            
            // Create spans for each character in the word
            for (let i = 0; i < word.length; i++) {
                html += `<span class="char" style="animation-delay: ${(wordIndex * word.length + i) * 0.05}s">${word[i]}</span>`;
            }
            
            html += '</span> ';
        });
        
        heroHeading.innerHTML = html;
        heroHeading.classList.add('animated');
    }
    
    // Add staggered reveal for paragraph text with word preservation
    if (heroText && heroText.textContent.trim() !== '') {
        const words = heroText.textContent.split(' ');
        let html = '';
        
        words.forEach((word, index) => {
            // Keep words together with non-breaking spans
            html += `<span class="word" style="animation-delay: ${3.5 + index * 0.1}s; display: inline-block;">${word}</span> `;
        });
        
        heroText.innerHTML = html;
        heroText.classList.add('animated');
    }
    
    // Function to handle responsive behavior
    function handleResponsiveAnimation() {
        const isMobile = window.innerWidth < 768;
        const chars = document.querySelectorAll('.hero-content h1 .char');
        const words = document.querySelectorAll('.hero-content p .word');
        
        if (isMobile) {
            // Faster animation on mobile
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 0.03}s`;
            });
            
            words.forEach((word, i) => {
                word.style.animationDelay = `${1.5 + i * 0.05}s`;
            });
            
            if (ctaButtons) {
                ctaButtons.style.animationDelay = '2.5s';
            }
        } else {
            // Normal animation on desktop
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 0.05}s`;
            });
            
            words.forEach((word, i) => {
                word.style.animationDelay = `${3.5 + i * 0.1}s`;
            });
            
            if (ctaButtons) {
                ctaButtons.style.animationDelay = '4.5s';
            }
        }
    }
    
    // Run on load and resize
    handleResponsiveAnimation();
    window.addEventListener('resize', handleResponsiveAnimation);
    
    // Add scroll-based animation reset
    let isAnimated = true;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When hero section enters viewport
            if (entry.isIntersecting && !isAnimated) {
                // Reset character animations
                const chars = document.querySelectorAll('.hero-content h1 .char');
                chars.forEach(char => {
                    char.style.animation = 'none';
                    char.offsetHeight; // Trigger reflow
                    char.style.animation = '';
                });
                
                // Reset word animations
                const words = document.querySelectorAll('.hero-content p .word');
                words.forEach(word => {
                    word.style.animation = 'none';
                    word.offsetHeight; // Trigger reflow
                    word.style.animation = '';
                });
                
                // Reset CTA buttons animation
                if (ctaButtons) {
                    ctaButtons.style.animation = 'none';
                    ctaButtons.offsetHeight; // Trigger reflow
                    ctaButtons.style.animation = '';
                }
                
                isAnimated = true;
                handleResponsiveAnimation();
            } else if (!entry.isIntersecting) {
                isAnimated = false;
            }
        });
    }, { threshold: 0.2 });
    
    // Observe hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        observer.observe(heroSection);
    }
});
