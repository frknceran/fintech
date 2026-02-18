import logo from "@/assets/logo.png";
import signinImage from "@/assets/signin-image.png";

import {
  Button,
  Spinner,
  GoogleSignInButton,
  AuthLinkRow,
} from "@/components/ui";
import { AuthLayout } from "@/layout/AuthLayout";
import { FormField } from "@/components/auth/FormField";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/validations/auth.schema";
import { registerService, loginService } from "@/services/authService";
import { useAuth } from "@/context/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: registerService,
    onSuccess: async (data, variables) => {
      toast.success(data?.message ?? "Account created successfully.");
      try {
        const loginResponse = await loginService({
          email: variables.email,
          password: variables.password,
        });
        login(loginResponse);
        navigate("/dashboard");
      } catch {
        toast.error("Could not sign in. Please try again from the sign in page.");
        navigate("/login");
      }
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        const msg = err.response?.data?.message ?? "Email already exists";
        toast.error(msg);
        setError("email", { message: msg });
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <AuthLayout
      logo={logo}
      title="Create new account"
      subtitle="Enter your details to get started"
      sideImage={signinImage}
      sideImageAlt="Sign up"
    >
      <form
        className="w-full flex flex-col gap-2"
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
      >
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        <div className="flex flex-col gap-2">
          <FormField
            id="fullName"
            label="Full Name"
            placeholder="John Doe"
            error={errors.fullName}
            {...register("fullName")}
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            error={errors.email}
            {...register("email")}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            error={errors.password}
            {...register("password")}
          />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? <Spinner size="md" /> : "Create Account"}
            </Button>
            <GoogleSignInButton />
            <AuthLinkRow
              promptText="Already have an account?"
              linkText="Sign In"
              to="/login"
            />
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
