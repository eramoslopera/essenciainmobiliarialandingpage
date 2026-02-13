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

    return (
        <section className="bg-[#222222] text-white py-24 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <span className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase block mb-4">
                            {t('sell.process.label')}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                            {t('sell.process.title')}
                        </h2>
                    </div>
                </div>

                {/* Numbered Timeline */}
                <div className="mb-16 relative hidden md:block">
                    {/* Line Background */}
                    <div className="absolute top-6 left-0 w-full h-[1px] bg-white/10 z-0"></div>

                    <div className="flex justify-between relative z-10">
                        {steps.map((step, index) => (
                            <button
                                key={step.id}
                                onClick={() => setCurrentStep(index)}
                                className={`group flex flex-col items-center gap-4 transition-all duration-300 w-48 ${currentStep === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                            >
                                <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-[#222222] transition-all duration-300 ${currentStep === index ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : ''}`}>
                                    <span className="font-mono text-sm font-bold">0{index + 1}</span>
                                </div>
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-center max-w-[150px] leading-relaxed">
                                    {t(`sell.${step.id}`)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Progress Bar */}
                <div className="md:hidden flex items-center gap-2 mb-8">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${currentStep === index ? 'bg-white' : 'bg-white/20'}`}
                        />
                    ))}
                </div>

                {/* Main Carousel Area */}
                <div className="relative h-[500px] w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0"
                        >
                            {/* Background Image with Gradient Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${steps[currentStep].image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center gap-4 mb-6"
                                >
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">{steps[currentStep].icon}</span>
                                    </div>
                                    <span className="md:hidden text-sm font-bold uppercase tracking-widest text-gray-300">
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
                                    className="text-lg md:text-xl text-gray-300 leading-relaxed"
                                >
                                    {t(`sell.${steps[currentStep].id}.long`)}
                                </motion.p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons (Floating) */}
                    <div className="absolute bottom-8 right-8 flex gap-4">
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
                </div>
            </div>
        </section>
    );
};

export default SalesProcessSection;
