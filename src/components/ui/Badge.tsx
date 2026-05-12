import type { ReactNode } from 'react'

type BadgeVariant = 'New' | 'Contacted' | 'Booked' | 'Lost' | 'default'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const badgeStyles: Record<string, string> = {
  New: 'bg-blue-100 text-blue-800',
  Contacted: 'bg-yellow-100 text-yellow-800',
  Booked: 'bg-green-100 text-green-800',
  Lost: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800',
}

function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyles[variant] ?? badgeStyles.default} ${className}`}
    >
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeVariant }
