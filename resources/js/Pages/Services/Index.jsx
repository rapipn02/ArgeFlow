import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Code, Smartphone, ShoppingCart, Palette, LogOut, User } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';

const services = [
    {
        id: 1,
        name: 'Website Landing Page',
        price: 3000000,
        description: 'Cocok untuk bisnis yang ingin memiliki website profesional',
        features: [
            'Responsive Design',
            'SEO Optimized',
            'Fast Loading',
            '1 Halaman',
            'Contact Form',
            'Google Maps Integration',
        ],
        icon: Code,
        popular: false,
    },
    {
        id: 2,
        name: 'Web Company Profile',
        price: 8000000,
        description: 'Solusi lengkap untuk website perusahaan dengan CMS',
        features: [
            '5-7 Halaman',
            'CMS Integration',
            'Admin Panel',
            'Blog System',
            'Gallery',
            'SEO Optimized',
            'Email Integration',
            'Analytics Dashboard',
        ],
        icon: Palette,
        popular: true,
    },
    {
        id: 3,
        name: 'E-Commerce Website',
        price: 15000000,
        description: 'Toko online lengkap dengan payment gateway',
        features: [
            'Product Management',
            'Shopping Cart',
            'Payment Gateway',
            'Order Management',
            'Customer Dashboard',
            'Admin Panel',
            'Email Notifications',
            'Analytics & Reports',
        ],
        icon: ShoppingCart,
        popular: false,
    },
    {
        id: 4,
        name: 'Mobile App (Android)',
        price: 20000000,
        description: 'Aplikasi Android native dengan performa optimal',
        features: [
            'Native Android',
            'Material Design',
            'Push Notifications',
            'Offline Mode',
            'API Integration',
            'Google Play Ready',
            'Analytics',
            'In-App Updates',
        ],
        icon: Smartphone,
        popular: false,
    },
];

export default function ServiceSelection({ auth }) {
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

function ServiceCard({ service, index }) {
    const Icon = service.icon;

    const formatPrice = (price) => {
        return `Rp ${(price / 1000000).toFixed(1)}jt`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative group ${service.popular ? 'lg:scale-105' : ''}`}
        >
            {/* Popular Badge */}
            {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-lg">
                        <span>Paling Populer</span>
                    </div>
                </div>
            )}

            {/* Card */}
            <div className={`relative h-full p-8 rounded-2xl glass border-2 transition-all duration-300 ${
                service.popular 
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

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-primary">
                                {formatPrice(service.price)}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            DP 40% • Final 60%
                        </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <Link href={`/services/${service.id}/team-preference`}>
                        <Button 
                            className={`w-full group/btn ${service.popular ? '' : 'variant-outline'}`}
                            variant={service.popular ? 'default' : 'outline'}
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
