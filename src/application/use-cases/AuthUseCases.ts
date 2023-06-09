import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

import { User } from 'domain/entities/user.entity'
import { RegisterAuthDto } from 'application/dtos/register-auth.dto'
import { LoginAuthDto } from 'application/dtos/login-auth.dto'
import { UsersRepository } from 'application/persistence/UsersRepository'

@Injectable()
export class AuthUseCases {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterAuthDto) {
    const { email, phone } = user
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

    const newUser = await this.usersRepository.create(user)
    const payload = { id: newUser.id, name: newUser.name }
    const token = this.jwtService.sign(payload)

    const data = {
      user: newUser,
      token: 'Bearer ' + token,
    }

    delete data.user.password

    return data
  }

  async login(loginData: LoginAuthDto) {
    const { email, password } = loginData
    const userFound = await this.usersRepository.findByEmail(email)

    if (!userFound) {
      throw new NotFoundException('El usuario con ese email no existe')
    }
    const isPasswordValid = await compare(password, userFound.password)
    if (!isPasswordValid) {
      throw new ForbiddenException('La contraseña es incorrecta')
    }

    const payload = { id: userFound.id, name: userFound.name }
    const token = this.jwtService.sign(payload)
    const data = {
      user: userFound,
      token: 'Bearer ' + token,
    }

    delete data.user.password

    return data
  }
}
