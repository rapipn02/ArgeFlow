import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import Table from '@/Components/Admin/Table';
import Pagination from '@/Components/Admin/Pagination';
import ActionButtons from '@/Components/Admin/ActionButtons';
import Badge from '@/Components/Admin/Badge';
import TableHeader from '@/Components/Admin/TableHeader';
import SearchFilter from '@/Components/Admin/SearchFilter';
import Modal from '@/Components/Admin/Modal';

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
        const badgeMap = {
            admin: 'purple',
            programmer: 'primary',
            customer: 'default',
        };
        return badgeMap[role] || 'default';
    };

    // Definisi kolom tabel
    const columns = [
        {
            key: 'name',
            label: 'Nama',
            render: (user) => (
                <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                        {user.name}
                    </div>
                </div>
            ),
        },
        {
            key: 'email',
            label: 'Email',
            render: (user) => (
                <div className="text-sm text-gray-900">{user.email}</div>
            ),
        },
        {
            key: 'role',
            label: 'Role',
            render: (user) => (
                <Badge variant={getRoleBadge(user.role)}>
                    {user.role}
                </Badge>
            ),
        },
        {
            key: 'created_at',
            label: 'Terdaftar',
            render: (user) => (
                <span className="text-sm text-gray-500">
                    {user.created_at}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            align: 'right',
            render: (user) => (
                <ActionButtons
                    onDelete={() => handleDelete(user.id)}
                />
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Manajemen User" />

            <div className="space-y-6">
                {/* Header */}
                <TableHeader
                    title="Manajemen User"
                    subtitle="Kelola pengguna dan role"
                    onAdd={() => setShowModal(true)}
                    addButtonText="Tambah User"
                />

                {/* Filters */}
                <SearchFilter
                    searchPlaceholder="Cari nama atau email..."
                    filters={[
                        {
                            label: 'Role',
                            type: 'select',
                            value: filters?.role || 'all',
                            options: [
                                { value: 'all', label: 'Semua Role' },
                                { value: 'admin', label: 'Admin' },
                                { value: 'programmer', label: 'Programmer' },
                                { value: 'customer', label: 'Customer' },
                            ],
                        },
                    ]}
                />

                {/* Table */}
                <Table columns={columns} data={users.data} />

                {/* Pagination */}
                <Pagination data={users} />
            </div>

            {/* Add User Modal */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="Tambah User Baru"
            >
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
                            <option value="programmer">Programmer</option>
                            <option value="admin">Admin</option>
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
            </Modal>
        </AdminLayout>
    );
}
