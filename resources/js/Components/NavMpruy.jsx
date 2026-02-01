import { Link, usePage } from '@inertiajs/react';
import { User, LogOut, FolderOpen, Shield } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { ThemeToggle } from '@/Components/ThemeToggle';

export default function NavMpruy() {
    const { auth } = usePage().props;
    
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/50 backdrop-blur-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="ArgeFlow Logo" 
                            className="w-12 h-12 object-contain"
                        />
                        <span className="font-bold text-xl">ArgeFlow</span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        
                        {/* User Menu */}
                        {auth?.user && (
                            <div className="flex items-center gap-2">
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-medium">{auth.user.name}</p>
                                    <p className="text-xs text-muted-foreground">{auth.user.email}</p>
                                </div>
                                
                                {/* Admin Panel Button - For admin and superadmin */}
                                {(auth.user.role === 'admin' || auth.user.role === 'superadmin') && (
                                    <Link href={route('admin.dashboard')}>
                                        <Button variant="ghost" size="icon" title="Admin Panel">
                                            <Shield className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                )}

                                <Link href={route('orders.index')}>
                                    <Button variant="ghost" size="icon" title="My Orders">
                                        <FolderOpen className="w-5 h-5" />
                                    </Button>
                                </Link>
                                
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}