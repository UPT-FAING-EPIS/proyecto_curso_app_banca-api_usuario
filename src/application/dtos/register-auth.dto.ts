import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class RegisterAuthDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'Apellido del usuario', example: 'Perez' })
  @IsNotEmpty()
  @IsString()
  lastname: string

  @ApiProperty({ description: 'Email del usuario', example: 'jperez@mail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'El email no es válido' })
  email: string

  @ApiProperty({ description: 'Teléfono del usuario', example: '123456' })
  @IsNotEmpty()
  @IsString()
  phone: string

  @ApiProperty({ description: 'Contraseña del usuario', example: '123456' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
  password: string
}
