# 🔍 Debug do Erro 422 - Login Frontend

## ❌ **Problema Atual:**
```
POST http://localhost:8000/api/v1/auth/login 422 (Unprocessable Entity)
Login error: Error: [object Object]
```

## 🔧 **Correções Implementadas:**

### **1. Tratamento de Erro Melhorado:**
```typescript
// client.ts - Tratamento de erro mais detalhado
if (!response.ok) {
  let errorMessage = 'Request failed'
  if (isJson && data) {
    if (data.detail) {
      if (Array.isArray(data.detail)) {
        errorMessage = data.detail.map((err: any) => err.msg || err.message || err).join(', ')
      } else {
        errorMessage = data.detail
      }
    } else if (data.message) {
      errorMessage = data.message
    }
  }
  const error = new Error(errorMessage)
  ;(error as any).status = response.status
  ;(error as any).data = data
  throw error
}
```

### **2. Logs de Debug Adicionados:**
```typescript
// auth-context.tsx - Logs detalhados
console.error('Login error details:', {
  message: error instanceof Error ? error.message : 'Unknown error',
  status: (error as any)?.status,
  data: (error as any)?.data,
  fullError: error
})

// client.ts - Log da requisição
console.log('API Request:', {
  url,
  method: requestOptions.method,
  headers: requestOptions.headers,
  body: requestOptions.body
})
```

## 🧪 **Como Testar:**

### **1. Abra o Frontend:**
- Acesse: http://localhost:5173
- Abra DevTools (F12) → Console

### **2. Tente Fazer Login:**
- Use: `frontend@test.com` / `12345678`
- Observe os logs no console

### **3. Verifique os Logs:**
```
// Deve aparecer no console:
Form submitted with values: { email: "frontend@test.com", password: "***" }
API Request: { url: "http://localhost:8000/api/v1/auth/login", method: "POST", headers: {...}, body: "..." }
Attempting login with: { email: "frontend@test.com", password: "***" }
```

## 🔍 **Possíveis Causas:**

### **1. Dados Inválidos:**
- Email vazio ou mal formatado
- Senha vazia ou muito curta
- Campos não preenchidos

### **2. Problemas de Validação:**
- Frontend não validando corretamente
- Backend rejeitando dados
- Schema incompatível

### **3. Problemas de CORS:**
- Headers incorretos
- Content-Type inválido
- CORS não configurado

## ✅ **Status dos Testes:**

### **Backend (Funcionando):**
```bash
# ✅ Teste manual - 200 OK
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "frontend@test.com", "password": "12345678"}'
```

### **Frontend (Debug em Andamento):**
- ✅ Logs adicionados
- ✅ Tratamento de erro melhorado
- ✅ Validação corrigida
- 🔍 Testando com usuário

## 🎯 **Próximos Passos:**

1. **Teste o login** no frontend
2. **Verifique os logs** no console
3. **Compare com o curl** que funciona
4. **Identifique a diferença**

## 📝 **Logs Esperados:**

### **Sucesso:**
```
Form submitted with values: { email: "frontend@test.com", password: "***" }
API Request: { url: "http://localhost:8000/api/v1/auth/login", method: "POST", ... }
Attempting login with: { email: "frontend@test.com", password: "***" }
Login response: { access_token: "...", user_name: "Frontend Test", ... }
```

### **Erro:**
```
Form submitted with values: { email: "...", password: "***" }
API Request: { url: "http://localhost:8000/api/v1/auth/login", method: "POST", ... }
Login error details: { message: "...", status: 422, data: {...}, fullError: ... }
```

## 🚀 **Teste Agora:**

1. **Acesse**: http://localhost:5173
2. **Abra Console**: F12 → Console
3. **Faça Login**: Use `frontend@test.com` / `12345678`
4. **Verifique Logs**: Compare com o esperado
5. **Reporte Resultado**: O que aparece no console?

**Agora os logs devem mostrar exatamente o que está acontecendo!** 🔍
