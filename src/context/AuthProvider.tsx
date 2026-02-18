import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authStorage } from "@/lib/authStorage";
import type { User } from "@/types/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    () => authStorage.get()?.user ?? null
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    () => authStorage.get()?.accessToken ?? null
  );

  const login = (response: Record<string, unknown>) => {
    const data = (response.data as Record<string, unknown>) ?? response;
    const token =
      (data.accessToken as string) ??
      (data.access_token as string) ??
      (data.token as string);
    const u = (data.user ?? null) as User | null;
    if (!token) return;
    setUser(u);
    setAccessToken(token);
    authStorage.set(u, token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    authStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
