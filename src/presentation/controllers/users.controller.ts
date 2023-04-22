import { Controller, Put, Get, Param } from '@nestjs/common';
import { UsersUseCases } from 'src/application/use-cases/UsersUseCases';

import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from 'src/domain/models/User';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userUseCases: UsersUseCases) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({ description: 'Se obtuvieron los datos de todos los usuarios' })
  getAllUsers(): Promise<User[]> {
    return this.userUseCases.getAllUsers();
  }

  @Put(':id/block')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de usuario',
  })
  @ApiOperation({ summary: 'Bloquear usuario' })
  @ApiOkResponse({ description: 'Usuario bloqueado' })
  blockUser(@Param('id') id: number): Promise<User> {
    return this.userUseCases.blockUser(id);
  }
}
