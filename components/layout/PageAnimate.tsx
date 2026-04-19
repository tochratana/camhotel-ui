"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageAnimate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-forwards w-full h-full flex flex-col flex-1"
    >
      {children}
    </div>
  );
}
