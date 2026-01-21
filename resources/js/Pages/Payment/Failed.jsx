import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { Star, Users, CheckCircle2, ArrowRight, User, LogOut, Briefcase, Award } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';
import { 
    CreditCard, 
    Wallet, 
    Building2, 
    Smartphone, 
    QrCode,
    ArrowLeft,
    Shield,
    Clock
} from 'lucide-react';
export default function Failed({ order,auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Pembayaran Gagal" />
            <Navbar auth={auth} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
                <div className="container mx-auto px-4 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-center"
                    >
                        {/* Failed Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mb-6"
                        >
                            <XCircle className="w-12 h-12 text-white" />
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                        >
                            Pembayaran Gagal
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
                        >
                            Maaf, pembayaran Anda tidak dapat diproses.
                            {order && (
                                <span className="block mt-2 font-semibold text-gray-900 dark:text-white">
                                    Order #{order.order_number}
                                </span>
                            )}
                        </motion.p>

                        {/* Common Reasons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 mb-8 border border-orange-200 dark:border-orange-800"
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <HelpCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                <h3 className="font-semibold text-gray-900 dark:text-white text-left">
                                    Kemungkinan Penyebab:
                                </h3>
                            </div>
                            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600">•</span>
                                    <span>Saldo atau limit kartu tidak mencukupi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600">•</span>
                                    <span>Informasi pembayaran tidak valid</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600">•</span>
                                    <span>Koneksi internet terputus</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600">•</span>
                                    <span>Pembayaran dibatalkan</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* What to Do */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-blue-800"
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-left">
                                Apa yang harus dilakukan?
                            </h3>
                            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">1.</span>
                                    <span>Periksa kembali informasi pembayaran Anda</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">2.</span>
                                    <span>Pastikan saldo atau limit kartu mencukupi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">3.</span>
                                    <span>Coba lagi dengan metode pembayaran lain</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">4.</span>
                                    <span>Hubungi customer service jika masalah berlanjut</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            {order ? (
                                <Link
                                    href={route('payment.show', { order: order.id })}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    <span>Coba Lagi</span>
                                </Link>
                            ) : (
                                <Link
                                    href={route('orders.index')}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                                >
                                    <span>Lihat Semua Order</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            )}
                            
                            <Link
                                href={route('dashboard')}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all border-2 border-gray-200 dark:border-gray-600"
                            >
                                <Home className="w-5 h-5" />
                                <span>Kembali ke Dashboard</span>
                            </Link>
                        </motion.div>

                        {/* Help Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
                        >
                            Butuh bantuan? Hubungi kami di{' '}
                            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                                support@example.com
                            </a>
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
