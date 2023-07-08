import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { User } from 'domain/entities/user.entity'
import { IRepository } from './IRepository'
import { Role } from 'domain/entities/role.entity'
import { CreateRoleDto } from 'application/dtos/create-role.dto'

@Injectable()
export class RolesRepository implements IRepository<Role> {
  constructor(@InjectRepository(User) private db: Repository<Role>) {}

  async getById(id: number): Promise<Role> {
    return this.db.findOneBy({ id: `${id}` })
  }

  async getAllByIds(ids: number[]): Promise<Role[]> {
    return this.db.findBy({ id: In(ids) })
  }

  async getAll(): Promise<Role[]> {
    return this.db.find()
  }

  create(role: CreateRoleDto) {
    const newRole = this.db.create(role)
    return this.db.save(newRole)
  }

  async update(id: number, role: Role) {
    const roleFound = await this.db.findOneBy({ id: `${id}` })

    if (!roleFound) {
      throw new Error('Role not found')
    }

    const updatedRole = Object.assign(roleFound, role)
    return this.db.save(updatedRole)
  }

  createDefaultRoles() {
    const roles: CreateRoleDto[] = [
      {
        id: 'ADMIN',
        name: 'Administrator',
        image: 'https://static.thenounproject.com/png/2303078-200.png',
        route: '/admin',
      },
      {
        id: 'CLIENT',
        name: 'Client',
        image: 'https://static.thenounproject.com/png/1835600-200.png',
        route: '/client',
      },
    ]

    roles.forEach(async (role) => {
      const roleFound = await this.db.findOneBy({ id: role.id })
      if (!roleFound) {
        const newRole = this.db.create(role)
        this.db.save(newRole)
      }
    })
  }
}
