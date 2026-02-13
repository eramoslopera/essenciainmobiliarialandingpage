import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchProperties } from '../utils/xmlParser';
import { Property } from '../types/property';


import VisualProSection from '../components/VisualProSection';
import MiaMethodSection from '../components/MiaMethodSection';
import SalesProcessSection from '../components/SalesProcessSection';

const Landing: React.FC = () => {
    // State for FAQ accordion
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const { t } = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Properties State
    const [salesProperties, setSalesProperties] = useState<Property[]>([]);
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

    // SEO Title
    useEffect(() => {
        document.title = `${t('landing.hero.title')} - Essencia Inmobiliaria`;
    }, [t]);

    const FEATURED_SOLD: Property[] = [
        {
            id: 'sold-1',
            title: "Adosado Reformado",
            location: "Benidoleig, Alicante",
            price: "€140,000",
            beds: 3,
            baths: 2,
            size: "120 m²",
            image: "https://fotos15.apinmo.com/1909/27341402/3-1.jpg",
            type: 'Townhouse',
            dateListed: '2024-01-01',
            lat: 38.7917,
            lng: -0.0278,
            status: 'sold',
            priceFreq: 'sale'
        },
        {
            id: 'sold-2',
            title: "Casa de Pueblo con Encanto",
            location: "Real de Gandía, Valencia",
            price: "€164,900",
            beds: 4,
            baths: 2,
            size: "180 m²",
            image: "https://fotos15.apinmo.com/1909/23491575/15-1.jpg",
            type: 'House',
            dateListed: '2024-02-01',
            lat: 38.949,
            lng: -0.190,
            status: 'sold',
            priceFreq: 'sale'
        },
        {
            id: 'sold-3',
            title: "Apartamento Costero",
            location: "Playa de Bellreguard",
            price: "€170,000",
            beds: 3,
            baths: 2,
            size: "95 m²",
            image: "https://fotos15.apinmo.com/1909/26037790/9-1.jpg",
            type: 'Apartment',
            dateListed: '2024-03-01',
            lat: 38.950,
            lng: -0.150,
            status: 'sold',
            priceFreq: 'sale'
        },
        {
            id: 'sold-4',
            title: "Apartamento Familiar",
            location: "Playa de Gandía",
            price: "€215,000",
            beds: 3,
            baths: 2,
            size: "105 m²",
            image: "https://fotos15.apinmo.com/1909/25828355/10-1.jpg",
            type: 'Apartment',
            dateListed: '2024-02-15',
            lat: 39.000,
            lng: -0.160,
            status: 'sold',
            priceFreq: 'sale'
        }
    ];

    useEffect(() => {
        const loadProperties = async () => {
            // Use featured sold properties as the base
            let allProperties = [...FEATURED_SOLD];

            try {
                const fetched = await fetchProperties();
                const sold = fetched.filter(p => p.status === 'sold');
                if (sold.length > 0) {
                    // Filter out duplicates if any (by id or similarity) - for now just append
                    allProperties = [...allProperties, ...sold];
                }
            } catch (error) {
                console.error("Error loading properties", error);
            }

            setSalesProperties(allProperties);
        };
        loadProperties();
    }, []);

    // Form State
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormStatus('success');
            setFormState({ name: '', phone: '', email: '', address: '' });
        }, 1500);
    };

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Component to update map bounds based on properties
    const MapBoundsUpdater: React.FC<{ properties: Property[] }> = ({ properties }) => {
        const map = useMap();

        useEffect(() => {
            if (properties.length > 0) {
                const markers = properties
                    .filter(p => p.lat && p.lng)
                    .map(p => [p.lat, p.lng] as [number, number]);

                if (markers.length > 0) {
                    const bounds = L.latLngBounds(markers);
                    map.fitBounds(bounds, { padding: [50, 50] });
                }
            }
        }, [properties, map]);

        return null;
    };

    return (
        <>
            <LandingHeader />
            <main className="bg-background-light dark:bg-background-dark text-editorial-black dark:text-white font-display overflow-x-hidden antialiased pt-20">
                {/* Hero Section */}
                <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <motion.div
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 10, ease: "easeOut" }}
                            className="w-full h-full"
                        >
                            <img
                                alt="Interior de Villa Mediterránea"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-white/20 dark:bg-black/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent dark:from-background-dark dark:via-background-dark/20 dark:to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-editorial-black dark:text-white mb-6 leading-[1.1] tracking-tighter"
                        >
                            {t('landing.hero.title')}<br />
                            <span className="opacity-40">{t('landing.hero.subtitle')}</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-2xl mb-12 font-medium leading-relaxed"
                        >
                            {t('landing.hero.desc')}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center gap-6"
                        >
                            <button
                                onClick={() => document.getElementById('start-valuation')?.scrollIntoView({ behavior: 'smooth' })}
                                className="h-14 px-10 bg-editorial-black hover:bg-gray-800 text-white text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                {t('landing.hero.valuation')}
                            </button>
                            <button
                                onClick={() => document.getElementById('recent-sales')?.scrollIntoView({ behavior: 'smooth' })}
                                className="h-14 px-10 bg-white hover:bg-gray-100 text-editorial-black border border-editorial-black text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                {t('landing.hero.sales')}
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Services Options */}
                <section className="py-16 px-6 lg:px-12 bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800">
                    <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => document.getElementById('start-valuation')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#f6f7f8] dark:bg-white/5 p-12 flex flex-col justify-center items-start min-h-[280px] group cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-4xl mb-6 text-editorial-black dark:text-white">laptop_mac</span>
                            <h3 className="text-2xl font-black mb-2 text-editorial-black dark:text-white tracking-tight">{t('landing.service.online.title')}</h3>
                            <p className="text-gray-500 font-medium text-sm mb-8">{t('landing.service.online.desc')}</p>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-300 pb-1 group-hover:border-black transition-colors">{t('landing.service.online.cta')}</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => document.getElementById('start-valuation')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#f6f7f8] dark:bg-white/5 p-12 flex flex-col justify-center items-start min-h-[280px] group cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-4xl mb-6 text-editorial-black dark:text-white">person</span>
                            <h3 className="text-2xl font-black mb-2 text-editorial-black dark:text-white tracking-tight">{t('landing.service.person.title')}</h3>
                            <p className="text-gray-500 font-medium text-sm mb-8">{t('landing.service.person.desc')}</p>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-300 pb-1 group-hover:border-black transition-colors">{t('landing.service.person.cta')}</span>
                        </motion.div>
                    </div>
                </section>

                {/* Why Essencia ... (Skipping as it is already updated) */}

                {/* MIA Method Section */}

                <MiaMethodSection />
                <SalesProcessSection />

                {/* Visual Pro Section (New) */}
                <VisualProSection />

                {/* Recent Sales Carousel */}
                <section id="recent-sales" className="py-24 bg-white dark:bg-[#151f2b] overflow-hidden">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
                        <div className="flex items-center justify-between mb-16">
                            <h2 className="text-4xl font-black tracking-tighter capitalize">{t('landing.sales.title')}</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => scroll('left')}
                                    className="w-12 h-12 border border-editorial-black dark:border-white/20 flex items-center justify-center hover:bg-editorial-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                                >
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className="w-12 h-12 bg-editorial-black dark:bg-white dark:text-black text-white flex items-center justify-center hover:bg-gray-800 transition-all"
                                >
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                        <div ref={scrollRef} className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x snap-mandatory">
                            {salesProperties.length > 0 ? salesProperties.map((property) => (
                                <div
                                    key={property.id}
                                    className="snap-center shrink-0 w-[85vw] md:w-[600px] bg-white dark:bg-background-dark shadow-sm flex flex-col md:flex-row h-auto md:h-[280px] cursor-pointer"
                                    onMouseEnter={() => setHoveredPropertyId(property.id)}
                                    onMouseLeave={() => setHoveredPropertyId(null)}
                                >
                                    <div className="w-full md:w-5/12 bg-cover bg-center h-56 md:h-full grayscale hover:grayscale-0 transition-all duration-500 relative"
                                        style={{ backgroundImage: `url("${property.image}")` }}>
                                        {property.status === 'sold' && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <span className="text-white font-black uppercase tracking-[0.2em] border-2 border-white px-4 py-2 rotate-[-12deg]">{t('landing.sales.sold')}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full md:w-7/12 p-8 flex flex-col justify-center border border-gray-100 dark:border-gray-800 md:border-l-0">
                                        <div className="mb-6">
                                            <span className={`text-[10px] font-black text-white px-2 py-1 uppercase tracking-[0.2em] mb-3 inline-block ${property.status === 'sold' ? 'bg-editorial-black' :
                                                property.status === 'reserved' ? 'bg-gray-400' :
                                                    'bg-editorial-black'
                                                }`}>
                                                {property.status === 'sold' ? t('landing.sales.sold') :
                                                    property.status === 'reserved' ? 'Reserved' :
                                                        t('detail.label.exclusive')}
                                            </span>
                                            <h3 className="text-xl font-black tracking-tight leading-none mb-1">{property.title}</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{property.location}</p>
                                        </div>
                                        <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('properties.filters.zone')}</span>
                                                <span className="text-xs font-black text-editorial-black dark:text-white uppercase">{property.location.split(',')[0]}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('properties.filters.price')}</span>
                                                <span className="text-xs font-black">{property.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                // Fallback if no properties loaded
                                <div className="w-full text-center py-10 text-gray-400">Loading properties...</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Interactive Map */}
                <section className="h-[500px] w-full relative z-0">
                    <MapContainer
                        center={[38.97, -0.15]}
                        zoom={11}
                        scrollWheelZoom={false}
                        className="h-full w-full z-0"
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                        <MapBoundsUpdater properties={salesProperties} />
                        {salesProperties.map((property) => (
                            property.lat && property.lng ? (
                                <CircleMarker
                                    key={property.id}
                                    center={[property.lat, property.lng]}
                                    radius={hoveredPropertyId === property.id ? 12 : 8}
                                    pathOptions={{
                                        color: '#000',
                                        fillColor: hoveredPropertyId === property.id ? '#FFFFFF' : '#000',
                                        fillOpacity: 1,
                                        weight: hoveredPropertyId === property.id ? 4 : 2
                                    }}
                                >
                                    <Popup>
                                        <div className="text-center font-display">
                                            <strong className="block mb-1 text-sm">{property.title}</strong>
                                            <span className="text-xs text-gray-500 uppercase tracking-wider">{property.location}</span>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            ) : null
                        ))}
                    </MapContainer>
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white dark:from-[#151f2b] to-transparent z-[400] pointer-events-none"></div>
                </section>

                {/* FAQ Accordion */}
                <section id="faq" className="py-24 bg-white dark:bg-background-dark px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black tracking-tighter text-center mb-16">{t('landing.faq.title')}</h2>
                        <div className="space-y-4">
                            {[
                                { q: t('landing.faq.1.q'), a: t('landing.faq.1.a') },
                                { q: t('landing.faq.2.q'), a: t('landing.faq.2.a') },
                                { q: t('landing.faq.3.q'), a: t('landing.faq.3.a') },
                                { q: t('landing.faq.4.q'), a: t('landing.faq.4.a') },
                                { q: t('landing.faq.5.q'), a: t('landing.faq.5.a') },
                                { q: t('landing.faq.6.q'), a: t('landing.faq.6.a') },
                                { q: t('landing.faq.7.q'), a: t('landing.faq.7.a') },
                                { q: t('landing.faq.8.q'), a: t('landing.faq.8.a') }
                            ].map((item, index) => (
                                <div key={index} className="border-b border-gray-100 dark:border-gray-800">
                                    <button
                                        className="w-full flex items-center justify-between font-bold text-lg hover:text-gray-500 transition-colors py-4 text-left"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        {item.q}
                                        <span className={`material-symbols-outlined transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>expand_more</span>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                                        <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section id="start-valuation" className="py-24 bg-white dark:bg-background-dark relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-1/3 h-full bg-editorial-black opacity-[0.03] -skew-x-12 hidden lg:block"></div>
                    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <span className="text-editorial-black font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">{t('landing.cta.location')}</span>
                        <h2 className="text-5xl md:text-6xl font-black mb-8 text-editorial-black dark:text-white tracking-tighter leading-none">
                            {t('landing.cta.title')}
                        </h2>
                        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto font-medium">
                            {t('landing.cta.subtitle')}
                        </p>
                        <div className="bg-white dark:bg-gray-800 p-8 border-2 border-editorial-black dark:border-gray-700 max-w-2xl mx-auto shadow-2xl">
                            {formStatus === 'success' ? (
                                <div className="text-center py-12">
                                    <span className="material-symbols-outlined text-6xl text-editorial-black dark:text-white mb-4">check_circle</span>
                                    <h3 className="text-2xl font-black mb-2">{t('landing.form.success')}</h3>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <h3 className="text-xl font-black text-left mb-2 text-editorial-black dark:text-white uppercase tracking-widest border-b border-gray-100 pb-2">
                                        {t('landing.form.title')}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col items-start">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">{t('landing.form.name')}</label>
                                            <input
                                                required
                                                name="name"
                                                value={formState.name}
                                                onChange={handleInputChange}
                                                className="w-full h-14 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-editorial-black focus:ring-0 text-editorial-black dark:text-white text-sm font-medium"
                                                type="text"
                                            />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">{t('landing.form.phone')}</label>
                                            <input
                                                required
                                                name="phone"
                                                value={formState.phone}
                                                onChange={handleInputChange}
                                                className="w-full h-14 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-editorial-black focus:ring-0 text-editorial-black dark:text-white text-sm font-medium"
                                                type="tel"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">{t('landing.form.email')}</label>
                                        <input
                                            required
                                            name="email"
                                            value={formState.email}
                                            onChange={handleInputChange}
                                            className="w-full h-12 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-editorial-black focus:ring-0 text-editorial-black dark:text-white text-sm font-medium"
                                            type="email"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">{t('landing.cta.placeholder')}</label>
                                        <div className="relative w-full">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">location_on</span>
                                            <input
                                                required
                                                name="address"
                                                value={formState.address}
                                                onChange={handleInputChange}
                                                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-editorial-black focus:ring-0 text-editorial-black dark:text-white text-sm font-medium"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'submitting'}
                                        className="mt-4 h-14 w-full bg-editorial-black hover:bg-gray-800 text-white font-black text-sm uppercase tracking-[0.2em] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {formStatus === 'submitting' ? (
                                            <span className="material-symbols-outlined animate-spin">refresh</span>
                                        ) : (
                                            t('landing.form.submit')
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <LandingFooter />
            <FloatingWhatsApp />
            <button
                onClick={scrollToTop}
                className={`fixed bottom-24 right-6 z-40 w-12 h-12 bg-white dark:bg-background-dark text-editorial-black dark:text-white shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <span className="material-symbols-outlined">arrow_upward</span>
            </button>
        </>
    );
};

export default Landing;
