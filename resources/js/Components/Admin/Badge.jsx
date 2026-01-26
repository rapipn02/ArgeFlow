export default function Badge({ children, variant = 'default' }) {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        purple: 'bg-purple-100 text-purple-800',
        pink: 'bg-pink-100 text-pink-800',
    };

    return (
        <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${variants[variant] || variants.default}`}
        >
            {children}
        </span>
    );
}
