import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { Plus, Trash2, Mail, Phone, User } from 'lucide-react';

export default function ProgrammersIndex({ programmers, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        hourly_rate: '',
        portfolio_url: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.programmers.store'), formData, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    bio: '',
                    hourly_rate: '',
                    portfolio_url: '',
                });
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus programmer ini?')) {
            router.delete(route('admin.programmers.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Programmer" />

            <div className="space-y-6">
                {/* Header */}
               <div className="border-b border-gray-150 -mx-8">
                    <div className='flex items-center justify-between pb-2 px-6'>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mx-5">
                            Manajemen Programmer
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 mx-5">
                            Kelola data programmer
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-small rounded-lg transition-colors gap-2 mx-4"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Programmer
                    </button>
                    </div>
                </div>


                {/* Programmers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programmers.data.map((programmer) => (
                        <div
                            key={programmer.id}
                            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            {/* Avatar */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-blue-500  flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-xl">
                                        {programmer.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                        {programmer.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Programmer
                                    </p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="truncate">{programmer.email}</span>
                                </div>
                                {programmer.phone && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{programmer.phone}</span>
                                    </div>
                                )}
                            </div>

                            {/* Profile Info */}
                            {programmer.profile && (
                                <div className="space-y-2 mb-4">
                                    {programmer.profile.bio && (
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                            {programmer.profile.bio}
                                        </p>
                                    )}
                                    {programmer.profile.hourly_rate && (
                                        <p className="text-xs text-gray-600">
                                            <span className="font-semibold">Rate:</span> Rp {Number(programmer.profile.hourly_rate).toLocaleString('id-ID')}/jam
                                        </p>
                                    )}
                                    {programmer.profile.portfolio_url && (
                                        <a 
                                            href={programmer.profile.portfolio_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Lihat Portfolio
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Meta Info */}
                            <div className="pt-4 border-t border-gray-200 mb-4">
                                <p className="text-xs text-gray-500">
                                    Bergabung: {programmer.created_at}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(programmer.id)}
                                    className="flex-1 px-3 py-2 text-red-600 hover:bg-red-100 font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {programmers.links && (
                    <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
                        <div className="text-sm text-gray-700">
                            Menampilkan{' '}
                            <span className="font-medium">{programmers.from}</span>{' '}
                            sampai{' '}
                            <span className="font-medium">{programmers.to}</span> dari{' '}
                            <span className="font-medium">{programmers.total}</span>{' '}
                            programmer
                        </div>
                    </div>
                )}
            </div>

            {/* Add Programmer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setShowModal(false)}
                        />
                        <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Tambah Programmer Baru
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                bio: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Deskripsi singkat tentang programmer..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Hourly Rate (Rp/jam)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.hourly_rate}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                hourly_rate: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="50000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Portfolio URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.portfolio_url}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                portfolio_url: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://portfolio.com"
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
