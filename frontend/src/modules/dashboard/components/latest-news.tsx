import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Newspaper, Calendar, ExternalLink } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  category: 'update' | 'event' | 'achievement' | 'announcement'
  readMoreUrl?: string
}

interface LatestNewsProps {
  news: NewsItem[]
}

function LatestNews({ news }: LatestNewsProps) {
  const { t } = useTranslation(dashboard)

  const getCategoryInfo = (category: string) => {
    const categories = {
      update: { label: t('news.categories.update'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-300' },
      event: { label: t('news.categories.event'), color: 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300' },
      achievement: {
        label: t('news.categories.achievement'),
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300',
      },
      announcement: {
        label: t('news.categories.announcement'),
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/20 dark:text-purple-300',
      },
    }
    return categories[category as keyof typeof categories] || categories.update
  }

  if (news.length === 0) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            {t('news.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">{t('news.noNews')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8 dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          {t('news.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.slice(0, 3).map((item) => {
            const categoryInfo = getCategoryInfo(item.category)
            return (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">{item.title}</h3>
                  <Badge className={categoryInfo.color}>{categoryInfo.label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                  {item.readMoreUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={item.readMoreUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {t('news.readMore')}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            {t('news.viewAll')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { LatestNews }
