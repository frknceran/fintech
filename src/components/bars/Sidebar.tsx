import { NavLink, useNavigate } from "react-router-dom";
import { menuItems } from "@/config/menu.config";
import Logout from "@/assets/Logout.png";
import Help from "@/assets/Help.png";
import logo from "@/assets/logo.png";
import { useAuth } from "@/context/useAuth";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
};

const Sidebar = ({ isOpen, onClose, onNavigate }: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    onClose();
  };

  return (
    <>
      {/* Mobile: overlay sidebar with slide transition */}
      <div
        className={`fixed inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col bg-[#FAFAFA] p-6 text-white shadow-xl transition-transform duration-200 ease-out md:relative md:z-0 md:translate-x-0 md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <img src={logo} alt="logo" className="mb-10 w-24 h-8" />

        <nav className="flex flex-1 flex-col gap-2" onClick={onNavigate}>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-2 transition ${
                    isActive
                      ? "bg-[#C8EE44] text-[#1B212D]"
                      : "text-[#929EAE] hover:bg-gray-700"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div>
          <button
            type="button"
            className="flex items-center gap-3 px-4 py-2 text-[#929EAE]"
          >
            <img src={Help} alt="Help" className="h-5 w-5" />
            Help
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-[#929EAE]"
          >
            <img src={Logout} alt="Logout" className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
