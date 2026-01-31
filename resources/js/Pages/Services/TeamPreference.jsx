import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, Sparkles, ArrowRight, CheckCircle2, User, LogOut } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';

export default function TeamPreference({ auth, service }) {
    const handleChooseTeam = () => {
        router.visit(`/services/${service.id}/teams`);
    };

    const handleAutoAssign = () => {
        // Create order with auto-assign preference
        router.visit(route('orders.create', { 
            service_id: service.id,
            team_preference: 'auto_assign'
        }));
    };

    return (
        <ThemeProvider defaultTheme="light">
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
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border dark:border-white/10 border-gray-200 mb-6">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">Langkah 2 dari 3</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Pilih Tim Programmer
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Anda memilih: <span className="font-semibold text-foreground">{service.name}</span>
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Options Section */}
                <section className="py-">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
                            {/* Option 1: Choose Own Team */}
                            <OptionCard
                                icon={Users}
                                title="Pilih Tim Sendiri"
                                description="Lihat profil tim programmer dan pilih yang sesuai dengan kebutuhan Anda"
                                features={[
                                    'Lihat portfolio tim',
                                    'Cek rating & review',
                                    'Pilih berdasarkan spesialisasi',
                                    'Komunikasi langsung dengan tim'
                                ]}
                                buttonText="Lihat Daftar Tim"
                                onClick={handleChooseTeam}
                                index={0}
                            />

                            {/* Option 2: Auto Assign */}
                            <OptionCard
                                icon={Sparkles}
                                title="Dipilihkan Sistem"
                                description="Sistem akan memilihkan tim terbaik berdasarkan layanan yang Anda pilih"
                                features={[
                                    'Proses lebih cepat',
                                    'Tim dengan rating tertinggi',
                                    'Sesuai dengan budget',
                                    'Garansi kepuasan'
                                ]}
                                buttonText="Buat Order"
                                onClick={handleAutoAssign}
                                popular={true}
                                index={1}
                            />
                        </div>
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

function OptionCard({ icon: Icon, title, description, features, buttonText, onClick, popular = false, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
        >
            {/* Popular Badge */}
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        <span>Rekomendasi</span>
                    </div>
                </div>
            )}

            <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
                popular ? 'border-primary/50 shadow-md' : ''
            }`}>
                <CardHeader className="text-center pb-4">
                    {/* Icon */}
                    <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Features List */}
                    <ul className="space-y-3">
                        {features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                        className="w-full group"
                        size="lg"
                        variant={popular ? 'default' : 'outline'}
                        onClick={onClick}
                    >
                        {buttonText}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
