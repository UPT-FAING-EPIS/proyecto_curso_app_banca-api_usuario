import { Injectable } from '@nestjs/common';

import { User } from '../../domain/models/User';

import { IRepository } from './IRepository';
import { Rol } from 'src/domain/models/Rol';

@Injectable()
export class IUsersRepository implements IRepository<User> {
  async getById(id: number): Promise<User> {
    const user = new User(1, 'admin@mail.com', 'admin', '12345', new Rol(1, 'ADMINISTRADOR'));
    const users = [user];
    const userFound = users.find((user) => user.idUsuario == id);

    return userFound;
  }
  async getAll(): Promise<User[]> {
    const users = [
      new User(1, 'admin@mail.com', 'admin', '12345', new Rol(1, 'ADMINISTRADOR')),
      new User(2, 'admin@mail.com', 'admin', '12345', new Rol(1, 'ADMINISTRADOR')),
      new User(3, 'admin@mail.com', 'admin', '12345', new Rol(1, 'ADMINISTRADOR'))]

      return users
  }
  create(entity: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async update(id: number, entity: User): Promise<User> {
    let user = await this.getById(id);
    user = entity;

    return user;
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}