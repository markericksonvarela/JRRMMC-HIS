import type { ReactNode } from 'react'
import { Button } from '@/components/ui'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'

interface RowActionsButtonProps {
  icon: ReactNode
  label: string
  onClick: () => void
}

export function RowActionsButton({
  icon,
  label,
  onClick,
}: RowActionsButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            aria-label={label}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
