import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @IsNotEmpty()
  @IsString()
  name?: string

  @ApiProperty({ description: 'Apellido del usuario', example: 'Perez' })
  @IsNotEmpty()
  @IsString()
  lastname?: string

  @ApiProperty({ description: 'Teléfono del usuario', example: '123456' })
  @IsNotEmpty()
  @IsString()
  phone?: string

  @ApiProperty({ description: 'Imagen del usuario', example: 'https://mi-imagen.com' })
  image?: string

  @ApiProperty({ description: 'Token de notificación del usuario', example: '123456' })
  notification_token?: string
}
