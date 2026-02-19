import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

const LandingFooter: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#222222] text-white pt-24 pb-12 px-6 lg:px-24 border-t border-gray-400">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 border-b border-gray-300 pb-16">
                    <div className="col-span-1">
                        <div className="mb-8">
                            <Logo variant="black" className="h-10 w-auto" />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium max-w-sm">
                            {t('footer.desc')}
                        </p>
                    </div>
                    <div className="md:text-right">
                        <h5 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-gray-500">{t('footer.contact')}</h5>
                        <ul className="space-y-5 text-xs font-bold tracking-widest text-gray-600 inline-block text-left">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-editorial-black text-xl">location_on</span>
                                <span className="uppercase" dangerouslySetInnerHTML={{ __html: t('footer.address') }}></span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-editorial-black text-xl">call</span>
                                <a href="tel:+34647803355" className="hover:text-brand-blue-500 transition-colors">+34 647 803 355</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <p>{t('footer.rights')}</p>
                    <div className="flex gap-10">
                        <span className="hover:text-brand-blue-500 transition-colors cursor-pointer">{t('footer.privacy')}</span>
                        <span className="hover:text-brand-blue-500 transition-colors cursor-pointer">{t('footer.cookies')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
