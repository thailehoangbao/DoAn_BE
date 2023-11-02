# DoAn_BE 
# CREATE DATABASE
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NOT NULL,
  `pass_word` varchar(255) DEFAULT NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` VARCHAR(255) DEFAULT NULL,
  `gender` VARCHAR(255) DEFAULT NULL,
  `role` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
);
ALTER TABLE `users`
ADD COLUMN timecreated VARCHAR(255) DEFAULT NULL;

DROP TABLE Phong;

CREATE TABLE `phong` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(255) DEFAULT NULL,
  `khach` INT DEFAULT NULL,
  `phong_ngu` INT DEFAULT NULL,
  `giuong` INT DEFAULT NULL,
  `phong_tam` INT DEFAULT NULL,
  `mo_ta` TEXT DEFAULT NULL,
  `gia_tien` INT DEFAULT NULL,
  `may_giat` BOOLEAN,
  `ban_la` BOOLEAN,
  `tivi` BOOLEAN,
  `dieu_hoa` BOOLEAN,
  `wifi` BOOLEAN,
  `bep` BOOLEAN,
  `do_xe` BOOLEAN,
  `ho_boi` BOOLEAN,
  `ban_ui` BOOLEAN,
  `hinh_anh` TEXT DEFAULT NULL,
   `vitri_id` int, -- Thêm cột `vitri_id`
  `user_id` int,  -- Thêm cột `user_id`
   PRIMARY KEY (`room_id`),
  KEY `vitri_id` (`vitri_id`),
  KEY `user_id` (`user_id`),
  foreign key (`user_id`) references users(`user_id`),
  foreign key (`vitri_id`) references vitri(`vitri_id`)
);

INSERT into `phong` (ten_phong,khach,phong_ngu,giuong,phong_tam,mo_ta,gia_tien,may_giat,ban_la,tivi,dieu_hoa,wifi,bep,do_xe,ho_boi,ban_ui,hinh_anh,vitri_id,user_id)
VALUES ('Hotel Califonia VT',2,1,1,1,'tuyệt vời',25,true,FALSE,true,true,true,true,true,true,FALSE,'',1,null)


CREATE TABLE `phong` (
  `vitri_id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) DEFAULT NULL,
  `hinh_anh` TEXT DEFAULT NULL,
   PRIMARY KEY (`vitri_id`)
);


INSERT into `vitri` (ten_vi_tri,tinh_thanh,quoc_gia,hinh_anh)
VALUES ('Vũng Tàu','Vũng Tàu','Việt Nam','')

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `ngay_den` datetime,
  `ngay_di` datetime,
  `so_luong_khach` int DEFAULT NULL,
     PRIMARY KEY (`order_id`),
  `user_id` int,
  `room_id` int,
    foreign key (`user_id`) references users(`user_id`),
    foreign key (`room_id`) references phong(`room_id`)
);

CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `ngay_binh_luan` datetime,
  `noi_dung` text DEFAULT null,
  `sao_binh_luan` int DEFAULT NULL,
   PRIMARY KEY (`comment_id`),
  `user_id` int,
  `room_id` int,
    foreign key (`user_id`) references users(`user_id`),
    foreign key (`room_id`) references phong(`room_id`)
);
