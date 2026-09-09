"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Deliberately exclude query strings, which may contain campaign data or PII.
    track({ name: "page_view", path: pathname });
  }, [pathname]);

  return null;
}

export function Analytics() {
  return <PageViewTracker />;
}
