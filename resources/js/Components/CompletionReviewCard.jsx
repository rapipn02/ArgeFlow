import { useState } from 'react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    XCircle, 
    AlertCircle,
    MessageSquare,
    Upload,
    Send,
    Sparkles,
    ThumbsUp,
    RotateCcw,
    FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';

export default function CompletionReviewCard({ order }) {
    const [showRevisionModal, setShowRevisionModal] = useState(false);
    const [revisionData, setRevisionData] = useState({
        description: '',
        file: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAcceptCompletion = () => {
        if (confirm('Apakah Anda yakin ingin menerima hasil pekerjaan ini? Setelah diterima, Anda akan dialihkan ke pembayaran pelunasan.')) {
            router.post(route('orders.accept-completion', order.id), {}, {
                onStart: () => setIsSubmitting(true),
                onFinish: () => setIsSubmitting(false),
            });
        }
    };

    const handleRequestRevision = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('description', revisionData.description);
        if (revisionData.file) {
            formData.append('file', revisionData.file);
        }

        router.post(route('orders.revisions.store', order.id), formData, {
            onStart: () => setIsSubmitting(true),
            onSuccess: () => {
                setShowRevisionModal(false);
                setRevisionData({ description: '', file: null });
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    const canRequestRevision = order.revision_count < 2;
    const revisionsLeft = 2 - order.revision_count;

    return (
        <>
            <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50/50 to-blue-50/30 dark:from-green-950/20 dark:to-blue-950/20">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-2xl flex items-center gap-2">
                                Proyek Selesai!
                                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </CardTitle>
                            <CardDescription className="text-base mt-1">
                                Programmer telah menyelesaikan 100% pekerjaan
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Status Info */}
                    <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    Silakan Review Hasil Pekerjaan
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Periksa progress yang telah dikerjakan. Anda memiliki 2 opsi:
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <ThumbsUp className="w-4 h-4 text-green-600 mt-0.5" />
                                        <span><strong className="text-gray-900 dark:text-white">Terima Hasil</strong> - Lanjut ke pembayaran pelunasan</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <RotateCcw className="w-4 h-4 text-orange-600 mt-0.5" />
                                        <span><strong className="text-gray-900 dark:text-white">Minta Revisi</strong> - Programmer akan memperbaiki sesuai permintaan Anda ({revisionsLeft}x kesempatan tersisa)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Revision Counter */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
                            <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">Revisi Digunakan</div>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                                {order.revision_count} / 2
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
                            <div className="text-sm text-green-700 dark:text-green-400 mb-1">Revisi Tersisa</div>
                            <div className="text-2xl font-bold text-green-900 dark:text-green-300">
                                {revisionsLeft}x
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Accept Button */}
                        <Button
                            onClick={handleAcceptCompletion}
                            disabled={isSubmitting}
                            size="lg"
                            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Terima & Lanjut Pembayaran
                        </Button>

                        {/* Revision Button */}
                        {canRequestRevision ? (
                            <Button
                                onClick={() => setShowRevisionModal(true)}
                                disabled={isSubmitting}
                                variant="outline"
                                size="lg"
                                className="w-full h-14 text-base font-semibold border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 text-orange-700 dark:text-orange-400"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Minta Revisi ({revisionsLeft}x)
                            </Button>
                        ) : (
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-center justify-center">
                                <div className="text-center">
                                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
                                    <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                                        Batas revisi telah habis
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Revision Modal */}
            <AnimatePresence>
                {showRevisionModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <form onSubmit={handleRequestRevision}>
                                {/* Modal Header */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
                                                <RotateCcw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    Permintaan Revisi
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Revisi ke-{order.revision_count + 1} dari 2
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowRevisionModal(false)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <XCircle className="w-6 h-6 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-6 space-y-4">
                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                            Deskripsi Revisi <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={revisionData.description}
                                            onChange={(e) => setRevisionData({ ...revisionData, description: e.target.value })}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                            placeholder="Jelaskan secara detail apa yang perlu diperbaiki atau ditambahkan..."
                                        />
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Berikan detail yang jelas agar programmer dapat memahami kebutuhan revisi Anda
                                        </p>
                                    </div>

                                    {/* File Upload */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                            Lampiran (Opsional)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                onChange={(e) => setRevisionData({ ...revisionData, file: e.target.files[0] })}
                                                className="hidden"
                                                id="revision-file"
                                            />
                                            <label
                                                htmlFor="revision-file"
                                                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-orange-400 dark:hover:border-orange-600 cursor-pointer transition-colors"
                                            >
                                                <Upload className="w-5 h-5 text-gray-500" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {revisionData.file ? revisionData.file.name : 'Klik untuk upload file'}
                                                </span>
                                            </label>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            Upload sketsa, screenshot, atau file pendukung lainnya (Max 10MB)
                                        </p>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                                    <Button
                                        type="button"
                                        onClick={() => setShowRevisionModal(false)}
                                        variant="outline"
                                        className="flex-1"
                                        disabled={isSubmitting}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                                        disabled={isSubmitting || !revisionData.description}
                                    >
                                        <Send className="w-4 h-4" />
                                        {isSubmitting ? 'Mengirim...' : 'Kirim Revisi'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
