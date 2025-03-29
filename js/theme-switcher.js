// Advanced theme switcher with smooth transitions and local storage
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-switch');
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            if (themeIcon) {
                if (document.body.classList.contains('light-theme')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        });
    }
}); 