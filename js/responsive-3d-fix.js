// Responsive 3D Fix
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other effects are loaded
    setTimeout(() => {
        initResponsive3DFix();
    }, 6000);
    
    function initResponsive3DFix() {
        console.log("Initializing responsive 3D fix");
        
        // Add CSS for responsive 3D adjustments
        const style = document.createElement('style');
        style.textContent = `
            /* Responsive adjustments for 3D effects */
            @media (max-width: 1200px) {
                :root {
                    --perspective: 1500px;
                    --layer-depth-1: 40px;
                    --layer-depth-2: 80px;
                    --layer-depth-3: 120px;
                    --layer-depth-4: 160px;
                }
                
                body.enable-3d .navbar,
                body.enable-3d .hero-content,
                body.enable-3d .section-header,
                body.enable-3d .services-grid,
                body.enable-3d .portfolio-grid,
                body.enable-3d .testimonial-slider,
                body.enable-3d .about-content,
                body.enable-3d .contact-content,
                body.enable-3d .footer-content {
                    transform: translateZ(calc(var(--layer-depth-2) * var(--depth-intensity)));
                }
            }
            
            @media (max-width: 992px) {
                :root {
                    --perspective: 1200px;
                    --layer-depth-1: 30px;
                    --layer-depth-2: 60px;
                    --layer-depth-3: 90px;
                    --layer-depth-4: 120px;
                }
                
                /* Reduce tilt sensitivity on medium screens */
                body.enable-3d {
                    --tilt-amount: 0.7;
                }
                
                /* Adjust 3D controls panel */
                .controls-3d {
                    right: 10px;
                    max-width: 250px;
                }
                
                .controls-panel {
                    padding: 10px;
                }
                
                /* Simplify some 3D effects */
                body.enable-3d .portfolio-item:hover {
                    transform: translateZ(80px) scale(1.05) rotateX(-5deg);
                }
            }
            
            @media (max-width: 768px) {
                :root {
                    --perspective: 1000px;
                    --layer-depth-1: 20px;
                    --layer-depth-2: 40px;
                    --layer-depth-3: 60px;
                    --layer-depth-4: 80px;
                }
                
                /* Further reduce tilt sensitivity on small screens */
                body.enable-3d {
                    --tilt-amount: 0.5;
                }
                
                /* Simplify 3D effects for mobile */
                body.enable-3d .btn:hover {
                    transform: translateZ(30px) scale(1.05);
                }
                
                body.enable-3d .portfolio-item:hover {
                    transform: translateZ(50px) scale(1.03);
                }
                
                /* Adjust 3D controls for mobile */
                .controls-3d {
                    bottom: 10px;
                    right: 10px;
                    max-width: 200px;
                }
                
                .controls-panel {
                    max-height: 200px;
                    overflow-y: auto;
                }
                
                /* Collapse controls by default on mobile */
                body.enable-3d .controls-panel {
                    display: none;
                }
                
                body.enable-3d .controls-3d.expanded .controls-panel {
                    display: block;
                }
                
                /* Fix z-index issues on mobile */
                body.enable-3d .navbar {
                    z-index: 1000;
                }
                
                /* Ensure form elements remain usable */
                body.enable-3d input,
                body.enable-3d textarea,
                body.enable-3d select,
                body.enable-3d button {
                    transform: translateZ(10px);
                }
            }
            
            @media (max-width: 576px) {
                /* Minimal 3D effect on very small screens */
                :root {
                    --perspective: 800px;
                    --layer-depth-1: 10px;
                    --layer-depth-2: 20px;
                    --layer-depth-3: 30px;
                    --layer-depth-4: 40px;
                }
                
                /* Minimal tilt on very small screens */
                body.enable-3d {
                    --tilt-amount: 0.3;
                }
                
                /* Simplify 3D controls for very small screens */
                .toggle-3d-btn {
                    padding: 5px 10px;
                    font-size: 12px;
                }
                
                .depth-indicator {
                    font-size: 10px;
                    padding: 3px 6px;
                }
                
                /* Fix potential overflow issues */
                body.enable-3d {
                    overflow-x: hidden;
                }
                
                /* Ensure content remains readable */
                body.enable-3d h1, 
                body.enable-3d h2 {
                    text-shadow: 0px 1px 0px rgba(255,255,255,0.5);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Function to adjust 3D effect based on screen size
        function adjustFor3DResponsiveness() {
            const width = window.innerWidth;
            let depthMultiplier = 1;
            let tiltMultiplier = 1;
            
            // Adjust depth and tilt based on screen size
            if (width < 576) {
                depthMultiplier = 0.3;
                tiltMultiplier = 0.3;
            } else if (width < 768) {
                depthMultiplier = 0.5;
                tiltMultiplier = 0.5;
            } else if (width < 992) {
                depthMultiplier = 0.7;
                tiltMultiplier = 0.7;
            } else if (width < 1200) {
                depthMultiplier = 0.85;
                tiltMultiplier = 0.85;
            }
            
            // Update CSS variables
            document.documentElement.style.setProperty('--depth-intensity', depthMultiplier);
            document.documentElement.style.setProperty('--tilt-amount', tiltMultiplier);
            
            // Update UI controls if they exist
            const depthSlider = document.getElementById('depthSlider');
            const tiltSlider = document.getElementById('tiltSlider');
            const depthValue = document.getElementById('depthValue');
            const tiltValue = document.getElementById('tiltValue');
            
            if (depthSlider && depthValue) {
                depthSlider.value = depthMultiplier;
                depthValue.textContent = depthMultiplier.toFixed(1);
            }
            
            if (tiltSlider && tiltValue) {
                tiltSlider.value = tiltMultiplier;
                tiltValue.textContent = tiltMultiplier.toFixed(1);
            }
        }
        
        // Adjust on load and resize
        adjustFor3DResponsiveness();
        window.addEventListener('resize', adjustFor3DResponsiveness);
        
        // Fix for touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            // Add touch-specific CSS
            const touchStyle = document.createElement('style');
            touchStyle.textContent = `
                /* Touch device optimizations */
                body.enable-3d .btn:active {
                    transform: translateZ(20px) scale(1.05);
                }
                
                body.enable-3d .portfolio-item:active::before,
                body.enable-3d .service-card:active::before {
                    opacity: 1;
                }
                
                /* Ensure controls are touch-friendly */
                .toggle-3d-btn,
                .controls-toggle,
                .controls-panel input[type="range"],
                .controls-panel input[type="checkbox"] {
                    min-height: 44px;
                    min-width: 44px;
                }
            `;
            document.head.appendChild(touchStyle);
            
            // Fix for iOS Safari viewport issues
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta) {
                viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            }
        }
        
        console.log("Responsive 3D fix initialized");
    }
}); 