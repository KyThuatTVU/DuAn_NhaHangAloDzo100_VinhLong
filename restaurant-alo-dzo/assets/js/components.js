// Components Data and Functions

// Sample menu items data
const menuItemsData = [
    {
        id: 'com-tam-suon',
        name: 'Cơm tấm sườn nướng',
        description: 'Cơm tấm thơm, sườn nướng mềm, chả trứng, bì',
        category: 'com-tam',
        price: 65000,
        originalPrice: 80000,
        rating: 4.5,
        reviewCount: 127,
        icon: 'fas fa-bowl-rice',
        gradient: 'from-yellow-100 to-orange-100',
        salePercent: 20,
        showFavorite: true,
        action: "openFoodModal('com-tam-suon')",
        buttonText: 'Chi tiết'
    },
    {
        id: 'com-tam-ga',
        name: 'Cơm tấm gà nướng',
        description: 'Cơm tấm, đùi gà nướng ngũ vị hương',
        category: 'com-tam',
        price: 58000,
        rating: 4.3,
        reviewCount: 89,
        icon: 'fas fa-drumstick-bite',
        gradient: 'from-red-100 to-pink-100',
        action: "openFoodModal('com-tam-ga')",
        buttonText: 'Chi tiết'
    },
    {
        id: 'banh-xeo',
        name: 'Bánh xèo miền Tây',
        description: 'Bánh xèo giòn, tôm thịt, giá đỗ, rau sống',
        category: 'banh-xeo',
        price: 45000,
        rating: 5.0,
        reviewCount: 89,
        icon: 'fas fa-cookie-bite',
        gradient: 'from-green-100 to-yellow-100',
        isHot: true,
        action: "openFoodModal('banh-xeo')",
        buttonText: 'Chi tiết'
    },
    {
        id: 'banh-xeo-chay',
        name: 'Bánh xèo chay',
        description: 'Bánh xèo chay với nấm, đậu hũ, giá đỗ',
        category: 'banh-xeo',
        price: 35000,
        rating: 4.2,
        reviewCount: 45,
        icon: 'fas fa-seedling',
        gradient: 'from-purple-100 to-blue-100',
        action: "openFoodModal('banh-xeo-chay')",
        buttonText: 'Chi tiết'
    },
    {
        id: 'hu-tieu',
        name: 'Hủ tiếu Nam Vang',
        description: 'Hủ tiếu tôm thịt, gan, tim, nước dùng ngọt',
        category: 'hu-tieu',
        price: 38000,
        rating: 4.4,
        reviewCount: 56,
        icon: 'fas fa-bowl-food',
        gradient: 'from-blue-100 to-purple-100',
        action: "openFoodModal('hu-tieu')",
        buttonText: 'Chi tiết'
    },
    {
        id: 'hu-tieu-mytho',
        name: 'Hủ tiếu Mỹ Tho',
        description: 'Hủ tiếu khô, tôm thịt, chả cá',
        category: 'hu-tieu',
        price: 42000,
        rating: 4.6,
        reviewCount: 72,
        icon: 'fas fa-bowl-food',
        gradient: 'from-orange-100 to-red-100',
        action: "openFoodModal('hu-tieu-mytho')",
        buttonText: 'Chi tiết'
    },
    {
        id: 'nuoc-mia',
        name: 'Nước mía tươi',
        description: 'Nước mía tươi nguyên chất, mát lạnh',
        category: 'nuoc-uong',
        price: 15000,
        rating: 4.8,
        reviewCount: 23,
        icon: 'fas fa-glass-water',
        gradient: 'from-pink-100 to-red-100',
        isNew: true,
        action: "openFoodModal('nuoc-mia')",
        buttonText: 'Chi tiết'
    },
    {
        id: 'chanh-day',
        name: 'Nước chanh dây',
        description: 'Chanh dây tươi, vị chua ngọt thanh mát',
        category: 'nuoc-uong',
        price: 25000,
        rating: 4.5,
        reviewCount: 67,
        icon: 'fas fa-lemon',
        gradient: 'from-yellow-100 to-green-100',
        action: "openFoodModal('chanh-day')",
        buttonText: 'Chi tiết'
    }
];

// Function to create menu item from data
function createMenuItem(data) {
    const template = `
        <div class="menu-item ${data.category} bg-white rounded-lg shadow-lg overflow-hidden hover-scale diamond-rounded" data-price="${data.price}" data-rating="${data.rating}">
            <div class="relative">
                <div class="w-full h-48 bg-gradient-to-br ${data.gradient} flex items-center justify-center">
                    <i class="${data.icon} text-6xl text-gray-300"></i>
                </div>
                ${data.salePercent ? `<div class="absolute top-2 left-2 badge-sale text-white px-2 py-1 rounded-lg text-xs font-bold">-${data.salePercent}%</div>` : ''}
                ${data.isHot ? '<div class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">HOT</div>' : ''}
                ${data.isNew ? '<div class="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold">MỚI</div>' : ''}
                ${data.showFavorite ? '<div class="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center"><i class="fas fa-heart text-sm"></i></div>' : ''}
            </div>
            <div class="p-4">
                <h3 class="font-semibold mb-2">${data.name}</h3>
                ${data.description ? `<p class="text-gray-600 text-sm mb-2">${data.description}</p>` : ''}
                <div class="flex items-center mb-2">
                    <div class="star-rating">
                        ${generateStars(data.rating)}
                    </div>
                    <span class="text-sm text-gray-600 ml-2">(${data.rating}) ${data.reviewCount} đánh giá</span>
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-red-500 font-bold">${data.price.toLocaleString()}đ</span>
                        ${data.originalPrice ? `<span class="text-gray-400 line-through ml-2">${data.originalPrice.toLocaleString()}đ</span>` : ''}
                    </div>
                    <button onclick="${data.action}" class="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        ${data.buttonText}
                    </button>
                </div>
            </div>
        </div>
    `;
    return template;
}

// Helper function to generate star ratings
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Function to render menu items
function renderMenuItems(items = menuItemsData) {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    items.forEach(item => {
        const menuItemHTML = createMenuItem(item);
        menuGrid.insertAdjacentHTML('beforeend', menuItemHTML);
    });
}

// Section content templates
const sectionTemplates = {
    album: `
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-center mb-8 brand-primary">Album ảnh</h1>

            <!-- Filter Tabs -->
            <div class="flex justify-center mb-8">
                <div class="bg-white rounded-lg shadow-lg p-2">
                    <button onclick="filterAlbum('all')" class="album-filter active px-4 py-2 rounded-lg mx-1 bg-brand-primary text-white">
                        Tất cả
                    </button>
                    <button onclick="filterAlbum('food')" class="album-filter px-4 py-2 rounded-lg mx-1 hover:bg-gray-100">
                        Món ăn
                    </button>
                    <button onclick="filterAlbum('restaurant')" class="album-filter px-4 py-2 rounded-lg mx-1 hover:bg-gray-100">
                        Không gian
                    </button>
                    <button onclick="filterAlbum('events')" class="album-filter px-4 py-2 rounded-lg mx-1 hover:bg-gray-100">
                        Sự kiện
                    </button>
                    <button onclick="filterAlbum('customers')" class="album-filter px-4 py-2 rounded-lg mx-1 hover:bg-gray-100">
                        Khách hàng
                    </button>
                </div>
            </div>

            <!-- Masonry Gallery -->
            <div class="masonry" id="albumGallery">
                <!-- Food Images -->
                <div class="album-item food" onclick="openLightbox(0)">
                    <div class="w-full h-64 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-bowl-rice text-6xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Cơm tấm sườn nướng</p>
                        </div>
                    </div>
                </div>

                <div class="album-item food" onclick="openLightbox(1)">
                    <div class="w-full h-48 bg-gradient-to-br from-green-100 to-yellow-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-cookie-bite text-5xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Bánh xèo miền Tây</p>
                        </div>
                    </div>
                </div>

                <div class="album-item food" onclick="openLightbox(2)">
                    <div class="w-full h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-bowl-food text-6xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Hủ tiếu Nam Vang</p>
                        </div>
                    </div>
                </div>

                <!-- Restaurant Images -->
                <div class="album-item restaurant" onclick="openLightbox(3)">
                    <div class="w-full h-56 bg-gradient-to-br from-brown-100 to-orange-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-store text-5xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Mặt tiền nhà hàng</p>
                        </div>
                    </div>
                </div>

                <div class="album-item restaurant" onclick="openLightbox(4)">
                    <div class="w-full h-64 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-chair text-6xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Không gian bàn ăn</p>
                        </div>
                    </div>
                </div>

                <div class="album-item restaurant" onclick="openLightbox(5)">
                    <div class="w-full h-40 bg-gradient-to-br from-gray-100 to-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-utensils text-4xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Bếp chế biến</p>
                        </div>
                    </div>
                </div>

                <!-- Event Images -->
                <div class="album-item events" onclick="openLightbox(6)">
                    <div class="w-full h-60 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-birthday-cake text-6xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Tiệc sinh nhật</p>
                        </div>
                    </div>
                </div>

                <div class="album-item events" onclick="openLightbox(7)">
                    <div class="w-full h-52 bg-gradient-to-br from-gold-100 to-yellow-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-glass-cheers text-5xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Tiệc công ty</p>
                        </div>
                    </div>
                </div>

                <!-- Customer Images -->
                <div class="album-item customers" onclick="openLightbox(8)">
                    <div class="w-full h-44 bg-gradient-to-br from-teal-100 to-green-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-users text-5xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Gia đình khách hàng</p>
                        </div>
                    </div>
                </div>

                <div class="album-item customers" onclick="openLightbox(9)">
                    <div class="w-full h-68 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-smile text-6xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Khách hàng vui vẻ</p>
                        </div>
                    </div>
                </div>

                <div class="album-item food" onclick="openLightbox(10)">
                    <div class="w-full h-56 bg-gradient-to-br from-pink-100 to-red-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-glass-water text-5xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Thức uống tươi mát</p>
                        </div>
                    </div>
                </div>

                <div class="album-item restaurant" onclick="openLightbox(11)">
                    <div class="w-full h-48 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="text-center">
                            <i class="fas fa-couch text-4xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 font-semibold">Khu vực chờ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    booking: `
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-center mb-8 brand-primary">Đặt bàn</h1>

            <div class="max-w-2xl mx-auto">
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <h2 class="text-2xl font-semibold mb-6 text-center">Thông tin đặt bàn</h2>

                    <form onsubmit="handleBooking(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium mb-2">Họ và tên *</label>
                                <input type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Số điện thoại *</label>
                                <input type="tel" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Email</label>
                                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Số khách *</label>
                                <select required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                                    <option value="">Chọn số khách</option>
                                    <option value="1">1 người</option>
                                    <option value="2">2 người</option>
                                    <option value="3">3 người</option>
                                    <option value="4">4 người</option>
                                    <option value="5">5 người</option>
                                    <option value="6">6 người</option>
                                    <option value="7">7 người</option>
                                    <option value="8">8 người</option>
                                    <option value="more">Trên 8 người</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Ngày *</label>
                                <input type="date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Giờ *</label>
                                <select required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                                    <option value="">Chọn giờ</option>
                                    <option value="11:00">11:00</option>
                                    <option value="11:30">11:30</option>
                                    <option value="12:00">12:00</option>
                                    <option value="12:30">12:30</option>
                                    <option value="13:00">13:00</option>
                                    <option value="13:30">13:30</option>
                                    <option value="17:00">17:00</option>
                                    <option value="17:30">17:30</option>
                                    <option value="18:00">18:00</option>
                                    <option value="18:30">18:30</option>
                                    <option value="19:00">19:00</option>
                                    <option value="19:30">19:30</option>
                                    <option value="20:00">20:00</option>
                                    <option value="20:30">20:30</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-6">
                            <label class="block text-sm font-medium mb-2">Ghi chú</label>
                            <textarea rows="4" placeholder="Yêu cầu đặc biệt, dị ứng thực phẩm..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary"></textarea>
                        </div>

                        <button type="submit" class="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold mt-6 hover:bg-blue-600 transition-colors">
                            <i class="fas fa-calendar-check mr-2"></i>Đặt bàn ngay
                        </button>
                    </form>
                </div>

                <!-- Booking Info -->
                <div class="mt-8 bg-blue-50 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4 text-blue-800">Thông tin quan trọng</h3>
                    <ul class="space-y-2 text-blue-700">
                        <li><i class="fas fa-info-circle mr-2"></i>Vui lòng đặt bàn trước ít nhất 2 giờ</li>
                        <li><i class="fas fa-clock mr-2"></i>Thời gian giữ bàn: 15 phút kể từ giờ đặt</li>
                        <li><i class="fas fa-phone mr-2"></i>Hotline hỗ trợ: 0123-456-789</li>
                        <li><i class="fas fa-gift mr-2"></i>Miễn phí bánh sinh nhật cho nhóm từ 6 người trở lên</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    contact: `
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-center mb-8 brand-primary">Liên hệ</h1>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Contact Form -->
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <h2 class="text-2xl font-semibold mb-6">Gửi tin nhắn cho chúng tôi</h2>

                    <form onsubmit="handleContact(event)">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Họ và tên *</label>
                                <input type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Email *</label>
                                <input type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Số điện thoại</label>
                                <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Chủ đề</label>
                                <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary">
                                    <option value="">Chọn chủ đề</option>
                                    <option value="booking">Đặt bàn</option>
                                    <option value="menu">Thực đơn</option>
                                    <option value="delivery">Giao hàng</option>
                                    <option value="feedback">Góp ý</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Nội dung *</label>
                                <textarea rows="4" required placeholder="Nhập nội dung tin nhắn..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary"></textarea>
                            </div>
                            <button type="submit" class="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                <i class="fas fa-paper-plane mr-2"></i>Gửi tin nhắn
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Contact Info -->
                <div class="space-y-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4 brand-primary">Thông tin liên hệ</h3>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-map-marker-alt text-white"></i>
                                </div>
                                <div>
                                    <p class="font-semibold">Địa chỉ</p>
                                    <p class="text-gray-600">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-phone text-white"></i>
                                </div>
                                <div>
                                    <p class="font-semibold">Điện thoại</p>
                                    <p class="text-gray-600">0123-456-789</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-envelope text-white"></i>
                                </div>
                                <div>
                                    <p class="font-semibold">Email</p>
                                    <p class="text-gray-600">info@amthucphuongnam.com</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-clock text-white"></i>
                                </div>
                                <div>
                                    <p class="font-semibold">Giờ mở cửa</p>
                                    <p class="text-gray-600">8:00 - 22:00 (Hàng ngày)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Map -->
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4 brand-primary">Bản đồ chi nhánh chính</h3>
                        <div class="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                            <div class="text-center text-gray-500">
                                <i class="fas fa-map-marked-alt text-4xl mb-2"></i>
                                <p>Bản đồ nhúng Google Maps</p>
                                <p class="text-sm">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    about: `
        <div class="container mx-auto px-4 py-12">
            <!-- Hero About -->
            <div class="relative h-64 rounded-lg overflow-hidden mb-12 gradient-overlay">
                <div class="absolute inset-0 flex items-center justify-center text-white text-center">
                    <div>
                        <h1 class="text-4xl font-bold mb-4">Câu chuyện của chúng tôi</h1>
                        <p class="text-xl">Hơn 20 năm gìn giữ hương vị đặc sản miền Nam</p>
                    </div>
                </div>
            </div>

            <!-- Story -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                    <h2 class="text-3xl font-bold mb-6 brand-primary">Khởi nguồn từ tình yêu ẩm thực</h2>
                    <p class="text-gray-700 mb-4 leading-relaxed">
                        Ẩm Thực Phương Nam được thành lập vào năm 2003 bởi bà Nguyễn Thị Hoa - một người phụ nữ miền Tây với niềm đam mê ẩm thực quê hương. Bắt đầu từ một quầy cơm nhỏ ở chợ Bến Thành, chúng tôi đã không ngừng phát triển và mở rộng.
                    </p>
                    <p class="text-gray-700 mb-4 leading-relaxed">
                        Với phương châm "Giữ trọn hương vị truyền thống", chúng tôi luôn chọn lựa nguyên liệu tươi ngon từ các vùng miền Nam, từ gạo tấm Cần Thơ, tôm càng xanh Cà Mau đến rau củ sạch từ Đà Lạt.
                    </p>
                    <p class="text-gray-700 leading-relaxed">
                        Ngày nay, Ẩm Thực Phương Nam đã có 5 chi nhánh trên toàn TP.HCM và phục vụ hơn 1000 khách hàng mỗi ngày với dịch vụ ăn tại chỗ và giao hàng tận nơi.
                    </p>
                </div>
                <div class="space-y-6">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-3 brand-primary">Tầm nhìn</h3>
                        <p class="text-gray-700">Trở thành thương hiệu ẩm thực miền Nam hàng đầu, mang đến trải nghiệm ẩm thực authentic và dịch vụ chất lượng cao.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-3 brand-primary">Sứ mệnh</h3>
                        <p class="text-gray-700">Gìn giữ và phát huy giá trị ẩm thực truyền thống miền Nam, mang lại những bữa ăn ngon và kỷ niệm đẹp cho mọi gia đình Việt.</p>
                    </div>
                </div>
            </div>

            <!-- Values -->
            <div class="mb-12">
                <h2 class="text-3xl font-bold text-center mb-8 brand-primary">Giá trị cốt lõi</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-heart text-white text-2xl"></i>
                        </div>
                        <h3 class="font-semibold mb-2">Chất lượng</h3>
                        <p class="text-gray-600 text-sm">Nguyên liệu tươi ngon, quy trình chế biến khép kín, đảm bảo vệ sinh an toàn thực phẩm.</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-clock text-white text-2xl"></i>
                        </div>
                        <h3 class="font-semibold mb-2">Tận tâm</h3>
                        <p class="text-gray-600 text-sm">Phục vụ chu đáo, nhiệt tình, luôn lắng nghe và cải thiện theo phản hồi khách hàng.</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-leaf text-white text-2xl"></i>
                        </div>
                        <h3 class="font-semibold mb-2">Truyền thống</h3>
                        <p class="text-gray-600 text-sm">Giữ gìn công thức nấu ăn truyền thống, không ngừng sáng tạo để phù hợp thời đại.</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-users text-white text-2xl"></i>
                        </div>
                        <h3 class="font-semibold mb-2">Cộng đồng</h3>
                        <p class="text-gray-600 text-sm">Đồng hành cùng cộng đồng, tạo không gian gặp gỡ ấm cúng cho mọi gia đình.</p>
                    </div>
                </div>
            </div>

            <!-- FAQ -->
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-3xl font-bold text-center mb-8 brand-primary">Câu hỏi thường gặp</h2>
                <div class="space-y-4">
                    <div class="border-b pb-4">
                        <button class="flex items-center justify-between w-full text-left font-semibold" onclick="toggleFAQ(1)">
                            <span>Nhà hàng có phục vụ chay không?</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div id="faq1" class="hidden mt-2 text-gray-600">
                            Có, chúng tôi có thực đơn chay phong phú với các món như cơm tấm chay, bánh xèo chay, hủ tiếu chay... được chế biến hoàn toàn từ nguyên liệu thực vật.
                        </div>
                    </div>
                    <div class="border-b pb-4">
                        <button class="flex items-center justify-between w-full text-left font-semibold" onclick="toggleFAQ(2)">
                            <span>Có giao hàng vào cuối tuần không?</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div id="faq2" class="hidden mt-2 text-gray-600">
                            Có, chúng tôi phục vụ giao hàng 7 ngày trong tuần từ 8:00 - 21:30. Cuối tuần có thể hơi chậm do lượng đơn đông.
                        </div>
                    </div>
                    <div class="border-b pb-4">
                        <button class="flex items-center justify-between w-full text-left font-semibold" onclick="toggleFAQ(3)">
                            <span>Có thể đặt bàn cho nhóm lớn không?</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div id="faq3" class="hidden mt-2 text-gray-600">
                            Có, chúng tôi nhận đặt bàn cho nhóm từ 10-50 người. Vui lòng liên hệ trước ít nhất 1 ngày để được tư vấn menu và không gian phù hợp.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

// Function to load section content
function loadSectionContent(sectionName) {
    const contentContainer = document.getElementById(sectionName + '-content');
    if (contentContainer && sectionTemplates[sectionName]) {
        contentContainer.innerHTML = sectionTemplates[sectionName];
    }
}
