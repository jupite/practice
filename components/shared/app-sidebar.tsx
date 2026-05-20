"use client";

import * as React from "react";

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
} from "@/components/ui/sidebar";
import { GalleryVerticalEndIcon } from "lucide-react";

// 菜单项类型
export interface NavSubItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export interface NavItem {
  title: string;
  url: string;
  items?: NavSubItem[];
}

export interface SidebarData {
  navMain: NavItem[];
  logo?: {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    href?: string;
  };
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menu?: SidebarData;
  homeHref?: string;
}

// 默认菜单数据
const defaultMenu: SidebarData = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
      ],
    },
  ],
  logo: {
    title: "Documentation",
    subtitle: "v1.0.0",
  },
};

export function AppSidebar({ menu = defaultMenu, ...props }: AppSidebarProps) {
  const logoIcon = menu.logo?.icon ?? (
    <GalleryVerticalEndIcon className="size-4" />
  );

  // 使用菜单中配置的 href，或传入的 homeHref，默认为首页
  const logoHref = menu.logo?.href || "/";

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                {/* 图标点击返回首页 */}
                <a 
                  href={logoHref}
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                >
                  {logoIcon}
                </a>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">
                    {menu.logo?.title ?? "Documentation"}
                  </span>
                  {menu.logo?.subtitle && (
                    <span className="">{menu.logo.subtitle}</span>
                  )}
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menu.navMain.map((item) => (
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
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                        >
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
  );
}
