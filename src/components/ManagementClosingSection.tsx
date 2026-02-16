import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ManagementClosingSection: React.FC = () => {
    const { t } = useLanguage();

    // State for the Management section
    const [activeManagementStep, setActiveManagementStep] = useState<number>(0);
    // State for the Closing section
    const [activeClosingStep, setActiveClosingStep] = useState<number>(0);

    const managementSteps = [
        {
            key: 'process.management.step1',
            icon: 'filter_alt',
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" // Analysis/Filtering
        },
        {
            key: 'process.management.step2',
            icon: 'key',
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop" // Open House/Visits
        },
        {
            key: 'process.management.step3',
            icon: 'request_quote',
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop" // Offers/Paperwork
        },
    ];

    const closingSteps = [
        {
            key: 'process.closing.step1',
            icon: 'handshake',
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop" // Negotiation/Meeting
        },
        {
            key: 'process.closing.step2',
            icon: 'description',
            image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=2000&auto=format&fit=crop" // Arras/Signing
        },
        {
            key: 'process.closing.step3',
            icon: 'history_edu', // Notary
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop" // Official papers / Seal
        },
        {
            key: 'process.closing.step4',
            icon: 'celebration',
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop" // Keys / Celebration
        },
    ];

    return (
        <div className="flex flex-col">

            {/* SECTION 1: MANAGEMENT (Clean Style) */}
            <section className="bg-white dark:bg-[#151f2b] text-editorial-black dark:text-white py-24 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase block mb-4">
                            {t('process.management.subtitle')} {/* "We handle everything" */}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                            {t('process.management.title')}
                        </h2>

                        <div className="space-y-4">
                            {managementSteps.map((step, index) => (
                                <motion.div
                                    key={step.key}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setActiveManagementStep(index)}
                                    className={`flex items-start gap-6 p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${activeManagementStep === index ? 'border-gray-300 bg-gray-50 dark:border-white/20 dark:bg-white/10 shadow-lg scale-[1.02]' : 'border-transparent hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm shrink-0 transition-colors ${activeManagementStep === index ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-300'}`}>
                                        <span className="material-symbols-outlined">{step.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold mb-1 transition-colors ${activeManagementStep === index ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {t(step.key)}
                                        </h3>
                                        {activeManagementStep === index && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="text-gray-600 dark:text-gray-300 text-sm font-medium mt-2 leading-relaxed"
                                            >
                                                {t(`${step.key}.desc`)}
                                            </motion.p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image */}
                    <div className="h-[500px] rounded-3xl overflow-hidden relative shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeManagementStep}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <img
                                    src={managementSteps[activeManagementStep].image}
                                    alt={t(managementSteps[activeManagementStep].key)}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* SECTION 2: CLOSING (Premium / AI Render Style) */}
            <section className="bg-[#0f0f0f] text-white py-24 px-6 md:px-12 relative overflow-hidden">
                {/* Background Texture/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505]" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                <div className="max-w-[1440px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left: Accordion */}
                    <div>
                        <span className="text-xs font-black tracking-[0.2em] text-blue-400 uppercase block mb-4">
                            {t('process.closing.subtitle')} {/* "The final mile" */}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12">
                            {t('process.closing.title')}
                        </h2>

                        <div className="flex flex-col gap-4">
                            {closingSteps.map((step, index) => (
                                <div
                                    key={step.key}
                                    onClick={() => setActiveClosingStep(index)}
                                    className={`group cursor-pointer rounded-xl transition-all duration-300 border ${activeClosingStep === index ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:border-white/10'}`}
                                >
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeClosingStep === index ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                                                <span className="material-symbols-outlined text-sm">{step.icon}</span>
                                            </div>
                                            <h3 className={`text-xl font-bold transition-colors ${activeClosingStep === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                {t(step.key)}
                                            </h3>
                                        </div>
                                        <span className={`material-symbols-outlined transition-transform duration-300 ${activeClosingStep === index ? 'rotate-180 text-white' : 'text-gray-600'}`}>
                                            expand_more
                                        </span>
                                    </div>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: activeClosingStep === index ? 'auto' : 0, opacity: activeClosingStep === index ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pl-20">
                                            <p className="text-gray-400 leading-relaxed max-w-md">
                                                {t(`${step.key}.desc`)}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Dynamic Image Display */}
                    <div className="lg:h-[700px] h-[400px] sticky top-24">
                        <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeClosingStep}
                                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={closingSteps[activeClosingStep].image}
                                        alt={t(closingSteps[activeClosingStep].key)}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* Overlay Text */}
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <span className="px-3 py-1 bg-blue-500 text-white text-[10px] uppercase font-black tracking-widest rounded-full mb-3 inline-block">
                                            Step {activeClosingStep + 4}
                                        </span>
                                        <h4 className="text-2xl font-bold text-white">
                                            {t(closingSteps[activeClosingStep].key)}
                                        </h4>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default ManagementClosingSection;
