import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// ─────────────────────────────────────────────────────────────
// GEO FIX: The span renders the final value as initial text.
// Crawlers and SEO bots read this directly. JS animates on top.
// ─────────────────────────────────────────────────────────────
interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    suffix = '',
    prefix = '',
    duration = 2.2,
    decimals = 0,
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const hasAnimated = useRef(false);
    const prefersReduced = useReducedMotion();

    const format = (n: number) =>
        decimals > 0
            ? n.toFixed(decimals).replace('.', ',')
            : Math.floor(n).toLocaleString('es-ES');

    useEffect(() => {
        const node = ref.current;
        if (!node || !isInView || hasAnimated.current || prefersReduced) return;
        hasAnimated.current = true;

        const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => {
                node.textContent = `${prefix}${format(latest)}${suffix}`;
            },
        });
        return () => controls.stop();
    }, [isInView, value, duration, prefix, suffix, decimals, prefersReduced]);

    // Final static value for bots
    const staticDisplay = `${prefix}${format(value)}${suffix}`;

    return (
        <span ref={ref} className="tabular-nums">
            {staticDisplay}
        </span>
    );
};

const StatsSection: React.FC = () => {
    const { language } = useLanguage();

    // Data mapped by language to match the corporate website exactly
    const getStatData = (key: string) => {
        const data: Record<string, Record<string, { label: string; note: string }>> = {
            sold: {
                es: { label: 'Ventas cerradas', note: '15 años en el mercado de Gandía' },
                en: { label: 'Closed sales', note: '15 years in the Gandia market' },
                fr: { label: 'Ventes clôturées', note: '15 ans sur le marché de Gandía' },
                de: { label: 'Abgeschlossene Verkäufe', note: '15 Jahre auf dem Markt von Gandía' },
                va: { label: 'Vendes tancades', note: '15 anys en el mercat de Gandia' }
            },
            days: {
                es: { label: 'Media hasta la venta', note: 'Desde la captación hasta escrituras' },
                en: { label: 'Average time to sell', note: 'From listing to notary signing' },
                fr: { label: 'Moyenne jusqu\'à la vente', note: 'Du mandat à la signature' },
                de: { label: 'Durchschnitt bis zum Verkauf', note: 'Vom Inserat bis zur Beurkundung' },
                va: { label: 'Mitjana fins a la venda', note: 'Des de la captació fins a escriptures' }
            },
            volume: {
                es: { label: 'En ventas este año', note: 'Volumen de operaciones en 2025' },
                en: { label: 'In sales this year', note: 'Volume of operations in 2025' },
                fr: { label: 'En ventes cette année', note: 'Volume des opérations en 2025' },
                de: { label: 'Umsatz in diesem Jahr', note: 'Volumen der Transaktionen im Jahr 2025' },
                va: { label: 'En vendes enguany', note: 'Volum d\'operacions el 2025' }
            },
            satisfaction: {
                es: { label: 'Clientes satisfechos', note: 'Según encuesta post-venta' },
                en: { label: 'Satisfied clients', note: 'According to post-sale survey' },
                fr: { label: 'Clients satisfaits', note: 'Selon l\'enquête post-vente' },
                de: { label: 'Zufriedene Kunden', note: 'Laut After-Sales-Umfrage' },
                va: { label: 'Clients satisfets', note: 'Segons enquesta postvenda' }
            }
        };
        return data[key]?.[language] || data[key]?.['es'];
    };

    const STATS = [
        {
            value: 2000,
            prefix: '+',
            suffix: '',
            label: getStatData('sold').label,
            note: getStatData('sold').note,
            ariaLabel: `Más de 2000 ${getStatData('sold').label}`,
            delay: 0,
        },
        {
            value: 45,
            prefix: '',
            suffix: ` ${language === 'en' ? 'days' : language === 'fr' ? 'jours' : language === 'de' ? 'Tage' : 'días'}`,
            label: getStatData('days').label,
            note: getStatData('days').note,
            ariaLabel: `45 ${getStatData('days').label}`,
            delay: 0.1,
        },
        {
            value: 13,
            prefix: '',
            suffix: 'M€',
            label: getStatData('volume').label,
            note: getStatData('volume').note,
            ariaLabel: `13 millones de euros ${getStatData('volume').label}`,
            delay: 0.2,
        },
        {
            value: 95,
            prefix: '',
            suffix: '%',
            label: getStatData('satisfaction').label,
            note: getStatData('satisfaction').note,
            ariaLabel: `95% ${getStatData('satisfaction').label}`,
            delay: 0.3,
        },
    ] as const;

    const t = (key: string) => {
        const translations: Record<string, Record<string, string>> = {
            status: {
                es: 'Datos reales',
                en: 'Real data',
                fr: 'Données réelles',
                de: 'Reale Daten',
                va: 'Dades reals'
            },
            title: {
                es: 'Números',
                en: 'Numbers',
                fr: 'Nombres',
                de: 'Zahlen',
                va: 'Números'
            },
            subtitle: {
                es: 'que hablan.',
                en: 'that speak.',
                fr: 'qui parlent.',
                de: 'die sprechen.',
                va: 'que parlen.'
            },
            description: {
                es: 'Más de 15 años vendiendo propiedades en Gandía y La Safor. Estos son los resultados de Essencia Inmobiliaria.',
                en: 'More than 15 years selling properties in Gandía and La Safor. These are the results of Essencia Inmobiliaria.',
                fr: 'Plus de 15 ans d\'expérience dans la vente de propriétés à Gandía et La Safor. Voici les résultats d\'Essencia Inmobiliaria.',
                de: 'Über 15 Jahre Erfahrung im Verkauf von Immobilien in Gandía und La Safor. Dies sind die Ergebnisse von Essencia Inmobiliaria.',
                va: 'Més de 15 anys venent propietats a Gandia i La Safor. Aquests són els resultats d\'Essencia Inmobiliaria.'
            }
        };
        return translations[key]?.[language] || translations[key]?.['es'];
    };

    return (
        <section
            className="bg-editorial-black text-white relative overflow-hidden"
            aria-label="Resultados y estadísticas de Essencia Inmobiliaria"
        >
            {/* Ambient glows */}
            <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue-600/10 blur-[140px] rounded-full pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue-600/5 blur-[100px] rounded-full pointer-events-none"
            />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-24 py-24 lg:py-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* ── Left: Header ── */}
                    <motion.div
                        className="lg:col-span-4"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-8" aria-hidden="true">
                            <div className="w-8 h-[1px] bg-brand-blue-500" />
                            <span className="text-xs font-black tracking-[0.2em] uppercase text-brand-blue-500">
                                {t('status')} · 2025
                            </span>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-8 text-white">
                            {t('title')}<br />
                            <span className="text-white/60">
                                {t('subtitle')}
                            </span>
                        </h2>

                        <p className="text-gray-200 text-base leading-relaxed font-medium max-w-sm">
                            {t('description')}
                        </p>

                        {/* Divider decoration */}
                        <div className="mt-12 pt-12 border-t border-white/10">
                            <p className="text-xs font-black tracking-[0.15em] uppercase text-gray-400">
                                Essencia Inmobiliaria · Gandía, La Safor
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Right: KPIs Grid ── */}
                    <div
                        className="lg:col-span-8 grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
                        role="list"
                        aria-label="Indicadores clave de rendimiento"
                    >
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                role="listitem"
                                aria-label={stat.ariaLabel}
                                className="bg-editorial-black p-8 lg:p-10 flex flex-col justify-between group relative overflow-hidden"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: stat.delay }}
                            >
                                {/* Hover accent */}
                                <div
                                    aria-hidden="true"
                                    className="absolute top-0 left-0 right-0 h-[2px] bg-brand-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                />

                                {/* Value */}
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-none mb-4">
                                    <AnimatedCounter
                                        value={stat.value}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                        duration={2 + stat.delay * 0.5}
                                    />
                                </div>

                                {/* Label + Note */}
                                <div>
                                    <p className="text-sm font-black text-white tracking-tight mb-1">
                                        {stat.label}
                                    </p>
                                    <p className="text-xs text-gray-300 font-medium leading-snug">
                                        {stat.note}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StatsSection;
