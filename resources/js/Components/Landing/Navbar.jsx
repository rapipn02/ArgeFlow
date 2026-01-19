import { Link } from '@inertiajs/react';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../ui/button';
import { Menu, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-border/40 transition-all duration-300 ${
            isScrolled 
                ? 'bg-background/80 backdrop-blur-lg shadow-lg' 
                : 'bg-background'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="Platform Logo" 
                            className="w-12 h-12 object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-xl leading-tight">ArgeFlow</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-35">
                        <Link href="/" className="text-base font-medium hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <Link href="#services" className="text-base font-medium hover:text-primary transition-colors">
                            Peminjaman
                        </Link>
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-base font-medium hover:text-primary transition-colors">
                                Informasi
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {/* Dropdown */}
                            <div className="absolute top-full left-0 mt-2 w-48 py-2 bg-background/95 backdrop-blur-lg border border-border/40 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link href="#features" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                                    Features
                                </Link>
                                <Link href="#how-it-works" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                                    Cara Kerja
                                </Link>
                                <Link href="#testimonials" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                                    Testimonials
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <div className="hidden md:flex items-center gap-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-border/40">
                        <div className="flex flex-col gap-4">
                            <Link href="/" className="text-base font-medium hover:text-primary transition-colors">
                                Beranda
                            </Link>
                            <Link href="#services" className="text-base font-medium hover:text-primary transition-colors">
                                Peminjaman
                            </Link>
                            <div className="flex flex-col gap-2 pl-4">
                                <span className="text-sm font-medium text-muted-foreground">Informasi</span>
                                <Link href="#features" className="text-sm hover:text-primary transition-colors">
                                    Features
                                </Link>
                                <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">
                                    Cara Kerja
                                </Link>
                                <Link href="#testimonials" className="text-sm hover:text-primary transition-colors">
                                    Testimonials
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

