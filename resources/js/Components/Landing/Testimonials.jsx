import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Budi Santoso',
        role: 'CEO Startup ABC',
        avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=3B82F6&color=fff',
        rating: 5,
        text: 'Programmer sangat profesional, project selesai tepat waktu dengan kualitas yang memuaskan. Komunikasi lancar dan responsif!',
    },
    {
        name: 'Siti Nurhaliza',
        role: 'Owner Toko Online',
        avatar: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=8B5CF6&color=fff',
        rating: 5,
        text: 'Website e-commerce yang dibuat sangat bagus dan user-friendly. Penjualan meningkat 200% setelah menggunakan platform ini!',
    },
    {
        name: 'Ahmad Fauzi',
        role: 'Marketing Manager',
        avatar: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=10B981&color=fff',
        rating: 4,
        text: 'Sistem pembayaran yang aman dan transparan. Revisi gratis sangat membantu untuk mendapatkan hasil yang sempurna.',
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative">
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
                        Apa Kata Mereka?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Testimoni dari client yang puas dengan layanan kami
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative p-8 rounded-2xl glass border-2 dark:border-white/10 border-gray-200 hover:border-primary/50 transition-all duration-300"
        >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${
                                i < testimonial.rating
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300 dark:text-gray-600'
                            }`}
                        />
                    ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
