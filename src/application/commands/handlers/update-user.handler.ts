import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserWithImageCommand } from 'application/commands/update-user-with-image.command'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import storage from 'application/persistence/storage-utils/cloud_storage'

@CommandHandler(UpdateUserWithImageCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserWithImageCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateUserWithImageCommand) {
    const url = await storage(command.file, command.file.originalname)
    console.log('URL' + url)

    if (!url) {
      throw new Error('La imagen no se puede guardar')
    }

    const userFound = await this.usersRepository.getById(command.id)

    if (!userFound) {
      throw new Error('Usuario no existe')
    }
    command.user.image = url
    const updatedUser = Object.assign(userFound, command.user)
    return this.usersRepository.create(updatedUser)
  }
}
