import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'api-usuario-db-ins.c5odpn9hksgv.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'su',
      ssl: false,
      password: 'upt2023-API',
      database: 'Api_Usuario',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
