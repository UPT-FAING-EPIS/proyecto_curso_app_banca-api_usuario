import { User } from 'domain/entities/user.entity'
import { IUserFactory } from './IUserFactory'
import { Client } from 'domain/entities/client.entity'
import { Employee } from 'domain/entities/employee.entity'
import { Administrator } from 'domain/entities/administrator.entity'

export class BankUserFactory implements IUserFactory {
  createClient(): User {
    return new Client()
  }

  createEmployee(): User {
    return new Employee()
  }

  createAdministrator(): User {
    return new Administrator()
  }
}
