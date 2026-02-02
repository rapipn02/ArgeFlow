import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Send } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';

export default function TeamRatingModal({ order, show, onClose }) {
    const [hoveredRating, setHoveredRating] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 0,
        review: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (data.rating === 0) {
            alert('Silakan pilih rating bintang terlebih dahulu');
            return;
        }

        post(route('team-ratings.store', { order: order.id }), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Beri Rating Tim Programmer
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Order #{order.order_number}
                        </p>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6 -mt-4 border-t">
                        {/* Team Info */}
                        {order.team && (
                            <div className="dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            {order.team.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white mx-2">
                                            {order.team.name}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {order.service.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Rating Stars */}
                        <div className="text-center">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Berikan Rating <span className="text-red-500">*</span>
                            </label>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        type="button"
                                        onClick={() => setData('rating', star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-12 h-12 transition-all ${
                                                star <= (hoveredRating || data.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300 dark:text-gray-600'
                                            }`}
                                        />
                                    </motion.button>
                                ))}
                            </div>
                            {data.rating > 0 && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                                >
                                    {data.rating === 5 && '⭐ Luar biasa!'}
                                    {data.rating === 4 && '😊 Sangat Baik!'}
                                    {data.rating === 3 && '👍 Baik'}
                                    {data.rating === 2 && '😐 Cukup'}
                                    {data.rating === 1 && '😞 Kurang Memuaskan'}
                                </motion.p>
                            )}
                            {errors.rating && (
                                <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                            )}
                        </div>

                        {/* Review Text */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Review (Opsional)
                            </label>
                            <textarea
                                value={data.review}
                                onChange={(e) => setData('review', e.target.value)}
                                rows={4}
                                placeholder="Bagikan pengalaman Anda bekerja dengan tim ini..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                maxLength={1000}
                            />
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                                {data.review.length}/1000 karakter
                            </div>
                            {errors.review && (
                                <p className="mt-1 text-sm text-red-600">{errors.review}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing || data.rating === 0}
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                            >
                                <Send className="w-5 h-5" />
                                <span>{processing ? 'Mengirim...' : 'Kirim Rating'}</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
