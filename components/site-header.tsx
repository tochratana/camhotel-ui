import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="sticky top-0 z-40 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
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
              <p className="truncate text-xs text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
        </div>
      </div>
    </header>
  );
}
