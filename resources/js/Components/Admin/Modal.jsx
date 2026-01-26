import { X } from 'lucide-react';

export default function Modal({ show, onClose, title, children, maxWidth = 'max-w-lg' }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={onClose}
                />
                <div className={`relative bg-white rounded-lg ${maxWidth} w-full p-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
