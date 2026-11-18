import { getLocale } from "next-intl/server";
import { createPageMetadata as buildMetadata } from "@/lib/seo";
export async function createPageMetadata(input: Parameters<typeof buildMetadata>[0]) {
  return buildMetadata(input, await getLocale());
}
