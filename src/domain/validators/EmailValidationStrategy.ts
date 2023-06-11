import { User } from 'domain/entities/user.entity'
import { ValidationStrategy } from './ValidationStrategy'

export class EmailValidationStrategy implements ValidationStrategy {
  validate(user: User): boolean {
    if (user.email.length > 100) return false
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(user.email)
  }
}
