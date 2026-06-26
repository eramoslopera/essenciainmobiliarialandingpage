import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // The landing page context defines 8 FAQ items (1 to 8)
  const faqData = Array.from({ length: 8 }, (_, i) => ({
    id: i < 9 ? `0${i + 1}` : `${i + 1}`,
    question: t(`landing.faq.${i + 1}.q`),
    answer: t(`landing.faq.${i + 1}.a`),
  }));

  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-editorial-black relative overflow-hidden selection:bg-brand-blue-500 selection:text-editorial-black">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-blue-500/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-brand-blue-500 mb-6 border border-brand-blue-500/30 px-4 py-2 rounded-full">
            {t('home.contact.tag') || t('landing.faq.title') || 'Transparencia Total'}
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white leading-[1.1] tracking-[-0.04em]">
            {t('landing.faq.title') || 'Preguntas Frecuentes'}
          </h2>
        </div>

        {/* Carousel on Mobile, Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0 pb-12 md:pb-0 items-start">
          {faqData.map((item, index) => {
            const isActive = activeIndex === index;
            const isOtherActive = activeIndex !== null && activeIndex !== index;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(isActive ? null : index)}
                className={`group relative min-w-[85vw] md:min-w-0 snap-center shrink-0 cursor-pointer overflow-hidden rounded-[2rem] border transition-all duration-500 ${
                  isActive 
                    ? 'bg-white border-white text-editorial-black shadow-[0_20px_50px_-10px_rgba(255,255,255,0.1)]' 
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                } ${isOtherActive && !isActive ? 'md:opacity-40 md:scale-[0.98]' : 'opacity-100 scale-100'}`}
              role="button"
              aria-expanded={isActive}
              >
                <div className="p-8 md:p-10 relative z-10">
                  <div className="flex justify-between items-start gap-4 md:gap-6">
                    <h3 className={`text-[clamp(1.15rem,2vw,1.5rem)] font-bold leading-[1.3] tracking-[-0.02em] transition-colors duration-300 ${isActive ? 'text-editorial-black' : 'text-white'}`}>
                      {item.question}
                    </h3>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                      isActive 
                        ? 'bg-brand-blue-500 text-editorial-black' 
                        : 'bg-white/10 text-white group-hover:bg-brand-blue-500 group-hover:text-editorial-black'
                    }`}>
                      <motion.svg 
                        animate={{ rotate: isActive ? 45 : 0 }} 
                        className="w-5 h-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </motion.svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[clamp(1rem,1.5vw,1.125rem)] leading-[1.7] text-gray-700 font-medium">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Giant Background Number */}
                <div className={`absolute -bottom-6 -right-2 text-[8rem] font-black leading-none pointer-events-none transition-colors duration-500 select-none ${
                  isActive ? 'text-gray-100' : 'text-white/5 group-hover:text-white/10'
                }`}>
                  {item.id}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Scrollbar hidden styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default FAQSection;
