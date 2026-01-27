import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, TrendingUp, MessageSquare, User, Calendar, Package, Download, DollarSign } from 'lucide-react';

export default function Show({ project, progressList }) {
    const statusColors = {
        pending: ' font-semibold text-yellow-800',
        dp_paid: ' font-semibold text-blue-800',
        in_progress: 'font-semibold text-purple-800',
        final_payment: ' font-semibold text-orange-800',
        completed: ' font-semibold text-green-800',
        cancelled: 'font-semibold text-red-800',
    };

    const statusLabels = {
        pending: 'Pending',
        dp_paid: 'DP Paid',
        in_progress: 'In Progress',
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

    return (
        <AdminLayout>
            <Head title={`Progress - ${project.order_number}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.progress.index')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-1xl font-semibold text-gray-900">
                                    Progress & Comments Detail
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Order #{project.order_number}
                                </p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                            {statusLabels[project.status]}
                        </span>
                    </div>
                </div>

                {/* Project Info Card */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Service</p>
                            <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-gray-400" />
                                <p className="text-sm font-semibold text-gray-900">{project.service_name}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Client</p>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 text-gray-400 -mx-3" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{project.client_name}</p>
                                    <p className="text-xs text-gray-500"></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Team</p>
                            <p className="text-sm font-semibold text-gray-900">{project.team_name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                            <div className="flex items-center gap- -mx-4">
                                <div className="w-4 h-4 text-gray-400" />
                                <p className="text-sm font-semibold text-gray-900">{formatCurrency(project.total_amount)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Timeline */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Progress Timeline ({progressList.length})
                        </h2>
                    </div>

                    {progressList.length > 0 ? (
                        progressList.map((progress, index) => (
                            <div key={progress.id} className="bg-slate-50 rounded-xl border border-gray-200 overflow-hidden">
                                {/* Progress Header */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                                            {progress.progress_percentage}%
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">
                                                    {progress.programmer.name}
                                                </h3>
                                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                                                    Programmer
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4" />
                                                {progress.created_at}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Description */}
                                    <div className="mb-4">
                                        <p className="text-gray-700 whitespace-pre-wrap">
                                            {progress.description}
                                        </p>
                                    </div>

                                    {/* File Attachment */}
                                    {progress.file_path && (() => {
                                        const fileExtension = progress.file_path.split('.').pop().toLowerCase();
                                        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
                                        
                                        return isImage ? (
                                            <div>
                                                <img
                                                    src={`/storage/${progress.file_path}`}
                                                    alt="Progress attachment"
                                                    className="max-w-full h-auto rounded-lg border border-gray-200"
                                                    style={{ maxHeight: '400px' }}
                                                />
                                                <a
                                                    href={`/storage/${progress.file_path}`}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:underline"
                                                >
                                                    <Download className="w-3 h-3" />
                                                    Lihat ukuran penuh
                                                </a>
                                            </div>
                                        ) : (
                                            <a
                                                href={`/storage/${progress.file_path}`}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>Download File</span>
                                            </a>
                                        );
                                    })()}
                                </div>

                                {/* Comments Section */}
                                {progress.comments.length > 0 && (
                                    <div className="p-6 bg-gray-50">
                                        <div className="flex items-center gap-2 mb-4">
                                            <MessageSquare className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {progress.comments.length} Komentar
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {progress.comments.map((comment) => (
                                                <div key={comment.id} className="flex gap-3 bg-gray-20 rounded-lg p-4 border border-gray-200">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                                                        {comment.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {comment.user.name}
                                                            </span>
                                                            <span className="text-[0.625rem] px-1 py-0.5 text-blue-500 rounded-full -mx-2">
                                                                {comment.user.role}
                                                            </span>
                                                            <span className="text-xs text-gray-500 mx-1">
                                                                {comment.created_at}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">
                                                            {comment.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum Ada Progress
                            </h3>
                            <p className="text-gray-500">
                                Project ini belum memiliki progress yang dikirim
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
