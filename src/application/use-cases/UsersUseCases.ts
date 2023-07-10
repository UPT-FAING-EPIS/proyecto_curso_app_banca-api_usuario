import { Injectable, Logger } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { BlockUserCommand } from 'application/commands/block-user.command'
import { CreateUserCommand } from 'application/commands/create-user.command'
import { UpdateUserWithImageCommand } from 'application/commands/update-user-with-image.command'
import { UpdateUserCommand } from 'application/commands/update-user.command'
import { CreateUserDto } from 'application/dtos/create-user.dto'
import { UpdateUserDto } from 'application/dtos/update-user.dto'
import { GetAllUsersQuery } from 'application/queries/get-all-users.query'
import { User } from 'domain/entities/user.entity'

@Injectable()
export class UsersUseCases {
  private readonly logger = new Logger(UsersUseCases.name)

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async updateUserWithImage(file: Express.Multer.File, id: number): Promise<User> {
    this.logger.log('Update a user')
    return this.commandBus.execute(new UpdateUserWithImageCommand(file, id))
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    this.logger.log('Update a user')
    return this.commandBus.execute(new UpdateUserCommand(id, user))
  }

  async createUser(user: CreateUserDto): Promise<User> {
    this.logger.log('Create a user')
    return this.commandBus.execute(new CreateUserCommand(user))
  }

  async getAllUsers(): Promise<User[]> {
    this.logger.log('Get all users')
    return await this.queryBus.execute(new GetAllUsersQuery())
  }

  async blockUser(id: number): Promise<User> {
    this.logger.log('Block a user')
    return await this.commandBus.execute(new BlockUserCommand(id))
  }
}
