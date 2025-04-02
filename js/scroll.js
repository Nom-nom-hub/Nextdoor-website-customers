// Enhanced navigation scroll effects
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const menuItems = document.querySelectorAll('.menu-item a');
    
    // Add active class to current section in navigation
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
                }
            }
        });
    }
    
    // Add scrolled class to header when scrolling down
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Smooth scroll to section when clicking on nav links
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop;
                    
                    window.scrollTo({
                        top: offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize
    setActiveNavItem();
    handleHeaderScroll();
    
    // Add event listeners
    window.addEventListener('scroll', function() {
        setActiveNavItem();
        handleHeaderScroll();
    });
});