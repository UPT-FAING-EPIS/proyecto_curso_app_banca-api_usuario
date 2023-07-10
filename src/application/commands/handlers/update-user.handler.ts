import { HttpException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import { UpdateUserCommand } from 'application/commands/update-user.command'


@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateUserCommand) {
    const userFound = await this.usersRepository.getById(command.id)
    if (!userFound) throw new HttpException('Usuario no encontrado', 404)

    const updatedUser = Object.assign(userFound, command.user)

    try {
      return await this.usersRepository.update(command.id, updatedUser)
    } catch (error) {
      throw new HttpException(error.message, 409)
    }
  }
}
