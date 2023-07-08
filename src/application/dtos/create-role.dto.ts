import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {

    @ApiProperty({ description: 'Id del usuario', example: '1' })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ description: 'Nombre del rol', example: 'ADMIN' })
    @IsNotEmpty()
    @IsString()
    name: string;
        
    @ApiProperty({ description: 'Imagen del rol', example: 'https://www.google.com' })
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({ description: 'Ruta del rol', example: '/ruta-del-rol' })
    @IsNotEmpty()
    @IsString()
    route: string;

}