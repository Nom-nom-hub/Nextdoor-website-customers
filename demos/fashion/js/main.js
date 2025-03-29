document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Add to cart functionality (demo only)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            
            // Show added to cart notification
            const product = this.closest('.product-card');
            const productName = product.querySelector('h3').textContent;
            
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `<p>${productName} added to cart!</p>`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        });
    });
    
    // Quick view functionality (demo only)
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Quick view functionality is not implemented in this demo.');
        });
    });
    
    // Newsletter form submission (demo only)
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value.trim() !== '') {
                alert('Thank you for subscribing to our newsletter! This is a demo website, so no actual subscription has been processed.');
                input.value = '';
            }
        });
    }
    
    // Current year for footer
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', new Date().getFullYear());
    }
    
    // Add CSS for cart notification
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .cart-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .cart-notification p {
            margin: 0;
        }
    `;
    document.head.appendChild(style);
}); 