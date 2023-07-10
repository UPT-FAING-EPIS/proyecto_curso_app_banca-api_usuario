import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @IsNotEmpty()
  @IsString()
  @Matches(/\b[A-Z][a-zA-Z']+\b/, { message: 'El nombre no es válido' })
  name?: string

  @ApiProperty({ description: 'Apellido del usuario', example: 'Perez' })
  @IsNotEmpty()
  @IsString()
  @Matches(/\b[A-Z][a-zA-Z']+\b/, { message: 'El apellido no es válido' })
  lastname?: string

  @ApiProperty({ description: 'Teléfono del usuario', example: '988342934' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^9\d{8}$/, { message: 'El teléfono no es válido' })
  phone?: string

  @ApiProperty({
    description: 'Imagen del usuario',
    example: 'https://static.thenounproject.com/png/2303078-200.png',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/\bhttps?:\/\/\S+\.(png|jpe?g|gif|bmp)\b/, {
    message: 'La imagen no es valida',
  })
  image?: string

  @ApiProperty({
    description: 'Token de notificación del usuario',
    example: '123456',
  })
  notification_token?: string
}
