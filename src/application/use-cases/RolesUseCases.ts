import { Injectable, Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { CreateRoleCommand } from 'application/commands/create-role.command'
import { CreateRoleDto } from 'application/dtos/create-role.dto'
import { Role } from 'domain/entities/role.entity'

@Injectable()
export class RolesUseCases {
  private readonly logger = new Logger(RolesUseCases.name)

  constructor(private commandBus: CommandBus) {}

  async createRole(Role: CreateRoleDto): Promise<Role> {
    this.logger.log('Create a role')
    return this.commandBus.execute(new CreateRoleCommand(Role))
  }
}
