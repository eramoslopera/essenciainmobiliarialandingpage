import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp: React.FC = () => {
    // Replace with actual phone number if provided, otherwise use a placeholder or generic link
    // Format: https://wa.me/<number>
    const whatsappUrl = "https://wa.me/34647803355";
    const [isAutoVisible, setIsAutoVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => {
            setIsAutoVisible(true);
        }, 3000); // Show message after 3 seconds

        const hideTimer = setTimeout(() => {
            setIsAutoVisible(false);
        }, 8000); // Hide message 5 seconds after showing (3s + 5s)

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const isVisible = isAutoVisible || isHovered;

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
            onMouseEnter={() => {
                setIsHovered(true);
                setIsAutoVisible(false);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-white dark:bg-zinc-800 p-4 rounded-2xl rounded-br-none shadow-xl max-w-[250px] relative mb-2"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAutoVisible(false);
                            }}
                            className="absolute -top-2 -left-2 w-5 h-5 bg-gray-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-xs text-gray-500 hover:bg-red-500 hover:text-white transition-colors"
                        >
                            ×
                        </button>
                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                            ¡Hola! 👋 ¿Te ayudamos a vender tu propiedad?
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-16 h-16 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                aria-label="Contact on WhatsApp"
            >
                {/* Ping Animation - Only active when NOT hovered/visible to avoid distraction when reading */}
                {!isVisible && (
                    <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:animate-ping"></div>
                )}

                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white dark:border-zinc-900 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">1</span>
                </div>

                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-8 h-8 filter brightness-0 invert"
                />
            </a>
        </div>
    );
};

export default FloatingWhatsApp;
