import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer les validations globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,//lorsqu'elle est définie sur true, les propriétés qui ne font pas partie du DTO sont automatiquement supprimées de l'objet.
      forbidNonWhitelisted: true,//lorsqu'elle est définie sur true, une exception est lancée si des propriétés non autorisées sont fournies.
      transform: true,//lorsqu'elle est définie sur true, elle transforme automatiquement les objets reçus en instances de classes correspondant à vos DTO.
    }),
  );
  
  app.enableCors()
  await app.listen(3000);
}

bootstrap();
