# Guia de Integração de Autenticação

## Visão Geral

Este documento descreve a implementação completa do sistema de autenticação JWT entre o frontend (React/Vite) e o backend (FastAPI).

## Funcionalidades Implementadas

### Backend (FastAPI)
- ✅ Endpoint de login: `POST /api/v1/auth/login`
- ✅ Validação de credenciais (email/senha)
- ✅ Geração de JWT tokens
- ✅ Hash seguro de senhas com bcrypt
- ✅ Tratamento de erros de autenticação

### Frontend (React/Vite)
- ✅ Formulário de login com validação
- ✅ Integração com API de autenticação
- ✅ Armazenamento de token no localStorage
- ✅ Redirecionamento após login bem-sucedido
- ✅ Feedback visual para o usuário

## Estrutura da Autenticação

### Schemas (Backend)
```python
# LoginRequest
{
  "email": "string (EmailStr)",
  "password": "string"
}

# TokenResponse
{
  "access_token": "string (JWT)",
  "token_type": "bearer",
  "user_id": "string (UUID)",
  "user_name": "string",
  "user_email": "string"
}
```

### Fluxo de Autenticação

1. **Frontend**: Usuário preenche email e senha
2. **Validação**: Zod schema valida os dados
3. **Envio**: Dados são enviados para `/api/v1/auth/login`
4. **Backend**: Verifica credenciais no banco de dados
5. **Hash**: Compara senha com hash bcrypt armazenado
6. **JWT**: Gera token JWT com informações do usuário
7. **Resposta**: Retorna token e dados do usuário
8. **Frontend**: Armazena token no localStorage
9. **Redirecionamento**: Usuário é redirecionado para dashboard

## Como Testar

### 1. Iniciar o Backend
```bash
cd backend
source .venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Iniciar o Frontend
```bash
cd frontend
npm run dev
```

### 3. Testar Login
- Acesse: http://localhost:5174
- Use as credenciais de um usuário existente
- Exemplo: `teste@example.com` / `123456`

## Endpoints de Autenticação

### POST /api/v1/auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Sucesso):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": "uuid-string",
  "user_name": "Nome do Usuário",
  "user_email": "user@example.com"
}
```

**Response (Erro):**
```json
{
  "detail": "Invalid email or password"
}
```

## Configuração de Segurança

### JWT Settings
- **Algoritmo**: HS256
- **Expiração**: 30 minutos
- **Secret Key**: Configurável (atualmente hardcoded para desenvolvimento)

### Hash de Senhas
- **Algoritmo**: bcrypt
- **Rounds**: Padrão do passlib
- **Truncamento**: Configurado para evitar erros com senhas longas

## Armazenamento no Frontend

### localStorage
Após login bem-sucedido, os seguintes dados são armazenados:
```javascript
localStorage.setItem('access_token', response.access_token)
localStorage.setItem('user_id', response.user_id)
localStorage.setItem('user_name', response.user_name)
localStorage.setItem('user_email', response.user_email)
```

## Tratamento de Erros

### Backend
- **401 Unauthorized**: Credenciais inválidas
- **422 Unprocessable Entity**: Dados de entrada inválidos
- **500 Internal Server Error**: Erro interno do servidor

### Frontend
- **Validação**: Zod schema valida email e senha
- **Feedback**: Mensagens de erro/sucesso para o usuário
- **Loading**: Estado de carregamento durante autenticação
- **Redirecionamento**: Automático para dashboard após sucesso

## Próximos Passos

1. **Middleware de Autenticação**: Proteger rotas que requerem autenticação
2. **Refresh Tokens**: Implementar renovação automática de tokens
3. **Logout**: Implementar funcionalidade de logout
4. **Proteção de Rotas**: Middleware para verificar tokens em requisições
5. **Configuração de Ambiente**: Mover secret key para variáveis de ambiente
6. **Persistência de Sessão**: Manter usuário logado entre recarregamentos

## Testes Realizados

### ✅ Testes de Integração
- Login com credenciais válidas
- Login com credenciais inválidas
- Validação de formulário no frontend
- Geração e armazenamento de JWT
- Redirecionamento após login

### ✅ Testes de API
- Endpoint de login funcionando
- Validação de dados de entrada
- Tratamento de erros
- Geração de tokens JWT

## Segurança

### Implementado
- ✅ Hash seguro de senhas (bcrypt)
- ✅ Validação de entrada (Pydantic)
- ✅ JWT com expiração
- ✅ CORS configurado

### Recomendações para Produção
- 🔒 Usar HTTPS em produção
- 🔒 Configurar secret key em variáveis de ambiente
- 🔒 Implementar rate limiting
- 🔒 Adicionar logs de segurança
- 🔒 Configurar CORS específico para domínios de produção
