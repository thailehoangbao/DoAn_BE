import { ApiProperty } from "@nestjs/swagger";

export class TypePhong  {
    @ApiProperty({type: "string"})
    ten_phong: string;
    @ApiProperty({type: "number"})
    khach: number;
    @ApiProperty({type: "number"})
    phong_ngu: number;
    @ApiProperty({type: "number"})
    giuong: number;
    @ApiProperty({type: "number"})
    phong_tam: number;
    @ApiProperty({type: "string"})
    mo_ta: string;
    @ApiProperty({type: "number"})
    gia_tien: number;
    @ApiProperty({type: "boolean"})
    may_giat: boolean;
    @ApiProperty({type: "boolean"})
    ban_la: boolean;
    @ApiProperty({type: "boolean"})
    tivi: boolean;
    @ApiProperty({type: "boolean"})
    dieu_hoa: boolean;
    @ApiProperty({type: "boolean"})
    wifi: boolean;
    @ApiProperty({type: "boolean"})
    bep: boolean;
    @ApiProperty({type: "boolean"})
    do_xe: boolean;
    @ApiProperty({type: "boolean"})
    ho_boi: boolean;
    @ApiProperty({type: "boolean"})
    ban_ui: boolean;
    @ApiProperty({type: "number"})
    vitri_id: number;
    @ApiProperty({type: "string"})
    hinh_anh: string;
    @ApiProperty({type: "number"})
    user_id:  null;
}