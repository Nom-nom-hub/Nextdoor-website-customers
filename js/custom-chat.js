// Custom Chat Widget for Designs by Teck
document.addEventListener('DOMContentLoaded', function() {
    // Create chat widget elements
    const chatWidgetHTML = `
        <div class="chat-widget">
            <div class="chat-button">
                <span class="chat-icon">💬</span>
                <span class="notification-badge" style="display: none;">0</span>
            </div>
            <div class="chat-container" style="display: none;">
                <div class="chat-header">
                    <h3>Chat with Designs by Teck</h3>
                    <button class="close-chat">×</button>
                </div>
                <div class="chat-status">
                    <span class="typing-indicator" style="display: none;">Teck is typing<span class="dots"><span>.</span><span>.</span><span>.</span></span></span>
                </div>
                <div class="chat-messages"></div>
                <div class="chat-toolbar">
                    <button class="toolbar-btn emoji-btn" title="Insert emoji">
                        <span>😊</span>
                    </button>
                    <button class="toolbar-btn attach-btn" title="Attach file">
                        <span>📎</span>
                    </button>
                    <div class="emoji-picker" style="display: none;">
                        <div class="emoji-grid">
                            <span class="emoji" data-emoji="😊">😊</span>
                            <span class="emoji" data-emoji="👍">👍</span>
                            <span class="emoji" data-emoji="🙏">🙏</span>
                            <span class="emoji" data-emoji="👋">👋</span>
                            <span class="emoji" data-emoji="🎉">🎉</span>
                            <span class="emoji" data-emoji="⭐">⭐</span>
                            <span class="emoji" data-emoji="💯">💯</span>
                            <span class="emoji" data-emoji="🔥">🔥</span>
                        </div>
                    </div>
                </div>
                <div class="chat-input-container">
                    <input type="text" class="chat-input" placeholder="Type your message...">
                    <button class="send-message">Send</button>
                </div>
                <div class="chat-footer">
                    <div class="powered-by">Powered by <strong>Designs by Teck</strong></div>
                    <button class="feedback-btn" title="Rate this conversation">
                        <span>⭐</span> Rate
                    </button>
                </div>
            </div>
            <div class="feedback-container" style="display: none;">
                <div class="feedback-header">
                    <h3>Rate your experience</h3>
                    <button class="close-feedback">×</button>
                </div>
                <div class="feedback-body">
                    <p>How would you rate your chat experience?</p>
                    <div class="rating">
                        <span class="star" data-rating="1">★</span>
                        <span class="star" data-rating="2">★</span>
                        <span class="star" data-rating="3">★</span>
                        <span class="star" data-rating="4">★</span>
                        <span class="star" data-rating="5">★</span>
                    </div>
                    <textarea class="feedback-text" placeholder="Tell us about your experience (optional)"></textarea>
                    <button class="submit-feedback">Submit Feedback</button>
                </div>
            </div>
        </div>
    `;

    // Insert chat widget into the page
    document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);

    // Get elements
    const chatButton = document.querySelector('.chat-button');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');
    const notificationBadge = document.querySelector('.notification-badge');
    const typingIndicator = document.querySelector('.typing-indicator');
    const emojiBtn = document.querySelector('.emoji-btn');
    const emojiPicker = document.querySelector('.emoji-picker');
    const emojis = document.querySelectorAll('.emoji');
    const attachBtn = document.querySelector('.attach-btn');
    const feedbackBtn = document.querySelector('.feedback-btn');
    const feedbackContainer = document.querySelector('.feedback-container');
    const closeFeedback = document.querySelector('.close-feedback');
    const stars = document.querySelectorAll('.star');
    const feedbackText = document.querySelector('.feedback-text');
    const submitFeedback = document.querySelector('.submit-feedback');

    // Chat state
    let unreadMessages = 0;
    let chatOpen = false;
    let clientId = localStorage.getItem('clientId');
    let userRating = 0;
    let typingTimeout = null;
    let deviceInfo = {
        device: navigator.userAgent.indexOf('Mobile') !== -1 ? 'Mobile' : 'Desktop',
        browser: getBrowserName(),
        os: getOSName()
    };

    // Generate a unique client ID if not exists
    if (!clientId) {
        clientId = 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('clientId', clientId);
    }

    // Load chat history
    function loadChatHistory() {
        const chatHistory = JSON.parse(localStorage.getItem(`chat_history_${clientId}`)) || [];
        chatMessages.innerHTML = '';

        chatHistory.forEach(message => {
            addMessageToChat(message.sender, message.text, message.timestamp, false);
        });

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Save message to history
    function saveMessageToHistory(sender, text, timestamp, messageId) {
        // Generate timestamp and ID if not provided
        timestamp = timestamp || new Date().toISOString();
        const msgId = messageId || 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        const chatHistory = JSON.parse(localStorage.getItem(`chat_history_${clientId}`)) || [];

        // Create message object with ID
        const messageObj = {
            sender,
            text,
            timestamp,
            id: msgId
        };

        chatHistory.push(messageObj);
        localStorage.setItem(`chat_history_${clientId}`, JSON.stringify(chatHistory));

        // Also save to all chats for admin dashboard
        const allChats = JSON.parse(localStorage.getItem('all_chats')) || {};
        if (!allChats[clientId]) {
            allChats[clientId] = {
                lastMessage: timestamp,
                unread: sender === 'client' ? 1 : 0,
                messages: []
            };
        }

        allChats[clientId].messages.push(messageObj);
        allChats[clientId].lastMessage = timestamp;

        if (sender === 'client') {
            allChats[clientId].unread = (allChats[clientId].unread || 0) + 1;
        }

        // Add lastUpdate timestamp to trigger change events
        allChats[clientId].lastUpdate = Date.now();

        localStorage.setItem('all_chats', JSON.stringify(allChats));

        // If this is a client message, create a notification for admin
        if (sender === 'client') {
            const notification = {
                clientId: clientId,
                messageId: msgId,
                timestamp: Date.now()
            };
            localStorage.setItem('new_client_message', JSON.stringify(notification));
        }

        return messageObj;
    }

    // Add message to chat
    function addMessageToChat(sender, text, timestamp, save = true, messageId = null) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;

        // Generate timestamp if not provided
        const msgTimestamp = timestamp || new Date().toISOString();
        const time = new Date(msgTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        messageElement.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        // Add message ID as data attribute for future reference
        if (messageId) {
            messageElement.setAttribute('data-message-id', messageId);
        }

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        let msgObj = null;
        if (save) {
            msgObj = saveMessageToHistory(sender, text, msgTimestamp, messageId);
            // Add the message ID to the element
            messageElement.setAttribute('data-message-id', msgObj.id);
        }

        // If it's an admin message and chat is not open, increment unread counter
        if (sender === 'admin' && !chatOpen) {
            unreadMessages++;
            updateNotificationBadge();
        }

        return msgObj;
    }

    // Update notification badge
    function updateNotificationBadge() {
        if (unreadMessages > 0) {
            notificationBadge.textContent = unreadMessages > 9 ? '9+' : unreadMessages;
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }

    // Send message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text) {
            addMessageToChat('client', text);
            chatInput.value = '';

            // Get current chat history to check if this is the first message
            const chatHistory = JSON.parse(localStorage.getItem(`chat_history_${clientId}`)) || [];

            // Only send automated response if this is the first client message
            if (chatHistory.filter(msg => msg.sender === 'client').length <= 1) {
                // Show typing indicator
                showTypingIndicator();

                setTimeout(() => {
                    // Hide typing indicator
                    hideTypingIndicator();

                    const response = "Thank you for contacting Designs by Teck. I'll review your message and get back to you.";
                    addMessageToChat('admin', response);
                }, 2000 + Math.random() * 1000);
            }
        }
    }

    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'inline-block';
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    // Toggle chat
    function toggleChat() {
        chatOpen = !chatOpen;
        chatContainer.style.display = chatOpen ? 'flex' : 'none';
        feedbackContainer.style.display = 'none';

        if (chatOpen) {
            loadChatHistory();
            unreadMessages = 0;
            updateNotificationBadge();
            chatInput.focus();

            // Add welcome message if no messages
            const chatHistory = JSON.parse(localStorage.getItem(`chat_history_${clientId}`)) || [];
            if (chatHistory.length === 0) {
                addMessageToChat('admin', 'Hi there! Welcome to Designs by Teck. How can I help you today?');
            }

            // Save session info
            saveSessionInfo();
        }
    }

    // Save session information
    function saveSessionInfo() {
        const sessionInfo = {
            clientId,
            device: deviceInfo,
            startTime: new Date().toISOString(),
            referrer: document.referrer,
            url: window.location.href
        };

        // Save to localStorage
        localStorage.setItem(`session_info_${clientId}`, JSON.stringify(sessionInfo));

        // Also save to all_chats for admin dashboard
        const allChats = JSON.parse(localStorage.getItem('all_chats')) || {};
        if (allChats[clientId]) {
            allChats[clientId].sessionInfo = sessionInfo;
            localStorage.setItem('all_chats', JSON.stringify(allChats));
        }
    }

    // Get browser name
    function getBrowserName() {
        const userAgent = navigator.userAgent;
        let browser = "Unknown";

        if (userAgent.indexOf("Firefox") > -1) {
            browser = "Firefox";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            browser = "Opera";
        } else if (userAgent.indexOf("Edge") > -1) {
            browser = "Edge";
        } else if (userAgent.indexOf("Chrome") > -1) {
            browser = "Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
            browser = "Safari";
        }

        return browser;
    }

    // Get OS name
    function getOSName() {
        const userAgent = navigator.userAgent;
        let os = "Unknown";

        if (userAgent.indexOf("Win") > -1) {
            os = "Windows";
        } else if (userAgent.indexOf("Mac") > -1) {
            os = "MacOS";
        } else if (userAgent.indexOf("Linux") > -1) {
            os = "Linux";
        } else if (userAgent.indexOf("Android") > -1) {
            os = "Android";
        } else if (userAgent.indexOf("iOS") > -1 || userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
            os = "iOS";
        }

        return os;
    }

    // Event listeners
    chatButton.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    sendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Show typing indicator when user is typing
    chatInput.addEventListener('input', function() {
        // Save typing status to localStorage
        const typingStatus = {
            clientId,
            isTyping: true,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(`typing_status_${clientId}`, JSON.stringify(typingStatus));
    });

    // Emoji picker
    emojiBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
    });

    emojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            const emojiChar = this.getAttribute('data-emoji');
            chatInput.value += emojiChar;
            emojiPicker.style.display = 'none';
            chatInput.focus();
        });
    });

    // Close emoji picker when clicking outside
    document.addEventListener('click', function(e) {
        if (emojiPicker.style.display === 'block' && !emojiPicker.contains(e.target) && e.target !== emojiBtn) {
            emojiPicker.style.display = 'none';
        }
    });

    // Attach file button
    attachBtn.addEventListener('click', function() {
        alert('File attachment feature coming soon!');
    });

    // Feedback system
    feedbackBtn.addEventListener('click', function() {
        feedbackContainer.style.display = 'block';
    });

    closeFeedback.addEventListener('click', function() {
        feedbackContainer.style.display = 'none';
    });

    stars.forEach(star => {
        star.addEventListener('click', function() {
            userRating = parseInt(this.getAttribute('data-rating'));

            // Update UI
            stars.forEach(s => {
                const rating = parseInt(s.getAttribute('data-rating'));
                if (rating <= userRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));

            stars.forEach(s => {
                const rating = parseInt(s.getAttribute('data-rating'));
                if (rating <= hoverRating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });

        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });

    submitFeedback.addEventListener('click', function() {
        if (userRating === 0) {
            alert('Please select a rating');
            return;
        }

        // Save feedback
        const feedback = {
            clientId,
            rating: userRating,
            comment: feedbackText.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        const allFeedback = JSON.parse(localStorage.getItem('chat_feedback')) || [];
        allFeedback.push(feedback);
        localStorage.setItem('chat_feedback', JSON.stringify(allFeedback));

        // Also save to all_chats for admin dashboard
        const allChats = JSON.parse(localStorage.getItem('all_chats')) || {};
        if (allChats[clientId]) {
            allChats[clientId].feedback = feedback;
            localStorage.setItem('all_chats', JSON.stringify(allChats));
        }

        // Reset and close
        userRating = 0;
        feedbackText.value = '';
        stars.forEach(s => s.classList.remove('active'));
        feedbackContainer.style.display = 'none';

        // Show thank you message
        addMessageToChat('admin', 'Thank you for your feedback! We appreciate your input.');
    });

    // Check for new messages every 300ms (more responsive)
    setInterval(() => {
        // First check for direct notification
        const notification = localStorage.getItem('new_message_notification');
        if (notification) {
            try {
                const notificationData = JSON.parse(notification);

                // Check if this notification is for this client and is recent (within last 5 seconds)
                const notificationTime = notificationData.timestamp;
                const currentTime = Date.now();

                if (notificationData.clientId === clientId && (currentTime - notificationTime < 5000)) {
                    // Get the latest chat data
                    const allChats = JSON.parse(localStorage.getItem('all_chats')) || {};
                    const clientChat = allChats[clientId] || { unread: 0, messages: [] };

                    // Find the specific message by ID
                    const newMessage = clientChat.messages.find(msg => msg.id === notificationData.messageId);

                    if (newMessage && newMessage.sender === 'admin') {
                        // Get current chat history
                        const currentHistory = JSON.parse(localStorage.getItem(`chat_history_${clientId}`)) || [];

                        // Check if this message is already in the history
                        const exists = currentHistory.some(m => m.id === newMessage.id);

                        if (!exists) {
                            // Show typing indicator briefly before showing the message
                            showTypingIndicator();

                            setTimeout(() => {
                                // Hide typing indicator
                                hideTypingIndicator();

                                // Add to UI and save to history
                                addMessageToChat('admin', newMessage.text, newMessage.timestamp);

                                // If chat is not open, increment unread counter
                                if (!chatOpen) {
                                    unreadMessages++;
                                    updateNotificationBadge();
                                }

                                // Play notification sound if available
                                const notificationSound = document.getElementById('chat-notification');
                                if (notificationSound) {
                                    notificationSound.play().catch(e => console.log('Sound play prevented by browser'));
                                }

                                // Update local storage with the latest messages
                                localStorage.setItem(`chat_history_${clientId}`, JSON.stringify(clientChat.messages));
                            }, 800);
                        }
                    }
                }
            } catch (e) {
                console.error('Error parsing notification:', e);
            }
        }

        // Fallback: Get the latest chat data directly from localStorage
        const allChats = JSON.parse(localStorage.getItem('all_chats')) || {};
        const clientChat = allChats[clientId] || { unread: 0, messages: [] };

        // Get current chat history
        const currentHistory = JSON.parse(localStorage.getItem(`chat_history_${clientId}`)) || [];

        // Check for new messages by comparing message IDs
        if (clientChat.messages && clientChat.messages.length > 0) {
            // Process all admin messages that aren't in the current history
            clientChat.messages.forEach(message => {
                if (message.sender === 'admin' && message.id) {
                    // Check if this message is already in the history by ID
                    const exists = currentHistory.some(m => m.id === message.id);

                    if (!exists) {
                        // Show typing indicator briefly before showing the message
                        showTypingIndicator();

                        setTimeout(() => {
                            // Hide typing indicator
                            hideTypingIndicator();

                            // Add to UI and save to history
                            addMessageToChat('admin', message.text, message.timestamp);

                            // If chat is not open, increment unread counter
                            if (!chatOpen) {
                                unreadMessages++;
                                updateNotificationBadge();
                            }

                            // Play notification sound if available
                            const notificationSound = document.getElementById('chat-notification');
                            if (notificationSound) {
                                notificationSound.play().catch(e => console.log('Sound play prevented by browser'));
                            }
                        }, 800);
                    }
                }
            });

            // Update local storage with the latest messages
            localStorage.setItem(`chat_history_${clientId}`, JSON.stringify(clientChat.messages));
        }

        // Also check for typing status from admin
        const adminTyping = localStorage.getItem('admin_typing');
        if (adminTyping) {
            const typingData = JSON.parse(adminTyping);
            if (typingData.isTyping && typingData.forClient === clientId) {
                // Check if the typing status is recent (within last 3 seconds)
                const typingTime = new Date(typingData.timestamp).getTime();
                const currentTime = new Date().getTime();
                if (currentTime - typingTime < 3000) {
                    showTypingIndicator();
                } else {
                    hideTypingIndicator();
                }
            }
        }
    }, 300);
});
