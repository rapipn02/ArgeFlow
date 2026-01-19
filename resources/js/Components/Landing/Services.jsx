import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const services = [
    {
        name: 'Website Landing Page',
        price: 3000000,
        description: 'cocok untuk bisnis yang ingin memiliki website profesional',
        features: [
            'Responsive Design',
            'SEO Optimized',
            'Fast Loading',
            '1 Halaman',
            'Contact Form',
            'Google Maps Integration',
        ],
        popular: false,
    },
    {
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
        popular: true,
    },
    {
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
        popular: false,
    },
    {
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
        popular: false,
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Layanan Kami
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Pilih paket yang sesuai dengan kebutuhan project Anda
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>


            </div>
        </section>
    );
}

function ServiceCard({ service, index }) {
    const formatPrice = (price) => {
        if (price === 0) return 'Harga Fleksibel';
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
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue 600 to-blue-700 text-white text-sm font-medium shadow-lg">
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-white-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
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
                        {!service.custom && (
                            <p className="text-xs text-muted-foreground mt-2">
                                DP 40% • Final 60%
                            </p>
                        )}
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
                    <Button 
                        className={`w-full group/btn ${service.popular ? '' : 'variant-outline'}`}
                        variant={service.popular ? 'default' : 'outline'}
                    >
                        {service.custom ? 'Konsultasi' : 'Pilih Layanan'}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
