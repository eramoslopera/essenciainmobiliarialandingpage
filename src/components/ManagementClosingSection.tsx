import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ManagementClosingSection: React.FC = () => {
    const { t } = useLanguage();

    const managementSteps = [
        { key: 'process.management.step1', icon: 'filter_alt' },
        { key: 'process.management.step2', icon: 'key' },
        { key: 'process.management.step3', icon: 'request_quote' },
    ];

    const closingSteps = [
        { key: 'process.closing.step1', icon: 'handshake' },
        { key: 'process.closing.step2', icon: 'description' },
        { key: 'process.closing.step3', icon: 'history_edu' }, // notary signature
        { key: 'process.closing.step4', icon: 'celebration' },
    ];

    return (
        <section className="bg-editorial-black text-white py-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

                {/* Column 1: Management */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="absolute top-0 left-0 w-20 h-[1px] bg-white/20 mb-8" />
                    <span className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase block mb-4 mt-8">
                        {t('process.management.subtitle')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8 text-white">
                        {t('process.management.title')}
                    </h2>

                    <ul className="space-y-6">
                        {managementSteps.map((step, index) => (
                            <motion.li
                                key={step.key}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                    <span className="material-symbols-outlined text-sm">{step.icon}</span>
                                </div>
                                <span className="text-lg text-gray-300 font-light group-hover:text-white transition-colors">
                                    {t(step.key)}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Column 2: Closing */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute top-0 left-0 w-20 h-[1px] bg-white/20 mb-8 md:hidden" /> {/* Separator for mobile */}
                    <div className="hidden md:block absolute top-0 left-0 w-20 h-[1px] bg-white/20 mb-8" />

                    <span className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase block mb-4 mt-8">
                        {t('process.closing.subtitle')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8 text-white">
                        {t('process.closing.title')}
                    </h2>

                    <ul className="space-y-6">
                        {closingSteps.map((step, index) => (
                            <motion.li
                                key={step.key}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index + 0.3 }} // Staggered slightly after management steps
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                    <span className="material-symbols-outlined text-sm">{step.icon}</span>
                                </div>
                                <span className="text-lg text-gray-300 font-light group-hover:text-white transition-colors">
                                    {t(step.key)}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default ManagementClosingSection;
