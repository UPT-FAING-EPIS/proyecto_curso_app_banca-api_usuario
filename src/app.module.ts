import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from 'presentation/controllers/users.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'infrastructure/auth/jwt.constants'
import { JwtStrategy } from 'infrastructure/auth/jwt.strategy'
import { UsersRepository } from 'application/persistence/UsersRepository'
import { User } from 'domain/entities/user.entity'
import { AuthController } from 'presentation/controllers/auth.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from 'application/commands/handlers'
import { QueryHandlers } from 'application/queries/handlers'
import { UseCases } from 'application/use-cases'
import { HealthModule } from './infrastructure/health/health.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      ssl: false,
      password: 'alcbart12',
      database: 'users',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    }),
    HealthModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    AppService,
    JwtStrategy,
    UsersRepository,
    ...UseCases,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class AppModule {}
