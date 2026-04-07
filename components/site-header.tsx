import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import ThemeToggle from "@/components/theme/ThemeToggle"

export function SiteHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-3 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-1 lg:gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate text-base font-semibold">{title}</h1>
            {description ? (
              <p className="truncate text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
