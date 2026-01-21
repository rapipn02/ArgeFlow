import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Star, Users, CheckCircle2, ArrowRight, User, LogOut, Briefcase, Award } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';
import { useState } from 'react';

export default function TeamList({ auth, teams, filters, serviceId }) {
    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
        <ThemeProvider defaultTheme="dark">
            <div className="min-h-screen bg-background">
                <Head title="Pilih Tim Programmer" />
                
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Main Content */}
                <main className="pt-20">
                    {/* Hero Section */}
                    <section className="py-12 border-b border-border/40">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="max-w-3xl mx-auto text-center"
                            >
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Pilih Tim Programmer Anda
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Semua tim sudah lengkap dengan UI/UX Designer, Frontend, dan Backend Developer
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Teams Grid */}
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            {teams.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Tidak ada tim yang tersedia saat ini.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                    {teams.map((team, index) => (
                                        <TeamCard
                                            key={team.id}
                                            team={team}
                                            index={index}
                                            isSelected={selectedTeam === team.id}
                                            onSelect={() => setSelectedTeam(team.id)}
                                            serviceId={serviceId}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </ThemeProvider>
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
                            
                            <Link href={route('profile.edit')}>
                                <Button variant="ghost" size="icon">
                                    <User className="w-5 h-5" />
                                </Button>
                            </Link>
                            
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

function TeamCard({ team, index, isSelected, onSelect, serviceId }) {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
                );
            } else {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                );
            }
        }
        return stars;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className={`h-full transition-all duration-300 hover:shadow-lg cursor-pointer ${
                isSelected ? 'ring-2 ring-primary' : ''
            }`} onClick={onSelect}>
                <CardHeader className="pb-4">
                    {/* Team Avatar & Name */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-xl mb-1">{team.name}</CardTitle>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {renderStars(team.average_rating)}
                                </div>
                                <span className="text-sm font-semibold text-foreground">
                                    {parseFloat(team.average_rating || 0).toFixed(1)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    ({team.ratings_count} reviews)
                                </span>
                            </div>
                        </div>
                    </div>

                    <CardDescription className="text-sm">
                        {team.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Briefcase className="w-4 h-4 text-primary" />
                                <span className="text-2xl font-bold text-primary">
                                    {team.completed_projects}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Projects Done</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Award className="w-4 h-4 text-primary" />
                                <span className="text-2xl font-bold text-primary">
                                    {team.specialization}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Specialization</p>
                        </div>
                    </div>

                    {/* Team Members */}
                    <div>
                        <p className="text-sm font-semibold mb-3">Team Members:</p>
                        <div className="space-y-2">
                            {team.members.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-semibold text-white">
                                            {member.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{member.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                                    </div>
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/teams/${team.id}${serviceId ? `?service_id=${serviceId}` : ''}`}>
                        <Button className="w-full group mt-5" size="lg">
                            Pilih Tim Ini
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    );
}
