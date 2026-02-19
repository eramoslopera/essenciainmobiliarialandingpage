import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const AnimatedCounter = ({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    className = ''
}: {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: false, margin: "-50px" }); // Enable re-triggering

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (isInView) {
            const controls = animate(0, value, {
                duration: duration,
                ease: "easeOut",
                onUpdate: (latest) => {
                    node.textContent = `${prefix}${Math.floor(latest).toLocaleString('es-ES')}${suffix}`;
                }
            });
            return () => controls.stop();
        } else {
            // Optional: Reset to 0 when out of view so it starts fresh next time
            node.textContent = `${prefix}0${suffix}`;
        }
    }, [isInView, value, duration, prefix, suffix]);

    return <span ref={ref} className={className} />;
};

const StatsSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="bg-[#222222] text-white py-12 md:py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-12">

                    {/* Main Highligh Stat: Volume */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }} // Re-trigger animation
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        {/* Title and Subtitle added as per request */}
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-brand-blue-500">
                                ¿Por qué elegirnos?
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                                Estos son los datos que muestran nuestro trabajo
                            </p>
                        </div>

                        <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6">
                            <AnimatedCounter value={13000000} suffix="€" duration={2.5} />
                        </div>

                        <p className="text-lg md:text-xl text-gray-400 font-light max-w-lg mx-auto">
                            {t('stats.vol.label')}
                        </p>
                    </motion.div>

                    {/* Secondary Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full max-w-6xl mx-auto border-t border-gray-700 pt-8">
                        {/* Stat 1: Props Sold/Month */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }} // Re-trigger animation
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col items-center p-4"
                        >
                            <span className="text-5xl md:text-6xl font-bold mb-2">
                                <AnimatedCounter value={10} duration={2} />
                            </span>
                            <span className="text-base md:text-lg text-gray-400 font-light">
                                {t('stats.sold_per_month.label')}
                            </span>
                        </motion.div>

                        {/* Stat 2: Days to sell */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }} // Re-trigger animation
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col items-center p-4"
                        >
                            <span className="text-5xl md:text-6xl font-bold mb-2">
                                <AnimatedCounter value={30} duration={2} />
                            </span>
                            <span className="text-base md:text-lg text-gray-400 font-light">
                                {t('stats.days.label')}
                            </span>
                        </motion.div>

                        {/* Stat 3: Properties for sale */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }} // Re-trigger animation
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col items-center p-4"
                        >
                            <span className="text-5xl md:text-6xl font-bold mb-2">
                                <AnimatedCounter value={150} prefix="+" duration={2} />
                            </span>
                            <span className="text-base md:text-lg text-gray-400 font-light">
                                {t('stats.active_listings.label')}
                            </span>
                        </motion.div>

                        {/* Stat 4: Success Ratio */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }} // Re-trigger animation
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col items-center p-4"
                        >
                            <span className="text-5xl md:text-6xl font-bold mb-2">
                                <AnimatedCounter value={95} suffix="%" duration={2} />
                            </span>
                            <span className="text-base md:text-lg text-gray-400 font-light">
                                {t('stats.success.label')}
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
