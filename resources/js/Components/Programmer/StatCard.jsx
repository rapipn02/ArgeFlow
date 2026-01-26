import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, title, value, subtitle, color = 'blue' }) {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        orange: 'from-orange-500 to-orange-600',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
        >
            {/* Background gradient decoration */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
            
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
