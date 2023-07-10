import { HttpException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import { BlockUserCommand } from 'application/commands/block-user.command'

@CommandHandler(BlockUserCommand)
export class BlockUserCommandHandler
  implements ICommandHandler<BlockUserCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: BlockUserCommand) {
    const user = await this.usersRepository.getById(command.id)

    if (!user) throw new HttpException('El usuario no existe', 404)
    if (!user.is_active)
      throw new HttpException('El usuario ya se encuentra bloqueado', 409)

    user.is_active = false

    try {
      return await this.usersRepository.update(command.id, user)
    } catch (error) {
      throw new HttpException(error.message, 409)
    }
  }
}
