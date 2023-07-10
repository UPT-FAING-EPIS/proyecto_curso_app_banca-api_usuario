import { HttpException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserWithImageCommand } from 'application/commands/update-user-with-image.command'
import uploadToFirebaseStorage from 'application/persistence/storage-utils/cloud_storage'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'

@CommandHandler(UpdateUserWithImageCommand)
export class UpdateUserWithImageCommandHandler
  implements ICommandHandler<UpdateUserWithImageCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateUserWithImageCommand) {
    const userFound = await this.usersRepository.getById(command.id)
    if (!userFound) throw new HttpException('Usuario no encontrado', 404)

    if (!command.file)
      throw new HttpException('No se ha seleccionado la imagen', 404)

    const url = await uploadToFirebaseStorage(command.file, command.file.originalname)
    if (!url) throw new HttpException('Error al subir la imagen', 404)

    try {
      return await this.usersRepository.updateImageProfile(command.id, url)
    } catch (error) {
      throw new HttpException(error.message, 409)
    }
  }
}
