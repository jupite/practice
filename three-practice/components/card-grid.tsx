'use client'

import Link from 'next/link'
import { CardItem } from '@/config/menus/cards-menu'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Info, Box } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface CardGridProps {
  cards: CardItem[]
  className?: string
}

// 图标映射表
const iconComponents: Record<string, LucideIcon> = {
  LayoutDashboard,
  Info,
  Box,
}

export default function CardGrid({ cards, className }: CardGridProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4', className)}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

interface CardProps {
  card: CardItem
}

function Card({ card }: CardProps) {
  const Icon = card.icon ? iconComponents[card.icon] : null

  return (
    <Link
      href={card.href}
      className={cn(
        'group relative flex flex-col p-6 rounded-xl border border-border bg-surface',
        'hover:shadow-lg hover:border-primary/50 transition-all duration-200',
        'cursor-pointer'
      )}
    >
      {/* 图标 */}
      {Icon && (
        <div
          className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center mb-4',
            'text-white shadow-sm',
            card.color || 'bg-primary'
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      )}

      {/* 标题 */}
      <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-primary transition-colors">
        {card.title}
      </h3>

      {/* 描述 */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {card.description}
      </p>

      {/* 悬停箭头 */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  )
}
