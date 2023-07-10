export class UpdateUserWithImageCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly id: number
  ) {}
}
