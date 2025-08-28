# Ẩm Thực Phương Nam - Website Nhà Hàng

## Tổng quan
Website nhà hàng Ẩm Thực Phương Nam được tái cấu trúc theo mô hình component-based để dễ dàng bảo trì và mở rộng.

## Cấu trúc dự án

```
restaurant-alo-dzo/
├── index.html              # File HTML gốc (monolithic)
├── index-new.html          # File HTML mới (component-based)
├── README.md               # Tài liệu hướng dẫn
├── assets/
│   ├── css/
│   │   └── styles.css      # CSS tái sử dụng
│   └── js/
│       ├── script.js       # JavaScript chính
│       └── components.js   # Dữ liệu và template components
└── components/
    ├── header.html         # Component header
    ├── navigation.html     # Component navigation
    ├── footer.html         # Component footer
    ├── menu-item.html      # Component menu item
    ├── modal.html          # Component modal
    └── admin-panel.html    # Component admin panel
```

## Các thành phần chính

### 1. Components
- **Header**: Logo, thanh tìm kiếm, menu người dùng
- **Navigation**: Menu điều hướng chính
- **Footer**: Thông tin liên hệ, liên kết nhanh
- **Menu Item**: Template tái sử dụng cho món ăn
- **Modal**: Popup cho chi tiết món ăn, đăng nhập, lightbox
- **Admin Panel**: Giao diện quản trị

### 2. Assets
- **CSS**: Styles tùy chỉnh với Tailwind CSS
- **JavaScript**: Logic ứng dụng và quản lý components

### 3. Tính năng
- Hiển thị menu với filter và sort
- Giỏ hàng với localStorage
- Đặt bàn online
- Album ảnh với lightbox
- Panel quản trị
- Responsive design

## Cách sử dụng

### Chạy website
1. Mở file `index-new.html` trong trình duyệt
2. Hoặc sử dụng live server để phát triển

### Phát triển
1. Chỉnh sửa components trong thư mục `components/`
2. Cập nhật styles trong `assets/css/styles.css`
3. Thêm logic trong `assets/js/script.js`
4. Cập nhật dữ liệu trong `assets/js/components.js`

## Tính năng chính

### Trang chủ
- Hero banner với call-to-action
- Danh mục nổi bật
- Flash sale
- Món ăn bán chạy
- Đánh giá khách hàng

### Thực đơn
- Filter theo danh mục
- Sắp xếp theo giá, đánh giá
- Chi tiết món ăn
- Thêm vào giỏ hàng

### Giỏ hàng
- Slide-over cart
- Cập nhật số lượng
- Tính tổng tiền
- Thanh toán VNPAY

### Đặt bàn
- Form đặt bàn online
- Validation dữ liệu
- Thông tin hỗ trợ

### Album
- Masonry layout
- Filter theo loại ảnh
- Lightbox xem ảnh

### Admin
- Dashboard thống kê
- Quản lý món ăn
- Quản lý đặt bàn
- Quản lý đơn hàng

## Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Styling với Tailwind CSS
- **JavaScript ES6+**: Logic ứng dụng
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## Tối ưu hóa

### Performance
- Component lazy loading
- CSS và JS được tách riêng
- Responsive images

### SEO
- Meta tags đầy đủ
- Semantic HTML
- Open Graph tags

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader friendly

## Hướng dẫn mở rộng

### Thêm component mới
1. Tạo file HTML trong `components/`
2. Thêm CSS tương ứng
3. Cập nhật logic load component trong `script.js`

### Thêm trang mới
1. Thêm section trong `index-new.html`
2. Tạo template trong `components.js`
3. Cập nhật navigation

### Tùy chỉnh theme
1. Chỉnh sửa biến CSS trong `styles.css`
2. Cập nhật class Tailwind
3. Thay đổi color scheme

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License
© 2023 Ẩm Thực Phương Nam. All rights reserved.

## Liên hệ
- Email: info@amthucphuongnam.com
- Phone: 0123-456-789
- Address: 123 Nguyễn Huệ, Q.1, TP.HCM
