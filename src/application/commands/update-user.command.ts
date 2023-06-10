import { UpdateUserDto } from 'application/dtos/update-user.dto'

export class UpdateUserCommand {
  constructor(
    public readonly id: number,
    public readonly user: UpdateUserDto
  ) {}
}
