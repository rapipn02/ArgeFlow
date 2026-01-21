import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Download, Home } from 'lucide-react';
import Navbar from '@/Components/Landing/Navbar';
export default function Success({ order }) {
    return (
        <AuthenticatedLayout>
            <Head title="Pembayaran Berhasil" />
            <Navbar />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
                <div className="container mx-auto px-4 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-center"
                    >
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6"
                        >
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                        >
                            Pembayaran Berhasil!
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
                        >
                            Terima kasih! Pembayaran Anda telah berhasil diproses.
                            {order && (
                                <span className="block mt-2 font-semibold text-gray-900 dark:text-white">
                                    Order #{order.order_number}
                                </span>
                            )}
                        </motion.p>

                        {/* Order Details */}
                        {order && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 mb-8 border border-green-200 dark:border-green-800"
                            >
                                <div className="grid grid-cols-2 gap-4 text-left">
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Layanan
                                        </div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {order.service.name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Status Pembayaran
                                        </div>
                                        <div className="font-semibold text-green-600">
                                            {order.payment_status === 'dp_paid' ? 'DP Dibayar' : 'Lunas'}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Next Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-blue-800"
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-left">
                                Langkah Selanjutnya:
                            </h3>
                            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Tim kami akan segera menghubungi Anda untuk konfirmasi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Anda akan menerima email konfirmasi pembayaran</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Pantau progress order Anda di dashboard</span>
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
                                    href={route('orders.show', { order: order.id })}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                                >
                                    <span>Lihat Detail Order</span>
                                    <ArrowRight className="w-5 h-5" />
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
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
