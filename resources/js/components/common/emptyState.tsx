import { Card, CardContent } from '@/components/ui'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  actions?: ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  actions,
}: EmptyStateProps) {
  return (
    <Card className="p-12 text-center">
      <CardContent className="pt-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-6 text-muted-foreground">{description}</p>
        {actions && (
          <div className="flex items-center justify-center gap-3">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
