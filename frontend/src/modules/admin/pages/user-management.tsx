import React, { useState } from 'react'
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data - em produção viria da API
const mockUsers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    role: 'volunteer',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@example.com',
    role: 'patient',
    status: 'inactive',
    lastLogin: '2024-01-10T09:20:00Z',
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    email: 'ana@example.com',
    role: 'sponsor',
    status: 'active',
    lastLogin: '2024-01-15T14:15:00Z',
    createdAt: '2024-01-04T00:00:00Z'
  },
  {
    id: 5,
    name: 'Carlos Ferreira',
    email: 'carlos@example.com',
    role: 'supporter',
    status: 'active',
    lastLogin: '2024-01-13T11:30:00Z',
    createdAt: '2024-01-05T00:00:00Z'
  }
]

const roleLabels = {
  admin: 'Administrador',
  volunteer: 'Voluntário',
  patient: 'Paciente',
  sponsor: 'Patrocinador',
  supporter: 'Apoiador',
  user: 'Usuário'
}

const statusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  pending: 'Pendente',
  suspended: 'Suspenso'
}

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  suspended: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleEditUser = (userId: number) => {
    console.log('Edit user:', userId)
    // Implementar modal de edição
  }

  const handleDeleteUser = (userId: number) => {
    console.log('Delete user:', userId)
    // Implementar confirmação e exclusão
  }

  const handleToggleStatus = (userId: number, currentStatus: string) => {
    console.log('Toggle status for user:', userId, 'from', currentStatus)
    // Implementar toggle de status
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie usuários, permissões e acessos ao sistema
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde o mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter(u => u.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockUsers.filter(u => u.status === 'active').length / mockUsers.length) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voluntários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter(u => u.role === 'volunteer').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Voluntários cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter(u => u.role === 'patient').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Pacientes cadastrados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar usuários específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="all">Todos os cargos</option>
              <option value="admin">Administrador</option>
              <option value="volunteer">Voluntário</option>
              <option value="patient">Paciente</option>
              <option value="sponsor">Patrocinador</option>
              <option value="supporter">Apoiador</option>
              <option value="user">Usuário</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="pending">Pendente</option>
              <option value="suspended">Suspenso</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Lista de todos os usuários cadastrados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {roleLabels[user.role as keyof typeof roleLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                      {statusLabels[user.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.lastLogin).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                          {user.status === 'active' ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
