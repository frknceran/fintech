import type { TransactionItem } from "@/types/dashboard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CURRENCY_SYMBOLS: Record<string, string> = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
};
const getCurrencySymbol = (code: string) =>
  CURRENCY_SYMBOLS[code?.toUpperCase()] ?? code ?? "₺";

function formatTransactionDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

type TransactionsProps = { data?: TransactionItem[] };

export const Transactions = ({ data = [] }: TransactionsProps) => {
  const list = (Array.isArray(data) ? data : []).slice(0, 3);

  return (
    <div className="w-full rounded-lg border border-[#F5F5F5] bg-white p-4">
      <div className="flex flex-row gap-2 justify-between items-start">
        <h2 className="mb-4 text-lg font-semibold text-[#1B212D]">
          Recent Transactions
        </h2>
        <Link
          to="/transactions"
          className="border-none flex items-center text-[#29A073]"
        >
          View All
          <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="text-[#929EAE]">
              <th className="pb-3 font-medium">NAME/BUSINESS</th>
              <th className="pb-3 text-center font-medium">TYPE</th>
              <th className="pb-3 text-center font-medium">AMOUNT</th>
              <th className="pb-3 text-center font-medium">DATE</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-[#929EAE]">
                  No transactions yet.
                </td>
              </tr>
            ) : (
              list.map((row) => {
                const isIncome = row.amount >= 0;
                const symbol = getCurrencySymbol(row.currency);
                return (
                  <tr
                    key={row.id}
                    className="border-b border-[#F5F5F5] last:border-0"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={row.image}
                          alt=""
                          className="h-8 w-8 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                        <div>
                          <div className="font-medium text-[#1B212D]">
                            {row.name}
                          </div>
                          <div className="text-xs text-[#929EAE]">
                            {row.business}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="inline-block rounded-full bg-[#F5F5F5] px-2 py-0.5 text-xs font-medium text-[#1B212D]">
                        {row.type}
                      </span>
                    </td>
                    <td
                      className={`text-center py-3 font-medium ${
                        isIncome ? "text-[#22C55E]" : "text-[#EF4444]"
                      }`}
                    >
                      {isIncome ? "" : "-"}
                      {Math.abs(row.amount).toLocaleString("tr-TR")} {symbol}
                    </td>
                    <td className="text-center py-3 text-[#1B212D]">
                      {formatTransactionDate(row.date)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
