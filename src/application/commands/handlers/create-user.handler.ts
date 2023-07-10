import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import { CreateUserCommand } from 'application/commands/create-user.command'
import { HttpException } from '@nestjs/common'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: CreateUserCommand) {
    try {
      return await this.usersRepository.saveCreated(command.user)
    } catch (error) {
      throw new HttpException(error.message, 409)
    }
  }
}
