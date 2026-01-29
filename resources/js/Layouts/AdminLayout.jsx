import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Receipt,
    FileText,
    Users,
    UsersRound,
    Briefcase,
    Menu,
    X,
    LogOut,
    ChevronDown,
    PanelLeftClose,
    PanelLeftOpen,
    CircleUser,
    UserRoundCog,
    TrendingUp,
    ChartColumnIncreasing 
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navigation = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            icon: LayoutDashboard,
            current: route().current('admin.dashboard'),
        },
    
        {
            name: 'Keuangan',
            href: route('admin.transactions.index'),
            icon: FileText,
            current: route().current('admin.transactions.*'),
        },
        {
            name: 'Progress Project',
            href: route('admin.progress.index'),
            icon: ChartColumnIncreasing,
            current: route().current('admin.progress.*'),
        },
        {
            name: 'Layanan',
            href: route('admin.services.index'),
            icon: Briefcase,
            current: route().current('admin.services.*'),
        },
        {
            name: 'Programmer',
            href: route('admin.programmers.index'),
            icon: UserRoundCog,
            current: route().current('admin.programmers.*'),
        },
        {
            name: 'Tim Programmer',
            href: route('admin.teams.index'),
            icon: UsersRound,
            current: route().current('admin.teams.*'),
        },  
        {
            name: 'Pelanggan',
            href: route('admin.users.index'),
            icon: CircleUser,
            current: route().current('admin.users.*'),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar for desktop */}
            <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-400 ease-in-out ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
                <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 overflow-y-auto" style={{ backgroundColor: 'oklch(0.985 0 0)' }}>
                    {/* Logo/Brand */}
                    <div className="flex items-center flex-shrink-0 px-6 mb-8">
                        {sidebarCollapsed ? (
                            <img 
                                src="/logo.png" 
                                alt="ArgeFlow Logo" 
                                className="w-10 h-10 object-contain mx-auto"
                            />
                        ) : (
                            <div className="flex items-center gap-3">
                                <img 
                                    src="/logo.png" 
                                    alt="ArgeFlow Logo" 
                                    className="w-10 h-10 object-contain"
                                />
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">
                                        ArgeFlow
                                    </h1>
                                    <p className="text-xs text-gray-500">
                                        Admin Panel
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Platform Label */}
                    {!sidebarCollapsed && (
                        <div className="px-6 mb-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Platform
                            </p>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="flex-1 px-3 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        group flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                                        ${
                                            item.current
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                                    `}
                                    title={sidebarCollapsed ? item.name : ''}
                                >
                                    <Icon
                                        className={`
                                            ${sidebarCollapsed ? '' : 'mr-3'} h-5 w-5 flex-shrink-0
                                            ${
                                                item.current
                                                    ? 'text-gray-900'
                                                    : 'text-gray-400 group-hover:text-gray-500'
                                            }
                                        `}
                                    />
                                    {!sidebarCollapsed && item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Toggle Button */}
                    <div className="flex-shrink-0 px-3 mb-2">
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="w-full flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors "
                            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                        >
                            {sidebarCollapsed ? (
                                <PanelLeftOpen className="h-5 w-5 " />
                            ) : (
                                <>
                                    <PanelLeftClose className="h-5 w-5 mr-3 " />
                                    <span>Extend</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* User info at bottom */}
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        {sidebarCollapsed ? (
                            <div className="w-full flex justify-center">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center w-full">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-700">
                                        {auth.user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {auth.user.role}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile sidebar */}
            <div
                className={`
                    fixed inset-0 z-40 lg:hidden
                    ${sidebarOpen ? 'block' : 'hidden'}
                `}
            >
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    onClick={() => setSidebarOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 flex flex-col w-64" style={{ backgroundColor: 'oklch(0.985 0 0)' }}>
                    <div className="flex items-center justify-between px-6 pt-5 pb-4">
                        <div className="flex items-center gap-3">
                            <img 
                                src="/logo.png" 
                                alt="ArgeFlow Logo" 
                                className="w-10 h-10 object-contain"
                            />
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">
                                    ArgeFlow
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Admin Panel
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="px-6 mb-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Platform
                        </p>
                    </div>

                    <nav className="flex-1 px-3 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                                        ${
                                            item.current
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <Icon
                                        className={`
                                            mr-3 h-5 w-5 flex-shrink-0
                                            ${
                                                item.current
                                                    ? 'text-gray-900'
                                                    : 'text-gray-400 group-hover:text-gray-500'
                                            }
                                        `}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className={`lg:flex lg:flex-col lg:flex-1 transition-all duration-400 ease-in-out ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
                {/* Mobile menu button */}
                <div className="lg:hidden sticky top-0 z-10 bg-gray-100 border-b border-gray-200 px-4 py-3">
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Page content */}
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
