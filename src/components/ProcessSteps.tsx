import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CarouselProgress from './ui/CarouselProgress';

const ProcessSteps: React.FC = () => {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);

    const steps = [
        {
            id: 'step1',
            icon: 'chat',
            titleKey: 'process.step1.title',
            descKey: 'process.step1.desc',
            // Digital communication / Smartphone Close-up (Subagent Verified)
            image: "https://images.unsplash.com/photo-1576470135814-6f01266eff55?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 'step2',
            icon: 'support_agent',
            titleKey: 'process.step2.title',
            descKey: 'process.step2.desc',
            // Coffee meeting / Professional conversation (Subagent Verified)
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 'step3',
            icon: 'real_estate_agent',
            titleKey: 'process.step3.title',
            descKey: 'process.step3.desc',
            // Architect / Plans / Measuring (Subagent Verified)
            image: "https://images.unsplash.com/photo-1568057373106-63057e421d1c?q=80&w=2000&auto=format&fit=crop"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="process-start" className="bg-white dark:bg-editorial-dark text-editorial-black dark:text-editorial-black py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-300 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase block mb-4"
                    >
                        {t('process.start.subtitle')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight"
                    >
                        {t('process.start.title')}
                    </motion.h2>
                </div>

                {/* Desktop Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="hidden md:grid md:grid-cols-3 gap-8"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            variants={cardVariants}
                            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-default"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${step.image})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                                    <span className="material-symbols-outlined text-white text-2xl">
                                        {step.icon}
                                    </span>
                                </div>

                                <span className="text-6xl font-black text-white/5 absolute top-6 right-6">0{index + 1}</span>

                                <h3 className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    {t(step.titleKey)}
                                </h3>
                                <p className="text-gray-300 font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                    {t(step.descKey)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile Carousel */}
                <div className="md:hidden relative">
                    <div
                        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar px-1 -mx-6 md:mx-0"
                        onScroll={(e) => {
                            const scrollLeft = e.currentTarget.scrollLeft;
                            const width = e.currentTarget.offsetWidth;
                            const itemWidth = width * 0.85; // Approx width of card
                            const currentIndex = Math.round(scrollLeft / itemWidth);
                            setCurrentSlide(Math.min(currentIndex, steps.length - 1));
                        }}
                    >
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="snap-center shrink-0 w-[85vw] h-[400px] rounded-2xl overflow-hidden relative ml-6 last:mr-6"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${step.image})` }}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                                        <span className="material-symbols-outlined text-white text-2xl">
                                            {step.icon}
                                        </span>
                                    </div>

                                    <span className="text-6xl font-black text-white/5 absolute top-6 right-6">0{index + 1}</span>

                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {t(step.titleKey)}
                                    </h3>
                                    <p className="text-gray-300 font-medium">
                                        {t(step.descKey)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Progress */}
                    <div className="px-6 mt-4">
                        <CarouselProgress
                            total={steps.length}
                            current={currentSlide}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
