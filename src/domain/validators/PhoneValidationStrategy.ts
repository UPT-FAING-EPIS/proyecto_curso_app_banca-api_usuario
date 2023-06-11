import { User } from 'domain/entities/user.entity'
import { ValidationStrategy } from './ValidationStrategy'

export class PhoneValidationStrategy implements ValidationStrategy {
  validate(user: User): boolean {
    const phoneRegex = /^\d{9}$/
    return phoneRegex.test(user.phone)
  }
}
