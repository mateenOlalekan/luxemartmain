// app/(auth)/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const RegisterSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
    agree: z.boolean().refine((v) => v === true, {
      message: 'You must agree to terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterValues = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Using RegisterValues but allow setting a manual "root" error via `any` cast when needed.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (values: RegisterValues) => {
    try {
      // TODO: call your signup API here
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('Registration data:', values);
      // Example success redirect or toast
    } catch (err) {
      // set a manual form-level error (react-hook-form typings require a cast here)
      setError('root' as any, { type: 'manual', message: 'Something went wrong. Try again.' });
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0B0F10] text-[#0B0F10]">
      {/* Left - Background image with overlay */}
      <section
        className="relative min-h-[40vh] lg:min-h-screen max-lg:hidden "
        style={{
          backgroundImage: `url('/images/auth-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-emerald-600/65" />
        <div className="relative z-10 h-full w-full flex items-end lg:items-center">
          <div className="w-full p-8 md:p-12 lg:p-16 text-white">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-1 text-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                Five-Star Commerce
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Join <span className="text-emerald-200">5Stars</span> today
              </h1>
              <p className="mt-3 text-white/85 md:text-lg">
                Create an account to start shopping smarter and faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right - Registration form */}
      <section className="flex items-center justify-center bg-[#F5F7F6]">
        <div className="w-full max-w-md p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B0F10]">
              Create Account ✨
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Full name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-medium text-neutral-800">
                Full Name
              </label>
              <input
                id="name"
                {...register('name')}
                type="text"
                placeholder="John Doe"
                className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus:border-emerald-500"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
                Email
              </label>
              <input
                id="email"
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus:border-emerald-500"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-800">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 pr-12 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 my-1 inline-flex items-center rounded-xl px-3 text-sm text-neutral-600 hover:bg-neutral-100 active:scale-[0.98] focus-visible:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-800">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                {...register('confirmPassword')}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus:border-emerald-500"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="agree"
                type="checkbox"
                {...register('agree')}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-emerald-600 focus-visible:ring-emerald-500"
              />
              <label htmlFor="agree" className="text-sm text-neutral-800">
                I agree to the{' '}
                <Link href="/terms" className="text-emerald-700 hover:text-emerald-800 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-emerald-700 hover:text-emerald-800 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agree && <p className="text-sm text-red-600">{errors.agree.message}</p>}

            {/* Root error (form-level) */}
            {(errors as any).root?.message && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                {(errors as any).root.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-[#F5F7F6]"
            >
              {isSubmitting ? 'Creating Account…' : 'Sign Up'}
            </button>
          </form>

          {/* Divider + Social buttons */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#F5F7F6] text-gray-500">Or register with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="ml-2">Google</span>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="ml-2">Facebook</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
