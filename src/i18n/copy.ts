import { useLocale } from "next-intl";
import { translate } from "./translate";
/** Shared source-copy catalog, usable in synchronous server and client components. */
export function useCopy() {
  const locale = useLocale();
  return <T>(value: T): T => translate(value, locale);
}
