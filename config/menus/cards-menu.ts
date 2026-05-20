export interface CardItem {
  id: string
  title: string
  description: string
  href: string
  icon?: string
  color?: string
}

export const cardConfig: CardItem[] = [
  {
    id: 'threejs',
    title: 'Three.js',
    description: '3D 图形展示和交互体验',
    href: '/threejs',
    icon: 'Box',
    color: 'bg-purple-500',
  },
  {
    id: 'react',
    title: 'React',
    description: 'React 框架',
    href: '/react',
    icon: 'Box',
    color: 'bg-yellow-500',
  },
  {
    id: 'echarts',
    title: 'ECharts',
    description: 'ECharts 框架',
    href: '/echarts',
    icon: 'Box',
    color: 'bg-yellow-500',
  },
  {
    id: 'dashboard',
    title: '仪表盘',
    description: '查看系统整体数据概览和关键指标',
    href: '/dashboard',
    icon: 'LayoutDashboard',
    color: 'bg-blue-500',
  },
  {
    id: 'about',
    title: '关于我们',
    description: '了解我们的团队和产品信息',
    href: '/about',
    icon: 'Info',
    color: 'bg-green-500',
  },
]
