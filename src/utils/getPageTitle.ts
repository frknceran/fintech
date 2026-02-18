import { menuItems } from "@/config/menu.config";

export const getPageTitle = (pathname: string) => {
  return (
    menuItems.find(
      (item) => pathname === item.path || pathname.startsWith(item.path + "/")
    )?.label ?? "Dashboard"
  );
};
