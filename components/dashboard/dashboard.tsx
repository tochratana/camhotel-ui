"use client";

import { z } from "zod";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable, schema } from "@/components/data-table";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { DashboardShellConfig } from "@/components/dashboard/types";
import { SectionCards } from "@/components/section-cards";

type DashboardShellProps = {
  config: DashboardShellConfig;
  data: z.infer<typeof schema>[];
};

export default function DashboardShell({ config, data }: DashboardShellProps) {
  return (
    <DashboardFrame config={config}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </DashboardFrame>
  );
}
