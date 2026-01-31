import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '@/Components/NavMpruy';
import TeamRatingModal from '@/Components/TeamRatingModal';
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
    TrendingUp,
    Calculator,
    PackageCheck,
    FileCheck,
    BookCheck,
    ClockFading
} from 'lucide-react';

export default function Show({ order }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);

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
            pending: 'text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            in_progress: ' text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            awaiting_review: ' text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            revision_requested: ' text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
            final_payment: ' text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
            completed: ' text-green-800 dark:bg-green-900/30 dark:text-green-400',
            cancelled: ' text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPaymentStatusColor = (status) => {
        const colors = {
            pending: 'text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            dp_paid: ' text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            fully_paid: ' text-green-800 dark:bg-green-900/30 dark:text-green-400',
            failed: 'text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            pending: 'Menunggu Pembayaran',
            in_progress: 'Sedang Dikerjakan',
            awaiting_review: 'Menunggu Review',
            revision_requested: 'Revisi Diminta',
            final_payment: 'Menunggu Pelunasan',
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
                                className="bg-slate-50 rounded-xl p-6 border border-gray-300"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-start gap-2">
                                        <div className="p-3 rounded-2xl">
                                            <Package className="w-8 h-8 text-blue-700" />
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
                                        <div className=" bg-white/50 font-semibold text-gray-900 dark:text-white">
                                            {order.service.name}
                                        </div>
                                    </div>

                                    {order.team && (
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                Tim
                                            </div>
                                            <div className=" bg-white/40 font-semibold text-gray-900 dark:text-white">
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
                                    className=" bg-slate-50 border border-gray-300 rounded-xl p-6 "
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
                                            <div className="bg-white/50 text-gray-600 dark:text-gray-400 bg-black-100 dark:bg-gray-900/50 p-4 rounded-xl">
                                                {order.notes}
                                            </div>
                                        </div>
                                    )}

                                    {order.requirements && (
                                        <div>
                                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Kebutuhan & Spesifikasi:
                                            </div>
                                            <div className="bg-white/50 text-gray-600 dark:text-gray-400 bg-black-50 p-4 rounded-xl whitespace-pre-wrap">
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
                                className="bg-slate-50 rounded-xl p-6 shadow-xl border border-gray-300 "
                            >
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    Riwayat Pembayaran
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl">
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
                                                Rp {Number(order.dp_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                            </div>
                                            {order.dp_paid_at && (
                                                <PackageCheck className="w-5 h-5 text-green-600 ml-auto" />
                                            )}
                                        </div>

                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl">
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
                                                Rp {Number(order.final_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                            </div>
                                            {order.final_paid_at && (
                                                <PackageCheck className="w-5 h-5 text-green-600 ml-auto" />
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
                                className="bg-slate-50 rounded-xl p-6 border border-gray-300 dark:border-gray-700 sticky top-24"
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Calculator className="w-6 h-6 text-blue-600" />
                                    Ringkasan Biaya
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-black dark:text-gray-400 font-semibold text-sm">
                                        <span>Harga Layanan</span>
                                        <span>
                                            Rp {Math.round(order.total_amount - (order.rush_fee || 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                        </span>
                                    </div>
                                    
                                    {order.rush_fee > 0 && (
                                        <div className="flex justify-between text-orange-600 dark:text-orange-400 font-semibold text-sm">
                                            <span>Biaya Rush</span>
                                            <span>
                                                + Rp {Math.round(order.rush_fee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-black dark:text-gray-400 font-bold border-t border-gray-200 dark:border-gray-700 pt-3">
                                        <span>Total Harga</span>
                                        <span>
                                            Rp {Math.round(order.total_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between text-black dark:text-black font-semibold text-sm">
                                        <span>DP (40%)</span>
                                        <span>
                                            Rp {Math.round(order.dp_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-black dark:text-gray-400 font-semibold text-sm">
                                        <span>Pelunasan (60%)</span>
                                        <span>
                                            Rp {Math.round(order.final_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                        </span>
                                    </div>
                                    
                                    {order.requested_days && (
                                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <div className="text-sm">
                                                <div className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                                                    Deadline Pengerjaan
                                                </div>
                                                <div className="text-blue-700 dark:text-blue-400">
                                                    {order.requested_days} hari kerja
                                                </div>
                                                {order.deadline_date && (
                                                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                                        Target: {new Date(order.deadline_date).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Refresh Status Button - for orders that might have webhook issues */}
           

                                {/* Actions */}
                                {/* Progress Button - Available for dp_paid and fully_paid */}
                                {(order.payment_status === 'dp_paid' || order.payment_status === 'fully_paid') && (
                                    <Link
                                        href={route('orders.progress', { order: order.id })}
                                        className="w-full flex items-center justify-center gap-2 py-4 mb-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <BookCheck className="w-5 h-5" />
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

                                {order.payment_status === 'dp_paid' && order.status === 'final_payment' && (
                                    <Link
                                        href={route('payment.show', { order: order.id })}
                                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>Bayar Pelunasan</span>
                                    </Link>
                                )}

                                {order.payment_status === 'dp_paid' && order.status !== 'final_payment' && (
                                    <div className="text-center p-4 bg-slate-50 dark:bg-blue-900/20 rounded-xl border border-gray-200 dark:border-blue-800">
                                        <ClockFading className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                        <div className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                                            DP Sudah Dibayar
                                        </div>
                                        <div className="text-sm text-black dark:text-blue-400">
                                            Pelunasan dapat dilakukan setelah Anda menerima hasil pekerjaan
                                        </div>
                                    </div>
                                )}

                                {order.payment_status === 'fully_paid' && (
                                    <div className="space-y-3">
                                        <div className="text-center p-4 rounded-xl ">
                                            <FileCheck className="w-12 h-12 text-green-600 mx-auto mb-2" />
                                            <div className="font-semibold text-green-800 dark:text-green-300">
                                                Pembayaran Lunas
                                            </div>
                                        </div>

                                        {/* Rating Button - Show if not rated yet */}
                                        {!order.team_rating && order.team && (
                                            <button
                                                onClick={() => setShowRatingModal(true)}
                                                className="w-full flex items-center justify-center gap-2 py-4 mb-3 rounded-xl font-semibold text-white  hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                </svg>
                                                <span>Beri Rating Tim</span>
                                            </button>
                                        )}

                                        {/* Show rating if already given */}
                                        {order.team_rating && (
                                            <div className="p-4 border rounded-3xl bg-gray-100">
                                                <div className="flex items-center gap-2 mb-2 justify-center">
                                                    <div className="flex justify-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <svg
                                                                key={star}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                className={`w-5 h-5 ${
                                                                    star <= order.team_rating.rating
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-300'
                                                                }`}
                                                            >
                                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                        ({order.team_rating.rating}/5)
                                                    </span>
                                                </div>
                                                {order.team_rating.review && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                                        "{order.team_rating.review}"
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                                    Terima kasih atas rating Anda!
                                                </p>
                                            </div>
                                        )}

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

            {/* Team Rating Modal */}
            <TeamRatingModal
                order={order}
                show={showRatingModal}
                onClose={() => setShowRatingModal(false)}
            />
        </AuthenticatedLayout>
    );
}
