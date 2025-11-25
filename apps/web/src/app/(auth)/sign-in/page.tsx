"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signInSchema, type SignInValues } from "@send-flow/validation";



export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  function onSubmit(data: SignInValues) {
    console.log("SIGN IN DATA:", data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eef2ff] px-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-xl border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 text-center mt-1">
          Sign in to continue
        </p>

        {/* Google Login */}
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-3 py-3 rounded-2xl border-gray-300 bg-white hover:bg-gray-100"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium text-gray-700">
              Sign in with Google
            </span>
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="mt-1 rounded-2xl border-gray-300
              focus-visible:ring-2 focus-visible:ring-indigo-300 
              focus-visible:border-indigo-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="mt-1 rounded-2xl border-gray-300
              focus-visible:ring-2 focus-visible:ring-indigo-300 
              focus-visible:border-indigo-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-2xl mt-2">
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-indigo-600 font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
