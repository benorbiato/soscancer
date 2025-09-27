import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button.jsx'
import { useNavigate } from 'react-router-dom'
import { about } from '@/common/locales'

export function CallToAction() {
  const { t } = useTranslation(about)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="text-center bg-primary/5 p-12 rounded-lg border">
      <h2 className="text-3xl font-bold text-foreground mb-4">{t('joinOurStory')}</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        {t('joinOurStoryText')}
      </p>
      <div className="space-x-4">
        <Button
          onClick={handleGetStarted}
          size="lg"
          variant="default"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isAuthenticated ? 'Acessar Dashboard' : 'Fazer Login'}
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
    </div>
  )
}
