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
            awaiting_review: 0,
            revision_requested: 0,
            final_payment: 0,
            completed: 0,
            cancelled: 0,
        };

        filtered.forEach((order) => {
            if (statusCounts.hasOwnProperty(order.status)) {
                statusCounts[order.status]++;
            } else {
                // Log status yang tidak dikenali untuk debugging
                console.warn('Unknown order status:', order.status);
            }
        });

        return statusCounts;
    };

    const statusCounts = filterDataByPeriod();

    const data = {
        labels: [
            'Pending', 
            'DP Dibayar', 
            'Sedang Dikerjakan', 
            'Menunggu Review',
            'Revisi Diminta',
            'Pembayaran Akhir',
            'Selesai', 
            'Dibatalkan'
        ],
        datasets: [
            {
                label: 'Total Projek',
                data: [
                    statusCounts.pending,
                    statusCounts.dp_paid,
                    statusCounts.in_progress,
                    statusCounts.awaiting_review,
                    statusCounts.revision_requested,
                    statusCounts.final_payment,
                    statusCounts.completed,
                    statusCounts.cancelled,
                ],
                    backgroundColor: [
                        'rgba(245, 158, 11, 0.65)',
                        'rgba(37, 99, 235, 0.65)',
                        'rgba(99, 102, 241, 0.65)',
                        'rgba(219, 39, 119, 0.65)',
                        'rgba(234, 88, 12, 0.65)',
                        'rgba(2, 132, 199, 0.65)',
                        'rgba(22, 163, 74, 0.65)',
                        'rgba(185, 28, 28, 0.65)',
                    ],
                    borderColor: [
                        'rgba(245, 158, 11, 1)',
                        'rgba(37, 99, 235, 1)',
                        'rgba(99, 102, 241, 1)',
                        'rgba(219, 39, 119, 1)',
                        'rgba(234, 88, 12, 1)',
                        'rgba(2, 132, 199, 1)',
                        'rgba(22, 163, 74, 1)',
                        'rgba(185, 28, 28, 1)',
                    ],
                    borderWidth: 1.5,

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
                    className="text-xs border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 py-1 px-4 mx-2 pr-8"
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
