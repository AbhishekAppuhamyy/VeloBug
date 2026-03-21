import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { authApi } from '../../api/auth'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords do not match',
  path: ['password_confirmation'],
})

type RegisterForm = z.infer<typeof registerSchema>

export default function Register() {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      await authApi.csrf()
      await authApi.register(data)
      const response = await authApi.getUser()
      setUser(response.data)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-bounce"
            style={{
              right: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10 py-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg shadow-indigo-500/25">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Velo<span className="text-indigo-500">Bug</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Create your free account and start shipping</p>
        </div>

        {/* Card */}
        <div className="relative">
          {/* Card glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur" />

          <div className="relative bg-[#111827] rounded-2xl p-8 shadow-2xl border border-gray-800">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className={cn(
                  'block text-sm font-medium mb-1.5 transition-colors duration-200',
                  focused === 'name' ? 'text-indigo-400' : 'text-gray-300'
                )}>
                  Full Name
                </label>
                <div className="relative">
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="John Doe"
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className={cn(
                      'w-full bg-gray-900/80 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all duration-200',
                      focused === 'name'
                        ? 'border-indigo-500 shadow-lg shadow-indigo-500/10'
                        : 'border-gray-700 hover:border-gray-600',
                      errors.name && 'border-red-500'
                    )}
                  />
                  {focused === 'name' && (
                    <div className="absolute inset-0 rounded-xl bg-indigo-500/5 pointer-events-none" />
                  )}
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={cn(
                  'block text-sm font-medium mb-1.5 transition-colors duration-200',
                  focused === 'email' ? 'text-indigo-400' : 'text-gray-300'
                )}>
                  Email address
                </label>
                <div className="relative">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className={cn(
                      'w-full bg-gray-900/80 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all duration-200',
                      focused === 'email'
                        ? 'border-indigo-500 shadow-lg shadow-indigo-500/10'
                        : 'border-gray-700 hover:border-gray-600',
                      errors.email && 'border-red-500'
                    )}
                  />
                  {focused === 'email' && (
                    <div className="absolute inset-0 rounded-xl bg-indigo-500/5 pointer-events-none" />
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className={cn(
                  'block text-sm font-medium mb-1.5 transition-colors duration-200',
                  focused === 'password' ? 'text-indigo-400' : 'text-gray-300'
                )}>
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    className={cn(
                      'w-full bg-gray-900/80 border rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none transition-all duration-200',
                      focused === 'password'
                        ? 'border-indigo-500 shadow-lg shadow-indigo-500/10'
                        : 'border-gray-700 hover:border-gray-600',
                      errors.password && 'border-red-500'
                    )}
                  />
                  {focused === 'password' && (
                    <div className="absolute inset-0 rounded-xl bg-indigo-500/5 pointer-events-none" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-10"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className={cn(
                  'block text-sm font-medium mb-1.5 transition-colors duration-200',
                  focused === 'confirm' ? 'text-indigo-400' : 'text-gray-300'
                )}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register('password_confirmation')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused(null)}
                    className={cn(
                      'w-full bg-gray-900/80 border rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none transition-all duration-200',
                      focused === 'confirm'
                        ? 'border-indigo-500 shadow-lg shadow-indigo-500/10'
                        : 'border-gray-700 hover:border-gray-600',
                      errors.password_confirmation && 'border-red-500'
                    )}
                  />
                  {focused === 'confirm' && (
                    <div className="absolute inset-0 rounded-xl bg-indigo-500/5 pointer-events-none" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-10"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full" />
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full group overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 mt-2"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-gray-600 text-xs">Already have an account?</span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Login link */}
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-700 hover:border-indigo-500/50 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-indigo-500/5"
            >
              Sign in instead
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-gray-600 text-xs mt-6">
          By creating an account, you agree to our{' '}
          <span className="text-gray-500 hover:text-gray-400 cursor-pointer transition-colors">Terms</span>
          {' '}and{' '}
          <span className="text-gray-500 hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
        </p>

      </div>
    </div>
  )
}