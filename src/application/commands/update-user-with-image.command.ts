import { UpdateUserDto } from 'application/dtos/update-user.dto'

export class UpdateUserWithImageCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly id: number,
    public readonly user: UpdateUserDto
  ) {}
}
