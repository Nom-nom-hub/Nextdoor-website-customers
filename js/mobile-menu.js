// Mobile menu toggle - fixed version
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // Toggle menu when clicking the hamburger icon
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a nav link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') || event.target.closest('.nav-links a')) {
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Force apply styles to ensure they take effect
    const header = document.querySelector('.header');
    if (header) {
        header.style.display = 'block';
        header.style.width = '100%';
    }
    
    // Make sure the last menu item has special styling
    const lastMenuItem = document.querySelector('.nav-links li:last-child a');
    if (lastMenuItem) {
        lastMenuItem.classList.add('contact-button');
    }
});
