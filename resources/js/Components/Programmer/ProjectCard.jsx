import { Link } from '@inertiajs/react';
import { Calendar, User, DollarSign, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project }) {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        dp_paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        final_payment: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };

    const statusLabels = {
        pending: 'Pending',
        dp_paid: 'DP Paid',
        in_progress: 'In Progress',
        final_payment: 'Final Payment',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                            #{project.order_number}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                            {statusLabels[project.status]}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {project.service_name}
                    </h3>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{project.client_name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{project.created_at}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">{formatCurrency(project.total_amount)}</span>
                </div>
            </div>

            <Link
                href={route('programmer.projects.show', project.id)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group"
            >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}
