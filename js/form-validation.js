// Basic form validation script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form validation script loaded');
    
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            // Reset previous error states
            contactForm.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (nameInput && (!nameInput.value || nameInput.value.trim() === '')) {
                addError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (emailInput && (!emailInput.value || !isValidEmail(emailInput.value))) {
                addError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (messageInput && (!messageInput.value || messageInput.value.trim() === '')) {
                addError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    function addError(element, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '5px';
        element.parentNode.appendChild(errorMessage);
        element.style.borderColor = 'red';
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});