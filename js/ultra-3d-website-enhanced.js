// Add this function to the existing ultra-3d-website.js file
// Place it right before the console.log("Ultra 3D website effect initialized");

function enhanceSpecialEffects() {
    console.log("Enhancing 3D special effects");
    
    // Add CSS for enhanced 3D effects
    const enhancedStyle = document.createElement('style');
    enhancedStyle.textContent = `
        /* Enhanced 3D lighting effects */
        body.enable-3d .portfolio-item,
        body.enable-3d .service-card {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(0, 0, 0, 0.05) 100%
            );
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 
                0 10px 30px rgba(0, 0, 0, 0.1),
                inset 0 0 15px rgba(255, 255, 255, 0.5);
            position: relative;
            overflow: hidden;
        }
        
        /* Dynamic lighting effect */
        body.enable-3d .portfolio-item::before,
        body.enable-3d .service-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(
                circle at var(--mouse-x-rel, 50%) var(--mouse-y-rel, 50%),
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0) 60%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            mix-blend-mode: overlay;
        }
        
        body.enable-3d .portfolio-item:hover::before,
        body.enable-3d .service-card:hover::before {
            opacity: 1;
        }
        
        /* Enhanced button effects */
        body.enable-3d .btn {
            background: linear-gradient(
                135deg,
                rgba(var(--btn-color-rgb, 0, 123, 255), 1) 0%,
                rgba(var(--btn-color-rgb, 0, 123, 255), 0.8) 100%
            );
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 
                0 10px 20px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            position: relative;
        }
        
        body.enable-3d .btn::before {
            content: '';
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.8) 0%,
                rgba(255, 255, 255, 0) 70%
            );
            opacity: 0;
            transform: scale(0.5);
            transition: transform 0.5s ease, opacity 0.5s ease;
            pointer-events: none;
            mix-blend-mode: overlay;
        }
        
        body.enable-3d .btn:hover::before {
            opacity: 0.8;
            transform: scale(1);
        }
    `;
    document.head.appendChild(enhancedStyle);
    
    // Add relative mouse position tracking for dynamic lighting
    const items = document.querySelectorAll('.portfolio-item, .service-card');
    items.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x-rel', x + '%');
            this.style.setProperty('--mouse-y-rel', y + '%');
        });
    });
    
    // Extract RGB values from computed styles for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        const computedStyle = window.getComputedStyle(btn);
        const bgColor = computedStyle.backgroundColor;
        
        // Extract RGB values
        const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            const r = rgbMatch[1];
            const g = rgbMatch[2];
            const b = rgbMatch[3];
            btn.style.setProperty('--btn-color-rgb', `${r}, ${g}, ${b}`);
        }
    });
}

// Call the enhancement function
enhanceSpecialEffects(); 