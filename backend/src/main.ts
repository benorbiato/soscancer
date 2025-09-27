import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Desabilitado para servir arquivos estáticos
  }));
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

  // CORS personalizado para evitar múltiplos valores
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Remover headers CORS existentes para evitar conflitos
    res.removeHeader('Access-Control-Allow-Origin');
    res.removeHeader('Access-Control-Allow-Credentials');
    res.removeHeader('Access-Control-Allow-Methods');
    res.removeHeader('Access-Control-Allow-Headers');
    
    // Permitir apenas origens específicas
    if (origin === 'http://localhost:5173' || origin === 'http://localhost:3000' || origin === 'http://localhost:5174') {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    next();
  });

  // Desabilitar CORS do NestJS para evitar conflitos
  // app.enableCors(false); // Comentado para evitar erro de TypeScript

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


  const port = configService.get('PORT', 8000);
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Application is running on: http://0.0.0.0:${port}`);
  if (configService.get('NODE_ENV') !== 'production') {
    console.log(`📚 Swagger documentation: http://localhost:${port}/docs`);
  }
}

bootstrap();
