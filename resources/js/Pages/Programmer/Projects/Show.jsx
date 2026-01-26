import { Head, Link } from '@inertiajs/react';
import ProgrammerLayout from '@/Layouts/ProgrammerLayout';
import { ArrowLeft, User, Mail, Phone, DollarSign, Calendar, FileText, Users } from 'lucide-react';

export default function Show({ project }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        dp_paid: 'bg-blue-100 text-blue-800',
        in_progress: 'bg-purple-100 text-purple-800',
        final_payment: 'bg-orange-100 text-orange-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
        pending: 'Pending',
        dp_paid: 'DP Paid - Ready to Start',
        in_progress: 'In Progress',
        final_payment: 'Awaiting Final Payment',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };

    return (
        <ProgrammerLayout>
            <Head title={`Project #${project.order_number}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('programmer.projects.index')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-1xl font-semibold text-gray-900">
                                    Project Detail
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Order #{project.order_number}
                                </p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                            {statusLabels[project.status]}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Service Info */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Informasi Service
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Nama Service
                                    </label>
                                    <p className="text-base font-semibold text-gray-900 mt-1">
                                        {project.service.name}
                                    </p>
                                </div>
                                {project.service.description && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            Deskripsi
                                        </label>
                                        <p className="text-sm text-gray-700 mt-1">
                                            {project.service.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Requirements */}
                        {project.requirements && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Requirements Project
                                    </h2>
                                </div>
                                <div className="prose max-w-none">
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {project.requirements}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {project.notes && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Catatan Tambahan
                                </h2>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {project.notes}
                                </p>
                            </div>
                        )}

                        {/* Team Members */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Team: {project.team.name}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.team.members.map((member, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate text-sm">
                                                {member.name}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Client Info */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Informasi Client
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Nama</p>
                                        <p className="font-medium text-gray-900 text-sm">
                                            {project.client.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900 text-sm break-all">
                                            {project.client.email}
                                        </p>
                                    </div>
                                </div>
                                {project.client.phone && (
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="font-medium text-gray-900 text-sm">
                                                {project.client.phone}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Detail Pembayaran
                                </h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-sm text-gray-600">Total Amount</span>
                                    <span className="font-bold text-gray-900 text-sm">
                                        {formatCurrency(project.total_amount)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">DP (40%)</span>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {formatCurrency(project.dp_amount)}
                                        </p>
                                        {project.dp_paid_at && (
                                            <p className="text-xs text-green-600">
                                                Paid: {project.dp_paid_at}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Final (60%)</span>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {formatCurrency(project.final_amount)}
                                        </p>
                                        {project.final_paid_at && (
                                            <p className="text-xs text-green-600">
                                                Paid: {project.final_paid_at}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Timeline
                                </h2>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-gray-500">Created</p>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {project.created_at}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProgrammerLayout>
    );
}
