# Deploy no Render

Este guia explica como fazer o deploy da aplicação SOS Câncer no Render.

## Estrutura do Projeto

- `frontend/` - Aplicação React/Vite
- `backend/` - API NestJS
- `render.yaml` - Configuração do Render

## Configuração do Deploy

### 1. Frontend (Static Site)

1. Acesse o [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" e selecione "Static Site"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `soscancer-frontend`
   - **Build Command**: `cd frontend && npm ci && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Node Version**: `18`

### 2. Backend (Web Service)

1. No Render Dashboard, clique em "New +" e selecione "Web Service"
2. Conecte o mesmo repositório GitHub
3. Configure:
   - **Name**: `soscancer-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm ci && npm run build`
   - **Start Command**: `cd backend && npm run start:prod`
   - **Node Version**: `18`
   - **Plan**: `Starter` (gratuito)

### 3. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Render:

#### Backend:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
API_VERSION=v1
ALLOWED_ORIGINS=https://soscancer-frontend.onrender.com
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=60
FRONTEND_URL=https://soscancer-frontend.onrender.com
```

#### Frontend:
```
VITE_API_URL=https://soscancer-backend.onrender.com
```

### 4. Health Check

O backend inclui um endpoint de health check em `/api/health` que será usado pelo Render para verificar se o serviço está funcionando.

### 5. CORS

O backend está configurado para aceitar requisições do frontend. Certifique-se de que a variável `ALLOWED_ORIGINS` contenha a URL correta do frontend.

## URLs de Deploy

Após o deploy, você terá:
- **Frontend**: `https://soscancer-frontend.onrender.com`
- **Backend**: `https://soscancer-backend.onrender.com`

## Monitoramento

O Render fornece logs em tempo real e métricas básicas para ambos os serviços. Você pode acessar os logs através do dashboard do Render.

## Troubleshooting

### Problemas Comuns:

1. **Build falha**: Verifique se todas as dependências estão no `package.json`
2. **CORS errors**: Verifique se `ALLOWED_ORIGINS` está configurado corretamente
3. **Health check falha**: Verifique se o endpoint `/api/health` está funcionando
4. **Frontend não carrega**: Verifique se `VITE_API_URL` está configurado corretamente

### Logs:

- Acesse o dashboard do Render
- Clique no serviço desejado
- Vá para a aba "Logs" para ver os logs em tempo real

## Atualizações

Para atualizar a aplicação:
1. Faça push das mudanças para o GitHub
2. O Render detectará automaticamente as mudanças
3. Um novo deploy será iniciado automaticamente

## Custos

- **Starter Plan**: Gratuito (com limitações)
- **Professional Plan**: $7/mês por serviço (recomendado para produção)

## Suporte

Para mais informações sobre o Render, consulte a [documentação oficial](https://render.com/docs).
