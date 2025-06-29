import { ApiProperty } from "@nestjs/swagger"

export class SigninAdminDto {
    readonly email: string
    readonly password: string
}
