import api from "@/lib/api";
import type {
  SummaryData,
  WorkingCapitalResponse,
  TransactionsResponse,
  WalletResponse,
  TransfersResponse,
} from "@/types/dashboard";

export const fetchSummaryData = async (): Promise<SummaryData> => {
  const { data } = await api.get<{ data: SummaryData }>("/financial/summary");
  return data.data;
};

export const fetchWorkingCapitalData =
  async (): Promise<WorkingCapitalResponse> => {
    const { data } = await api.get<{ data: WorkingCapitalResponse }>(
      "/financial/working-capital"
    );
    return data.data;
  };

export const fetchTransactions = async (): Promise<TransactionsResponse> => {
  const { data } = await api.get<{ data: TransactionsResponse }>(
    "/financial/transactions/recent"
  );
  return data.data;
};

export const fetchWalletCards = async (): Promise<WalletResponse> => {
  const { data } = await api.get<{ data: WalletResponse }>("/financial/wallet");
  return data.data;
};

export const fetchTransfers = async (): Promise<TransfersResponse> => {
  const { data } = await api.get<{ data: TransfersResponse }>(
    "/financial/transfers/scheduled"
  );
  return data.data;
};
