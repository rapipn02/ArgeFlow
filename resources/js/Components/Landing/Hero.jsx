import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-50 dark:bg-background pt-20">
            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Badge */}
                        <div className="inline-block">
                            
                        </div>

                        {/* Main Headline */}
                        <div className="space-y-4 -mt-4">
                            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-col gap-2">
                                <span className="text-foreground">Wujudkan Projek </span>
                                <span className="text-foreground">Digitalmu</span>
                                <span className="text-primary">Bersama Kami</span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-semibold text-black">
                            Kami membantu Anda tampil lebih profesional, dipercaya, dan menjangkau lebih banyak pelanggan melalui website modern yang dirancang untuk hasil nyata
                        </p>

                        {/* CTA Button */}
                        <div>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group px-8 py-6 text-base text-center ">
                                Mulai Sekarang
                                <div className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform -mx-6" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <img
                                src="/hero.jpg"
                                alt="Universitas Andalas"
                                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                            />
                            
                            {/* Decorative Elements */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-2xl -z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
        </section>
    );
}

