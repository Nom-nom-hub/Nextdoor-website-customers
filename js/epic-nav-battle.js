// Epic Nav Battle - Links fighting across the entire website
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initEpicNavBattle();
    }, 1500);
    
    function initEpicNavBattle() {
        console.log("Initializing epic nav battle across website");
        
        // Add CSS for epic nav battle
        const style = document.createElement('style');
        style.textContent = `
            /* Epic battle styles */
            .battle-arena {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
                overflow: hidden;
            }
            
            .battle-fighter {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 5px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                padding: 8px 15px;
                font-weight: bold;
                pointer-events: none;
                transition: transform 0.2s ease;
                will-change: transform, left, top;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                transform-origin: center center;
            }
            
            .battle-fighter.attacking {
                z-index: 10001;
            }
            
            .battle-fighter.home {
                position: static !important;
                transform: none !important;
                box-shadow: none !important;
                background-color: transparent !important;
                pointer-events: auto !important;
            }
            
            .battle-fighter.punch {
                animation: battlePunch 0.5s ease-in-out;
            }
            
            .battle-fighter.kick {
                animation: battleKick 0.6s ease-in-out;
            }
            
            .battle-fighter.dodge {
                animation: battleDodge 0.5s ease-in-out;
            }
            
            .battle-fighter.spin {
                animation: battleSpin 0.7s ease-in-out;
            }
            
            .battle-fighter.jump {
                animation: battleJump 0.6s ease-in-out;
            }
            
            .battle-fighter.damaged {
                animation: battleDamaged 0.5s ease-in-out;
            }
            
            .battle-fighter.team-1 {
                background-color: rgba(76, 175, 80, 0.9);
                color: white;
            }
            
            .battle-fighter.team-2 {
                background-color: rgba(33, 150, 243, 0.9);
                color: white;
            }
            
            .battle-fighter.team-3 {
                background-color: rgba(244, 67, 54, 0.9);
                color: white;
            }
            
            .battle-fighter .health-bar {
                position: absolute;
                top: -5px;
                left: 0;
                height: 3px;
                width: 100%;
                background-color: #ddd;
                border-radius: 3px;
                overflow: hidden;
            }
            
            .battle-fighter .health-bar-fill {
                height: 100%;
                background-color: #4CAF50;
                width: 100%;
                transition: width 0.3s ease;
            }
            
            .battle-fighter.team-1 .health-bar-fill {
                background-color: #81C784;
            }
            
            .battle-fighter.team-2 .health-bar-fill {
                background-color: #64B5F6;
            }
            
            .battle-fighter.team-3 .health-bar-fill {
                background-color: #E57373;
            }
            
            /* Battle animations */
            @keyframes battlePunch {
                0% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(0.95) rotate(-5deg); }
                50% { transform: scale(1.2) rotate(5deg) translateX(20px); }
                75% { transform: scale(1.1) rotate(3deg) translateX(10px); }
                100% { transform: scale(1) rotate(0deg); }
            }
            
            @keyframes battleKick {
                0% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(0.9) rotate(5deg); }
                50% { transform: scale(1.3) rotate(-10deg) translateX(25px); }
                75% { transform: scale(1.1) rotate(-5deg) translateX(15px); }
                100% { transform: scale(1) rotate(0deg); }
            }
            
            @keyframes battleDodge {
                0% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-20px) translateX(15px) rotate(10deg) scale(0.9); }
                100% { transform: translateY(0) scale(1); }
            }
            
            @keyframes battleSpin {
                0% { transform: rotate(0deg) scale(1); }
                100% { transform: rotate(360deg) scale(1); }
            }
            
            @keyframes battleJump {
                0% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-40px) scale(1.2); }
                100% { transform: translateY(0) scale(1); }
            }
            
            @keyframes battleDamaged {
                0% { transform: translateX(0) scale(1); opacity: 1; }
                25% { transform: translateX(-15px) scale(0.9); opacity: 0.7; }
                50% { transform: translateX(10px) scale(0.95); opacity: 0.8; }
                75% { transform: translateX(-5px) scale(0.98); opacity: 0.9; }
                100% { transform: translateX(0) scale(1); opacity: 1; }
            }
            
            /* Battle effects */
            .battle-effect {
                position: absolute;
                pointer-events: none;
                z-index: 10002;
            }
            
            .battle-text {
                position: absolute;
                font-size: 14px;
                font-weight: bold;
                color: #333;
                background: rgba(255, 255, 255, 0.8);
                padding: 3px 8px;
                border-radius: 10px;
                pointer-events: none;
                opacity: 0;
                transform: scale(0);
                z-index: 10003;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                animation: battleTextAppear 1s forwards;
            }
            
            @keyframes battleTextAppear {
                0% { opacity: 0; transform: scale(0); }
                20% { opacity: 1; transform: scale(1.2); }
                30% { transform: scale(1); }
                80% { opacity: 1; }
                100% { opacity: 0; transform: translateY(-20px) scale(0.8); }
            }
            
            .battle-impact {
                position: absolute;
                width: 40px;
                height: 40px;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10002;
                opacity: 0;
                transform: scale(0.5);
                animation: battleImpact 0.5s ease-out forwards;
            }
            
            @keyframes battleImpact {
                0% { opacity: 0; transform: scale(0.5); }
                50% { opacity: 1; transform: scale(1.5); }
                100% { opacity: 0; transform: scale(2); }
            }
            
            /* Battle particle */
            .battle-particle {
                position: absolute;
                width: 8px;
                height: 8px;
                background: #fff;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.8;
                z-index: 10002;
            }
            
            /* Return to positions message */
            .return-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 15px 30px;
                border-radius: 10px;
                font-size: 18px;
                font-weight: bold;
                z-index: 10004;
                opacity: 0;
                transition: transform 0.5s ease, opacity 0.5s ease;
                pointer-events: none;
                text-align: center;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            }
            
            .return-message.show {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
        
        // Create battle arena
        const battleArena = document.createElement('div');
        battleArena.className = 'battle-arena';
        document.body.appendChild(battleArena);
        
        // Create return message
        const returnMessage = document.createElement('div');
        returnMessage.className = 'return-message';
        returnMessage.textContent = 'Battle Over! Returning to positions...';
        document.body.appendChild(returnMessage);
        
        // Get nav links
        const navLinks = document.querySelectorAll('.nav-links li a');
        
        // Initialize fighters
        const fighters = [];
        
        if (navLinks.length > 0) {
            // Create fighters from nav links
            navLinks.forEach((link, index) => {
                // Create fighter element
                const fighter = document.createElement('div');
                fighter.className = 'battle-fighter';
                fighter.textContent = link.textContent;
                
                // Add health bar
                const healthBar = document.createElement('div');
                healthBar.className = 'health-bar';
                const healthBarFill = document.createElement('div');
                healthBarFill.className = 'health-bar-fill';
                healthBar.appendChild(healthBarFill);
                fighter.appendChild(healthBar);
                
                // Assign to a team (for colors)
                const teamNumber = (index % 3) + 1;
                fighter.classList.add(`team-${teamNumber}`);
                
                // Add to battle arena
                battleArena.appendChild(fighter);
                
                // Store original link for reference
                fighter.originalLink = link;
                
                // Set initial position (random on screen)
                const randomX = Math.random() * (window.innerWidth - 150);
                const randomY = Math.random() * (window.innerHeight - 50);
                fighter.style.left = `${randomX}px`;
                fighter.style.top = `${randomY}px`;
                
                // Set fighter properties
                const fighterObj = {
                    element: fighter,
                    originalLink: link,
                    x: randomX,
                    y: randomY,
                    targetX: randomX,
                    targetY: randomY,
                    speed: 2 + Math.random() * 2,
                    health: 100,
                    team: teamNumber,
                    state: 'roaming', // roaming, attacking, returning
                    target: null,
                    lastAttack: 0,
                    victories: 0
                };
                
                fighters.push(fighterObj);
            });
            
            // Start the battle
            startBattle(fighters);
        }
        
        // Start the epic battle
        function startBattle(fighters) {
            // Animation loop
            let battleActive = true;
            let lastTime = 0;
            
            function animate(timestamp) {
                // Calculate delta time
                const deltaTime = timestamp - lastTime;
                lastTime = timestamp;
                
                // Update all fighters
                fighters.forEach(fighter => {
                    updateFighter(fighter, fighters, deltaTime);
                });
                
                // Continue animation if battle is active
                if (battleActive) {
                    requestAnimationFrame(animate);
                }
            }
            
            // Start animation
            requestAnimationFrame(animate);
            
            // End battle when mouse moves
            let mouseTimeout;
            document.addEventListener('mousemove', () => {
                clearTimeout(mouseTimeout);
                
                mouseTimeout = setTimeout(() => {
                    if (battleActive) {
                        endBattle();
                    }
                }, 500);
            });
            
            // End battle function
            function endBattle() {
                battleActive = false;
                
                // Show return message
                returnMessage.classList.add('show');
                
                // Return fighters to their original positions
                fighters.forEach(fighter => {
                    fighter.state = 'returning';
                    
                    // Get original position
                    const linkRect = fighter.originalLink.getBoundingClientRect();
                    fighter.targetX = linkRect.left;
                    fighter.targetY = linkRect.top;
                    
                    // Increase speed for returning
                    fighter.speed = 10;
                });
                
                // Final animation to return to positions
                function returnAnimation() {
                    let allReturned = true;
                    
                    fighters.forEach(fighter => {
                        if (fighter.state === 'returning') {
                            // Move towards original position
                            const dx = fighter.targetX - fighter.x;
                            const dy = fighter.targetY - fighter.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance > 5) {
                                allReturned = false;
                                
                                fighter.x += (dx / distance) * fighter.speed;
                                fighter.y += (dy / distance) * fighter.speed;
                                
                                fighter.element.style.left = `${fighter.x}px`;
                                fighter.element.style.top = `${fighter.y}px`;
                            } else {
                                // Fighter has returned
                                fighter.state = 'returned';
                                fighter.element.classList.add('home');
                            }
                        }
                    });
                    
                    if (allReturned) {
                        // All fighters have returned
                        setTimeout(() => {
                            // Remove battle elements
                            battleArena.remove();
                            returnMessage.remove();
                            
                            // Restore original nav links
                            fighters.forEach(fighter => {
                                fighter.element.remove();
                            });
                        }, 500);
                    } else {
                        requestAnimationFrame(returnAnimation);
                    }
                }
                
                // Start return animation after a delay
                setTimeout(() => {
                    returnAnimation();
                    
                    // Hide return message after a delay
                    setTimeout(() => {
                        returnMessage.classList.remove('show');
                    }, 2000);
                }, 1500);
            }
        }
        
        // Update fighter position and state
        function updateFighter(fighter, allFighters, deltaTime) {
            // Skip if fighter is returned
            if (fighter.state === 'returned') return;
            
            // Update position based on current state
            if (fighter.state === 'roaming') {
                // Move towards target
                const dx = fighter.targetX - fighter.x;
                const dy = fighter.targetY - fighter.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 5) {
                    fighter.x += (dx / distance) * fighter.speed;
                    fighter.y += (dy / distance) * fighter.speed;
                } else {
                    // Set new random target
                    fighter.targetX = Math.random() * (window.innerWidth - 150);
                    fighter.targetY = Math.random() * (window.innerHeight - 50);
                    
                    // Occasionally look for an opponent
                    if (Math.random() < 0.05) {
                        findOpponent(fighter, allFighters);
                    }
                }
            } else if (fighter.state === 'attacking') {
                // Check if target still exists and has health
                if (!fighter.target || fighter.target.health <= 0) {
                    fighter.state = 'roaming';
                    fighter.target = null;
                    return;
                }
                
                // Move towards target
                const targetX = fighter.target.x;
                const targetY = fighter.target.y;
                
                const dx = targetX - fighter.x;
                const dy = targetY - fighter.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 60) {
                    // Move towards target
                    fighter.x += (dx / distance) * fighter.speed;
                    fighter.y += (dy / distance) * fighter.speed;
                } else {
                    // In attack range - perform attack
                    const now = Date.now();
                    if (now - fighter.lastAttack > 2000) {
                        performAttack(fighter, fighter.target);
                        fighter.lastAttack = now;
                    }
                }
            }
            
            // Update element position
            fighter.element.style.left = `${fighter.x}px`;
            fighter.element.style.top = `${fighter.y}px`;
        }
        
        // Find an opponent to attack
        function findOpponent(fighter, allFighters) {
            // Find fighters from different teams
            const opponents = allFighters.filter(opponent => 
                opponent.team !== fighter.team && 
                opponent.health > 0 &&
                opponent.state !== 'returning' &&
                opponent.state !== 'returned'
            );
            
            if (opponents.length > 0) {
                // Select random opponent
                const randomIndex = Math.floor(Math.random() * opponents.length);
                fighter.target = opponents[randomIndex];
                fighter.state = 'attacking';
                fighter.element.classList.add('attacking');
                
                // Create battle text
                createBattleText(fighter.element, "Target acquired!", fighter.x + 20, fighter.y - 20);
            }
        }
        
        // Perform attack on target
        function performAttack(attacker, defender) {
            // Determine attack type
            const attackType = Math.random();
            let attackName, defenderAction, damage;
            
            if (attackType < 0.4) {
                attackName = 'punch';
                defenderAction = Math.random() < 0.3 ? 'dodge' : 'damaged';
                damage = defenderAction === 'dodge' ? 0 : 10;
            } else if (attackType < 0.7) {
                attackName = 'kick';
                defenderAction = Math.random() < 0.2 ? 'dodge' : 'damaged';
                damage = defenderAction === 'dodge' ? 0 : 15;
            } else if (attackType < 0.85) {
                attackName = 'spin';
                defenderAction = 'damaged';
                damage = 12;
            } else {
                attackName = 'jump';
                defenderAction = 'damaged';
                damage = 20;
            }
            
            // Apply attack animation
            attacker.element.classList.remove('punch', 'kick', 'spin', 'jump');
            defender.element.classList.remove('dodge', 'damaged');
            
            // Force reflow
            void attacker.element.offsetWidth;
            void defender.element.offsetWidth;
            
            // Add attack/defense classes
            attacker.element.classList.add(attackName);
            defender.element.classList.add(defenderAction);
            
            // Create battle text for attack
            createBattleText(attacker.element, attackName.charAt(0).toUpperCase() + attackName.slice(1) + "!", 
                attacker.x + 20, attacker.y - 20);
            
            // Create battle text for defense
            if (defenderAction === 'dodge') {
                createBattleText(defender.element, "Dodged!", defender.x + 20, defender.y - 20);
            } else {
                createBattleText(defender.element, "-" + damage, defender.x + 20, defender.y - 20);
            }
            
            // Create impact effect if hit lands
            if (defenderAction === 'damaged') {
                const impactX = (attacker.x + defender.x) / 2;
                const impactY = (attacker.y + defender.y) / 2;
                createBattleImpact(impactX, impactY);
                
                // Create particles
                createBattleParticles(impactX, impactY, 8);
                
                // Apply damage
                defender.health -= damage;
                
                // Update health bar
                const healthBar = defender.element.querySelector('.health-bar-fill');
                healthBar.style.width = `${Math.max(0, defender.health)}%`;
                
                // Check if defender is defeated
                if (defender.health <= 0) {
                    defeatFighter(defender, attacker);
                }
            }
            
            // Remove classes after animation completes
            setTimeout(() => {
                attacker.element.classList.remove(attackName);
                defender.element.classList.remove(defenderAction);
            }, 700);
        }
        
        // Handle fighter defeat
        function defeatFighter(defeated, victor) {
            // Update states
            defeated.state = 'roaming';
            defeated.target = null;
            victor.state = 'roaming';
            victor.target = null;
            victor.victories++;
            
            // Create victory text
            createBattleText(victor.element, "Victory!", victor.x + 20, victor.y - 40);
            
            // Reset defeated fighter
            setTimeout(() => {
                // Move to random position
                defeated.x = Math.random() * (window.innerWidth - 150);
                defeated.y = Math.random() * (window.innerHeight - 50);
                defeated.element.style.left = `${defeated.x}px`;
                defeated.element.style.top = `${defeated.y}px`;
                
                // Reset health
                defeated.health = 100;
                const healthBar = defeated.element.querySelector('.health-bar-fill');
                healthBar.style.width = '100%';
                
                // Create respawn text
                createBattleText(defeated.element, "Respawned!", defeated.x + 20, defeated.y - 20);
            }, 1000);
        }
        
        // Create battle text
        function createBattleText(parent, text, x, y) {
            const battleText = document.createElement('div');
            battleText.className = 'battle-text';
            battleText.textContent = text;
            
            // Position text
            battleText.style.left = `${x}px`;
            battleText.style.top = `${y}px`;
            
            // Add to battle arena
            document.querySelector('.battle-arena').appendChild(battleText);
            
            // Remove after animation completes
            setTimeout(() => {
                battleText.remove();
            }, 1000);
        }
        
        // Create battle impact effect
        function createBattleImpact(x, y) {
            const impact = document.createElement('div');
            impact.className = 'battle-impact';
            
            // Position impact
            impact.style.left = `${x - 20}px`;
            impact.style.top = `${y - 20}px`;
            
            // Add to battle arena
            document.querySelector('.battle-arena').appendChild(impact);
            
            // Remove after animation completes
            setTimeout(() => {
                impact.remove();
            }, 500);
        }
        
        // Create battle particles
        function createBattleParticles(x, y, count) {
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'battle-particle';
                
                // Position particle
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                // Random color based on team
                const teamColors = ['#81C784', '#64B5F6', '#E57373'];
                const colorIndex = Math.floor(Math.random() * teamColors.length);
                particle.style.backgroundColor = teamColors[colorIndex];
                
                // Random size
                const size = 4 + Math.random() * 6;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random direction animation
                const angle = Math.random() * Math.PI * 2;
                const distance = 30 + Math.random() * 50;
                const duration = 0.5 + Math.random() * 0.5;
                
                // Custom animation with random direction
                const keyframes = `
                    @keyframes battleParticle${Date.now()}${i} {
                        0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
                        100% { transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0); opacity: 0; }
                    }
                `;
                
                // Add keyframes
                const styleSheet = document.createElement('style');
                styleSheet.textContent = keyframes;
                document.head.appendChild(styleSheet);
                
                // Apply animation
                particle.style.animation = `battleParticle${Date.now()}${i} ${duration}s forwards ease-out`;
                
                // Add to battle arena
                document.querySelector('.battle-arena').appendChild(particle);
                
                // Remove after animation completes
                setTimeout(() => {
                    particle.remove();
                    styleSheet.remove();
                }, duration * 1000);
            }
        }
        
        console.log("Epic nav battle initialized");
    }
}); 