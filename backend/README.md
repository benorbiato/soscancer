# SOS Cancer Backend - NestJS

Backend API para a plataforma SOS Cancer construído com NestJS, TypeScript e MongoDB.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js progressivo
- **TypeScript** - Superset tipado do JavaScript
- **MongoDB** - Banco de dados NoSQL
- **JWT** - Autenticação baseada em tokens
- **Swagger** - Documentação da API
- **Class Validator** - Validação de dados
- **Passport** - Estratégias de autenticação

## 📁 Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── guards/           # Guards de autenticação
│   └── strategies/       # Estratégias do Passport
├── users/                # Módulo de usuários
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── schemas/          # Schemas do MongoDB
├── agenda/               # Módulo da agenda
│   ├── agenda.controller.ts
│   └── agenda.module.ts
├── health/               # Módulo de health check
│   ├── health.controller.ts
│   └── health.module.ts
├── common/               # Código compartilhado
│   ├── decorators/       # Decorators customizados
│   ├── dto/             # Data Transfer Objects
│   ├── enums/           # Enums
│   ├── guards/          # Guards de autorização
│   ├── interfaces/      # Interfaces TypeScript
│   └── utils/           # Utilitários
├── app.module.ts        # Módulo principal
├── app.controller.ts    # Controller principal
├── app.service.ts       # Service principal
└── main.ts             # Arquivo de entrada
```

## 🛠️ Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env.example .env
```

3. **Configurar o arquivo .env:**
```env
NODE_ENV=development
PORT=8000
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=30m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174
```

## 🚀 Execução

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

## 📚 Documentação da API

Acesse a documentação Swagger em: `http://localhost:8000/docs`

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação:

- **Access Token**: Válido por 30 minutos
- **Refresh Token**: Válido por 7 dias
- **Bearer Token**: Formato `Authorization: Bearer <token>`

## 👥 Sistema de Permissões

### Roles (Funções)
- **ADMIN**: Acesso total ao sistema
- **VOLUNTEER**: Acesso à agenda e dashboard
- **PATIENT**: Visualização de agenda e perfil
- **SPONSOR**: Acesso à agenda e dashboard
- **SUPPORTER**: Acesso limitado
- **USER**: Acesso básico

### Permissões
- `VIEW_USERS`, `CREATE_USERS`, `UPDATE_USERS`, `DELETE_USERS`
- `VIEW_AGENDA`, `CREATE_EVENTS`, `UPDATE_EVENTS`, `DELETE_EVENTS`
- `VIEW_DASHBOARD`, `VIEW_ANALYTICS`
- `VIEW_SETTINGS`, `UPDATE_PROFILE`, `DELETE_ACCOUNT`
- `VIEW_REGISTRY`, `MANAGE_REGISTRY`
- `ADMIN_ACCESS`, `SYSTEM_SETTINGS`

## 🛡️ Segurança

- **Helmet**: Headers de segurança
- **CORS**: Configuração de origens permitidas
- **Rate Limiting**: Limite de requisições
- **Validation**: Validação de dados de entrada
- **Password Hashing**: Bcrypt para senhas

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📝 Scripts Disponíveis

- `npm run build` - Compilar o projeto
- `npm run start` - Executar em produção
- `npm run start:dev` - Executar em desenvolvimento
- `npm run start:debug` - Executar em modo debug
- `npm run lint` - Executar linter
- `npm run format` - Formatar código

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `NODE_ENV` | Ambiente de execução | `development` |
| `PORT` | Porta do servidor | `8000` |
| `JWT_SECRET` | Chave secreta JWT | - |
| `JWT_EXPIRES_IN` | Expiração do token | `30m` |
| `JWT_REFRESH_EXPIRES_IN` | Expiração do refresh | `7d` |
| `BCRYPT_ROUNDS` | Rounds do bcrypt | `12` |
| `ALLOWED_ORIGINS` | Origens CORS permitidas | - |

## 🚀 Deploy

### Docker
```bash
docker build -t soscancer-backend .
docker run -p 8000:8000 soscancer-backend
```

### PM2
```bash
npm install -g pm2
pm2 start dist/main.js --name soscancer-backend
```

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
