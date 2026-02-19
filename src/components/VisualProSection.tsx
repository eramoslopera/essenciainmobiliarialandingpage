import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import PhoneMockup from './PhoneMockup';
import { useLanguage } from '../context/LanguageContext';
import CarouselProgress from './ui/CarouselProgress';

// --- Sub-components ---

// Reusable Video Component with Auto-Play on Scroll
const AutoPlayVideo = ({ src, className }: { src: string, className?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Simple Intersection Observer for Play/Pause
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => { }); // catch play errors (e.g. low power mode)
                } else {
                    videoRef.current?.pause();
                }
            },
            { threshold: 0.5 } // Play when 50% visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={className}>
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={src}
                muted
                loop
                playsInline
            />
        </div>
    );
};

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
                        <span className="px-3 py-1 bg-brand-blue-500 text-editorial-black text-[10px] uppercase font-black tracking-widest rounded-full">{t('common.new')}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pack Visual Pro</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-editorial-black dark:text-white tracking-tighter leading-[0.9]"
                    >
                        Pack <br />
                        <span className="text-brand-blue-500">Visual Pro</span>
                    </motion.h2>

                    <p className="text-lg text-gray-500 font-medium max-w-md">
                        No son solo fotos. Es una experiencia inmersiva. Creamos un "Portal" digital a tu vivienda con vídeos verticales estilo cine.
                    </p>

                    <ul className="space-y-4 mt-4">
                        {['Fotos y videos con DRON', 'Render con IA', 'Fotografía editorial', 'Video profesional', 'Planos en 3D', 'Tour Virtual'].map((item, i) => (
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
                            <AutoPlayVideo
                                src="/Packpro_Essencia.mp4"
                                className="w-full h-full"
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

const MasonryGallery = () => {
    const images = [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop", // Modern Kitchen
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop", // Living Room
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", // Bedroom
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", // Exterior / Pool
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <section className="py-24 px-6 md:px-12 bg-white dark:bg-background-dark">
            <div className="max-w-[1440px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <h2 className="text-5xl font-black tracking-tighter mb-4">Fotografía <br /> Editorial</h2>
                    <p className="text-gray-500 max-w-sm">
                        Cada ángulo cuenta una historia. Capturamos la esencia, no solo el espacio.
                    </p>
                </div>

            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative px-6 -mx-6 mb-8">
                <div
                    id="editorial-carousel"
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar px-6 -mx-6"
                    onScroll={(e) => {
                        const scrollLeft = e.currentTarget.scrollLeft;
                        const width = e.currentTarget.offsetWidth;
                        const itemWidth = width * 0.85;
                        const currentIndex = Math.round(scrollLeft / itemWidth);
                        setCurrentSlide(Math.min(currentIndex, images.length - 1));
                    }}
                >
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="relative shrink-0 snap-center w-[85vw] h-[300px] rounded-lg overflow-hidden"
                        >
                            <img
                                src={img}
                                alt="Property Detail"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile Navigation & Progress */}
                <div className="mt-4 px-6 md:hidden">
                    <CarouselProgress
                        total={images.length}
                        current={currentSlide}
                    />
                </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid max-w-[1440px] mx-auto md:grid-cols-4 gap-4 px-0 md:px-0 auto-rows-[300px]">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        className={`relative group overflow-hidden cursor-pointer w-auto h-auto ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${i === 3 ? 'md:col-span-2' : ''}`}
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
    );
};

const BeforeAfterSlider = () => {
    const { t } = useLanguage();
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

    const beforeImage = "https://images.unsplash.com/photo-1581467655410-0c218a3b03e0?q=80&w=2000&auto=format&fit=crop"; // Empty Room
    const afterImage = "https://images.unsplash.com/photo-1513511935574-3c66fafa3e02?q=80&w=2000&auto=format&fit=crop"; // Furnished Room

    return (
        <section className="py-24 bg-white dark:bg-editorial-black text-editorial-black dark:text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Content - Order 1 on Desktop */}
                <div className="order-2 lg:order-1">
                    <span className="text-brand-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">
                        Render con IA
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                        Potencial <br />
                        <span className="text-gray-400">Ilimitado</span>.
                    </h2>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                        No dejes que una habitación vacía o anticuada frene la venta. Con nuestros renders fotorrealistas, mostramos todo el potencial de tu vivienda antes de que el comprador ponga un pie en ella.
                    </p>

                    <div className="flex items-center gap-12 border-t border-gray-100 dark:border-white/10 pt-8">
                        <div>
                            <span className="text-4xl font-black block mb-1">100%</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Visualización</span>
                        </div>
                        <div>
                            <span className="text-4xl font-black block mb-1">x3</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Más Interés</span>
                        </div>
                    </div>
                </div>

                {/* Slider - Order 2 on Desktop */}
                <div className="order-1 lg:order-2">
                    <div
                        ref={containerRef}
                        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                    >
                        {/* After Image (Background) */}
                        <img
                            src={afterImage}
                            alt="Furnished / After"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10 pointer-events-none">
                            {t('common.after')}
                        </div>

                        {/* Before Image (Foreground - Clipped) */}
                        <div
                            className="absolute inset-0 w-full h-full overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <img
                                src={beforeImage}
                                alt="Empty / Before"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-brand-blue-500 text-editorial-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10 pointer-events-none">
                                {t('common.before')}
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <span className="material-symbols-outlined text-black text-lg">code</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

const VideoGallery = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform logic: 
    // From 80% width (max-w-6xl) to 100% width
    // We'll use a width percentage animation for smoother layout flow
    const width = useTransform(scrollYProgress, [0.1, 0.4], ["80%", "100%"]);
    const borderRadius = useTransform(scrollYProgress, [0.1, 0.4], [12, 0]);

    // Playback control
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (videoRef.current) {
                // Play when the section is significantly active/expanding
                if (latest > 0.1 && latest < 0.9) {
                    if (videoRef.current.paused) {
                        videoRef.current.play().catch(() => { });
                    }
                } else {
                    if (!videoRef.current.paused) {
                        videoRef.current.pause();
                    }
                }
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    const mainVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-a-view-of-the-city-at-night-4243-large.mp4";

    return (
        <section ref={containerRef} className="py-24 bg-[#F6F7F8] dark:bg-white/5 overflow-hidden flex flex-col items-center">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-editorial-black dark:text-white tracking-tighter mb-4">
                        Video <span className="text-brand-blue-500">Profesional</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        {t('landing.video.desc')}
                    </p>
                </div>
            </div>

            {/* Cinematic Video Container */}
            <motion.div
                style={{
                    width: width,
                    borderRadius: borderRadius
                }}
                className="aspect-video relative overflow-hidden shadow-2xl bg-black mx-auto"
            >
                <video
                    ref={videoRef}
                    src={mainVideoUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                />

                {/* Overlay Title */}
                <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                    <div className="bg-brand-blue-500 text-editorial-black px-4 py-2 rounded-sm inline-block mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest">Essencia Cinema</span>
                    </div>
                    <h3 className="text-white text-2xl md:text-4xl font-black tracking-tight">
                        Exhibición Inmobiliaria
                    </h3>
                </div>
            </motion.div>
        </section>
    );
}

const VisualProSection: React.FC = () => {
    return (
        <div className="w-full relative bg-white dark:bg-background-dark">
            <CineVideoSection />
            <MasonryGallery />
            <VideoGallery />
            <BeforeAfterSlider />
        </div>
    );
};

export default VisualProSection;
