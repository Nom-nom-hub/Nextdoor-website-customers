document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu script loaded');
    
    // Get the menu elements
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    console.log('Menu toggle found:', menuToggle);
    console.log('Nav container found:', navContainer);
    
    if (menuToggle && navContainer) {
        // Use a direct onclick handler for better compatibility
        menuToggle.onclick = function(e) {
            console.log('Mobile menu clicked');
            // Toggle classes
            navContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Log the current state
            console.log('Menu active:', menuToggle.classList.contains('active'));
            console.log('Nav active:', navContainer.classList.contains('active'));
            
            // Prevent default behavior if it's a button or link
            if (e) e.preventDefault();
            return false;
        };
        
        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.nav-container a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Menu link clicked');
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Also close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navContainer.classList.contains('active') && 
                !navContainer.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                
                console.log('Clicked outside menu');
                navContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        console.log('Mobile menu handlers attached successfully');
    } else {
        console.error('Mobile menu elements not found!');
    }
});
