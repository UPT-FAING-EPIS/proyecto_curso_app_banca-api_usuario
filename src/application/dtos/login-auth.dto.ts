import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty } from 'class-validator'
export class LoginAuthDto {
  @ApiProperty({ description: 'Email del usuario', example: 'jperez@mail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ description: 'Contraseña del usuario', example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string
}
