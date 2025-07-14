// Simple browser-only chatbot widget
(function() {
  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
  .fake-chatbot-bubble {
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 60px;
    height: 60px;
    background: #20cfcf;
    border-radius: 50%;
    box-shadow: 0 4px 24px rgba(32,207,207,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 9999;
    transition: box-shadow 0.2s;
  }
  .fake-chatbot-bubble:hover {
    box-shadow: 0 8px 32px rgba(32,207,207,0.28);
  }
  .fake-chatbot-window {
    position: fixed;
    bottom: 110px;
    right: 32px;
    width: 340px;
    max-width: 95vw;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(32,207,207,0.18), 0 1.5px 0 #20cfcf;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: inherit;
    animation: chatbot-pop 0.22s cubic-bezier(.6,-0.28,.74,1.13);
  }
  @keyframes chatbot-pop {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .fake-chatbot-header {
    background: #20cfcf;
    color: #fff;
    padding: 16px 20px;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fake-chatbot-close {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.3rem;
    cursor: pointer;
    margin-left: 8px;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .fake-chatbot-close:hover {
    opacity: 1;
  }
  .fake-chatbot-body {
    padding: 18px 18px 12px 18px;
    background: #f8f9fa;
    min-height: 120px;
    max-height: 260px;
    overflow-y: auto;
    font-size: 1rem;
    color: #222;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .fake-chatbot-question-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 8px;
  }
  .fake-chatbot-question-btn {
    background: #e6f8f8;
    color: #179e9e;
    border: 1.5px solid #20cfcf;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 1rem;
    cursor: pointer;
    text-align: left;
    transition: background 0.18s, color 0.18s;
    outline: none;
  }
  .fake-chatbot-question-btn:hover, .fake-chatbot-question-btn:focus {
    background: #20cfcf;
    color: #fff;
  }
  .fake-chatbot-message {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    line-height: 1.5;
  }
  .fake-chatbot-bot {
    color: #179e9e;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .fake-chatbot-user {
    color: #333;
    font-weight: 500;
    margin-bottom: 2px;
  }
  `;
  document.head.appendChild(style);

  // Remove/hide any old chat widget on the left
  const oldChatSelectors = ['.chat-widget', '#chat-widget', '.old-chat-bubble'];
  oldChatSelectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.style.display = 'none';
  });

  // Update styles for left-side placement
  style.textContent += `
  .fake-chatbot-bubble {
    left: 32px !important;
    right: auto !important;
  }
  .fake-chatbot-window {
    left: 32px !important;
    right: auto !important;
  }
  @media (max-width: 600px) {
    .fake-chatbot-bubble, .fake-chatbot-window {
      left: 10px !important;
      right: auto !important;
    }
  }

  /* Dark mode styles */
  body.dark-mode .fake-chatbot-bubble {
    background: #179e9e;
    box-shadow: 0 4px 24px rgba(32,207,207,0.28);
  }
  body.dark-mode .fake-chatbot-window {
    background: #181b1f;
    color: #e0e0e0;
    box-shadow: 0 8px 32px rgba(32,207,207,0.22), 0 1.5px 0 #179e9e;
    border: none;
  }
  body.dark-mode .fake-chatbot-header {
    background: #179e9e;
    color: #fff;
  }
  body.dark-mode .fake-chatbot-body {
    background: #23272a;
    color: #e0e0e0;
  }
  body.dark-mode .fake-chatbot-question-btn {
    background: #23272a;
    color: #20cfcf;
    border: 1.5px solid #179e9e;
  }
  body.dark-mode .fake-chatbot-question-btn:hover,
  body.dark-mode .fake-chatbot-question-btn:focus {
    background: #179e9e;
    color: #fff;
  }
  body.dark-mode .fake-chatbot-message {
    color: #e0e0e0;
  }
  body.dark-mode .fake-chatbot-bot {
    color: #20cfcf;
  }
  body.dark-mode .fake-chatbot-user {
    color: #fff;
  }
  body.dark-mode .fake-chatbot-close {
    color: #fff;
    opacity: 0.8;
  }
  body.dark-mode .fake-chatbot-close:hover {
    opacity: 1;
  }
  `;

  // Question/answer pairs
  const qaPairs = [
    {
      q: "What are your business hours?",
      a: "We're available online 24/7! Our team replies to messages as soon as possible."
    },
    {
      q: "How can I contact support?",
      a: "You can email us at <a href='mailto:support@designsbyteck.com'>support@designsbyteck.com</a> or use this chat for quick questions."
    },
    {
      q: "Do you offer custom website design?",
      a: "Absolutely! We specialize in custom website design. Let us know your needs and we'll create a tailored solution."
    },
    {
      q: "How much does a website cost?",
      a: "Our pricing depends on your requirements. Contact us for a free quote!"
    },
    {
      q: "Can I see examples of your work?",
      a: "Of course! Check out our <a href='https://designsbyteck.com/#portfolio' target='_blank'>portfolio</a> for recent projects."
    },
    {
      q: "How long does it take to build a website?",
      a: "Most projects take 2-6 weeks depending on complexity. We'll provide a timeline after our initial consultation."
    }
  ];

  // Create chat bubble
  const bubble = document.createElement('div');
  bubble.className = 'fake-chatbot-bubble';
  bubble.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  document.body.appendChild(bubble);

  // Create chat window
  let windowOpen = false;
  const chatWindow = document.createElement('div');
  chatWindow.className = 'fake-chatbot-window';
  chatWindow.style.display = 'none';
  chatWindow.innerHTML = `
    <div class="fake-chatbot-header">
      <span>Chat with us!</span>
      <button class="fake-chatbot-close" aria-label="Close chat">&times;</button>
    </div>
    <div class="fake-chatbot-body">
      <div class="fake-chatbot-message fake-chatbot-bot">👋 Hi! How can I help you today?</div>
      <div class="fake-chatbot-question-list"></div>
    </div>
  `;
  document.body.appendChild(chatWindow);

  // Populate question buttons
  const questionList = chatWindow.querySelector('.fake-chatbot-question-list');
  qaPairs.forEach((pair, idx) => {
    const btn = document.createElement('button');
    btn.className = 'fake-chatbot-question-btn';
    btn.innerText = pair.q;
    btn.onclick = function() {
      // Show user question
      const userMsg = document.createElement('div');
      userMsg.className = 'fake-chatbot-message fake-chatbot-user';
      userMsg.innerText = pair.q;
      questionList.parentNode.appendChild(userMsg);
      // Show bot answer
      const botMsg = document.createElement('div');
      botMsg.className = 'fake-chatbot-message fake-chatbot-bot';
      botMsg.innerHTML = pair.a;
      questionList.parentNode.appendChild(botMsg);
      // Remove question list after selection
      questionList.style.display = 'none';
    };
    questionList.appendChild(btn);
  });

  // --- ULTIMATE JAVASCRIPT STYLE ENFORCEMENT ---
  function forceChatbotDarkModeJS() {
    const isDark = document.body.classList.contains('dark-mode');
    console.log('[Chatbot] Forcing dark mode:', isDark);
    // Bubble
    bubble.style.background = isDark ? '#179e9e' : '#20cfcf';
    // Window
    chatWindow.style.background = isDark ? '#181b1f' : '#fff';
    chatWindow.style.color = isDark ? '#e0e0e0' : '#222';
    // Header
    const header = chatWindow.querySelector('.fake-chatbot-header');
    if (header) {
      header.style.background = isDark ? '#179e9e' : '#20cfcf';
      header.style.color = '#fff';
    }
    // Body
    const body = chatWindow.querySelector('.fake-chatbot-body');
    if (body) {
      body.style.background = isDark ? '#23272a' : '#f8f9fa';
      body.style.color = isDark ? '#e0e0e0' : '#222';
    }
    // Question buttons
    chatWindow.querySelectorAll('.fake-chatbot-question-btn').forEach(btn => {
      btn.style.background = isDark ? '#23272a' : '#e6f8f8';
      btn.style.color = isDark ? '#20cfcf' : '#179e9e';
      btn.style.border = isDark ? '1.5px solid #179e9e' : '1.5px solid #20cfcf';
    });
    // Messages
    chatWindow.querySelectorAll('.fake-chatbot-message').forEach(msg => {
      msg.style.background = 'transparent';
      msg.style.color = isDark ? '#e0e0e0' : '#222';
    });
    chatWindow.querySelectorAll('.fake-chatbot-bot').forEach(msg => {
      msg.style.color = isDark ? '#20cfcf' : '#179e9e';
    });
    chatWindow.querySelectorAll('.fake-chatbot-user').forEach(msg => {
      msg.style.color = isDark ? '#fff' : '#333';
    });
  }

  // Observe body class changes for dark mode toggle
  const observer = new MutationObserver(forceChatbotDarkModeJS);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  // Initial theme sync
  forceChatbotDarkModeJS();

  // Also apply theme every time the chat window is opened (to catch new elements)
  bubble.onclick = function() {
    chatWindow.style.display = windowOpen ? 'none' : 'flex';
    windowOpen = !windowOpen;
    if (windowOpen) forceChatbotDarkModeJS();
  };
  chatWindow.querySelector('.fake-chatbot-close').onclick = function() {
    chatWindow.style.display = 'none';
    windowOpen = false;
  };

  // Change bubble and window placement to left
  bubble.style.left = '32px';
  bubble.style.right = 'auto';
  chatWindow.style.left = '32px';
  chatWindow.style.right = 'auto';
})(); 