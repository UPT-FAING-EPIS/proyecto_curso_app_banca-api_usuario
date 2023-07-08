import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'infrastructure/auth/jwt.constants'
import { JwtStrategy } from 'infrastructure/auth/jwt.strategy'
import { UsersRepository } from 'application/persistence/repos/UsersRepository'
import { User } from 'domain/entities/user.entity'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from 'application/commands/handlers'
import { QueryHandlers } from 'application/queries/handlers'
import { UseCases } from 'application/use-cases'
import { HealthModule } from './infrastructure/health/health.module'
import appConfig from 'infrastructure/config/app.config'
import { RolesRepository } from 'application/persistence/repos/RolesRepository'
import { Controllers } from 'presentation/controllers'

const db = appConfig.db

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: db.host,
      port: db.port,
      username: db.user,
      password: db.password,
      database: db.name,
      ssl: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    }),
    HealthModule,
  ],
  controllers: [AppController, ...Controllers],
  providers: [
    {
      provide: 'AppConfig',
      useValue: appConfig,
    },
    AppService,
    JwtStrategy,
    UsersRepository,
    RolesRepository,
    ...UseCases,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class AppModule {}
