import logo from "@/assets/logo.png";
import signinImage from "@/assets/signin-image.png";
import google from "@/assets/google.png";
import vector from "@/assets/vector.svg";
import { Loader2 } from "lucide-react";

import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/context/useAuth";
import { loginService } from "@/services/authService";
import toast from "react-hot-toast";

import { Button } from "@/components/ui";
import type { LoginPayload } from "@/types/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login, accessToken } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });

  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginService(payload),
    onSuccess: (data) => {
      login(data);
      navigate("/dashboard");
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast.error("Email or password is incorrect.");
        } else {
          toast.error(err.response?.data?.message ?? "Something went wrong.");
        }
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  const { isPending, isError } = mutation;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill all fields.");
      return;
    }
    mutation.mutate(form);
  };

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-start pt-8 sm:pt-10 md:pt-12 pb-10 px-4 sm:px-6 md:px-12">
          <div className="w-full max-w-md flex flex-col">
            <div className="self-start mb-28 md:mb-100 xl:mb-72">
              <img
                src={logo}
                alt="Fintech logo"
                className="h-7 sm:h-8 w-auto"
              />
            </div>
            <div className="flex flex-col gap-2 mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#1B212D]">
                Sign In
              </h1>
              <p className="text-sm sm:text-base font-normal text-[#78778B]">
                Welcome back! Please enter your details
              </p>
            </div>
            <form
              className="flex flex-col gap-2 mb-6 sm:mb-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2 mb-4">
                <label
                  className={`text-medium text-sm text-[#1B212D] ${isError ? "text-red-500" : ""}`}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={form.email}
                  className={`w-full p-2.5 sm:p-2 border border-[#E0E0E0] rounded-md outline-none text-base ${isError ? "border-red-500 text-red-500" : ""}`}
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label
                  className={`text-medium text-sm text-[#1B212D] ${isError ? "text-red-500" : ""}`}
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`w-full p-2.5 sm:p-2 border border-[#E0E0E0] rounded-md outline-none text-base ${isError ? "border-red-500 text-red-500" : ""}`}
                  type="password"
                  id="password"
                  placeholder="********"
                  onChange={handleChange}
                  value={form.password}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Button type="button" variant="secondary" size="lg" className="w-full">
                  <img src={google} alt="google" className="w-4 h-4 mr-4" />
                  Sign In with Google
                </Button>
              </div>
            </form>
            <div className="flex flex-row flex-wrap items-start justify-center gap-x-2 gap-y-1 mt-6 sm:mt-8">
              <p className="text-sm sm:text-base text-medium text-[#78778B]">
                Don't have an account?
              </p>
              <Link
                to="/register"
                className="inline-flex flex-col items-center gap-1"
              >
                <span className="text-medium text-sm text-[#1B212D]">
                  Sign Up
                </span>
                <img src={vector} alt="" className="w-8 h-6 sm:w-12 sm:h-8" />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 min-h-[200px] md:min-h-0">
          <img
            src={signinImage}
            alt="Sign in"
            className="hidden md:block w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
