import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { Plus, Search, Filter, Trash2, Edit, Eye,CirclePlus } from 'lucide-react';

export default function TransactionsIndex({ transactions, filters }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        type: 'income',
        category: 'project payment',
        amount: '',
        description: '',
        transaction_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.transactions.store'), formData, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    type: 'income',
                    category: 'project payment',
                    amount: '',
                    description: '',
                    transaction_date: new Date().toISOString().split('T')[0],
                });
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
            router.delete(route('admin.transactions.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Transaksi" />

            <div className="space-y-6 ">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-150 -mx-8 ">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div>
                        <h1 className="text-2xl font-bold text-gray-900 mx-7">
                            Manajemen Transaksi
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 mx-7">
                            Kelola semua transaksi keuangan
                        </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-white-700 text-white font-medium rounded-lg transition-colors gap-2 mx-7"
                    >
                        <CirclePlus className="w-4 h-4" />
                    </button>
                </div>

                {/* Filters */}
                <div className=" border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tipe
                            </label>
                            <select className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                <option value="all">Semua</option>
                                <option value="income">Pemasukan</option>
                                <option value="expense">Pengeluaran</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kategori
                            </label>
                            <select className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                <option value="all">Semua</option>
                                <option value="project payment">
                                    Pembayaran Proyek
                                </option>
                                <option value="salary">Gaji</option>
                                <option value="operational">Operasional</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full divide-y mt-6">
                            <thead className="">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Deskripsi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tipe
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nominal
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.data.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {transaction.formatted_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {transaction.description}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Oleh: {transaction.created_by}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                                {transaction.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    transaction.type ===
                                                    'income'
                                                        ? 'text-green-800'
                                                        : ' text-red-800'
                                                }`}
                                            >
                                                {transaction.type === 'income'
                                                    ? 'Pemasukan'
                                                    : 'Pengeluaran'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span
                                                className={`text-sm font-semibold ${
                                                    transaction.type ===
                                                    'income'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                {transaction.signed_amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() =>
                                                    handleDelete(transaction.id)
                                                }
                                                className="text-red-600 hover:text-red-900 ml-3"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y divide-gray-200">
                        {transactions.data.map((transaction) => (
                            <div key={transaction.id} className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 mb-1">
                                            {transaction.description}
                                        </div>
                                        <div className="text-xs text-gray-500 mb-2">
                                            Oleh: {transaction.created_by}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {transaction.formatted_date}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(transaction.id)}
                                        className="text-red-600 hover:text-red-900 ml-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-gray-800">
                                        {transaction.category}
                                    </span>
                                    <span
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            transaction.type === 'income'
                                                ? 'text-green-800'
                                                : 'text-red-800'
                                        }`}
                                    >
                                        {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`text-sm font-semibold ${
                                            transaction.type === 'income'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {transaction.signed_amount}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {transactions.links && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 mt-4 mb-4">
                            <div className="flex items-center justify-between mt-3">
                                <div className="text-sm text-gray-700">
                                    Menampilkan{' '}
                                    <span className="font-medium">
                                        {transactions.from}
                                    </span>{' '}
                                    sampai{' '}
                                    <span className="font-medium">
                                        {transactions.to}
                                    </span>{' '}
                                    dari{' '}
                                    <span className="font-medium">
                                        {transactions.total}
                                    </span>{' '}
                                    transaksi
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Transaction Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setShowModal(false)}
                        />
                        <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Tambah Transaksi
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipe
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                type: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="income">
                                            Pemasukan
                                        </option>
                                        <option value="expense">
                                            Pengeluaran
                                        </option>
                                    </select>
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
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nominal
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                amount: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
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
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.transaction_date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                transaction_date:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
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
