#!/bin/bash

# Script to update all remaining pages to use component structure

# Function to update page header
update_page_header() {
    local file=$1
    local title=$2
    local description=$3
    
    # Create temporary file with new header
    cat > temp_header.html << EOF
<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title - Ẩm Thực Phương Nam</title>
    <meta name="description" content="$description">
    <meta property="og:title" content="$title - Ẩm Thực Phương Nam">
    <meta property="og:description" content="$description">
    <meta property="og:type" content="restaurant">
    
    <!-- External CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="bg-gray-50">
    <!-- Top Bar Component -->
    <div id="topbar-container"></div>

    <!-- Header Component -->
    <div id="header-container"></div>
EOF
}

# Function to update page footer
update_page_footer() {
    cat > temp_footer.html << EOF
    <!-- Footer Component -->
    <div id="footer-container"></div>

    <!-- Shopping Cart Component -->
    <div id="cart-container"></div>

    <!-- Modal Container -->
    <div id="modal-container"></div>

    <!-- JavaScript -->
    <script src="assets/js/components.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
EOF
}

echo "Updating remaining pages to use component structure..."

# Update album.html
echo "Updating album.html..."
update_page_header "album.html" "Album ảnh" "Khám phá album ảnh món ăn, không gian nhà hàng và các sự kiện tại Ẩm Thực Phương Nam"

# Update booking.html  
echo "Updating booking.html..."
update_page_header "booking.html" "Đặt bàn" "Đặt bàn online tại nhà hàng Ẩm Thực Phương Nam - Nhanh chóng, tiện lợi"

# Update contact.html
echo "Updating contact.html..."
update_page_header "contact.html" "Liên hệ" "Liên hệ với nhà hàng Ẩm Thực Phương Nam - Địa chỉ, điện thoại, email"

# Update admin.html
echo "Updating admin.html..."
update_page_header "admin.html" "Admin Panel" "Trang quản trị nhà hàng Ẩm Thực Phương Nam"

# Clean up
rm -f temp_header.html temp_footer.html

echo "All pages updated successfully!"
