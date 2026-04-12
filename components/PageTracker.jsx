'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.gtag?.("config", "G-1CQLF3S0NN", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
