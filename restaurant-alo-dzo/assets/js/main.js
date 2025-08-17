// Main JavaScript file

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

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
            this.showSlide(0);
            setInterval(() => this.nextSlide(), 5000);
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

    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    let chatbotWindow = null;

    chatbotToggle.addEventListener('click', () => {
        if (!chatbotWindow) {
            // Create chatbot window
            chatbotWindow = document.createElement('div');
            chatbotWindow.className = 'chatbot-window bg-white rounded-lg shadow-xl w-80 h-96 fixed bottom-20 right-4 z-50';
            chatbotWindow.innerHTML = `
                <div class="p-4 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="font-bold">Chat với nhà hàng</h3>
                        <button class="close-chat text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="chat-messages p-4 h-64 overflow-y-auto">
                    <div class="message bot-message bg-gray-100 rounded-lg p-3 mb-4 max-w-[80%]">
                        Xin chào! Tôi có thể giúp gì cho bạn?
                    </div>
                </div>
                <div class="chat-input border-t border-gray-200 p-4">
                    <div class="flex">
                        <input type="text" 
                               class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-red-600" 
                               placeholder="Nhập tin nhắn...">
                        <button class="send-message bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(chatbotWindow);

            // Add close functionality
            chatbotWindow.querySelector('.close-chat').addEventListener('click', () => {
                chatbotWindow.remove();
                chatbotWindow = null;
            });

            // Add send message functionality
            const sendButton = chatbotWindow.querySelector('.send-message');
            const inputField = chatbotWindow.querySelector('input');
            const messagesContainer = chatbotWindow.querySelector('.chat-messages');

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
        } else {
            chatbotWindow.remove();
            chatbotWindow = null;
        }
    });
});
