import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

type CardsProps = {
  title: string
  subtitle: string
  url: string
}

function Cards({ title, subtitle, url }: CardsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Aqui pode entrar algum conteúdo adicional se precisar */}
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={url}>Acessar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { Cards }
