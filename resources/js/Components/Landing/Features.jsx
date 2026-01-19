import { motion } from 'framer-motion';
import { CreditCard, Shield, Zap, Users, Star, MessageSquare } from 'lucide-react';

const features = [
    {
        icon: CreditCard,
        title: 'Pembayaran Transparan',
        description: 'Sistem pembayaran bertahap dengan DP 40% dan pelunasan 60% setelah project selesai.',
    },
    {
        icon: Shield,
        title: 'Aman & Terpercaya',
        description: 'Sistem escrow yang melindungi dana Anda hingga project selesai dengan memuaskan.',
    },
    {
        icon: Zap,
        title: 'Cepat & Efisien',
        description: 'Deadline terjamin dengan sistem tracking progress real-time untuk setiap project.',
    },
    {
        icon: Users,
        title: 'Programmer Terverifikasi',
        description: 'Semua programmer telah melalui proses verifikasi skill dan portfolio yang ketat.',
    },
    {
        icon: Star,
        title: 'Rating & Review',
        description: 'Sistem rating transparan membantu Anda memilih programmer terbaik untuk project.',
    },
    {
        icon: MessageSquare,
        title: 'Komunikasi Real-time',
        description: 'Chat langsung dengan programmer dan pantau progress project kapan saja.',
    },
];

export default function Features() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Kenapa Memilih Platform Kami?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Solusi terpercaya untuk menghubungkan Anda dengan programmer profesional
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ feature, index }) {
    const Icon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-8 rounded-2xl glass hover:bg-card/50 transition-all duration-300 border-2 dark:border-white/10 border-gray-200 hover:border-primary/50"
        >
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
            </div>
        </motion.div>
    );
}
