# Deploy Monolítico no Render

Este guia explica como fazer o deploy da aplicação SOS Câncer como um único serviço no Render, servindo tanto o frontend quanto o backend juntos.

## Estrutura do Deploy Monolítico

- **Frontend**: Servido como arquivos estáticos
- **Backend**: API servindo os arquivos estáticos do frontend
- **URL única**: Tudo acessível através de um único domínio

## Configuração do Backend para Servir Frontend

### 1. Instalar Dependências

Primeiro, vamos adicionar as dependências necessárias no backend:

```bash
cd backend
npm install serve
```

### 2. Atualizar Scripts do Backend

Adicione os seguintes scripts no `backend/package.json`:

```json
{
  "scripts": {
    "build:frontend": "cd ../frontend && npm ci && npm run build",
    "build:all": "npm run build:frontend && npm run build",
    "start:monolith": "npm run build:all && node dist/main.js",
    "serve:static": "serve -s ../frontend/dist -l 3001"
  }
}
```

### 3. Configurar o Backend para Servir Arquivos Estáticos

Atualize o `backend/src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
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

  // Global prefix para API
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

  // Servir arquivos estáticos do frontend
  if (configService.get('NODE_ENV') === 'production') {
    const express = require('express');
    app.use(express.static(join(__dirname, '../../frontend/dist')));
    
    // Fallback para SPA - todas as rotas não-API servem o index.html
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api/')) {
        res.sendFile(join(__dirname, '../../frontend/dist/index.html'));
      }
    });
  }

  const port = configService.get('PORT', 3000);
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Application is running on: http://0.0.0.0:${port}`);
  if (configService.get('NODE_ENV') !== 'production') {
    console.log(`📚 Swagger documentation: http://localhost:${port}/docs`);
  }
}

bootstrap();
```

### 4. Criar Script de Build Unificado

Crie o arquivo `build-monolith.sh` na raiz do projeto:

```bash
#!/bin/bash

echo "🏗️ Building monolith application..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm ci
npm run build
cd ..

# Build backend
echo "🔧 Building backend..."
cd backend
npm ci
npm run build
cd ..

echo "✅ Build completed successfully!"
```

Torne o script executável:

```bash
chmod +x build-monolith.sh
```

### 5. Configuração do Render

Crie o arquivo `render-monolith.yaml`:

```yaml
services:
  - type: web
    name: soscancer-monolith
    env: node
    buildCommand: ./build-monolith.sh
    startCommand: cd backend && npm run start:prod
    plan: starter
    healthCheckPath: /api/health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
    headers:
      - path: /api/*
        name: Access-Control-Allow-Origin
        value: "*"
      - path: /api/*
        name: Access-Control-Allow-Methods
        value: "GET, POST, PUT, DELETE, OPTIONS"
      - path: /api/*
        name: Access-Control-Allow-Headers
        value: "Content-Type, Authorization"
      - path: /*
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /index.html
        name: Cache-Control
        value: public, max-age=0, must-revalidate
```

## Deploy no Render

### 1. Preparar o Repositório

1. Faça commit de todas as mudanças:
```bash
git add .
git commit -m "Configure monolith deployment"
git push origin main
```

### 2. Configurar no Render

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" e selecione "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `soscancer-monolith`
   - **Environment**: `Node`
   - **Build Command**: `bash build.sh` (ou use o comando inline abaixo)
   - **Start Command**: `cd backend && npm run start:prod`
   - **Node Version**: `18`
   - **Plan**: `Starter` (gratuito)

#### Alternativa - Comando Inline (se o script falhar):

Se o script `build.sh` não funcionar, use este comando inline no campo "Build Command":

```bash
echo "🏗️ Building monolith application..." && echo "📦 Building frontend..." && cd frontend && npm install && npm run build && cd .. && echo "🔧 Building backend..." && cd backend && npm install && npm run build && cd .. && echo "✅ Build completed successfully!"
```

### 3. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Render:

```
NODE_ENV=production
PORT=3000
API_VERSION=v1
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=https://soscancer-monolith.onrender.com
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=60
FRONTEND_URL=https://soscancer-monolith.onrender.com
```

**⚠️ IMPORTANTE**: 
- Substitua `your-super-secret-jwt-key-here-make-it-long-and-random` por uma chave secreta forte
- Use pelo menos 32 caracteres aleatórios
- Exemplo: `JWT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

### 4. Deploy

1. Clique em "Create Web Service"
2. O Render iniciará o build automaticamente
3. Aguarde o deploy ser concluído
4. Acesse sua aplicação em: `https://soscancer-monolith.onrender.com`

## Estrutura de URLs

Após o deploy, você terá:

- **Aplicação Principal**: `https://soscancer-monolith.onrender.com`
- **API**: `https://soscancer-monolith.onrender.com/api/`
- **Health Check**: `https://soscancer-monolith.onrender.com/api/health`
- **Documentação** (desenvolvimento): `https://soscancer-monolith.onrender.com/docs`

## Vantagens do Deploy Monolítico

### ✅ Prós:
- **Simplicidade**: Um único serviço para gerenciar
- **Custo**: Apenas um serviço no Render
- **CORS**: Sem problemas de CORS entre frontend e backend
- **Deploy**: Deploy único e sincronizado
- **Debugging**: Logs centralizados

### ❌ Contras:
- **Escalabilidade**: Frontend e backend escalam juntos
- **Performance**: Backend sempre ativo mesmo para arquivos estáticos
- **Flexibilidade**: Menos flexibilidade para deploy independente

## Troubleshooting

### Problemas Comuns:

1. **Build falha**:
   - Verifique se o script `build-monolith.sh` tem permissão de execução
   - Verifique se todas as dependências estão no `package.json`

2. **Frontend não carrega**:
   - Verifique se o caminho para os arquivos estáticos está correto
   - Verifique se o build do frontend foi executado

3. **API não funciona**:
   - Verifique se as rotas da API estão com o prefixo `/api/`
   - Verifique se o CORS está configurado corretamente

4. **404 em rotas do frontend**:
   - Verifique se o fallback para SPA está configurado
   - Verifique se o `index.html` está sendo servido corretamente

### Logs:

Acesse os logs no dashboard do Render para diagnosticar problemas:
1. Vá para o serviço no dashboard
2. Clique na aba "Logs"
3. Verifique os logs de build e runtime

## Atualizações

Para atualizar a aplicação:
1. Faça push das mudanças para o GitHub
2. O Render detectará automaticamente as mudanças
3. Um novo build e deploy será iniciado automaticamente

## Custos

- **Starter Plan**: Gratuito (com limitações)
- **Professional Plan**: $7/mês (recomendado para produção)

## Suporte

Para mais informações sobre o Render, consulte a [documentação oficial](https://render.com/docs).
