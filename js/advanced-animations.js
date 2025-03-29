// Advanced animations for the website
document.addEventListener('DOMContentLoaded', function() {
    // Text scramble effect for headings
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply text scramble to main heading when in view
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fx = new TextScramble(heroHeading);
                    const originalText = heroHeading.textContent;
                    
                    // First set to empty, then animate to the original text
                    heroHeading.textContent = '';
                    setTimeout(() => {
                        fx.setText(originalText);
                    }, 500);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(heroHeading);
    }
    
    // Parallax effect for sections
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.1;
                const offset = scrollY * speed;
                
                element.style.transform = `translateY(${offset}px)`;
            });
        });
    }
    
    // Add parallax class to elements
    document.querySelectorAll('.hero-image, .about-image').forEach(el => {
        el.classList.add('parallax-element');
        el.setAttribute('data-speed', '-0.1');
    });
    
    // Initialize parallax
    initParallax();
    
    // Magnetic buttons effect
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) * 0.1;
                const moveY = (y - centerY) * 0.1;
                
                this.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // Initialize magnetic buttons
    initMagneticButtons();
    
    // Tilt effect for cards
    function initTiltEffect() {
        const cards = document.querySelectorAll('.service-card, .portfolio-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (y - centerY) / 10;
                const tiltY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    // Initialize tilt effect
    initTiltEffect();
    
    // Animated counter for stats
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = Math.ceil(target / (duration / 16)); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                        } else {
                            counter.textContent = current;
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Add counter class to stats
    document.querySelectorAll('.about-stats .stat h3').forEach(el => {
        el.classList.add('counter');
        el.setAttribute('data-target', el.textContent);
        el.textContent = '0';
    });
    
    // Initialize counters
    initCounters();
    
    // Animated background gradient
    function initAnimatedGradient() {
        const sections = document.querySelectorAll('.hero, .cta');
        
        sections.forEach(section => {
            const gradientOverlay = document.createElement('div');
            gradientOverlay.className = 'animated-gradient';
            section.appendChild(gradientOverlay);
            
            // Add CSS for the animated gradient
            const style = document.createElement('style');
            style.textContent = `
                .animated-gradient {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(125deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1));
                    background-size: 400% 400%;
                    animation: gradientAnimation 15s ease infinite;
                    z-index: -1;
                    pointer-events: none;
                }
                
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        });
    }
    
    // Initialize animated gradient
    initAnimatedGradient();
    
    // Reveal letters animation for section headers
    function initRevealLetters() {
        const sectionHeaders = document.querySelectorAll('.section-header h2');
        
        sectionHeaders.forEach(header => {
            const text = header.textContent;
            let html = '';
            
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    html += ' ';
                } else {
                    html += `<span class="reveal-letter">${text[i]}</span>`;
                }
            }
            
            header.innerHTML = html;
            
            const letters = header.querySelectorAll('.reveal-letter');
            letters.forEach((letter, index) => {
                letter.style.animationDelay = `${index * 0.05}s`;
            });
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        letters.forEach(letter => {
                            letter.classList.add('revealed');
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(header);
        });
        
        // Add CSS for the reveal letters animation
        const style = document.createElement('style');
        style.textContent = `
            .reveal-letter {
                display: inline-block;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .reveal-letter.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize reveal letters
    initRevealLetters();
}); 