import DashboardIcon from "@/assets/Dashboard.svg";
import TransactionsIcon from "@/assets/Transactions.svg";
import InvoicesIcon from "@/assets/Invoices.svg";
import WalletIcon from "@/assets/Wallet.svg";
import SettingsIcon from "@/assets/Settings.svg";
import { createSvgIcon } from "@/utils/createSvgIcon";

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: createSvgIcon(DashboardIcon),
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: createSvgIcon(TransactionsIcon),
  },
  { label: "Invoices", path: "/invoices", icon: createSvgIcon(InvoicesIcon) },
  { label: "My Wallets", path: "/wallets", icon: createSvgIcon(WalletIcon) },
  { label: "Settings", path: "/settings", icon: createSvgIcon(SettingsIcon) },
];
