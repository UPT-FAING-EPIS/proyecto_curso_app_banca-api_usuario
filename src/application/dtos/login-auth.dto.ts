import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator'
export class LoginAuthDto {
  @ApiProperty({ description: 'Email del usuario', example: 'jperez@mail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ description: 'Contraseña del usuario', example: '123456' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
  password: string
}
