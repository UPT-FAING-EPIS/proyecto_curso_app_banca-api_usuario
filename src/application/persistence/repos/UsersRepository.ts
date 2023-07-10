import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from 'domain/entities/user.entity'
import { UpdateUserDto } from 'application/dtos/update-user.dto'
import { IUsersRepository } from './IUsersRepository'

@Injectable()
export class UsersRepository implements IUsersRepository<User> {
  constructor(@InjectRepository(User) private db: Repository<User>) {}

  async getById(id: number): Promise<User> {
    return this.db.findOneBy({ id: id })
  }

  async getAll(): Promise<User[]> {
    return this.db.find()
  }

  saveCreated(user: User): Promise<User> {
    const newUser = this.db.create(user)
    return this.db.save(newUser)
  }

  create(user: User): User {
    return this.db.create(user)
  }

  async save(user: User): Promise<User> {
    return this.db.save(user)
  }

  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.db.findOneBy({ id: id })

    if (!userFound) {
      throw new Error('User not found')
    }

    const updatedUser = Object.assign(userFound, user)
    return this.db.save(updatedUser)
  }

  async updateImageProfile(id: number, image: string) {
    const userFound = await this.db.findOneBy({ id: id })

    if (!userFound) {
      throw new Error('User not found')
    }

    const updatedUser = Object.assign(userFound, { image })
    return this.db.save(updatedUser)
  }

  async findByEmail(email: string) {
    return this.db.findOne({ where: { email }, relations: ['roles'] })
  }

  async findByPhone(phone: string) {
    return this.db.findOneBy({ phone })
  }
}
