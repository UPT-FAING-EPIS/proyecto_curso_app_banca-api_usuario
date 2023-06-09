import {
  Controller,
  Put,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common'
import { UsersUseCases } from 'application/use-cases/UsersUseCases'

import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiBadRequestResponse,
} from '@nestjs/swagger'
import { User } from 'domain/entities/user.entity'
import { JwtAuthGuard } from 'infrastructure/auth/jwt-auth.guard'
import { CreateUserDto } from 'application/dtos/create-user.dto'
import { UpdateUserDto } from 'application/dtos/update-user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userUseCases: UsersUseCases) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({
    description: 'Se obtuvieron los datos de todos los usuarios',
  })
  getAllUsers(): Promise<User[]> {
    return this.userUseCases.getAllUsers()
  }

  // GET -> OBTENER
  // POST -> CREAR
  // PUT & PATCH -> ACTUALIZAR
  // DELETE -> BORRAR

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener usuarios' })
  @ApiOkResponse({
    description: 'Se obtuvieron los datos de todos los usuarios',
  })
  @ApiBadRequestResponse({ description: 'Error al obtener usuarios' })
  @Get() // http://localhost/users -> GET
  findAll() {
    return this.userUseCases.getAllUsers()
  }

  @ApiOperation({ summary: 'Registrar usuario' })
  @ApiOkResponse({ description: 'Registra al usuario' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Error al registrar usuario' })
  @Post() // http://localhost/users -> POST
  create(@Body() user: CreateUserDto) {
    return this.userUseCases.createUser(user)
  }

  @UseGuards(JwtAuthGuard) // http://192.168.0.3:3000/users/:id -> PUT
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiOkResponse({ description: 'Usuario actualizado' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de usuario',
  })
  @ApiBadRequestResponse({ description: 'Error al actualizar usuario' })
  @Put(':id') // http://localhost/users/:id -> PUT
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.userUseCases.updateUser(id, user)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de usuario',
  })
  @ApiOperation({ summary: 'Bloquear usuario' })
  @ApiOkResponse({ description: 'Usuario bloqueado' })
  @ApiBadRequestResponse({ description: 'Error al bloquear usuario' })
  @Put(':id/block')
  blockUser(@Param('id') id: number): Promise<User> {
    return this.userUseCases.blockUser(id)
  }
}
