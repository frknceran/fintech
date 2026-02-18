import type { TransferItem } from "@/types/dashboard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function formatTransferDate(iso: string) {
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

type TransfersProps = { data?: TransferItem[] };

export const Transfers = ({ data = [] }: TransfersProps) => {
  const list = (Array.isArray(data) ? data : []).slice(0, 5);

  return (
    <div className="w-full rounded-lg bg-white p-4">
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-[#1B212D]">
          Scheduled Transfers
        </h2>
        <Link
          to="/invoices"
          className="border-none flex items-center text-[#29A073]"
        >
          View All
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {list.length === 0 ? (
          <p className="py-4 text-center text-sm text-[#929EAE]">
            No scheduled transfers.
          </p>
        ) : (
          list.map((item) => {
            const isOutgoing = item.amount < 0;
            const symbol = item.currency || "₺";
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 border-b border-[#F5F5F5] pb-3 last:border-0 last:pb-0"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#1B212D]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#929EAE]">
                      {formatTransferDate(item.date)}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p
                    className={`text-sm font-medium ${
                      isOutgoing ? "text-[#EF4444]" : "text-[#22C55E]"
                    }`}
                  >
                    {isOutgoing ? "" : "+"}
                    {item.amount.toLocaleString("tr-TR")} {symbol}
                  </p>
                  <span className="inline-block rounded bg-[#F5F5F5] px-2 py-0.5 text-xs text-[#1B212D]">
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
