# Guia de Integração Frontend-Backend

## Visão Geral

Este documento descreve como a integração entre o frontend (React/Vite) e o backend (FastAPI) foi implementada para a criação de usuários.

## Estrutura da Integração

### Backend (FastAPI)
- **Endpoint**: `POST /api/v1/users/`
- **Porta**: 8000
- **CORS**: Configurado para aceitar requisições do frontend
- **Validação**: Usando Pydantic schemas
- **Armazenamento**: JSON file (users.json)

### Frontend (React/Vite)
- **Porta**: 5173
- **API Client**: Configurado em `src/lib/api/client.js`
- **Formulário**: Componente de registro em `src/modules/registry/components/form.tsx`

## Como Testar a Integração

### 1. Iniciar o Backend
```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Iniciar o Frontend
```bash
cd frontend
npm run dev
```

### 3. Acessar a Aplicação
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/docs (Swagger UI)

## Fluxo de Criação de Usuário

1. **Frontend**: Usuário preenche o formulário de registro
2. **Validação**: Zod schema valida os dados no frontend
3. **Envio**: Dados são enviados para a API via `createUser()`
4. **Backend**: FastAPI recebe e valida os dados com Pydantic
5. **Processamento**: Senha é hasheada com bcrypt
6. **Armazenamento**: Usuário é salvo no arquivo JSON
7. **Resposta**: Backend retorna os dados do usuário criado
8. **Feedback**: Frontend exibe mensagem de sucesso/erro

## Estrutura dos Dados

### Schema de Criação (UserCreate)
```json
{
  "name": "string (obrigatório, 1-200 chars)",
  "email": "string (obrigatório, formato email)",
  "password": "string (obrigatório, 6-200 chars)",
  "phone": "string (opcional, max 50 chars)",
  "role": "string (opcional, max 50 chars)"
}
```

### Resposta da API (UserPublic)
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string | null",
  "role": "string | null"
}
```

## Tratamento de Erros

### Frontend
- Validação de formulário com Zod
- Estados de loading durante submissão
- Mensagens de erro/sucesso para o usuário
- Tratamento de erros de rede

### Backend
- Validação com Pydantic
- Verificação de email duplicado
- Hash seguro de senhas
- Códigos de status HTTP apropriados

## Configuração de Ambiente

### Variáveis de Ambiente
- `VITE_API_BASE_URL`: URL base da API (padrão: http://localhost:8000)

### CORS
O backend está configurado para aceitar requisições de qualquer origem durante o desenvolvimento.

## Endpoints Disponíveis

- `GET /api/v1/users/` - Listar usuários
- `POST /api/v1/users/` - Criar usuário
- `GET /api/v1/users/{user_id}` - Obter usuário específico
- `PUT /api/v1/users/{user_id}` - Atualizar usuário
- `DELETE /api/v1/users/{user_id}` - Deletar usuário

## Próximos Passos

1. Implementar autenticação JWT
2. Adicionar middleware de autenticação
3. Implementar refresh tokens
4. Adicionar testes automatizados
5. Configurar CI/CD
