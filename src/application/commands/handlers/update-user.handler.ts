import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserCommand } from 'application/commands/update-user.command'
import { UsersRepository } from 'application/persistence/UsersRepository'

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateUserCommand) {
    const userFound = await this.usersRepository.getById(command.id)
    if (!userFound) throw new NotFoundException('Usuario no encontrado')

    return await this.usersRepository.update(command.id, command.user)
  }
}
