// Main JavaScript File
const CHAT_CATEGORIES = {
  SERVICES: 'services',
  PORTFOLIO: 'portfolio',
  BOOKING: 'booking',
  PRICING: 'pricing',
  TECHNICAL: 'technical',
  CAREER: 'career',
  FILES: 'files',
  ESTIMATION: 'estimation'
};

// Project type definitions
const PROJECT_TYPES = {
  WEBSITE: {
    LANDING: {
      time: '2-3 weeks',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React/Next.js'],
      description: 'A professional landing page to showcase your business or product'
    },
    BUSINESS: {
      time: '1-2 months',
      technologies: ['React/Next.js', 'Node.js', 'MongoDB/PostgreSQL', 'AWS/Vercel'],
      description: 'Full business website with CMS and admin dashboard'
    },
    ECOMMERCE: {
      time: '2-4 months',
      technologies: ['React/Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      description: 'Complete e-commerce solution with payment processing and inventory management'
    }
  },
  MOBILE_APP: {
    BASIC: {
      time: '2-3 months',
      technologies: ['React Native/Flutter', 'Node.js', 'MongoDB'],
      description: 'Basic mobile app with essential features'
    },
    COMPLEX: {
      time: '4-6 months',
      technologies: ['React Native/Flutter', 'Node.js', 'PostgreSQL', 'Redis'],
      description: 'Complex app with advanced features like real-time updates'
    }
  }
};

// Quick reply button data
const QUICK_REPLIES = {
  MAIN_MENU: [
    { text: 'Services', value: 'services', icon: 'fas fa-cogs' },
    { text: 'Portfolio', value: 'portfolio', icon: 'fas fa-folder-open' },
    { text: 'Book Meeting', value: 'booking', icon: 'fas fa-calendar' },
    { text: 'Pricing', value: 'pricing', icon: 'fas fa-tag' },
    { text: 'Technical Help', value: 'technical', icon: 'fas fa-tools' },
    { text: 'Career', value: 'career', icon: 'fas fa-briefcase' },
    { text: 'Share Files', value: 'files', icon: 'fas fa-file-upload' }
  ],
  SERVICES: [
    { text: 'Web Development', value: 'web_dev', icon: 'fas fa-globe' },
    { text: 'App Development', value: 'app_dev', icon: 'fas fa-mobile-alt' },
    { text: 'System Solutions', value: 'system', icon: 'fas fa-desktop' },
    { text: 'Back to Menu', value: 'main_menu', icon: 'fas fa-arrow-left' }
  ],
  BOOKING: [
    { text: 'Schedule Meeting', value: 'schedule_meeting', icon: 'fas fa-calendar-alt' },
    { text: 'View Available Times', value: 'view_times', icon: 'fas fa-clock' },
    { text: 'Back to Menu', value: 'main_menu', icon: 'fas fa-arrow-left' }
  ],
  FILES: [
    { text: 'Share Files', value: 'share_files', icon: 'fas fa-file-upload' },
    { text: 'View Shared Files', value: 'view_files', icon: 'fas fa-folder-open' },
    { text: 'Back to Menu', value: 'main_menu', icon: 'fas fa-arrow-left' }
  ]
};

// Enhanced bot responses
const BOT_RESPONSES = {
  TECHNICAL: {
    'hosting': 'I offer various hosting solutions including shared hosting, VPS, and dedicated servers. Would you like to know more about pricing?',
    'database': 'I work with various databases including MySQL, PostgreSQL, MongoDB, and Redis. What specific information do you need?',
    'api': 'I can help with REST API development, GraphQL, and API integration. Do you have a specific requirement?',
    'security': 'I implement robust security measures including SSL, authentication, and data encryption. Would you like more details?'
  },
  
  // Add estimation responses
  ESTIMATION: {
    website: (type, features = []) => {
      const baseInfo = PROJECT_TYPES.WEBSITE[type.toUpperCase()];
      if (!baseInfo) return "Could you please specify the type of website you're interested in? (landing, business, or e-commerce)";
      
      let additionalTime = 0;
      features.forEach(feature => {
        if (feature.includes('authentication')) additionalTime += 1;
        if (feature.includes('payment')) additionalTime += 2;
        if (feature.includes('real-time')) additionalTime += 2;
      });

      return `
Based on your requirements for a ${type} website:

📅 Estimated Timeline: ${baseInfo.time}${additionalTime ? ` + ${additionalTime} weeks for additional features` : ''}

🛠️ Recommended Technologies:
${baseInfo.technologies.map(tech => `- ${tech}`).join('\n')}

📋 Project Scope:
${baseInfo.description}

${features.length > 0 ? `
Additional Features:
${features.map(f => `- ${f}`).join('\n')}` : ''}

Would you like more specific information about any aspect of the development process?`;
    },

    app: (type, features = []) => {
      const baseInfo = PROJECT_TYPES.MOBILE_APP[type.toUpperCase()];
      if (!baseInfo) return "Could you please specify if you need a basic or complex mobile app?";
      
      let additionalTime = 0;
      features.forEach(feature => {
        if (feature.includes('offline')) additionalTime += 2;
        if (feature.includes('social')) additionalTime += 2;
        if (feature.includes('AI')) additionalTime += 3;
      });

      return `
Based on your requirements for a ${type} mobile app:

📅 Estimated Timeline: ${baseInfo.time}${additionalTime ? ` + ${additionalTime} weeks for additional features` : ''}

🛠️ Recommended Technologies:
${baseInfo.technologies.map(tech => `- ${tech}`).join('\n')}

📋 Project Scope:
${baseInfo.description}

${features.length > 0 ? `
Additional Features:
${features.map(f => `- ${f}`).join('\n')}` : ''}

Would you like to discuss the development process in more detail?`;
    }
  }
};

// Function to create quick reply buttons
function createQuickReplies(category) {
  const quickRepliesDiv = document.createElement('div');
  quickRepliesDiv.className = 'quick-replies';
  
  QUICK_REPLIES[category].forEach(reply => {
    const button = document.createElement('button');
    button.className = 'quick-reply-btn';
    button.innerHTML = `<i class="${reply.icon}"></i> ${reply.text}`;
    button.onclick = () => handleQuickReply(reply.value);
    quickRepliesDiv.appendChild(button);
  });
  
  return quickRepliesDiv;
}

// Function to handle quick reply clicks
function handleQuickReply(value) {
  switch(value) {
    case 'main_menu':
      addMessage('Show main menu', 'user');
      showMainMenu();
      break;
    case 'services':
      addMessage('Tell me about your services', 'user');
      showServices();
      break;
    case 'booking':
      addMessage('I want to book a meeting', 'user');
      startBookingProcess();
      break;
    case 'share_files':
      showForm('fileUploadForm');
      break;
    case 'schedule_meeting':
      showForm('bookingForm');
      break;
    case 'contact_form':
      showForm('contactForm');
      break;
    // Add more cases as needed
  }
}

// Add CSS animations for messages
const messageAnimations = `
  .message {
    animation: slideIn 0.3s ease-out;
  }
  
  .quick-replies {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Add the animations to the page
const style = document.createElement('style');
style.textContent = messageAnimations;
document.head.appendChild(style);

let isDirectChatMode = false;
const OWNER_PHONE = "254794862787";

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper sliders
    const heroSwiper = new Swiper('.hero-slider', {
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  
    const portfolioSwiper = new Swiper('.portfolio-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      }
    });
  
    const testimonialSwiper = new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });
  
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        const portfolioSlides = document.querySelectorAll('.portfolio-slider .swiper-slide');
        
        portfolioSlides.forEach(slide => {
          if (filterValue === 'all' || slide.getAttribute('data-category') === filterValue) {
            slide.style.display = 'block';
          } else {
            slide.style.display = 'none';
          }
        });
        
        // Update Swiper after filtering
        portfolioSwiper.update();
      });
    });
  
    // Chat widget functionality
    const chatWidget = document.querySelector('.chat-widget');
    const chatToggle = document.querySelector('.chat-widget-toggle');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input');
    const sendMessageBtn = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chat widget
    chatToggle.addEventListener('click', function() {
      chatWidget.classList.toggle('active');
    });

    // Close chat
    closeChat.addEventListener('click', function() {
      chatWidget.classList.remove('active');
    });

    // Add message to chat
    function addMessage(content, type) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${type}`;
      
      if (typeof content === 'object') {
        // Handle rich content (text + quick replies)
        messageDiv.textContent = content.text;
        if (content.quickReplies) {
          messageDiv.appendChild(createQuickReplies(content.quickReplies));
        }
      } else {
        // Handle simple text messages
        messageDiv.textContent = content;
      }
      
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Generate bot response based on user message
    function getBotResponse(userMessage) {
      const lowerMessage = userMessage.toLowerCase();
      
      // Project estimation logic
      if (lowerMessage.includes('how long') || lowerMessage.includes('estimate') || lowerMessage.includes('timeline')) {
        if (lowerMessage.includes('website')) {
          let type = 'landing';
          let features = [];
          
          if (lowerMessage.includes('ecommerce') || lowerMessage.includes('shop')) {
            type = 'ecommerce';
            features.push('payment processing');
          } else if (lowerMessage.includes('business')) {
            type = 'business';
          }
          
          if (lowerMessage.includes('auth')) features.push('authentication');
          if (lowerMessage.includes('real-time')) features.push('real-time features');
          
          return BOT_RESPONSES.ESTIMATION.website(type, features);
        }
        
        if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
          let type = 'basic';
          let features = [];
          
          if (lowerMessage.includes('complex') || lowerMessage.includes('advanced')) {
            type = 'complex';
          }
          
          if (lowerMessage.includes('offline')) features.push('offline support');
          if (lowerMessage.includes('social')) features.push('social features');
          if (lowerMessage.includes('ai')) features.push('AI integration');
          
          return BOT_RESPONSES.ESTIMATION.app(type, features);
        }
      }

      // Check for direct chat request
      if (lowerMessage.includes('chat with owner') || lowerMessage.includes('talk to owner') || lowerMessage.includes('speak with owner')) {
        isDirectChatMode = true;
        return "Switching to direct chat mode with Boniface. Your messages will now be forwarded to him. He will reply through this chat. Type 'end direct chat' to return to normal bot mode.";
      }

      // Check if user wants to end direct chat
      if (lowerMessage === 'end direct chat' && isDirectChatMode) {
        isDirectChatMode = false;
        return "Ending direct chat mode. I'm back to assist you!";
      }

      // If in direct chat mode, forward message to owner
      if (isDirectChatMode) {
        sendMessageToOwner(userMessage);
        return "Message sent to Boniface. Please wait for his response.";
      }

      // Existing response logic
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! I'm Boniface Mwenda's virtual assistant. I can help you with project estimations, technical information, and more. What would you like to know?";
      }
      
      // Add more intelligent responses
      if (lowerMessage.includes('tech stack') || lowerMessage.includes('technologies')) {
        return `I work with various modern technologies including:

Frontend:
- React.js/Next.js for web applications
- React Native/Flutter for mobile apps
- HTML5, CSS3, JavaScript (ES6+)

Backend:
- Node.js with Express
- Python with Django/FastAPI
- Database: PostgreSQL, MongoDB, Redis

DevOps:
- AWS/Google Cloud/Vercel
- Docker & Kubernetes
- CI/CD pipelines

What specific technology would you like to know more about?`;
      }

      // Default response
      return "I understand you're asking about " + userMessage + ". Could you please provide more specific details about your requirements? For example, what type of project are you interested in, and what features are you looking for?";
    }

    // Send message
    function sendMessage() {
      const messageText = chatInput.value.trim();
      if (messageText) {
        // Add user message to chat
        addMessage(messageText, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Get and show bot response
        setTimeout(() => {
          const botResponse = getBotResponse(messageText);
          addMessage(botResponse, 'bot');
        }, 1000);
      }
    }

    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.progress');
    const skillsSection = document.querySelector('.skills');

    // Remove the initial opacity setting
    skillsSection.style.opacity = '1'; // Change this from '0'

    // Intersection Observer for skill bars
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Make skills section visible immediately
          entry.target.style.opacity = '1';
          
          // Animate the skill bars
          skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = targetWidth;
            }, 100);
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 }); // Lower threshold for earlier triggering

    observer.observe(skillsSection);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Theme toggle (optional)
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
      document.body.setAttribute('data-theme', 
        document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
      themeToggle.innerHTML = document.body.getAttribute('data-theme') === 'light' 
        ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  });
  
  // WhatsApp Integration
  function sendToWhatsApp(message) {
    const phoneNumber = "254794862787"; // Your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  }

  // Function to send message to owner's WhatsApp
  async function sendMessageToOwner(message) {
    try {
      const response = await fetch('/api/forward-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          phone: OWNER_PHONE
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to forward message');
      }
    } catch (error) {
      console.error('Error forwarding message:', error);
      addMessage("Sorry, there was an error sending your message to Boniface. Please try again later.", 'bot');
    }
  }

  // Function to handle owner's response (to be called by your backend)
  function handleOwnerResponse(message) {
    if (isDirectChatMode) {
      addMessage(message, 'bot');
    }
  }

  // WebSocket connection for real-time owner responses
  const socket = new WebSocket('YOUR_WEBSOCKET_URL');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'owner_response') {
      handleOwnerResponse(data.message);
    }
  };

  // File handling functions
  const fileHandler = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/*', 'application/pdf', 'application/msword', 
                   'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],

    init() {
      const fileInput = document.getElementById('fileInput');
      const fileList = document.getElementById('fileList');
      const fileForm = document.getElementById('fileUploadForm');

      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
      fileForm.addEventListener('submit', (e) => this.handleFileUpload(e));
    },

    handleFileSelect(e) {
      const files = Array.from(e.target.files);
      const fileList = document.getElementById('fileList');
      fileList.innerHTML = '';

      files.forEach(file => {
        if (this.validateFile(file)) {
          const fileItem = document.createElement('div');
          fileItem.className = 'file-item';
          fileItem.innerHTML = `
            <span>${file.name}</span>
            <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
          `;
          fileList.appendChild(fileItem);
        }
      });
    },

    async handleFileUpload(e) {
      e.preventDefault();
      const files = document.getElementById('fileInput').files;
      const formData = new FormData();
      
      Array.from(files).forEach(file => {
        if (this.validateFile(file)) {
          formData.append('files', file);
        }
      });

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          addMessage('Files uploaded successfully!', 'bot');
          hideForm('fileUploadForm');
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        addMessage('Failed to upload files. Please try again.', 'bot');
      }
    },

    validateFile(file) {
      if (file.size > this.maxFileSize) {
        addMessage(`File ${file.name} is too large. Maximum size is 10MB.`, 'bot');
        return false;
      }
      if (!this.allowedTypes.some(type => {
        const regex = new RegExp(type.replace('*', '.*'));
        return regex.test(file.type);
      })) {
        addMessage(`File ${file.name} type is not supported.`, 'bot');
        return false;
      }
      return true;
    }
  };

  // Appointment scheduling functions
  const appointmentHandler = {
    availableTimes: [],

    init() {
      this.populateTimeSlots();
      const bookingForm = document.getElementById('bookingForm');
      bookingForm.addEventListener('submit', (e) => this.handleBooking(e));
    },

    populateTimeSlots() {
      const timeSelect = document.getElementById('meetingTime');
      const times = this.generateTimeSlots();
      timeSelect.innerHTML = '<option value="">Select Time</option>';
      times.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
      });
    },

    generateTimeSlots() {
      const times = [];
      for (let hour = 9; hour <= 17; hour++) {
        ['00', '30'].forEach(minutes => {
          times.push(`${hour.toString().padStart(2, '0')}:${minutes}`);
        });
      }
      return times;
    },

    async handleBooking(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const bookingData = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/book-meeting', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        });

        if (response.ok) {
          addMessage('Meeting scheduled successfully! You will receive a confirmation email.', 'bot');
          hideForm('bookingForm');
        } else {
          throw new Error('Booking failed');
        }
      } catch (error) {
        addMessage('Failed to schedule meeting. Please try again.', 'bot');
      }
    }
  };

  // Form handling functions
  function showForm(formId) {
    const forms = document.querySelector('.chat-forms');
    forms.style.display = 'block';
    document.getElementById(formId).style.display = 'block';
  }

  function hideForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = 'none';
    form.reset();
    document.querySelector('.chat-forms').style.display = 'none';
  }

  // Initialize handlers
  document.addEventListener('DOMContentLoaded', () => {
    fileHandler.init();
    appointmentHandler.init();
    
    // Add form cancel button handlers
    document.querySelectorAll('.cancel-form').forEach(button => {
      button.addEventListener('click', () => {
        const form = button.closest('.chat-form');
        hideForm(form.id);
      });
    });
  });

  // Language configurations
  const SUPPORTED_LANGUAGES = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    sw: 'Kiswahili'
  };

  const TRANSLATIONS = {
    en: {
      welcome: "Hello! I'm Boniface Mwenda's virtual assistant. How can I help you today?",
      services: "I specialize in:\n1. Web Development\n2. App Development\n3. System Solutions",
      contact: "You can reach Boniface through:\nEmail: mwendaboniface146@gmail.com\nPhone: +254794862787",
      // Add more translations
    },
    es: {
      welcome: "¡Hola! Soy el asistente virtual de Boniface Mwenda. ¿Cómo puedo ayudarte hoy?",
      services: "Me especializo en:\n1. Desarrollo Web\n2. Desarrollo de Aplicaciones\n3. Soluciones de Sistemas",
      contact: "Puedes contactar a Boniface a través de:\nEmail: mwendaboniface146@gmail.com\nTeléfono: +254794862787",
    },
    // Add more languages
  };

  // Voice and Speech Recognition
  const speechHandler = {
    recognition: null,
    synthesis: window.speechSynthesis,
    isListening: false,
    currentLanguage: 'en',

    init() {
      if ('webkitSpeechRecognition' in window) {
        this.recognition = new webkitSpeechRecognition();
        this.setupRecognition();
      }
    },

    setupRecognition() {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.currentLanguage;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.querySelector('.chat-input').value = transcript;
        sendMessage();
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.stopListening();
      };
    },

    startListening() {
      if (this.recognition) {
        this.recognition.start();
        this.isListening = true;
        // Update UI to show listening state
        document.querySelector('.voice-input-btn').classList.add('listening');
      }
    },

    stopListening() {
      if (this.recognition) {
        this.recognition.stop();
        this.isListening = false;
        document.querySelector('.voice-input-btn').classList.remove('listening');
      }
    },

    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.currentLanguage;
      this.synthesis.speak(utterance);
    }
  };

  // Image Recognition Handler
  const imageRecognitionHandler = {
    async analyzeImage(file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/api/analyze-image', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Image analysis failed');

        const result = await response.json();
        return result;
      } catch (error) {
        console.error('Image recognition error:', error);
        throw error;
      }
    },

    async handleImageUpload(file) {
      try {
        const analysis = await this.analyzeImage(file);
        return this.generateImageResponse(analysis);
      } catch (error) {
        return 'Sorry, I could not analyze the image. Please try again.';
      }
    },

    generateImageResponse(analysis) {
      let response = "I've analyzed the image. Here's what I found:\n";
      if (analysis.objects?.length) {
        response += "Objects detected: " + analysis.objects.join(', ') + "\n";
      }
      if (analysis.text?.length) {
        response += "Text detected: " + analysis.text.join(' ') + "\n";
      }
      return response;
    }
  };

  // Language Switcher
  const languageHandler = {
    currentLanguage: 'en',

    init() {
      this.setupLanguageSelector();
      this.loadPreferredLanguage();
    },

    setupLanguageSelector() {
      const selector = document.createElement('div');
      selector.className = 'language-selector';
      selector.innerHTML = `
        <select id="languageSelect">
          ${Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => 
            `<option value="${code}">${name}</option>`
          ).join('')}
        </select>
      `;

      document.querySelector('.chat-header').appendChild(selector);

      document.getElementById('languageSelect').addEventListener('change', (e) => {
        this.changeLanguage(e.target.value);
      });
    },

    loadPreferredLanguage() {
      const saved = localStorage.getItem('preferredLanguage');
      if (saved && SUPPORTED_LANGUAGES[saved]) {
        this.changeLanguage(saved);
      }
    },

    changeLanguage(langCode) {
      this.currentLanguage = langCode;
      localStorage.setItem('preferredLanguage', langCode);
      speechHandler.currentLanguage = langCode;
      
      // Update UI elements
      this.updateUILanguage();
      
      // Send language change message
      addMessage(TRANSLATIONS[langCode].welcome, 'bot');
    },

    updateUILanguage() {
      // Update all translatable elements
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        if (TRANSLATIONS[this.currentLanguage][key]) {
          element.textContent = TRANSLATIONS[this.currentLanguage][key];
        }
      });
    },

    translate(key) {
      return TRANSLATIONS[this.currentLanguage][key] || TRANSLATIONS['en'][key] || key;
    }
  };

  // Enhanced message handling
  function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    if (typeof content === 'object') {
      messageDiv.textContent = languageHandler.translate(content.text);
      if (content.quickReplies) {
        messageDiv.appendChild(createQuickReplies(content.quickReplies));
      }
    } else {
      messageDiv.textContent = languageHandler.translate(content);
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Speak message if it's a bot response and speech is enabled
    if (type === 'bot' && localStorage.getItem('speechEnabled') === 'true') {
      speechHandler.speak(messageDiv.textContent);
    }
  }

  // Initialize all handlers
  document.addEventListener('DOMContentLoaded', () => {
    languageHandler.init();
    speechHandler.init();
    
    // Add voice input button
    const voiceButton = document.createElement('button');
    voiceButton.className = 'voice-input-btn';
    voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
    voiceButton.addEventListener('click', () => {
      if (speechHandler.isListening) {
        speechHandler.stopListening();
      } else {
        speechHandler.startListening();
      }
    });
    document.querySelector('.chat-input-container').appendChild(voiceButton);
    
    // Handle image uploads
    const chatInput = document.querySelector('.chat-input');
    chatInput.addEventListener('paste', async (e) => {
      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          const response = await imageRecognitionHandler.handleImageUpload(file);
          addMessage(response, 'bot');
        }
      }
    });
  });
