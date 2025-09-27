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
    <Card className="w-full group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-card dark:to-card hover:from-brand-100 hover:to-brand-200 dark:hover:from-card dark:hover:to-card">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
            {title.charAt(0)}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors duration-300">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {subtitle}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-2 bg-gradient-to-r from-brand-200 to-brand-300 dark:from-brand-800 dark:to-brand-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
        >
          <Link to={url} className="flex items-center gap-2">
            <span>Acessar</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { Cards }
