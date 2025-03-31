document.addEventListener('DOMContentLoaded', function() {
    // Initialize all promo page effects
    initPriceHighlight();
    initHoverEffects();
    initScrollReveal();
    initCtaPulse();
    initFloatingElements();
    initValuePriceGlow();
    initTypingEffect();
    initParallaxBackground();
});

// Create pulsing highlight effect for pricing elements
function initPriceHighlight() {
    const priceElements = document.querySelectorAll('.price-tag, .discount-badge');
    
    priceElements.forEach(element => {
        // Add a subtle pulse animation
        setInterval(() => {
            element.classList.add('pulse-highlight');
            
            setTimeout(() => {
                element.classList.remove('pulse-highlight');
            }, 700);
        }, 3000);
    });
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulsate {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(255,255,255,0); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.3); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(255,255,255,0); }
        }
        
        .pulse-highlight {
            animation: pulsate 0.7s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Add interactive hover effects to promo cards
function initHoverEffects() {
    const promoCards = document.querySelectorAll('.promo-card, .feature-card');
    
    promoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Reveal elements as user scrolls down the page
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-section, .testimonial, .faq-item');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-section, .testimonial, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Check on scroll and initial page load
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Add attention-grabbing pulse to call-to-action buttons
function initCtaPulse() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .cta-button');
    
    ctaButtons.forEach(button => {
        // Create a pulse effect overlay
        const pulseOverlay = document.createElement('span');
        pulseOverlay.classList.add('pulse-overlay');
        
        button.style.position = 'relative';
        button.appendChild(pulseOverlay);
        
        // Start pulsing after a delay
        setTimeout(() => {
            setInterval(() => {
                pulseOverlay.classList.add('pulse-active');
                
                setTimeout(() => {
                    pulseOverlay.classList.remove('pulse-active');
                }, 1500);
            }, 5000);
        }, 2000);
    });
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .pulse-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: inherit;
            pointer-events: none;
        }
        
        .pulse-active {
            animation: button-pulse 1.5s ease-out;
        }
        
        @keyframes button-pulse {
            0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
            70% { box-shadow: 0 0 0 15px rgba(255,255,255,0); }
            100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
    `;
    document.head.appendChild(style);
}

// Add subtle floating animation to key elements
function initFloatingElements() {
    const elements = document.querySelectorAll('.promo-badge, .feature-icon, .price-plus');
    
    elements.forEach(element => {
        // Random initial position
        const randomDelay = Math.random() * 2;
        element.style.animation = `floating 3s ease-in-out ${randomDelay}s infinite`;
    });
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
    `;
    document.head.appendChild(style);
}

// Add glowing effect to the price display
function initValuePriceGlow() {
    const priceAmount = document.querySelector('.price-amount');
    if (!priceAmount) return;
    
    // Create glow element
    const glowEffect = document.createElement('div');
    glowEffect.classList.add('price-glow');
    
    // Insert glow before price amount
    priceAmount.parentNode.insertBefore(glowEffect, priceAmount);
    
    // Add animation
    setInterval(() => {
        glowEffect.classList.add('glow-active');
        
        setTimeout(() => {
            glowEffect.classList.remove('glow-active');
        }, 2000);
    }, 5000);
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .value-price {
            position: relative;
        }
        
        .price-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(245, 158, 11, 0) 70%);
            z-index: -1;
            opacity: 0.3;
            transition: all 2s ease;
        }
        
        .glow-active {
            width: 180px;
            height: 180px;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
}

// Add typing effect to headings
function initTypingEffect() {
    const heading = document.querySelector('.promo-header h1');
    if (!heading) return;
    
    const originalText = heading.textContent;
    heading.textContent = '';
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    cursor.textContent = '|';
    heading.appendChild(cursor);
    
    // Add typing animation
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            const textNode = document.createTextNode(originalText.charAt(i));
            heading.insertBefore(textNode, cursor);
            i++;
        } else {
            clearInterval(typeInterval);
            
            // Remove cursor after typing is complete
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 1500);
        }
    }, 100);
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .typing-cursor {
            animation: blink 1s step-end infinite;
            font-weight: 100;
            color: #f59e0b;
        }
        
        @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Add parallax background effect
function initParallaxBackground() {
    const promoContainer = document.querySelector('.promo-container');
    if (!promoContainer) return;
    
    // Create parallax elements
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('parallax-particle');
        
        // Random positioning and size
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(245, 158, 11, 0.1);
            border-radius: 50%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        promoContainer.appendChild(particle);
    }
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .promo-container {
            position: relative;
            overflow: hidden;
        }
        
        @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-30px) translateX(15px); }
            50% { transform: translateY(-60px) translateX(0); }
            75% { transform: translateY(-30px) translateX(-15px); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
    document.head.appendChild(style);
}
