import { Module } from '@nestjs/common'
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

/* 
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'api-usuario-db-ins.c5odpn9hksgv.us-east-1.rds.amazonaws.com',
  port: 3306,
  username: 'su',
  ssl: false,
  password: 'upt2023-API',
  database: 'Api_Usuario',
  synchronize: true,
}),
*/

@Module({
  imports: [
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
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersUseCases, AuthUseCases, JwtStrategy, UsersRepository],
})
export class AppModule {}
