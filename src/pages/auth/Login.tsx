import logo from "@/assets/logo.png";
import signinImage from "@/assets/signin-image.png";
import { Loader2 } from "lucide-react";

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/context/useAuth";
import { loginService } from "@/services/authService";
import toast from "react-hot-toast";

import { Button, GoogleSignInButton, AuthLinkRow } from "@/components/ui";
import { AuthLayout } from "@/layout/AuthLayout";
import { FormField } from "@/components/auth/FormField";
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

  const fieldError = isError ? { message: "Email or password is incorrect." } : undefined;

  return (
    <AuthLayout
      logo={logo}
      title="Sign In"
      subtitle="Welcome back! Please enter your details"
      sideImage={signinImage}
      sideImageAlt="Sign in"
    >
      <form
        className="flex flex-col gap-2 mb-6 sm:mb-8"
        onSubmit={handleSubmit}
      >
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={handleChange}
          error={fieldError}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="********"
          value={form.password}
          onChange={handleChange}
          error={fieldError}
        />
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
          <GoogleSignInButton />
          <AuthLinkRow
            promptText="Don't have an account?"
            linkText="Sign Up"
            to="/register"
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
