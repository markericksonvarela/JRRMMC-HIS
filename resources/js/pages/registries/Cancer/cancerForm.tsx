import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import CF1RiskFactor from './partials/CF1RiskFactor'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Cancer Registry',
    href: '/cancer',
  },
  {
    title: 'Form 1',
    href: '/cancer/cancer-form',
  },
]

export default function CancerForm() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cancer Registry" />

      <div className="flex w-full flex-1 flex-col gap-6 p-4">
        <CF1RiskFactor />
      </div>
    </AppLayout>
  )
}
