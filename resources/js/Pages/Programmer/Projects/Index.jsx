import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import ProgrammerLayout from '@/Layouts/ProgrammerLayout';
import { Search, Eye, AlertCircle } from 'lucide-react';

export default function Index({ projects, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('programmer.projects.index'), { search, status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        router.get(route('programmer.projects.index'), { search, status: newStatus }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const statusTabs = [
        { value: 'all', label: 'Semua' },
        { value: 'incoming', label: 'Masuk' },
        { value: 'in_progress', label: 'Progress' },
        { value: 'completed', label: 'Selesai' },
    ];

    const formatCurrency = (amount) => {
        // Format: Rp 3.000.000 (with dots as thousand separators)
        const formatted = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `Rp ${formatted}`;
    };
    const statusColors = {
        pending: 'text-yellow-800',
        dp_paid: ' text-blue-800',
        in_progress: ' text-purple-800',
        revision_requested: ' text-red-800',
        awaiting_review: ' text-indigo-800',
        final_payment: ' text-orange-800',
        completed: ' text-green-800',
        cancelled: ' text-red-800',
    };
    const statusLabels = {
        pending: 'Pending',
        dp_paid: 'DP Paid',
        in_progress: 'In Progress',
        revision_requested: 'Revisi Diperlukan',
        awaiting_review: 'Awaiting Review',
        final_payment: 'Final Payment',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };

    return (
        <ProgrammerLayout>
            <Head title="Projects" />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8 -mt-3">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div>
                            <h1 className="text-1xl font-semibold text-gray-900">
                                Projects
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Kelola dan pantau project Anda
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className=" rounded-xl p-6">
                    {/* Status Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {statusTabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => handleStatusChange(tab.value)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                    status === tab.value
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari berdasarkan order number, service, atau client..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                            />
                        </div>

                    </form>
                </div>

                {/* Projects Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto mt-8">
                        {projects.data.length > 0 ? (
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
                                            Deadline
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {projects.data.map((project) => (
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
                                                {project.deadline_date && project.status !== 'completed' && project.payment_status !== 'fully_paid' ? (
                                                    <div>
                                                        <span className="text-sm font-medium text-orange-600">
                                                            {project.deadline_date}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[project.status]}`}>
                                                        {statusLabels[project.status]}
                                                    </span>
                                                    {project.has_revision && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                            <AlertCircle className="w-3 h-3" />
                                                            Revisi #{project.revision_count}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {formatCurrency(project.total_amount)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <Link
                                                    href={route('programmer.projects.show', project.id)}
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                                >
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <p className="text-sm text-gray-500">
                                    {search || status !== 'all' 
                                        ? 'Tidak ada project yang sesuai dengan filter'
                                        : 'Belum ada project'
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y divide-gray-200">
                        {projects.data.length > 0 ? (
                            projects.data.map((project) => (
                                <div key={project.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-sm font-mono text-gray-900">
                                            #{project.order_number}
                                        </span>
                                        <div className="flex flex-col gap-1">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[project.status]}`}>
                                                {statusLabels[project.status]}
                                            </span>
                                            {project.has_revision && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Revisi #{project.revision_count}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="text-sm font-medium text-gray-900 mb-1">
                                            {project.service_name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {project.created_at}
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Client:</span>
                                            <span className="text-gray-900">{project.client_name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Deadline:</span>
                                            {project.deadline_date && project.status !== 'completed' && project.payment_status !== 'fully_paid' ? (
                                                <span className="text-orange-600 font-medium">
                                                    {project.deadline_date}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Amount:</span>
                                            <span className="font-semibold text-gray-900">
                                                {formatCurrency(project.total_amount)}
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('programmer.projects.show', project.id)}
                                        className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <p className="text-sm text-gray-500">
                                    {search || status !== 'all' 
                                        ? 'Tidak ada project yang sesuai dengan filter'
                                        : 'Belum ada project'
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {projects.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-center gap-2">
                            {projects.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.visit(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProgrammerLayout>
    );
}
