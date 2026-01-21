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
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentType, setPaymentType] = useState('dp'); // 'dp' or 'final'

    const amount = paymentType === 'dp' ? order.dp_amount : order.final_amount;

    // Payment methods with icons
    const paymentMethods = [
        {
            id: 'credit_card',
            name: 'Kartu Kredit/Debit',
            icon: CreditCard,
            description: 'Visa, Mastercard, JCB',
            color: 'from-blue-500 to-blue-600',
        },
        {
            id: 'gopay',
            name: 'GoPay',
            icon: Wallet,
            description: 'Bayar dengan GoPay',
            color: 'from-green-500 to-green-600',
        },
        {
            id: 'qris',
            name: 'QRIS',
            icon: QrCode,
            description: 'Scan QR Code',
            color: 'from-purple-500 to-purple-600',
        },
        {
            id: 'bank_transfer',
            name: 'Transfer Bank',
            icon: Building2,
            description: 'BCA, BNI, BRI, Permata',
            color: 'from-indigo-500 to-indigo-600',
        },
        {
            id: 'shopeepay',
            name: 'ShopeePay',
            icon: Smartphone,
            description: 'Bayar dengan ShopeePay',
            color: 'from-orange-500 to-orange-600',
        },
    ];

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
        if (!selectedMethod) {
            alert('Pilih metode pembayaran terlebih dahulu');
            return;
        }

        setIsProcessing(true);

        try {
            // Get Snap token from backend using axios (auto-handles CSRF)
            const response = await axios.post(route('payment.token', { order: order.id }), {
                payment_type: paymentType,
            });

            const data = response.data;

            if (data.snap_token) {
                // Open Snap payment popup
                window.snap.pay(data.snap_token, {
                    onSuccess: function(result) {
                        router.visit(route('payment.success', { order_id: order.id }));
                    },
                    onPending: function(result) {
                        router.visit(route('orders.show', { order: order.id }));
                    },
                    onError: function(result) {
                        router.visit(route('payment.failed', { order_id: order.id }));
                    },
                    onClose: function() {
                        setIsProcessing(false);
                    }
                });
            } else {
                throw new Error('No snap token received');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Terjadi kesalahan saat memproses pembayaran: ' + (error.response?.data?.message || error.message));
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

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Payment Methods */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Pilih Metode Pembayaran
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Pilih metode pembayaran yang paling nyaman untuk Anda
                                </p>
                            </motion.div>

                            {/* Payment Type Selection */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Tipe Pembayaran
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setPaymentType('dp')}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            paymentType === 'dp'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                DP (40%)
                                            </div>
                                            <div className="text-2xl font-bold text-blue-600 mt-1">
                                                Rp {order.dp_amount.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setPaymentType('final')}
                                        disabled={order.payment_status !== 'dp_paid'}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            paymentType === 'final'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                        } ${order.payment_status !== 'dp_paid' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                Pelunasan (60%)
                                            </div>
                                            <div className="text-2xl font-bold text-blue-600 mt-1">
                                                Rp {order.final_amount.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Payment Methods */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Metode Pembayaran
                                </h3>
                                <div className="grid gap-4">
                                    {paymentMethods.map((method, index) => {
                                        const Icon = method.icon;
                                        return (
                                            <motion.button
                                                key={method.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * index }}
                                                onClick={() => setSelectedMethod(method.id)}
                                                className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 ${
                                                    selectedMethod === method.id
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-[1.02]'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-md'
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {/* Icon with gradient */}
                                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${method.color} text-white`}>
                                                        <Icon className="w-6 h-6" />
                                                    </div>

                                                    {/* Method Info */}
                                                    <div className="flex-1 text-left">
                                                        <div className="font-semibold text-gray-900 dark:text-white">
                                                            {method.name}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                                            {method.description}
                                                        </div>
                                                    </div>

                                                    {/* Selected Indicator */}
                                                    {selectedMethod === method.id && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="text-blue-600"
                                                        >
                                                            <CheckCircle2 className="w-6 h-6" />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 sticky top-24"
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
                                        <span>Total Harga</span>
                                        <span>Rp {order.total_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>DP (40%)</span>
                                        <span>Rp {order.dp_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Pelunasan (60%)</span>
                                        <span>Rp {order.final_amount.toLocaleString('id-ID')}</span>
                                    </div>
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
                                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-green-600 mt-0.5" />
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
                                    disabled={!selectedMethod || isProcessing}
                                    className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all ${
                                        !selectedMethod || isProcessing
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
