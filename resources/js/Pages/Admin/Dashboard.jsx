import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Admin/StatCard';
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    Activity,
    ArrowRight,
    Kanban,
    FolderCheck,
    FolderInput,
    Users,
    Hourglass,
    BanknoteArrowUp,
    LaptopMinimalCheck,
    Folder,
    FolderUp,
    UsersRound, 
    Banknote,
    MoveUpRight,
    ArrowUpRight
} from 'lucide-react';

export default function Dashboard({
    stats,
    recentTransactions,
    financialReports,
    currentDate,
}) {
    return (
        <AdminLayout>
            <Head title="Dashboard Keuangan" />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8">
                    <div className='flex items-center justify-between pb-2 px-6'>
                    <div>
                        <h1 className="text-1xl font-semibold text-gray-900">
                            Dashboard Keuangan
                        </h1>   
                        <p className="text-sm text-gray-500 mt-1">
                            Ringkasan dan analisis keuangan ArgeFlow
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="inline-flex gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm ">
                            <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className='text-gray-900'>
                            {currentDate}
                       </span>
                        </span>
                    </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-5">
                    <StatCard
                        title="Total Pemasukan"
                        value={stats.total_income.formatted}
                        subtitle={stats.total_income.subtitle}
                        type="income"
                        icon={Banknote}
                    />   
                    <StatCard
                        title="Pemasukan Bulan Ini"
                        value={stats.monthly_income.formatted}
                        subtitle={stats.monthly_income.subtitle}
                        type="income"
                        icon={BanknoteArrowUp}
                    />
                   
                    <StatCard
                        title="Total Projek"
                        value={stats.total_expense.formatted}
                        subtitle={stats.total_expense.subtitle}
                        type="balance"
                        icon={FolderInput}
                    />
                    
                 
                    <StatCard
                        title="Projek Masuk Bulan Ini"
                        value={stats.monthly_expense.formatted}
                        subtitle={stats.monthly_expense.subtitle}
                        type="balance"
                        icon={FolderUp }
                    />
                     <StatCard
                        title="Projek Selesai Bulan Ini"
                        value={stats.monthly_cash_flow.formatted}
                        subtitle={stats.monthly_cash_flow.subtitle}
                        type="balance"
                        icon={FolderCheck}
                    />
                     <StatCard
                        title="Total Projek Selesai"
                        value={stats.monthly_cash_flow.formatted}
                        subtitle={stats.monthly_cash_flow.subtitle}
                        type="balance"
                        icon={LaptopMinimalCheck}
                    />
                    <StatCard
                        title="Project On Progress  "
                        value={stats.monthly_cash_flow.formatted}
                        subtitle={stats.monthly_cash_flow.subtitle}
                        type="income"
                        icon={Hourglass}
                    />
                    <StatCard
                        title="Tim Yang Aktif"
                        value={stats.monthly_cash_flow.formatted}
                        subtitle={stats.monthly_cash_flow.subtitle}
                        type= "income"
                        icon={Users}
                    />  
                     <StatCard
                        title="Tim Yang Tidak Aktif"
                        value={stats.total_balance.formatted}
                        subtitle={stats.total_balance.subtitle}
                        type="expense"
                        icon={UsersRound}
                    />
                </div>

                {/* Transactions and Reports */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    {/* Recent Transactions */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Transaksi Terbaru
                                    </h2>
                                </div>
                                    <a
                                        href={route('admin.transactions.index')}
                                        className="text-sm text-black-600 hover:text-black-700 font-medium flex items-center gap-1 mb-3"
                                    >
                                        Lihat Semua
                                        <ArrowUpRight className="w-5 h-5 mt-1" />
                                    </a>
                                </div>
                                <div className="overflow-x-auto"> 
                                    <table className="min-w-full divide-y">
                                        <thead className="">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Detail
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Kategori
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nominal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentTransactions.length > 0 ? (
                                            recentTransactions.map(
                                                (transaction) => (
                                                    <tr
                                                        key={transaction.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {
                                                                    transaction.detail
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {
                                                                    transaction.date
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                                {
                                                                    transaction.category
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                                            <span
                                                                className={`text-sm font-semibold ${
                                                                    transaction.type ===
                                                                    'income'
                                                                        ? 'text-green-600'
                                                                        : 'text-red-600'
                                                                }`}
                                                            >
                                                                {transaction.type ===
                                                                'income'
                                                                    ? '+'
                                                                    : '-'}
                                                                {
                                                                    transaction.nominal
                                                                }
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="px-6 py-8 text-center text-sm text-gray-500"
                                                >
                                                    Belum ada transaksi
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Financial Report - Pie Chart */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Laporan Keuangan
                            </h2>
                            
                            {/* Pie Chart Container */}
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative w-48 h-48">
                                    {/* SVG Pie Chart */}
                                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                        {(() => {
                                            const total = financialReports.reduce((sum, report) => sum + report.income, 0);
                                            let currentAngle = 0;
                                            const colors = [
                                                '#3b82f6', '#8b5cf6', '#f1eff0ff', 
                                                '#f59e0b', '#10b981', '#06b6d4',
                                                '#6366f1', '#f97316', '#14b8a6',
                                                '#a855f7', '#ef4444', '#84cc16'
                                            ];
                                            
                                            return financialReports.map((report, index) => {
                                                if (total === 0) return null;
                                                
                                                const percentage = (report.income / total) * 100;
                                                const angle = (percentage / 100) * 360;
                                                
                                                // Calculate arc path
                                                const startAngle = currentAngle;
                                                const endAngle = currentAngle + angle;
                                                currentAngle = endAngle;
                                                
                                                const startRad = (startAngle * Math.PI) / 180;
                                                const endRad = (endAngle * Math.PI) / 180;
                                                
                                                const x1 = 50 + 45 * Math.cos(startRad);
                                                const y1 = 50 + 45 * Math.sin(startRad);
                                                const x2 = 50 + 45 * Math.cos(endRad);
                                                const y2 = 50 + 45 * Math.sin(endRad);
                                                
                                                const largeArc = angle > 180 ? 1 : 0;
                                                
                                                const pathData = [
                                                    `M 50 50`,
                                                    `L ${x1} ${y1}`,
                                                    `A 45 45 0 ${largeArc} 1 ${x2} ${y2}`,
                                                    `Z`
                                                ].join(' ');
                                                
                                                return (
                                                    <path
                                                        key={index}
                                                        d={pathData}
                                                        fill={colors[index % colors.length]}
                                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                                    />
                                                );
                                            });
                                        })()}
                                    </svg>
                                    
                                    {/* Center circle for donut effect */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500">Total</p>
                                                <p className="text-sm font-bold text-gray-900">
                                                    {financialReports.length}
                                                </p>
                                                <p className="text-xs text-gray-500">Bulan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Legend */}
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {financialReports.length > 0 ? (
                                    financialReports.map((report, index) => {
                                        const colors = [
                                            '#3b82f6', '#8b5cf6', '#ec4899', 
                                            '#f59e0b', '#10b981', '#06b6d4',
                                            '#6366f1', '#f97316', '#14b8a6',
                                            '#a855f7', '#ef4444', '#84cc16'
                                        ];
                                        
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div 
                                                        className="w-3 h-3 rounded-full" 
                                                        style={{ backgroundColor: colors[index % colors.length] }}
                                                    />
                                                    <span className="text-sm text-gray-600">
                                                        {report.month}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    Rp {report.income.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">
                                        Belum ada laporan
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
