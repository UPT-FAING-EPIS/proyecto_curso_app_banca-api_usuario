import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import { CreateUserCommand } from 'application/commands/create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: CreateUserCommand) {
    return await this.usersRepository.create(command.user)
  }
}
