import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from 'application/dtos/create-user.dto'
import { UpdateUserDto } from 'application/dtos/update-user.dto'
import { UsersRepository } from 'application/persistence/UsersRepository'
import { User } from 'domain/entities/user.entity'

@Injectable()
export class UsersUseCases {
  private readonly logger = new Logger(UsersUseCases.name)

  constructor(private readonly usersRepository: UsersRepository) {}

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    this.logger.log('Update a user')

    const userFound = await this.usersRepository.getById(id)
    if (!userFound) throw new NotFoundException('Usuario no encontrado')

    return await this.usersRepository.update(id, user)
  }

  async createUser(user: CreateUserDto): Promise<User> {
    this.logger.log('Create a user')

    return await this.usersRepository.create(user)
  }

  async getAllUsers(): Promise<User[]> {
    this.logger.log('Get all users')

    return await this.usersRepository.getAll()
  }

  async blockUser(id: number): Promise<User> {
    this.logger.log('Block a user')

    const user = await this.usersRepository.getById(id)

    if (!user) throw new NotFoundException('El usuario no existe')
    if (!user.is_active) throw new Error('El usuario ya se encuentra bloqueado')

    user.is_active = false

    return await this.usersRepository.update(id, user)
  }
}
