import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function StatCard({ title, value, subtitle, type = 'neutral', icon: Icon, animated = true }) {
    const getColorClasses = () => {
        switch (type) {
            case 'income':
                return {
                    bg: 'bg-white',
                    icon: 'bg-green-100 text-green-600',
                    text: 'text-green-600',
                    value: 'text-gray-900',
                };
            case 'expense':
                return {
                    bg: 'bg-white',
                    icon: 'bg-red-100 text-red-600',
                    text: 'text-red-600',
                    value: 'text-gray-900',
                };
            case 'balance':
                return {
                    bg: 'bg-white',
                    icon: 'bg-blue-100 text-blue-600',
                    text: 'text-blue-600',
                    value: 'text-gray-900',
                };
            default:
                return {
                    bg: 'bg-white',
                    icon: 'bg-gray-100 text-gray-600',
                    text: 'text-gray-600',
                    value: 'text-gray-900',
                };
        }
    };

    const colors = getColorClasses();
    const DefaultIcon = type === 'income' ? TrendingUp : type === 'expense' ? TrendingDown : Wallet;
    const IconComponent = Icon || DefaultIcon;

    // Extract numeric value from string (e.g., "Rp 1.000.000" -> 1000000)
    const extractNumber = (val) => {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') {
            // Remove "Rp", spaces, and dots (thousand separators)
            const cleaned = val.replace(/Rp\s?/g, '').replace(/\./g, '').replace(/,/g, '');
            const numMatch = cleaned.match(/\d+/);
            if (numMatch) {
                return parseInt(numMatch[0], 10);
            }
        }
        return 0;
    };

    const numericValue = extractNumber(value);
    const isCurrency = typeof value === 'string' && value.includes('Rp');
    const isNumber = typeof value === 'number' || (typeof value === 'string' && /^\d+$/.test(value.replace(/\./g, '')));

    return (
        <div className={`${colors.bg} rounded-xl py-10 px-6 border border-gray-200 shadow-sm`}>
            <div className="flex items-start justify-between">
                <div className="flex-1 translate-y-4">
                    <p className="font-large text-gray-600 -translate-y-4 ">
                        {title}
                    </p>
                    <h3 className={`text-2xl font-bold ${colors.value} py-3 -translate-y-2`}>
                        {animated && numericValue > 0 && (isCurrency || isNumber) ? (
                            isCurrency ? (
                                <>Rp <AnimatedCounter value={numericValue} duration={2500} /></>
                            ) : (
                                <AnimatedCounter value={numericValue} duration={2500} />
                            )
                        ) : (
                            value
                        )}
                    </h3>
                    <p className="text-xs text-gray-500 ">{subtitle}</p>
                </div>
                <div className={`${colors.icon} p-3 rounded-lg`}>
                    <IconComponent className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
