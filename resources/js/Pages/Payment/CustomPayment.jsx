import { useState, useEffect } from 'react';
import { Head, router,Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Star, Users, CheckCircle2, ArrowRight, User, LogOut, Briefcase, Award } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';
import { 
    CreditCard, 
    Wallet, 
    Building2, 
    Smartphone, 
    QrCode,
    ArrowLeft,
    Shield,
    Clock
} from 'lucide-react';

export default function CustomPayment({ auth,order, midtransClientKey }) {
    const [isProcessing, setIsProcessing] = useState(false);
    // Auto-detect payment type: if dp already paid, default to 'final'
    const [paymentType, setPaymentType] = useState(
        order.payment_status === 'dp_paid' ? 'final' : 'dp'
    );

    const amount = paymentType === 'dp' ? order.dp_amount : order.final_amount;

    // Payment methods with icons


    // Load Midtrans Snap script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', midtransClientKey);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [midtransClientKey]);

const handlePayment = async () => {
    setIsProcessing(true);

    try {
        const response = await axios.post(
            route('payment.token', { order: order.id }),
            { payment_type: paymentType }
        );

        const data = response.data;

        if (data.snap_token) {
            window.snap.pay(data.snap_token, {
                onSuccess: () => {
                    router.visit(route('payment.success', { order_id: order.id }));
                },
                onPending: () => {
                    router.visit(route('orders.show', { order: order.id }));
                },
                onError: () => {
                    router.visit(route('payment.failed', { order_id: order.id }));
                },
                onClose: () => {
                    setIsProcessing(false);
                }
            });
        }
    } catch (error) {
        console.error(error);
        alert('Gagal memproses pembayaran');
        setIsProcessing(false);
    }
};





    return (
        <AuthenticatedLayout>
            <Head title="Pembayaran" />
            <Navbar auth={auth} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.visit(route('orders.show', { order: order.id }))}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Kembali ke Detail Order</span>
                    </motion.button>

                    <div className="grid lg:grid-cols-1 gap-8">


                        {/* Right: Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-50 dark:bg-gray-800/80  rounded-xl p-6 border border-gray-300 dark:border-gray-700/50 sticky top-24"
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Ringkasan Order
                                </h3>

                                {/* Order Details */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Nomor Order
                                        </div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {order.order_number}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Layanan
                                        </div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {order.service.name}
                                        </div>
                                    </div>

                                    {order.team && (
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Tim
                                            </div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {order.team.name}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Price Breakdown */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Harga Layanan</span>
                                        <span>Rp {(order.total_amount - (order.rush_fee || 0)).toLocaleString('id-ID')}</span>
                                    </div>
                                    
                                    {order.rush_fee > 0 && (
                                        <div className="flex justify-between text-orange-600 dark:text-orange-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                Biaya Rush
                                            </span>
                                            <span>+ Rp {order.rush_fee.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between font-semibold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-3">
                                        <span>Total Harga</span>
                                        <span>Rp {order.total_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                                        <span>DP (40%)</span>
                                        <span>Rp {order.dp_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                                        <span>Pelunasan (60%)</span>
                                        <span>Rp {order.final_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    
                                    {order.requested_days && (
                                        <div className="mt-4 -mx-3  dark:bg-blue-950/30 rounded-lg">
                                            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                                                <div className="w-4 h-4" />
                                                <div>
                                                    <div className="font-semibold">Deadline Pengerjaan</div>    
                                                    {order.deadline_date && (
                                                        <div className="text-xs">Target: {new Date(order.deadline_date).toLocaleDateString('id-ID')}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Amount to Pay */}
                                <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Total Bayar
                                        </span>
                                        <span className="text-2xl font-bold text-blue-600">
                                            Rp {amount.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                {/* Security Info */}
                                <div className="mt-6 p-4 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                    <div className="flex items-start gap-1">
                                        <div className="w-5 h-5 text-green-600 mt-0.5" />
                                        <div className="text-sm text-green-800 dark:text-green-300">
                                            <div className="font-semibold mb-1">Pembayaran Aman</div>
                                            <div className="text-xs">
                                                Transaksi Anda dilindungi dengan enkripsi SSL dan diproses oleh Midtrans
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all ${
                                        isProcessing
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                    }`}
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Clock className="w-5 h-5 animate-spin" />
                                            <span>Memproses...</span>
                                        </div>
                                    ) : (
                                        'Bayar Sekarang'
                                    )}
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


function Navbar({ auth }) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="ArgeFlow Logo" 
                            className="w-12 h-12 object-contain"
                        />
                        <span className="font-bold text-xl">ArgeFlow</span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        
                        {/* User Menu */}
                        <div className="flex items-center gap-2">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium">{auth.user.name}</p>
                                <p className="text-xs text-muted-foreground">{auth.user.email}</p>
                            </div>
                            
                            <Link href={route('profile.edit')}>
                                <Button variant="ghost" size="icon">
                                    <User className="w-5 h-5" />
                                </Button>
                            </Link>
                            
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                            >
                                <LogOut className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function OptionCard({ icon: Icon, title, description, features, buttonText, onClick, popular = false, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
        >
            {/* Popular Badge */}
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        <span>Rekomendasi</span>
                    </div>
                </div>
            )}

            <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
                popular ? 'border-primary/50 shadow-md' : ''
            }`}>
                <CardHeader className="text-center pb-4">
                    {/* Icon */}
                    <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Features List */}
                    <ul className="space-y-3">
                        {features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                        className="w-full group"
                        size="lg"
                        variant={popular ? 'default' : 'outline'}
                        onClick={onClick}
                    >
                        {buttonText}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
