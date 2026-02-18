export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardQueryKeys.all, "summary"] as const,
  workingCapital: () => [...dashboardQueryKeys.all, "workingCapital"] as const,
  transactions: () => [...dashboardQueryKeys.all, "transactions"] as const,
  wallets: () => [...dashboardQueryKeys.all, "wallets"] as const,
  transfers: () => [...dashboardQueryKeys.all, "transfers"] as const,
};
