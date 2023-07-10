import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'infrastructure/auth/jwt.constants'
import { JwtStrategy } from 'infrastructure/auth/jwt.strategy'
import { User } from 'domain/entities/user.entity'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from 'application/commands/handlers'
import { QueryHandlers } from 'application/queries/handlers'
import { UseCases } from 'application/use-cases'
import { HealthModule } from './infrastructure/health/health.module'
import appConfig from 'infrastructure/config/app.config'
import { Controllers } from 'presentation/controllers'
import { Repositories } from 'application/persistence/repos'
import { Role } from 'domain/entities/role.entity'
import { LoggerModule } from 'nestjs-pino'
import { DatadogTraceModule } from 'nestjs-ddtrace'

const dbConfig = appConfig.db

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User, Role]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...dbConfig,
      ssl: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    }),
    HealthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      },
    }),
    DatadogTraceModule.forRoot(),
  ],
  controllers: [AppController, ...Controllers],
  providers: [
    {
      provide: 'AppConfig',
      useValue: appConfig,
    },
    AppService,
    JwtStrategy,
    ...Repositories,
    ...UseCases,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class AppModule {}
