import { Link } from "react-router-dom";
import vector from "@/assets/vector.svg";

interface AuthLinkRowProps {
  promptText: string;
  linkText: string;
  to: string;
}

export const AuthLinkRow = ({ promptText, linkText, to }: AuthLinkRowProps) => (
  <div className="flex flex-row flex-wrap items-start justify-center gap-x-2 gap-y-1 mt-6 sm:mt-8">
    <p className="text-sm sm:text-base text-medium text-[#78778B]">
      {promptText}
    </p>
    <Link to={to} className="inline-flex flex-col items-center gap-1">
      <span className="text-medium text-base text-[#1B212D]">{linkText}</span>
      <img src={vector} alt="" className="w-8 h-6 sm:w-12 sm:h-8" />
    </Link>
  </div>
);
