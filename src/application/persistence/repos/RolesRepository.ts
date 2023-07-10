import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { Role } from 'domain/entities/role.entity'
import { CreateRoleDto } from 'application/dtos/create-role.dto'
import { IRepository } from './IRepository'

@Injectable()
export class RolesRepository implements IRepository<Role> {
  constructor(@InjectRepository(Role) private db: Repository<Role>) {}

  async getById(id: number): Promise<Role> {
    return this.db.findOneBy({ id: `${id}` })
  }

  async getAllByIds(ids: string[]): Promise<Role[]> {
    return this.db.findBy({ id: In(ids) })
  }

  async getAll(): Promise<Role[]> {
    return this.db.find()
  }

  saveCreated(role: CreateRoleDto) {
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
}
