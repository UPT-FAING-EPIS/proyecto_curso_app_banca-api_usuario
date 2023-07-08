import { NotFoundException } from '@nestjs/common'
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

    if (!user) throw new NotFoundException('El usuario no existe')
    if (!user.is_active) throw new Error('El usuario ya se encuentra bloqueado')

    user.is_active = false

    return await this.usersRepository.update(command.id, user)
  }
}
