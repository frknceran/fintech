import { useQueries } from "@tanstack/react-query";
import { Card } from "@/components/ui";
import { Spinner } from "@/components/ui/spinner/Spinner";

import {
  fetchSummaryData,
  fetchWorkingCapitalData,
  fetchTransactions,
  fetchWalletCards,
  fetchTransfers,
} from "@/services/dashboardService";

import type { SummaryData } from "@/types/dashboard";

import { Chart } from "@/components/charts/chart/Chart";
import { Transactions } from "@/components/charts/transaction/Transactions";
import { Wallet } from "@/components/charts/wallet/Wallet";
import { Transfers } from "@/components/charts/transfer";
import { dashboardQueryKeys } from "@/lib/queryKeys";

const Dashboard = () => {
  const [
    summaryQuery,
    chartQuery,
    transactionsQuery,
    walletsQuery,
    transfersQuery,
  ] = useQueries({
    queries: [
      { queryKey: dashboardQueryKeys.summary(), queryFn: fetchSummaryData },
      {
        queryKey: dashboardQueryKeys.workingCapital(),
        queryFn: fetchWorkingCapitalData,
      },
      {
        queryKey: dashboardQueryKeys.transactions(),
        queryFn: fetchTransactions,
      },
      { queryKey: dashboardQueryKeys.wallets(), queryFn: fetchWalletCards },
      { queryKey: dashboardQueryKeys.transfers(), queryFn: fetchTransfers },
    ],
  });

  const isPending =
    summaryQuery.isPending ||
    chartQuery.isPending ||
    transactionsQuery.isPending ||
    walletsQuery.isPending ||
    transfersQuery.isPending;

  const hasError =
    summaryQuery.isError ||
    chartQuery.isError ||
    transactionsQuery.isError ||
    walletsQuery.isError ||
    transfersQuery.isError;

  const refetchAll = () => {
    summaryQuery.refetch();
    chartQuery.refetch();
    transactionsQuery.refetch();
    walletsQuery.refetch();
    transfersQuery.refetch();
  };

  const summary: SummaryData | null = summaryQuery.data ?? null;
  const chartData =
    chartQuery.data?.data.map((d) => ({
      date: d.month,
      income: d.income,
      expenses: d.expense,
    })) ?? [];
  const transactions = transactionsQuery.data?.transactions ?? [];
  const wallets = walletsQuery.data?.cards ?? [];
  const transfers = transfersQuery.data?.transfers ?? [];

  if (hasError) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-lg text-[#78778B]">
          An error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={refetchAll}
          className="rounded-lg bg-[#C8EE44] px-4 py-2 text-sm font-semibold text-[#1B212D] transition hover:opacity-90"
        >
          Try again
        </button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-[200px] items-center justify-center p-4 text-lg text-[#78778B]">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="min-w-0 flex-1 flex flex-col gap-4 lg:w-3/4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            <Card
              title="Total Balance"
              amount={summary ? summary.totalBalance.amount : 0}
              currency={summary ? summary.totalBalance.currency : ""}
            />
            <Card
              title="Total Spendings"
              amount={summary ? summary.totalExpense.amount : 0}
              currency={summary ? summary.totalExpense.currency : ""}
            />
            <Card
              title="Total Savings"
              amount={summary ? summary.totalSavings.amount : 0}
              currency={summary ? summary.totalSavings.currency : ""}
            />
          </div>
          <div className="min-w-0">
            <Chart data={chartData} />
          </div>
          <div className="min-w-0">
            <Transactions data={transactions} />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-1/4 lg:min-w-[280px]">
          <Wallet data={wallets} />
          <Transfers data={transfers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
