# Deploy no Vercel - SOS Cancer

Este guia explica como fazer o deploy da aplicação SOS Cancer no Vercel.

## Estrutura do Projeto

```
soscancer/
├── frontend/          # Aplicação React/Vite
├── backend/           # API NestJS
├── vercel.json        # Configuração principal do Vercel
└── .vercelignore      # Arquivos ignorados no deploy
```

## Configuração

### 1. Variáveis de Ambiente

Configure as seguintes variáveis no painel do Vercel:

```bash
# Database
DATABASE_URL=your_database_url_here

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# API Configuration
API_VERSION=v1

# CORS
ALLOWED_ORIGINS=https://your-domain.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=60

# Environment
NODE_ENV=production
```

### 2. Deploy

1. **Conecte o repositório ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub
   - Importe o repositório

2. **Configure o projeto:**
   - Root Directory: `/` (raiz do projeto)
   - Build Command: `npm run build` (para o frontend)
   - Output Directory: `frontend/dist`

3. **Deploy:**
   - O Vercel detectará automaticamente as configurações
   - As Serverless Functions serão criadas automaticamente

## Estrutura das APIs

As seguintes rotas estarão disponíveis:

- `GET /api/health` - Health check
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário
- `GET /api/agenda` - Listar agenda
- `POST /api/agenda` - Criar evento

## Monitoramento

- Acesse o dashboard do Vercel para monitorar as funções
- Use os logs do Vercel para debug
- Configure alertas para erros

## Troubleshooting

### Problemas Comuns

1. **Timeout nas funções:**
   - Verifique se o banco de dados está acessível
   - Otimize as queries

2. **CORS errors:**
   - Configure corretamente as variáveis `ALLOWED_ORIGINS`

3. **Build failures:**
   - Verifique se todas as dependências estão no `package.json`
   - Confirme se os scripts de build estão corretos

### Logs

Para debugar problemas:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Ver logs
vercel logs
```

## Próximos Passos

1. Configure um banco de dados (PostgreSQL recomendado)
2. Configure as variáveis de ambiente
3. Teste todas as rotas da API
4. Configure domínio customizado (opcional)
5. Configure CI/CD para deploys automáticos
