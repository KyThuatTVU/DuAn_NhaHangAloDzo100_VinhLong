// Restaurant Alo Dzo - Main JavaScript

// Global variables
let cart = [];
let currentSection = 'home';
let currentAdminTab = 'dashboard';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    loadComponents();
    updateCartBadge();
    showSection('home');
    setupSearchFunctionality();
    setupEventListeners();
    renderMenuItems();
    renderBestSellers();
}

// Load Components
async function loadComponents() {
    try {
        // Load Header
        const headerResponse = await fetch('components/header.html');
        const headerHTML = await headerResponse.text();
        document.getElementById('header-container').innerHTML = headerHTML;

        // Load Navigation
        const navResponse = await fetch('components/navigation.html');
        const navHTML = await navResponse.text();
        document.getElementById('navigation-container').innerHTML = navHTML;

        // Load Footer
        const footerResponse = await fetch('components/footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-container').innerHTML = footerHTML;

        // Load Modal
        const modalResponse = await fetch('components/modal.html');
        const modalHTML = await modalResponse.text();
        document.getElementById('modal-container').innerHTML = modalHTML;

        // Load Admin Panel
        const adminResponse = await fetch('components/admin-panel.html');
        const adminHTML = await adminResponse.text();
        document.getElementById('admin-panel-container').innerHTML = adminHTML;

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Navigation Functions
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('[id$="-section"]');
    sections.forEach(section => {
        section.classList.add('section-hidden');
        section.classList.remove('section-visible');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('section-hidden');
        targetSection.classList.add('section-visible');

        // Load section content if needed
        loadSectionContent(sectionName);
    }

    // Update navigation active state
    updateNavigation(sectionName);
    currentSection = sectionName;
}

function updateNavigation(activeSection) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('nav-active');
    });
    
    // Add active class to current nav item
    const activeNavItem = document.querySelector(`[onclick="showSection('${activeSection}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('nav-active');
    }
}

// Menu Functions
function filterMenu(category) {
    showSection('menu');
    filterMenuCategory(category);
}

function filterMenuCategory(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const filterButtons = document.querySelectorAll('.category-filter');
    
    // Update filter buttons
    filterButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-brand-primary', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    const activeButton = document.querySelector(`[onclick="filterMenuCategory('${category}')"]`);
    if (activeButton) {
        activeButton.classList.add('active', 'bg-brand-primary', 'text-white');
        activeButton.classList.remove('bg-gray-200', 'text-gray-700');
    }
    
    // Filter menu items
    menuItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function sortMenu() {
    const sortSelect = document.getElementById('sortMenu');
    const sortValue = sortSelect.value;
    const menuGrid = document.getElementById('menuGrid');
    const menuItems = Array.from(menuGrid.querySelectorAll('.menu-item'));
    
    menuItems.sort((a, b) => {
        switch(sortValue) {
            case 'price-asc':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-desc':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'rating':
                return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
            default:
                return 0;
        }
    });
    
    // Re-append sorted items
    menuItems.forEach(item => menuGrid.appendChild(item));
}

function filterByPrice() {
    const priceFilter = document.getElementById('priceFilter');
    const priceRange = priceFilter.value;
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const price = parseInt(item.dataset.price);
        let show = true;
        
        switch(priceRange) {
            case '0-50':
                show = price < 50000;
                break;
            case '50-100':
                show = price >= 50000 && price <= 100000;
                break;
            case '100-200':
                show = price >= 100000 && price <= 200000;
                break;
            case '200+':
                show = price > 200000;
                break;
            default:
                show = true;
        }
        
        item.style.display = show ? 'block' : 'none';
    });
}

// Cart Functions
function addToCart(itemId, price) {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: itemId,
            price: price,
            quantity: 1,
            name: getItemName(itemId)
        });
    }
    
    updateCartBadge();
    updateCartDisplay();
    showToast('Đã thêm vào giỏ hàng!');
}

function getItemName(itemId) {
    const itemNames = {
        'com-tam-suon': 'Cơm tấm sườn nướng',
        'com-tam-ga': 'Cơm tấm gà nướng',
        'banh-xeo': 'Bánh xèo miền Tây',
        'banh-xeo-chay': 'Bánh xèo chay',
        'hu-tieu': 'Hủ tiếu Nam Vang',
        'hu-tieu-mytho': 'Hủ tiếu Mỹ Tho',
        'nuoc-mia': 'Nước mía tươi',
        'chanh-day': 'Nước chanh dây'
    };
    return itemNames[itemId] || itemId;
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';
        cartItem.innerHTML = `
            <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-sm text-gray-600">${item.price.toLocaleString()}đ x ${item.quantity}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateCartItemQuantity('${item.id}', -1)" class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartItemQuantity('${item.id}', 1)" class="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center">+</button>
                <button onclick="removeFromCart('${item.id}')" class="text-red-500 ml-2"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toLocaleString() + 'đ';
}

function updateCartItemQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartBadge();
            updateCartDisplay();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartBadge();
    updateCartDisplay();
}

function toggleCart() {
    const cartSlide = document.getElementById('cartSlide');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSlide && cartOverlay) {
        cartSlide.classList.toggle('open');
        cartOverlay.classList.toggle('show');
        
        if (cartSlide.classList.contains('open')) {
            updateCartDisplay();
        }
    }
}

function checkout() {
    if (cart.length === 0) {
        showToast('Giỏ hàng trống!');
        return;
    }
    
    // Simulate checkout process
    showToast('Đang chuyển hướng đến VNPAY...');
    setTimeout(() => {
        cart = [];
        updateCartBadge();
        updateCartDisplay();
        toggleCart();
        showToast('Thanh toán thành công!');
    }, 2000);
}

// Modal Functions
function openFoodModal(foodId) {
    const modal = document.getElementById('foodModal');
    if (!modal) return;

    // Get food data
    const foodData = getFoodData(foodId);
    if (!foodData) return;

    // Update modal content
    document.getElementById('foodModalTitle').textContent = 'Chi tiết món ăn';
    document.getElementById('foodModalName').textContent = foodData.name;
    document.getElementById('foodModalDescription').textContent = foodData.description || 'Món ăn ngon từ Ẩm Thực Phương Nam';
    document.getElementById('foodModalPrice').textContent = foodData.price.toLocaleString() + 'đ';
    document.getElementById('foodModalIcon').className = foodData.icon + ' text-8xl text-gray-300';

    if (foodData.originalPrice) {
        document.getElementById('foodModalOriginalPrice').textContent = foodData.originalPrice.toLocaleString() + 'đ';
        document.getElementById('foodModalOriginalPrice').style.display = 'inline';
    } else {
        document.getElementById('foodModalOriginalPrice').style.display = 'none';
    }

    // Update rating
    const ratingContainer = document.getElementById('foodModalRating');
    ratingContainer.innerHTML = generateStars(foodData.rating);

    document.getElementById('foodModalReviews').textContent = `(${foodData.rating}) ${foodData.reviewCount} đánh giá`;

    // Reset quantity
    document.getElementById('modalQuantity').textContent = '1';

    // Store current food ID for adding to cart
    modal.dataset.foodId = foodId;

    // Show modal
    modal.classList.remove('hidden');
}

function closeFoodModal() {
    const modal = document.getElementById('foodModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function getFoodData(foodId) {
    return menuItemsData.find(item => item.id === foodId) || {
        id: foodId,
        name: getItemName(foodId),
        price: 50000,
        rating: 4.0,
        reviewCount: 10,
        icon: 'fas fa-utensils'
    };
}

function increaseQuantity() {
    const quantityElement = document.getElementById('modalQuantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
}

function decreaseQuantity() {
    const quantityElement = document.getElementById('modalQuantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
    }
}

function addToCartFromModal() {
    const modal = document.getElementById('foodModal');
    const foodId = modal.dataset.foodId;
    const quantity = parseInt(document.getElementById('modalQuantity').textContent);
    const foodData = getFoodData(foodId);

    for (let i = 0; i < quantity; i++) {
        addToCart(foodId, foodData.price);
    }

    closeFoodModal();
}

// Render Best Sellers
function renderBestSellers() {
    const bestSellersGrid = document.getElementById('bestSellersGrid');
    if (!bestSellersGrid) return;

    const bestSellers = menuItemsData.slice(0, 4); // Get first 4 items as best sellers

    bestSellersGrid.innerHTML = '';
    bestSellers.forEach(item => {
        const itemHTML = createMenuItem(item);
        bestSellersGrid.insertAdjacentHTML('beforeend', itemHTML);
    });
}

// Album Functions
function filterAlbum(category) {
    const albumItems = document.querySelectorAll('.album-item');
    const filterButtons = document.querySelectorAll('.album-filter');
    
    // Update filter buttons
    filterButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-brand-primary', 'text-white');
    });
    
    const activeButton = document.querySelector(`[onclick="filterAlbum('${category}')"]`);
    if (activeButton) {
        activeButton.classList.add('active', 'bg-brand-primary', 'text-white');
    }
    
    // Filter album items
    albumItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function openLightbox(index) {
    // Implementation for lightbox
    showToast('Mở ảnh số: ' + index);
}

// FAQ Functions
function toggleFAQ(faqNumber) {
    const faqContent = document.getElementById('faq' + faqNumber);
    if (faqContent) {
        faqContent.classList.toggle('hidden');
    }
}

// Auth Functions
function toggleAuth() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.classList.toggle('hidden');
    }
}

function showAuthTab(tabName) {
    // Hide all auth forms
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => form.classList.add('hidden'));

    // Show target form
    const targetForm = document.getElementById(tabName + 'Form');
    if (targetForm) {
        targetForm.classList.remove('hidden');
    }

    // Update tab buttons
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.classList.remove('active', 'border-brand-primary', 'text-brand-primary');
        tab.classList.add('border-gray-200', 'text-gray-500');
    });

    const activeTab = document.getElementById(tabName + 'Tab');
    if (activeTab) {
        activeTab.classList.add('active', 'border-brand-primary', 'text-brand-primary');
        activeTab.classList.remove('border-gray-200', 'text-gray-500');
    }
}

function handleLogin(event) {
    event.preventDefault();
    showToast('Đăng nhập thành công!');
    toggleAuth();
}

function handleRegister(event) {
    event.preventDefault();
    showToast('Đăng ký thành công!');
    toggleAuth();
}

// Lightbox Functions
let currentImageIndex = 0;
const lightboxImages = [
    { title: 'Cơm tấm sườn nướng', description: 'Món ăn đặc sản miền Nam', icon: 'fas fa-bowl-rice' },
    { title: 'Bánh xèo miền Tây', description: 'Bánh xèo giòn tan thơm ngon', icon: 'fas fa-cookie-bite' },
    { title: 'Hủ tiếu Nam Vang', description: 'Hủ tiếu nước dùng ngọt thanh', icon: 'fas fa-bowl-food' },
    { title: 'Mặt tiền nhà hàng', description: 'Không gian ấm cúng', icon: 'fas fa-store' },
    { title: 'Không gian bàn ăn', description: 'Phục vụ tận tình', icon: 'fas fa-chair' },
    { title: 'Bếp chế biến', description: 'Sạch sẽ, hiện đại', icon: 'fas fa-utensils' },
    { title: 'Tiệc sinh nhật', description: 'Tổ chức tiệc ấm cúng', icon: 'fas fa-birthday-cake' },
    { title: 'Tiệc công ty', description: 'Phục vụ sự kiện chuyên nghiệp', icon: 'fas fa-glass-cheers' },
    { title: 'Gia đình khách hàng', description: 'Khách hàng hài lòng', icon: 'fas fa-users' },
    { title: 'Khách hàng vui vẻ', description: 'Trải nghiệm tuyệt vời', icon: 'fas fa-smile' },
    { title: 'Thức uống tươi mát', description: 'Đa dạng thức uống', icon: 'fas fa-glass-water' },
    { title: 'Khu vực chờ', description: 'Thoải mái chờ đợi', icon: 'fas fa-couch' }
];

function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;

    updateLightboxContent();
    modal.classList.remove('hidden');
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function updateLightboxContent() {
    const image = lightboxImages[currentImageIndex];
    if (!image) return;

    document.getElementById('lightboxTitle').textContent = image.title;
    document.getElementById('lightboxDescription').textContent = image.description;

    const content = document.getElementById('lightboxContent');
    content.innerHTML = `
        <div class="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div class="text-center">
                <i class="${image.icon} text-8xl text-gray-400 mb-4"></i>
                <p class="text-gray-600 font-semibold">${image.title}</p>
            </div>
        </div>
    `;
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxContent();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
    updateLightboxContent();
}

// Admin Functions
function showAdminTab(tabName) {
    // Hide all admin tabs
    const adminTabs = document.querySelectorAll('.admin-tab-content');
    adminTabs.forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Show target tab
    const targetTab = document.getElementById('admin-' + tabName);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }
    
    // Update admin navigation
    const adminNavItems = document.querySelectorAll('.admin-nav-item');
    adminNavItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[onclick="showAdminTab('${tabName}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    currentAdminTab = tabName;
}

function openFoodForm() {
    showToast('Mở form thêm món ăn');
}

// Utility Functions
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput && searchSuggestions) {
        searchInput.addEventListener('focus', () => {
            searchSuggestions.classList.remove('hidden');
        });
        
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                searchSuggestions.classList.add('hidden');
            }, 200);
        });
    }
}

function setupEventListeners() {
    // Close overlays when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay')) {
            toggleCart();
        }
    });
    
    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Form đã được gửi!');
        });
    });
}

// Form handling functions
function handleBooking(event) {
    event.preventDefault();
    showToast('Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận trong vòng 15 phút.');
}

function handleContact(event) {
    event.preventDefault();
    showToast('Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi trong vòng 24 giờ.');
}
