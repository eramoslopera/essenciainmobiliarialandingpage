import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SalesProcessSection: React.FC = () => {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            id: 'step1',
            image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2000&auto=format&fit=crop", // Planos/Estrategia
            icon: "analytics"
        },
        {
            id: 'step2',
            image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop", // Interior bonito
            icon: "brush"
        },
        {
            id: 'step3',
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop", // Marketing/Digital
            icon: "rocket_launch"
        },
        {
            id: 'step4',
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop", // Handshake/Closing
            icon: "handshake"
        },
        {
            id: 'step5',
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop", // Keys/Post-sale
            icon: "vpn_key"
        }
    ];

    const nextStep = () => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    };

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextStep();
        } else if (isRightSwipe) {
            prevStep();
        }
    }

    return (
        <section className="bg-white text-editorial-black py-24 relative overflow-hidden touch-pan-y">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-brand-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        {t('sales.subtitle')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-editorial-black"
                    >
                        {t('sales.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
                    >
                        {t('sales.desc')}
                    </motion.p>
                </div>

                {/* Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-1/2" />

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 top-0 w-12 h-12 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center z-10">
                                    <div className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white transition-all duration-300 ${currentStep === index ? 'border-brand-blue-500 scale-110 shadow-lg' : ''}`}>
                                        <div className={`w-3 h-3 rounded-full ${currentStep >= index ? 'bg-brand-blue-500' : 'bg-gray-300'}`} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="pl-16 md:pl-0 w-full md:w-1/2 md:px-12 pt-2">
                                    <div
                                        className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${currentStep === index ? 'bg-gray-50 border-brand-blue-500/30 shadow-lg' : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'}`}
                                        onMouseEnter={() => setCurrentStep(index)}
                                    >
                                        <span className="text-6xl font-black text-gray-100 absolute -top-8 opacity-50 select-none">
                                            0{index + 1}
                                        </span>
                                        <h3 className={`text-2xl font-bold mb-3 transition-colors ${currentStep === index ? 'text-brand-blue-500' : 'text-editorial-black'}`}>
                                            {t(`sell.${step.id}.title`)}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {t(`sell.${step.id}.desc`)}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 -z-10"
                    >
                        <img
                            src={steps[currentStep].image}
                            alt={t(`sell.${steps[currentStep].id}.title`)}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-editorial-black/10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-brand-blue-500">{steps[currentStep].icon}</span>
                        </div>
                        <span className="md:hidden text-sm font-bold uppercase tracking-widest text-gray-500">
                            Step {currentStep + 1} / {steps.length}
                        </span>
                    </motion.div>

                    <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl md:text-5xl font-black tracking-tight mb-4"
                    >
                        {t(`sell.${steps[currentStep].id}`)}
                    </motion.h3>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-600 leading-relaxed"
                    >
                        {/* {t(`sell.${steps[currentStep].id}.long`)} */}
                        {t(`sell.${steps[currentStep].id}.long`)}
                    </motion.p>
                </div>

                {/* Navigation Buttons (Desktop Floating / Mobile Bottom) */}
                <div className="absolute bottom-8 right-8 hidden md:flex gap-4">
                    <button
                        onClick={prevStep}
                        className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all backdrop-blur-sm"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button
                        onClick={nextStep}
                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-all shadow-lg"
                    >
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div >

            {/* Mobile Navigation Buttons (Outside Image) */}
            < div className="flex md:hidden justify-between items-center mt-6" >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {currentStep + 1} / {steps.length}
                </span>
                <div className="flex gap-4">
                    <button
                        onClick={prevStep}
                        className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button
                        onClick={nextStep}
                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div >
        </section >
    );
};

export default SalesProcessSection;
