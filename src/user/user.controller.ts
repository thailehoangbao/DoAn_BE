import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, Headers, UseGuards,Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginUserType, TypeSignUpUser, TypeUser, UpdateTypeUser } from './entities/user.entity';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadType } from 'src/entities/app.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Users")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/get-list-user")
  getListUser() {
    return this.userService.getListUser();
  }

  @ApiParam({ name: "user_id" })
  @Get("/info-user/:user_id")
  getUser(@Param("user_id") user_id: number) {
    return this.userService.getUser(user_id);
  }

  @ApiParam({ name: "keyword" })
  @Get("/search/:keyword")
  searchUser(@Param("keyword") keyword: string) {
    return this.userService.searchUser(keyword);
  }

  @Get("/phan-trang-tim-kiem/:page/:size")
  phanTrangTimKiemPage(@Param("page") page: number, @Param("size") size: number) {
    return this.userService.phanTrangTimKiemPage(page, size);
  }

  @ApiBody({
    type: TypeSignUpUser
  })
  @Post("/sign-up")
  signUp(@Body() body: TypeSignUpUser) {
    return this.userService.signUp(body);
  }

  @ApiBody({
    type: LoginUserType
  })
  @Post("/login")
  login(@Body() body: LoginUserType) {
    return this.userService.login(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put("/update/:user_id")
  updateUser(@Body() body: UpdateTypeUser, @Param("user_id") user_id: number,@Req() req: Request) {
    return this.userService.updateUser(body, user_id,req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete("/delete/:user_id")
  deleteUser(@Param("user_id") user_id: number,@Req() req: Request) {
    return this.userService.deleteUser(user_id,req);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadType
  })
  @ApiHeader({name: "token"})
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Put("/upload-image-user")
  uploadAvatar(@Headers() headers,@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file, headers);
  }
}
