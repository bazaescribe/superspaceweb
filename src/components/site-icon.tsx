import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, ArrowDown01Icon, Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

const icons = { arrow: ArrowUpRight01Icon, chevron: ArrowDown01Icon, menu: Menu01Icon, close: Cancel01Icon };

export function SiteIcon({ name }: { name: keyof typeof icons }) {
  return (
    <HugeiconsIcon
      icon={icons[name]}
      size={16}
      strokeWidth={1.5}
      className="site-icon"
      aria-hidden="true"
      focusable="false"
    />
  );
}
