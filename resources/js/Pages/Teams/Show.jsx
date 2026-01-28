import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Users, Sparkles, ArrowRight, CheckCircle2, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';
import { 
    Star, 
    ArrowLeft,
    Briefcase,
    CreditCard,
} from 'lucide-react';

export default function Show({auth, team, serviceId }) {
    const handleSelectTeam = () => {
        router.visit(route('orders.create', { 
            service_id: serviceId,
            team_id: team.id,
            team_preference: 'choose_team'
        }));
    };

    return (
        <AuthenticatedLayout>
            <Navbar auth={auth} />

            <Head title={`Tim ${team.name}`} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Kembali ke Daftar Tim</span>
                    </motion.button>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Team Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Team Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="p-4 bg-blue-600 rounded-2xl">
                                        <Users className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                            {team.name}
                                        </h1>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {team.description}
                                        </p>
                                        
                                        {/* Stats */}
                                        <div className="flex flex-wrap gap-6">
                                            <div className="flex items-center gap-2">
                                                <Star className="w-5 h-5 text-yellow-500" />
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {parseFloat(team.average_rating || 0).toFixed(1)}
                                                </span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    ({team.ratings_count || 0} reviews)
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-blue-500" />
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {team.completed_projects || 0}
                                                </span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    projects
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Specializations */}
                            {team.specializations && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Award className="w-6 h-6 text-blue-600" />
                                        Spesialisasi
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {team.specializations.split(',').map((spec, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium"
                                            >
                                                {spec.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Team Members */}
                            {team.members && team.members.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Users className="w-6 h-6 text-blue-600" />
                                        Anggota Tim
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {team.members.map((member, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
                                            >
                                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {member.name?.charAt(0) || 'M'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">
                                                        {member.name}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        {member.role || 'Team Member'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Right: Action Card */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 sticky top-24"
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Pilih Tim Ini
                                </h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Tim berpengalaman dengan rating tinggi
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Sudah menyelesaikan {team.completed_projects || 0} project
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Garansi kepuasan pelanggan
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSelectTeam}
                                    className="w-full py-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    <span>Pilih Tim & Lanjut Pembayaran</span>
                                </motion.button>

                                <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                                    Anda akan diarahkan ke halaman order untuk melanjutkan pembayaran
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function Navbar({ auth }) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="ArgeFlow Logo" 
                            className="w-12 h-12 object-contain"
                        />
                        <span className="font-bold text-xl">ArgeFlow</span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        
                        {/* User Menu */}
                        <div className="flex items-center gap-2">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium">{auth.user.name}</p>
                                <p className="text-xs text-muted-foreground">{auth.user.email}</p>
                            </div>
                            

                            
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                            >
                                <LogOut className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
