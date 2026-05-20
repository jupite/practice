import CardGrid from "@/components/shared/card-grid"
import { cardConfig } from "@/config/menus/cards-menu"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">功能模块</h1>
        <p className="text-text-secondary">
          选择下方的功能模块开始使用系统
        </p>
      </div>
      
      <CardGrid cards={cardConfig} />
    </div>
  )
}
