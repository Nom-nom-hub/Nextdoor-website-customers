// Smoke trail cursor effect
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    
    // Add to DOM
    document.body.appendChild(cursor);
    
    // Track mouse movement and create smoke particles
    let mouseX = 0;
    let mouseY = 0;
    let particles = [];
    
    document.addEventListener('mousemove', function(e) {
        // Update mouse position
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Main cursor follows immediately
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Create new smoke particle
        createSmokeParticle(mouseX, mouseY);
    });
    
    // Create smoke particle
    function createSmokeParticle(x, y) {
        // Only create particle every few movements to avoid too many particles
        if (Math.random() > 0.3) return;
        
        const particle = document.createElement('div');
        particle.classList.add('smoke-particle');
        
        // Random size
        const size = 5 + Math.random() * 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position at cursor
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random opacity
        particle.style.opacity = 0.3 + Math.random() * 0.5;
        
        // Random drift direction
        const driftX = -1 + Math.random() * 2;
        const driftY = -1 + Math.random() * 2;
        particle.dataset.driftX = driftX;
        particle.dataset.driftY = driftY;
        
        // Add to DOM
        document.body.appendChild(particle);
        
        // Add to particles array
        particles.push(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
            particles = particles.filter(p => p !== particle);
        }, 1000);
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            // Get current position
            const x = parseFloat(particle.style.left);
            const y = parseFloat(particle.style.top);
            
            // Get drift values
            const driftX = parseFloat(particle.dataset.driftX);
            const driftY = parseFloat(particle.dataset.driftY) - 0.5; // Slight upward bias
            
            // Update position with drift
            particle.style.left = `${x + driftX}px`;
            particle.style.top = `${y + driftY}px`;
            
            // Fade out
            const currentOpacity = parseFloat(particle.style.opacity);
            particle.style.opacity = currentOpacity * 0.95;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Start animation loop
    animateParticles();
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"], input[type="submit"], .clickable');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
});
