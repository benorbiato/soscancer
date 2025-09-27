import { AuthenticatedHeader } from '@/components/layouts/authenticated-header'

export default function Agenda() {
  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus compromissos e eventos
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">
            Conteúdo da agenda será implementado aqui.
          </p>
        </div>
      </div>
    </div>
  )
}
