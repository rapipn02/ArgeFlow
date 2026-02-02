import { Head } from '@inertiajs/react';
import ProgrammerLayout from '@/Layouts/ProgrammerLayout';
import { Users, Star, Briefcase, CheckCircle } from 'lucide-react';

export default function Index({ teams }) {
    return (
        <ProgrammerLayout>
            <Head title="My Teams" />

            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-150 -mx-8 -mt-3">
                    <div className='flex items-center justify-between pb-2 px-6'>
                        <div>
                            <h1 className="text-1xl font-semibold text-gray-900">
                                My Teams
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Team yang Anda ikuti
                            </p>
                        </div>
                    </div>
                </div>

                {/* Teams Grid */}
                {teams.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {teams.map((team) => (
                            <div key={team.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden ">
                                {/* Team Header */}
                                <div className=" p-6 text-blue-600 -mt-2">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-lg bg-blue-100 backdrop-blur-sm flex items-center justify-center text-xl font-bold">
                                            {team.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                                            <p className="text-blue-600 text-sm capitalize">{team.specialization}</p>
                                            <div className="flex items-center -mx-2">
                                                <span className="px-2 py-1  backdrop-blur-sm rounded-full text-xs font-medium capitalize text-blue-600">
                                                    {team.my_role}
                                                </span>
                                                {team.is_available && (
                                                    <span className="px-2 py-1 backdrop-blur-sm rounded-full text-xs font-medium text-green-700">
                                                        Available
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Team Stats */}
                                <div className="p-6 border-t -mt-5">
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="text-xl font-bold text-gray-900">
                                                    {parseFloat(team.average_rating || 0).toFixed(1)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">Rating</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <Briefcase className="w-4 h-4 text-blue-500" />
                                                <span className="text-xl font-bold text-gray-900">
                                                    {team.active_projects}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">Active</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-xl font-bold text-gray-900">
                                                    {team.completed_projects}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">Completed</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {team.description && (
                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                                Deskripsi
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {team.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Team Members */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Users className="w-4 h-4 text-gray-600" />
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                Anggota Team ({team.members.length})
                                            </h4>
                                        </div>
                                        <div className="space-y-2">
                                            {team.members.map((member) => (
                                                <div key={member.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
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

                                    {/* Joined Date */}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-xs text-gray-500">
                                            Bergabung pada {team.joined_at}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                        <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Belum ada team
                        </h3>
                        <p className="text-sm text-gray-500">
                            Anda belum ditugaskan ke team manapun. Hubungi admin untuk bergabung dengan team.
                        </p>
                    </div>
                )}
            </div>
        </ProgrammerLayout>
    );
}
