// Advanced JavaScript effects to showcase skills
document.addEventListener('DOMContentLoaded', function() {
    // 3D Floating Elements
    initFloatingElements();
    
    // Magnetic Scroll Sections
    initMagneticScroll();
    
    // Interactive Background Particles
    enhanceParticleBackground();
    
    // Text Splitting Animation
    initTextSplitting();
    
    // WebGL Image Distortion
    initImageDistortion();
    
    // Smooth Page Transitions
    initPageTransitions();
    
    // 3D Floating Elements
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.service-card, .testimonial-content, .contact-info');
        
        floatingElements.forEach(element => {
            // Add floating animation class
            element.classList.add('floating-element');
            
            // Random animation delay
            const delay = Math.random() * 2;
            element.style.animationDelay = `${delay}s`;
        });
        
        // Add CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            .floating-element {
                animation: floating 6s ease-in-out infinite;
                transform-style: preserve-3d;
            }
            
            @keyframes floating {
                0% { transform: translateY(0) rotate3d(0, 1, 0, 0deg); }
                25% { transform: translateY(-10px) rotate3d(0, 1, 0, 2deg); }
                50% { transform: translateY(0) rotate3d(0, 1, 0, 0deg); }
                75% { transform: translateY(10px) rotate3d(0, 1, 0, -2deg); }
                100% { transform: translateY(0) rotate3d(0, 1, 0, 0deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Magnetic Scroll Sections
    function initMagneticScroll() {
        const sections = document.querySelectorAll('section');
        let isScrolling = false;
        let targetSection = null;
        
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    const scrollPosition = window.scrollY + window.innerHeight / 2;
                    
                    // Find the closest section
                    let closestSection = null;
                    let closestDistance = Infinity;
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;
                        const sectionMiddle = sectionTop + sectionHeight / 2;
                        const distance = Math.abs(scrollPosition - sectionMiddle);
                        
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            closestSection = section;
                        }
                    });
                    
                    // If we're close enough to a section and not already scrolling
                    if (closestDistance < 200 && !targetSection) {
                        targetSection = closestSection;
                        isScrolling = true;
                        
                        // Smooth scroll to the section
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Reset after animation
                        setTimeout(() => {
                            isScrolling = false;
                            targetSection = null;
                        }, 1000);
                    }
                });
            }
        });
    }
    
    // Enhanced Particle Background
    function enhanceParticleBackground() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Make particles interactive
        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Affect particles near the mouse
            particlesArray.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 10;
                    
                    particle.vx -= Math.cos(angle) * force;
                    particle.vy -= Math.sin(angle) * force;
                }
            });
        });
        
        // Update particle properties
        const particlesArray = [];
        const numberOfParticles = 150;
        
        // Create particles with velocity
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                vx: Math.random() * 1 - 0.5,
                vy: Math.random() * 1 - 0.5,
                color: `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1})`,
                connected: []
            });
        }
        
        // Enhanced animation loop with connections
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            for (let i = 0; i < particlesArray.length; i++) {
                const particle = particlesArray[i];
                
                // Draw particle
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Update position with velocity
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Add slight acceleration/deceleration for more natural movement
                particle.vx *= 0.99;
                particle.vy *= 0.99;
                
                // Add small random movement
                particle.vx += (Math.random() - 0.5) * 0.1;
                particle.vy += (Math.random() - 0.5) * 0.1;
                
                // Boundary check with bounce
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.vx = -particle.vx;
                }
                
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.vy = -particle.vy;
                }
                
                // Connect nearby particles
                particle.connected = [];
                for (let j = i + 1; j < particlesArray.length; j++) {
                    const otherParticle = particlesArray[j];
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        particle.connected.push(j);
                        
                        // Draw connection
                        ctx.strokeStyle = `rgba(99, 102, 241, ${(100 - distance) / 200})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Text Splitting Animation
    function initTextSplitting() {
        const headings = document.querySelectorAll('.section-header h2, .hero-content h1');
        
        headings.forEach(heading => {
            // Skip if already processed
            if (heading.classList.contains('split-text-processed')) return;
            
            const text = heading.textContent;
            let html = '';
            
            // Split into words and characters
            const words = text.split(' ');
            
            words.forEach((word, wordIndex) => {
                html += '<span class="word">';
                
                for (let i = 0; i < word.length; i++) {
                    html += `<span class="char" style="--char-index: ${i}; --word-index: ${wordIndex}">${word[i]}</span>`;
                }
                
                html += '</span><span class="space"> </span>';
            });
            
            heading.innerHTML = html;
            heading.classList.add('split-text-processed');
            
            // Add animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-text');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(heading);
        });
        
        // Add CSS for text splitting animation
        const style = document.createElement('style');
        style.textContent = `
            .split-text-processed .char {
                display: inline-block;
                opacity: 0;
                transform: translateY(50px) rotate(10deg);
                transition: opacity 0.3s ease, transform 0.3s ease;
                transition-delay: calc(var(--char-index) * 0.05s + var(--word-index) * 0.1s);
            }
            
            .animate-text .char {
                opacity: 1;
                transform: translateY(0) rotate(0);
            }
            
            .word {
                display: inline-block;
            }
            
            .space {
                display: inline-block;
                width: 0.25em;
            }
        `;
        document.head.appendChild(style);
    }
    
    // WebGL Image Distortion (simplified version without actual WebGL)
    function initImageDistortion() {
        const images = document.querySelectorAll('.portfolio-image img, .about-image img');
        
        images.forEach(img => {
            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'distortion-wrapper';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
            
            // Add hover effect
            wrapper.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                img.style.transform = `scale(1.05) perspective(1000px) rotateX(${(y - 0.5) * 10}deg) rotateY(${(x - 0.5) * -10}deg)`;
                img.style.filter = `hue-rotate(${(x * y) * 30}deg) contrast(${100 + x * 10}%)`;
            });
            
            wrapper.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1) perspective(1000px) rotateX(0) rotateY(0)';
                img.style.filter = 'hue-rotate(0) contrast(100%)';
            });
        });
        
        // Add CSS for distortion effect
        const style = document.createElement('style');
        style.textContent = `
            .distortion-wrapper {
                overflow: hidden;
                position: relative;
            }
            
            .distortion-wrapper img {
                transition: transform 0.3s ease, filter 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Smooth Page Transitions
    function initPageTransitions() {
        // Add page transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
        
        // Add CSS for page transitions
        const style = document.createElement('style');
        style.textContent = `
            .page-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--primary-color);
                z-index: 9999;
                transform: translateY(100%);
                pointer-events: none;
            }
            
            .page-transitioning .page-transition-overlay {
                animation: pageTransition 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
            }
            
            @keyframes pageTransition {
                0% { transform: translateY(100%); }
                45%, 55% { transform: translateY(0); }
                100% { transform: translateY(-100%); }
            }
        `;
        document.head.appendChild(style);
        
        // Add transition to internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                // Skip if it's just a toggle or modal
                if (this.classList.contains('toggle') || this.classList.contains('view-project')) {
                    return;
                }
                
                e.preventDefault();
                const target = this.getAttribute('href');
                
                // Trigger transition animation
                document.body.classList.add('page-transitioning');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.hash = target;
                    
                    // Remove class after navigation
                    setTimeout(() => {
                        document.body.classList.remove('page-transitioning');
                    }, 1200);
                }, 600);
            });
        });
    }
}); 