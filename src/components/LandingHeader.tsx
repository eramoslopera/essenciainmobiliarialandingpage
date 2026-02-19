import React, { useState } from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const LandingHeader: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const navLinks = [
        { id: 'process-start', label: t('nav.process') },
        { id: 'recent-sales', label: t('landing.hero.sales') },
        { id: 'faq', label: 'FAQ' },
        { id: 'start-valuation', label: t('nav.sell_now') },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white/95 dark:bg-editorial-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-200' : 'bg-transparent'} `}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

                {/* Logo - Rigid Left */}
                <div className="flex-1 flex justify-start">
                    <a href="/" className="flex items-center gap-3">
                        <Logo className="h-10 md:h-12 w-auto object-contain dark:text-white text-editorial-black" />
                    </a>
                </div>

                {/* Desktop Navigation - Rigid Center */}
                <nav className="hidden lg:flex flex-1 justify-center items-center gap-6">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-gray-500 transition-colors whitespace-nowrap"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Actions - Rigid Right */}
                <div className="flex-1 flex justify-end items-center gap-3 md:gap-4">

                    {/* Language Switcher Dropdown */}
                    <div className="hidden lg:block relative group">
                        <button className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-gray-400 hover:text-editorial-black dark:hover:text-white transition-colors py-2 uppercase">
                            {language}
                            <span className="material-symbols-outlined text-[14px]">expand_more</span>
                        </button>
                        <div className="absolute top-full right-0 w-24 bg-white dark:bg-background-dark shadow-xl border border-gray-100 dark:border-gray-800 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <button onClick={() => setLanguage('en')} className={`block w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-gray-50 dark:hover:bg-white/5 uppercase tracking-widest ${language === 'en' ? 'text-brand-blue-500' : 'text-gray-400'}`}>EN</button>
                            <button onClick={() => setLanguage('es')} className={`block w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-gray-50 dark:hover:bg-white/5 uppercase tracking-widest ${language === 'es' ? 'text-brand-blue-500' : 'text-gray-400'}`}>ES</button>
                            <button onClick={() => setLanguage('fr')} className={`block w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-gray-50 dark:hover:bg-white/5 uppercase tracking-widest ${language === 'fr' ? 'text-brand-blue-500' : 'text-gray-400'}`}>FR</button>
                            <button onClick={() => setLanguage('de')} className={`block w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-gray-50 dark:hover:bg-white/5 uppercase tracking-widest ${language === 'de' ? 'text-brand-blue-500' : 'text-gray-400'}`}>DE</button>
                            <button onClick={() => setLanguage('va')} className={`block w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-gray-50 dark:hover:bg-white/5 uppercase tracking-widest ${language === 'va' ? 'text-brand-blue-500' : 'text-gray-400'}`}>VA</button>
                        </div>
                    </div>

                    <a href="https://wa.me/34647803355" target="_blank" rel="noopener noreferrer" className="flex h-9 md:h-10 px-3 md:px-6 items-center justify-center bg-editorial-black hover:bg-brand-blue-500 border border-editorial-black hover:border-brand-blue-500 hover:text-editorial-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-brand-blue-500/20">
                        {t('nav.contact')}
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
                    <a href="https://wa.me/34647803355" target="_blank" rel="noopener noreferrer" className="w-full h-12 flex items-center justify-center bg-editorial-black text-white font-bold uppercase tracking-widest">
                        {t('nav.contact')}
                    </a>
                </div>
            )}
        </header>
    );
};

export default LandingHeader;
