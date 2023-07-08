import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RolesRepository } from 'application/persistence/repos/RolesRepository'
import { CreateRoleCommand } from 'application/commands/create-role.command'

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler
  implements ICommandHandler<CreateRoleCommand>
{
  constructor(private readonly rolesRepository: RolesRepository) {}

  async execute(command: CreateRoleCommand) {
    return await this.rolesRepository.create(command.role)
  }
}
