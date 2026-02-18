import type { User } from "@/types/user";

const AUTH_KEY = "auth";

export interface StoredAuth {
  user: User | null;
  accessToken: string;
}

export const authStorage = {
  get(): StoredAuth | null {
    try {
      const raw = sessionStorage.getItem(AUTH_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as StoredAuth;
    } catch {
      return null;
    }
  },

  set(user: User | null, accessToken: string) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ user, accessToken }));
  },

  clear() {
    sessionStorage.removeItem(AUTH_KEY);
  },
};
