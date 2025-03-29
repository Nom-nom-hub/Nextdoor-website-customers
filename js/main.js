document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navContainer.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navContainer.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Back to top button visibility
        const backToTop = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Header scroll effect
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    // Only initialize testimonial slider if elements exist
    if (testimonialSlider && prevBtn && nextBtn && dotsContainer) {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        
        // Create dots
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Initialize slider
        function initSlider() {
            testimonialSlides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            });
        }
        
        // Go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            
            testimonialSlides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            });
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            goToSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            goToSlide(currentSlide);
        }
        
        // Event listeners for slider controls
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto slide on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Initialize slider
        initSlider();
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For GitHub Pages, you might use a service like Formspree
        // This is a simple alert for demonstration
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate position with offset for header
            const headerOffset = 80; // Adjust based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            // Use native smooth scrolling instead of custom animation
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Disable any scroll event listeners that might be causing the issue
    const scrollEvents = ['wheel', 'mousewheel', 'DOMMouseScroll'];
    
    scrollEvents.forEach(event => {
        window.addEventListener(event, function(e) {
            // Only prevent default if a custom scroll animation is in progress
            if (document.body.classList.contains('is-scrolling-animation')) {
                e.preventDefault();
            }
        }, { passive: false });
    });
    
    // Remove the scrolling class after animation completes
    window.addEventListener('scroll', function() {
        clearTimeout(window.scrollFinished);
        window.scrollFinished = setTimeout(function() {
            document.body.classList.remove('is-scrolling-animation');
        }, 100);
    });
    
    // Fix for back-to-top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-image, .about-text, .contact-info, .contact-form');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                // Only animate if not already animated
                if (element.getAttribute('data-animated') !== 'true') {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.setAttribute('data-animated', 'true');
                }
            }
        });
    }
    
    // Set initial state for animation - but don't apply to elements already in view
    animateElements.forEach(element => {
        // Check if element is already in view on page load
        const elementTop = element.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (elementTop < triggerBottom) {
            // Element is already in view, don't animate it
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.setAttribute('data-animated', 'true');
        } else {
            // Element is not in view, prepare it for animation
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.setAttribute('data-animated', 'false');
        }
        
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check scroll position on load
    window.addEventListener('load', checkScroll);
    
    // Check scroll position on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Portfolio modal functionality
    const viewProjectButtons = document.querySelectorAll('.view-project');
    
    // Add click event to each button
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the project ID from the data attribute
            const projectId = this.getAttribute('data-project');
            console.log('Clicked project:', projectId); // Debug
            
            // Find the corresponding modal
            const modal = document.getElementById(projectId);
            
            if (modal) {
                console.log('Modal found:', modal); // Debug
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                console.error(`Modal with ID ${projectId} not found`);
            }
        });
    });
    
    // Close modal when clicking the X
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.portfolio-modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    });
    
    // Close modal when clicking outside the content
    const portfolioModals = document.querySelectorAll('.portfolio-modal');
    window.addEventListener('click', function(e) {
        portfolioModals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Custom cursor animation
    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (!cursor || !cursorFollower) return;
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Change cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .portfolio-card, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }
    
    // Particle background
    function initParticleBackground() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Particle settings
        const particlesArray = [];
        const numberOfParticles = 100;
        
        // Create particles
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1})`
            });
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                const particle = particlesArray[i];
                
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Boundary check
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX = -particle.speedX;
                }
                
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY = -particle.speedY;
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Initialize all animations
    animateOnScroll();
    initCustomCursor();
    initParticleBackground();
    
    // Improved mobile menu functionality
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navContainer = document.querySelector('.nav-container');
        const body = document.body;
        
        if (!menuToggle || !navContainer) return;
        
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navContainer.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (
                navContainer.classList.contains('active') && 
                !navContainer.contains(e.target) && 
                !menuToggle.contains(e.target)
            ) {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking on a link
        const links = navContainer.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Make the close button (×) work
        document.addEventListener('click', function(e) {
            if (e.target.closest('.nav-container::before')) {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
    
    // Add dark mode toggle
    function addDarkModeToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(toggle);
        
        toggle.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-moon')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                // You could add light mode functionality here if needed
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
    
    // Initialize responsive features
    initMobileMenu();
    addDarkModeToggle();
    
    // Disable animations on mobile if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
}); 