import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LandingHeader: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const navLinks = [
        { id: 'mia-method', label: 'MIA' },
        { id: 'recent-sales', label: t('landing.hero.sales') },
        { id: 'faq', label: 'FAQ' },
        { id: 'start-valuation', label: t('nav.contact') },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-[#101922]/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Logo acts as reset/refresh rather than navigation */}
                    <a href="/" className="flex items-center gap-3">
                        <img src="/Logo_Negro.svg" alt="Essencia Inmobiliaria" className="h-12 w-auto object-contain dark:invert" />
                    </a>
                </div>

                <div className="flex items-center gap-8">
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 mr-4">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-gray-500 transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Language Switcher */}
                    <div className="hidden lg:flex items-center gap-3 text-[10px] font-bold tracking-widest text-gray-400">
                        <button onClick={() => setLanguage('es')} className={`cursor-pointer transition-colors ${language === 'es' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>ES</button>
                        <button onClick={() => setLanguage('en')} className={`cursor-pointer transition-colors ${language === 'en' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>EN</button>
                        <button onClick={() => setLanguage('fr')} className={`cursor-pointer transition-colors ${language === 'fr' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>FR</button>
                        <button onClick={() => setLanguage('de')} className={`cursor-pointer transition-colors ${language === 'de' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>DE</button>
                        <button onClick={() => setLanguage('va')} className={`cursor-pointer transition-colors ${language === 'va' ? 'text-editorial-black dark:text-white border-b border-editorial-black dark:border-white' : 'hover:text-editorial-black dark:hover:text-white'}`}>VA</button>
                    </div>

                    <a href="tel:+34647803355" className="hidden sm:flex h-10 px-6 items-center justify-center bg-editorial-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">
                        +34 647 803 355
                    </a>

                    <button className="lg:hidden p-2 text-editorial-black dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 p-6 shadow-xl flex flex-col gap-6 animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-4 text-center">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="text-xs font-black uppercase tracking-[0.2em] py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                    <div className="flex gap-4 justify-center border-t border-gray-100 dark:border-gray-800 pt-6">
                        <button onClick={() => setLanguage('es')} className={`text-sm font-bold ${language === 'es' ? 'text-primary' : 'text-gray-400'}`}>ES</button>
                        <button onClick={() => setLanguage('en')} className={`text-sm font-bold ${language === 'en' ? 'text-primary' : 'text-gray-400'}`}>EN</button>
                        <button onClick={() => setLanguage('fr')} className={`text-sm font-bold ${language === 'fr' ? 'text-primary' : 'text-gray-400'}`}>FR</button>
                        <button onClick={() => setLanguage('de')} className={`text-sm font-bold ${language === 'de' ? 'text-primary' : 'text-gray-400'}`}>DE</button>
                        <button onClick={() => setLanguage('va')} className={`text-sm font-bold ${language === 'va' ? 'text-primary' : 'text-gray-400'}`}>VA</button>
                    </div>
                    <a href="tel:+34647803355" className="w-full h-12 flex items-center justify-center bg-editorial-black text-white font-bold uppercase tracking-widest">
                        +34 647 803 355
                    </a>
                </div>
            )}
        </header>
    );
};

export default LandingHeader;
