document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const toggle = otherItem.querySelector('.faq-toggle i');
                    toggle.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const toggle = item.querySelector('.faq-toggle i');
            
            if (item.classList.contains('active')) {
                toggle.className = 'fas fa-minus';
            } else {
                toggle.className = 'fas fa-plus';
            }
        });
    });
}); 