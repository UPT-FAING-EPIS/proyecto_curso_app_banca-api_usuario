import { RegisterAuthDto } from 'application/dtos/register-auth.dto'

export class RegisterAuthCommand {
  constructor(public readonly userAuth: RegisterAuthDto) {}
}
