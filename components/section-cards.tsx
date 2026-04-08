"use client"

import type { DashboardMetricCard } from "@/components/dashboard/types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

type SectionCardsProps = {
  cards: DashboardMetricCard[]
}

export function SectionCards({ cards }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((card) => {
        const TrendIcon = card.trend === "down" ? TrendingDownIcon : TrendingUpIcon
        const trendText =
          card.trend === "down"
            ? "Lower than previous snapshot"
            : card.trend === "flat"
              ? "Stable compared with previous snapshot"
              : "Higher than previous snapshot"

        return (
          <Card className="@container/card" key={card.title}>
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon />
                  {card.changeLabel}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {trendText} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{card.context}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
