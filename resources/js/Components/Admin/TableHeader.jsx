import { CirclePlus } from 'lucide-react';

export default function TableHeader({ title, subtitle, onAdd, addButtonText = 'Tambah' }) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && (
                    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                )}
            </div>
            {onAdd && (
                <button
                    onClick={onAdd}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors gap-2"
                >
                    <CirclePlus className="w-5 h-5" />
                    <span className="hidden sm:inline">{addButtonText}</span>
                </button>
            )}
        </div>
    );
}
