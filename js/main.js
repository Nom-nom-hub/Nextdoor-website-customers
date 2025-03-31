document.addEventListener('DOMContentLoaded', function() {
    // Force immediate styling of the header
    const header = document.querySelector('.site-header');
    if (header) {
        // Force repaint by accessing offsetHeight
        header.offsetHeight;
        
        // Apply explicit styling based on theme
        if (document.body.classList.contains('light-theme')) {
            header.style.backgroundColor = '#ffffff';
        } else {
            header.style.backgroundColor = '#020617'; // Same as --darker-color
        }
    }
    
    // Add a class to indicate the DOM is fully loaded
    document.body.classList.add('dom-loaded');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Navigation functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const menuItems = document.querySelectorAll('.main-menu a');

    if (menuToggle && navContainer) {
        // Toggle menu when hamburger icon is clicked
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            e.stopPropagation(); // Stop event propagation
            this.classList.toggle('active');
            navContainer.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on menu items
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Update active menu item
                menuItems.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navContainer.classList.contains('active') && 
                !navContainer.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Email button functionality
    const emailButton = document.getElementById('emailButton');
    if (emailButton) {
        emailButton.addEventListener('click', function() {
            const name = document.getElementById('name').value || 'Not provided';
            const email = document.getElementById('email').value || 'Not provided';
            const subject = document.getElementById('subject').value || 'Website Inquiry';
            const message = document.getElementById('message').value || 'No message provided';
            
            // Create email body
            const body = `Name: ${name}
Email: ${email}

Message:
${message}

--------------------------
Sent from Teck Web Design website`;
            
            // Create the mailto link with proper encoding
            const mailtoLink = `mailto:ftwenty903@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open the email client
            window.location.href = mailtoLink;
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-menu a, .footer-nav a, .cta-buttons a, a.btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to hash links that point to sections on the same page
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                // Calculate position with offset for header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Use native smooth scrolling
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Update active menu item based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        
        // Add scrolled class to header
        if (scrollPosition > 50) {
            document.querySelector('.site-header').classList.add('scrolled');
        } else {
            document.querySelector('.site-header').classList.remove('scrolled');
        }
        
        // Update active menu item based on scroll position
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
}); 

// Fix the typing animation to target only the code editor
document.addEventListener('DOMContentLoaded', function() {
    // Specifically target the cursor in the code editor
    const codeEditor = document.querySelector('.code-editor');
    
    if (codeEditor) {
        const typingLine = codeEditor.querySelector('.typing') || codeEditor.querySelector('.code-line');
        
        if (typingLine) {
            // Text to be typed
            const textToType = "// Ready to build something amazing together";
            let charIndex = 0;
            
            // Clear any existing content
            typingLine.innerHTML = '<span class="code-cursor"></span>';
            const cursor = typingLine.querySelector('.code-cursor');
            
            // Add cursor styling directly
            cursor.style.display = 'inline-block';
            cursor.style.width = '2px';
            cursor.style.height = '18px';
            cursor.style.backgroundColor = '#fff';
            cursor.style.animation = 'blink 1s step-end infinite';
            cursor.style.verticalAlign = 'middle';
            cursor.style.marginLeft = '2px';
            
            // Typing animation function
            function typeNextChar() {
                if (charIndex < textToType.length) {
                    // Insert character before the cursor
                    const charSpan = document.createElement('span');
                    charSpan.className = 'comment';
                    charSpan.textContent = textToType.charAt(charIndex);
                    typingLine.insertBefore(charSpan, cursor);
                    
                    charIndex++;
                    setTimeout(typeNextChar, 100);
                }
            }
            
            // Start typing after a delay
            setTimeout(typeNextChar, 1000);
        }
    }
}); 
