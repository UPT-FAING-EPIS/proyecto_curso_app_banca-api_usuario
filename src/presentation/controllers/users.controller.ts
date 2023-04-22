import { Controller, Put } from '@nestjs/common';
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

  @Put('/:id/block')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de usuario',
  })
  @ApiOperation({ summary: 'Bloquear usuario' })
  @ApiOkResponse({ description: 'Usuario bloqueado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  blockUser(id: number): Promise<User> {
    return this.userUseCases.blockUser(id);
  }
}
