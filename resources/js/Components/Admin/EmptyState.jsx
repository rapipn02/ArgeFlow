import { Package } from 'lucide-react';

export default function EmptyState({ 
    icon: Icon = Package, 
    title = 'Tidak ada data', 
    description = 'Belum ada data untuk ditampilkan',
    action 
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 mb-6">
                {description}
            </p>
            {action && action}
        </div>
    );
}
