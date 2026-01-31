import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, CreditCard, FileText, AlertCircle, Calendar, Clock } from 'lucide-react';
import { Users, Sparkles, ArrowRight, CheckCircle2, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import Navbar from '@/Components/NavMpruy';
import { useState, useEffect } from 'react';

export default function Create({ auth, service, team }) {
    // Calculate minimum and default deadline dates
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1); // Minimal besok
    
    const standardDays = service.standard_days || 10;
    const defaultDeadline = new Date(today);
    defaultDeadline.setDate(defaultDeadline.getDate() + standardDays);
    
    const { data, setData, post, processing, errors } = useForm({
        service_id: service.id,
        team_id: team?.id || null,
        team_preference: team ? 'choose_team' : 'auto_assign',
        notes: '',
        requirements: '',
        requested_days: standardDays,
        deadline_date: defaultDeadline.toISOString().split('T')[0], // Format YYYY-MM-DD
    });

    const [priceCalculation, setPriceCalculation] = useState({
        base_price: service.price,
        rush_fee: 0,
        total_price: service.price,
        standard_days: standardDays,
        days_rushed: 0,
        deadline_date: defaultDeadline,
    });

    // Calculate price when deadline_date changes
    useEffect(() => {
        if (!data.deadline_date) return;
        
        const deadline = new Date(data.deadline_date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        deadline.setHours(0, 0, 0, 0);
        
        const diffTime = deadline - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const basePrice = parseFloat(service.price);
        let rushFee = 0;
        let daysRushed = 0;
        let accelerationFactor = 1.0;
        let percentageIncrease = 0;
        let totalPrice = basePrice;
        
        // Dynamic pricing calculation
        if (diffDays < standardDays) {
            daysRushed = standardDays - diffDays;
            
            // Get risk factor from service or default
            const riskFactor = service.risk_factor || 0.75;
            const maxMultiplier = 1.6;
            const minMultiplier = 1.0;
            
            // Calculate acceleration
            const accelerationRatio = standardDays / diffDays;
            accelerationFactor = 1 + ((accelerationRatio - 1) * riskFactor);
            
            // Clamp to min/max
            accelerationFactor = Math.max(minMultiplier, Math.min(maxMultiplier, accelerationFactor));
            
            totalPrice = basePrice * accelerationFactor;
            rushFee = totalPrice - basePrice;
            percentageIncrease = ((accelerationFactor - 1) * 100);
        }
        
        setData('requested_days', diffDays);
        
        setPriceCalculation({
            base_price: basePrice,
            rush_fee: rushFee,
            total_price: totalPrice,
            standard_days: standardDays,
            days_rushed: daysRushed,
            requested_days: diffDays,
            deadline_date: deadline,
            acceleration_factor: accelerationFactor,
            percentage_increase: percentageIncrease,
        });
    }, [data.deadline_date, service]);

    const formatCurrency = (amount) => {
        // Format: Rp 3.000.000 (with dots as thousand separators)
        const formatted = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `Rp ${formatted}`;
    };
    
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Buat Order Baru" />
            <Navbar auth={auth} />


            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 ">
                <div className="container mx-auto  max-w-4xl px-6">
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

                    <div className="grid lg:grid-cols- gap-8">
                        {/* Left: Order Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-50 dark:bg-gray-800/80  rounded-2xl p-6 border border-gray-300 dark:border-gray-700/50"
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
                                    {/* Deadline Selection */}
                                    <div className="bg-gradient-to-br from-slate-20 to-slate-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    Tentukan Deadline Proyek
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Estimasi standar: {priceCalculation.standard_days} hari 
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {/* Date Picker */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                                    Pilih Tanggal Deadline
                                                </label>
                                                <input
                                                    type="date"
                                                    value={data.deadline_date}
                                                    min={minDate.toISOString().split('T')[0]}
                                                    onChange={(e) => setData('deadline_date', e.target.value)}
                                                    className=" px-3 py-3 m-1 text-lg rounded-xl inline-flex border border-gray-300 dark:border-blue-800 bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                />
                                                {errors.requested_days && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.requested_days}</p>
                                                )}
                                                
                                                {/* Date Info */}
                                                {data.deadline_date && (
                                                    <div className="mt-2 inline-block mx-10 p-2  dark:bg-gray-800 rounded-lg  dark:border-blue-700">
                                                        <div className="flex items-start gap-2">
                                                            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                                            <div className="flex-1">
                                                                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                                                    {formatDate(data.deadline_date)}
                                                                </div>
                                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                    {priceCalculation.requested_days} hari dari sekarang
                                                                    {priceCalculation.requested_days < priceCalculation.standard_days && (
                                                                        <span className="ml-2 text-orange-600 dark:text-orange-400 font-semibold">
                                                                            ({priceCalculation.days_rushed} hari lebih cepat)
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Price Breakdown */}
                                            <div className="bg-slate-50 dark:bg-gray-800 rounded-lg p-4 space-y-3 border border-gray-200 dark:border-gray-700">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">Harga Layanan</span>
                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                        {formatCurrency(priceCalculation.base_price)}
                                                    </span>
                                                </div>
                                                
                                                {priceCalculation.rush_fee > 0 && (
                                                    <>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-black dark:text-orange-400 flex items-center gap-1 font-semibold">
                                                                <span></span>
                                                                Biaya Percepatan ({priceCalculation.days_rushed} hari)
                                                            </span>
                                                            <span className="font-semibold text-orange-600 dark:text-orange-400">
                                                                + {formatCurrency(priceCalculation.rush_fee)}
                                                            </span>
                                                        </div>
                                                        <div className="font-semibold text-black dark:text-orange-400  dark:bg-orange-950/30 p-2 rounded flex items-center -mx-1">
                                                            <span></span>
                                                            <span>
                                                                Dipercepat {priceCalculation.percentage_increase.toFixed(0)}% dari estimasi normal
                                                                {priceCalculation.acceleration_factor >= 1.6 && ' (maksimal)'}
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                                
                                                {priceCalculation.rush_fee === 0 && priceCalculation.requested_days >= priceCalculation.standard_days && (
                                                    <div className="text-xs text-green-600 dark:text-green-400  dark:bg-green-950/30 p-2 rounded flex items-center -mx-2 ">
                                                     
                                                        <span>Tidak ada biaya tambahan, sesuai estimasi standar</span>
                                                    </div>
                                                )}
                                                
                                                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="font-bold text-gray-900 dark:text-white">Total Harga</span>
                                                        <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">
                                                            {formatCurrency(priceCalculation.total_price)}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                        <span>DP (40%)</span>
                                                        <span className="font-semibold">{formatCurrency(priceCalculation.total_price * 0.4)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                        <span>Pelunasan (60%)</span>
                                                        <span className="font-semibold">{formatCurrency(priceCalculation.total_price * 0.6)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-200 focus:border-transparent resize-none"
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
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-200 focus:border-transparent resize-none"
                                        />
                                        {errors.requirements && (
                                            <p className="mt-2 text-sm text-red-600">{errors.requirements}</p>
                                        )}
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Semakin detail informasi yang Anda berikan, semakin baik hasil yang akan kami berikan
                                        </p>
                                    </div>

                                    {/* Info Alert */}
                                    <div className=" dark:bg-blue-900/20 rounded-xl p-4 border border-gray-300 dark:border-blue-800">
                                        <div className="flex items-start gap-3">
                                            <div className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 -mx-3" />
                                            <div className="text-sm text-black dark:text-blue-300">
                                                <div className="font-semibold mb-1 text-red-500">Informasi Penting</div>
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

