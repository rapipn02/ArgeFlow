import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { 
    Download, 
    Printer, 
    ArrowLeft,
    Building2,
    Calendar,
    FileText,
    CheckCircle2
} from 'lucide-react';
import Navbar from '@/Components/NavMpruy';


export default function Show({ order,auth }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Invoice #${order.order_number}`} />
            <Navbar auth={auth} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 print:bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Action Buttons - Hidden on print */}
                    <div className="flex items-center justify-between mb-8 print:hidden">
                        <Link
                            href={route('orders.show', { order: order.id })}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Kembali ke Order</span>
                        </Link>

                        <div className="flex gap-3">
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print</span>
                            </button>
                            
                        </div>
                    </div>

                    {/* Invoice */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 print:shadow-none print:border-0"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-12 pb-8 border-b border-gray-200 dark:border-gray-700">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    INVOICE
                                </h1>
                                <div className="text-gray-600 dark:text-gray-400">
                                    <div className="font-semibold">ArgeFlow</div>
                                    <div className="text-sm">Software Development Services</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Invoice Number</div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    #{order.order_number}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Billing Info */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                                    <Building2 className="w-4 h-4" />
                                    <span>BILLED TO</span>
                                </div>
                                <div className="text-gray-900 dark:text-white">
                                    <div className="font-semibold text-lg">{order.user.name}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {order.user.email}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                                    <FileText className="w-4 h-4" />
                                    <span>SERVICE DETAILS</span>
                                </div>
                                <div className="text-gray-900 dark:text-white">
                                    <div className="font-semibold">{order.service.name}</div>
                                    {order.team && (
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Tim: {order.team.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-12">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            DESCRIPTION
                                        </th>
                                        <th className="text-right py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            AMOUNT
                                        </th>
                                        <th className="text-right py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            STATUS
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <td className="py-4 text-gray-900 dark:text-white">
                                            <div className="font-medium">Down Payment (40%)</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Initial payment for project kickoff
                                            </div>
                                        </td>
                                        <td className="py-4 text-right font-semibold text-gray-900 dark:text-white">
                                            Rp {order.dp_amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="py-4 text-right">
                                            {order.dp_paid_at ? (
                                                <span className="inline-flex items-center gap-1 text-green-600">
                                                    <div className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Paid</span>
                                                </span>
                                            ) : (
                                                <span className="text-sm font-medium text-yellow-600">Pending</span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <td className="py-4 text-gray-900 dark:text-white">
                                            <div className="font-medium">Final Payment (60%)</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Final payment upon project completion
                                            </div>
                                        </td>
                                        <td className="py-4 text-right font-semibold text-gray-900 dark:text-white">
                                            Rp {order.final_amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="py-4 text-right">
                                            {order.final_paid_at ? (
                                                <span className="inline-flex items-center gap-1 text-green-600">
                                                    <div className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Paid</span>
                                                </span>
                                            ) : (
                                                <span className="text-sm font-medium text-yellow-600">Pending</span>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Payment Summary */}
                        <div className="flex justify-end mb-12">
                            <div className="w-full md:w-1/2">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>Rp {order.total_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax (0%)</span>
                                        <span>Rp 0</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            Total
                                        </span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            Rp {order.total_amount.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    {order.payment_status === 'dp_paid' && (
                                        <div className="flex justify-between text-blue-600 font-semibold">
                                            <span>Amount Due</span>
                                            <span>Rp {order.final_amount.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                    {order.payment_status === 'fully_paid' && (
                                        <div className="flex justify-between text-green-600 font-semibold">
                                            <span>Amount Paid</span>
                                            <span>Rp {order.total_amount.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Payment History */}
                        {(order.dp_paid_at || order.final_paid_at) && (
                            <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                                    <Calendar className="w-4 h-4" />
                                    <span>PAYMENT HISTORY</span>
                                </div>
                                <div className="space-y-2">
                                    {order.dp_paid_at && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                DP Payment
                                            </span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {new Date(order.dp_paid_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    {order.final_paid_at && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Final Payment
                                            </span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {new Date(order.final_paid_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <p className="mb-2">Terimakasih Sudah Mempercayakan Kami untuk Membuat Layanan Anda, Salam Hangat Kami, ArgeFlow</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
