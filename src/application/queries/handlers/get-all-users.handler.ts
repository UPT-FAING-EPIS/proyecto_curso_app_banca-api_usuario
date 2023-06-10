import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UsersRepository } from 'application/persistence/UsersRepository'
import { GetAllUsersQuery } from 'application/queries/get-all-users.query'

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler
  implements IQueryHandler<GetAllUsersQuery>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetAllUsersQuery): Promise<any> {
    return await this.usersRepository.getAll()
  }
}
