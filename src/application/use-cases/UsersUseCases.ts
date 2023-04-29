import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from '../../application/ports/IUsersRepository';
import { User } from '../../domain/models/User';

@Injectable()
export class UsersUseCases {
  private readonly logger = new Logger(UsersUseCases.name);

  constructor(private readonly usersRepository: IUsersRepository) {}

  async blockUser(id: number): Promise<User> {
    this.logger.log('Block a user');

    const user = await this.usersRepository.getById(id);

    this.logger.log(id);
    this.logger.log(user);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.estaActivo = false;

    return await this.usersRepository.update(id, user);
  }

  async getAllUsers() : Promise<User[]> {
    this.logger.log('Get all users');

    return await this.usersRepository.getAll();
  }
}