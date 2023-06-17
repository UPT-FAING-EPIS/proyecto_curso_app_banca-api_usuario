import { Body, Controller, Post, Get, UseGuards, Put, Param, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
    ApiTags,
    ApiParam,
    ApiOperation,
    ApiOkResponse,
    ApiNotFoundResponse,
  } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // GET -> OBTENER
    // POST -> CREAR
    // PUT ' PATCH -> ACTUALIZAR
    // DELETE ' => BORRAR

    @UseGuards(JwtAuthGuard)
    @Get() // http://localhost/users -> GET
    findAll(){
        return this.usersService.findAll();
    }

    @ApiOperation({ summary: 'Registrar usuario' })
    @ApiOkResponse({ description: 'Registra al usuario' })
    @Post() // http://localhost/users -> POST 
    create(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }

    @UseGuards(JwtAuthGuard)  // http://192.168.0.3:3000/users/:id -> PUT
    @Put(':id') // http://localhost/users/:id -> PUT
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.usersService.update(id, user);
    }

    @Post('upload/:id') 
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10}),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
            }),
        ) file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number, 
        @Body() user: UpdateUserDto
    ) {
        //console.log(file);
        return this.usersService.updateWithImage(file, id, user);
    }
}
