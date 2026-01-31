import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Admin/StatCard';
import ProjectDoughnutChart from '@/Components/Admin/ProjectDoughnutChart';
import { useState } from 'react';
import { router } from '@inertiajs/react';
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
    ArrowUpRight,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

export default function Dashboard({
    stats,
    recentTransactions,
    financialReports,
    currentDate,
    pendingTeamAssignment = [],
    availableTeams = [],
    allOrders = [],
}) {
    const [assigningOrder, setAssigningOrder] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState({});
    const [selectedYear, setSelectedYear] = useState(2026);
    const [selectedMonth, setSelectedMonth] = useState('all');

    const months = [
        { value: 1, label: 'Januari' },
        { value: 2, label: 'Februari' },
        { value: 3, label: 'Maret' },
        { value: 4, label: 'April' },
        { value: 5, label: 'Mei' },
        { value: 6, label: 'Juni' },
        { value: 7, label: 'Juli' },
        { value: 8, label: 'Agustus' },
        { value: 9, label: 'September' },
        { value: 10, label: 'Oktober' },
        { value: 11, label: 'November' },
        { value: 12, label: 'Desember' },
    ];

    // Filter financial reports berdasarkan bulan yang dipilih
    const filteredFinancialReports = selectedMonth === 'all' 
        ? financialReports 
        : financialReports.filter(report => {
            const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                              'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            return report.month === monthNames[selectedMonth - 1];
          });

    const handleAssignTeam = (orderId) => {
        if (!selectedTeam[orderId]) {
            alert('Pilih tim terlebih dahulu');
            return;
        }

        setAssigningOrder(orderId);
        router.post(
            route('admin.orders.manual-assign', orderId),
            { team_id: selectedTeam[orderId] },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAssigningOrder(null);
                    setSelectedTeam({ ...selectedTeam, [orderId]: null });
                },
                onError: () => {
                    setAssigningOrder(null);
                },
            }
        );
    };
    return (
        <AdminLayout>
            <Head title="Dashboard Keuangan" />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8">
                    <div className='flex items-center justify-between pb-2 px-6'>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mx-5">
                            Dashboard Keuangan
                        </h1>   
                        <p className="text-sm text-gray-500 mt-1 mx-5">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-5">
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
                        value={stats.total_projects.formatted}
                        subtitle={stats.total_projects.subtitle}
                        type="balance"
                        icon={FolderInput}
                    />
                    
                 
                    <StatCard
                        title="Projek Masuk Bulan Ini"
                        value={stats.monthly_projects.formatted}
                        subtitle={stats.monthly_projects.subtitle}
                        type="balance"
                        icon={FolderUp }
                    />
                     <StatCard
                        title="Projek Selesai Bulan Ini"
                        value={stats.monthly_completed_projects.formatted}
                        subtitle={stats.monthly_completed_projects.subtitle}
                        type="balance"
                        icon={FolderCheck}
                    />
                     <StatCard
                        title="Total Projek Selesai"
                        value={stats.total_completed_projects.formatted}
                        subtitle={stats.total_completed_projects.subtitle}
                        type="balance"
                        icon={LaptopMinimalCheck}
                    />
                    <StatCard
                        title="Projek On Progress"
                        value={stats.active_projects.formatted}
                        subtitle={stats.active_projects.subtitle}
                        type="income"
                        icon={Hourglass}
                    />
                    <StatCard
                        title="Tim Yang Aktif"
                        value={stats.active_teams.formatted}
                        subtitle={stats.active_teams.subtitle}
                        type="income"
                        icon={Users}
                    />  
                     <StatCard
                        title="Tim Yang Tidak Aktif"
                        value={stats.inactive_teams.formatted}
                        subtitle={stats.inactive_teams.subtitle}
                        type="expense"
                        icon={UsersRound}
                    />
                </div>

                {/* Pending Team Assignment Section */}
                {pendingTeamAssignment.length > 0 && (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100 overflow-hidden">
                        <div className="px-6 py-4 bg-white/50 border-b border-orange-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <AlertCircle className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Proyek Menunggu Penugasan Tim
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {pendingTeamAssignment.length} proyek sudah dibayar DP dan menunggu Anda assign tim programmer
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="space-y-4">
                                {pendingTeamAssignment.map((order) => (
                                    <div 
                                        key={order.id} 
                                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                                        {order.order_number}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {order.dp_paid_at}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {order.service_name}
                                                </h3>
                                                
                                                <div className="grid grid-cols-2 gap-4 mb-3">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Client</p>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {order.client_name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {order.client_email}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Total Proyek</p>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            Rp {Number(order.total_amount).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                        </p>
                                                    </div>
                                                </div>

                                                {order.requirements && (
                                                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                                        <p className="text-xs text-gray-500 mb-1">Kebutuhan Proyek:</p>
                                                        <p className="text-sm text-gray-700">
                                                            {order.requirements}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="w-72">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Pilih Tim
                                                </label>
                                                <select
                                                    value={selectedTeam[order.id] || ''}
                                                    onChange={(e) => setSelectedTeam({
                                                        ...selectedTeam,
                                                        [order.id]: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3 text-black"
                                                >
                                                    <option value="">-- Pilih Tim --</option>
                                                    {availableTeams.map((team) => (
                                                        <option key={team.id} value={team.id}>
                                                            {team.name} ({team.specialization}) - {team.workload} proyek aktif
                                                        </option>
                                                    ))}
                                                </select>
                                                
                                                <button
                                                    onClick={() => handleAssignTeam(order.id)}
                                                    disabled={!selectedTeam[order.id] || assigningOrder === order.id}
                                                    className="w-full  py-2 bg-green-700 hover:bg-green-700 text-white font-medium rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                                >
                                                    {assigningOrder === order.id ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                            Assigning...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-4 h-4" />
                                                            ACC 
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Transactions and Reports */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    {/* Recent Transactions */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 flex items-center justify-between mt-3 mb-3">
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
                                {/* Desktop Table */}
                                <div className="hidden md:block overflow-x-auto mb-5"> 
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
                                                            <div className="max-w-[220px] truncate text-sm font-medium text-gray-900">
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
                                                            <span className="px- py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
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

                            {/* Mobile Cards */}
                            <div className="md:hidden divide-y divide-gray-200">
                                {recentTransactions.length > 0 ? (
                                    recentTransactions.map((transaction) => (
                                        <div key={transaction.id} className="p-4 hover:bg-gray-50">
                                            <div className="mb-2">
                                                <div className="text-sm font-medium text-gray-900 mb-1 truncate">
                                                    {transaction.detail}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {transaction.date}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-semibold text-gray-800">
                                                    {transaction.category}
                                                </span>
                                                <span
                                                    className={`text-sm font-semibold ${
                                                        transaction.type === 'income'
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                    }`}
                                                >
                                                    {transaction.type === 'income' ? '+' : '-'}
                                                    {transaction.nominal}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada transaksi
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Financial Report - Pie Chart */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-200 p-4  ">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Laporan Keuangan
                                </h2>
                                <div className="flex gap-2">
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                                        className="text-xs border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 py-1 px-2"
                                    >
                                        <option value={2026}>2026</option>
                                    </select>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                                        className="text-xs border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 py-1 px-2"
                                    >
                                        {months.map(month => (
                                            <option key={month.value} value={month.value}>
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            {/* Project Doughnut Chart */}
                            <div className="mb-6">
                                <ProjectDoughnutChart 
                                    ordersData={allOrders} 
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                />
                            </div>

                            {/* Pie Chart Container */}
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative w-30 h-30">
                                    {/* SVG Pie Chart */}
                                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                        {(() => {
                                            const total = filteredFinancialReports.reduce((sum, report) => sum + report.income, 0);
                                            let currentAngle = 0;
                                            const colors = [
                                                '#3b82f6', '#8b5cf6', '#f1eff0ff', 
                                                '#f59e0b', '#10b981', '#06b6d4',
                                                '#6366f1', '#f97316', '#14b8a6',
                                                '#a855f7', '#ef4444', '#84cc16'
                                            ];
                                            
                                            return filteredFinancialReports.map((report, index) => {
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Legend */}
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {filteredFinancialReports.length > 0 ? (
                                    filteredFinancialReports.map((report, index) => {
                                        const colors = [
                                            '#3b82f6', '#8b5cf6', '#ec4899', 
                                            '#f59e0b', '#10b981', '#06b6d4',
                                            '#6366f1', '#f97316', '#14b8a6',
                                            '#a855f7', '#ef4444', '#84cc16'
                                        ];
                                        
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0 mb-10"
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
                                                    Rp {report.income.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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
