// Portfolio Filter and Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Filter portfolio items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // Portfolio modal
    const modal = document.getElementById('portfolio-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');
    const detailButtons = document.querySelectorAll('.details-btn');

    // Project details data
    const projectDetails = {
        'chat': {
            title: 'LiveConnect - Real-time Chat Solution',
            description: 'A custom-built chat widget that provides real-time communication between website visitors and site administrators. This solution includes both the customer-facing chat interface and a secure admin dashboard for managing conversations.',
            client: 'Designs by Teck',
            services: 'Frontend Development, UX Design, Real-time Communication',
            technologies: 'HTML5, CSS3, JavaScript, LocalStorage API',
            year: '2023',
            challenge: 'Creating a responsive, real-time chat solution without relying on backend servers or third-party services while ensuring a seamless experience for both customers and administrators, with proper security measures.',
            solution: 'Implemented a sophisticated client-side solution using LocalStorage for message persistence, custom notification systems, and real-time updates. The widget features typing indicators, message history, and a secure admin dashboard with access controls.',
            features: [
                'Real-time message delivery without page refreshes',
                'Typing indicators for both customer and admin',
                'Message history persistence across sessions',
                'Secure admin dashboard with access controls',
                'Mobile-responsive design that works on all devices',
                'Dark theme for the admin interface to reduce eye strain',
                'Customer feedback collection system',
                'Notification sounds for new messages',
                'Data privacy and security measures'
            ],
            images: [
                'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3'
            ]
        },
        'creative': {
            title: 'Pixel Perfect - Creative Design Studio',
            description: 'A modern, visually striking website designed for a creative agency that showcases their portfolio and services. The site features smooth animations, interactive elements, and a user-friendly interface that reflects the agency\'s innovative approach to design.',
            client: 'Pixel Perfect Design Studio',
            services: 'Web Design, UI/UX Design, Frontend Development',
            technologies: 'HTML5, CSS3, JavaScript, GSAP Animation',
            year: '2023',
            challenge: 'Creating a website that stands out in the crowded creative agency market while maintaining excellent performance and usability.',
            solution: 'Implemented a minimalist design with strategic use of animations and interactive elements that highlight the agency\'s work without overwhelming visitors.',
            images: [
                'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3'
            ]
        },
        'restaurant': {
            title: 'Savoria - Fine Dining Restaurant',
            description: 'An elegant website for a high-end restaurant that showcases their menu, ambiance, and reservation system. The design emphasizes the culinary experience with rich imagery and intuitive navigation.',
            client: 'Savoria Restaurant',
            services: 'Web Design, Content Strategy, Online Reservation System',
            technologies: 'HTML5, CSS3, JavaScript, PHP, MySQL',
            year: '2023',
            challenge: 'Creating a digital experience that captures the restaurant\'s sophisticated atmosphere while providing practical functionality for reservations.',
            solution: 'Designed a visually rich interface with high-quality food photography and implemented a seamless reservation system that integrates with the restaurant\'s booking software.',
            images: [
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3'
            ]
        },
        'tech': {
            title: 'Quantum - AI-Powered Data Solutions',
            description: 'A cutting-edge website for a technology startup specializing in AI and data analytics. The site features interactive data visualizations, product demonstrations, and a modern tech aesthetic.',
            client: 'Quantum Analytics',
            services: 'Web Design, UI/UX Design, Interactive Features',
            technologies: 'React.js, Node.js, D3.js, SCSS',
            year: '2023',
            challenge: 'Communicating complex technical concepts in an accessible way while showcasing the company\'s innovative technology.',
            solution: 'Created interactive demonstrations and visualizations that allow visitors to experience the company\'s AI capabilities firsthand, with clear explanations of technical concepts.',
            images: [
                'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3'
            ]
        },
        'fashion': {
            title: 'Artisan Collective - Handcrafted Fashion',
            description: 'A stylish e-commerce website for a boutique fashion brand that specializes in handcrafted clothing and accessories. The site emphasizes the artisanal quality of the products with a clean, elegant design.',
            client: 'Artisan Collective',
            services: 'E-commerce Design, Product Photography, Payment Integration',
            technologies: 'Shopify, Liquid, JavaScript, CSS3',
            year: '2022',
            challenge: 'Creating an online shopping experience that captures the handcrafted quality of the products and encourages purchases.',
            solution: 'Implemented a minimalist design that puts the focus on product photography, with detailed product descriptions and a streamlined checkout process.',
            images: [
                'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3'
            ]
        },
        'realestate': {
            title: 'Prestige Properties - Luxury Real Estate',
            description: 'A premium real estate website that showcases high-end properties with virtual tours, detailed listings, and an interactive map interface. The design emphasizes luxury and exclusivity.',
            client: 'Prestige Properties',
            services: 'Web Design, Virtual Tours, Property Listings',
            technologies: 'WordPress, PHP, JavaScript, Google Maps API',
            year: '2023',
            challenge: 'Creating a digital platform that effectively showcases luxury properties and provides comprehensive information for potential buyers.',
            solution: 'Developed a sophisticated property search system with virtual tours, high-quality photography, and detailed neighborhood information to give buyers a complete picture of each property.',
            images: [
                'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3'
            ]
        },
        'electronics': {
            title: 'TechVault - Premium Electronics Store',
            description: 'A feature-rich e-commerce platform for electronics with advanced filtering, product comparisons, and detailed specifications. The site provides a seamless shopping experience for tech enthusiasts.',
            client: 'TechVault',
            services: 'E-commerce Development, UX Design, Payment Integration',
            technologies: 'WooCommerce, PHP, JavaScript, AJAX',
            year: '2022',
            challenge: 'Creating an e-commerce platform that handles complex product specifications and comparisons while maintaining a user-friendly experience.',
            solution: 'Implemented an advanced filtering system and product comparison tool that allows customers to easily find and compare products based on technical specifications.',
            images: [
                'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3'
            ]
        },
        'landscaping': {
            title: 'GreenScape - Professional Landscaping Services',
            description: 'A professional service website for a landscaping business with project galleries, service descriptions, and a quote request system. The design emphasizes the company\'s expertise and the beauty of their work.',
            client: 'GreenScape Landscaping',
            services: 'Web Design, Content Strategy, Lead Generation',
            technologies: 'HTML5, CSS3, JavaScript, PHP',
            year: '2023',
            challenge: 'Creating a website that showcases the company\'s landscaping projects effectively while generating quality leads.',
            solution: 'Designed a visually rich interface with project galleries organized by category and implemented a streamlined quote request system that captures detailed project requirements.',
            images: [
                'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1551272744-2bae8a8a0d65?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-4.0.3'
            ]
        }
    };

    // Open modal with project details
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Get project ID
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];

            if (project) {
                // Create modal content
                let modalContent = `
                    <h2>${project.title}</h2>
                    <div class="project-details">
                        <div class="project-info">
                            <p>${project.description}</p>
                            <div class="project-meta">
                                <p><strong>Client:</strong> ${project.client}</p>
                                <p><strong>Services:</strong> ${project.services}</p>
                                <p><strong>Technologies:</strong> ${project.technologies}</p>
                                <p><strong>Year:</strong> ${project.year}</p>
                            </div>
                            <div class="project-challenge-solution">
                                <h3>Challenge</h3>
                                <p>${project.challenge}</p>
                                <h3>Solution</h3>
                                <p>${project.solution}</p>
                            </div>`;

                // Add features list if available
                if (project.features) {
                    modalContent += `
                            <div class="project-features">
                                <h3>Key Features</h3>
                                <ul>`;

                    project.features.forEach(feature => {
                        modalContent += `
                                    <li><i class="fas fa-check-circle"></i> ${feature}</li>`;
                    });

                    modalContent += `
                                </ul>
                            </div>`;
                }

                // Add demo link (special case for chat widget)
                if (projectId === 'chat') {
                    modalContent += `
                            <a href="#" class="btn btn-primary" onclick="document.querySelector('.chat-button').click(); return false;">Try Live Demo</a>
                            <p class="admin-note"><i class="fas fa-lock"></i> Admin dashboard access is restricted for security reasons</p>`;
                } else {
                    modalContent += `
                            <a href="demos/${projectId}/index.html" target="_blank" class="btn btn-primary">View Live Demo</a>`;
                }

                modalContent += `
                        </div>
                    </div>
                    <h3>Project Gallery</h3>
                    <div class="project-images">
                `;

                // Add images
                project.images.forEach(image => {
                    modalContent += `
                        <div class="project-image">
                            <img src="${image}" alt="${project.title}">
                        </div>
                    `;
                });

                modalContent += `</div>`;

                // Set modal content
                modalBody.innerHTML = modalContent;

                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
});
