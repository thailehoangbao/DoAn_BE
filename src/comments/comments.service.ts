import { Injectable, BadGatewayException ,NotFoundException,BadRequestException} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BinhLuanType } from './entities/comments.entity';

@Injectable()
export class CommentsService {
    prisma = new PrismaClient();

    async getAllComments() {
        let data = await this.prisma.comments.findMany();
        return data;
    }

    async getAllBinhLuanTheoPhong(room_id: number): Promise<BinhLuanType[]> {
        let data = await this.prisma.comments.findMany({
            where: {
                room_id: Number(room_id)
            },
            include: {
                users: true
            }
        });
        if (data.length == 0) {
            throw new BadGatewayException({ statusCode: 404, message: "Không tìm thấy room!" });
        }
        return data;
    }

    async getAllBinhLuanTheoBinhLuanId(comment_id: number) {
        let data = await this.prisma.comments.findUnique({
            where: {
                comment_id: Number(comment_id)
            },
            include: {
                users: true
            }
        });
        if (!data) {
            throw new BadGatewayException({ statusCode: 404, message: "Không tìm thấy room!" });
        }
        return data;
    }

    async themBinhLuan(body) {
        const { user_id, room_id, ngay_binh_luan, sao_binh_luan, noi_dung } = body;
        let newData = {
            user_id: Number(user_id),
            room_id: Number(room_id),
            ngay_binh_luan: new Date(ngay_binh_luan),
            sao_binh_luan: Number(sao_binh_luan),
            noi_dung: String(noi_dung)
        }
        await this.prisma.comments.create({
            data: newData
        })
        return 'Post Comment Success';
    }

    async chinhSuaBinhLuan(body, comment_id: number) {
        const data = await this.prisma.comments.findUnique({
            where: {
                comment_id: Number(comment_id)
            }
        })
        if(!data) {
            throw new NotFoundException({statusCode: 404, message:"Comment not found"})
        }

        const newData = {
            ngay_binh_luan: new Date(body.ngay_binh_luan),
            noi_dung: String(body.noi_dung),
            sao_binh_luan: Number(body.sao_binh_luan),
            user_id: Number(body.user_id),
            room_id: Number(body.room_id)
        }
        await this.prisma.comments.update({
            where: {
                comment_id: Number(comment_id)
            },
            data: newData
        })
        return 'Fixed!'
    }

    async xoaBinhLuan(comment_id,req) {
        const data = await this.prisma.comments.findUnique({
            where: {
                comment_id: Number(comment_id)
            }
        })
        if(!data) {
            throw new NotFoundException({statusCode: 404, message:"Comment not found"})
        }

        const infoUser: any = req.user;
        // console.log(infoUser.role)
        if (!(infoUser.role == "ADMIN")) {
            throw new BadRequestException({ statusCode: 404, message: "Bạn không có quyền admin để xóa comment này!" });
        }


        await this.prisma.comments.delete({
            where: {
                comment_id: Number(comment_id)
            }
        })
        return 'Deleted!'
    }
}
