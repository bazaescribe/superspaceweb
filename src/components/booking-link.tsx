import { bookingUrl } from "@/lib/site";
import { SiteIcon } from "@/components/site-icon";

export function BookingLink({ inverse = false, className = "" }: { inverse?: boolean; className?: string }) {
  const external = bookingUrl.startsWith("http");
  return (
    <a
      className={`button ${inverse ? "button--inverse" : ""} ${className}`}
      href={bookingUrl}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      Talk to us <SiteIcon name="arrow" />
    </a>
  );
}
