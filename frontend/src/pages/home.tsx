import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function HomeView() {
  const { t } = useTranslation()
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Grupo Pongaiense de Combate ao Câncer
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Apoiando pessoas e famílias em sua jornada contra o câncer com cuidado, 
            informação e comunidade.
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg text-foreground">
                Bem-vindo de volta, {user?.name}!
              </p>
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Acessar Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-x-4">
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Fazer Login
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Cadastrar-se
              </Button>
            </div>
          )}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card rounded-lg shadow-md border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Apoio Emocional</h3>
            <p className="text-muted-foreground">
              Conectamos pessoas que enfrentam desafios similares para apoio mútuo.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-lg shadow-md border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Informação Confiável</h3>
            <p className="text-muted-foreground">
              Acesso a informações atualizadas e confiáveis sobre tratamentos e cuidados.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-lg shadow-md border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Comunidade</h3>
            <p className="text-muted-foreground">
              Faça parte de uma comunidade unida na luta contra o câncer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { HomeView }
