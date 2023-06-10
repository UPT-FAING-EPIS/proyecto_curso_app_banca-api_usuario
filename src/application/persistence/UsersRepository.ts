import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IRepository } from './IRepository'

import { User } from 'domain/entities/user.entity'
import { UpdateUserDto } from 'application/dtos/update-user.dto'
import { CreateUserDto } from 'application/dtos/create-user.dto'

@Injectable()
export class UsersRepository implements IRepository<User> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id })
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user)
    return this.usersRepository.save(newUser)
  }

  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOneBy({ id: id })

    if (!userFound) {
      throw new Error('User not found')
    }

    const updatedUser = Object.assign(userFound, user)
    return this.usersRepository.save(updatedUser)
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email })
  }

  async findByPhone(phone: string) {
    return this.usersRepository.findOneBy({ phone })
  }
}
