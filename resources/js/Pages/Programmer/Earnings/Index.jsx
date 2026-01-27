import { Head } from '@inertiajs/react';
import ProgrammerLayout from '@/Layouts/ProgrammerLayout';
import { DollarSign, Clock, TrendingUp, CreditCard } from 'lucide-react';

export default function Index({ stats, recentTransactions, bankInfo }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        paid: 'bg-green-100 text-green-800',
    };

    const StatCard = ({ title, value, subtitle, icon: Icon, type = 'balance' }) => {
        const getColorClasses = () => {
            switch (type) {
                case 'income':
                    return {
                        bg: 'bg-white',
                        icon: 'bg-green-100 text-green-600',
                        value: 'text-gray-900',
                    };
                case 'warning':
                    return {
                        bg: 'bg-white',
                        icon: 'bg-orange-100 text-orange-600',
                        value: 'text-gray-900',
                    };
                default:
                    return {
                        bg: 'bg-white',
                        icon: 'bg-blue-100 text-blue-600',
                        value: 'text-gray-900',
                    };
            }
        };

        const colors = getColorClasses();

        return (
            <div className={`${colors.bg} rounded-xl py-10 px-6 border border-gray-200 shadow-sm`}>
                <div className="flex items-start justify-between">
                    <div className="flex-1 translate-y-4">
                        <p className="font-large text-gray-600 -translate-y-4">
                            {title}
                        </p>
                        <h3 className={`text-2xl font-bold ${colors.value} py-3 -translate-y-2`}>
                            {value}
                        </h3>
                        <p className="text-xs text-gray-500">{subtitle}</p>
                    </div>
                    <div className={`${colors.icon} p-3 rounded-lg`}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <ProgrammerLayout>
            <Head title="Earnings" />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8 -mt-3">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div>
                            <h1 className="text-1xl font-semibold text-gray-900">
                                Earnings
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Pantau pendapatan dan riwayat pembayaran Anda
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 gap-y-5">
                    <StatCard
                        icon={DollarSign}
                        title="Total Earnings"
                        value={formatCurrency(stats.total_earnings)}
                        subtitle="Berhasil diterima"
                        type="income"
                    />
                    <StatCard
                        icon={Clock}
                        title="Pending Earnings"
                        value={formatCurrency(stats.pending_earnings)}
                        subtitle="Menunggu pembayaran"
                        type="warning"
                    />
                    <StatCard
                        icon={TrendingUp}
                        title="Total Transaksi"
                        value={stats.total_transactions}
                        subtitle="Sepanjang waktu"
                        type="balance"
                    />
                </div>

                {/* Bank Account Info */}
                {bankInfo && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Rekening Bank
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Nama Bank</p>
                                <p className="font-semibold text-gray-900">{bankInfo.bank_name || 'Belum diatur'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Nomor Rekening</p>
                                <p className="font-semibold text-gray-900">{bankInfo.account_number || 'Belum diatur'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Nama Pemilik</p>
                                <p className="font-semibold text-gray-900">{bankInfo.account_holder || 'Belum diatur'}</p>
                            </div>
                        </div>
                        {(!bankInfo.bank_name || !bankInfo.account_number) && (
                            <p className="mt-4 text-sm p-3 rounded-lg text-red-400">
                                Silakan update informasi rekening bank di profil Anda untuk menerima pembayaran.
                            </p>
                        )}
                    </div>
                )}

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Transaksi Terbaru
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        {recentTransactions.length > 0 ? (
                            <table className="min-w-full divide-y">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-mono text-gray-900">
                                                    #{transaction.order_number}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-900">
                                                    {transaction.service_name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <span className="text-sm font-semibold text-green-600">
                                                    {formatCurrency(transaction.amount)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[transaction.status]}`}>
                                                    {transaction.status === 'paid' ? 'Paid' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-600">
                                                    {transaction.payment_date || transaction.created_at}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="px-6 py-8 text-center text-sm text-gray-500">
                                Belum ada transaksi
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProgrammerLayout>
    );
}
