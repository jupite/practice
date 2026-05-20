import SidebarLayout from "@/components/layout/sidebar-layout"
import { threejsMenu } from "@/app/threejs/menu"

export default function ThreejsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarLayout 
      menu={threejsMenu} 
    >
      {children}
    </SidebarLayout>
  )
}
