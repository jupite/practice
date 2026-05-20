"use client"

import { AppSidebar, SidebarData, NavSubItem, NavItem } from "@/components/shared/app-sidebar"
import { PageHeader } from "@/components/shared/page-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

// 面包屑项类型
export interface BreadcrumbConfig {
  title: string
  href?: string
  isCurrent?: boolean
}

interface SidebarLayoutProps {
  menu: SidebarData
  homePath?: string
  homeTitle?: string
  children: React.ReactNode
}

// 路由映射项，包含层级信息
interface RouteInfo {
  title: string
  parentTitle?: string
  parentHref?: string
}

// 从菜单数据中提取所有路由映射（包含层级信息）
const extractRouteMap = (menu: SidebarData): Map<string, RouteInfo> => {
  const routeMap = new Map<string, RouteInfo>()
  
  menu.navMain.forEach((item: NavItem) => {
    // 添加主菜单项（一级标题）
    if (item.url && item.url !== "#") {
      routeMap.set(item.url, { title: item.title })
    }
    
    // 添加子菜单项（二级标题），并记录父级信息
    item.items?.forEach((subItem: NavSubItem) => {
      routeMap.set(subItem.url, {
        title: subItem.title,
        parentTitle: item.url !== "#" ? undefined : item.title,
        parentHref: item.url !== "#" ? item.url : undefined,
      })
    })
  })
  
  return routeMap
}

// 生成带高亮状态的菜单数据
const generateActiveMenu = (menu: SidebarData, pathname: string): SidebarData => {
  return {
    ...menu,
    navMain: menu.navMain.map((item: NavItem) => ({
      ...item,
      items: item.items?.map((subItem: NavSubItem) => ({
        ...subItem,
        isActive: pathname === subItem.url,
      })),
    })),
  }
}

// 生成多级面包屑
const generateBreadcrumbs = (
  pathname: string,
  menu: SidebarData,
): BreadcrumbConfig[] => {
  const routeMap = extractRouteMap(menu)
  const breadcrumbs: BreadcrumbConfig[] = []
  const homePath: string = "/"
  // 查找当前页面信息
  const currentRoute = routeMap.get(pathname)
  
  if (currentRoute) {
    // 如果有父级，先添加父级
    if (currentRoute.parentTitle) {
      breadcrumbs.push({
        title: currentRoute.parentTitle,
        href: currentRoute.parentHref,
      })
    }
    
    // 添加当前页
    breadcrumbs.push({ title: currentRoute.title, isCurrent: true })
  } else {
    // 未找到时，根据路径层级生成
    const pathParts = pathname.replace(homePath, "").split("/").filter(Boolean)
    
    pathParts.forEach((part, index) => {
      const isLast = index === pathParts.length - 1
      const href = homePath + "/" + pathParts.slice(0, index + 1).join("/")
      
      breadcrumbs.push({
        title: part,
        href: isLast ? undefined : href,
        isCurrent: isLast,
      })
    })
  }
  
  return breadcrumbs
}

export default function SidebarLayout({ 
  menu, 
  children 
}: SidebarLayoutProps) {
  const pathname = usePathname()
  
  // 生成带高亮状态的菜单
  const activeMenu = generateActiveMenu(menu, pathname)
  
  // 生成面包屑
  const breadcrumbs = generateBreadcrumbs(pathname, menu)

  return (
    <SidebarProvider>
      <AppSidebar menu={activeMenu} />
      <SidebarInset>
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
