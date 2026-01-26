import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { Plus, Trash2, Edit, Shield, CirclePlus } from 'lucide-react';

export default function UsersIndex({ users, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
        phone: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.users.store'), formData, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'customer',
                    phone: '',
                });
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    const getRoleBadge = (role) => {
        const badges = {
            admin: ' text-purple-800',
            programmer: 'text-blue-800',
            customer: 'text-gray-800',
        };
        return badges[role] || badges.customer;
    };

    return (
        <AdminLayout>
            <Head title="Manajemen User" />

            <div className="space-y-8">
                {/* Header */}
               <div className="border-b border-gray-150 -mx-8">
                    <div className='flex items-center justify-between pb-2 px-6'>
                    <div>
                        <h1 className="text-1xl font-semibold text-gray-900 mx-5 -py-3">
                            Manajemen User
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 mx-5">
                            Kelola pengguna dan role
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-white-700 text-white font-medium rounded-lg transition-colors gap-2 mx-5"
                    >
                        <CirclePlus className="w-4 h-4" />
                    </button>
                    </div>
                </div>

              

                {/* Users Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 mb-6 mt-8">
                            <thead className="bg-white-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Terdaftar
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-0 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(
                                                    user.role,
                                                )}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.created_at}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                            <div className="flex items-center justify-between mb-6 mt-5">
                                <div className="text-sm text-gray-700">
                                    Menampilkan{' '}
                                    <span className="font-medium">
                                        {users.from}
                                    </span>{' '}
                                    sampai{' '}
                                    <span className="font-medium">
                                        {users.to}
                                    </span>{' '}
                                    dari{' '}
                                    <span className="font-medium">
                                        {users.total}
                                    </span>{' '}
                                    user
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setShowModal(false)}
                        />
                        <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-5">
                                Tambah User Baru
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama
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
                                        Role
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                role: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="programmer">
                                            Programmer
                                        </option>
                                        <option value="admin">
                                            Admin
                                        </option>
                                    </select>
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
