import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Code, Smartphone, ShoppingCart, Palette, LogOut, User, Clock } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';
import Navbar from '@/Components/NavMpruy';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ServiceSelection({ auth }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch services from API
        axios.get(route('api.services.index'))
            .then(response => {
                if (response.data.success) {
                    setServices(response.data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <ThemeProvider defaultTheme="dark">
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <Head title="Pilih Layanan" />
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Memuat layanan...</p>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
    return (
        <ThemeProvider defaultTheme="dark">
            <div className="min-h-screen bg-background">
                <Head title="Pilih Layanan" />
                
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Main Content */}
                <main className="pt-20">
                    {/* Hero Section */}
                    <section className="py-16 border-b border-border/40">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="max-w-3xl mx-auto text-center"
                            >
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Pilih Layanan yang Anda Butuhkan
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Pilih paket layanan yang sesuai dengan kebutuhan project Anda
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Services Grid */}
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                                {services.map((service, index) => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </ThemeProvider>
    );
}

function ServiceCard({ service, index }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Parse features if it's a JSON string
    const features = typeof service.features === 'string' 
        ? JSON.parse(service.features) 
        : (Array.isArray(service.features) ? service.features : []);

    const popular = service.category === 'popular' || service.name.toLowerCase().includes('company');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative group ${popular ? 'lg:scale-105' : ''}`}
        >
            {/* Popular Badge */}
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-lg">
                        <span>Paling Populer</span>
                    </div>
                </div>
            )}

            {/* Card */}
            <div className={`relative h-full p-8 rounded-2xl glass border-2 transition-all duration-300 ${
                popular 
                    ? 'border-primary/50 bg-card/50 dark:border-primary/50' 
                    : 'dark:border-white/10 border-gray-200 hover:border-primary/50'
            }`}>
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                        <p className="text-muted-foreground text-sm">{service.description}</p>
                    </div>

                    {/* Standard Days Info */}
                    <div className="mb-4 flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg">
                        <Clock className="w-4 h-4" />
                        <span>Estimasi: {service.standard_days || 10} hari</span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-primary">
                                {formatPrice(service.price)}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            DP 40% • Final 60%
                        </p>
                        <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                            + Rp 50k/hari untuk pengerjaan lebih cepat
                        </p>
                    </div>

                    {/* Features */}
                    {features.length > 0 && (
                        <ul className="space-y-3 mb-8">
                            {features.slice(0, 6).map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* CTA Button */}
                    <Link href={`/services/${service.id}/team-preference`}>
                        <Button 
                            className={`w-full group/btn ${popular ? '' : 'variant-outline'}`}
                            variant={popular ? 'default' : 'outline'}
                        >
                            Pilih Layanan
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
