import { Wrench } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F5F5] text-[#929EAE] sm:mb-8 sm:h-24 sm:w-24">
          <Wrench className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.5} />
        </div>
        <h1 className="mb-3 text-2xl font-semibold text-[#1B212D] sm:text-3xl">
          Bakımdayız
        </h1>
        <p className="mb-2 text-base text-[#78778B] sm:text-lg">
          Sistemimiz şu an güncelleniyor.
        </p>
        <p className="text-sm text-[#929EAE] sm:text-base">
          Kısa süre içinde bu sayfayı tekrar ziyaret edebilirsiniz. Anlayışınız
          için teşekkür ederiz.
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
