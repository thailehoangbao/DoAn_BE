import { TypeOrders } from './entities/orders.entity';
import { Controller, Get,Param,UseGuards ,Delete,Post,Body,Put,Headers,Req} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags("Đặt Phòng")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get()
  layDanhSachDatPhong() {
    return this.ordersService.layDanhSachDatPhong();
  }

  @ApiParam({
    name: 'order_id'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/:order_id')
  layThongTinDatPhong(@Param('order_id') order_id: number) {
    return this.ordersService.layThongTinDatPhong(order_id);
  }

  @ApiParam({
    name: 'user_id'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/lay-theo-ma-nguoi-dung/:user_id')
  layThongTinDatPhongTheoMaNguoiDung(@Param('user_id') user_id: number) {
    return this.ordersService.layThongTinDatPhongTheoMaNguoiDung(user_id);
  }


  @ApiParam({
    name: 'order_id'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete('/:order_id')
  xoaDatPhong(@Param('order_id') order_id: number) {
    return this.ordersService.xoaDatPhong(order_id);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({
    type: TypeOrders
  })
  @Post()
  themOrders(@Body() body: TypeOrders) {
    return this.ordersService.themOrders(body);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({
    type: TypeOrders
  })
  @Put('/:order_id')
  suaOrders(@Body() body: TypeOrders,@Param("order_id") order_id : number,@Req() req: Request) {
    return this.ordersService.suaOrders(body,order_id,req);
  }
}
