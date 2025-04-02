// Create night sky with stars, moon, spaceships, planets, and without Milky Way
function createNightSky() {
    console.log("Creating night sky");
    
    // Create night sky background first
    const nightSky = document.createElement('div');
    nightSky.className = 'night-sky';
    document.body.appendChild(nightSky);
    
    // Add enhanced star styles
    addEnhancedStarStyles();
    
    // Add airplane styles
    addAirplaneStyles();
    
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
    
    // Create city elements first (before water)
    createCityLights();
    createCitySilhouette();
    
    // Add city styles
    addCityStyles();
    
    // Create water area after city elements
    createWaterReflections();
    
    // Create boats in the water (middle layer)
    createBoats();
    
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
}

// Add city styles
function addCityStyles() {
    const cityStyles = document.createElement('style');
    cityStyles.textContent = `
        .night-sky {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #0a1525 0%, #1c3b5a 100%);
            z-index: -1;
            overflow: hidden;
        }
        
        .star {
            position: absolute;
            background-color: #fff;
            border-radius: 50%;
            animation: twinkle 5s infinite ease-in-out;
        }
        
        .moon {
            position: absolute;
            background-color: #fffce8;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(255, 252, 232, 0.6);
        }
        
        .star-cluster {
            position: absolute;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.2) 0%, 
                rgba(255, 255, 255, 0) 70%);
            border-radius: 50%;
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
        
        .building {
            transition: opacity 0.5s;
        }
        
        .building:hover {
            opacity: 0.9 !important;
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
        
        .shooting-star {
            position: absolute;
            width: 100px;
            height: 1px;
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
            animation: shootingStar 1s linear;
        }
        
        @keyframes shootingStar {
            0% { transform: translateX(0) translateY(0); opacity: 1; }
            100% { transform: translateX(200px) translateY(200px); opacity: 0; }
        }
    `;
    
    document.head.appendChild(cityStyles);
}

// Add moving traffic to make the city feel alive
function addTraffic() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            const traffic = document.createElement('div');
            traffic.className = 'traffic ' + (Math.random() < 0.5 ? 'right' : 'left');
            
            // Random position
            traffic.style.left = Math.random() < 0.5 ? '0' : '100%';
            traffic.style.width = `${2 + Math.random() * 4}px`;
            traffic.style.opacity = `${0.6 + Math.random() * 0.4}`;
            
            // Much slower animation duration (30-60s instead of 15-30s)
            traffic.style.animationDuration = `${30 + Math.random() * 30}s`;
            
            document.body.appendChild(traffic);
            
            // Remove after animation completes (increased to match longer duration)
            setTimeout(() => {
                if (traffic && traffic.parentNode) {
                    traffic.remove();
                }
            }, 60000);
        }
    }, 500);
}

// Update the CSS animation styles for traffic
function updateTrafficStyles() {
    // Find existing style element or create a new one
    let styleEl = document.getElementById('traffic-styles');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'traffic-styles';
        document.head.appendChild(styleEl);
    }
    
    // Update with much slower animations
    styleEl.textContent = `
        .traffic {
            position: absolute;
            height: 2px;
            background-color: rgba(255, 255, 255, 0.7);
            bottom: 2px;
            z-index: 3;
        }
        
        .traffic.right {
            animation: trafficRight linear forwards;
            animation-duration: inherit;
        }
        
        .traffic.left {
            animation: trafficLeft linear forwards;
            animation-duration: inherit;
        }
        
        @keyframes trafficRight {
            from { left: 0; }
            to { left: 100%; }
        }
        
        @keyframes trafficLeft {
            from { left: 100%; }
            to { left: 0; }
        }
    `;
}

// Create a star in the night sky
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 60; // Keep stars in upper portion
    
    // Random size
    const size = 1 + Math.random() * 2;
    
    // Random twinkle animation duration
    const duration = 2 + Math.random() * 5;
    
    // Random delay for twinkling to avoid synchronization
    const delay = Math.random() * 5;
    
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;
    
    // Add to DOM
    document.body.appendChild(star);
}

// Add enhanced twinkling styles
function addEnhancedStarStyles() {
    const starStyles = document.createElement('style');
    starStyles.id = 'enhanced-star-styles';
    starStyles.textContent = `
        .star {
            position: absolute;
            background-color: #fff;
            border-radius: 50%;
            animation: twinkle 3s ease-in-out infinite;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
        }
        
        @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); filter: brightness(1.5); }
            100% { opacity: 0.2; transform: scale(0.8); }
        }
    `;
    
    document.head.appendChild(starStyles);
}

// Create moon
function createMoon() {
    const moon = document.createElement('div');
    moon.className = 'moon';
    
    // Make moon smaller and higher to appear more distant
    const size = Math.random() * 30 + 40; // Reduced size
    const posX = Math.random() * 70 + 15; // Keep horizontal position similar
    const posY = Math.random() * 10 + 5;  // Position higher in the sky
    
    moon.style.width = `${size}px`;
    moon.style.height = `${size}px`;
    moon.style.top = `${posY}%`;
    moon.style.left = `${posX}%`;
    
    document.body.appendChild(moon);
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

// Create distant city lights on the horizon - enhanced for realism
function createCityLights() {
    const cityLights = document.createElement('div');
    cityLights.className = 'city-lights';
    
    // Position at the bottom of the screen
    cityLights.style.width = '100%';
    cityLights.style.height = '8px'; // Increased height for more detail
    cityLights.style.bottom = '0';
    cityLights.style.left = '0';
    cityLights.style.position = 'absolute';
    cityLights.style.zIndex = '2';
    
    document.body.appendChild(cityLights);
    
    // Create individual lights - increased density and variety
    const lightCount = Math.floor(window.innerWidth / 8); // Higher density
    for (let i = 0; i < lightCount; i++) {
        const light = document.createElement('div');
        light.className = 'city-light';
        
        // Random position along the horizon
        const x = (i / lightCount) * 100 + (Math.random() * 0.8 - 0.4);
        
        // More varied heights for skyline effect
        const height = 1 + Math.random() * 6; 
        
        light.style.left = `${x}%`;
        light.style.height = `${height}px`;
        
        // More varied widths
        light.style.width = `${Math.random() < 0.2 ? 2 : Math.random() < 0.1 ? 3 : 1}px`;
        
        // Varied opacity and colors
        light.style.opacity = `${0.5 + Math.random() * 0.5}`;
        
        // Randomize animation timing
        light.style.animationDuration = `${3 + Math.random() * 7}s`;
        light.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add different color tints to lights
        const colorRoll = Math.random();
        if (colorRoll < 0.5) {
            light.style.backgroundColor = 'rgba(255, 240, 180, 0.7)'; // Warm yellow
        } else if (colorRoll < 0.7) {
            light.style.backgroundColor = 'rgba(255, 220, 180, 0.7)'; // Warm orange
        } else if (colorRoll < 0.85) {
            light.style.backgroundColor = 'rgba(200, 240, 255, 0.7)'; // Cool blue
        } else {
            light.style.backgroundColor = 'rgba(255, 200, 200, 0.7)'; // Reddish
        }
        
        cityLights.appendChild(light);
    }
}

// Add a more detailed silhouette of buildings
function createCitySilhouette() {
    const silhouette = document.createElement('div');
    silhouette.className = 'city-silhouette';
    silhouette.style.position = 'absolute';
    silhouette.style.bottom = '0';
    silhouette.style.left = '0';
    silhouette.style.width = '100%';
    silhouette.style.height = '40px';
    silhouette.style.overflow = 'hidden';
    silhouette.style.zIndex = '2';
    
    document.body.appendChild(silhouette);
    
    // Create buildings with more variety and realism
    const buildingCount = Math.floor(window.innerWidth / 15); // More buildings for a denser skyline
    
    // Add city animation styles
    const cityAnimationStyles = document.createElement('style');
    cityAnimationStyles.textContent = `
        .building-window {
            animation: windowFlicker 4s infinite;
            animation-delay: var(--delay);
        }
        
        @keyframes windowFlicker {
            0%, 100% { opacity: var(--base-opacity); }
            3% { opacity: 0.3; }
            6% { opacity: var(--base-opacity); }
            7% { opacity: 0.3; }
            9% { opacity: var(--base-opacity); }
            94% { opacity: var(--base-opacity); }
            96% { opacity: 0.3; }
            98% { opacity: var(--base-opacity); }
        }
        
        .traffic {
            position: absolute;
            height: 2px;
            background-color: rgba(255, 255, 255, 0.7);
            bottom: 2px;
            z-index: 3;
        }
        
        .traffic.right {
            animation: trafficRight 15s linear forwards;
        }
        
        .traffic.left {
            animation: trafficLeft 15s linear forwards;
        }
        
        @keyframes trafficRight {
            from { left: 0; }
            to { left: 100%; }
        }
        
        @keyframes trafficLeft {
            from { left: 100%; }
            to { left: 0; }
        }
        
        .helicopter {
            position: absolute;
            width: 6px;
            height: 2px;
            background-color: rgba(255, 0, 0, 0.5);
            z-index: 3;
            animation: helicopterFly 30s linear forwards;
        }
        
        .helicopter::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            top: -4px;
            left: 1px;
            animation: helicopterLight 1s infinite;
        }
        
        @keyframes helicopterFly {
            0% { left: -10px; top: 20%; }
            100% { left: 110%; top: 40%; }
        }
        
        @keyframes helicopterLight {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(cityAnimationStyles);
    
    for (let i = 0; i < buildingCount; i++) {
        const building = document.createElement('div');
        building.className = 'building';
        
        // More varied width and height for realism
        const width = 8 + Math.random() * 35;
        const height = 5 + Math.random() * 35;
        const left = (i / buildingCount) * 100 + (Math.random() * 0.8 - 0.4);
        
        building.style.position = 'absolute';
        building.style.width = `${width}px`;
        building.style.height = `${height}px`;
        building.style.left = `${left}%`;
        building.style.bottom = '0';
        
        // More realistic building colors
        const buildingColor = Math.random() < 0.7 ? 
            `rgba(${5 + Math.random() * 15}, ${10 + Math.random() * 20}, ${20 + Math.random() * 30}, 0.9)` : 
            `rgba(${20 + Math.random() * 30}, ${20 + Math.random() * 30}, ${30 + Math.random() * 40}, 0.9)`;
        building.style.backgroundColor = buildingColor;
        
        // Add windows to buildings
        if (height > 10 && width > 10) {
            const windowRows = Math.floor(height / 5);
            const windowCols = Math.floor(width / 5);
            
            for (let row = 0; row < windowRows; row++) {
                for (let col = 0; col < windowCols; col++) {
                    if (Math.random() < 0.7) { // Some windows are lit
                        const windowEl = document.createElement('div');
                        windowEl.className = 'building-window';
                        windowEl.style.position = 'absolute';
                        windowEl.style.width = `${1 + Math.random() * 2}px`;
                        windowEl.style.height = `${1 + Math.random() * 2}px`;
                        windowEl.style.bottom = `${row * 5 + 1 + Math.random()}px`;
                        windowEl.style.left = `${col * 5 + 1 + Math.random()}px`;
                        
                        // Random window colors for variety
                        const windowColor = getWindowColor();
                        windowEl.style.backgroundColor = windowColor;
                        
                        // Add flickering effect to some windows
                        if (Math.random() < 0.3) {
                            const baseOpacity = 0.5 + Math.random() * 0.5;
                            const delay = Math.random() * 10;
                            windowEl.style.setProperty('--base-opacity', baseOpacity);
                            windowEl.style.setProperty('--delay', `${delay}s`);
                        }
                        
                        building.appendChild(windowEl);
                    }
                }
            }
        }
        
        silhouette.appendChild(building);
    }
    
    // Update traffic styles for slower movement
    updateTrafficStyles();
    
    // Add traffic with slower speeds
    addTraffic();
    
    // Add occasional helicopter
    addHelicopter();
    setInterval(addHelicopter, 45000 + Math.random() * 30000);
}

// Get random window color
function getWindowColor() {
    const colorRoll = Math.random();
    if (colorRoll < 0.6) {
        return `rgba(255, 240, 180, ${0.5 + Math.random() * 0.5})`; // Warm yellow
    } else if (colorRoll < 0.8) {
        return `rgba(200, 240, 255, ${0.5 + Math.random() * 0.5})`; // Cool blue
    } else if (colorRoll < 0.9) {
        return `rgba(255, 200, 200, ${0.5 + Math.random() * 0.5})`; // Reddish
    } else {
        return `rgba(200, 255, 200, ${0.5 + Math.random() * 0.5})`; // Greenish
    }
}

// Add moving traffic to make the city feel alive
function addTraffic() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            const traffic = document.createElement('div');
            traffic.className = 'traffic ' + (Math.random() < 0.5 ? 'right' : 'left');
            
            // Random position
            traffic.style.left = Math.random() < 0.5 ? '0' : '100%';
            traffic.style.width = `${2 + Math.random() * 4}px`;
            traffic.style.opacity = `${0.6 + Math.random() * 0.4}`;
            traffic.style.animationDuration = `${5 + Math.random() * 10}s`;
            
            document.body.appendChild(traffic);
            
            // Remove after animation completes
            setTimeout(() => {
                if (traffic && traffic.parentNode) {
                    traffic.remove();
                }
            }, 15000);
        }
    }, 500);
}

// Add helicopter flying across the sky
function addHelicopter() {
    if (Math.random() < 0.7) {
        const helicopter = document.createElement('div');
        helicopter.className = 'helicopter';
        
        // Random starting position
        helicopter.style.animationDuration = `${20 + Math.random() * 20}s`;
        
        document.body.appendChild(helicopter);
        
        // Remove after animation completes
        setTimeout(() => {
            if (helicopter && helicopter.parentNode) {
                helicopter.remove();
            }
        }, 40000);
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

// Create water reflection effect for city lights
function createWaterReflections() {
    // Add water reflection styles
    const reflectionStyles = document.createElement('style');
    reflectionStyles.textContent = `
        .water-area {
            position: absolute;
            bottom: -15px; /* Position below the buildings */
            left: 0;
            width: 100%;
            height: 15px;
            background: linear-gradient(
                to bottom,
                rgba(10, 20, 40, 0.6),
                rgba(5, 10, 30, 0.8)
            );
            overflow: hidden;
            z-index: 0; /* Lower z-index to be behind buildings */
        }
        
        .city-reflection {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 8px;
            background-image: linear-gradient(
                to bottom,
                rgba(255, 240, 180, 0.1),
                rgba(255, 240, 180, 0)
            );
            opacity: 0.4;
            filter: blur(1px);
            transform: scaleY(-1);
            animation: waterWave 8s infinite ease-in-out;
        }
        
        .water-ripple {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(
                circle,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0) 70%
            );
            transform: scale(0);
            animation: rippleEffect 4s linear forwards;
            pointer-events: none;
        }
        
        @keyframes waterWave {
            0%, 100% { transform: scaleY(-1) scaleX(1.01); }
            50% { transform: scaleY(-1) scaleX(0.99); }
        }
        
        @keyframes rippleEffect {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(6); opacity: 0; }
        }
    `;
    document.head.appendChild(reflectionStyles);
    
    // Create water area as a sibling to city silhouette, not a child
    const citySilhouette = document.querySelector('.city-silhouette');
    if (!citySilhouette) {
        console.error("City silhouette not found, creating water area in body instead");
        createWaterAreaInBody();
        return;
    }
    
    // Create water area as a sibling element, positioned below the city
    const waterArea = document.createElement('div');
    waterArea.className = 'water-area';
    
    // Insert water area after the city silhouette
    if (citySilhouette.parentNode) {
        citySilhouette.parentNode.insertBefore(waterArea, citySilhouette.nextSibling);
    } else {
        document.body.appendChild(waterArea);
    }
    
    // Create city reflection
    const cityReflection = document.createElement('div');
    cityReflection.className = 'city-reflection';
    waterArea.appendChild(cityReflection);
    
    // Add random ripples to water
    setInterval(() => {
        if (Math.random() < 0.3) {
            createWaterRipple();
        }
    }, 2000);
    
    function createWaterAreaInBody() {
        const waterArea = document.createElement('div');
        waterArea.className = 'water-area';
        document.body.appendChild(waterArea);
        
        const cityReflection = document.createElement('div');
        cityReflection.className = 'city-reflection';
        waterArea.appendChild(cityReflection);
    }
}

// Create a ripple in the water
function createWaterRipple() {
    const waterArea = document.querySelector('.water-area');
    if (!waterArea) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'water-ripple';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size
    const size = 5 + Math.random() * 10;
    
    ripple.style.left = `${x}%`;
    ripple.style.top = `${y}%`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    
    waterArea.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 4000);
}

// Create boats with lights moving in the water
function createBoats() {
    console.log("Creating boats in the water");
    
    // Add boat styles
    const boatStyles = document.createElement('style');
    boatStyles.textContent = `
        .boat {
            position: absolute;
            bottom: 5px; /* Position boats in the water */
            height: 3px;
            background-color: rgba(40, 40, 40, 0.8);
            border-radius: 1px;
            z-index: 2; /* Between water and city */
            transform-origin: center bottom;
            animation: boatRock 3s ease-in-out infinite;
        }
        
        .boat-light {
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: rgba(255, 220, 150, 0.9);
            border-radius: 50%;
            top: -2px;
            filter: blur(1px);
            box-shadow: 0 0 2px rgba(255, 220, 150, 0.8);
            animation: lightFlicker 2s infinite;
        }
        
        .boat-reflection {
            position: absolute;
            background-color: rgba(255, 220, 150, 0.2);
            border-radius: 50%;
            filter: blur(1px);
            transform: scaleY(0.3);
            animation: reflectionWaver 2s infinite;
        }
        
        @keyframes boatRock {
            0%, 100% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
        }
        
        @keyframes lightFlicker {
            0%, 100% { opacity: 0.9; }
            50% { opacity: 0.7; }
        }
        
        @keyframes reflectionWaver {
            0%, 100% { opacity: 0.3; transform: scaleY(0.3); }
            50% { opacity: 0.5; transform: scaleY(0.4); }
        }
        
        @keyframes boatMove {
            0% { transform: translateX(0) rotate(-1deg); }
            25% { transform: translateX(calc(var(--travel-distance) * 0.25)) rotate(1deg); }
            50% { transform: translateX(calc(var(--travel-distance) * 0.5)) rotate(-1deg); }
            75% { transform: translateX(calc(var(--travel-distance) * 0.75)) rotate(1deg); }
            100% { transform: translateX(var(--travel-distance)) rotate(-1deg); }
        }
    `;
    document.head.appendChild(boatStyles);
    
    // Create initial boats
    const initialBoats = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < initialBoats; i++) {
        createBoat();
    }
    
    // Add new boats periodically
    setInterval(createBoat, 15000);
}

// Create a single boat with lights
function createBoat() {
    const boat = document.createElement('div');
    boat.className = 'boat';
    
    // Random size (small to maintain "distance" effect)
    const size = 4 + Math.random() * 8;
    boat.style.width = `${size}px`;
    
    // Random starting position
    const startFromRight = Math.random() < 0.5;
    const startPos = startFromRight ? window.innerWidth + 10 : -size - 10;
    boat.style.left = `${startPos}px`;
    
    // Set travel distance and direction
    const travelDistance = startFromRight ? -(window.innerWidth + size + 20) : (window.innerWidth + size + 20);
    boat.style.setProperty('--travel-distance', `${travelDistance}px`);
    
    // Random speed
    const duration = 60 + Math.random() * 120;
    
    // Add boat lights (1-3 lights depending on boat size)
    const lightCount = Math.max(1, Math.floor(size / 4));
    for (let i = 0; i < lightCount; i++) {
        const light = document.createElement('div');
        light.className = 'boat-light';
        
        // Position light along the boat
        const lightPos = (i / (lightCount - 1 || 1)) * (size - 2);
        light.style.left = `${lightPos}px`;
        
        // Random flicker timing
        light.style.animationDuration = `${1 + Math.random()}s`;
        light.style.animationDelay = `${Math.random()}s`;
        
        boat.appendChild(light);
        
        // Add light reflection in water
        const reflection = document.createElement('div');
        reflection.className = 'boat-reflection';
        reflection.style.width = `${2 + Math.random()}px`;
        reflection.style.height = `${3 + Math.random() * 2}px`;
        reflection.style.left = `${lightPos}px`;
        reflection.style.top = `${3}px`;
        reflection.style.animationDuration = `${1 + Math.random()}s`;
        reflection.style.animationDelay = `${Math.random()}s`;
        
        boat.appendChild(reflection);
    }
    
    // Add to DOM
    document.body.appendChild(boat);
    
    // Animate boat movement
    boat.style.animation = `boatMove ${duration}s linear forwards`;
    
    // Remove after animation completes
    setTimeout(() => {
        if (boat && boat.parentNode) {
            boat.remove();
        }
    }, duration * 1000);
}

// Create realistic airplanes flying across the sky
function createAirplane() {
    const airplane = document.createElement('div');
    airplane.className = 'airplane';
    
    // Random direction (left to right or right to left)
    const direction = Math.random() < 0.5 ? 'right' : 'left';
    airplane.classList.add(direction);
    
    // Random altitude (higher than city, lower than stars)
    const altitude = 20 + Math.random() * 30;
    
    // Random size (smaller = appears further away)
    const size = 3 + Math.random() * 2;
    
    // Set initial position
    airplane.style.top = `${altitude}%`;
    airplane.style.left = direction === 'right' ? '-100px' : '100%';
    
    // Create airplane silhouette (single element for more realistic shape)
    const silhouette = document.createElement('div');
    silhouette.className = 'airplane-silhouette';
    silhouette.style.width = `${size * 10}px`;
    silhouette.style.height = `${size * 2}px`;
    
    // Add red navigation light (left wing)
    const redNavLight = document.createElement('div');
    redNavLight.className = 'airplane-nav-light';
    redNavLight.style.width = `${size/3}px`;
    redNavLight.style.height = `${size/3}px`;
    
    // Add green navigation light (right wing)
    const greenNavLight = document.createElement('div');
    greenNavLight.className = 'airplane-nav-light right';
    greenNavLight.style.width = `${size/3}px`;
    greenNavLight.style.height = `${size/3}px`;
    
    // Add blinking strobe
    const strobe = document.createElement('div');
    strobe.className = 'airplane-strobe';
    strobe.style.width = `${size/4}px`;
    strobe.style.height = `${size/4}px`;
    
    // Assemble airplane
    airplane.appendChild(silhouette);
    airplane.appendChild(redNavLight);
    airplane.appendChild(greenNavLight);
    airplane.appendChild(strobe);
    
    // Add to DOM
    document.body.appendChild(airplane);
    
    // Calculate flight duration based on screen width (60-90 seconds)
    const duration = 60 + Math.random() * 30;
    
    // Animate flight
    airplane.style.animation = `flight-${direction} ${duration}s linear forwards`;
    
    // Remove after animation completes
    setTimeout(() => {
        if (airplane && airplane.parentNode) {
            airplane.remove();
        }
    }, duration * 1000);
}

// Add realistic airplane styles
function addAirplaneStyles() {
    const airplaneStyles = document.createElement('style');
    airplaneStyles.id = 'airplane-styles';
    airplaneStyles.textContent = `
        .airplane {
            position: absolute;
            z-index: 3;
        }
        
        .airplane-silhouette {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 50% 50% 0 0;
            transform: scaleY(0.3);
        }
        
        /* Right-flying plane (default) */
        .airplane.right .airplane-silhouette {
            border-radius: 50% 50% 0 0;
        }
        
        /* Left-flying plane needs to be flipped */
        .airplane.left .airplane-silhouette {
            transform: scaleY(0.3) scaleX(-1);
            border-radius: 50% 50% 0 0;
        }
        
        .airplane-nav-light {
            position: absolute;
            background-color: rgba(255, 0, 0, 0.7);
            border-radius: 50%;
            top: 0;
            left: 0;
            box-shadow: 0 0 3px rgba(255, 0, 0, 0.5);
        }
        
        .airplane-nav-light.right {
            background-color: rgba(0, 255, 0, 0.7);
            left: auto;
            right: 0;
            box-shadow: 0 0 3px rgba(0, 255, 0, 0.5);
        }
        
        /* Ensure lights are positioned correctly when plane is flipped */
        .airplane.left .airplane-nav-light {
            left: auto;
            right: 0;
        }
        
        .airplane.left .airplane-nav-light.right {
            right: auto;
            left: 0;
        }
        
        .airplane-strobe {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            top: 0;
            left: 50%;
            animation: strobe-blink 1s infinite;
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
        }
        
        @keyframes strobe-blink {
            0%, 30%, 100% { opacity: 0; }
            5%, 10% { opacity: 1; }
        }
        
        @keyframes flight-right {
            from { left: -100px; }
            to { left: calc(100% + 100px); }
        }
        
        @keyframes flight-left {
            from { left: 100%; }
            to { left: -100px; }
        }
    `;
    
    document.head.appendChild(airplaneStyles);
}

// Initialize the night sky effect when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createNightSky();
});
