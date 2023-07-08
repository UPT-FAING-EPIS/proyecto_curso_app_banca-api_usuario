import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  name: string

  @ApiProperty({ example: 'Perez', description: 'Apellido del usuario' })
  lastname: string

  @ApiProperty({ example: 'jperez@mail.com', description: 'Email del usuario' })
  email: string

  @ApiProperty({ example: '1234567890', description: 'Telefono del usuario' })
  phone: string

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  password: string

  @ApiProperty({ description: 'Imagen del usuario' })
  image?: string

  @ApiProperty({ description: 'Token de notificacion del usuario' })
  notification_token?: string

  @ApiProperty({ description: 'Roles del usuario', example: ['ADMIN'] })
  @IsString({ each: true })
  @MinLength(5, { each: true })
  role: string[]
}
