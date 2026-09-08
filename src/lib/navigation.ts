/** Match complete path segments so /platform-other never activates Platform. */
export function navigationState(pathname: string, href: string): "page" | "location" | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === href) return "page";
  if (path.startsWith(`${href}/`) || (href === "/company" && path === "/contact")) return "location";
  return undefined;
}
