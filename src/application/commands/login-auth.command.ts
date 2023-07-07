import { LoginAuthDto } from 'application/dtos/login-auth.dto'

export class LoginAuthCommand {
  constructor(public readonly loginAuth: LoginAuthDto) {}
}
