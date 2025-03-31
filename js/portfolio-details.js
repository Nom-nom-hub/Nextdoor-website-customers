document.addEventListener('DOMContentLoaded', function() {
    console.log("Portfolio details script loaded");
    
    // Add CSS for modal if not already present
    if (!document.querySelector('#portfolio-modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'portfolio-modal-styles';
        modalStyles.textContent = `
            .project-modal-container {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 9999;
                overflow-y: auto;
            }
            .project-modal {
                position: relative;
                background-color: #fff;
                width: 90%;
                max-width: 900px;
                margin: 50px auto;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            .close-modal {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            .project-gallery {
                display: flex;
                overflow-x: auto;
                margin-bottom: 20px;
                gap: 10px;
            }
            .project-gallery img {
                max-height: 300px;
                object-fit: cover;
                border-radius: 4px;
            }
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 20px;
            }
            .tech-tag {
                background-color: #e9ecef;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 14px;
            }
            .project-actions {
                margin-top: 20px;
            }
            .demo-note {
                font-style: italic;
                color: #6c757d;
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Create modal container if it doesn't exist
    let modalContainer = document.querySelector('.project-modal-container');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.className = 'project-modal-container';
        document.body.appendChild(modalContainer);
    }
    
    // Function to show project modal
    function showProjectModal(project, projectId) {
        console.log("Showing modal for:", project.title);
        
        // Create modal content
        const modalHTML = `
            <div class="project-modal">
                <span class="close-modal">&times;</span>
                <h2>${project.title}</h2>
                
                <div class="project-gallery">
                    ${project.images.map(img => img ? `<img src="${img}" alt="${project.title}">` : '').join('')}
                </div>
                
                <div class="project-description">
                    <p>${project.description}</p>
                    
                    <div class="project-technologies">
                        <h3>Technologies Used</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-actions">
                        <p class="demo-note">This is a demo property within the demo site.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Display modal
        modalContainer.innerHTML = modalHTML;
        modalContainer.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Close modal when clicking the X
        const closeButton = modalContainer.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            modalContainer.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        // Close modal when clicking outside
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                modalContainer.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Simple click handler for buttons
    document.addEventListener('click', function(e) {
        // Check if clicked element is a button with "view details" text
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            const buttonText = e.target.textContent.trim().toLowerCase();
            if (buttonText.includes('view details') || buttonText.includes('details')) {
                e.preventDefault();
                
                // Get the product/property card
                const card = e.target.closest('.card, .product-card, .property-card');
                if (!card) return;
                
                // Extract information
                const title = card.querySelector('h3, h4, .title')?.textContent || 'Demo Item';
                const description = card.querySelector('.description, p')?.textContent || 'This is a demo item.';
                const img = card.querySelector('img')?.src || '';
                
                // Create demo object
                const demoItem = {
                    title: title,
                    description: description,
                    technologies: ['Demo Website'],
                    features: ['Demo feature 1', 'Demo feature 2', 'Demo feature 3'],
                    images: [img]
                };
                
                // Show modal
                showProjectModal(demoItem, 'demo-item');
            }
        }
    });
});
