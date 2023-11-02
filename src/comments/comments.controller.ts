import { Controller, Get, Param, Post, UseGuards, Body, Put, Delete, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { BinhLuanType } from './entities/comments.entity';
import { AuthGuard } from '@nestjs/passport';
@ApiTags("comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/binh-luan-theo-room/:room_id")
  getAllBinhLuanTheoPhong(@Param("room_id") room_id: number) {
    return this.commentsService.getAllBinhLuanTheoPhong(room_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/binh-luan/:comment_id")
  getAllBinhLuanTheoBinhLuanId(@Param("comment_id") comment_id: number) {
    return this.commentsService.getAllBinhLuanTheoBinhLuanId(comment_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({
    type: BinhLuanType
  })
  @Post("/binh-luan")
  themBinhLuan(@Body() body: BinhLuanType) {
    return this.commentsService.themBinhLuan(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put("/binh-luan/:comment_id")
  chinhSuaBinhLuan(@Body() body: BinhLuanType, @Param("comment_id") comment_id: number) {
    return this.commentsService.chinhSuaBinhLuan(body, comment_id)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete("/binh-luan/:comment_id")
  xoaBinhLuan(@Param("comment_id") comment_id: number, @Req() req: Request) {
    return this.commentsService.xoaBinhLuan(comment_id, req)
  }
}
