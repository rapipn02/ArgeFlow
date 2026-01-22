import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { Plus, Users, Star, Activity, UserPlus, UserMinus } from 'lucide-react';

export default function TeamsIndex({ teams, programmers }) {
    const [showModal, setShowModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [assignData, setAssignData] = useState({
        user_id: '',
        role: 'member',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.teams.store'), formData, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({ name: '', description: '' });
            },
        });
    };

    const handleAssignMember = (e) => {
        e.preventDefault();
        router.post(
            route('admin.teams.assign', selectedTeam.id),
            assignData,
            {
                onSuccess: () => {
                    setShowAssignModal(false);
                    setAssignData({ user_id: '', role: 'member' });
                },
            },
        );
    };

    const handleRemoveMember = (teamId, userId) => {
        if (
            confirm('Apakah Anda yakin ingin menghapus programmer dari tim ini?')
        ) {
            router.delete(route('admin.teams.remove-member', [teamId, userId]));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus tim ini?')) {
            router.delete(route('admin.teams.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Tim" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manajemen Tim Programmer
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola tim dan assign programmer
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Tim
                    </button>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {team.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {team.description || 'Tidak ada deskripsi'}
                                    </p>
                                </div>
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        team.status === 'available'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                >
                                    {team.status === 'available'
                                        ? 'Tersedia'
                                        : 'Sibuk'}
                                </span>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                    <Users className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                                    <p className="text-xs text-gray-500">
                                        Anggota
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {team.members_count}
                                    </p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                    <Star className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
                                    <p className="text-xs text-gray-500">
                                        Rating
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {(Number(team.average_rating) || 0).toFixed(1)}
                                    </p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                    <Activity className="w-4 h-4 mx-auto text-blue-400 mb-1" />
                                    <p className="text-xs text-gray-500">
                                        Workload
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {team.workload}
                                    </p>
                                </div>
                            </div>

                            {/* Members */}
                            <div className="mb-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                    Anggota Tim
                                </p>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                    {team.members.length > 0 ? (
                                        team.members.map((member) => (
                                            <div
                                                key={member.id}
                                                className="flex items-center justify-between text-sm py-1"
                                            >
                                                <span className="text-gray-700">
                                                    {member.name}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveMember(
                                                            team.id,
                                                            member.id,
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <UserMinus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">
                                            Belum ada anggota
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedTeam(team);
                                        setShowAssignModal(true);
                                    }}
                                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Assign
                                </button>
                                <button
                                    onClick={() => handleDelete(team.id)}
                                    className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg text-sm transition-colors"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Team Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setShowModal(false)}
                        />
                        <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Tambah Tim Baru
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Tim
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

            {/* Assign Member Modal */}
            {showAssignModal && selectedTeam && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setShowAssignModal(false)}
                        />
                        <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Assign Programmer ke {selectedTeam.name}
                            </h3>
                            <form
                                onSubmit={handleAssignMember}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pilih Programmer
                                    </label>
                                    <select
                                        value={assignData.user_id}
                                        onChange={(e) =>
                                            setAssignData({
                                                ...assignData,
                                                user_id: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">
                                            Pilih programmer...
                                        </option>
                                        {programmers.map((programmer) => (
                                            <option
                                                key={programmer.id}
                                                value={programmer.id}
                                            >
                                                {programmer.name} (
                                                {programmer.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        value={assignData.role}
                                        onChange={(e) =>
                                            setAssignData({
                                                ...assignData,
                                                role: e.target.value,
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., Frontend, Backend, Leader"
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowAssignModal(false)
                                        }
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                                    >
                                        Assign
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
