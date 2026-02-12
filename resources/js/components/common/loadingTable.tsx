import { Card } from '@/components/ui'
import { TableSkeleton } from '@/components/skeleton-table'

interface LoadingTableProps {
  rows?: number
  columns?: number
}

export function LoadingTable({ rows = 10, columns = 8 }: LoadingTableProps) {
  return (
    <Card className="border border-sidebar-border/70">
      <TableSkeleton rows={rows} columns={columns} />
    </Card>
  )
}
