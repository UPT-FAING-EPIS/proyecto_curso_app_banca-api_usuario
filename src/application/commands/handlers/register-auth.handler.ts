import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RegisterAuthCommand } from 'application/commands/register-auth.command'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import { RolesRepository } from 'application/persistence/repos/RolesRepository'

@CommandHandler(RegisterAuthCommand)
export class RegisterAuthCommandHandler
  implements ICommandHandler<RegisterAuthCommand>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private jwtService: JwtService
  ) {}

  async execute(command: RegisterAuthCommand) {
    const { email, phone } = command.userAuth
    const emailExist = await this.usersRepository.findByEmail(email)

    if (emailExist) {
      throw new Error('El email ya esta registrado')
    }

    const phoneExist = await this.usersRepository.findByPhone(phone)

    if (phoneExist) {
      throw new Error('El telefono ya esta registrado')
    }

    const newUser = await this.usersRepository.create(command.userAuth)
    let rolesIds = []

    if (
      command.userAuth.rolesIds !== undefined &&
      command.userAuth.rolesIds !== null
    ) {
      rolesIds = command.userAuth.rolesIds
    } else {
      rolesIds.push('CLIENT')
    }

    const roles = await this.rolesRepository.getAllByIds(rolesIds)
    newUser.roles = roles

    const userSaved = await this.usersRepository.create(newUser)
    const rolesString = userSaved.roles.map((rol) => rol.id)

    const payload = { id: newUser.id, name: newUser.name, roles: rolesString }
    const token = this.jwtService.sign(payload)

    const data = {
      user: newUser,
      token: 'Bearer ' + token,
    }

    delete data.user.password

    return data
  }
}
