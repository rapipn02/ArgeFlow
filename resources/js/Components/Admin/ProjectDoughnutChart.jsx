import { useState, useEffect, useRef, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectDoughnutChart({ ordersData, selectedMonth, selectedYear }) {
    const [period, setPeriod] = useState('month'); // week, month, year
    const [isVisible, setIsVisible] = useState(false); // untuk trigger animasi saat terlihat
    const chartRef = useRef(null);
    const containerRef = useRef(null); // ref untuk container chart

    // Memoize filtered data untuk mencegah re-calculation yang tidak perlu
    const statusCounts = useMemo(() => {
        console.log('Filtering data...', { ordersData: ordersData?.length, selectedMonth, selectedYear });
        
        let filtered = ordersData || [];

        // Filter berdasarkan bulan yang dipilih jika ada
        if (selectedMonth && selectedMonth !== 'all') {
            filtered = ordersData.filter((order) => {
                const orderDate = new Date(order.created_at);
                const orderMonth = orderDate.getMonth() + 1; // getMonth() returns 0-11
                const orderYear = orderDate.getFullYear();
                
                return orderMonth === parseInt(selectedMonth) && orderYear === (selectedYear || 2026);
            });
        } else {
            // Filter berdasarkan period jika tidak ada bulan spesifik dipilih
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

            filtered = ordersData.filter((order) => {
                const orderDate = new Date(order.created_at);
                return orderDate >= startDate;
            });
        }

        console.log('Filtered orders:', filtered.length);

        // Group by status
        const counts = {
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
            if (counts.hasOwnProperty(order.status)) {
                counts[order.status]++;
            } else {
                // Log status yang tidak dikenali untuk debugging
                console.warn(' Unknown order status:', order.status);
            }
        });

        console.log('tatus counts:', counts);
        return counts;
    }, [ordersData, selectedMonth, selectedYear, period]);

    const totalProjects = useMemo(() => {
        return Object.values(statusCounts).reduce((a, b) => a + b, 0);
    }, [statusCounts]);

    const hasNoData = totalProjects === 0;

    // Memoize data object untuk mencegah re-creation
    const data = useMemo(() => {
        console.log('Creating chart data...', { totalProjects, hasNoData });
        
        return {
            labels: hasNoData 
                ? ['Tidak Ada Projek']
                : [
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
                    data: hasNoData
                        ? [1]
                        : [
                            statusCounts.pending,
                            statusCounts.dp_paid,
                            statusCounts.in_progress,
                            statusCounts.awaiting_review,
                            statusCounts.revision_requested,
                            statusCounts.final_payment,
                            statusCounts.completed,
                            statusCounts.cancelled,
                        ],
                    backgroundColor: hasNoData
                        ? ['rgba(209, 213, 219, 0.5)']
                        : [
                            'rgba(245, 158, 11, 0.65)',
                            'rgba(37, 99, 235, 0.65)',
                            'rgba(99, 102, 241, 0.65)',
                            'rgba(219, 39, 119, 0.65)',
                            'rgba(234, 88, 12, 0.65)',
                            'rgba(2, 132, 199, 0.65)',
                            'rgba(22, 163, 74, 0.65)',
                            'rgba(185, 28, 28, 0.65)',
                        ],
                    borderColor: hasNoData
                        ? ['rgba(209, 213, 219, 1)']
                        : [
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
    }, [statusCounts, hasNoData, totalProjects]);

    // Memoize options object untuk mencegah re-creation
    const options = useMemo(() => {
        console.log('Creating chart options...');
        
        return {
            responsive: true,
            maintainAspectRatio: false,
            // Animasi dasar - PENTING: ini yang membuat animasi berjalan
            animation: {
                duration: 1500,              // durasi animasi (ms) - diperpanjang agar lebih terlihat
                easing: 'easeOutCubic',      // jenis transisi
                animateRotate: true,         // animasi rotasi segmen
                animateScale: true,          // animasi skala/zoom
                delay: 0,                    // tidak ada delay
            },
            
            // Animasi untuk transisi data
            transitions: {
                active: {
                    animation: {
                        duration: 400,
                        easing: 'easeOutQuart',
                    }
                },
                show: {
                    animation: {
                        duration: 800,
                        easing: 'easeOutBounce',  // efek bouncing
                    }
                },
                hide: {
                    animation: {
                        duration: 400,
                        easing: 'easeInQuart',
                    }
                }
            },
            
            // Animasi hover
            hover: {
                animationDuration: 300,
            },
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
                            if (hasNoData) {
                                return 'Tidak ada projek pada periode ini';
                            }
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
    }, [hasNoData]);

    // Intersection Observer untuk mendeteksi kapan chart terlihat di layar
    useEffect(() => {
        const currentContainer = containerRef.current; // Simpan reference sebelum cleanup
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        console.log(' Chart is now visible! Triggering animation...');
                        // Hanya set state, biarkan Chart.js handle animasi sendiri
                        setIsVisible(true);
                    }
                });
            },
            {
                threshold: 0.3, // trigger saat 30% chart terlihat
                rootMargin: '0px', // tidak ada margin tambahan
            }
        );

        if (currentContainer) {
            observer.observe(currentContainer);
            console.log(' Intersection Observer attached to chart container');
        }

        // Cleanup - gunakan variable lokal yang sudah disimpan
        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
            observer.disconnect();
        };
    }, [isVisible]);

    // Force update chart ketika data berubah
    useEffect(() => {
        console.log('Chart data updated, chart should animate now');
        if (chartRef.current) {
            console.log(' Chart ref exists, animation should trigger');
        }
    }, [data]);

    const getMonthName = (monthNumber) => {
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                           'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return monthNames[monthNumber - 1];
    };

    console.log(' Rendering chart component...', { totalProjects, hasNoData, isVisible });

    return (
        <div ref={containerRef}>
            <div 
                className={`h-[280px] flex items-center justify-center transition-all duration-1000 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                    transition: 'opacity 1s ease-out, transform 1s ease-out'
                }}
            >
                {/* Chart akan render dengan animasi Chart.js built-in */}
                {isVisible && (
                    <Doughnut 
                        ref={chartRef} 
                        data={data} 
                        options={options} 
                    />
                )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold text-gray-900">
                            {totalProjects}
                        </p>
                        <p className="text-xs text-gray-500">Total Projek</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">
                            {selectedMonth && selectedMonth !== 'all'
                                ? getMonthName(parseInt(selectedMonth))
                                : period === 'week'
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
