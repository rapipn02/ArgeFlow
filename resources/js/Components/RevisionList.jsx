import { motion } from 'framer-motion';
import { 
    AlertCircle, 
    CheckCircle2,
    Clock,
    FileText,
    Download,
    Calendar,
    RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

export default function RevisionList({ revisions = [] }) {
    if (!revisions || revisions.length === 0) {
        return null;
    }

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        };
        return colors[status] || colors.pending;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="w-4 h-4" />;
            case 'in_progress':
                return <Clock className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getStatusText = (status) => {
        const texts = {
            pending: 'Menunggu',
            in_progress: 'Sedang Dikerjakan',
            completed: 'Selesai',
        };
        return texts[status] || status;
    };

    return (
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <RotateCcw className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    Riwayat Revisi
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {revisions.map((revision, index) => (
                        <motion.div
                            key={revision.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-orange-50/30 dark:from-gray-900/50 dark:to-orange-950/20 border border-gray-200 dark:border-gray-700"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                                        R{revision.revision_number}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            Revisi #{revision.revision_number}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-3 h-3" />
                                            <span>{revision.created_at}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(revision.status)}`}>
                                    {getStatusIcon(revision.status)}
                                    {getStatusText(revision.status)}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {revision.description}
                                </p>
                            </div>

                            {/* File Attachment */}
                            {revision.file_path && (
                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <a
                                        href={`/storage/${revision.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-600 transition-colors text-sm"
                                    >
                                        <FileText className="w-4 h-4 text-orange-600" />
                                        <span className="text-gray-700 dark:text-gray-300">Lihat Lampiran</span>
                                        <Download className="w-4 h-4 text-gray-500" />
                                    </a>
                                </div>
                            )}

                            {/* Client Info */}
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Diminta oleh: <span className="font-semibold text-gray-700 dark:text-gray-300">{revision.client?.name || 'Client'}</span>
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Info Footer */}
                <div className="mt-4 p-3 rounded-lg border">
                    <p className="text-sm text-blue-700 dark:text-blue-400 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5" />
                        <span>Programmer akan menyelesaikan revisi dan mengirimkan progress 100% yang baru</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
