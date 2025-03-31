document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu script loaded');
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', function() {
            navContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.nav-container a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
});