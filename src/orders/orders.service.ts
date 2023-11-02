import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrdersService {
    prisma = new PrismaClient();
    async layDanhSachDatPhong() {
        const data = await this.prisma.orders.findMany();
        return data;
    }

    async layThongTinDatPhong(order_id) {
        const data = await this.prisma.orders.findUnique({
            where: {
                order_id: Number(order_id)
            }
        })
        return data;
    }

    async layThongTinDatPhongTheoMaNguoiDung(user_id) {
        const data = await this.prisma.orders.findMany({
            where: {
                user_id: Number(user_id)
            }
        })
        return data;
    }

    async xoaDatPhong(order_id) {
        await this.prisma.orders.delete({
            where: {
                order_id: Number(order_id)
            }
        })
        return 'Deleted!';
    }

    async themOrders(body) {
        const { room_id, user_id, ngay_den, ngay_di, so_luong_khach } = body;

        // Kiểm tra xem đã có ai đặt phòng trong khoảng thời gian này chưa
        const existingOrder = await this.prisma.orders.findFirst({
            where: {
                room_id: Number(room_id),
                OR: [
                    {
                        ngay_den: { lte: new Date(ngay_den) },
                        ngay_di: { gte: new Date(ngay_den) },
                    },
                    {
                        ngay_den: { lte: new Date(ngay_di) },
                        ngay_di: { gte: new Date(ngay_di) },
                    },
                ],
            },
        });

        if (existingOrder) {
            throw new NotFoundException({ statusCode: 404, message: 'Phòng này đã có người đặt trong thời gian này!' })
        } else {
            // Thêm đặt phòng mới vào bảng orders
            await this.prisma.orders.create({
                data: {
                    room_id: Number(room_id),
                    user_id: Number(user_id),
                    ngay_den: new Date(ngay_den),
                    ngay_di: new Date(ngay_di),
                    so_luong_khach: Number(so_luong_khach)
                },
            });
            return 'Booking Success!';
        }
    }

    async suaOrders(body, order_id, req) {
        const { room_id, user_id, ngay_den, ngay_di, so_luong_khach } = body;
        let decodeToken = req.user;

        if(!(decodeToken.user_id == user_id)) {
            throw new NotFoundException({ statusCode: 404, message: 'Không có quyền chỉnh sửa!' })
        }
        // Kiểm tra xem đã có ai đặt phòng trong khoảng thời gian này chưa
        const existingOrder = await this.prisma.orders.findFirst({
            where: {
                room_id: Number(room_id),
                OR: [
                    {
                        ngay_den: { lte: new Date(ngay_den) },
                        ngay_di: { gte: new Date(ngay_den) },
                    },
                    {
                        ngay_den: { lte: new Date(ngay_di) },
                        ngay_di: { gte: new Date(ngay_di) },
                    },
                ],
            },
        });

        if (existingOrder) {
            throw new NotFoundException({ statusCode: 404, message: 'Phòng này đã có người đặt trong thời gian này!' })
        } else {
            // Thêm đặt phòng mới vào bảng orders
            await this.prisma.orders.update({
                where: {
                    order_id: Number(order_id)
                },
                data: {
                    room_id: Number(room_id),
                    user_id: Number(user_id),
                    ngay_den: new Date(ngay_den),
                    ngay_di: new Date(ngay_di),
                    so_luong_khach: Number(so_luong_khach)
                },
            });
            return 'Booking Success!';
        }
    }
}
