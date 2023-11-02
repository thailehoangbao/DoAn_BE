import { TypeViTri } from './entities/vitri.entity';
import { Controller, Get, Post, Body, Param,Req, Put, Delete, UseInterceptors, UploadedFile,UseGuards } from '@nestjs/common';
import { VitriService } from './vitri.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { UploadType } from 'src/entities/app.entity';


@ApiTags("Vị Trí")
@Controller('vi-tri')
export class VitriController {
  constructor(private readonly vitriService: VitriService) { }

  @Get()
  layDanhSachViTri() {
    return this.vitriService.layDanhSachViTri();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiParam({name:"vitri_id"})
  @Get("/:vitri_id")
  layViTriTheoMaViTri(@Param("vitri_id") vitri_id: number) {
    return this.vitriService.layViTriTheoMaViTri(vitri_id);
  }

  @Get("/phan-trang-tim-kiem/:page/:size")
  phanTrangTimKiemPage(@Param("page") page: number, @Param("size") size: number) {
    return this.vitriService.phanTrangTimKiemPage(page, size);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    type: TypeViTri
  })
  @Post()
  themViTri(@Body() body: TypeViTri) {
    return this.vitriService.themViTri(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put("/:vitri_id")
  chinhSuaViTri(@Body() body: TypeViTri, @Param("vitri_id") vitri_id: number) {
    return this.vitriService.chinhSuaViTri(body, vitri_id)
  }

  @ApiParam({name: 'vitri_id'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete("/:vitri_id")
  xoaViTri(@Param("vitri_id") vitri_id: number,@Req() req: Request) {
    return this.vitriService.xoaViTri(vitri_id,req)
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
  @Put("/upload-image-vitri/:vitri_id")
  upload(@UploadedFile() file: Express.Multer.File, @Param("vitri_id") vitri_id: number) {
    return this.vitriService.uploadImageViTri(file, vitri_id);
  }
}
