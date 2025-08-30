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
    // Auto-detect page and initialize
    const pageName = detectCurrentPage();
    initializePage(pageName);
}

// Detect current page from URL
function detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    if (filename === '' || filename === 'index.html') return 'home';
    if (filename === 'about.html') return 'about';
    if (filename === 'menu.html') return 'menu';
    if (filename === 'album.html') return 'album';
    if (filename === 'booking.html') return 'booking';
    if (filename === 'contact.html') return 'contact';
    if (filename === 'admin.html') return 'admin';

    return 'home'; // default
}

// Initialize specific page
async function initializePage(pageName) {
    try {
        // Load common components for all pages
        await loadCommonComponents();

        // Load page-specific components and setup
        switch(pageName) {
            case 'home':
                await loadHomePageComponents();
                setupHomePage();
                break;
            case 'menu':
                await loadMenuPageComponents();
                setupMenuPage();
                break;
            case 'album':
                await loadAlbumPageComponents();
                setupAlbumPage();
                break;
            case 'admin':
                await loadAdminPageComponents();
                setupAdminPage();
                break;
            default:
                await loadBasicPageComponents();
                setupBasicPage();
        }

        // Common setup for all pages
        updateCartBadge();
        setupEventListeners();
        setActiveNavigation(pageName);
        showCartButton(pageName);

    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// Set active navigation item
function setActiveNavigation(pageName) {
    // Wait for header to load
    setTimeout(() => {
        const navItems = document.querySelectorAll('#main-navigation .nav-item');
        const mobileNavItems = document.querySelectorAll('#mobileMenu .nav-item');
        console.log('setActiveNavigation called for page:', pageName, 'nav items found:', navItems.length);

        // Remove active class from all items
        [...navItems, ...mobileNavItems].forEach(item => {
            item.classList.remove('nav-active');
            item.classList.add('hover:bg-gray-100');
        });

        // Add active class to current page
        const activeItems = document.querySelectorAll(`[data-page="${pageName}"]`);
        console.log('Active items found:', activeItems.length);
        activeItems.forEach(item => {
            item.classList.add('nav-active');
            item.classList.remove('hover:bg-gray-100');
        });
    }, 100);
}

// Show/hide cart button based on page
function showCartButton(pageName) {
    // Wait for header to load
    setTimeout(() => {
        const cartButton = document.getElementById('cartButton');
        console.log('showCartButton called for page:', pageName, 'cartButton found:', !!cartButton);
        if (cartButton) {
            if (pageName === 'menu') {
                cartButton.classList.remove('hidden');
                console.log('Cart button shown for menu page');
            } else {
                cartButton.classList.add('hidden');
                console.log('Cart button hidden for page:', pageName);
            }
        }
    }, 100);
}

// Load common components for all pages
async function loadCommonComponents() {
    try {
        // Load Header (includes topbar)
        const headerResponse = await fetch('components/header.html?v=' + Date.now());
        const headerHTML = await headerResponse.text();
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) headerContainer.innerHTML = headerHTML;

        // Load Footer
        const footerResponse = await fetch('components/footer.html?v=' + Date.now());
        const footerHTML = await footerResponse.text();
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) footerContainer.innerHTML = footerHTML;

    } catch (error) {
        console.error('Error loading common components:', error);
    }
}

// Load components for homepage
async function loadHomePageComponents() {
    try {
        // Load Modal
        const modalResponse = await fetch('components/modal.html');
        const modalHTML = await modalResponse.text();
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) modalContainer.innerHTML = modalHTML;

    } catch (error) {
        console.error('Error loading home page components:', error);
    }
}

// Load components for menu page
async function loadMenuPageComponents() {
    try {
        // Load Modal
        const modalResponse = await fetch('components/modal.html');
        const modalHTML = await modalResponse.text();
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) modalContainer.innerHTML = modalHTML;

        // Load Cart for menu page
        const cartResponse = await fetch('components/cart.html');
        const cartHTML = await cartResponse.text();
        const cartContainer = document.getElementById('cart-container');
        if (cartContainer) cartContainer.innerHTML = cartHTML;

    } catch (error) {
        console.error('Error loading menu page components:', error);
    }
}

// Load components for album page
async function loadAlbumPageComponents() {
    try {
        // Load Modal for lightbox
        const modalResponse = await fetch('components/modal.html');
        const modalHTML = await modalResponse.text();
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) modalContainer.innerHTML = modalHTML;

    } catch (error) {
        console.error('Error loading album page components:', error);
    }
}

// Load components for admin page
async function loadAdminPageComponents() {
    try {
        // Load Admin Panel
        const adminResponse = await fetch('components/admin-panel.html');
        const adminHTML = await adminResponse.text();
        const adminContainer = document.getElementById('admin-panel-container');
        if (adminContainer) adminContainer.innerHTML = adminHTML;

        // Load Modal
        const modalResponse = await fetch('components/modal.html');
        const modalHTML = await modalResponse.text();
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) modalContainer.innerHTML = modalHTML;

    } catch (error) {
        console.error('Error loading admin page components:', error);
    }
}

// Load basic components for other pages
async function loadBasicPageComponents() {
    try {
        // Just load modal for basic functionality
        const modalResponse = await fetch('components/modal.html');
        const modalHTML = await modalResponse.text();
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) modalContainer.innerHTML = modalHTML;

    } catch (error) {
        console.error('Error loading basic page components:', error);
    }
}

// Setup functions for each page type
function setupHomePage() {
    // Initialize banner slider
    setTimeout(() => {
        initializeBannerSlider();
    }, 100);

    // Render best sellers
    setTimeout(() => {
        renderBestSellers();
    }, 200);
}

function setupMenuPage() {
    // Setup menu search functionality
    setupMenuSearchFunctionality();
    // Render menu items
    setTimeout(() => {
        renderMenuItems();
    }, 100);
}

function setupAlbumPage() {
    // Setup album filtering
    setupAlbumFiltering();
}

function setupAdminPage() {
    // Setup admin functionality
    setupAdminFunctionality();
}

function setupBasicPage() {
    // Basic page setup - no special functionality needed
}

// Setup menu search functionality
function setupMenuSearchFunctionality() {
    const searchInput = document.getElementById('menuSearchInput');
    const searchSuggestions = document.getElementById('menuSearchSuggestions');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                searchSuggestions.classList.remove('hidden');
                // Filter menu items based on search
                filterMenuBySearch(query);
            } else {
                searchSuggestions.classList.add('hidden');
                // Show all items
                renderMenuItems();
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.classList.add('hidden');
            }
        });
    }
}

// Setup album filtering
function setupAlbumFiltering() {
    // Album filter functionality will be handled by existing filterAlbum function
}

// Setup admin functionality
function setupAdminFunctionality() {
    // Admin functionality will be handled by existing admin functions
}

// Filter menu by search query
function filterMenuBySearch(query) {
    if (typeof menuItemsData === 'undefined') return;

    const filteredItems = menuItemsData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    const menuGrid = document.getElementById('menuGrid');
    if (menuGrid) {
        menuGrid.innerHTML = '';
        filteredItems.forEach(item => {
            const itemHTML = createMenuItem(item);
            menuGrid.insertAdjacentHTML('beforeend', itemHTML);
        });
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

    // Check if menuItemsData is available
    if (typeof menuItemsData === 'undefined') {
        console.warn('menuItemsData not available, loading from components.js');
        return;
    }

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
    // Menu search functionality
    const menuSearchInput = document.getElementById('menuSearchInput');
    const menuSearchSuggestions = document.getElementById('menuSearchSuggestions');

    if (menuSearchInput && menuSearchSuggestions) {
        menuSearchInput.addEventListener('focus', () => {
            menuSearchSuggestions.classList.remove('hidden');
        });

        menuSearchInput.addEventListener('blur', () => {
            setTimeout(() => {
                menuSearchSuggestions.classList.add('hidden');
            }, 200);
        });

        // Search functionality
        menuSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterMenuBySearch(searchTerm);
        });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Filter menu by search term
function filterMenuBySearch(searchTerm) {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        const itemDescription = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : '';

        if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = searchTerm === '' ? 'block' : 'none';
        }
    });
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

// Banner Slider Functions
let currentSlide = 0;
const totalSlides = 3;

function showSlide(index) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.slide-indicator');

    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto-play banner slider
function startBannerSlider() {
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Initialize banner slider
function initializeBannerSlider() {
    showSlide(0); // Show first slide
    startBannerSlider(); // Start auto-play
}
