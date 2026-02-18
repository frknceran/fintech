import api from "@/lib/api";
import type { LoginPayload, RegisterPayload } from "@/types/auth";

export const loginService = async (payload: LoginPayload) => {
  const { data } = await api.post("/users/login", payload);
  return data;
};

export const registerService = async (payload: RegisterPayload) => {
  const { data } = await api.post("/users/register", payload);
  return data;
};
