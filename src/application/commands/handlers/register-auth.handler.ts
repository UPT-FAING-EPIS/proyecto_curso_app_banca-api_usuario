import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UsersRepository } from 'application/persistence/UsersRepository'
import { RegisterAuthCommand } from 'application/commands/register-auth.command'
import { JwtService } from '@nestjs/jwt'

@CommandHandler(RegisterAuthCommand)
export class RegisterAuthCommandHandler
  implements ICommandHandler<RegisterAuthCommand>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async execute(command: RegisterAuthCommand) {
    const { email, phone } = command.userAuth
    const emailExist = await this.usersRepository.findByEmail(email)

    if (emailExist) {
      // TODO: 409 CONFLICT
      throw new Error('El email ya esta registrado')
    }

    const phoneExist = await this.usersRepository.findByPhone(phone)

    if (phoneExist) {
      // TODO: 409 CONFLICT
      throw new Error('El telefono ya esta registrado')
    }

    const newUser = await this.usersRepository.create(command.userAuth)
    const payload = { id: newUser.id, name: newUser.name }
    const token = this.jwtService.sign(payload)

    const data = {
      user: newUser,
      token: 'Bearer ' + token,
    }

    delete data.user.password

    return data
  }
}
