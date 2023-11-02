import { Injectable ,NotFoundException,BadRequestException} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PhongService {
    prisma = new PrismaClient();

    async layDanhSachPhong() {
        const data = await this.prisma.phong.findMany();
        return data;
    }

    async layPhongTheoViTri(vitri_id) {
        const data = await this.prisma.phong.findMany({
            where: {
                vitri_id: Number(vitri_id)
            }
        })

        return data;
    }

    async layPhongPhanTrang(page, size) {
        let index = (Number(page) - 1) * Number(size);
        let data = await this.prisma.phong.findMany({
            skip: index,
            take: Number(size)
        })
        return data;
    }

    async layPhongTheoRoomId(room_id: number) {
        // console.log(room_id)
        let data = await this.prisma.phong.findUnique({
            where: {
                room_id: Number(room_id)
            }
        })
        if(!data) {
            throw new NotFoundException({statusCode: 404, message:"Không tìm thấy phòng!"})
        }
        return data;
    }

    async searchPhong(keyword: string) {
        let data = await this.prisma.phong.findMany({
            where: {
                ten_phong: {
                    contains: keyword // Sử dụng contains để tìm kiếm username gần giống keyword
                }
            }
        })
        return data;
    }

    async themPhong(body) {
        const newData = {
            ten_phong: String(body.ten_phong),
            khach: Number(body.khach),
            phong_ngu: Number(body.phong_ngu),
            giuong: Number(body.giuong),
            phong_tam:Number(body.phong_tam),
            mo_ta: String(body.mo_ta),
            gia_tien: Number(body.gia_tien),
            may_giat: Boolean(body.may_giat),
            ban_la: Boolean(body.ban_la),
            tivi: Boolean(body.tivi),
            dieu_hoa: Boolean(body.dieu_hoa),
            wifi: Boolean(body.wifi),
            bep: Boolean(body.bep),
            do_xe: Boolean(body.do_xe),
            ho_boi: Boolean(body.ho_boi),
            ban_ui: Boolean(body.ban_ui),
            vitri_id: Number(body.vitri_id),
            hinh_anh: String(body.hinh_anh),
            user_id: null
        }

        await this.prisma.phong.create({
            data: newData
        })
        return 'Success!'
    }

    async chinhSuaPhong(body,room_id) {
        const data = await this.prisma.phong.findUnique({
            where: {
                room_id: Number(room_id)
            }
        })
        if(!data) {
            throw new NotFoundException({statusCode: 404, message:"Không tìm thấy mã phòng này!"})
        }

        const newData = {
            ten_phong: String(body.ten_phong),
            khach: Number(body.khach),
            phong_ngu: Number(body.phong_ngu),
            giuong: Number(body.giuong),
            phong_tam:Number(body.phong_tam),
            mo_ta: String(body.mo_ta),
            gia_tien: Number(body.gia_tien),
            may_giat: Boolean(body.may_giat),
            ban_la: Boolean(body.ban_la),
            tivi: Boolean(body.tivi),
            dieu_hoa: Boolean(body.dieu_hoa),
            wifi: Boolean(body.wifi),
            bep: Boolean(body.bep),
            do_xe: Boolean(body.do_xe),
            ho_boi: Boolean(body.ho_boi),
            ban_ui: Boolean(body.ban_ui),
            vitri_id: Number(body.vitri_id),
            hinh_anh: String(body.hinh_anh),
            user_id: null
        }

        await this.prisma.phong.update({
            where:{
                room_id: Number(room_id)
            },
            data: newData
        })
        return 'Success!'
    }

    async xoaPhong(room_id: number,req ) {
        const data: any = req.user;
        // console.log(data.role)
        if (!(data.role == "ADMIN")) {
            throw new BadRequestException({ statusCode: 404, message: "Bạn không có quyền admin để xóa người dùng!" });
        }
        try {
            // Xóa các hồ sơ trong bảng orders và bảng comments có user_id tương ứng
            await this.prisma.orders.deleteMany({
                where: {
                    room_id: Number(room_id),
                },
            });

            await this.prisma.comments.deleteMany({
                where: {
                    room_id: Number(room_id),
                },
            });

            // Sau khi đã xóa các hồ sơ liên quan, bạn có thể xóa phòng trong bảng room
            await this.prisma.phong.delete({
                where: {
                    room_id: Number(room_id)
                }
            })
            return 'Delete Success!';
        } catch {
            throw new BadRequestException({statusCode: 404, message:"Lỗi dữ liệu liên quan hoặc xóa phòng không tồn tại!"});
        }

    }

    async uploadImagePhong(file,room_id) {
        
        const phong = await this.prisma.phong.findUnique({
            where: {
                room_id: Number(room_id)
            }
        })

        if(!phong) {
            throw new NotFoundException({statusCode: 404, message:"Không tìm thấy phòng!"});
        }
        
        let newRoom = {
            ...phong,
            hinh_anh: file.filename
        }

        await this.prisma.phong.update({
            where: {
                room_id: Number(room_id)
            },
            data: newRoom
        })
        return file;
    }
}
