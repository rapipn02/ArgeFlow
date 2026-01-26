import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Landing/Navbar';
import { 
    Package, 
    Clock, 
    CheckCircle2, 
    XCircle,
    Eye,
    CreditCard,
    Filter,
    Search
} from 'lucide-react';
import { useState } from 'react';

export default function Index({ orders }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    // Debug output
    console.log('Raw orders prop:', orders);
    console.log('Is array?', Array.isArray(orders));
    console.log('Has data?', orders?.data);
    console.log('Type:', typeof orders);
    
    // Safely get orders data - handle both paginated and non-paginated formats
    const ordersData = Array.isArray(orders) ? orders : (orders?.data || []);
    
    console.log('Final ordersData:', ordersData);
    console.log('ordersData length:', ordersData.length);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            dp_paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            fully_paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: Clock,
            dp_paid: CheckCircle2,
            fully_paid: CheckCircle2,
            failed: XCircle,
        };
        return icons[status] || Clock;
    };

    const getStatusText = (status) => {
        const texts = {
            pending: 'Menunggu Pembayaran',
            dp_paid: 'DP Dibayar',
            fully_paid: 'Lunas',
            failed: 'Gagal',
        };
        return texts[status] || status;
    };
    
    // Safety check
    if (!orders) {
        return (
            <AuthenticatedLayout>
                <Head title="Daftar Order" />
                <Navbar />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="bg-white p-8 rounded-lg text-center">
                            <p className="text-red-600">Error: Data orders tidak ditemukan</p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Order" />
            <Navbar />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Daftar Order
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Kelola dan pantau semua order Anda
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-6"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari order..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="pending">Menunggu Pembayaran</option>
                                    <option value="dp_paid">DP Dibayar</option>
                                    <option value="fully_paid">Lunas</option>
                                    <option value="failed">Gagal</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Orders List */}
                    {ordersData && ordersData.length > 0 ? (
                        <div className="space-y-4">
                            {ordersData.filter(order => {
                                // Search filter
                                const matchesSearch = searchTerm === '' || 
                                    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    order.service?.name?.toLowerCase().includes(searchTerm.toLowerCase());
                                
                                // Status filter
                                const matchesStatus = statusFilter === 'all' || order.payment_status === statusFilter;
                                
                                return matchesSearch && matchesStatus;
                            }).map((order, index) => {
                                const StatusIcon = getStatusIcon(order.payment_status);
                                
                                return (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-shadow"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                            {/* Icon */}
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                                                    <Package className="w-8 h-8 text-white" />
                                                </div>
                                            </div>

                                            {/* Order Info */}
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                            {order.service.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Order #{order.order_number}
                                                        </p>
                                                    </div>
                                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(order.payment_status)}`}>
                                                        <StatusIcon className="w-4 h-4" />
                                                        <span className="text-sm font-semibold">
                                                            {getStatusText(order.payment_status)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-600 dark:text-gray-400">Total:</span>
                                                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                                                            Rp {order.total_amount.toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600 dark:text-gray-400">DP:</span>
                                                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                                                            Rp {order.dp_amount.toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                    {order.team && (
                                                        <div>
                                                            <span className="text-gray-600 dark:text-gray-400">Tim:</span>
                                                            <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                                                                {order.team.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <span className="text-gray-600 dark:text-gray-400">Tanggal:</span>
                                                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                                                            {new Date(order.created_at).toLocaleDateString('id-ID')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    href={route('orders.show', { order: order.id })}
                                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>Detail</span>
                                                </Link>
                                                
                                                {order.payment_status === 'pending' && (
                                                    <Link
                                                        href={route('payment.show', { order: order.id })}
                                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all"
                                                    >
                                                        <CreditCard className="w-4 h-4" />
                                                        <span>Bayar</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-center"
                        >
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Belum Ada Order
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Anda belum memiliki order. Mulai dengan memilih layanan yang Anda butuhkan.
                            </p>
                            <Link
                                href={route('services.index')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                            >
                                Lihat Layanan
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
