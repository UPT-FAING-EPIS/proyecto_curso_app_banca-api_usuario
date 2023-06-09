import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }))

  const config = new DocumentBuilder()
    .setTitle('API Usuario')
    .setDescription('API de usuario para el proyecto Banca')
    .setVersion('0.1')
    .addTag('banca')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
  //Configurar servidor con IP address
  //await app.listen(3000, '192.168.0.3' || 'localhost');
  //Para lanzar la peticion desde otro dispositivo
}
bootstrap()
