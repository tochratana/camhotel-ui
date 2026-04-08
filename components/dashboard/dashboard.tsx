"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import type {
  DashboardChartPoint,
  DashboardMetricCard,
  DashboardShellConfig,
  DashboardTableRow,
} from "@/components/dashboard/types";
import { SectionCards } from "@/components/section-cards";

type DashboardShellProps = {
  config: DashboardShellConfig;
  data: DashboardTableRow[];
  cards: DashboardMetricCard[];
  chartData: DashboardChartPoint[];
  chartTitle?: string;
  chartDescription?: string;
};

export default function DashboardShell({
  config,
  data,
  cards,
  chartData,
  chartTitle,
  chartDescription,
}: DashboardShellProps) {
  return (
    <DashboardFrame config={config}>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-6 h-full py-6 pb-20">
          <SectionCards cards={cards} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive
              data={chartData}
              title={chartTitle}
              description={chartDescription}
            />
          </div>
          <div className="px-4 lg:px-6">
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </DashboardFrame>
  );
}
