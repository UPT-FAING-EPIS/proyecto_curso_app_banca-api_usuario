import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from 'presentation/controllers/users.controller'
import { UsersUseCases } from 'application/use-cases/UsersUseCases'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'infrastructure/auth/jwt.constants'
import { JwtStrategy } from 'infrastructure/auth/jwt.strategy'
import { User } from 'domain/entities/user.entity'
import { UsersRepository } from 'application/persistence/UsersRepository'

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersUseCases, JwtStrategy, UsersRepository],
})
export class AppModule {}
