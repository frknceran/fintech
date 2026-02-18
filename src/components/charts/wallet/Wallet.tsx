import { MoreVertical } from "lucide-react";
import type { WalletCardItem } from "@/types/dashboard";
import chip from "@/assets/chip.png";
import wifi from "@/assets/wifi.png";

function formatExpiry(month: number, year: number) {
  const m = String(month).padStart(2, "0");
  const y = String(year).slice(-2);
  return `${m}/${y}`;
}

function ChipIcon() {
  return (
    <div className="h-8 w-10 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 shadow-inner">
      <img src={chip} alt="chip" className="w-full h-full" />
    </div>
  );
}

function ContactlessIcon() {
  return (
    <div>
      <img src={wifi} alt="wifi" className="w-full h-full" />
    </div>
  );
}

type WalletProps = { data?: WalletCardItem[] };

export const Wallet = ({ data = [] }: WalletProps) => {
  const cards = Array.isArray(data) ? data : [];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1B212D]">Wallet</h2>
        <button
          type="button"
          className="rounded p-1 text-[#929EAE] hover:bg-[#F5F5F5] hover:text-[#1B212D]"
          aria-label="Wallet options"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative"
        style={{
          minHeight: cards.length === 0 ? 120 : 220 + (cards.length - 1) * 220,
        }}
      >
        {cards.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#E5E7EB] bg-[#FAFAFA] py-12 text-center text-[#929EAE]">
            Henüz kart eklenmemiş.
          </div>
        ) : (
          cards.map((card, index) => (
            <div
              key={card.id}
              className={`absolute left-0 right-0 rounded-2xl p-8 shadow-lg ${index > 0 ? "text-[#1B212D]" : "text-white"}`}
              style={{
                backgroundColor:
                  index === 0
                    ? card.color || "#1F2937"
                    : "rgba(255, 255, 255, 0.50)",
                backdropFilter: index > 0 ? "blur(8px)" : undefined,
                border: index > 0 ? "1px solid rgba(0, 0, 0, 0.08)" : undefined,
                top: `${index * 160}px`,
                zIndex: index + 1,
                ...(index > 0 && {
                  width: "92%",
                  left: "4%",
                  right: "4%",
                }),
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-base font-normal opacity-90">
                  {card.bank}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <ChipIcon />
                <ContactlessIcon />
              </div>
              <p className="mt-6 font-mono text-lg font-semibold tracking-wider">
                {card.cardNumber}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs opacity-80">Son kullanma</p>
                  <p className="font-mono text-sm">
                    {formatExpiry(card.expiryMonth, card.expiryYear)}
                  </p>
                </div>
                <span className="text-right font-semibold tracking-wider opacity-95">
                  {card.network.toUpperCase()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
