import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RolesRepository } from 'application/persistence/repos/RolesRepository'
import { CreateRoleCommand } from 'application/commands/create-role.command'
import { HttpException } from '@nestjs/common'

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler
  implements ICommandHandler<CreateRoleCommand>
{
  constructor(private readonly rolesRepository: RolesRepository) {}

  async execute(command: CreateRoleCommand) {
    try {
      return await this.rolesRepository.saveCreated(command.role)
    } catch (error) {
      throw new HttpException(error.message, 409)
    }
  }
}
