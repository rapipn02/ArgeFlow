import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Headline */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Siap Memulai Project Anda?
                    </h2>
                    
                    {/* Description */}
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Bergabung sekarang dan dapatkan programmer terbaik untuk mewujudkan project digital Anda
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="group">
                            Daftar Sekarang
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button size="lg" variant="outline">
                            Hubungi Kami
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
