// Enhanced navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation script loaded');
    
    // Force apply styles to ensure they take effect
    const header = document.querySelector('.site-header');
    const menuItems = document.querySelectorAll('.menu-item a');
    
    // Apply initial styles
    header.style.transition = 'all 0.3s ease';
    
    // Make sure the last menu item has special styling
    const lastMenuItem = document.querySelector('.main-menu .menu-item:last-child a');
    if (lastMenuItem) {
        lastMenuItem.classList.add('contact-button');
    }
    
    // Add active class to current section
    function setActiveNavItem() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all menu items
                menuItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to corresponding menu item
                const activeItem = document.querySelector(`.menu-item a[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                    console.log('Set active menu item:', sectionId);
                }
            }
        });
    }
    
    // Initialize
    setActiveNavItem();
    
    // Add event listeners
    window.addEventListener('scroll', setActiveNavItem);
    
    // Add class to body when DOM is loaded
    document.body.classList.add('dom-loaded');
});