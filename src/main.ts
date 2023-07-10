import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

import 'infrastructure/logging/tracing'
import { Logger as PinoLogger } from 'nestjs-pino'
import { Logger } from '@nestjs/common'

import appConfig from 'infrastructure/config/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.useLogger(app.get(PinoLogger))

  const logger = new Logger('main')

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }))

  const port = appConfig.port

  const config = new DocumentBuilder()
    .setTitle('API Usuario')
    .setDescription('API de usuario para el proyecto Banca')
    .setVersion('1.1.1')
    .addTag('banca')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port).then(() => {
    logger.log(`Server running on port ${port}`)
  })
}
bootstrap()
