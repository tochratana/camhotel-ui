"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CirclePlusIcon, MailIcon } from "lucide-react"

export function NavMain({
  items,
  quickAction,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
  quickAction?: {
    title: string
    url: string
  }
}) {
  const pathname = usePathname()

  const getMatchScore = (url: string) => {
    if (pathname === url) return url.length + 1
    if (pathname.startsWith(`${url}/`)) return url.length
    return -1
  }

  const bestScore = items.reduce((score, item) => {
    const next = getMatchScore(item.url)
    return next > score ? next : score
  }, -1)

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {quickAction ? (
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                asChild
                tooltip={quickAction.title}
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              >
                <Link href={quickAction.url}>
                  <CirclePlusIcon />
                  <span>{quickAction.title}</span>
                </Link>
              </SidebarMenuButton>
              <Button
                size="icon"
                className="size-8 group-data-[collapsible=icon]:opacity-0"
                variant="outline"
              >
                <MailIcon />
                <span className="sr-only">Inbox</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : null}
        <SidebarMenu>
          {items.map((item) => {
            const matchScore = getMatchScore(item.url)
            const isActive = matchScore > -1 && matchScore === bestScore

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
