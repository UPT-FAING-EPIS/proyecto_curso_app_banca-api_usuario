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

  image?: string
  notification_token?: string
}
