document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.padding = '15px 0';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.padding = '20px 0';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Fade-in on scroll for sections and cards
    function fadeInOnScroll() {
        const fadeEls = document.querySelectorAll('section, .service-card, .team-member, .portfolio-item');
        const observer = new window.IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'none';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        fadeEls.forEach(function(el) {
            el.style.opacity = 0;
            el.style.transform = 'translateY(40px)';
            observer.observe(el);
        });
    }
    if ('IntersectionObserver' in window) fadeInOnScroll();

    // Portfolio modal functionality
    let modal;
    function createModal() {
        modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" tabindex="0">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    createModal();

    function showModal(title, desc, img) {
        modal.querySelector('.modal-body').innerHTML = `
            <h2>${title}</h2>
            <img src="${img}" alt="${title}" style="max-width:100%;border-radius:12px;margin:20px 0;">
            <p>${desc}</p>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modal.querySelector('.close-modal').focus();
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block' && e.key === 'Escape') closeModal();
    });

    // Portfolio 'View Details' buttons
    document.querySelectorAll('.portfolio-item .btn-sm').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const item = btn.closest('.portfolio-item');
            const title = item.querySelector('h3')?.textContent || 'Project';
            const desc = item.querySelector('p')?.textContent || '';
            const img = item.querySelector('img')?.src || '';
            showModal(title, desc, img);
        });
    });
});
   