"use client";

import { signInSchema, signUpSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


interface SignUpInput {
  email: string;
  password: string;
  firstname : string;
  lastname : string;
}

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpInput> = async (data) => {
    if (loading) return;

    setLoading(true);
    const loadingToast = toast.loading("Signing you in...");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.dismiss(loadingToast);
      toast.success("User registered successfully");
      reset();
      await router.push("/login");
    } catch (error) {
      toast.dismiss(loadingToast);
      
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           "Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      
      console.error("Signup error:", error);
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
              Create an account
            </h1>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="md:px-8 md:pb-8 px-4 py-4">
          <div className="space-y-3">
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
                    placeholder:text-gray-100 placeholder:text-sm md:placeholder:text-base focus:outline-none focus:ring-2 
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
                    placeholder:text-gray-100 placeholder:text-sm md:placeholder:text-base focus:outline-none focus:ring-2
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

            <div className="space-y-2">
              <label 
                htmlFor="firstname" 
                className="block text-sm font-medium"
              >
                Firstname
              </label>
              <div className="relative">
                <Input
                  id="firstname"
                  type="text"
                  autoComplete="firstname"
                  {...register("firstname")}
                  className={`
                    w-full px-4 py-3 rounded-xl border transition-all duration-200
                    placeholder:text-gray-100 placeholder:text-sm md:placeholder:text-base focus:outline-none focus:ring-2 
                    ${errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }
                  `}
                  placeholder="Enter your firstname"
                  disabled={loading}
                />
              </div>
              {errors.firstname && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="lastname" 
                className="block text-sm font-medium"
              >
                Lastname
              </label>
              <div className="relative">
                <Input
                  id="lastname"
                  type="text"
                  autoComplete="lastname"
                  {...register("lastname")}
                  className={`
                    w-full px-4 py-3 rounded-xl border transition-all duration-200
                    placeholder:text-gray-100 placeholder:text-sm md:placeholder:text-base focus:outline-none focus:ring-2 
                    ${errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }
                  `}
                  placeholder="Enter your lastname"
                  disabled={loading}
                />
              </div>
              {errors.lastname && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.lastname.message}
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
                    <span>Signing up...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-300">
            Have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}