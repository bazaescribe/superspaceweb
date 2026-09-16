"use client";

import { bookingUrl } from "@/lib/site";
import { SiteIcon } from "@/components/site-icon";
import Image from "next/image";
import { track } from "@/lib/analytics";

export function BookingLink({
  inverse = false,
  className = "",
  placement = "unspecified",
  label = "Talk to us",
  designIcon = false,
}: {
  inverse?: boolean;
  className?: string;
  placement?: string;
  label?: string;
  designIcon?: boolean;
}) {
  const external = bookingUrl.startsWith("http");
  return (
    <a
      className={`button ${inverse ? "button--inverse" : ""} ${className}`}
      href={bookingUrl}
      onClick={() => track({ name: "cta_clicked", cta: "talk_to_us", destination: bookingUrl, placement })}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {label}{" "}
      {designIcon ? (
        <span className="inline-flex size-4 items-center justify-center" aria-hidden="true">
          <Image src="/brand/cta-chevron.svg" alt="" width={6} height={10} />
        </span>
      ) : (
        <SiteIcon name="arrow" />
      )}
    </a>
  );
}
