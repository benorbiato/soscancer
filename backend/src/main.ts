import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security middleware
  app.use(helmet());
  app.use(compression());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: configService.get('RATE_LIMIT_WINDOW_MS', 60000),
      max: configService.get('RATE_LIMIT_MAX_REQUESTS', 60),
      message: {
        error: 'Too many requests',
        code: 'RATE_LIMIT_EXCEEDED'
      }
    })
  );

  // CORS
  app.enableCors({
    origin: configService.get('ALLOWED_ORIGINS', ['http://localhost:3000', 'http://localhost:5173']),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  // Global prefix
  app.setGlobalPrefix(`api/${configService.get('API_VERSION', 'v1')}`);

  // Swagger documentation
  if (configService.get('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('SOS Cancer API')
      .setDescription('API for SOS Cancer support platform')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const port = configService.get('PORT', 3000);
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Application is running on: http://0.0.0.0:${port}`);
  if (configService.get('NODE_ENV') !== 'production') {
    console.log(`📚 Swagger documentation: http://localhost:${port}/docs`);
  }
}

bootstrap();
