import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { Cards } from '@/modules/dashboard/components/cards'

function Dashboard() {
  const { t } = useTranslation(dashboard)

  const cards = [
    { title: t('cards.card1.title'), subtitle: t('cards.card1.subtitle'), url: '/feature1' },
    { title: t('cards.card2.title'), subtitle: t('cards.card2.subtitle'), url: '/feature2' },
    { title: t('cards.card3.title'), subtitle: t('cards.card3.subtitle'), url: '/feature3' },
    { title: t('cards.card4.title'), subtitle: t('cards.card4.subtitle'), url: '/feature4' },
    { title: t('cards.card5.title'), subtitle: t('cards.card5.subtitle'), url: '/feature5' },
    { title: t('cards.card6.title'), subtitle: t('cards.card6.subtitle'), url: '/feature6' },
  ]

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {cards.map((card, index) => (
          <Cards key={index} title={card.title} subtitle={card.subtitle} url={card.url} />
        ))}
      </div>
    </div>
  )
}

export { Dashboard }
