import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Search, TrendingUp, MessageSquare, User, Calendar, Package, Filter, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/Components/NavMpruy';

export default function Index({ projects, filters, auth }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('orders.index'), { search, status: statusFilter }, {
            preserveState: true,
            replace: true,
        });
    };

    const statusColors = {
        pending: ' font-semibold text-yellow-800',
        dp_paid: ' font-semibold text-blue-800',
        in_progress: 'font-semibold text-purple-800',
        awaiting_review: 'font-semibold text-pink-800',
        revision_requested: 'font-semibold text-orange-800',
        final_payment: ' font-semibold text-orange-800',
        completed: ' font-semibold text-green-800',
        cancelled: 'font-semibold text-red-800',
    };

    const statusLabels = {
        pending: 'Pending',
        dp_paid: 'DP Paid',
        in_progress: 'In Progress',
        awaiting_review: 'Awaiting Review',
        revision_requested: 'Revision Requested',
        final_payment: 'Final Payment',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Safely get projects data
    const projectsData = projects?.data || [];

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Order" />
            <Navbar auth={auth} />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="space-y-6">
                        {/* Header */}
                        <div className=" border-gray-150 -mx-3">
                            <div className='flex items-center justify-between pb-2 px-6'>
                                <div>
                                    <h1 className="text-1xl font-semibold text-gray-900">   
                                        Daftar Order Saya
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Monitor order dan progress project Anda
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                                    <Package className="w-4 h-4" />
                                    <span className="text-sm font-medium">{projects.total} Projects</span>
                                </div>
                            </div>
                        </div>

                        {/* Search & Filter */}
                        <div className=" p-4 mt-3">
                            <form onSubmit={handleSearch} className="flex gap-3">
                                <div className="flex-1 relative -mt-5">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 " />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="cari "
                                        className="w- pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Orders List */}
                        <div className="grid grid-cols-1 gap-4">
                            {projectsData.length > 0 ? (
                                projectsData.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={route('orders.show', project.id)}
                                        className="bg-slate-50 rounded-xl border border-gray-300 p-6 hover:shadow-lg hover:border-blue-30 transition-all group"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                {/* Order Header */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                                        <Package className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                                #{project.order_number}
                                                            </h3>
                                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                                                                {statusLabels[project.status]}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">
                                                            {project.service_name}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Order Info */}
                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1 mx-5">Status Pembayaran</p>
                                                        <div className="flex items-center gap-1 ">
                                                            <div className="w-4 h-4 text-gray-400" />
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {project.payment_status === 'pending' && 'Pending'}
                                                                {project.payment_status === 'dp_paid' && 'DP Dibayar'}
                                                                {project.payment_status === 'fully_paid' && 'Lunas'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">Tim</p>
                                                        <p className="text-sm font-medium text-gray-900">{project.team_name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                                                        <p className="text-sm font-medium text-gray-900">{formatCurrency(project.total_amount)}</p>
                                                    </div>
                                                </div>

                                                {/* Progress Stats */}
                                                <div className="flex items-center gap-12 p-3 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full  flex items-center justify-center">
                                                            <TrendingUp className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Progress Updates</p>
                                                           <p className="text-sm font-bold text-gray-900">{project.progress_count}</p>
                                                        </div>
                                                    </div>
                                                  
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                                            <MessageSquare className="w-4 h-4 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Total Comments</p>
                                                            <p className="text-sm font-bold text-gray-900">{project.comments_count}</p>
                                                        </div>
                                                    </div>
                                                    {project.latest_progress && (
                                                        <>
                                                           
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                                                    <span className="text-xs font-bold text-green-600">
                                                                        {project.latest_progress.percentage}%
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Latest Progress</p>
                                                                    <p className="text-xs font-medium text-gray-900">
                                                                        {project.latest_progress.created_at}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Arrow Icon */}
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Tidak Ada Order
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        {search || statusFilter ? 'Tidak ditemukan order yang sesuai dengan filter' : 'Belum ada order'}
                                    </p>
                                    <Link
                                        href={route('services.index')}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
                                    >
                                        Lihat Layanan
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {projectsData.length > 0 && projects.links && (
                            <div className="flex items-center justify-between  p-4">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {projects.from} - {projects.to} dari {projects.total} Projects
                                </div>
                                <div className="flex gap-2">
                                    {projects.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}