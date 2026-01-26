import { Trash2, Edit, Eye } from 'lucide-react';

export default function ActionButtons({ onEdit, onDelete, onView }) {
    return (
        <div className="flex items-center justify-end gap-2">
            {onView && (
                <button
                    onClick={onView}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                    title="Lihat"
                >
                    <Eye className="w-4 h-4" />
                </button>
            )}
            {onEdit && (
                <button
                    onClick={onEdit}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    title="Edit"
                >
                    <Edit className="w-4 h-4" />
                </button>
            )}
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Hapus"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
