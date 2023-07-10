import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({ description: 'Id del rol', example: 'MANAGER' })
  @IsNotEmpty()
  @IsString()
  id: string

  @ApiProperty({ description: 'Nombre del rol', example: 'Gerente' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Imagen del rol',
    example: 'https://static.thenounproject.com/png/2303078-200.png',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/\bhttps?:\/\/\S+\.(png|jpe?g|gif|bmp)\b/, {
    message: 'La imagen no es valida',
  })
  image: string

  @ApiProperty({ description: 'Ruta del rol', example: '/ruta-del-rol' })
  @IsNotEmpty()
  @IsString()
  route: string
}
