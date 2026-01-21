import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, CreditCard, FileText, AlertCircle } from 'lucide-react';
import Navbar from '@/Components/Landing/Navbar';

export default function Create({ service, team }) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: service.id,
        team_id: team?.id || null,
        team_preference: team ? 'choose_team' : 'auto_assign',
        notes: '',
        requirements: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Buat Order Baru" />
            <Navbar />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Kembali</span>
                    </motion.button>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Order Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-blue-600 rounded-2xl">
                                        <Package className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Buat Order Baru
                                        </h1>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Lengkapi informasi order Anda
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Notes */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                            Catatan (Opsional)
                                        </label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={4}
                                            placeholder="Tambahkan catatan khusus untuk order ini..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        />
                                        {errors.notes && (
                                            <p className="mt-2 text-sm text-red-600">{errors.notes}</p>
                                        )}
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                            Kebutuhan & Spesifikasi (Opsional)
                                        </label>
                                        <textarea
                                            value={data.requirements}
                                            onChange={(e) => setData('requirements', e.target.value)}
                                            rows={6}
                                            placeholder="Jelaskan kebutuhan dan spesifikasi project Anda secara detail..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        />
                                        {errors.requirements && (
                                            <p className="mt-2 text-sm text-red-600">{errors.requirements}</p>
                                        )}
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Semakin detail informasi yang Anda berikan, semakin baik hasil yang akan kami berikan
                                        </p>
                                    </div>

                                    {/* Info Alert */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div className="text-sm text-blue-800 dark:text-blue-300">
                                                <div className="font-semibold mb-1">Informasi Penting</div>
                                                <ul className="list-disc list-inside space-y-1 text-xs">
                                                    <li>Setelah order dibuat, Anda akan diarahkan ke halaman pembayaran</li>
                                                    <li>Pembayaran DP sebesar 40% dari total harga</li>
                                                    <li>Tim akan mulai bekerja setelah DP dibayar</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                                            processing
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                        }`}
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>{processing ? 'Memproses...' : 'Buat Order & Lanjut Pembayaran'}</span>
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 sticky top-24"
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Ringkasan Order
                                </h3>

                                {/* Service Info */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Layanan
                                        </div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {service.name}
                                        </div>
                                    </div>

                                    {team && (
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                Tim
                                            </div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {team.name}
                                            </div>
                                        </div>
                                    )}

                                    {!team && (
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                Preferensi Tim
                                            </div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                Dipilihkan Sistem
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Price Breakdown */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Total Harga</span>
                                        <span>Rp {service.price.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>DP (40%)</span>
                                        <span>Rp {(service.price * 0.4).toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Pelunasan (60%)</span>
                                        <span>Rp {(service.price * 0.6).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                {/* Total to Pay */}
                                <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Pembayaran Pertama (DP)
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600">
                                        Rp {(service.price * 0.4).toLocaleString('id-ID')}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
