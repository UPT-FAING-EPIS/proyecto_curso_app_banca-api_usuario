import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'api-usuario-db-ins.c5odpn9hksgv.us-east-1.rds.amazonaws.com',
        username: 'su',
        ssl: true,
        password: 'upt2023-API',
        database: 'api_usuario',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
