import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '@/Components/Landing/Navbar';
import { 
    Package, 
    ArrowLeft, 
    Clock, 
    CheckCircle2, 
    CreditCard,
    Users,
    FileText,
    Calendar,
    DollarSign,
    RefreshCw,
    TrendingUp
} from 'lucide-react';

export default function Show({ order }) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefreshStatus = async () => {
        setIsRefreshing(true);
        try {
            const response = await axios.get(route('payment.status', { order: order.id }));
            
            if (response.data.status === 'success') {
                // Reload page to get updated order data
                router.reload();
            }
        } catch (error) {
            console.error('Error refreshing status:', error);
            alert('Gagal memeriksa status pembayaran');
        } finally {
            setIsRefreshing(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPaymentStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            dp_paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            fully_paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            pending: 'Menunggu Pembayaran',
            in_progress: 'Sedang Dikerjakan',
            completed: 'Selesai',
            cancelled: 'Dibatalkan',
        };
        return texts[status] || status;
    };

    const getPaymentStatusText = (status) => {
        const texts = {
            pending: 'Belum Dibayar',
            dp_paid: 'DP Dibayar',
            fully_paid: 'Lunas',
            failed: 'Gagal',
        };
        return texts[status] || status;
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Order #${order.order_number}`} />
            <Navbar />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.visit(route('orders.index'))}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Kembali ke Daftar Order</span>
                    </motion.button>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Order Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-600 rounded-2xl">
                                            <Package className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                                Order #{order.order_number}
                                            </h1>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getPaymentStatusColor(order.payment_status)}`}>
                                            {getPaymentStatusText(order.payment_status)}
                                        </span>
                                    </div>
                                </div>

                                {/* Service Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Layanan
                                        </div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {order.service.name}
                                        </div>
                                    </div>

                                    {order.team && (
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                Tim
                                            </div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {order.team.name}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Notes & Requirements */}
                            {(order.notes || order.requirements) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                                >
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                        Detail Order
                                    </h3>

                                    {order.notes && (
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Catatan:
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                                                {order.notes}
                                            </div>
                                        </div>
                                    )}

                                    {order.requirements && (
                                        <div>
                                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Kebutuhan & Spesifikasi:
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl whitespace-pre-wrap">
                                                {order.requirements}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Payment History */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    Riwayat Pembayaran
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                DP (40%)
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {order.dp_paid_at 
                                                    ? new Date(order.dp_paid_at).toLocaleDateString('id-ID')
                                                    : 'Belum dibayar'
                                                }
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900 dark:text-white">
                                                Rp {order.dp_amount.toLocaleString('id-ID')}
                                            </div>
                                            {order.dp_paid_at && (
                                                <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                Pelunasan (60%)
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {order.final_paid_at 
                                                    ? new Date(order.final_paid_at).toLocaleDateString('id-ID')
                                                    : 'Belum dibayar'
                                                }
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900 dark:text-white">
                                                Rp {order.final_amount.toLocaleString('id-ID')}
                                            </div>
                                            {order.final_paid_at && (
                                                <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Summary & Actions */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 sticky top-24"
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <DollarSign className="w-6 h-6 text-blue-600" />
                                    Ringkasan Biaya
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Total Harga</span>
                                        <span>Rp {order.total_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>DP (40%)</span>
                                        <span>Rp {order.dp_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Pelunasan (60%)</span>
                                        <span>Rp {order.final_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                {/* Refresh Status Button - for orders that might have webhook issues */}
                                {(order.payment_status === 'pending' || order.payment_status === 'dp_paid') && (
                                    <button
                                        onClick={handleRefreshStatus}
                                        disabled={isRefreshing}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all mb-4"
                                    >
                                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                        <span>{isRefreshing ? 'Memeriksa...' : 'Refresh Status Pembayaran'}</span>
                                    </button>
                                )}

                                {/* Actions */}
                                {/* Progress Button - Available for dp_paid and fully_paid */}
                                {(order.payment_status === 'dp_paid' || order.payment_status === 'fully_paid') && (
                                    <Link
                                        href={route('orders.progress', { order: order.id })}
                                        className="w-full flex items-center justify-center gap-2 py-4 mb-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <TrendingUp className="w-5 h-5" />
                                        <span>Lihat Progress</span>
                                    </Link>
                                )}

                                {order.payment_status === 'pending' && (
                                    <Link
                                        href={route('payment.show', { order: order.id })}
                                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>Bayar DP Sekarang</span>
                                    </Link>
                                )}

                                {order.payment_status === 'dp_paid' && (
                                    <Link
                                        href={route('payment.show', { order: order.id })}
                                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>Bayar Pelunasan</span>
                                    </Link>
                                )}

                                {order.payment_status === 'fully_paid' && (
                                    <div className="space-y-3">
                                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                                            <div className="font-semibold text-green-800 dark:text-green-300">
                                                Pembayaran Lunas
                                            </div>
                                        </div>
                                        <Link
                                            href={route('invoice.show', { order: order.id })}
                                            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <FileText className="w-5 h-5" />
                                            <span>View Invoice</span>
                                        </Link>
                                    </div>
                                )}

                                {/* View Invoice for DP paid orders too */}
                                {order.payment_status === 'dp_paid' && order.dp_paid_at && (
                                    <Link
                                        href={route('invoice.show', { order: order.id })}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all mt-3"
                                    >
                                        <FileText className="w-4 h-4" />
                                        <span>View Invoice</span>
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
