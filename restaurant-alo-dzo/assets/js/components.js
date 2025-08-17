// Load components
document.addEventListener('DOMContentLoaded', function() {
    // Function to load HTML components
    async function loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    // Load all components
    loadComponent('header-component', 'components/header.html');
    loadComponent('footer-component', 'components/footer.html');
    loadComponent('chatbot-component', 'components/chatbot.html');
    loadComponent('banner-component', 'components/banner.html');

    // Initialize components after loading
    setTimeout(() => {
        initializeComponents();
    }, 100);
});

// Initialize all interactive components
function initializeComponents() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
        });

        const closeChat = chatbotWindow.querySelector('.close-chat');
        if (closeChat) {
            closeChat.addEventListener('click', () => {
                chatbotWindow.classList.add('hidden');
            });
        }

        // Chat functionality
        const sendButton = chatbotWindow.querySelector('.send-message');
        const inputField = chatbotWindow.querySelector('input');
        const messagesContainer = chatbotWindow.querySelector('.chat-messages');

        if (sendButton && inputField && messagesContainer) {
            const sendMessage = () => {
                const message = inputField.value.trim();
                if (message) {
                    // Add user message
                    const userMessageDiv = document.createElement('div');
                    userMessageDiv.className = 'message user-message bg-red-600 text-white rounded-lg p-3 mb-4 ml-auto max-w-[80%]';
                    userMessageDiv.textContent = message;
                    messagesContainer.appendChild(userMessageDiv);

                    // Clear input
                    inputField.value = '';

                    // Scroll to bottom
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;

                    // Simulate bot response
                    setTimeout(() => {
                        const botMessageDiv = document.createElement('div');
                        botMessageDiv.className = 'message bot-message bg-gray-100 rounded-lg p-3 mb-4 max-w-[80%]';
                        botMessageDiv.textContent = 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!';
                        messagesContainer.appendChild(botMessageDiv);
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }, 1000);
                }
            };

            sendButton.addEventListener('click', sendMessage);
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    // Banner slider functionality
    const bannerSlider = {
        slides: [
            {
                image: 'assets/images/banner1.jpg',
                title: 'Chào mừng đến với Alo Dzo 100',
                description: 'Trải nghiệm ẩm thực độc đáo tại Vĩnh Long'
            },
            {
                image: 'assets/images/banner2.jpg',
                title: 'Món Ăn Đặc Sắc',
                description: 'Khám phá menu đa dạng của chúng tôi'
            },
            {
                image: 'assets/images/banner3.jpg',
                title: 'Không Gian Sang Trọng',
                description: 'Địa điểm lý tưởng cho mọi dịp'
            }
        ],
        currentSlide: 0,
        init() {
            const slider = document.querySelector('.banner-slider');
            if (slider) {
                this.showSlide(0);
                setInterval(() => this.nextSlide(), 5000);
            }
        },
        showSlide(index) {
            const slider = document.querySelector('.banner-slider');
            const slide = this.slides[index];
            
            const slideHTML = `
                <div class="slide absolute w-full h-full bg-cover bg-center" 
                     style="background-image: url('${slide.image}')">
                    <div class="absolute inset-0 bg-black opacity-40"></div>
                    <div class="container mx-auto px-4 h-full flex items-center relative z-10">
                        <div class="text-white max-w-2xl">
                            <h1 class="text-5xl font-bold mb-4">${slide.title}</h1>
                            <p class="text-xl mb-8">${slide.description}</p>
                            <a href="booking.html" 
                               class="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition duration-300">
                                Đặt bàn ngay
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            slider.innerHTML = slideHTML;
        },
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(this.currentSlide);
        }
    };

    // Initialize banner slider
    bannerSlider.init();
}
