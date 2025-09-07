"use client";

import { signInSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "./input";
import { Button } from "./button";
import { useAppContext } from "@/context/AuthContext";

interface SignInInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {login} = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    if (loading) return;

    setLoading(true);
    const loadingToast = toast.loading("Signing you in...");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token } = response.data;

      if (token) {
        login(token);
        toast.dismiss(loadingToast);
        toast.success("Welcome back! Sign in successful.");
        
        // Reset form on successful login
        reset();
        
        // Navigate to dashboard/home
        await router.push("/");
      } else {
        throw new Error("Authentication token not received");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           "Invalid credentials. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl shadow-xl border overflow-hidden">
        {/* Header Section */}
        <div className="px-8 pt-8 pb-2">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Welcome Back
            </h1>
            <p className="text-sm">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="md:px-8 md:pb-8 px-4 py-4">
          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium"
              >
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={`
                    w-full px-4 py-3 rounded-xl border transition-all duration-200
                    placeholder:text-gray-100 focus:outline-none focus:ring-2 
                    ${errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }
                  `}
                  placeholder="Enter your email address"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className={`
                    w-full px-4 py-3 rounded-xl border transition-all duration-200
                    placeholder:text-gray-100 focus:outline-none focus:ring-2
                    ${errors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }
                  `}
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading || !isValid}
                className={`
                  w-full py-3.5 px-4 rounded-xl font-semibold text-white 
                  transition-all duration-200 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-blue-500
                  ${loading || !isValid
                    ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                    : 'hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
}