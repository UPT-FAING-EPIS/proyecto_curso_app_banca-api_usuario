import { User } from 'domain/entities/user.entity'

export interface ValidationStrategy {
  validate(user: User): boolean
}
