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
            // Buyer Filtering: Person reviewing profiles/iPad (Subagent Verified: Business person using iPad)
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2000&auto=format&fit=crop"
        },
        {
            key: 'process.management.step2',
            icon: 'key',
            // Guided Visits: Agent opening door / welcoming (Subagent Verified: Agent at door)
            image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=2000&auto=format&fit=crop"
        },
        {
            key: 'process.management.step3',
            icon: 'request_quote',
            // Offer Management: Contract review / Financial calculator (Subagent Verified: Calculator/Finance)
            image: "https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?q=80&w=2000&auto=format&fit=crop"
        },
    ];

    const closingSteps = [
        {
            key: 'process.closing.step1',
            icon: 'handshake',
            // Negotiation: Discussion/Analysis (Subagent Verified: People analyzing document)
            image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2000&auto=format&fit=crop"
        },
        {
            key: 'process.closing.step2',
            icon: 'description',
            // Arras Contract: Formal contract/Notary style (Subagent Verified: Swapped)
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop"
        },
        {
            key: 'process.closing.step3',
            icon: 'history_edu',
            // Notary: Pen signing document (Subagent Verified: Swapped)
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop"
        },
        {
            key: 'process.closing.step4',
            icon: 'celebration',
            // Post-Sale: Keys in hand / Champagne (Subagent Verified: Keys)
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop"
        },
    ];

    return (
        <div className="flex flex-col">

            {/* SECTION 1: MANAGEMENT (Clean Style) */}
            <section className="bg-white dark:bg-editorial-dark text-editorial-black dark:text-editorial-black py-24 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

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

                        <div className="flex flex-col gap-4">
                            {managementSteps.map((step, index) => (
                                <div
                                    key={step.key}
                                    onClick={() => setActiveManagementStep(index)}
                                    className={`group cursor-pointer rounded-xl transition-all duration-300 border ${activeManagementStep === index ? 'border-gray-300 bg-gray-50 dark:border-white/20 dark:bg-white/10 shadow-lg' : 'border-transparent hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                >
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm shrink-0 transition-colors ${activeManagementStep === index ? 'bg-black text-white dark:bg-brand-blue-500 dark:text-white' : 'bg-gray-100 dark:bg-editorial-black/5 text-gray-500 dark:text-gray-500'}`}>
                                                <span className="material-symbols-outlined">{step.icon}</span>
                                            </div>
                                            <h3 className={`text-xl font-bold transition-colors ${activeManagementStep === index ? 'text-black dark:text-editorial-black' : 'text-gray-500 dark:text-gray-500'}`}>
                                                {t(step.key)}
                                            </h3>
                                        </div>
                                        <span className={`material-symbols-outlined transition-transform duration-300 ${activeManagementStep === index ? 'rotate-180 text-black dark:text-editorial-black' : 'text-gray-400'}`}>
                                            expand_more
                                        </span>
                                    </div>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: activeManagementStep === index ? 'auto' : 0, opacity: activeManagementStep === index ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        {/* Mobile Embedded Image */}
                                        <div className="lg:hidden w-full h-48 rounded-xl overflow-hidden mb-4 relative mx-6 mt-2 max-w-[calc(100%-48px)]">
                                            <img
                                                src={step.image}
                                                alt={t(step.key)}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/10" />
                                        </div>

                                        <div className="px-6 pb-6 lg:pl-[88px]">
                                            <p className="text-gray-600 dark:text-gray-600 text-sm font-medium leading-relaxed">
                                                {t(`${step.key}.desc`)}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image - Hidden on Mobile, Visible on Desktop */}
                    <div className="hidden lg:block h-[500px] rounded-3xl overflow-hidden relative shadow-2xl">
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
            <section className="bg-editorial-dark text-editorial-black py-24 px-6 md:px-12 relative overflow-hidden">
                {/* Background Texture/Gradient */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                <div className="max-w-[1440px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left: Accordion */}
                    <div className="w-full">
                        <span className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase block mb-4">
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
                                    className={`group cursor-pointer rounded-xl transition-all duration-300 border ${activeClosingStep === index ? 'bg-white/50 border-gray-300 shadow-sm' : 'bg-transparent border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeClosingStep === index ? 'bg-brand-blue-500 text-white' : 'bg-white text-gray-400'}`}>
                                                <span className="material-symbols-outlined text-sm">{step.icon}</span>
                                            </div>
                                            <h3 className={`text-xl font-bold transition-colors ${activeClosingStep === index ? 'text-editorial-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                                {t(step.key)}
                                            </h3>
                                        </div>
                                        <span className={`material-symbols-outlined transition-transform duration-300 ${activeClosingStep === index ? 'rotate-180 text-editorial-black' : 'text-gray-400'}`}>
                                            expand_more
                                        </span>
                                    </div>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: activeClosingStep === index ? 'auto' : 0, opacity: activeClosingStep === index ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        {/* Mobile Embedded Image */}
                                        <div className="lg:hidden w-full h-48 rounded-xl overflow-hidden mb-4 relative mx-6 mt-2 max-w-[calc(100%-48px)]">
                                            <img
                                                src={step.image}
                                                alt={t(step.key)}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="px-6 pb-6 lg:pl-20">
                                            <p className="text-gray-600 leading-relaxed max-w-md">
                                                {t(`${step.key}.desc`)}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Dynamic Image Display - Hidden on Mobile */}
                    <div className="hidden lg:block lg:h-[700px] lg:sticky lg:top-24 w-full">
                        <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.1)] border border-gray-200">
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
                                        <span className="px-3 py-1 bg-white text-black text-[10px] uppercase font-black tracking-widest rounded-full mb-3 inline-block">
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
