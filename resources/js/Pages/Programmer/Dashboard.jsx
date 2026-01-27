import { Head, Link } from '@inertiajs/react';
import ProgrammerLayout from '@/Layouts/ProgrammerLayout';
import { DollarSign, FolderKanban, CheckCircle, Users, ArrowUpRight, WalletCards,Wallet } from 'lucide-react';

export default function Dashboard({ stats, recentProjects, teams }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const statusColors = {
        pending: 'text-yellow-800',
        dp_paid: ' text-blue-800',
        in_progress: ' text-purple-800',
        final_payment: ' text-orange-800',
        completed: ' text-green-800',
        cancelled: ' text-red-800',
    };

    const statusLabels = {
        pending: 'Pending',
        dp_paid: 'DP Paid',
        in_progress: 'In Progress',
        final_payment: 'Final Payment',
        completed: 'Completed',
        cancelled: 'Cancelled',
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
                case 'balance':
                    return {
                        bg: 'bg-white',
                        icon: 'bg-blue-100 text-blue-600',
                        value: 'text-gray-900',
                    };
                default:
                    return {
                        bg: 'bg-white',
                        icon: 'bg-gray-100 text-gray-600',
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
            <Head title="Dashboard Programmer " />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8 -mt-3">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Dashboard Programmer
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Ringkasan project dan earnings Anda
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-5">
                    <StatCard
                        icon={Wallet}
                        title="Total Earnings"
                        value={formatCurrency(stats.total_earnings)}
                        subtitle={`Pending: ${formatCurrency(stats.pending_earnings)}`}
                        type="income"
                    />
                    <StatCard
                        icon={FolderKanban}
                        title="Active Projects"
                        value={stats.active_projects}
                        subtitle={`Total: ${stats.total_projects} projects`}
                        type="balance"
                    />
                    <StatCard
                        icon={CheckCircle}
                        title="Completed"
                        value={stats.completed_projects}
                        subtitle="Successfully delivered"
                        type="balance"
                    />
                    <StatCard
                        icon={Users}
                        title="Teams"
                        value={teams.length}
                        subtitle="Active memberships"
                        type="balance"
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    {/* Recent Projects */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Project Terbaru
                                    </h2>
                                </div>
                                <Link
                                    href={route('programmer.projects.index')}
                                    className="text-sm text-black-600 hover:text-black-700 font-medium flex items-center gap-1 mb-3"
                                >
                                    Lihat Semua
                                    <ArrowUpRight className="w-5 h-5 mt-1" />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                {recentProjects.length > 0 ? (
                                    <table className="min-w-full divide-y">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Order
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Service
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Client
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {recentProjects.map((project) => (
                                                <tr key={project.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-mono text-gray-900">
                                                            #{project.order_number}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {project.service_name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {project.created_at}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-600">
                                                            {project.client_name}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[project.status]}`}>
                                                            {statusLabels[project.status]}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {formatCurrency(project.total_amount)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada project
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Teams */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                My Teams
                            </h2>
                            {teams.length > 0 ? (
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {teams.map((team) => (
                                        <div
                                            key={team.id}
                                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="w-3 h-3 rounded-full bg-blue-500" 
                                                />
                                                <span className="text-sm text-gray-600">
                                                    {team.name}
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-500 capitalize">
                                                {team.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    Belum ada team
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProgrammerLayout>
    );
}
