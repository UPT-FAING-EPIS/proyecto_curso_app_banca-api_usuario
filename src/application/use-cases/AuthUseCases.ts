import { Injectable, Logger } from '@nestjs/common'
import { RegisterAuthDto } from 'application/dtos/register-auth.dto'
import { LoginAuthDto } from 'application/dtos/login-auth.dto'
import { CommandBus } from '@nestjs/cqrs'
import { RegisterAuthCommand } from 'application/commands/register-auth.command'
import { LoginAuthCommand } from 'application/commands/login-auth.command'

@Injectable()
export class AuthUseCases {
  private readonly logger = new Logger(AuthUseCases.name)

  constructor(private commandBus: CommandBus) {}

  async register(user: RegisterAuthDto) {
    this.logger.log('Register a user')
    return this.commandBus.execute(new RegisterAuthCommand(user))
  }

  async login(loginData: LoginAuthDto) {
    this.logger.log('Login a user')
    return this.commandBus.execute(new LoginAuthCommand(loginData))
  }
}
