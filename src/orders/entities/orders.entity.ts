import { ApiProperty } from "@nestjs/swagger";

export class TypeOrders {
    @ApiProperty({default: 'yyyy-mm-dd hh:mm:ss'})
    ngay_den: Date;
    @ApiProperty({default: 'yyyy-mm-dd hh:mm:ss'})
    ngay_di: Date;
    @ApiProperty({type: 'number'})
    so_luong_khach: number;
    @ApiProperty({type: 'number'})
    user_id: number;
    @ApiProperty({type: 'number'})
    room_id: number;
}