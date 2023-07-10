import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, MinLength, Matches } from 'class-validator'

export class RegisterAuthDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @IsString()
  @MinLength(3)
  @Matches(/\b[A-Z][a-zA-Z']+\b/, { message: 'El nombre no es válido' })
  name: string

  @ApiProperty({ description: 'Apellido del usuario', example: 'Perez' })
  @IsString()
  @MinLength(3)
  @Matches(/\b[A-Z][a-zA-Z']+\b/, { message: 'El apellido no es válido' })
  lastname: string

  @ApiProperty({ description: 'Email del usuario', example: 'jperez@mail.com' })
  @IsString()
  @MinLength(5)
  @IsEmail({}, { message: 'El email no es válido' })
  email: string

  @ApiProperty({ description: 'Teléfono del usuario', example: '946548421' })
  @IsString()
  @MinLength(9)
  @Matches(/^9\d{8}$/, { message: 'El teléfono no es válido' })
  phone: string

  @ApiProperty({ description: 'Contraseña del usuario', example: '123456' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
  password: string

  @ApiProperty({ description: 'Roles del usuario', example: ['ADMIN'] })
  rolesIds?: string[]
}
