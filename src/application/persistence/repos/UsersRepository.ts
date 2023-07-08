import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from 'domain/entities/user.entity'
import { UpdateUserDto } from 'application/dtos/update-user.dto'
import { IUsersRepository } from './IUsersRepository'

@Injectable()
export class UsersRepository implements IUsersRepository<User> {
  constructor(@InjectRepository(User) private usersDb: Repository<User>) {}
  
  async getById(id: number): Promise<User> {
    return this.usersDb.findOneBy({ id: id })
  }
  
  async getAll(): Promise<User[]> {
    return this.usersDb.find()
  }
  
  create(user: User): Promise<User> {
    const newUser = this.usersDb.create(user)
    return this.usersDb.save(newUser)
  }

  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.usersDb.findOneBy({ id: id })

    if (!userFound) {
      throw new Error('User not found')
    }

    const updatedUser = Object.assign(userFound, user)
    return this.usersDb.save(updatedUser)
  }

  async findByEmail(email: string) {
    return this.usersDb.findOne({ where: { email }, relations: ['roles'] })
  }

  async findByPhone(phone: string) {
    return this.usersDb.findOneBy({ phone })
  }
}
