document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    initCountdown();
    
    // Initialize rain effect on discount option
    initRainEffect();
    
    // Initialize sun effect on value option
    initSunEffect();
    
    // Initialize theme-based animations
    initThemeAnimations();
    
    // Initialize spotlight effect
    initSpotlightEffect();
});

// Countdown timer function
function initCountdown() {
    const countdownEl = document.querySelector('.countdown');
    if (!countdownEl) return;
    
    const endDate = new Date(countdownEl.dataset.end);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            document.querySelector('.days').textContent = '00';
            document.querySelector('.hours').textContent = '00';
            document.querySelector('.minutes').textContent = '00';
            document.querySelector('.seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Rain effect for discount option
function initRainEffect() {
    const discountOption = document.querySelector('.discount-option');
    if (!discountOption) return;
    
    // Create raindrops
    for (let i = 0; i < 20; i++) {
        createRaindrop(discountOption);
    }
    
    // Create occasional ripples
    setInterval(() => {
        if (Math.random() < 0.3) {
            createRipple(discountOption);
        }
    }, 2000);
}

function createRaindrop(container) {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    
    // Random position and animation duration
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 1 + Math.random() * 2;
    
    raindrop.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: -20px;
        width: 1px;
        height: 15px;
        background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.5));
        animation: rain ${duration}s linear ${delay}s infinite;
        opacity: 0.7;
        z-index: -1;
    `;
    
    container.appendChild(raindrop);
}

function createRipple(container) {
    const ripple = document.createElement('div');
    ripple.classList.add('rain-ripple');
    
    // Random position
    const left = 20 + Math.random() * 60;
    const top = 20 + Math.random() * 60;
    const size = 20 + Math.random() * 30;
    
    ripple.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        animation: rainRipple 2s ease-out forwards;
    `;
    
    container.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 2000);
}

// Sun effect for value option
function initSunEffect() {
    const valueOption = document.querySelector('.value-option');
    if (!valueOption) return;
    
    // Create sun rays
    const rays = document.createElement('div');
    rays.classList.add('sun-rays');
    rays.style.cssText = `
        position: absolute;
        top: -50px;
        right: -50px;
        width: 150px;
        height: 150px;
        background: transparent;
        z-index: -1;
        animation: sunPulse 5s ease-in-out infinite;
    `;
    
    valueOption.appendChild(rays);
    
    // Create light particles
    for (let i = 0; i < 10; i++) {
        createLightParticle(valueOption);
    }
}

function createLightParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('light-particle');
    
    // Random position and animation
    const left = 50 + Math.random() * 40;
    const top = 10 + Math.random() * 30;
    const size = 3 + Math.random() * 5;
    const duration = 5 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        right: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(245, 158, 11, 0.6);
        border-radius: 50%;
        filter: blur(1px);
        opacity: 0;
        z-index: -1;
        animation: lightParticle ${duration}s ease-in-out ${delay}s infinite;
    `;
    
    container.appendChild(particle);
}

// Theme-based animations
function initThemeAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rain {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 0.7; }
            100% { transform: translateY(500px); opacity: 0; }
        }
        
        @keyframes rainRipple {
            0% { transform: scale(0); opacity: 0.7; border: 1px solid rgba(99, 102, 241, 0.5); }
            100% { transform: scale(4); opacity: 0; border: 1px solid rgba(99, 102, 241, 0); }
        }
        
        @keyframes sunPulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
        }
        
        @keyframes lightParticle {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.2; }
            100% { transform: translate(-100px, 100px) scale(0); opacity: 0; }
        }
        
        .rain-ripple {
            position: absolute;
            border-radius: 50%;
            border: 1px solid rgba(99, 102, 241, 0.5);
            z-index: -1;
        }
        
        .discount-option {
            background-image: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        .value-option {
            background-image: linear-gradient(135deg, #1a1207 0%, #422006 100%);
        }
        
        /* Force dark backgrounds even in light theme */
        body.light-theme .discount-option {
            background-image: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f1f5f9;
        }
        
        body.light-theme .value-option {
            background-image: linear-gradient(135deg, #1a1207 0%, #422006 100%);
            color: #f1f5f9;
        }
        
        /* Enhanced glow effects for dark theme */
        .discount-option .btn-primary {
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
        }
        
        .value-option .btn-secondary {
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
        }
    `;
    
    document.head.appendChild(style);
}

// Add spotlight effect to promo options
function initSpotlightEffect() {
    const promoOptions = document.querySelectorAll('.discount-option, .value-option');
    if (!promoOptions.length) return;
    
    promoOptions.forEach(option => {
        // Create spotlight element
        const spotlight = document.createElement('div');
        spotlight.classList.add('spotlight-effect');
        spotlight.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%);
            opacity: 0;
            z-index: 0;
            pointer-events: none;
            transition: opacity 0.5s ease;
        `;
        
        option.style.position = 'relative';
        option.appendChild(spotlight);
        
        // Add animation
        setInterval(() => {
            spotlight.style.opacity = '0.7';
            setTimeout(() => {
                spotlight.style.opacity = '0';
            }, 1500);
        }, 5000);
    });
}
