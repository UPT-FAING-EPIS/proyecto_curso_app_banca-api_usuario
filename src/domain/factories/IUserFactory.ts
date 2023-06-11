import { User } from 'domain/entities/user.entity'

export interface IUserFactory {
  createClient(): User
  createEmployee(): User
  createAdministrator(): User
}
