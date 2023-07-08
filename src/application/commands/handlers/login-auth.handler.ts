import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import { JwtService } from '@nestjs/jwt'
import { LoginAuthCommand } from 'application/commands/login-auth.command'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { compare } from 'bcrypt'

@CommandHandler(LoginAuthCommand)
export class LoginAuthCommandHandler
  implements ICommandHandler<LoginAuthCommand>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async execute(command: LoginAuthCommand) {
    const { email, password } = command.loginAuth
    const userFound = await this.usersRepository.findByEmail(email)

    if (!userFound) {
      throw new NotFoundException('El usuario con ese email no existe')
    }
    const isPasswordValid = await compare(password, userFound.password)
    if (!isPasswordValid) {
      throw new ForbiddenException('La contraseña es incorrecta')
    }

    const rolesIds = userFound.roles.map((role) => role.id) // ['CLIENT','ADMIN']

    const payload = { id: userFound.id, name: userFound.name, roles: rolesIds }
    const token = this.jwtService.sign(payload)
    const data = {
      user: userFound,
      token: 'Bearer ' + token,
    }

    delete data.user.password

    return data
  }
}
