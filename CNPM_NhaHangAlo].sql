-- =========================
-- Database & charset
-- =========================
DROP DATABASE IF EXISTS alodzo100;
CREATE DATABASE alodzo100
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alodzo100;

-- =========================
-- 1a) Vai trò & Người dùng
-- =========================
CREATE TABLE vai_tro (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten VARCHAR(50) NOT NULL UNIQUE COMMENT 'admin, user',
  mo_ta VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten VARCHAR(150) NOT NULL,
  email VARCHAR(200) UNIQUE,
  phone VARCHAR(20) DEFAULT NULL,
  mat_khau VARCHAR(255) NOT NULL COMMENT 'hash bcrypt',
  avatar_filename VARCHAR(255) DEFAULT NULL,
  role_id INT NOT NULL DEFAULT 1,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES vai_tro(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =========================
-- 1b) Bảng quên mật khẩu
-- =========================
CREATE TABLE password_resets (
  email VARCHAR(200) PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_password_reset_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE INDEX idx_password_resets_token ON password_resets(token);

-- =========================
-- 1c) Sổ địa chỉ người dùng
-- =========================
CREATE TABLE user_dia_chi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  ten_nguoi_nhan VARCHAR(150) NOT NULL,
  phone_nguoi_nhan VARCHAR(20) NOT NULL,
  dia_chi_day_du VARCHAR(255) NOT NULL,
  la_mac_dinh TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 2) Danh mục & Món ăn
-- =========================
CREATE TABLE danh_muc (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten VARCHAR(150) NOT NULL,
  mo_ta TEXT DEFAULT NULL,
  thu_tu INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE mon_an (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten VARCHAR(200) NOT NULL,
  mo_ta TEXT DEFAULT NULL,
  gia DECIMAL(14,2) NOT NULL,
  gia_km DECIMAL(14,2) DEFAULT NULL,
  image_filename VARCHAR(255) DEFAULT NULL,
  danh_muc_id INT DEFAULT NULL,
  trang_thai ENUM('con_hang','hethang','an') NOT NULL DEFAULT 'con_hang',
  so_luong INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_mon_danhmuc FOREIGN KEY (danh_muc_id) REFERENCES danh_muc(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE mon_an_image (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  mon_an_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  is_primary TINYINT(1) DEFAULT 0,
  thu_tu INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_img_mon FOREIGN KEY (mon_an_id) REFERENCES mon_an(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 3) Giỏ hàng
-- =========================
CREATE TABLE gio_hang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE gio_hang_item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gio_hang_id INT NOT NULL,
  mon_an_id INT NOT NULL,
  so_luong INT NOT NULL DEFAULT 1,
  don_gia DECIMAL(14,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_cartitem_cart FOREIGN KEY (gio_hang_id) REFERENCES gio_hang(id) ON DELETE CASCADE,
  CONSTRAINT fk_cartitem_mon FOREIGN KEY (mon_an_id) REFERENCES mon_an(id) ON DELETE RESTRICT,
  UNIQUE KEY ux_cart_mon (gio_hang_id, mon_an_id)
) ENGINE=InnoDB;

DROP TRIGGER IF EXISTS trg_users_create_cart;
DELIMITER $$
CREATE TRIGGER trg_users_create_cart
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  IF (SELECT ten FROM vai_tro WHERE id = NEW.role_id) = 'user' THEN
    INSERT INTO gio_hang(user_id) VALUES (NEW.id);
  END IF;
END$$
DELIMITER ;

-- =========================
-- 4) Khuyến Mãi, Đơn hàng & Thanh Toán
-- =========================
CREATE TABLE khuyen_mai (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ma_code VARCHAR(50) NOT NULL UNIQUE,
  mo_ta TEXT,
  loai_giam_gia ENUM('phan_tram', 'so_tien') NOT NULL DEFAULT 'so_tien',
  gia_tri DECIMAL(14,2) NOT NULL,
  don_hang_toi_thieu DECIMAL(14,2) DEFAULT 0,
  ngay_bat_dau DATETIME NOT NULL,
  ngay_ket_thuc DATETIME NOT NULL,
  so_luong_gioi_han INT UNSIGNED DEFAULT NULL,
  so_luong_da_dung INT UNSIGNED DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE don_hang (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  ma_don VARCHAR(60) NOT NULL UNIQUE,
  user_id INT NULL,
  ten_nguoi_nhan VARCHAR(150) NOT NULL,
  phone_nguoi_nhan VARCHAR(20) NOT NULL,
  dia_chi_giao_hang VARCHAR(255) NOT NULL,
  tong_tien_hang DECIMAL(14,2) NOT NULL,
  phi_van_chuyen DECIMAL(14,2) DEFAULT 0,
  khuyen_mai_id INT NULL,
  tien_giam_gia DECIMAL(14,2) DEFAULT 0,
  thanh_tien_phai_tra DECIMAL(14,2) GENERATED ALWAYS AS (tong_tien_hang + phi_van_chuyen - tien_giam_gia) STORED,
  loai_thanh_toan ENUM('vnpay','tien_mat','qr_ngan_hang') NOT NULL DEFAULT 'vnpay',
  thanh_toan_status ENUM('chua','thanh_cong','that_bai') DEFAULT 'chua',
  trang_thai ENUM('cho_xac_nhan','da_xac_nhan','dang_giao','da_giao','da_huy') NOT NULL DEFAULT 'cho_xac_nhan',
  ghi_chu TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_order_promo FOREIGN KEY (khuyen_mai_id) REFERENCES khuyen_mai(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE don_hang_item (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  don_hang_id BIGINT NOT NULL,
  mon_an_id INT NOT NULL,
  ten_mon VARCHAR(255) NOT NULL,
  so_luong INT NOT NULL,
  don_gia DECIMAL(14,2) NOT NULL,
  thanh_tien DECIMAL(14,2) GENERATED ALWAYS AS (so_luong * don_gia) STORED,
  CONSTRAINT fk_orderitem_order FOREIGN KEY (don_hang_id) REFERENCES don_hang(id) ON DELETE CASCADE,
  CONSTRAINT fk_orderitem_mon FOREIGN KEY (mon_an_id) REFERENCES mon_an(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE don_hang_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  don_hang_id BIGINT NOT NULL,
  trang_thai VARCHAR(50) NOT NULL,
  ghi_chu TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_history_order FOREIGN KEY (don_hang_id) REFERENCES don_hang(id) ON DELETE CASCADE
);

CREATE TABLE thanh_toan (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  don_hang_id BIGINT NOT NULL,
  provider VARCHAR(50) NOT NULL DEFAULT 'vnpay',
  provider_txn_id VARCHAR(255) DEFAULT NULL,
  amount DECIMAL(14,2) NOT NULL,
  status ENUM('pending','success','failed') NOT NULL DEFAULT 'pending',
  payload JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pay_order FOREIGN KEY (don_hang_id) REFERENCES don_hang(id) ON DELETE CASCADE
) ENGINE=InnoDB;

DROP TRIGGER IF EXISTS trg_generate_ma_don;
DELIMITER $$
CREATE TRIGGER trg_generate_ma_don
BEFORE INSERT ON don_hang
FOR EACH ROW
BEGIN
  SET NEW.ma_don = CONCAT('ADZ', DATE_FORMAT(NOW(), '%Y%m%d'), LPAD(FLOOR(RAND()*100000), 5, '0'));
END$$
DELIMITER ;

-- =========================
-- 5) Nhật ký hệ thống
-- =========================
CREATE TABLE lich_su_he_thong (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  hanh_dong VARCHAR(255) NOT NULL,
  chi_tiet TEXT DEFAULT NULL,
  ip VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================
-- 6) View & Index thống kê
-- =========================
CREATE INDEX idx_donhang_created ON don_hang(created_at);
CREATE INDEX idx_donhang_status ON don_hang(trang_thai, thanh_toan_status);
DROP VIEW IF EXISTS vw_doanh_thu_ngay;
CREATE VIEW vw_doanh_thu_ngay AS
SELECT DATE(created_at) AS ngay,
       COUNT(id) AS so_don,
       SUM(thanh_tien_phai_tra) AS tong_doanh_thu
FROM don_hang
WHERE thanh_toan_status='thanh_cong' AND trang_thai <> 'da_huy'
GROUP BY DATE(created_at);

-- =========================
-- 8) Album Ảnh Quán
-- =========================
CREATE TABLE album (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten VARCHAR(255) NOT NULL COMMENT 'Tên album, ví dụ: Không gian quán',
  mo_ta TEXT DEFAULT NULL,
  anh_dai_dien_filename VARCHAR(255) DEFAULT NULL COMMENT 'Ảnh bìa của album',
  thu_tu INT DEFAULT 0,
  is_visible TINYINT(1) DEFAULT 1 COMMENT '1 = hiện, 0 = ẩn',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE album_anh (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  album_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  tieu_de VARCHAR(255) DEFAULT NULL,
  thu_tu INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_anh_album FOREIGN KEY (album_id) REFERENCES album(id) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE INDEX idx_album_anh_albumid ON album_anh(album_id);


-- =========================
-- 9) Seed tối thiểu
-- =========================
INSERT INTO vai_tro (id, ten, mo_ta) VALUES (1, 'user', 'Khách hàng'), (2, 'admin', 'Quản trị viên');
INSERT INTO users (id, ten, email, phone, mat_khau, role_id) VALUES 
(1, 'Super Admin', 'admin@alodzo100.vn', '0900000000', '$2y$12$EXAMPLE_HASH_REPLACE', 2),
(2, 'Văn Toàn', 'vantoan@gmail.com', '0912345678', '$2y$12$EXAMPLE_HASH_REPLACE_2', 1);
INSERT INTO user_dia_chi (user_id, ten_nguoi_nhan, phone_nguoi_nhan, dia_chi_day_du, la_mac_dinh) VALUES
(2, 'Nguyễn Văn Toàn', '0912345678', '123 Đường ABC, Phường X, Quận Y, TP. Hồ Chí Minh', 1);
INSERT INTO khuyen_mai (ma_code, mo_ta, loai_giam_gia, gia_tri, don_hang_toi_thieu, ngay_bat_dau, ngay_ket_thuc, so_luong_gioi_han) VALUES
('KHAITRUONG', 'Giảm 30k cho đơn từ 150k', 'so_tien', 30000, 150000, '2023-01-01 00:00:00', '2025-12-31 23:59:59', 1000);
INSERT INTO danh_muc (id, ten, thu_tu) VALUES (1,'Món chính',1),(2,'Lẩu',2),(3,'Tráng miệng',3),(4,'Đồ uống',4);
INSERT INTO mon_an (id,ten,gia,image_filename,danh_muc_id,so_luong) VALUES
(1,'Cơm sườn đặc biệt',65000,'com_suon.png',1,100), (2,'Lẩu Thái hải sản',250000,'lau_thai.png',2,50),
(3,'Bánh flan',25000,'banh_flan.png',3,200), (4,'Trà tắc khổng lồ',20000,'tra_tac.png',4,500);
INSERT INTO album (id, ten, mo_ta, anh_dai_dien_filename) VALUES
(1, 'Không Gian Quán', 'Toàn cảnh không gian nhà hàng Alodzo100 ấm cúng và sang trọng.', 'khonggian_cover.jpg'),
(2, 'Sự kiện 20/10', 'Những khoảnh khắc đáng nhớ trong sự kiện tri ân phái đẹp.', 'event_cover.jpg');
INSERT INTO album_anh (album_id, filename, tieu_de) VALUES
(1, 'khonggian_01.jpg', 'Khu vực bàn ăn gần cửa sổ'), (1, 'khonggian_02.jpg', 'Quầy bar và pha chế'), (1, 'khonggian_03.jpg', 'Không gian ngoài trời'),
(2, 'sukien_01.jpg', 'Khách hàng check-in'), (2, 'sukien_02.jpg', 'Sân khấu chính');