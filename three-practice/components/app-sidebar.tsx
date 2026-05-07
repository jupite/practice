"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon } from "lucide-react"

// 菜单项类型
export interface NavSubItem {
  title: string
  url: string
  isActive?: boolean
}

export interface NavItem {
  title: string
  url: string
  items?: NavSubItem[]
}

export interface SidebarData {
  navMain: NavItem[]
  logo?: {
    title: string
    subtitle?: string
    icon?: React.ReactNode
  }
}

// 默认数据
const defaultData: SidebarData = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
  ],
  logo: {
    title: "Documentation",
    subtitle: "v1.0.0",
  },
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data?: SidebarData
}

export function AppSidebar({ data = defaultData, ...props }: AppSidebarProps) {
  const logoIcon = data.logo?.icon ?? <GalleryVerticalEndIcon className="size-4" />

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {logoIcon}
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{data.logo?.title ?? "Documentation"}</span>
                  {data.logo?.subtitle && (
                    <span className="">{data.logo.subtitle}</span>
                  )}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
