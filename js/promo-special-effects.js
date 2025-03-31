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
    initShootingStars();
    initMoon();
    initStarfield(); // Add twinkling stars
    initGradientBackground(); // Add animated gradient background
    initMouseTrail(); // Add interactive mouse trail
    initPricingSpotlight(); // Add spotlight effect on pricing
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

// Add shooting stars effect to the promo page
function initShootingStars() {
    const promoContainer = document.querySelector('.promo-container');
    if (!promoContainer) return;
    
    // Make sure container has position relative for absolute positioning
    const containerStyle = window.getComputedStyle(promoContainer);
    if (containerStyle.position === 'static') {
        promoContainer.style.position = 'relative';
    }
    
    // Create initial shooting stars
    createShootingStar(promoContainer);
    
    // Create shooting stars periodically
    setInterval(() => createShootingStar(promoContainer), 3000);
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .shooting-star {
            position: absolute;
            width: 100px;
            height: 2px;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
            z-index: 10;
            pointer-events: none;
            animation: shoot 1s linear forwards;
        }
        
        @keyframes shoot {
            0% { 
                transform: translateX(0) translateY(0) rotate(30deg); 
                opacity: 0;
            }
            15% {
                opacity: 1;
            }
            70% {
                opacity: 1;
            }
            100% { 
                transform: translateX(500px) translateY(300px) rotate(30deg); 
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create a shooting star within the container
function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random position (start from left side)
    const startX = Math.random() * (container.offsetWidth * 0.3);
    const startY = Math.random() * (container.offsetHeight * 0.5);
    
    // Random angle (diagonal down-right)
    const angle = 30 + Math.random() * 20;
    
    // Set initial position
    shootingStar.style.left = `${startX}px`;
    shootingStar.style.top = `${startY}px`;
    shootingStar.style.transform = `rotate(${angle}deg)`;
    
    // Add to container
    container.appendChild(shootingStar);
    
    // Remove after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, 1000);
}

// Add moon effect to the promo page
function initMoon() {
    const promoContainer = document.querySelector('.promo-container');
    if (!promoContainer) return;
    
    // Make sure container has position relative for absolute positioning
    const containerStyle = window.getComputedStyle(promoContainer);
    if (containerStyle.position === 'static') {
        promoContainer.style.position = 'relative';
    }
    
    // Create moon
    const moon = document.createElement('div');
    moon.className = 'promo-moon';
    
    // Position in top right quadrant of the container
    const x = promoContainer.offsetWidth * 0.7 + Math.random() * (promoContainer.offsetWidth * 0.2);
    const y = promoContainer.offsetHeight * 0.1 + Math.random() * (promoContainer.offsetHeight * 0.1);
    
    moon.style.left = `${x}px`;
    moon.style.top = `${y}px`;
    
    // Add to container
    promoContainer.appendChild(moon);
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .promo-moon {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle at 25% 25%, #ffffff 0%, #f4f4f4 50%, #e0e0e0 100%);
            box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.4);
            z-index: -1;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    console.log("Promo moon created at", x, y);
}

// Add twinkling stars to the background
function initStarfield() {
    const promoContainer = document.querySelector('.promo-container');
    if (!promoContainer) return;
    
    // Create starfield container
    const starfield = document.createElement('div');
    starfield.className = 'starfield';
    promoContainer.appendChild(starfield);
    
    // Create stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starfield.appendChild(star);
    }
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .starfield {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            pointer-events: none;
        }
        
        .star {
            position: absolute;
            background-color: #ffffff;
            border-radius: 50%;
            z-index: -2;
            pointer-events: none;
            animation: twinkle 4s infinite ease-in-out;
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Add animated gradient background
function initGradientBackground() {
    const promoContainer = document.querySelector('.promo-container');
    if (!promoContainer) return;
    
    // Create gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.className = 'gradient-overlay';
    promoContainer.appendChild(gradientOverlay);
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                rgba(99, 102, 241, 0.1), 
                rgba(14, 165, 233, 0.1),
                rgba(245, 158, 11, 0.1),
                rgba(99, 102, 241, 0.1));
            background-size: 400% 400%;
            z-index: -3;
            pointer-events: none;
            animation: gradientMove 15s ease infinite;
        }
        
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
}

// Add interactive mouse trail effect
function initMouseTrail() {
    const promoContainer = document.querySelector('.promo-container');
    if (!promoContainer) return;
    
    // Create trail container
    const trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail-container';
    promoContainer.appendChild(trailContainer);
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    promoContainer.addEventListener('mousemove', (e) => {
        const rect = promoContainer.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Create trail particle
        createTrailParticle(mouseX, mouseY, trailContainer);
    });
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .mouse-trail-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        }
        
        .trail-particle {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary-color) 0%, rgba(255,255,255,0) 70%);
            pointer-events: none;
            z-index: 5;
            opacity: 0.7;
            transform: translate(-50%, -50%);
            animation: fadeOut 1s forwards;
        }
        
        @keyframes fadeOut {
            0% { opacity: 0.7; width: 8px; height: 8px; }
            100% { opacity: 0; width: 30px; height: 30px; }
        }
    `;
    document.head.appendChild(style);
}

// Create a trail particle at the given position
function createTrailParticle(x, y, container) {
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add spotlight effect on pricing section
function initPricingSpotlight() {
    const pricingSection = document.querySelector('.pricing-section');
    if (!pricingSection) return;
    
    // Create spotlight element
    const spotlight = document.createElement('div');
    spotlight.className = 'pricing-spotlight';
    pricingSection.appendChild(spotlight);
    
    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .pricing-section {
            position: relative;
            overflow: hidden;
        }
        
        .pricing-spotlight {
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0) 70%);
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            animation: spotlightPulse 8s infinite ease-in-out;
        }
        
        @keyframes spotlightPulse {
            0%, 100% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
    
    // Move spotlight between pricing options
    const pricingCards = pricingSection.querySelectorAll('.pricing-card, .price-card');
    if (pricingCards.length > 0) {
        let currentIndex = 0;
        
        setInterval(() => {
            const card = pricingCards[currentIndex];
            const rect = card.getBoundingClientRect();
            const sectionRect = pricingSection.getBoundingClientRect();
            
            spotlight.style.left = `${rect.left - sectionRect.left + rect.width/2}px`;
            spotlight.style.top = `${rect.top - sectionRect.top + rect.height/2}px`;
            
            currentIndex = (currentIndex + 1) % pricingCards.length;
        }, 4000);
    }
}
