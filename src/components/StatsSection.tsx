import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
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
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
        duration: duration * 1000
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                // Determine formatting based on the magnitude of the number or specific requirements
                // For the main volume (13,000,000), we want specific formatting
                // For others, standard locale string is usually fine
                ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString('es-ES')}${suffix}`;
            }
        });
    }, [springValue, suffix, prefix]);

    return <span ref={ref} className={className} />;
};

const StatsSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="bg-[#222222] text-white py-16 md:py-24 relative overflow-hidden">
            {/* Subtle background element/gradient if needed, keeping it clean for now to match brand */}

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center text-center space-y-12 md:space-y-16">

                    {/* Main Highligh Stat: Volume */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium tracking-widest text-gray-400 uppercase">
                                {t('stats.status')}
                            </span>
                        </div>

                        <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-4">
                            <AnimatedCounter value={13000000} suffix="€" />
                        </div>

                        <p className="text-lg md:text-xl text-gray-400 font-light max-w-lg mx-auto">
                            {t('stats.vol.label')}
                        </p>
                    </motion.div>

                    {/* Secondary Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full max-w-6xl mx-auto border-t border-gray-800 pt-12">
                        {/* Stat 1: Props Sold/Month */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col items-center p-4"
                        >
                            <span className="text-4xl md:text-5xl font-bold mb-2">
                                <AnimatedCounter value={10} />
                            </span>
                            <span className="text-sm md:text-base text-gray-400 font-light">
                                {t('stats.sold_per_month.label')}
                            </span>
                        </motion.div>

                        {/* Stat 2: Days to sell */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col items-center p-4"
                        >
                            <span className="text-4xl md:text-5xl font-bold mb-2">
                                <AnimatedCounter value={30} />
                            </span>
                            <span className="text-sm md:text-base text-gray-400 font-light">
                                {t('stats.days.label')}
                            </span>
                        </motion.div>

                        {/* Stat 3: Properties for sale */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col items-center p-4"
                        >
                            <span className="text-4xl md:text-5xl font-bold mb-2">
                                <AnimatedCounter value={150} prefix="+" />
                            </span>
                            <span className="text-sm md:text-base text-gray-400 font-light">
                                {t('stats.active_listings.label')}
                            </span>
                        </motion.div>

                        {/* Stat 4: Success Ratio */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col items-center p-4"
                        >
                            <span className="text-4xl md:text-5xl font-bold mb-2">
                                <AnimatedCounter value={95} suffix="%" />
                            </span>
                            <span className="text-sm md:text-base text-gray-400 font-light">
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
