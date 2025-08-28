'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password is too long'),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {register,handleSubmit,formState: { errors, isSubmitting },setError, } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await new Promise((r) => setTimeout(r, 600));
      console.log('Login payload:', values);

    } catch (err) {
      setError('root', { message: 'Something went wrong. Try again.' });
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0B0F10] text-[#0B0F10]">
      {/* Left: image with emerald overlay (hidden on small screens? No—stacked) */}
      <section
        className="relative min-h-[40vh] lg:min-h-screen"
        aria-hidden="true"
        style={{
          backgroundImage: `url('')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Emerald overlay */}
        <div className="absolute inset-0 bg-emerald-600/65" />
        {/* Brand / message */}
        <div className="relative z-10 h-full w-full flex items-end lg:items-center">
          <div className="w-full p-8 md:p-12 lg:p-16 text-white">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-1 text-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                Five-Star Commerce
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Shop smarter with <span className="text-emerald-200">5Stars</span>
              </h1>
              <p className="mt-3 text-white/85 md:text-lg">
                Secure sign-in to manage your cart, orders, and recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right: form */}
      <section className="flex items-center justify-center bg-[#F5F7F6]">
        <div className="w-full max-w-md p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B0F10]">
              Welcome back 👋
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Sign in to continue to <span className="font-medium">5Stars</span>.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className={[
                  'w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3',
                  'text-[15px] text-neutral-900 placeholder:text-neutral-400',
                  'outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
                  'transition-shadow'
                ].join(' ')}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-800">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  className={[
                    'w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 pr-12',
                    'text-[15px] text-neutral-900 placeholder:text-neutral-400',
                    'outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
                    'transition-shadow'
                  ].join(' ')}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 my-1 inline-flex items-center rounded-xl px-3 text-sm text-neutral-600 hover:bg-neutral-100 active:scale-[0.98] outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-800 select-none">
                <input
                  type="checkbox"
                  {...register('remember')}
                  className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 outline-none"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-emerald-700 hover:text-emerald-800 outline-none focus:ring-2 focus:ring-emerald-500 rounded"
              >
                Forgot password?
              </Link>
            </div>

            {/* Root errors */}
            {'root' in errors && errors.root?.message && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                {errors.root.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={[
                'w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white font-medium',
                'shadow-sm hover:bg-emerald-700 active:bg-emerald-800',
                'disabled:opacity-60 disabled:cursor-not-allowed',
                'outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-[#F5F7F6]'
              ].join(' ')}
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#F5F7F6] px-3 text-neutral-500">or</span>
              </div>
            </div>

            {/* Social sign-in (stubs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Continue with Google
              </button>
              <button
                type="button"
                className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Continue with GitHub
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-neutral-600">
            Don’t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-emerald-700 hover:text-emerald-800 outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
