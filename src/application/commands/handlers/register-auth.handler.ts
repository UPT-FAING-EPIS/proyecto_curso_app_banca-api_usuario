import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RegisterAuthCommand } from 'application/commands/register-auth.command'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import { RolesRepository } from 'application/persistence/repos/RolesRepository'
import { HttpException } from '@nestjs/common'

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

    if (emailExist) throw new HttpException('El email ya esta registrado', 409)

    const phoneExist = await this.usersRepository.findByPhone(phone)

    if (phoneExist)
      throw new HttpException('El telefono ya esta registrado', 409)

    const newUser = this.usersRepository.create(command.userAuth)
    
    const rolesIds = command.userAuth.rolesIds ?? ['CLIENT'];

    const roles = await this.rolesRepository.getAllByIds(rolesIds)
    if (!roles) throw new HttpException('Roles no encontrados', 404)
    
    newUser.roles = roles

    const userSaved = await this.usersRepository.save(newUser)
    const rolesString = userSaved.roles.map((rol) => rol.id)

    const payload = {
      id: userSaved.id,
      name: userSaved.name,
      roles: rolesString,
    }
    const token = this.jwtService.sign(payload)

    const data = {
      user: userSaved,
      token: 'Bearer ' + token,
    }

    delete data.user.password
    return data
  }
}
