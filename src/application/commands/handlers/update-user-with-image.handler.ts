import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserWithImageCommand } from 'application/commands/update-user-with-image.command'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'

@CommandHandler(UpdateUserWithImageCommand)
export class UpdateUserWithImageCommandHandler implements ICommandHandler<UpdateUserWithImageCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateUserWithImageCommand) {
    const userFound = await this.usersRepository.getById(command.id)
    if (!userFound) throw new NotFoundException('Usuario no encontrado')

    return await this.usersRepository.update(command.id, command.user)
  }
}
