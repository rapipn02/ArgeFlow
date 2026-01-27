import { Head, Link, useForm, router } from '@inertiajs/react';
import ProgrammerLayout from '@/Layouts/ProgrammerLayout';
import { ArrowLeft, User, Mail, Phone, DollarSign, Calendar, FileText, Users, Plus, TrendingUp, Upload, X, MessageSquare, Download } from 'lucide-react';
import { useState } from 'react';

export default function Show({ project, progressList, canAddProgress }) {
    const [showProgressModal, setShowProgressModal] = useState(false);
    
    const progressForm = useForm({
        description: '',
        progress_percentage: 0,
        file: null,
    });
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleSubmitProgress = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('description', progressForm.data.description);
        formData.append('progress_percentage', progressForm.data.progress_percentage);
        if (progressForm.data.file) {
            formData.append('file', progressForm.data.file);
        }

        router.post(route('programmer.orders.progress.store', project.id), formData, {
            onSuccess: () => {
                setShowProgressModal(false);
                progressForm.reset();
            },
        });
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        dp_paid: 'bg-blue-100 text-blue-800',
        in_progress: 'bg-purple-100 text-purple-800',
        final_payment: 'bg-orange-100 text-orange-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
        pending: 'Pending',
        dp_paid: 'DP Paid - Ready to Start',
        in_progress: 'In Progress',
        final_payment: 'Awaiting Final Payment',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };

    return (
        <ProgrammerLayout>
            <Head title={`Project #${project.order_number}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8 -mt-3">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('programmer.projects.index')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-1xl font-semibold text-gray-900">
                                    Project Detail
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Order #{project.order_number}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                                {statusLabels[project.status]}
                            </span>
                            {canAddProgress && (
                                <button
                                    onClick={() => setShowProgressModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="font-medium">Kirim Progress</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* DP Not Paid Alert */}
                        {!canAddProgress && project.status === 'pending' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-yellow-900 mb-1">
                                            Menunggu Pembayaran DP
                                        </h3>
                                        <p className="text-sm text-yellow-700">
                                            Project ini belum bisa dikerjakan. Fitur pengiriman progress akan aktif setelah client melakukan pembayaran DP.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Service Info */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Informasi Service
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Nama Service
                                    </label>
                                    <p className="text-base font-semibold text-gray-900 mt-1">
                                        {project.service.name}
                                    </p>
                                </div>
                                {project.service.description && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            Deskripsi
                                        </label>
                                        <p className="text-sm text-gray-700 mt-1">
                                            {project.service.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Requirements */}
                        {project.requirements && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Requirements Project
                                    </h2>
                                </div>
                                <div className="prose max-w-none">
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {project.requirements}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {project.notes && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Catatan Tambahan
                                </h2>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {project.notes}
                                </p>
                            </div>
                        )}

                        {/* Team Members */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Team: {project.team.name}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.team.members.map((member, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate text-sm">
                                                {member.name}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Progress History */}
                        {canAddProgress && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-blue-600" />
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Riwayat Progress
                                        </h2>
                                    </div>
                                    <Link
                                        href={route('orders.progress', project.id)}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Lihat Detail →
                                    </Link>
                                </div>
                                
                                {progressList.length > 0 ? (
                                    <div className="space-y-3">
                                        {progressList.slice(0, 5).map((progress) => (
                                            <div key={progress.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                                            {progress.progress_percentage}%
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 text-sm">
                                                                {progress.programmer.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {progress.created_at}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {progress.comments_count > 0 && (
                                                        <div className="flex items-center gap-1 text-gray-500">
                                                            <MessageSquare className="w-4 h-4" />
                                                            <span className="text-xs">{progress.comments_count}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-700 line-clamp-2">
                                                    {progress.description}
                                                </p>
                                                {progress.file_path && (() => {
                                                    const fileExtension = progress.file_path.split('.').pop().toLowerCase();
                                                    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
                                                    
                                                    return isImage ? (
                                                        <div className="mt-2">
                                                            <img
                                                                src={`/storage/${progress.file_path}`}
                                                                alt="Progress"
                                                                className="w-full h-auto rounded-lg border border-gray-200"
                                                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <a
                                                            href={`/storage/${progress.file_path}`}
                                                            target="_blank"
                                                            className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-700"
                                                        >
                                                            <Download className="w-3 h-3" />
                                                            File terlampir
                                                        </a>
                                                    );
                                                })()}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">Belum ada progress yang dikirim</p>
                                        <p className="text-xs mt-1">Klik tombol "Kirim Progress" untuk mulai update progress</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Client Info */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Informasi Client
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Nama</p>
                                        <p className="font-medium text-gray-900 text-sm">
                                            {project.client.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900 text-sm break-all">
                                            {project.client.email}
                                        </p>
                                    </div>
                                </div>
                                {project.client.phone && (
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="font-medium text-gray-900 text-sm">
                                                {project.client.phone}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Detail Pembayaran
                                </h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-sm text-gray-600">Total Amount</span>
                                    <span className="font-bold text-gray-900 text-sm">
                                        {formatCurrency(project.total_amount)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">DP (40%)</span>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {formatCurrency(project.dp_amount)}
                                        </p>
                                        {project.dp_paid_at && (
                                            <p className="text-xs text-green-600">
                                                Paid: {project.dp_paid_at}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Final (60%)</span>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {formatCurrency(project.final_amount)}
                                        </p>
                                        {project.final_paid_at && (
                                            <p className="text-xs text-green-600">
                                                Paid: {project.final_paid_at}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Timeline
                                </h2>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-gray-500">Created</p>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {project.created_at}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Modal */}
                {showProgressModal && (
                    <div 
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowProgressModal(false)}
                    >
                        <div 
                            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Kirim Progress Baru
                                </h2>
                                <button
                                    onClick={() => setShowProgressModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitProgress} className="space-y-4">
                                {/* Progress Percentage */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Persentase Progress
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={progressForm.data.progress_percentage}
                                            onChange={(e) => progressForm.setData('progress_percentage', parseInt(e.target.value))}
                                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="w-16 text-center">
                                            <span className="text-2xl font-bold text-blue-600">
                                                {progressForm.data.progress_percentage}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi Progress
                                    </label>
                                    <textarea
                                        value={progressForm.data.description}
                                        onChange={(e) => progressForm.setData('description', e.target.value)}
                                        rows="5"
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Jelaskan progress yang telah dikerjakan..."
                                        required
                                    />
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        File Lampiran (Optional)
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                        <input
                                            type="file"
                                            onChange={(e) => progressForm.setData('file', e.target.files[0])}
                                            className="hidden"
                                            id="file-upload"
                                            accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-600">
                                                {progressForm.data.file ? progressForm.data.file.name : 'Klik untuk upload file'}
                                            </p>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowProgressModal(false)}
                                        className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={progressForm.processing}
                                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {progressForm.processing ? 'Mengirim...' : 'Kirim Progress'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </ProgrammerLayout>
    );
}
