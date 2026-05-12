import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`border-b border-gray-200 px-4 py-3 ${className}`} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ children, className = '', ...props }: CardProps) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  )
}

function CardContent({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`px-4 py-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardContent }
