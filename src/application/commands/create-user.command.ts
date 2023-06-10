import { CreateUserDto } from 'application/dtos/create-user.dto'

export class CreateUserCommand {
  constructor(public readonly user: CreateUserDto) {}
}
