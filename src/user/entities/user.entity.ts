import { ApiProperty } from "@nestjs/swagger";

export class TypeUser {
    @ApiProperty({type: "string"})
    name: string;
    @ApiProperty({type: "string"})
    email: string;
    @ApiProperty({type: "string"})
    pass_word: string;
    @ApiProperty({type: "string"})
    phone: string;
    @ApiProperty({default: "yyyy-mm-dd hh:mm:ss"})
    birth_day: Date;
    @ApiProperty({type: "string"})
    gender: string;
    @ApiProperty({type: "string"})
    role: string;
    @ApiProperty({type: "string"})
    avatar: string;
}

export class TypeSignUpUser {
    @ApiProperty({type: "string"})
    name: string;
    @ApiProperty({type: "string"})
    email: string;
    @ApiProperty({type: "string"})
    pass_word: string;
    @ApiProperty({type: "string"})
    phone: string;
    @ApiProperty({default: "yyyy-mm-dd hh:mm:ss"})
    birth_day: Date;
    @ApiProperty({type: "string"})
    gender: string;
    @ApiProperty({type: "string"})
    role: string;
    @ApiProperty({type: "string"})
    avatar: string;
    @ApiProperty({default: "yyyy-mm-dd hh:mm:ss"})
    timecreated: Date;
}

export class UpdateTypeUser {
    @ApiProperty({type: "number"})
    user_id: number;
    @ApiProperty({type: "string"})
    name: string;
    @ApiProperty({type: "string"})
    email: string;
    @ApiProperty({type: "string"})
    pass_word: string;
    @ApiProperty({type: "string"})
    phone: string;
    @ApiProperty({default: "yyyy-mm-dd hh:mm:ss"})
    birth_day: Date;
    @ApiProperty({type: "string"})
    gender: string;
    @ApiProperty({type: "string"})
    role: string;
    @ApiProperty({type: "string"})
    avatar: string;
    @ApiProperty({default: "yyyy-mm-dd hh:mm:ss"})
    timecreated: Date;
}

export class LoginUserType {
    @ApiProperty({type: "string"})
    email: string;
    @ApiProperty({type: "string"})
    pass_word: string;
}