import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ProcessSteps: React.FC = () => {
    const { t } = useLanguage();

    const steps = [
        {
            id: 'step1',
            icon: 'chat',
            titleKey: 'process.step1.title',
            descKey: 'process.step1.desc'
        },
        {
            id: 'step2',
            icon: 'support_agent',
            titleKey: 'process.step2.title',
            descKey: 'process.step2.desc'
        },
        {
            id: 'step3',
            icon: 'real_estate_agent',
            titleKey: 'process.step3.title',
            descKey: 'process.step3.desc'
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

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="bg-white dark:bg-[#111] text-editorial-black dark:text-white py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
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
                        className="text-4xl md:text-5xl font-black tracking-tight"
                    >
                        {t('process.start.title')}
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative"
                >
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gray-200 dark:bg-white/10 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            variants={itemVariants}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <span className="material-symbols-outlined text-3xl text-gray-800 dark:text-white">
                                    {step.icon}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t(step.titleKey)}</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                                {t(step.descKey)}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessSteps;
