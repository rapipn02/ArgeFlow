import { Head } from '@inertiajs/react';
import { ThemeProvider } from '../Components/ThemeProvider';
import Navbar from '../Components/Landing/Navbar';
import Hero from '../Components/Landing/Hero';
import Features from '../Components/Landing/Features';
import Services from '../Components/Landing/Services';
import HowItWorks from '../Components/Landing/HowItWorks';
import Stats from '../Components/Landing/Stats';
import Testimonials from '../Components/Landing/Testimonials';
import CTA from '../Components/Landing/CTA';
import Footer from '../Components/Landing/Footer';

export default function Landing() {
    return (
        <ThemeProvider defaultTheme="dark">
            <Head title="Platform Freelance Programmer Terbaik" />
            
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />
                <main>
                    <Hero />
                    <Features />
                    <Services />
                    <HowItWorks />
                    <Stats />
                    <Testimonials />
                    <CTA />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}
