document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const categoryNav = document.querySelector('.category-nav');
    
    menuToggle.addEventListener('click', function() {
        categoryNav.classList.toggle('active');
    });
    
    // Dropdown menu for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Hero slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval when manually changing slides
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners for slider controls
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            
            // Get product info
            const product = this.closest('.product-card');
            const productName = product.querySelector('.product-title').textContent;
            const productPrice = product.querySelector('.current-price').textContent;
            
            // Show notification
            showNotification(`${productName} added to cart - ${productPrice}`);
        });
    });
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ff6b6b';
                
                // Get product name
                const product = this.closest('.product-card');
                const productName = product.querySelector('.product-title').textContent;
                
                showNotification(`${productName} added to wishlist`);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                
                // Get product name
                const product = this.closest('.product-card');
                const productName = product.querySelector('.product-title').textContent;
                
                showNotification(`${productName} removed from wishlist`);
            }
        });
    });
    
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quickview-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get product name
            const product = this.closest('.product-card');
            const productName = product.querySelector('.product-title').textContent;
            
            alert(`Quick view for ${productName} would open in a modal. This is just a demo.`);
        });
    });
    
    // Compare functionality
    const compareButtons = document.querySelectorAll('.compare-btn');
    
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get product name
            const product = this.closest('.product-card');
            const productName = product.querySelector('.product-title').textContent;
            
            alert(`${productName} added to compare list. This is just a demo.`);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value.trim() !== '') {
                showNotification('Thank you for subscribing to our newsletter!');
                input.value = '';
            }
        });
    }
    
    // Notification function
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Add styles
        const style = document.createElement('style');
        if (!document.querySelector('#notification-styles')) {
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: white;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    border-radius: 4px;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-width: 300px;
                    max-width: 400px;
                    transform: translateX(100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 1000;
                }
                
                .notification.show {
                    transform: translateX(0);
                    opacity: 1;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                }
                
                .notification-content i {
                    color: #4CAF50;
                    font-size: 1.5rem;
                    margin-right: 10px;
                }
                
                .notification-content p {
                    margin: 0;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: #999;
                    cursor: pointer;
                    font-size: 1rem;
                }
                
                .notification-close:hover {
                    color: #333;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Current year for footer
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', new Date().getFullYear());
    }
}); 