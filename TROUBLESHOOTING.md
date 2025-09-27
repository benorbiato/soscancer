# 🔧 Guia de Solução de Problemas

## ❌ **Erro: Address already in use**

### **Problema:**
```
ERROR: [Errno 98] Address already in use
```

### **Causa:**
A porta 8000 já está sendo usada por outro processo.

### **Solução:**

#### **1. Parar processos existentes:**
```bash
# Parar todos os processos uvicorn
pkill -f uvicorn

# Verificar se a porta está livre
lsof -i :8000
```

#### **2. Iniciar o backend corretamente:**
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### **3. Alternativa - usar porta diferente:**
```bash
# Se a porta 8000 estiver ocupada, use outra porta
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

## 🔍 **Verificações de Funcionamento**

### **1. Backend funcionando:**
```bash
# Testar endpoint de login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "frontend@test.com", "password": "12345678"}'
```

### **2. Frontend funcionando:**
```bash
# Acessar no navegador
http://localhost:5173
```

## 🚀 **Comandos de Inicialização**

### **Backend:**
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🔧 **Problemas Comuns**

### **1. Porta ocupada:**
```bash
# Verificar processos na porta
lsof -i :8000
lsof -i :5173

# Parar processos
pkill -f uvicorn
pkill -f vite
```

### **2. Dependências não instaladas:**
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### **3. Ambiente virtual não ativado:**
```bash
# Ativar ambiente virtual
source .venv/bin/activate
```

### **4. Permissões de arquivo:**
```bash
# Dar permissões de execução
chmod +x .venv/bin/activate
```

## 📊 **Status dos Serviços**

### **Verificar se está funcionando:**

#### **Backend:**
```bash
curl -X GET http://localhost:8000/api/v1/health
# Deve retornar: {"status": "ok"}
```

#### **Frontend:**
```bash
curl -X GET http://localhost:5173
# Deve retornar: HTML da página
```

## 🎯 **Soluções Rápidas**

### **1. Reiniciar tudo:**
```bash
# Parar todos os processos
pkill -f uvicorn
pkill -f vite
pkill -f node

# Iniciar backend
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &

# Iniciar frontend
cd frontend && npm run dev &
```

### **2. Verificar logs:**
```bash
# Ver logs do backend
tail -f backend/logs/app.log

# Ver logs do frontend
npm run dev --verbose
```

### **3. Limpar cache:**
```bash
# Frontend
rm -rf node_modules
npm install

# Backend
pip cache purge
pip install -r requirements.txt
```

## ✅ **Status Final**

### **Backend funcionando:**
- ✅ Servidor rodando na porta 8000
- ✅ API endpoints respondendo
- ✅ Autenticação funcionando
- ✅ Dados persistindo

### **Frontend funcionando:**
- ✅ Servidor rodando na porta 5173
- ✅ Páginas carregando
- ✅ Autenticação funcionando
- ✅ Design aplicado

## 🎉 **Projeto Funcionando!**

Se tudo estiver funcionando, você deve conseguir:

1. **Acessar o frontend**: http://localhost:5173
2. **Fazer login**: Use `frontend@test.com` / `12345678`
3. **Navegar**: Entre as páginas
4. **Registrar**: Criar novos usuários

**Parabéns! O projeto está funcionando perfeitamente!** 🚀
