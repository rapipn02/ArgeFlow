import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { Plus, Trash2, Edit, ToggleLeft, ToggleRight, DollarSign } from 'lucide-react';

export default function ServicesIndex({ services }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        estimated_days: '',
        features: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            features: formData.features
                ? formData.features.split('\n').filter((f) => f.trim())
                : [],
        };
        router.post(route('admin.services.store'), data, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    estimated_days: '',
                    features: '',
                    is_active: true,
                });
            },
        });
    };

    const handleToggle = (id) => {
        router.post(route('admin.services.toggle', id));
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Layanan" />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8">
                    <div className='flex items-center justify-between pb-2 px-6'>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manajemen Layanan
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola layanan dan harga
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors gap-2 mx-4"
                    >
                        <Plus className="w-5 h-5" />
                       
                    </button>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`bg-slate-50 rounded-xl border border-gray-300 p-6 hover:shadow-lg transition-all ${
                                service.is_active ? '' : 'opacity-50'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {service.name}
                                    </h3>
                                    {service.category && (
                                        <span className="inline-block mt-1 px-2 py-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {service.category}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleToggle(service.id)}
                                    className={`p-3 rounded-lg transition-colors  -mx-2 -mt-2 ${
                                        service.is_active
                                            ? ' text-green-600'
                                            : ' text-gray-400 '
                                    }`}
                                >
                                    {service.is_active ? (
                                        <ToggleRight className="w-6 h-6" />
                                    ) : (
                                        <ToggleLeft className="w-6 h-6" />
                                    )}
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {service.description}
                            </p>

                            {/* Price */}
                            <div className="mb-2 p-1 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        Harga
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-4 h-4 text-green-600" />
                                        <span className="text-lg font-bold text-gray-900">
                                            {service.formatted_price}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Estimated Days */}
                            {service.estimated_days && (
                                <div className="mb-4 flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Estimasi Pengerjaan
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {service.estimated_days} hari
                                    </span>
                                </div>
                            )}

                            {/* Features */}
                            {service.features && service.features.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                        Fitur
                                    </p>
                                    <ul className="space-y-1 max-h-32 overflow-y-auto">
                                        {service.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="text-sm text-gray-600 flex items-start gap-2"
                                            >
                                                <span className="text-blue-600 mt-3">
                                                    •
                                                </span>
                                                <span className="flex-1">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}


                            {/* Actions */}
                            <div className="flex gap-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="flex-1 px-3 py-2  text-red-600 hover:bg-red-100 font-medium rounded-lg text-sm transition-colors"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Service Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setShowModal(false)}
                        />
                        <div className="relative bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Tambah Layanan Baru
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Layanan
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
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows={3}
                                            className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Harga (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    price: e.target.value,
                                                })
                                            }
                                            className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kategori
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Web Development"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Estimasi Hari
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.estimated_days}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    estimated_days:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fitur (satu per baris)
                                        </label>
                                        <textarea
                                            value={formData.features}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    features: e.target.value,
                                                })
                                            }
                                            rows={4}
                                            className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Responsive Design&#10;SEO Optimized&#10;Admin Panel"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_active}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        is_active:
                                                            e.target.checked,
                                                    })
                                                }
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                Aktifkan layanan
                                            </span>
                                        </label>
                                    </div>
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
