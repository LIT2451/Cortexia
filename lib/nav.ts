// "/" matches only the home page; other links match ignoring one trailing slash.
export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  const path = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return path === href;
}
