import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ManagementClosingSection: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'management' | 'closing'>('management');

    const content = {
        management: {
            titleKey: 'process.management.title',
            subtitleKey: 'process.management.subtitle',
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop", // Agent showing a luxury house
            steps: [
                { key: 'process.management.step1', icon: 'filter_alt' },
                { key: 'process.management.step2', icon: 'key' },
                { key: 'process.management.step3', icon: 'request_quote' },
            ]
        },
        closing: {
            titleKey: 'process.closing.title',
            subtitleKey: 'process.closing.subtitle',
            image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2000&auto=format&fit=crop", // Signing papers / Plans
            steps: [
                { key: 'process.closing.step1', icon: 'handshake' },
                { key: 'process.closing.step2', icon: 'description' },
                { key: 'process.closing.step3', icon: 'history_edu' },
                { key: 'process.closing.step4', icon: 'celebration' },
            ]
        }
    };

    return (
        <section className="bg-editorial-black text-white py-24 md:py-32 overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Accordion Navigation */}
                <div className="flex flex-col gap-8 z-10">
                    <div>
                        <span className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase block mb-4">
                            {t('sell.process.label')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                            {t('process.management.subtitle')} {/* "We handle everything" */}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 mt-8">
                        {/* Tab: Management */}
                        <div
                            className={`p-8 border rounded-2xl cursor-pointer transition-all duration-300 ${activeTab === 'management' ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                            onClick={() => setActiveTab('management')}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className={`text-2xl font-bold ${activeTab === 'management' ? 'text-white' : 'text-gray-400'}`}>
                                    {t('process.management.title')}
                                </h3>
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeTab === 'management' ? 'border-white bg-white text-black' : 'border-white/20 text-gray-500'}`}>
                                    <span className="material-symbols-outlined text-sm">
                                        {activeTab === 'management' ? 'remove' : 'add'}
                                    </span>
                                </div>
                            </div>

                            <motion.div
                                initial={false}
                                animate={{ height: activeTab === 'management' ? 'auto' : 0, opacity: activeTab === 'management' ? 1 : 0 }}
                                className="overflow-hidden"
                            >
                                <ul className="space-y-4 pt-2">
                                    {content.management.steps.map((step) => (
                                        <li key={step.key} className="flex items-center gap-3 text-gray-300">
                                            <span className="material-symbols-outlined text-white/50 text-sm">{step.icon}</span>
                                            {t(step.key)}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Tab: Closing */}
                        <div
                            className={`p-8 border rounded-2xl cursor-pointer transition-all duration-300 ${activeTab === 'closing' ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                            onClick={() => setActiveTab('closing')}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className={`text-2xl font-bold ${activeTab === 'closing' ? 'text-white' : 'text-gray-400'}`}>
                                    {t('process.closing.title')}
                                </h3>
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeTab === 'closing' ? 'border-white bg-white text-black' : 'border-white/20 text-gray-500'}`}>
                                    <span className="material-symbols-outlined text-sm">
                                        {activeTab === 'closing' ? 'remove' : 'add'}
                                    </span>
                                </div>
                            </div>

                            <motion.div
                                initial={false}
                                animate={{ height: activeTab === 'closing' ? 'auto' : 0, opacity: activeTab === 'closing' ? 1 : 0 }}
                                className="overflow-hidden"
                            >
                                <ul className="space-y-4 pt-2">
                                    {content.closing.steps.map((step) => (
                                        <li key={step.key} className="flex items-center gap-3 text-gray-300">
                                            <span className="material-symbols-outlined text-white/50 text-sm">{step.icon}</span>
                                            {t(step.key)}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Dynamic Image */}
                <div className="h-[500px] lg:h-[700px] relative rounded-3xl overflow-hidden shadow-2xl z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${content[activeTab].image})` }}
                            />
                            <div className="absolute inset-0 bg-black/20" /> {/* Subtle tint */}

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl max-w-xs">
                                <span className="block text-white font-black text-xl mb-1">
                                    {activeTab === 'management' ? '55 Days' : '100% Secure'}
                                </span>
                                <span className="text-xs text-gray-300 uppercase tracking-widest">
                                    {activeTab === 'management' ? 'Avg. Sale Time' : 'Certified Process'}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default ManagementClosingSection;
