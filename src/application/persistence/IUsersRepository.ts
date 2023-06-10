import { IRepository } from './IRepository'

export interface IUsersRepository<User> extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
}
