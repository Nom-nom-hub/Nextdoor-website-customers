// Theme Switcher
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');

    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    const header = document.querySelector('.site-header');
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';

    if (initialTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        header.style.backgroundColor = '#0f172a';
    } else {
        header.style.backgroundColor = '#ffffff';
    }

    // Handle SVG illustrations for initial theme
    document.addEventListener('DOMContentLoaded', function() {
        const svgElements = document.querySelectorAll('img[src$=".svg"]');
        svgElements.forEach(svg => {
            svg.addEventListener('load', function() {
                try {
                    const svgDoc = this.contentDocument;
                    if (svgDoc && svgDoc.documentElement) {
                        const svgRoot = svgDoc.documentElement;
                        svgRoot.setAttribute('data-theme', initialTheme);
                    }
                } catch (e) {
                    console.log('Error setting theme on SVG:', e);
                }
            });
        });
    });

    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';

        if (currentTheme !== 'dark') {
            newTheme = 'dark';
        }

        // Set theme attribute
        document.documentElement.setAttribute('data-theme', newTheme);

        // Directly set header background color
        const header = document.querySelector('.site-header');
        if (newTheme === 'dark') {
            header.style.backgroundColor = '#0f172a';
        } else {
            header.style.backgroundColor = '#ffffff';
        }

        // Update SVG illustrations to match theme
        const svgElements = document.querySelectorAll('img[src$=".svg"]');
        svgElements.forEach(svg => {
            // For SVGs that haven't loaded yet, add an event listener
            if (!svg.complete) {
                svg.addEventListener('load', function() {
                    try {
                        const svgDoc = this.contentDocument;
                        if (svgDoc && svgDoc.documentElement) {
                            svgDoc.documentElement.setAttribute('data-theme', newTheme);
                        }
                    } catch (e) {
                        console.log('Error setting theme on SVG:', e);
                    }
                });
            } else {
                // For already loaded SVGs
                try {
                    const svgDoc = svg.contentDocument;
                    if (svgDoc && svgDoc.documentElement) {
                        svgDoc.documentElement.setAttribute('data-theme', newTheme);
                    }
                } catch (e) {
                    console.log('Error setting theme on SVG:', e);
                }
            }
        });

        // Save preference
        localStorage.setItem('theme', newTheme);

        // Announce theme change for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('sr-only');
        announcement.textContent = `Theme changed to ${newTheme} mode`;
        document.body.appendChild(announcement);

        // Remove announcement after it's read
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 3000);
    });
});
