import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const BUY_URL = 'https://essenciainmobiliaria.com/buscadoressenciainmobiliaria/';

const StickyBuyBanner: React.FC = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (isDismissed) return;
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[55] bg-brand-blue-500 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
                >
                    {/* Close button - absolute top right */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-2 right-2 md:hidden w-7 h-7 flex items-center justify-center text-editorial-black/50 hover:text-editorial-black transition-colors"
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined text-base">close</span>
                    </button>

                    {/* Desktop layout: single row */}
                    <div className="hidden md:flex max-w-[1440px] mx-auto px-12 h-16 items-center justify-between gap-4">
                        <p className="text-editorial-black text-sm font-bold tracking-wide truncate">
                            <span className="material-symbols-outlined text-base align-middle mr-1.5">home</span>
                            {t('cta.buy.banner_text')}
                        </p>
                        <div className="flex items-center gap-3 shrink-0">
                            <a
                                href={BUY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 px-8 bg-editorial-black hover:bg-white text-white hover:text-editorial-black text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                            >
                                {t('cta.buy.button')}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                            <button
                                onClick={handleDismiss}
                                className="w-9 h-9 flex items-center justify-center text-editorial-black/60 hover:text-editorial-black transition-colors"
                                aria-label="Close"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile layout: stacked */}
                    <div className="md:hidden flex flex-col items-center gap-2 px-4 py-3">
                        <p className="text-editorial-black text-xs font-bold tracking-wide text-center leading-snug pr-6">
                            <span className="material-symbols-outlined text-sm align-middle mr-1">home</span>
                            {t('cta.buy.banner_text')}
                        </p>
                        <a
                            href={BUY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 w-full max-w-xs bg-editorial-black hover:bg-white text-white hover:text-editorial-black text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                        >
                            {t('cta.buy.button')}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyBuyBanner;
