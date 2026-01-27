import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectDoughnutChart({ ordersData }) {
    const [period, setPeriod] = useState('month'); // week, month, year
    const chartRef = useRef(null);

    const filterDataByPeriod = () => {
        const now = new Date();
        let startDate;

        switch (period) {
            case 'week':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'month':
                startDate = new Date(now.setMonth(now.getMonth() - 1));
                break;
            case 'year':
                startDate = new Date(now.setFullYear(now.getFullYear() - 1));
                break;
            default:
                startDate = new Date(now.setMonth(now.getMonth() - 1));
        }

        const filtered = ordersData.filter((order) => {
            const orderDate = new Date(order.created_at);
            return orderDate >= startDate;
        });

        // Group by status
        const statusCounts = {
            pending: 0,
            dp_paid: 0,
            in_progress: 0,
            completed: 0,
            cancelled: 0,
        };

        filtered.forEach((order) => {
            if (statusCounts.hasOwnProperty(order.status)) {
                statusCounts[order.status]++;
            }
        });

        return statusCounts;
    };

    const statusCounts = filterDataByPeriod();

    const data = {
        labels: ['Pending', 'DP Dibayar', 'Sedang Dikerjakan', 'Selesai', 'Dibatalkan'],
        datasets: [
            {
                label: 'Total Projek',
                data: [
                    statusCounts.pending,
                    statusCounts.dp_paid,
                    statusCounts.in_progress,
                    statusCounts.completed,
                    statusCounts.cancelled,
                ],
                backgroundColor: [
                    'rgba(251, 191, 36, 0.8)', // yellow - pending
                    'rgba(59, 130, 246, 0.8)', // blue - dp_paid
                    'rgba(139, 92, 246, 0.8)', // purple - in_progress
                    'rgba(34, 197, 94, 0.8)', // green - completed
                    'rgba(239, 68, 68, 0.8)', // red - cancelled
                ],
                borderColor: [
                    'rgba(251, 191, 36, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'start',
                labels: {
                    padding: 10,
                    boxWidth: 12,
                    boxHeight: 12,
                    font: {
                        size: 11,
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                    filter: function(legendItem, chartData) {
                        // Only show legend items that have non-zero values
                        const datasetIndex = legendItem.datasetIndex || 0;
                        const index = legendItem.index;
                        const value = chartData.datasets[datasetIndex].data[index];
                        return value > 0;
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                    Statistik Projek
                </h3>
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="text-xs border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 py-1 px-3"
                >
                    <option value="week">Minggu</option>
                    <option value="month">Bulan</option>
                    <option value="year">Tahun</option>
                </select>
            </div>

            <div className="h-[280px] flex items-center justify-center">
                <Doughnut ref={chartRef} data={data} options={options} />
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold text-gray-900">
                            {Object.values(statusCounts).reduce((a, b) => a + b, 0)}
                        </p>
                        <p className="text-xs text-gray-500">Total Projek</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">
                            {period === 'week'
                                ? 'Minggu Ini'
                                : period === 'month'
                                ? 'Bulan Ini'
                                : 'Tahun Ini'}
                        </p>
                        <p className="text-xs text-gray-500">Periode</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
