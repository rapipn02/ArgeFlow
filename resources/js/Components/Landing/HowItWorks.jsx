import { motion } from 'framer-motion';
import { FileText, CreditCard, Code, CheckCircle } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: FileText,
        title: 'Buat Project',
        description: 'Deskripsikan project Anda dan pilih layanan yang sesuai dengan kebutuhan',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        number: '02',
        icon: CreditCard,
        title: 'Bayar DP 40%',
        description: 'Lakukan pembayaran DP 40% melalui payment gateway yang aman',
        color: 'from-cyan-500 to-teal-500',
    },
    {
        number: '03',
        icon: Code,
        title: 'Programmer Kerja',
        description: 'Programmer mulai mengerjakan project dan update progress secara real-time',
        color: 'from-teal-500 to-green-500',
    },
    {
        number: '04',
        icon: CheckCircle,
        title: 'Project Selesai',
        description: 'Review hasil kerja, bayar sisa 60%, dan berikan rating untuk programmer',
        color: 'from-blue-500 to-blue-600',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Cara Kerja Platform
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Proses yang mudah dan transparan dari awal hingga project selesai
                    </p>
                </motion.div>

                {/* Timeline - Desktop */}
                <div className="hidden lg:block max-w-6xl mx-auto">
                    {/* Steps Container */}
                    <div className="relative">
                        
                        {/* Steps */}
                        <div className="grid grid-cols-4 gap-8">
                            {steps.map((step, index) => (
                                <StepCard key={index} step={step} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline - Mobile/Tablet */}
                <div className="lg:hidden max-w-2xl mx-auto">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-teal-500 to-green-500 opacity-20" />
                        
                        {/* Steps */}
                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <StepCardMobile key={index} step={step} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, index }) {
    const Icon = step.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative flex flex-col items-center"
        >
            {/* Icon Circle */}
            <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-2xl glass border-2 dark:border-white/10 border-gray-200 flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-primary" strokeWidth={2} />
                </div>
            </div>



            {/* Content */}
            <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>

            {/* Arrow (except last) */}
            {index < steps.length - 1 && (
                <div className="absolute top-10 -right-12 hidden lg:block">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-muted-foreground/20">
                        <path d="M12 24H36M36 24L28 16M36 24L28 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            )}
        </motion.div>
    );
}

function StepCardMobile({ step, index }) {
    const Icon = step.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex gap-6 pl-4"
        >
            {/* Number Badge */}
            <div className="flex-shrink-0">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative z-10`}>
                    <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <div className="glass p-6 rounded-2xl border-2 dark:border-white/10 border-gray-200">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl glass border-2 dark:border-white/10 border-gray-200 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
            </div>
        </motion.div>
    );
}
