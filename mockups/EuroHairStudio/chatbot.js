// Euro Hair Studio Chatbot
const botData = {
  welcome: "Hi! I'm the Euro Hair Studio assistant. How can I help you today?",
  questions: [
    { q: "What services do you offer?", a: "We offer cutting & styling, coloring, keratin treatments, perms, and premium extensions. All services are performed by experienced stylists using the latest techniques and products." },
    { q: "Where are you located?", a: "We are located at 1715 Cape Coral Pkwy W, Cape Coral, FL." },
    { q: "What are your hours?", a: "We are open Tuesday to Saturday, 9am–7pm. We are closed on Sunday and Monday." },
    { q: "How do I book an appointment?", a: "You can book online using the 'Book Now' button, call us at (239) 555-1234, or use our contact form." },
    { q: "Who are the owners?", a: "Euro Hair Studio was launched in 2011 by Amira and her husband Jasmin Redzic. Amira is the lead stylist and salon owner." },
    { q: "Do you offer keratin treatments?", a: "Yes! We specialize in keratin treatments for smooth, shiny, frizz-free hair. Ask us for details or to book a consultation." },
    { q: "What makes you different?", a: "We are a full-service salon focused on hair fashion, with a vibrant, relaxed atmosphere and a passion for the latest trends and quality service." },
    { q: "Do you offer hair extensions?", a: "Yes, we offer premium extensions for length, volume, and natural-looking results." }
  ]
};

function createChatbot() {
  // Floating button
  const btn = document.createElement('button');
  btn.id = 'chatbot-btn';
  btn.innerHTML = '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15h8M9 9h.01M15 9h.01"/></svg>';
  btn.style.position = 'fixed';
  btn.style.bottom = '24px';
  btn.style.left = '24px';
  btn.style.zIndex = '1001';

  // Move chat button up if footer is visible
  function adjustChatBtn() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const rect = footer.getBoundingClientRect();
    const winH = window.innerHeight;
    if (rect.top < winH - 60) {
      btn.style.bottom = (winH - rect.top + 24) + 'px';
    } else {
      btn.style.bottom = '24px';
    }
  }
  window.addEventListener('scroll', adjustChatBtn);
  window.addEventListener('resize', adjustChatBtn);
  window.addEventListener('DOMContentLoaded', adjustChatBtn);
  btn.style.background = 'linear-gradient(135deg,#059669 0%,#a7f3d0 100%)';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '50%';
  btn.style.width = '56px';
  btn.style.height = '56px';
  btn.style.boxShadow = '0 4px 24px rgba(16,185,129,0.18)';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.cursor = 'pointer';
  btn.style.transition = 'background 0.2s';
  btn.title = 'Chat with us';

  // Chat window
  const chat = document.createElement('div');
  chat.id = 'chatbot-window';
  chat.style.position = 'fixed';
  chat.style.bottom = '90px';
  chat.style.right = '24px';
  chat.style.width = '340px';
  chat.style.maxWidth = '95vw';
  chat.style.background = 'rgba(255,255,255,0.98)';
  chat.style.borderRadius = '1.5rem';
  chat.style.boxShadow = '0 8px 32px rgba(16,185,129,0.18)';
  chat.style.zIndex = '1002';
  chat.style.display = 'none';
  chat.style.flexDirection = 'column';
  chat.style.overflow = 'hidden';
  chat.innerHTML = `
    <div id="chatbot-header" style="background:linear-gradient(90deg,#a7f3d0 0%,#f3f4f6 100%);padding:1.2rem 1.5rem;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-weight:700;font-size:1.1rem;color:#065f46;">Euro Hair Studio</span>
      <button id="chatbot-close" style="background:none;border:none;font-size:1.5rem;color:#059669;cursor:pointer;">&times;</button>
    </div>
    <div id="chatbot-messages" style="padding:1.2rem 1.5rem;max-height:260px;overflow-y:auto;font-size:1rem;color:#374151;"></div>
    <div id="chatbot-questions" style="padding:0.8rem 1.5rem 1.2rem 1.5rem;display:flex;flex-wrap:wrap;gap:0.5rem;"></div>
  `;

  // Dark mode support for chatbot
  function updateChatbotDarkMode() {
    const isDark = document.documentElement.classList.contains('dark');
    chat.style.background = isDark ? '#1a2332' : 'rgba(255,255,255,0.98)';
    chat.style.color = isDark ? '#e0e7ef' : '#374151';
    chat.style.boxShadow = isDark ? '0 8px 32px rgba(16,185,129,0.28)' : '0 8px 32px rgba(16,185,129,0.18)';
    const header = chat.querySelector('#chatbot-header');
    if (header) header.style.background = isDark ? 'linear-gradient(90deg,#22304a 0%,#101624 100%)' : 'linear-gradient(90deg,#a7f3d0 0%,#f3f4f6 100%)';
    if (header) header.style.color = isDark ? '#a7f3d0' : '#065f46';
    chat.querySelectorAll('.chatbot-q-btn').forEach(btn => {
      btn.style.background = isDark ? '#22304a' : '#fff';
      btn.style.color = isDark ? '#6ee7b7' : '#059669';
      btn.style.borderColor = isDark ? '#059669' : '#a7f3d0';
    });
    chat.querySelectorAll('span,div').forEach(el => {
      if (el.className === '' && el.style.background && el.style.background.includes('linear-gradient')) {
        el.style.background = isDark ? 'linear-gradient(90deg,#22304a 0%,#101624 100%)' : 'linear-gradient(90deg,#a7f3d0 0%,#f3f4f6 100%)';
      }
    });
  }
  // Listen for dark mode changes
  const darkObserver = new MutationObserver(updateChatbotDarkMode);
  darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  // Ensure correct mode on load
  updateChatbotDarkMode();

  document.body.appendChild(btn);
  document.body.appendChild(chat);

  // Open/close logic
  btn.onclick = () => { chat.style.display = 'flex'; btn.style.display = 'none'; setTimeout(() => { chat.scrollIntoView({behavior:'smooth'}); }, 100); };
  chat.querySelector('#chatbot-close').onclick = () => { chat.style.display = 'none'; btn.style.display = 'flex'; };

  // Chat logic
  const messages = chat.querySelector('#chatbot-messages');
  const questions = chat.querySelector('#chatbot-questions');
  function addMessage(text, fromBot=true) {
    const msg = document.createElement('div');
    msg.style.marginBottom = '0.7rem';
    msg.style.textAlign = fromBot ? 'left' : 'right';
    msg.innerHTML = `<span style="display:inline-block;padding:0.5rem 1rem;border-radius:1rem;${fromBot?'background:#f3f4f6;color:#059669;':'background:#059669;color:#fff;'};max-width:90%;">${text}</span>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }
  // Welcome
  addMessage(botData.welcome);
  // Pre-generated questions
  function renderQuestions() {
    questions.innerHTML = '';
    botData.questions.forEach((q, i) => {
      const btn = document.createElement('button');
      btn.textContent = q.q;
      btn.className = 'chatbot-q-btn';
      btn.style.background = '#fff';
      btn.style.color = '#059669';
      btn.style.border = '1.5px solid #a7f3d0';
      btn.style.borderRadius = '9999px';
      btn.style.padding = '0.5rem 1.2rem';
      btn.style.fontWeight = '600';
      btn.style.fontSize = '1rem';
      btn.style.cursor = 'pointer';
      btn.style.marginBottom = '0.2rem';
      btn.style.transition = 'background 0.2s, color 0.2s';
      btn.onmouseover = () => {
        const isDark = document.documentElement.classList.contains('dark');
        btn.style.background = isDark ? '#22304a' : '#a7f3d0';
        btn.style.color = isDark ? '#a7f3d0' : '#065f46';
      };
      btn.onmouseout = () => {
        const isDark = document.documentElement.classList.contains('dark');
        btn.style.background = isDark ? '#22304a' : '#fff';
        btn.style.color = isDark ? '#6ee7b7' : '#059669';
      };
      btn.onclick = () => {
        addMessage(q.q, false);
        setTimeout(() => addMessage(q.a, true), 400);
      };
      questions.appendChild(btn);
    });
  }
  renderQuestions();
}

window.addEventListener('DOMContentLoaded', createChatbot);
