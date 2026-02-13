import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Modal from './Modal';

const MiaMethodSection: React.FC = () => {
    const { t } = useLanguage();
    const [selectedStep, setSelectedStep] = useState<{ id: number; title: string; content: string } | null>(null);

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

    const handleStepClick = (stepId: number) => {
        setSelectedStep({
            id: stepId,
            title: t(`landing.mia.step${stepId}.title`),
            content: t(`landing.mia.step${stepId}.long_desc`) || t(`landing.mia.step${stepId}.subtitle`) // Fallback to subtitle if long desc not available yet
        });
    };

    return (
        <section id="mia-method" className="py-24 px-6 lg:px-12 bg-white dark:bg-background-dark relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                <span className="text-[200px] font-black text-editorial-black dark:text-white">MIA</span>
            </div>
            <div className="max-w-[1440px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">{t('landing.mia.exclusive')}</span>
                    <h2 className="text-5xl lg:text-7xl font-black text-editorial-black dark:text-white tracking-tighter mb-4">
                        {t('landing.mia.id')}
                    </h2>
                    <p className="text-xl font-medium text-gray-400 tracking-widest uppercase">{t('landing.mia.subtitle')}</p>
                </div>

                {/* Mobile Carousel Controls */}
                <div className="md:hidden relative">
                    <motion.div
                        id="mia-carousel"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.05 } }
                        }}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 -mx-6 pb-8 hide-scrollbar"
                        onScroll={(e) => {
                            const scrollLeft = e.currentTarget.scrollLeft;
                            const width = e.currentTarget.offsetWidth;
                            const index = Math.round(scrollLeft / width);
                            // Update a local state if we wanted strict tracking, 
                            // but for simple progress bar based on scroll position:
                            const progress = scrollLeft / (e.currentTarget.scrollWidth - width);
                            const progressBar = document.getElementById('mia-progress-bar');
                            if (progressBar) {
                                progressBar.style.width = `${Math.max(0, Math.min(100, progress * 100))}%`;
                            }
                        }}
                    >
                        {steps.map((step) => (
                            <motion.div
                                key={step.id}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                whileHover={{ y: -5, borderColor: '#000' }}
                                onClick={() => handleStepClick(step.id)}
                                className="shrink-0 snap-center w-[85vw] bg-white dark:bg-gray-800 p-6 flex flex-col items-center text-center relative group transition-all duration-300 shadow-sm border border-transparent hover:shadow-xl hover:z-10 cursor-pointer rounded-xl h-[300px] justify-center"
                            >
                                {step.pro && (
                                    <span className="absolute top-4 right-4 bg-editorial-black text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">PRO</span>
                                )}
                                <span className="text-4xl font-black text-gray-200 absolute top-2 left-4">{step.id}</span>
                                <span className="material-symbols-outlined text-5xl mb-6 text-editorial-black dark:text-white mt-2 group-hover:scale-110 transition-transform">{step.icon}</span>
                                <h3 className="text-xl font-black tracking-tight mb-2">{t(`landing.mia.step${step.id}.title`)}</h3>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{t(`landing.mia.step${step.id}.subtitle`)}</p>

                                <div className="mt-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-black tracking-widest bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
                                    + Info
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Mobile Navigation & Progress */}
                    <div className="flex items-center gap-4 mt-6 px-6 md:hidden relative z-20">
                        <button
                            onClick={() => {
                                document.getElementById('mia-carousel')?.scrollBy({ left: -window.innerWidth * 0.85, behavior: 'smooth' });
                            }}
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-black hover:text-white transition-colors shrink-0 bg-white dark:bg-editorial-black"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>

                        {/* Progress Bar */}
                        <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div id="mia-progress-bar" className="h-full bg-editorial-black dark:bg-white w-0 transition-all duration-100"></div>
                        </div>

                        <button
                            onClick={() => {
                                document.getElementById('mia-carousel')?.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
                            }}
                            className="w-10 h-10 rounded-full bg-editorial-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0"
                        >
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Desktop Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } }
                    }}
                    className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-4"
                >
                    {steps.map((step) => (
                        <motion.div
                            key={step.id}
                            variants={{
                                hidden: { opacity: 0, scale: 0.9 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ y: -5, borderColor: '#000' }}
                            onClick={() => handleStepClick(step.id)}
                            className="bg-white dark:bg-gray-800 p-6 flex flex-col items-center text-center relative group transition-all duration-300 shadow-sm border border-transparent hover:shadow-xl hover:z-10 cursor-pointer rounded-xl h-full min-h-[280px] justify-center"
                        >
                            {step.pro && (
                                <span className="absolute top-4 right-4 bg-editorial-black text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">PRO</span>
                            )}
                            <span className="text-4xl font-black text-gray-200 absolute top-2 left-4">{step.id}</span>
                            <span className="material-symbols-outlined text-4xl mb-4 text-editorial-black dark:text-white mt-6 group-hover:scale-110 transition-transform">{step.icon}</span>
                            <h3 className="text-sm font-black tracking-tight mb-1">{t(`landing.mia.step${step.id}.title`)}</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t(`landing.mia.step${step.id}.subtitle`)}</p>

                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-black tracking-widest bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                + Info
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Interactive Modal */}
            <AnimatePresence>
                {selectedStep && (
                    <Modal
                        isOpen={!!selectedStep}
                        onClose={() => setSelectedStep(null)}
                        title={selectedStep.title}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-1 bg-editorial-black mb-2"></div>
                            <p className="text-lg font-medium">{selectedStep.content}</p>
                            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-500 italic">
                                {t('landing.mia.fundamental')}
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedStep(null)}
                            className="mt-6 w-full py-3 bg-editorial-black text-white uppercase text-xs font-black tracking-widest hover:bg-gray-800 transition-colors"
                        >
                            {t('common.understood')}
                        </button>
                    </Modal>
                )}
            </AnimatePresence>
        </section>
    );
};

export default MiaMethodSection;
