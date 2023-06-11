import { User } from 'domain/entities/user.entity'
import { ValidationStrategy } from './ValidationStrategy'

export class UserValidator {
  private validationStrategy: ValidationStrategy

  constructor(validationStrategy: ValidationStrategy) {
    this.validationStrategy = validationStrategy
  }

  setValidationStrategy(validationStrategy: ValidationStrategy) {
    this.validationStrategy = validationStrategy
  }

  validate(user: User): boolean {
    return this.validationStrategy.validate(user)
  }
}
