/** Summary API */
export interface SummaryChange {
  percentage: number;
  trend: "up" | "down";
}

export interface SummaryMetric {
  amount: number;
  currency: string;
  change?: SummaryChange;
}

export interface SummaryData {
  totalBalance: SummaryMetric;
  totalExpense: SummaryMetric;
  totalSavings: SummaryMetric;
  lastUpdated?: string;
}

/** Working capital API */
export interface WorkingCapitalDataPoint {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export interface WorkingCapitalSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface WorkingCapitalResponse {
  period: string;
  currency: string;
  data: WorkingCapitalDataPoint[];
  summary: WorkingCapitalSummary;
}

/** Transactions API */
export interface TransactionItem {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
}

export interface TransactionsSummary {
  totalIncome: number;
  totalExpense: number;
  count: number;
}

export interface TransactionsResponse {
  transactions: TransactionItem[];
  summary: TransactionsSummary;
}

/** Wallet API */
export interface WalletCardItem {
  id: string;
  name: string;
  type: string;
  cardNumber: string;
  bank: string;
  network: string;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
}

export interface WalletResponse {
  cards: WalletCardItem[];
}

/** Transfers API */
export interface TransferItem {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
}

export interface TransfersSummary {
  totalScheduledAmount: number;
  count: number;
}

export interface TransfersResponse {
  transfers: TransferItem[];
  summary: TransfersSummary;
}
