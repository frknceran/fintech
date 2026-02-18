import logo from "@/assets/logo.png";
import google from "@/assets/google.png";
import vector from "@/assets/vector.svg";
import signinImage from "@/assets/signin-image.png";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner/Spinner";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/validations/auth.schema";
import { registerService } from "@/services/authService";
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
    onSuccess: (data) => {
      login(data);
      navigate("/dashboard");
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("email", { message: "Email already exists" });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    mutation.mutate(values);
  };

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
                Create new account
              </h1>
              <p className="text-sm sm:text-base font-normal text-[#78778B]">
                Enter your details to get started
              </p>
            </div>
            <form
              className="w-full flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {errors.root && (
                <p className="text-red-500 text-sm">{errors.root.message}</p>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 mb-4">
                  <label
                    className={`text-medium text-sm ${errors.fullName ? "text-red-500" : "text-[#1B212D]"}`}
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    className={`w-full p-2.5 sm:p-2 border rounded-md outline-none text-base ${errors.fullName ? "border-red-500 text-red-500" : "border-[#E0E0E0]"}`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label
                    className={`text-medium text-sm ${errors.email ? "text-red-500" : "text-[#1B212D]"}`}
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className={`w-full p-2.5 sm:p-2 border rounded-md outline-none text-base ${errors.email ? "border-red-500 text-red-500" : "border-[#E0E0E0]"}`}
                    placeholder="example@gmail.com"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label
                    className={`text-medium text-sm ${errors.password ? "text-red-500" : "text-[#1B212D]"}`}
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    className={`w-full p-2.5 sm:p-2 border rounded-md outline-none text-base ${errors.password ? "border-red-500 text-red-500" : "border-[#E0E0E0]"}`}
                    type="password"
                    id="password"
                    placeholder="********"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={mutation.isPending}
                    className="w-full"
                  >
                    {mutation.isPending ? (
                      <Spinner size="md" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    <img src={google} alt="google" className="w-4 h-4 mr-4" />
                    Sign In with Google
                  </Button>
                </div>
                <div className="flex flex-row flex-wrap items-start justify-center gap-x-2 gap-y-1 mt-6 sm:mt-8">
                  <p className="text-sm sm:text-base text-medium text-[#78778B]">
                    Already have an account?
                  </p>
                  <Link
                    to="/"
                    className="inline-flex flex-col items-center gap-1"
                  >
                    <span className="text-medium text-sm text-[#1B212D]">
                      Sign In
                    </span>
                    <img
                      src={vector}
                      alt=""
                      className="w-8 h-6 sm:w-12 sm:h-8"
                    />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 min-h-[200px] md:min-h-0">
          <img
            src={signinImage}
            alt="Sign up"
            className="hidden md:block w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
