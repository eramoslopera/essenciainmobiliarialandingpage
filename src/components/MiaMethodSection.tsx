import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface MiaMethodSectionProps {
    showCTA?: boolean;
}

const MiaMethodSection: React.FC<MiaMethodSectionProps> = ({ showCTA = false }) => {
    const { t } = useLanguage();
    const [activeId, setActiveId] = useState(1);

    const steps = [
        { id: 1, pro: true, icon: "chat" },
        { id: 2, pro: false, icon: "campaign" },
        { id: 3, pro: false, icon: "smart_toy" },
        { id: 4, pro: false, icon: "handshake" },
        { id: 5, pro: false, icon: "verified" },
        { id: 6, pro: true, icon: "flight" },
        { id: 7, pro: false, icon: "photo_camera" },
        { id: 8, pro: false, icon: "public" },
        { id: 9, pro: true, icon: "star" },
        { id: 10, pro: false, icon: "signature" }
    ];

    const activeStep = steps.find(s => s.id === activeId) || steps[0];

    const scrollToValuation = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('start-valuation');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="mia-method" className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-white dark:bg-background-dark relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 pointer-events-none">
                <span className="text-[120px] md:text-[300px] font-black text-editorial-black dark:text-white leading-none">MIA</span>
            </div>
            
            <div className="max-w-[1440px] mx-auto relative z-10">
                <div className="flex flex-col xl:flex-row gap-10 lg:gap-20 items-start">
                    
                    {/* Left Column: Context & Interactive Grid */}
                    <div className="w-full xl:w-1/2 flex flex-col gap-8 lg:gap-16">
                        {/* Title Section */}
                        <div>
                            <span className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-brand-blue-600 mb-4 block">
                                {t('landing.mia.exclusive')}
                            </span>
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-editorial-black dark:text-white tracking-tighter mb-4">
                                {t('landing.mia.id')}
                            </h2>
                            <p className="text-base lg:text-xl font-bold text-gray-500 tracking-widest uppercase">
                                {t('landing.mia.subtitle')}
                            </p>
                            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl text-sm lg:text-base leading-relaxed">
                                {t('landing.mia.fundamental')}
                            </p>
                            
                            {showCTA && (
                                <a 
                                  href="#start-valuation"
                                  onClick={scrollToValuation}
                                  className="group relative inline-flex items-center gap-6 bg-editorial-black text-white hover:bg-brand-blue-600 h-14 md:h-16 w-max pl-6 md:pl-8 pr-2 rounded-full transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-[0.98] overflow-hidden mt-6"
                                >
                                  <span className="text-xs font-bold tracking-[0.2em] relative z-10 whitespace-nowrap uppercase">
                                    {t('home.link.sell') || 'Vende con Essencia'}
                                  </span>
                                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-white transition-all duration-300 relative z-10">
                                     <span className="material-symbols-outlined text-white group-hover:text-brand-blue-600 font-bold text-lg">arrow_forward</span>
                                  </div>
                                </a>
                            )}
                        </div>

                        {/* Interactive Grid */}
                        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-4 relative z-20">
                            {steps.map(step => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveId(step.id)}
                                    className={`relative flex flex-col gap-1 md:gap-2 items-center justify-center aspect-square rounded-xl md:rounded-2xl transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 active:scale-95 md:hover:-translate-y-1 ${
                                        activeId === step.id 
                                        ? 'bg-editorial-black text-white border-editorial-black shadow-[0_10px_20px_-8px_rgba(0,0,0,0.3)]' 
                                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-editorial-black'
                                    }`}
                                    aria-label={`Paso ${step.id}`}
                                    aria-current={activeId === step.id ? 'step' : undefined}
                                >
                                    <span className="material-symbols-outlined text-base sm:text-xl md:text-3xl transition-transform duration-300">
                                        {step.icon}
                                    </span>
                                    <span className={`text-[8px] sm:text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-colors ${activeId === step.id ? 'text-gray-300' : 'text-gray-400'}`}>
                                        {step.id}
                                    </span>
                                    {step.pro && (
                                        <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 md:w-4 md:h-4 rounded-full border-2 border-white shadow-sm transition-colors ${activeId === step.id ? 'bg-white' : 'bg-brand-blue-500'}`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Display Card */}
                    <div className="w-full xl:w-1/2 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep.id}
                                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden border border-gray-100 flex flex-col justify-center min-h-[280px] md:min-h-[400px]"
                            >
                                {/* Massive background number */}
                                <div className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-4 text-[120px] md:text-[250px] font-black text-white dark:text-gray-700 drop-shadow-sm opacity-50 select-none pointer-events-none leading-none tracking-tighter">
                                    {activeStep.id}
                                </div>
                                {/* Soft glow for pro steps */}
                                {activeStep.pro && (
                                    <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-brand-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
                                )}

                                <div className="relative z-10 flex flex-col">
                                    <div className="flex items-start justify-between mb-5 md:mb-8 gap-4">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-2xl md:text-3xl text-brand-blue-600">
                                                {activeStep.icon}
                                            </span>
                                        </div>
                                        {activeStep.pro && (
                                            <span className="bg-editorial-black text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shrink-0">
                                                Essencia Pro
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="mb-3 md:mb-4">
                                        <span className="text-[10px] font-black text-brand-blue-600 uppercase tracking-[0.2em] mb-2 block">
                                            {t(`landing.mia.step${activeStep.id}.subtitle`)}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-editorial-black dark:text-white leading-[1.1] tracking-tighter">
                                            {t(`landing.mia.step${activeStep.id}.title`)}
                                        </h3>
                                    </div>

                                    <div className="w-10 h-0.5 bg-editorial-black/20 my-4 md:my-6"></div>

                                    <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                        {t(`landing.mia.step${activeStep.id}.long_desc`) || t(`landing.mia.step${activeStep.id}.subtitle`)}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MiaMethodSection;
