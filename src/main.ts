import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

import appConfig from 'infrastructure/config/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }))

  const port = appConfig.port

  const config = new DocumentBuilder()
    .setTitle('API Usuario')
    .setDescription('API de usuario para el proyecto Banca')
    .setVersion('0.1')
    .addTag('banca')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
}
bootstrap()
