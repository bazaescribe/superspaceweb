"use client";

import { bookingUrl } from "@/lib/site";
import { SiteIcon } from "@/components/site-icon";
import { track } from "@/lib/analytics";

export function BookingLink({
  inverse = false,
  className = "",
  placement = "unspecified",
}: {
  inverse?: boolean;
  className?: string;
  placement?: string;
}) {
  const external = bookingUrl.startsWith("http");
  return (
    <a
      className={`button ${inverse ? "button--inverse" : ""} ${className}`}
      href={bookingUrl}
      onClick={() => track({ name: "cta_clicked", cta: "talk_to_us", destination: bookingUrl, placement })}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      Talk to us <SiteIcon name="arrow" />
    </a>
  );
}
