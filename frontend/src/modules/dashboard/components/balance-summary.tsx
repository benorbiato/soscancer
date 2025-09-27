import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react'

interface BalanceSummaryProps {
  data: {
    totalRaised: number
    monthlyGoal: number
    donorsCount: number
    growthRate: number
  }
}

function BalanceSummary({ data }: BalanceSummaryProps) {
  const { t } = useTranslation(dashboard)

  const goalPercentage = (data.totalRaised / data.monthlyGoal) * 100
  const isPositiveGrowth = data.growthRate >= 0

  return (
    <Card className="mb-8 dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {t('balance.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Arrecadado */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('balance.totalRaised')}</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              R$ {data.totalRaised.toLocaleString('pt-BR')}
            </p>
          </div>

          {/* Meta Mensal */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('balance.monthlyGoal')}</p>
            <p className="text-2xl font-bold text-foreground">
              R$ {data.monthlyGoal.toLocaleString('pt-BR')}
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-green-500 dark:bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(goalPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {goalPercentage.toFixed(1)}% {t('balance.ofGoal')}
            </p>
          </div>

          {/* Doadores */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('balance.donors')}</p>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <p className="text-2xl font-bold text-foreground">
                {data.donorsCount.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Crescimento */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('balance.growth')}</p>
            <div className="flex items-center gap-2">
              {isPositiveGrowth ? (
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
              <Badge variant={isPositiveGrowth ? 'default' : 'destructive'}>
                {isPositiveGrowth ? '+' : ''}
                {data.growthRate.toFixed(1)}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { BalanceSummary }
