import { ApiProperty } from '@nestjs/swagger';
export class BinhLuanType {
    @ApiProperty({default:"yyyy-MM-dd HH:mm:ss"})
    ngay_binh_luan: Date;
    @ApiProperty({type:"string"})
    noi_dung: string;
    @ApiProperty({type:"number"})
    sao_binh_luan: number;
    @ApiProperty({type:"number"})
    user_id: number;
    @ApiProperty({type:"number"})
    room_id: number;
}