import { Cards } from './cards'
import { DashboardCard } from '../types'

interface CardsListProps {
  cards: DashboardCard[]
}

function CardsList({ cards }: CardsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Cards key={card.id} card={card} />
      ))}
    </div>
  )
}

export { CardsList }
