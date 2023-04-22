import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersUseCases } from './application/use-cases/UsersUseCases';
import { IUsersRepository } from './application/ports/IUsersRepository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersUseCases, IUsersRepository],
})
export class UsersModule {}
