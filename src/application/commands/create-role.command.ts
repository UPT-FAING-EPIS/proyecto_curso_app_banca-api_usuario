import { CreateRoleDto } from 'application/dtos/create-role.dto'

export class CreateRoleCommand {
  constructor(public readonly role: CreateRoleDto) {}
}
