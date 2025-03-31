// Advanced Water Drip Effect with Rain
document.addEventListener('DOMContentLoaded', function() {
    console.log("Water effect script loaded");
    
    // Initialize the effect immediately
    init();
    
    // Initialize the effect
    function init() {
        console.log("Initializing water effect");
        
        // Clear any existing elements first
        const existingElements = document.querySelectorAll('.night-sky, .star, .moon, .spaceship, .planet, .milky-way, .rain-drop, .rain-splash, .rain-ripple');
        existingElements.forEach(el => el.remove());
        
        // Create night sky first (background)
        createNightSky();
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'water-canvas';
        document.body.appendChild(canvas);
        
        // Add CSS for water and rain effects
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
            
            /* Night sky background */
            .night-sky {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to bottom, #0a0e21, #191e3b);
                z-index: -1;
                pointer-events: none;
            }
            
            /* Star styles */
            .star {
                position: absolute;
                background-color: #ffffff;
                border-radius: 50%;
                z-index: 0;
                pointer-events: none;
                animation: twinkle 4s infinite ease-in-out;
            }
            
            @keyframes twinkle {
                0% { opacity: 0.2; }
                50% { opacity: 1; }
                100% { opacity: 0.2; }
            }
            
            @keyframes twinkleBright {
                0% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.3); background-color: #fff; }
                100% { opacity: 0.4; transform: scale(1); }
            }
            
            /* Shooting star styles */
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
            
            /* Moon styles */
            .moon {
                position: absolute; /* Changed from fixed to absolute */
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: radial-gradient(circle at 25% 25%, #ffffff 0%, #f4f4f4 50%, #e0e0e0 100%);
                box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.4);
                z-index: 1;
                pointer-events: none;
            }
            
            /* Rain drop styles */
            .rain-drop {
                position: absolute;
                background: linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.1),
                    rgba(255, 255, 255, 0.8)
                );
                width: 2px;
                height: 20px;
                opacity: 0.7;
                pointer-events: none;
                z-index: 2;
            }
            
            /* Rain splash styles */
            .rain-splash {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.8) 0%,
                    rgba(255, 255, 255, 0) 70%
                );
                opacity: 0.7;
                pointer-events: none;
                z-index: 3;
                animation: splash 0.5s linear forwards;
            }
            
            @keyframes splash {
                0% { transform: scale(0.1); opacity: 0.7; }
                100% { transform: scale(1.5); opacity: 0; }
            }
            
            /* Spaceship styles */
            .spaceship {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 50% 50% 0 0;
                z-index: 3;
                pointer-events: none;
                box-shadow: 0 0 2px 1px rgba(120, 200, 255, 0.6);
            }
            
            .spaceship::before {
                content: '';
                position: absolute;
                bottom: -1px;
                width: 100%;
                height: 1px;
                background: linear-gradient(to right, transparent, rgba(0, 255, 255, 0.8), transparent);
            }
            
            .spaceship.moving-right {
                animation: flyRight linear forwards;
            }
            
            .spaceship.moving-left {
                animation: flyLeft linear forwards;
            }
            
            @keyframes flyRight {
                from { transform: translateX(0); }
                to { transform: translateX(calc(100vw + 50px)); }
            }
            
            @keyframes flyLeft {
                from { transform: translateX(0); }
                to { transform: translateX(calc(-100vw - 50px)); }
            }
            
            /* Milky Way styles */
            .milky-way {
                position: absolute;
                background: linear-gradient(90deg, 
                    rgba(255, 255, 255, 0.005), 
                    rgba(255, 255, 255, 0.02) 20%, 
                    rgba(200, 220, 255, 0.06) 50%, 
                    rgba(255, 255, 255, 0.02) 80%, 
                    rgba(255, 255, 255, 0.005));
                border-radius: 100px;
                z-index: 1;
                pointer-events: none;
                opacity: 0.6; // Reduced from 0.8
                overflow: hidden;
                box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1); // Reduced glow
            }
            
            .star-cluster {
                position: absolute;
                background: radial-gradient(
                    circle, 
                    rgba(255, 255, 255, 0.7) 2%, 
                    rgba(255, 255, 255, 0.3) 15%, 
                    rgba(255, 255, 255, 0.1) 40%, 
                    transparent 70%
                );
                border-radius: 50%;
                opacity: 0.6; // Reduced from 0.8
                filter: blur(1px);
            }
            
            .nebula {
                position: absolute;
                border-radius: 50%;
                filter: blur(15px);
                opacity: 0.4; // Reduced from 0.6
                mix-blend-mode: screen;
            }
            
            .galaxy-core {
                position: absolute;
                background: radial-gradient(
                    ellipse, 
                    rgba(255, 255, 255, 0.5) 5%, 
                    rgba(255, 240, 220, 0.3) 20%, 
                    rgba(255, 220, 180, 0.15) 40%, 
                    transparent 70%
                );
                border-radius: 50%;
                filter: blur(5px);
                opacity: 0.6; // Reduced from 0.8
                box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.15); // Reduced glow
            }
            
            .dust-lane {
                position: absolute;
                background: linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(0, 0, 0, 0.2) 30%,
                    rgba(0, 0, 0, 0.3) 50%,
                    rgba(0, 0, 0, 0.2) 70%,
                    transparent 100%
                );
                transform: rotate(-5deg);
                filter: blur(3px);
            }
            
            /* Planet styles */
            .planet {
                position: absolute;
                border-radius: 50%;
                z-index: 2;
                pointer-events: none;
                box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.3);
            }
            
            .planet[data-name="saturn"] {
                position: relative;
                box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.4);
            }
            
            .planet-ring {
                position: absolute;
                width: 200%;
                height: 30%;
                left: -50%;
                top: 35%;
                border-radius: 50%;
                border: 1px solid rgba(255, 215, 0, 0.6);
                transform: rotate(-20deg);
                box-shadow: 0 0 2px rgba(255, 215, 0, 0.3);
            }
            
            /* Aurora Borealis */
            .aurora {
                position: absolute;
                width: 100%;
                z-index: 1;
                pointer-events: none;
                overflow: hidden;
            }
            
            .aurora-wave {
                position: absolute;
                width: 200%;
                height: 100%;
                background: linear-gradient(90deg, 
                    transparent 0%,
                    rgba(120, 200, 255, 0.1) 15%,
                    rgba(80, 200, 170, 0.2) 25%,
                    rgba(100, 150, 255, 0.1) 35%,
                    transparent 50%,
                    rgba(120, 180, 255, 0.1) 65%,
                    rgba(80, 220, 170, 0.2) 75%,
                    rgba(100, 180, 255, 0.1) 85%,
                    transparent 100%
                );
                filter: blur(20px);
                transform-origin: center bottom;
                animation: auroraWave 20s infinite alternate ease-in-out;
                left: -50%;
            }
            
            @keyframes auroraWave {
                0% { transform: translateX(-10%) scaleX(1.1); }
                50% { transform: translateX(10%) scaleX(0.9); }
                100% { transform: translateX(-10%) scaleX(1.1); }
            }
            
            /* City Lights */
            .city-lights {
                position: absolute;
                z-index: 1;
                pointer-events: none;
            }
            
            .city-light {
                position: absolute;
                width: 1px;
                background-color: rgba(255, 240, 180, 0.6);
                bottom: 0;
                animation: cityLightFlicker 5s infinite;
            }
            
            @keyframes cityLightFlicker {
                0% { opacity: 0.6; }
                25% { opacity: 0.8; }
                30% { opacity: 0.6; }
                70% { opacity: 0.8; }
                75% { opacity: 0.6; }
                100% { opacity: 0.7; }
            }
            
            /* Meteor Shower */
            .meteor {
                position: absolute;
                width: 150px;
                height: 1px;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.8) 50%, 
                    transparent
                );
                animation: meteorFall 3s linear forwards;
                z-index: 3;
            }
            
            @keyframes meteorFall {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                100% { transform: translateY(120vh) translateX(100vw); opacity: 0; }
            }
            
            /* Constellations */
            .constellation {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                pointer-events: none;
            }
            
            .constellation-star {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.4);
            }
            
            .constellation-line {
                position: absolute;
                height: 1px;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.2), 
                    transparent
                );
                transform-origin: left center;
                opacity: 0.3;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .aurora-wave {
                    opacity: 0.5;
                }
                
                .constellation-line {
                    opacity: 0.2;
                }
            }
            
            /* Light theme adjustments */
            body.light-theme .aurora-wave {
                opacity: 0.3;
            }
            
            body.light-theme .constellation-line {
                opacity: 0.1;
            }
            
            body.light-theme .city-light {
                opacity: 0.3;
            }
        `;
        document.head.appendChild(style);
        
        // Global variables
        let isRaining = false;
        let rainIntensity = 0.5;
        
        // Add rain toggle button
        const rainButton = document.createElement('button');
        rainButton.textContent = 'Toggle Rain';
        rainButton.style.position = 'fixed';
        rainButton.style.bottom = '10px';
        rainButton.style.right = '10px';
        rainButton.style.zIndex = '1000';
        rainButton.style.padding = '5px 10px';
        rainButton.style.background = 'rgba(0, 0, 0, 0.5)';
        rainButton.style.color = 'white';
        rainButton.style.border = 'none';
        rainButton.style.borderRadius = '4px';
        rainButton.style.cursor = 'pointer';
        
        rainButton.addEventListener('click', function() {
            isRaining = !isRaining;
            console.log("Rain toggled:", isRaining);
            if (isRaining) {
                startRain();
            }
        });
        document.body.appendChild(rainButton);
        
        // Start with rain enabled
        isRaining = true;
        startRain();
        
        // Create rain drops
        function createRaindrop() {
            if (!isRaining) return;
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = -20; // Start above viewport
            
            // Create raindrop element
            const raindrop = document.createElement('div');
            raindrop.className = 'rain-drop';
            
            // Random size
            const size = 1 + Math.random() * 2;
            const length = 15 + Math.random() * 15;
            raindrop.style.width = `${size}px`;
            raindrop.style.height = `${length}px`;
            
            // Position
            raindrop.style.left = `${x}px`;
            raindrop.style.top = `${y}px`;
            
            // Add to DOM
            document.body.appendChild(raindrop);
            
            // Animate falling
            const duration = 0.5 + Math.random() * 0.5;
            raindrop.style.transition = `top ${duration}s linear`;
            
            // Start animation after a small delay
            setTimeout(() => {
                raindrop.style.top = `${window.innerHeight + 20}px`;
            }, 10);
            
            // Create splash and remove drop
            setTimeout(() => {
                createSplash(x, window.innerHeight - 10, size);
                raindrop.remove();
            }, duration * 1000);
        }
        
        // Create splash effect
        function createSplash(x, y, size) {
            const splash = document.createElement('div');
            splash.className = 'rain-splash';
            splash.style.left = `${x - 5}px`;
            splash.style.top = `${y - 5}px`;
            
            // Add to DOM
            document.body.appendChild(splash);
            
            // Remove after animation
            setTimeout(() => {
                splash.remove();
            }, 500);
        }
        
        // Start rain effect
        function startRain() {
            if (!isRaining) return;
            
            console.log("Starting rain");
            
            // Create multiple raindrops
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createRaindrop();
                }, i * 100);
            }
            
            // Continue rain
            setTimeout(startRain, 1000);
        }
        
        console.log("Water effect initialized");
    }
}); 

// Create night sky with stars, moon, spaceships, planets, and Milky Way
function createNightSky() {
    console.log("Creating night sky");
    
    // Create night sky background
    const nightSky = document.createElement('div');
    nightSky.className = 'night-sky';
    document.body.appendChild(nightSky);
    
    // Create Milky Way
    createMilkyWay();
    
    // Create aurora borealis
    createAurora();
    
    // Create stars
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        createStar();
    }
    
    // Create constellations
    createConstellations();
    
    // Create planets
    createPlanets();
    
    // Create moon
    createMoon();
    
    // Create city lights on horizon
    createCityLights();
    
    // Add shooting stars periodically
    createShootingStar();
    setInterval(createShootingStar, 3000);
    
    // Start meteor showers
    setTimeout(createMeteorShower, 10000 + Math.random() * 30000);
    
    // Add spaceships periodically
    createSpaceship();
    setInterval(createSpaceship, 8000);
    
    // Add lightning effect
    initLightningEffect();
    
    console.log("Night sky created");
}

// Create a star
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.7;
    
    // Random size
    const size = 1 + Math.random() * 3;
    
    // Random twinkle delay
    const delay = Math.random() * 4;
    
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;
    star.style.zIndex = '1';
    
    // Add enhanced twinkling for some stars
    if (Math.random() > 0.7) {
        star.style.animation = 'twinkleBright 3s infinite ease-in-out';
        star.style.boxShadow = '0 0 3px 1px rgba(255, 255, 255, 0.8)';
    }
    
    // Add to DOM
    document.body.appendChild(star);
}

// Create moon
function createMoon() {
    const moon = document.createElement('div');
    moon.className = 'moon';
    
    // Position in top right quadrant
    const x = window.innerWidth * 0.7 + Math.random() * (window.innerWidth * 0.2);
    const y = window.innerHeight * 0.2 + Math.random() * (window.innerHeight * 0.1);
    
    moon.style.left = `${x}px`;
    moon.style.top = `${y}px`;
    moon.style.zIndex = '2'; // Changed from -1 to positive value
    
    // Add to DOM
    document.body.appendChild(moon);
    
    console.log("Moon created at", x, y);
}

// Create a shooting star
function createShootingStar() {
    // Find the container to add the shooting star to
    const container = document.querySelector('.promo-container') || document.querySelector('.hero') || document.body;
    
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
    
    // Add to container instead of body
    container.appendChild(shootingStar);
    
    // Remove after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, 1000);
    
    console.log("Shooting star created at", startX, startY);
}

// Create a spaceship
function createSpaceship() {
    const spaceship = document.createElement('div');
    spaceship.className = 'spaceship';
    
    // Random position (start from either left or right edge)
    const startFromLeft = Math.random() > 0.5;
    const y = Math.random() * (window.innerHeight * 0.5);
    
    // Set initial position
    if (startFromLeft) {
        spaceship.style.left = '-30px';
        spaceship.style.right = 'auto';
        spaceship.classList.add('moving-right');
    } else {
        spaceship.style.right = '-30px';
        spaceship.style.left = 'auto';
        spaceship.classList.add('moving-left');
    }
    spaceship.style.top = `${y}px`;
    
    // Random size (small to maintain "distance" effect)
    const size = 3 + Math.random() * 5;
    spaceship.style.width = `${size}px`;
    spaceship.style.height = `${size/3}px`;
    
    // Random speed
    const duration = 15 + Math.random() * 20;
    spaceship.style.animationDuration = `${duration}s`;
    
    // Add to DOM
    document.body.appendChild(spaceship);
    
    // Remove after animation completes
    setTimeout(() => {
        spaceship.remove();
    }, duration * 1000);
}

// Create planets
function createPlanets() {
    // Define planet types
    const planetTypes = [
        { color: '#ff9966', size: 8, name: 'mars' },
        { color: '#e6e6fa', size: 10, name: 'venus' },
        { color: '#f0e68c', size: 12, name: 'saturn' },
        { color: '#add8e6', size: 15, name: 'neptune' },
        { color: '#ffd700', size: 9, name: 'mercury' },
        { color: '#8b4513', size: 7, name: 'pluto' },
        { color: '#f5deb3', size: 14, name: 'jupiter' },
        { color: '#7cfc00', size: 11, name: 'uranus' }
    ];
    
    // Create 4-6 random planets
    const planetCount = 4 + Math.floor(Math.random() * 3);
    
    // Track used positions to avoid overlap
    const usedPositions = [];
    
    for (let i = 0; i < planetCount; i++) {
        // Select random planet type
        const planetType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
        
        // Create planet element
        const planet = document.createElement('div');
        planet.className = 'planet';
        planet.dataset.name = planetType.name;
        
        // Random position (avoid center where moon might be)
        let x, y, validPosition = false;
        
        // Try to find a position that doesn't overlap with existing planets
        while (!validPosition) {
            if (Math.random() > 0.5) {
                // Left side
                x = window.innerWidth * 0.05 + Math.random() * (window.innerWidth * 0.3);
            } else {
                // Right side
                x = window.innerWidth * 0.65 + Math.random() * (window.innerWidth * 0.3);
            }
            y = window.innerHeight * 0.05 + Math.random() * (window.innerHeight * 0.4);
            
            // Check if position is far enough from other planets
            validPosition = true;
            for (const pos of usedPositions) {
                const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                if (distance < 30) {  // Minimum distance between planets
                    validPosition = false;
                    break;
                }
            }
        }
        
        // Remember this position
        usedPositions.push({ x, y });
        
        // Apply styles
        planet.style.left = `${x}px`;
        planet.style.top = `${y}px`;
        planet.style.width = `${planetType.size}px`;
        planet.style.height = `${planetType.size}px`;
        planet.style.backgroundColor = planetType.color;
        
        // Add special styling for Saturn and Jupiter
        if (planetType.name === 'saturn') {
            const ring = document.createElement('div');
            ring.className = 'planet-ring';
            planet.appendChild(ring);
        } else if (planetType.name === 'jupiter') {
            planet.style.backgroundImage = 'linear-gradient(90deg, #f5deb3 60%, #d2b48c 60%, #d2b48c 65%, #f5deb3 65%)';
        }
        
        // Add to DOM
        document.body.appendChild(planet);
    }
}

// Create Milky Way with reduced brightness
function createMilkyWay() {
    // Create main Milky Way band
    const milkyWay = document.createElement('div');
    milkyWay.className = 'milky-way';
    
    // Position diagonally across the sky with increased width
    milkyWay.style.width = `${Math.max(window.innerWidth, window.innerHeight) * 2}px`;
    milkyWay.style.height = '180px'; // Slightly reduced height
    milkyWay.style.transform = 'rotate(30deg)';
    milkyWay.style.left = `-${window.innerWidth * 0.3}px`;
    milkyWay.style.top = `${window.innerHeight * 0.2}px`;
    
    document.body.appendChild(milkyWay);
    
    // Add star clusters to the Milky Way (reduced number and brightness)
    for (let i = 0; i < 40; i++) {
        const cluster = document.createElement('div');
        cluster.className = 'star-cluster';
        
        // Random position within the Milky Way
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size with moderate variation
        const size = 3 + Math.random() * 15; // Reduced size
        
        cluster.style.left = `${x}%`;
        cluster.style.top = `${y}%`;
        cluster.style.width = `${size}px`;
        cluster.style.height = `${size}px`;
        
        milkyWay.appendChild(cluster);
    }
    
    // Add subtle nebula-like clouds (reduced opacity)
    for (let i = 0; i < 6; i++) { // Reduced number
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        
        // Random position
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;
        
        // Random size (reduced)
        const width = 40 + Math.random() * 100;
        const height = 20 + Math.random() * 60;
        
        // Random rotation
        const rotation = Math.random() * 360;
        
        // Random color (more subtle blues and purples)
        const hue = 200 + Math.random() * 60; // More blue range
        const color = `hsla(${hue}, 60%, 50%, 0.08)`; // Reduced opacity
        
        nebula.style.left = `${x}%`;
        nebula.style.top = `${y}%`;
        nebula.style.width = `${width}px`;
        nebula.style.height = `${height}px`;
        nebula.style.transform = `rotate(${rotation}deg)`;
        nebula.style.backgroundColor = color;
        
        milkyWay.appendChild(nebula);
    }
    
    // Add more subtle core
    const core = document.createElement('div');
    core.className = 'galaxy-core';
    
    // Position near the center
    core.style.left = '40%';
    core.style.top = '30%';
    core.style.width = '100px'; // Reduced size
    core.style.height = '60px'; // Reduced size
    
    milkyWay.appendChild(core);
    
    // Add subtle dust lanes
    for (let i = 0; i < 2; i++) { // Reduced number
        const dustLane = document.createElement('div');
        dustLane.className = 'dust-lane';
        
        // Position across the Milky Way
        dustLane.style.left = '0';
        dustLane.style.top = `${35 + i * 20}%`;
        dustLane.style.width = '100%';
        dustLane.style.height = '8px'; // Reduced height
        dustLane.style.opacity = 0.2 + (Math.random() * 0.1); // Reduced opacity
        
        milkyWay.appendChild(dustLane);
    }
}

// Initialize lightning effect
function initLightningEffect() {
    // Add CSS for lightning
    const style = document.createElement('style');
    style.textContent += `
        .lightning-flash {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.3);
            z-index: 0;
            pointer-events: none;
            opacity: 0;
        }
        
        .lightning-bolt {
            position: absolute;
            background: linear-gradient(to bottom, 
                rgba(255, 255, 255, 0.8), 
                rgba(200, 220, 255, 0.8));
            z-index: 1;
            pointer-events: none;
            transform-origin: top;
            filter: drop-shadow(0 0 10px rgba(200, 220, 255, 0.8));
        }
    `;
    document.head.appendChild(style);
    
    // Create lightning container
    const lightningContainer = document.createElement('div');
    lightningContainer.className = 'lightning-container';
    document.body.appendChild(lightningContainer);
    
    // Create flash element
    const flash = document.createElement('div');
    flash.className = 'lightning-flash';
    lightningContainer.appendChild(flash);
    
    // Set up lightning parameters
    window.lightningParams = {
        stormInterval: [8000, 15000], // Time between lightning strikes
        flashDuration: [50, 150],     // Duration of flash
        boltCount: [1, 3],            // Number of bolts per strike
        branchChance: 0.5,            // Chance of branching
        elementInteractionChance: 0.3  // Chance of interacting with page elements
    };
    
    // Start lightning storm
    scheduleLightning();
    
    // Schedule next lightning
    function scheduleLightning() {
        const delay = randomBetween(
            window.lightningParams.stormInterval[0], 
            window.lightningParams.stormInterval[1]
        );
        
        setTimeout(() => {
            createLightning();
            scheduleLightning();
        }, delay);
    }
    
    // Create lightning effect
    function createLightning() {
        // Flash effect
        flash.style.opacity = '1';
        
        // Random flash duration
        const flashDuration = randomBetween(
            window.lightningParams.flashDuration[0],
            window.lightningParams.flashDuration[1]
        );
        
        // Create bolts
        const boltCount = randomBetween(
            window.lightningParams.boltCount[0],
            window.lightningParams.boltCount[1]
        );
        
        for (let i = 0; i < boltCount; i++) {
            setTimeout(() => {
                createLightningBolt();
            }, i * 100);
        }
        
        // Fade out flash
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transition = 'opacity 0.3s ease-out';
        }, flashDuration);
    }
    
    // Create a lightning bolt
    function createLightningBolt() {
        const bolt = document.createElement('div');
        bolt.className = 'lightning-bolt';
        
        // Random position
        const startX = Math.random() * window.innerWidth;
        const startY = -10; // Start above viewport
        
        // Random width and height
        const width = 2 + Math.random() * 3;
        const height = 100 + Math.random() * 300;
        
        // Set bolt properties
        bolt.style.width = `${width}px`;
        bolt.style.height = `${height}px`;
        bolt.style.left = `${startX}px`;
        bolt.style.top = `${startY}px`;
        
        // Random angle
        const angle = -5 + Math.random() * 10;
        bolt.style.transform = `rotate(${angle}deg)`;
        
        // Add to container
        lightningContainer.appendChild(bolt);
        
        // Create branches
        if (Math.random() < window.lightningParams.branchChance) {
            createBranch(bolt, startX, startY, height);
        }
        
        // Remove after animation
        setTimeout(() => {
            bolt.remove();
        }, 200);
    }
    
    // Create a branch from main bolt
    function createBranch(parentBolt, startX, startY, parentHeight) {
        const branch = document.createElement('div');
        branch.className = 'lightning-bolt';
        
        // Branch position (somewhere along parent bolt)
        const branchPoint = Math.random() * 0.6 + 0.2; // 20-80% down the parent
        const branchY = startY + (parentHeight * branchPoint);
        
        // Branch properties
        const width = 1 + Math.random() * 2;
        const height = 50 + Math.random() * 100;
        
        // Random direction (left or right)
        const direction = Math.random() > 0.5 ? 1 : -1;
        const angle = direction * (20 + Math.random() * 30);
        
        // Set branch properties
        branch.style.width = `${width}px`;
        branch.style.height = `${height}px`;
        branch.style.left = `${startX}px`;
        branch.style.top = `${branchY}px`;
        branch.style.transform = `rotate(${angle}deg)`;
        
        // Add to container
        lightningContainer.appendChild(branch);
        
        // Remove after animation
        setTimeout(() => {
            branch.remove();
        }, 150);
    }
    
    // Helper function for random number between min and max
    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

// Create subtle aurora borealis effect
function createAurora() {
    const aurora = document.createElement('div');
    aurora.className = 'aurora';
    
    // Position at the top of the screen
    aurora.style.width = '100%';
    aurora.style.height = '30vh';
    aurora.style.top = '0';
    aurora.style.left = '0';
    
    document.body.appendChild(aurora);
    
    // Create aurora waves
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'aurora-wave';
        
        // Different animation delay for each wave
        wave.style.animationDelay = `${i * 2}s`;
        wave.style.opacity = 0.4 - (i * 0.1);
        wave.style.top = `${i * 10}%`;
        
        aurora.appendChild(wave);
    }
}

// Create distant city lights on the horizon
function createCityLights() {
    const cityLights = document.createElement('div');
    cityLights.className = 'city-lights';
    
    // Position at the bottom of the screen
    cityLights.style.width = '100%';
    cityLights.style.height = '5px'; // Increased from 3px
    cityLights.style.bottom = '0';
    cityLights.style.left = '0';
    
    document.body.appendChild(cityLights);
    
    // Create individual lights - increased density
    const lightCount = Math.floor(window.innerWidth / 10); // Increased density
    for (let i = 0; i < lightCount; i++) {
        const light = document.createElement('div');
        light.className = 'city-light';
        
        // Random position along the horizon
        const x = (i / lightCount) * 100 + (Math.random() * 0.5);
        const height = 1 + Math.random() * 4; // Increased max height
        
        light.style.left = `${x}%`;
        light.style.height = `${height}px`;
        light.style.width = `${Math.random() < 0.3 ? 2 : 1}px`; // Some lights are wider
        light.style.opacity = `${0.5 + Math.random() * 0.5}`; // Varied opacity
        light.style.animationDuration = `${3 + Math.random() * 5}s`;
        light.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add different color tints to some lights
        if (Math.random() < 0.3) {
            light.style.backgroundColor = 'rgba(255, 220, 180, 0.7)'; // Warm light
        } else if (Math.random() < 0.2) {
            light.style.backgroundColor = 'rgba(200, 240, 255, 0.7)'; // Cool light
        }
        
        cityLights.appendChild(light);
    }
    
    // Add city silhouette
    createCitySilhouette();
}

// Add a silhouette of buildings to enhance city appearance
function createCitySilhouette() {
    const silhouette = document.createElement('div');
    silhouette.className = 'city-silhouette';
    
    // Get the website's background color for better integration
    const isDarkTheme = !document.body.classList.contains('light-theme');
    const baseColor = isDarkTheme ? '#0a0e21' : '#f8fafc'; // Match website theme colors
    
    // Add CSS for silhouette
    const style = document.createElement('style');
    style.textContent = `
        .city-silhouette {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40px;
            background: linear-gradient(to top, 
                rgba(0, 0, 0, 0.9) 0%, 
                rgba(0, 0, 0, 0.7) 60%, 
                rgba(0, 0, 0, 0) 100%);
            z-index: 1;
            overflow: hidden;
        }
        
        .building {
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.95);
            z-index: 2;
            border-radius: 1px 1px 0 0;
        }
        
        body.light-theme .city-silhouette {
            background: linear-gradient(to top, 
                rgba(20, 30, 50, 0.8) 0%, 
                rgba(20, 30, 50, 0.5) 60%, 
                rgba(20, 30, 50, 0) 100%);
        }
        
        body.light-theme .building {
            background-color: rgba(20, 30, 50, 0.9);
        }
        
        .window {
            position: absolute;
            background-color: rgba(255, 240, 180, 0.6);
            width: 2px;
            height: 2px;
            animation: windowFlicker 8s infinite;
        }
        
        @keyframes windowFlicker {
            0%, 100% { opacity: 0.6; }
            3% { opacity: 0.2; }
            6% { opacity: 0.6; }
            92% { opacity: 0.6; }
            94% { opacity: 0.2; }
            96% { opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(silhouette);
    
    // Create buildings
    const buildingCount = Math.floor(window.innerWidth / 40);
    for (let i = 0; i < buildingCount; i++) {
        const building = document.createElement('div');
        building.className = 'building';
        
        const width = 20 + Math.random() * 60;
        const height = 5 + Math.random() * 25;
        const left = (i / buildingCount) * 100;
        
        building.style.width = `${width}px`;
        building.style.height = `${height}px`;
        building.style.left = `${left}%`;
        
        // Add a slight opacity variation for depth
        building.style.opacity = (0.8 + Math.random() * 0.2).toString();
        
        // Add windows to buildings
        const windowCount = Math.floor(width / 4) * Math.floor(height / 3);
        for (let j = 0; j < windowCount; j++) {
            if (Math.random() < 0.4) { // Only some windows are lit
                const windowEl = document.createElement('div');
                windowEl.className = 'window';
                
                const windowX = Math.random() * (width - 2);
                const windowY = Math.random() * (height - 2);
                
                windowEl.style.left = `${windowX}px`;
                windowEl.style.bottom = `${windowY}px`;
                windowEl.style.animationDelay = `${Math.random() * 8}s`;
                
                building.appendChild(windowEl);
            }
        }
        
        silhouette.appendChild(building);
    }
}

// Create occasional meteor shower
function createMeteorShower() {
    // Only create meteor shower occasionally
    if (Math.random() > 0.7) return;
    
    console.log("Creating meteor shower");
    
    const meteorCount = 5 + Math.floor(Math.random() * 10);
    const duration = 15000; // 15 seconds
    
    // Create meteor shower container
    const meteorShower = document.createElement('div');
    meteorShower.className = 'meteor-shower';
    document.body.appendChild(meteorShower);
    
    // Create meteors with staggered timing
    for (let i = 0; i < meteorCount; i++) {
        setTimeout(() => {
            if (!document.body.contains(meteorShower)) return;
            
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            
            // Random position and angle
            const x = Math.random() * 100;
            const angle = 15 + Math.random() * 30;
            const speed = 1 + Math.random() * 2;
            
            meteor.style.left = `${x}%`;
            meteor.style.top = '-5%';
            meteor.style.transform = `rotate(${angle}deg)`;
            meteor.style.animationDuration = `${speed}s`;
            
            meteorShower.appendChild(meteor);
            
            // Remove meteor after animation
            setTimeout(() => {
                if (meteor && meteor.parentNode) {
                    meteor.remove();
                }
            }, speed * 1000);
            
        }, i * (duration / meteorCount));
    }
    
    // Remove meteor shower after duration
    setTimeout(() => {
        if (meteorShower && meteorShower.parentNode) {
            meteorShower.remove();
        }
    }, duration);
    
    // Schedule next meteor shower
    setTimeout(createMeteorShower, duration + 30000 + Math.random() * 60000);
}

// Create constellation patterns
function createConstellations() {
    const constellations = [
        {
            name: 'big-dipper',
            stars: [
                {x: 10, y: 20}, {x: 15, y: 22}, {x: 20, y: 25}, 
                {x: 25, y: 28}, {x: 30, y: 25}, {x: 35, y: 20}, {x: 40, y: 15}
            ]
        },
        {
            name: 'orion',
            stars: [
                {x: 60, y: 30}, {x: 63, y: 35}, {x: 65, y: 40}, 
                {x: 62, y: 45}, {x: 58, y: 45}, {x: 55, y: 40}, {x: 57, y: 35}
            ]
        }
    ];
    
    constellations.forEach(constellation => {
        const container = document.createElement('div');
        container.className = `constellation ${constellation.name}`;
        document.body.appendChild(container);
        
        // Create stars
        constellation.stars.forEach((pos, index) => {
            const star = document.createElement('div');
            star.className = 'constellation-star';
            
            // Position star
            star.style.left = `${pos.x}%`;
            star.style.top = `${pos.y}%`;
            
            // Vary size slightly
            const size = 2 + (index % 3);
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            container.appendChild(star);
            
            // Connect stars with lines (except last star)
            if (index < constellation.stars.length - 1) {
                const nextPos = constellation.stars[index + 1];
                const line = document.createElement('div');
                line.className = 'constellation-line';
                
                // Calculate line position and rotation
                const dx = nextPos.x - pos.x;
                const dy = nextPos.y - pos.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                line.style.left = `${pos.x}%`;
                line.style.top = `${pos.y}%`;
                line.style.width = `${length}%`;
                line.style.transform = `rotate(${angle}deg)`;
                
                container.appendChild(line);
            }
        });
    });
}
