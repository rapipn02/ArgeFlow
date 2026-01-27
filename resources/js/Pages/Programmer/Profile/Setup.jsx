import { Head, useForm } from '@inertiajs/react';
import ProgrammerLayout from '@/Layouts/ProgrammerLayout';
import { FileText, DollarSign, Link as LinkIcon, CreditCard, ArrowRight } from 'lucide-react';

export default function Setup() {
    const { data, setData, post, processing, errors } = useForm({
        bio: '',
        hourly_rate: '',
        portfolio_url: '',
        bank_name: '',
        bank_account_number: '',
        bank_account_holder: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('programmer.profile.setup.store'));
    };

    return (
        <ProgrammerLayout>
            <Head title="Profile Setup" />

            <div className="max-w-3xl mx-auto space-y-6 -mt-3">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Selamat Datang! Mari Setup Profile Anda
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Lengkapi profile Anda untuk mulai menerima project
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Professional Information */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Profesional
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FileText className="w-4 h-4 inline mr-2" />
                                    Bio / Tentang Saya *
                                </label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                    placeholder="Ceritakan tentang diri Anda, skill, dan pengalaman..."
                                    required
                                />
                                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-2" />
                                        Tarif Per Jam (IDR)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.hourly_rate}
                                        onChange={(e) => setData('hourly_rate', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                        placeholder="150000"
                                        min="0"
                                    />
                                    {errors.hourly_rate && <p className="text-red-500 text-sm mt-1">{errors.hourly_rate}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <LinkIcon className="w-4 h-4 inline mr-2" />
                                        URL Portfolio
                                    </label>
                                    <input
                                        type="url"
                                        value={data.portfolio_url}
                                        onChange={(e) => setData('portfolio_url', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                        placeholder="https://yourportfolio.com"
                                    />
                                    {errors.portfolio_url && <p className="text-red-500 text-sm mt-1">{errors.portfolio_url}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Account Information */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Rekening Bank
                            </h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Informasi ini diperlukan untuk menerima pembayaran earnings Anda
                        </p>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Bank *
                                </label>
                                <input
                                    type="text"
                                    value={data.bank_name}
                                    onChange={(e) => setData('bank_name', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                    placeholder="BCA, Mandiri, BNI, dll."
                                    required
                                />
                                {errors.bank_name && <p className="text-red-500 text-sm mt-1">{errors.bank_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nomor Rekening *
                                </label>
                                <input
                                    type="text"
                                    value={data.bank_account_number}
                                    onChange={(e) => setData('bank_account_number', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 font-mono"
                                    placeholder="1234567890"
                                    required
                                />
                                {errors.bank_account_number && <p className="text-red-500 text-sm mt-1">{errors.bank_account_number}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Pemilik Rekening *
                                </label>
                                <input
                                    type="text"
                                    value={data.bank_account_holder}
                                    onChange={(e) => setData('bank_account_holder', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                    placeholder="John Doe"
                                    required
                                />
                                {errors.bank_account_holder && <p className="text-red-500 text-sm mt-1">{errors.bank_account_holder}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Menyimpan...' : 'Selesaikan Setup'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </ProgrammerLayout>
    );
}
