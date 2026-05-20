import SidebarLayout from "@/components/layout/sidebar-layout"
import { echartsMenu } from "@/app/echarts/menu"

export default function ReactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarLayout 
      menu={echartsMenu} 
    >
      {children}
    </SidebarLayout>
  )
}
