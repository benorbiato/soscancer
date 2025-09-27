import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { BreadcrumbItem } from '@/components/ui/breadcrumb.tsx'

export function useBreadcrumb() {
  const location = useLocation()

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    const pathname = location.pathname
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length === 0) {
      return []
    }

    // Para dashboard, mostrar apenas o breadcrumb simples
    if (segments[0] === 'dashboard' && segments.length === 1) {
      return [
        {
          label: 'Dashboard',
          isActive: true,
        }
      ]
    }

    const items: BreadcrumbItem[] = []
    let currentPath = ''

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === segments.length - 1

      // Mapear segmentos para labels legíveis
      const label = getSegmentLabel(segment)
      
      items.push({
        label,
        href: isLast ? undefined : currentPath,
        isActive: isLast,
      })
    })

    return items
  }, [location.pathname])

  return { breadcrumbItems }
}

function getSegmentLabel(segment: string): string {
  const labelMap: Record<string, string> = {
    'settings': 'Configurações',
    'agenda': 'Agenda',
    'patients': 'Pacientes',
    'volunteers': 'Voluntários',
    'reports': 'Relatórios',
    'profile': 'Perfil',
    'edit': 'Editar',
    'create': 'Criar',
    'view': 'Visualizar',
  }

  return labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
}
