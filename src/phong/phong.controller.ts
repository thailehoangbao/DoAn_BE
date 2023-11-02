import { Body, Controller,Get,Param,Req ,Post,Put,Delete,UseInterceptors,UploadedFile, UseGuards} from '@nestjs/common';
import { PhongService } from './phong.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { TypePhong } from './entities/phong.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { UploadType } from 'src/entities/app.entity';

@ApiTags("Room")
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  layDanhSachPhong() {
    return this.phongService.layDanhSachPhong();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiParam({name:"vitri_id"})
  @Get("/lay-phong-theo-vi-tri/:vitri_id")
  layPhongTheoViTri(@Param("vitri_id") vitri_id: number) {
    return this.phongService.layPhongTheoViTri(vitri_id);
  }

  @Get("/lay-phong-theo-phan-trang-tim-kiem/:page/:size")
  layPhongPhanTrang(@Param("page") page: number, @Param("size") size: number){
    return this.phongService.layPhongPhanTrang(page, size)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/:room_id")
  layPhongTheoRoomId (@Param("room_id") room_id: number) {
    return this.phongService.layPhongTheoRoomId(room_id)
  }

  @ApiParam({ name: "keyword" })
  @Get("/search/:keyword")
  searchUser(@Param("keyword") keyword: string) {
    return this.phongService.searchPhong(keyword);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    type: TypePhong
  })
  @Post()
  themPhong(@Body() body : TypePhong) {
    return this.phongService.themPhong(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put("/:room_id")
  chinhSuaPhong(@Body() body : TypePhong,@Param("room_id") room_id: number) {
    return this.phongService.chinhSuaPhong(body,room_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete("/:room_id")
  xoaPhong(@Param("room_id") room_id: number,@Req() req: Request) {
    return this.phongService.xoaPhong(room_id,req);
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
  @Put("/upload-image-phong/:room_id")
  upload(@UploadedFile() file: Express.Multer.File, @Param("room_id") room_id: number) {
    return this.phongService.uploadImagePhong(file, room_id);
  }
}
