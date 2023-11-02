import { ApiProperty } from "@nestjs/swagger";

export class UploadType {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any
    //file: any nếu up video
}