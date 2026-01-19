import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Briefcase, TrendingUp, Star } from 'lucide-react';

const stats = [
    {
        icon: Briefcase,
        number: 500,
        suffix: '+',
        label: 'Projects Completed',
    },
    {
        icon: Users,
        number: 100,
        suffix: '+',
        label: 'Programmers Verified',
    },
    {
        icon: TrendingUp,
        number: 95,
        suffix: '%',
        label: 'Success Rate',
    },
    {
        icon: Star,
        number: 4.8,
        suffix: '/5',
        label: 'Average Rating',
        decimal: true,
    },
];

export default function Stats() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatCard({ stat, index }) {
    const Icon = stat.icon;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = stat.number;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(stat.decimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, stat.number, stat.decimal]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
        >
            {/* Icon */}
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl glass border-2 dark:border-white/10 border-gray-200 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>
            </div>

            {/* Number */}
            <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                    {count}{stat.suffix}
                </span>
            </div>

            {/* Label */}
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
        </motion.div>
    );
}
