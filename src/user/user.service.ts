import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserType, TypeUser } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    prisma = new PrismaClient();
    authService = new AuthService();
    jwtService = new JwtService({ secret: "node35" });
    async getListUser() {
        let data = await this.prisma.users.findMany();
        return data;
    }

    async getUser(user_id: number) {
        let data = await this.prisma.users.findUnique({
            where: {
                user_id: Number(user_id)
            },
        })
        if (data) {
            let newData = {
                ...data,
                pass_word: ''
            }
            return newData;
        } else {
            throw new NotFoundException({ statusCode: 404, message: 'Không tìm thấy thông tin User này!' })
        }
    }

    async searchUser(keyword: string) {
        let data = await this.prisma.users.findMany({
            where: {
                name: {
                    contains: keyword // Sử dụng contains để tìm kiếm username gần giống keyword
                }
            }
        })
        return data;
    }

    async phanTrangTimKiemPage(page, size) {
        let index = (Number(page) - 1) * Number(size);
        let data = await this.prisma.users.findMany({
            skip: index,
            take: Number(size)
        })
        return data;
    }

    async signUp(body) {
        //Kiểm tra email
        let checkEmail = await this.prisma.users.findUnique({
            where: {
                email: body.email
            }
        })
        if (checkEmail) {
            throw new BadRequestException({ statusCode: 404, massage: "Email đã tồn tại!" });
        };

        const hashedPassword = await this.authService.hashPassword(body.pass_word);

        const user = {
            ...body,
            pass_word: hashedPassword
        }

        await this.prisma.users.create({
            data: user
        })
        return 'Success Created';
    }

    async login(body: LoginUserType) {
        //Kiểm tra email
        let checkEmail = await this.prisma.users.findUnique({
            where: {
                email: body.email
            }
        })

        if (checkEmail) {

            const comparePassword = await this.authService.comparePasswords(body.pass_word, checkEmail.pass_word);

            if (comparePassword) {
                let token = this.jwtService.sign(checkEmail)
                let newUserHasToken = { ...checkEmail, token: token, statusCode: 200 }
                return newUserHasToken;
            } else {
                throw new BadRequestException({ statusCode: 404, massage: "Mật khẩu không đúng!" });
            }

        } else {
            throw new BadRequestException({ statusCode: 404, massage: "Email không đúng!" });
        }
    }

    async updateUser(body, user_id, req) {
        const userFE: any = req.user;

        // if (!(userFE.email === body.email)) {
        //     throw new BadRequestException({ statusCode: 400, massage: "Không được thay đổi Email!" });
        // }
        const hashedPassword = await this.authService.hashPassword(body.pass_word);

        const user = {
            ...body,
            pass_word: hashedPassword
        }
        await this.prisma.users.update({

            where: {
                user_id: Number(user_id)
            },
            data: user,
        })
        return 'Successfully Updated!';
    }

    async deleteUser(user_id: number,req) {
        const data: any = req.user;
        // console.log(data.role)
        if (!(data.role == "ADMIN")) {
            throw new BadRequestException({ statusCode: 404, message: "Bạn không có quyền admin để xóa người dùng!" });
        }
        try {
            // Xóa các hồ sơ trong bảng orders và bảng comments có user_id tương ứng
            await this.prisma.orders.deleteMany({
                where: {
                    user_id: Number(user_id),
                },
            });

            await this.prisma.comments.deleteMany({
                where: {
                    user_id: Number(user_id),
                },
            });

            // Sau khi đã xóa các hồ sơ liên quan, bạn có thể xóa người dùng trong bảng users
            await this.prisma.users.delete({
                where: {
                    user_id: Number(user_id),
                },
            });
            return 'Delete Success!';
        } catch {
            throw new BadRequestException({statusCode: 404, message:"Lỗi dữ liệu liên quan hoặc xóa user không tồn tại!"});
        }
    }

    async uploadAvatar(file, headers) {
        const {token} = headers; 
        let user: any = await this.jwtService.decode(token);

        if (!user) {
            throw new BadRequestException({statusCode: 401, message:"User hết hạn hoặc token không đúng mã hóa!"});
        }
        const newUser = {
            user_id: user.user_id,
            name: user.name,
            pass_word: user.pass_word,
            email: user.email,
            phone: user.phone,
            role: user.role,
            birth_day: user.birth_day,
            gender: user.gender,
            avatar: file.filename
        }

        await this.prisma.users.update({
            where: {
                user_id: Number(newUser.user_id)
            },
            data: newUser
        })
        return file;
    }
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJuYW1lIjoiYmFvIiwiZW1haWwiOiJiYW9AMTIzNTQ1IiwicGFzc193b3JkIjoiJDJiJDEwJFFxcGJSWE1BZEd6ZkouZlh0QVMwcHVnNmw1VjUzRHhnZk96ZEtLVVZ3RWpJOTRBdGtNVU5hIiwicGhvbmUiOiIxMjM0NTYiLCJiaXJ0aF9kYXkiOiIxOTk0LTExLTI5IiwiZ2VuZGVyIjoibmFtZSIsInJvbGUiOiJ1c2VyIiwiYXZhdGFyIjoiIiwiaWF0IjoxNjk3NzI1OTgzfQ.AHkXQfBBIHuRoveT6_HGJhg2pmBVJrkkeKIDaMT1eMU