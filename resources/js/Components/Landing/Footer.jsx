import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border/40 bg-card/50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img 
                                src="/logo.png" 
                                alt="Platform Logo" 
                                className="w-8 h-8 object-contain"
                            />
                            <span className="font-bold text-xl">ArgeFlow</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            ArgeFlow adalah platform freelance modern untuk menghubungkan client dengan programmer profesional terbaik.
                        </p>
                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg glass border dark:border-white/10 border-gray-200 flex items-center justify-center hover:border-primary/50 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg glass border dark:border-white/10 border-gray-200 flex items-center justify-center hover:border-primary/50 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg glass border dark:border-white/10 border-gray-200 flex items-center justify-center hover:border-primary/50 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg glass border dark:border-white/10 border-gray-200 flex items-center justify-center hover:border-primary/50 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cara Kerja</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Karir</Link></li>
                        </ul>
                    </div>

                    {/* Layanan */}
                    <div>
                        <h3 className="font-semibold mb-4">Layanan</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#services" className="hover:text-primary transition-colors">Website Development</Link></li>
                            <li><Link href="#services" className="hover:text-primary transition-colors">Mobile App</Link></li>
                            <li><Link href="#services" className="hover:text-primary transition-colors">E-Commerce</Link></li>
                            <li><Link href="#services" className="hover:text-primary transition-colors">Custom Project</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Kontak</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>info@platform.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Padang, Indonesia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/40">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>© 2026 Platform. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
