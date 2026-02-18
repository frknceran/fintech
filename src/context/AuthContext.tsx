import { createContext } from "react";
import type { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (response: Record<string, unknown>) => void;
  logout: () => void;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
