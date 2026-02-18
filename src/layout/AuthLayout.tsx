import type { ReactNode } from "react";

interface AuthLayoutProps {
  logo: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  sideImage: string;
  sideImageAlt: string;
}

export const AuthLayout = ({
  logo,
  title,
  subtitle,
  children,
  sideImage,
  sideImageAlt,
}: AuthLayoutProps) => (
  <div className="min-h-screen flex flex-col md:flex-row">
    <div className="w-full md:w-1/2 flex flex-col items-center justify-start pt-8 sm:pt-10 md:pt-12 pb-10 px-4 sm:px-6 md:px-12">
      <div className="w-full max-w-md flex flex-col">
        <div className="self-start mb-28 md:mb-100 xl:mb-72">
          <img src={logo} alt="Fintech logo" className="h-7 sm:h-8 w-auto" />
        </div>
        <div className="flex flex-col gap-2 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1B212D]">
            {title}
          </h1>
          <p className="text-sm sm:text-base font-normal text-[#78778B]">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
    <div className="w-full md:w-1/2 min-h-[200px] md:min-h-0">
      <img
        src={sideImage}
        alt={sideImageAlt}
        className="hidden md:block w-full h-full object-cover object-center"
      />
    </div>
  </div>
);
