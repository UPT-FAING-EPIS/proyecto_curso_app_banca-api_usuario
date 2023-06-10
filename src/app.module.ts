import { Module, Query } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from 'presentation/controllers/users.controller'
import { UsersUseCases } from 'application/use-cases/UsersUseCases'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'infrastructure/auth/jwt.constants'
import { JwtStrategy } from 'infrastructure/auth/jwt.strategy'
import { UsersRepository } from 'application/persistence/UsersRepository'
import { User } from 'domain/entities/user.entity'
import { AuthUseCases } from 'application/use-cases/AuthUseCases'
import { AuthController } from 'presentation/controllers/auth.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from 'application/commands/handlers'
import { QueryHandlers } from 'application/queries/handlers'
import { UseCases } from 'application/use-cases'

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'api-usuario-db-ins.c5odpn9hksgv.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'su',
      ssl: false,
      password: 'upt2023-API',
      database: 'Api_Usuario',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    }),
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
