import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import NavMpruy from '@/Components/NavMpruy';
import { 
    ArrowLeft, 
    Plus,
    Upload,
    Send,
    Trash2,
    Edit2,
    MessageSquare,
    CheckCircle,
    Clock,
    User,
    FileText,
    Download,
    X
} from 'lucide-react';

export default function Progress({ order, progressList, canAddProgress }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProgress, setEditingProgress] = useState(null);
    const [activeCommentBox, setActiveCommentBox] = useState(null);

    const progressForm = useForm({
        description: '',
        progress_percentage: 0,
        file: null,
    });

    const commentForm = useForm({
        comment: '',
    });

    const handleSubmitProgress = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('description', progressForm.data.description);
        formData.append('progress_percentage', progressForm.data.progress_percentage);
        if (progressForm.data.file) {
            formData.append('file', progressForm.data.file);
        }

        if (editingProgress) {
            router.post(route('programmer.orders.progress.update', { order: order.id, progress: editingProgress.id }), {
                _method: 'PUT',
                ...Object.fromEntries(formData)
            }, {
                onSuccess: () => {
                    setEditingProgress(null);
                    progressForm.reset();
                },
            });
        } else {
            router.post(route('programmer.orders.progress.store', order.id), formData, {
                onSuccess: () => {
                    setShowAddModal(false);
                    progressForm.reset();
                },
            });
        }
    };

    const handleDeleteProgress = (progressId) => {
        if (confirm('Yakin ingin menghapus progress ini?')) {
            router.delete(route('programmer.orders.progress.destroy', { order: order.id, progress: progressId }));
        }
    };

    const handleSubmitComment = (progressId) => {
        commentForm.post(route('orders.progress.comments.store', { order: order.id, progress: progressId }), {
            onSuccess: () => {
                commentForm.reset();
                setActiveCommentBox(null);
            },
        });
    };

    const handleDeleteComment = (progressId, commentId) => {
        if (confirm('Yakin ingin menghapus komentar?')) {
            router.delete(route('orders.progress.comments.destroy', { 
                order: order.id, 
                progress: progressId,
                comment: commentId 
            }));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Progress Order #${order.order_number}`} />
            <NavMpruy />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.visit(route('orders.show', order.id))}
                                className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </motion.button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Progress Tracking
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Order #{order.order_number} - {order.service_name}
                                </p>
                            </div>
                        </div>

                        {canAddProgress && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="font-medium">Tambah Progress</span>
                            </motion.button>
                        )}
                        
                        {!canAddProgress && ['programmer'].includes(window.Laravel?.auth?.user?.role) && (
                            <div className="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-xl border border-yellow-200 dark:border-yellow-800">
                                <p className="text-sm font-medium">
                                    {order.status === 'pending' ? 
                                        'Menunggu pembayaran DP untuk mulai mengirim progress' : 
                                        'Anda tidak memiliki akses untuk menambah progress'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Progress Timeline */}
                    <div className="space-y-6">
                        <AnimatePresence>
                            {progressList.length > 0 ? (
                                progressList.map((progress, index) => (
                                    <motion.div
                                        key={progress.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative"
                                    >
                                        {/* Timeline Line */}
                                        {index !== progressList.length - 1 && (
                                            <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent dark:from-blue-800" />
                                        )}

                                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-shadow">
                                            {/* Progress Header */}
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                                                        {progress.progress_percentage}%
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {progress.programmer.name}
                                                        </h3>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {progress.created_at}
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress.progress_percentage}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                                                        />
                                                    </div>

                                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                                        {progress.description}
                                                    </p>

                                                    {/* File Attachment */}
                                                    {progress.file_path && (() => {
                                                        const fileExtension = progress.file_path.split('.').pop().toLowerCase();
                                                        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
                                                        
                                                        return isImage ? (
                                                            <div className="mt-3">
                                                                <img
                                                                    src={`/storage/${progress.file_path}`}
                                                                    alt="Progress attachment"
                                                                    className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-600"
                                                                    style={{ maxHeight: '400px' }}
                                                                />
                                                                <a
                                                                    href={`/storage/${progress.file_path}`}
                                                                    target="_blank"
                                                                    className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                                                >
                                                                    <Download className="w-3 h-3" />
                                                                    Lihat ukuran penuh
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <a
                                                                href={`/storage/${progress.file_path}`}
                                                                target="_blank"
                                                                className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm transition-colors"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                                <span>Download File</span>
                                                            </a>
                                                        );
                                                    })()}
                                                </div>

                                                {/* Action Buttons */}
                                                {canAddProgress && progress.programmer.id === window.Laravel?.auth?.user?.id && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleDeleteProgress(progress.id)}
                                                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Comments Section */}
                                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <MessageSquare className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {progress.comments.length} Komentar
                                                    </span>
                                                </div>

                                                {/* Comments List */}
                                                <div className="space-y-3 mb-4">
                                                    {progress.comments.map((comment) => (
                                                        <div key={comment.id} className="flex gap-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-sm">
                                                                {comment.user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        {comment.user.name}
                                                                    </span>
                                                                    <span className="text-xs px- py-0.5 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                                                        {comment.user.role}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {comment.created_at}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                                    {comment.comment}
                                                                </p>
                                                            </div>
                                                            {comment.user.id === window.Laravel?.auth?.user?.id && (
                                                                <button
                                                                    onClick={() => handleDeleteComment(progress.id, comment.id)}
                                                                    className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded transition-colors"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Add Comment */}
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleSubmitComment(progress.id);
                                                    }}
                                                    className="flex gap-2"
                                                >
                                                    <input
                                                        type="text"
                                                        value={activeCommentBox === progress.id ? commentForm.data.comment : ''}
                                                        onChange={(e) => {
                                                            setActiveCommentBox(progress.id);
                                                            commentForm.setData('comment', e.target.value);
                                                        }}
                                                        placeholder="Tulis komentar..."
                                                        className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    />
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        type="submit"
                                                        disabled={!commentForm.data.comment || commentForm.processing}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <Send className="w-5 h-5" />
                                                    </motion.button>
                                                </form>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        <Clock className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Belum Ada Progress
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Progress proyek akan ditampilkan di sini
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Add Progress Modal */}
                    <AnimatePresence>
                        {showAddModal && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                                onClick={() => setShowAddModal(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 20 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Tambah Progress Baru
                                        </h2>
                                        <button
                                            onClick={() => setShowAddModal(false)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmitProgress} className="space-y-4">
                                        {/* Progress Percentage */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Persentase Progress
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={progressForm.data.progress_percentage}
                                                    onChange={(e) => progressForm.setData('progress_percentage', parseInt(e.target.value))}
                                                    className="flex-1"
                                                />
                                                <div className="w-20 text-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-bold">
                                                    {progressForm.data.progress_percentage}%
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Deskripsi Progress
                                            </label>
                                            <textarea
                                                value={progressForm.data.description}
                                                onChange={(e) => progressForm.setData('description', e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Jelaskan progress yang telah dikerjakan..."
                                                required
                                            />
                                        </div>

                                        {/* File Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                File Lampiran (Optional)
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                                <input
                                                    type="file"
                                                    onChange={(e) => progressForm.setData('file', e.target.files[0])}
                                                    className="hidden"
                                                    id="file-upload"
                                                    accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png"
                                                />
                                                <label htmlFor="file-upload" className="cursor-pointer">
                                                    <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {progressForm.data.file ? progressForm.data.file.name : 'Klik untuk upload file'}
                                                    </p>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowAddModal(false)}
                                                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={progressForm.processing}
                                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 transition-all"
                                            >
                                                {progressForm.processing ? 'Menyimpan...' : 'Simpan Progress'}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
