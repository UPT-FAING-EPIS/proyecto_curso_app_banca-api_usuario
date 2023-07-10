import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsString()
  @MinLength(3)
  @Matches(/\b[A-Z][a-zA-Z']+\b/, { message: 'El nombre no es válido' })
  name: string

  @ApiProperty({ example: 'Perez', description: 'Apellido del usuario' })
  @IsString()
  @MinLength(3)
  @Matches(/\b[A-Z][a-zA-Z']+\b/, { message: 'El apellido no es válido' })
  lastname: string

  @ApiProperty({ example: 'jperez@mail.com', description: 'Email del usuario' })
  @IsString()
  @MinLength(5)
  @IsEmail({}, { message: 'El email no es válido' })
  email: string

  @ApiProperty({ example: '946548421', description: 'Telefono del usuario' })
  @IsString()
  @Length(9)
  @Matches(/^9\d{8}$/, { message: 'El teléfono no es válido' })
  phone: string

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
  password: string

  @ApiProperty({ description: 'Imagen del usuario', example: 'https://static.thenounproject.com/png/2303078-200.png' })
  @IsString()
  @Matches(/\bhttps?:\/\/\S+\.(png|jpe?g|gif|bmp)\b/, {
    message: 'La imagen no es valida',
  })
  image?: string

  @ApiProperty({ description: 'Token de notificacion del usuario', example: '123456' })
  @IsString()
  notification_token?: string
}
