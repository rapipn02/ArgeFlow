import { Head, useForm, Link } from '@inertiajs/react';
import ProgrammerLayout from '@/Layouts/ProgrammerLayout';
import { User, Mail, Phone, FileText, DollarSign, Link as LinkIcon, CreditCard, Save, ArrowLeft } from 'lucide-react';

export default function Edit({ profile }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: profile.name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        hourly_rate: profile.hourly_rate || '',
        portfolio_url: profile.portfolio_url || '',
        bank_name: profile.bank_name || '',
        bank_account_number: profile.bank_account_number || '',
        bank_account_holder: profile.bank_account_holder || '',
        is_available: profile.is_available ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('programmer.profile.update'));
    };

    return (
        <ProgrammerLayout>
            <Head title="Edit Profile" />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('programmer.dashboard')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-1xl font-semibold text-gray-900">
                                    Edit Profile
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Update informasi personal dan profesional Anda
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className=" border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Personal
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-2" />
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    Nomor Telepon
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                    placeholder="+62 812 3456 7890"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status Ketersediaan
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setData('is_available', !data.is_available)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            data.is_available ? 'bg-green-600' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                data.is_available ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                    <span className="text-sm text-gray-700">
                                        {data.is_available ? 'Tersedia untuk project' : 'Tidak tersedia'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className=" border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Profesional
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FileText className="w-4 h-4 inline mr-2" />
                                    Bio / Tentang Saya
                                </label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                    placeholder="Ceritakan tentang diri Anda, skill, dan pengalaman..."
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
                    <div className=" border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Rekening Bank
                            </h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Informasi ini diperlukan untuk menerima pembayaran earnings Anda
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Bank
                                </label>
                                <input
                                    type="text"
                                    value={data.bank_name}
                                    onChange={(e) => setData('bank_name', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                    placeholder="BCA, Mandiri, BNI, dll."
                                />
                                {errors.bank_name && <p className="text-red-500 text-sm mt-1">{errors.bank_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nomor Rekening
                                </label>
                                <input
                                    type="text"
                                    value={data.bank_account_number}
                                    onChange={(e) => setData('bank_account_number', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 font-mono"
                                    placeholder="1234567890"
                                />
                                {errors.bank_account_number && <p className="text-red-500 text-sm mt-1">{errors.bank_account_number}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Pemilik Rekening
                                </label>
                                <input
                                    type="text"
                                    value={data.bank_account_holder}
                                    onChange={(e) => setData('bank_account_holder', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                                    placeholder="John Doe"
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
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </ProgrammerLayout>
    );
}
