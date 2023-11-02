import { ApiProperty } from "@nestjs/swagger";

export class TypeViTri {
    @ApiProperty({type:"string"})
    ten_vi_tri: string;
    @ApiProperty({type:"string"})
    tinh_thanh: string;
    @ApiProperty({type:"string"})
    quoc_gia: string;
    @ApiProperty({type:"string"})
    hinh_anh: string;
}

