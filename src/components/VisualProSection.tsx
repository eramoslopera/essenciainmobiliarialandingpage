import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import PhoneMockup from './PhoneMockup';
import { useLanguage } from '../context/LanguageContext';

// --- Sub-components ---

const CineVideoSection = () => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-background-dark overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2 flex flex-col gap-6">
                    <motion.div style={{ opacity }} className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-editorial-black text-white text-[10px] uppercase font-black tracking-widest rounded-full">New</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visual Pro Pack</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-editorial-black dark:text-white tracking-tighter leading-[0.9]"
                    >
                        Reportaje <br />
                        <span className="text-gray-300">Cinematográfico</span>
                    </motion.h2>

                    <p className="text-lg text-gray-500 font-medium max-w-md">
                        No son solo fotos. Es una experiencia inmersiva. Creamos un "Portal" digital a tu vivienda con vídeos verticales estilo cine.
                    </p>

                    <ul className="space-y-4 mt-4">
                        {['4K Resolution', 'Drone FPV', 'Music Sync', 'Color Grading'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                                <span className="w-2 h-2 bg-editorial-black dark:bg-white rounded-full"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:w-1/2 relative flex justify-center">
                    <motion.div style={{ scale }} className="relative z-10">
                        <PhoneMockup className="h-[650px] w-[320px] border-gray-900 shadow-2xl skew-y-0 rotate-0">
                            <video
                                className="w-full h-full object-cover"
                                src="/Packpro_Essencia.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </PhoneMockup>
                    </motion.div>

                    {/* Abstract decorative elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-100 rounded-full -z-10 opacity-50"
                    ></motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-dashed border-gray-200 rounded-full -z-10 opacity-30"
                    ></motion.div>
                </div>
            </div>
        </section>
    );
};

const SocialStack = () => {
    return (
        <section className="py-32 bg-editorial-gray dark:bg-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black text-editorial-black dark:text-white tracking-tighter mb-4">
                    Viralidad <span className="text-gray-400">Garantizada</span>
                </h2>
                <p className="max-w-xl mx-auto text-gray-500 font-medium">
                    Ponemos tu casa donde están los ojos. Instagram, TikTok y YouTube Shorts.
                </p>
            </div>

            <div className="relative h-[600px] w-full max-w-5xl mx-auto flex items-center justify-center perspective-1000">
                {/* Stack of cards mimicking social posts */}
                <motion.div
                    initial={{ x: -100, rotate: -15, opacity: 0 }}
                    whileInView={{ x: -250, rotate: -10, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-10 w-[280px] h-[500px] bg-white shadow-2xl rounded-[2rem] p-4 flex flex-col gap-2 transform"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600"></div>
                        <div className="h-2 w-20 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                            <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full"></div>
                            <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full"></div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 50, scale: 0.9, opacity: 0 }}
                    whileInView={{ y: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute z-20"
                >
                    <PhoneMockup className="h-[580px] w-[300px] !border-editorial-black shadow-2xl">
                        <video
                            className="w-full h-full object-cover"
                            src="https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-luxury-building-interior-15227-large.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </PhoneMockup>
                </motion.div>

                <motion.div
                    initial={{ x: 100, rotate: 15, opacity: 0 }}
                    whileInView={{ x: 250, rotate: 10, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-10 w-[280px] h-[500px] bg-white shadow-2xl rounded-[2rem] p-4 flex flex-col gap-2 transform"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">Tk</div>
                        <div className="h-2 w-20 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1600596542815-22b5d0325e16?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                        <div className="absolute bottom-10 left-4 text-white">
                            <div className="h-2 w-32 bg-white/50 rounded mb-2"></div>
                            <div className="h-2 w-20 bg-white/50 rounded"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

const MasonryGallery = () => {
    // Ideally use real images here
    const images = [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop", // Kitchen
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", // Bedroom
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop", // Detail
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", // Exterior
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=800&auto=format&fit=crop", // Pool
    ];

    return (
        <section className="py-24 px-6 md:px-12 bg-white dark:bg-background-dark">
            <div className="max-w-[1440px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <h2 className="text-5xl font-black tracking-tighter mb-4">Fotografía <br /> Editorial</h2>
                    <p className="text-gray-500 max-w-sm">
                        Cada ángulo cuenta una historia. Capturamos la esencia, no solo el espacio.
                    </p>
                </div>
                <button className="hidden md:block px-8 py-3 border border-editorial-black uppercase text-xs font-black tracking-widest hover:bg-editorial-black hover:text-white transition-colors">
                    Ver Portfolio
                </button>
            </div>

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        className={`relative group overflow-hidden cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${i === 3 ? 'md:col-span-2' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={img}
                            alt="Property Detail"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

const BeforeAfterSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        setSliderPosition(percentage);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        setSliderPosition(percentage);
    }

    return (
        <section className="py-24 bg-[#222222] text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <div
                        ref={containerRef}
                        className="relative w-full aspect-[4/3] rounded-sm overflow-hidden cursor-ew-resize select-none"
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                    >
                        {/* After Image (Background) */}
                        <img
                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            alt="After"
                        />

                        {/* Before Image (Clipped) */}
                        <div
                            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop" // A darker/messier version ideally
                                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-75 brightness-75"
                                alt="Before"
                            />
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                                Antes
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                            Después
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <span className="material-symbols-outlined text-black text-sm">code</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                        Home Staging
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        No vendemos casas vacías, vendemos hogares. Nuestro equipo de estilismo transforma cada espacio para maximizar su potencial y precio de venta.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <span className="text-3xl font-black text-gray-700 block mb-2">+15%</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Valor de Venta</span>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-gray-700 block mb-2">-40%</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Tiempo en mercado</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const VisualProSection: React.FC = () => {
    return (
        <div className="w-full relative bg-white dark:bg-background-dark">
            <CineVideoSection />
            <MasonryGallery />
            <BeforeAfterSlider />
        </div>
    );
};

export default VisualProSection;
