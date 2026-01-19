import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ThemeProvider } from '@/Components/ThemeProvider';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <ThemeProvider defaultTheme="dark">
            <Head title="Login - ArgeFlow" />
            
            <div className="min-h-screen flex bg-background text-foreground">
                {/* Left Side - Branding */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16 text-white">
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-12">
                            <img 
                                src="/logo.png" 
                                alt="ArgeFlow Logo" 
                                className="w-12 h-12 object-contain"
                            />
                            <div className="flex flex-col">
                                <span className="font-bold text-2xl">ArgeFlow</span>
                            </div>
                        </div>

                        {/* Headline */}
                        <div className="space-y-6 mb-12">
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight space-y-3">
                                <span className="block">Wujudkan Projek</span>
                                <span className="block">Digitalmu</span>
                                <span className="block text-emerald-300">Bersama Kami</span>
                            </h1>

                            <p className="text-lg text-white/80 max-w-md">
                                Platform freelance terpercaya untuk kebutuhan digital Anda
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                            {[
                                'Programmer berpengalaman',
                                'Harga transparan',
                                'Garansi kepuasan'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-white/90">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex items-center justify-center p-8 relative"
                >
                    {/* Background Decoration */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    
                    <div className="w-full max-w-md space-y-8 relative z-10">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
                            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                            <span className="font-bold text-xl">ArgeFlow</span>
                        </div>

                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl lg:text-4xl font-bold">
                                Selamat Datang Kembali
                            </h2>
                            <p className="text-muted-foreground">
                                Masuk ke akun Anda untuk melanjutkan
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm">
                                {status}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="nama@example.com"
                                        autoComplete="username"
                                        autoFocus
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-border bg-background/50 text-primary focus:ring-2 focus:ring-primary"
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        Ingat saya
                                    </span>
                                </label>
                                
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Masuk
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Belum punya akun?{' '}
                                <Link
                                    href={route('register')}
                                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    Daftar sekarang
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </ThemeProvider>
    );
}
