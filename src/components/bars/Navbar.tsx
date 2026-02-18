import { useState } from "react";
import Down from "@/assets/Down.png";
import Bell from "@/assets/Bell.png";
import { Search, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/context/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { getPageTitle } from "@/utils/getPageTitle";

type NavbarProps = {
  onMenuClick?: () => void;
};

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const iconButtonClass =
    "rounded-lg p-2 text-[#929EAE] transition hover:bg-[#F5F5F5] hover:text-[#1B212D]";

  const pageTitle = getPageTitle(location.pathname);

  const displayName = user?.fullName ?? user?.email ?? "User";

  const handleLogout = () => {
    logout();
    navigate("/login");
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-4 sm:px-6 md:px-10">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          className={`rounded-lg p-2 text-[#929EAE] transition hover:bg-[#F5F5F5] hover:text-[#1B212D] md:hidden`}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-[#1B212D] sm:ml-2 sm:text-xl md:ml-4">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className={iconButtonClass} aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={`relative ${iconButtonClass}`}
          aria-label="Notifications"
        >
          <img src={Bell} alt="Notifications" className="h-5 w-5" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full bg-[#FAFAFA] px-3 py-2 transition hover:bg-[#FAFAFA]"
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C8EE44] text-[#1B212D]">
              <User className="h-4 w-4" />
            </div>
            <span className="max-w-[120px] truncate text-sm font-medium text-[#1B212D]">
              {displayName}
            </span>
            <img
              src={Down}
              className={`h-2 w-2 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {userMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                aria-hidden
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg bg-white py-1 shadow-lg">
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-medium text-[#1B212D]">
                    {displayName}
                  </p>
                  {user?.email && (
                    <p className="truncate text-xs text-[#929EAE]">
                      {user.email}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#1B212D] transition hover:bg-[#FAFAFA]"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
