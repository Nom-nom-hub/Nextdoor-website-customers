/**
 * Advanced Live Chat Widget with WebSocket Support
 * 
 * This script provides real-time chat functionality using WebSockets
 * and includes features like typing indicators, read receipts,
 * and message history.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Chat elements
    const chatWidget = document.querySelector('.chat-widget');
    const chatButton = document.querySelector('.chat-button');
    const chatContainer = document.querySelector('.chat-container');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    const closeButton = document.querySelector('.close-chat');
    
    // Chat state
    let socket;
    let chatHistory = [];
    let clientId = generateClientId();
    let agentTyping = false;
    let userTyping = false;
    let typingTimeout;
    
    // Initialize chat
    initChat();
    
    function initChat() {
        // Show/hide chat window
        if (chatButton) {
            chatButton.addEventListener('click', function() {
                chatContainer.classList.add('active');
                chatButton.style.display = 'none';
                
                // Mark messages as read when chat is opened
                markMessagesAsRead();
                
                // Focus on input
                setTimeout(() => chatInput.focus(), 300);
                
                // Connect to WebSocket if not already connected
                connectWebSocket();
            });
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                chatContainer.classList.remove('active');
                chatButton.style.display = 'flex';
            });
        }
        
        // Send message events
        if (sendButton) {
            sendButton.addEventListener('click', sendMessage);
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                } else {
                    // Send typing indicator
                    sendTypingIndicator();
                }
            });
            
            // Detect when user stops typing
            chatInput.addEventListener('keyup', function() {
                clearTimeout(typingTimeout);
                typingTimeout = setTimeout(() => {
                    if (userTyping) {
                        userTyping = false;
                        sendTypingStop();
                    }
                }, 1000);
            });
        }
        
        // Load chat history from localStorage
        loadChatHistory();
        
        // Check for unread messages
        checkUnreadMessages();
        
        // Add notification badge if there are unread messages
        updateNotificationBadge();
    }
    
    function connectWebSocket() {
        // Replace with your actual WebSocket server URL
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${wsProtocol}//${window.location.hostname}:8080/chat`;
        
        try {
            socket = new WebSocket(wsUrl);
            
            socket.onopen = function() {
                console.log('WebSocket connected');
                
                // Send client info
                socket.send(JSON.stringify({
                    type: 'init',
                    clientId: clientId,
                    pageUrl: window.location.href,
                    referrer: document.referrer
                }));
                
                // Add welcome message if chat history is empty
                if (chatHistory.length === 0) {
                    setTimeout(() => {
                        addMessage({
                            id: generateMessageId(),
                            sender: 'admin',
                            text: 'Hi there! How can I help you today?',
                            timestamp: new Date().toISOString(),
                            read: true
                        });
                    }, 1000);
                }
            };
            
            socket.onmessage = function(event) {
                const data = JSON.parse(event.data);
                
                switch(data.type) {
                    case 'message':
                        addMessage(data.message);
                        break;
                    case 'typing':
                        showAgentTypingIndicator();
                        break;
                    case 'typingStop':
                        hideAgentTypingIndicator();
                        break;
                    case 'messageRead':
                        updateMessageReadStatus(data.messageId);
                        break;
                }
            };
            
            socket.onclose = function() {
                console.log('WebSocket disconnected');
                // Try to reconnect after 5 seconds
                setTimeout(connectWebSocket, 5000);
            };
            
            socket.onerror = function(error) {
                console.error('WebSocket error:', error);
                // Fall back to AJAX if WebSocket fails
                fallbackToAjax();
            };
        } catch (error) {
            console.error('WebSocket connection error:', error);
            fallbackToAjax();
        }
    }
    
    function fallbackToAjax() {
        console.log('Falling back to AJAX for chat');
        // Implement AJAX fallback here
    }
    
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;
        
        // Clear input
        chatInput.value = '';
        
        // Stop typing indicator
        if (userTyping) {
            userTyping = false;
            sendTypingStop();
        }
        
        // Create message object
        const message = {
            id: generateMessageId(),
            sender: 'user',
            text: messageText,
            timestamp: new Date().toISOString(),
            read: false
        };
        
        // Add message to UI
        addMessage(message);
        
        // Send message via WebSocket
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: 'message',
                message: message
            }));
        } else {
            // Fallback to AJAX
            sendMessageViaAjax(message);
            
            // Simulate response for demo purposes
            simulateResponse(message);
        }
    }
    
    function sendMessageViaAjax(message) {
        // Implement AJAX fallback for sending messages
        fetch('/api/chat/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                message: message
            })
        }).catch(error => console.error('Error sending message:', error));
    }
    
    function addMessage(message) {
        // Add to chat history
        chatHistory.push(message);
        saveChatHistory();
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}-message`;
        messageElement.dataset.messageId = message.id;
        
        // Message content
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message.text;
        
        // Message timestamp
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = formatTime(new Date(message.timestamp));
        
        // Add read indicator for user messages
        if (message.sender === 'user') {
            const readStatus = document.createElement('div');
            readStatus.className = 'read-status';
            readStatus.innerHTML = message.read ? 
                '<i class="fas fa-check-double"></i>' : 
                '<i class="fas fa-check"></i>';
            messageElement.appendChild(readStatus);
        }
        
        // Assemble message
        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageTime);
        
        // Add to chat
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        scrollToBottom();
        
        // Update notification badge
        updateNotificationBadge();
    }
    
    function simulateResponse(userMessage) {
        // Show typing indicator
        showAgentTypingIndicator();
        
        // Simulate delay and response
        setTimeout(() => {
            // Hide typing indicator
            hideAgentTypingIndicator();
            
            // Simple response logic (replace with actual backend response)
            let responseText;
            const lowerMessage = userMessage.text.toLowerCase();
            
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                responseText = "Hello! How can I help you today?";
            } else if (lowerMessage.includes('pricing') || lowerMessage.includes('cost')) {
                responseText = "Our pricing starts at $99 for basic websites. Would you like to see our full pricing page?";
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
                responseText = "You can reach us at ftwenty903@gmail.com or through this chat!";
            } else if (lowerMessage.includes('time') || lowerMessage.includes('long')) {
                responseText = "Most projects take 2-4 weeks to complete, depending on complexity.";
            } else {
                responseText = "Thanks for your message! I'll get back to you shortly. If you need immediate assistance, please email me at ftwenty903@gmail.com.";
            }
            
            // Create response message
            const responseMessage = {
                id: generateMessageId(),
                sender: 'admin',
                text: responseText,
                timestamp: new Date().toISOString(),
                read: true
            };
            
            // Add message to UI
            addMessage(responseMessage);
            
            // Mark user message as read
            updateMessageReadStatus(userMessage.id);
        }, 1500 + Math.random() * 1000);
    }
    
    function showAgentTypingIndicator() {
        if (agentTyping) return;
        
        agentTyping = true;
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        
        const typingContainer = document.createElement('div');
        typingContainer.className = 'message admin-message typing';
        typingContainer.appendChild(typingIndicator);
        
        chatMessages.appendChild(typingContainer);
        scrollToBottom();
    }
    
    function hideAgentTypingIndicator() {
        if (!agentTyping) return;
        
        agentTyping = false;
        const typingElement = chatMessages.querySelector('.typing');
        if (typingElement) {
            chatMessages.removeChild(typingElement);
        }
    }
    
    function sendTypingIndicator() {
        if (userTyping) return;
        
        userTyping = true;
        
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: 'typing',
                clientId: clientId
            }));
        }
    }
    
    function sendTypingStop() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: 'typingStop',
                clientId: clientId
            }));
        }
    }
    
    function updateMessageReadStatus(messageId) {
        // Update in chat history
        const message = chatHistory.find(m => m.id === messageId);
        if (message) {
            message.read = true;
            saveChatHistory();
        }
        
        // Update in UI
        const messageElement = chatMessages.querySelector(`.message[data-message-id="${messageId}"]`);
        if (messageElement) {
            const readStatus = messageElement.querySelector('.read-status');
            if (readStatus) {
                readStatus.innerHTML = '<i class="fas fa-check-double"></i>';
            }
        }
    }
    
    function markMessagesAsRead() {
        chatHistory.forEach(message => {
            if (message.sender === 'admin' && !message.read) {
                message.read = true;
            }
        });
        saveChatHistory();
    }
    
    function checkUnreadMessages() {
        const unreadCount = chatHistory.filter(m => m.sender === 'admin' && !m.read).length;
        if (unreadCount > 0 && !chatContainer.classList.contains('active')) {
            // Add notification badge
            const badge = document.createElement('div');
            badge.className = 'notification-badge';
            badge.textContent = unreadCount;
            chatButton.appendChild(badge);
            
            // Add notification sound
            playNotificationSound();
        }
    }
    
    function updateNotificationBadge() {
        // Remove existing badge
        const existingBadge = chatButton.querySelector('.notification-badge');
        if (existingBadge) {
            chatButton.removeChild(existingBadge);
        }
        
        // Count unread messages
        const unreadCount = chatHistory.filter(m => m.sender === 'admin' && !m.read).length;
        
        // Add badge if there are unread messages and chat is not open
        if (unreadCount > 0 && !chatContainer.classList.contains('active')) {
            const badge = document.createElement('div');
            badge.className = 'notification-badge';
            badge.textContent = unreadCount;
            chatButton.appendChild(badge);
        }
    }
    
    function playNotificationSound() {
        const audio = new Audio('/sounds/notification.mp3');
        audio.play().catch(e => console.log('Error playing notification sound:', e));
    }
    
    function saveChatHistory() {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        } catch (e) {
            console.error('Error saving chat history:', e);
        }
    }
    
    function loadChatHistory() {
        try {
            const saved = localStorage.getItem('chatHistory');
            if (saved) {
                chatHistory = JSON.parse(saved);
                
                // Display messages
                chatHistory.forEach(message => {
                    addMessage(message);
                });
                
                // Scroll to bottom
                scrollToBottom();
            }
        } catch (e) {
            console.error('Error loading chat history:', e);
            chatHistory = [];
        }
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    function generateClientId() {
        // Try to get existing client ID
        let id = localStorage.getItem('chatClientId');
        if (!id) {
            // Generate a new ID
            id = 'client_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chatClientId', id);
        }
        return id;
    }
    
    function generateMessageId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }
});
