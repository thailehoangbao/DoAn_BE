import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class VitriService {
    prisma = new PrismaClient();
    async layDanhSachViTri() {
        const data = await this.prisma.vitri.findMany();
        return data;
    }

    async layViTriTheoMaViTri(vitri_id: number) {
        const data = await this.prisma.vitri.findUnique({
            where: {
                vitri_id: Number(vitri_id)
            }
        })

        if (!data) {
            throw new NotFoundException({ statusCode: 404, message: "Không tìm thấy vị trí!" })
        }
        return data;
    }

    async phanTrangTimKiemPage(page, size) {
        let index = (Number(page) - 1) * Number(size);
        let data = await this.prisma.vitri.findMany({
            skip: index,
            take: Number(size)
        })
        return data;
    }

    async themViTri(body) {
        const newData =
        {
            ten_vi_tri: String(body.ten_vi_tri),
            tinh_thanh: String(body.tinh_thanh),
            quoc_gia: String(body.quoc_gia),
            hinh_anh: String(body.hinh_anh)
        }

        await this.prisma.vitri.create({
            data: newData
        });
        return 'Success!';
    }

    async chinhSuaViTri(body, vitri_id) {
        const vitri = await this.prisma.vitri.findUnique({
            where: {
                vitri_id: Number(vitri_id)
            }
        })
        if (!vitri) {
            throw new NotFoundException({ statusCode: 404, message: "Không tìm thấy vị trí!" })
        }
        const newData =
        {
            ten_vi_tri: body.ten_vi_tri,
            tinh_thanh: body.tinh_thanh,
            quoc_gia: body.quoc_gia,
            hinh_anh: body.hinh_anh
        }
        await this.prisma.vitri.update({
            where: {
                vitri_id: Number(vitri_id)
            },
            data: newData
        });
        return 'Success!';
    }

    async xoaViTri(vitri_id, req) {
        const data: any = req.user;
        if (!(data.role == "ADMIN")) {
            throw new BadRequestException({ statusCode: 404, message: "Bạn không có quyền admin để xóa vị trí!" });
        }
        try {
            // await this.prisma.phong.update({
            //     where: {
            //         vitri_id: Number(vitri_id)
            //     },
            //     data: {vitri_id: null}
            // });

            await this.prisma.vitri.delete({
                where: {
                    vitri_id: Number(vitri_id)
                }
            })
            return 'Deleted!';
        } catch (err) {
            throw new BadRequestException({statusCode: 404, message:"Lỗi dữ liệu liên quan hoặc xóa vị trí không tồn tại!"});
        }

    }

    async uploadImageViTri(file, vitri_id) {
        const vitri = await this.prisma.vitri.findUnique({
            where: {
                vitri_id: Number(vitri_id)
            }
        })
        if(!vitri) {
            throw new NotFoundException({statusCode: 404, message:"Không tìm thấy vị trí!"});
        }

        let newViTri = {
            ...vitri,
            hinh_anh: file.filename
        }

        await this.prisma.vitri.update({
            where: {
                vitri_id: Number(vitri_id)
            },
            data: newViTri
        })
        return file;
    }
}
