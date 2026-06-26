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
    const { t, language } = useLanguage();

    // Notes mapped by language
    const getNotes = (key: string) => {
        const notes: Record<string, Record<string, string>> = {
            vol: {
                es: 'Volumen de operaciones gestionadas',
                en: 'Volume of managed operations',
                fr: 'Volume des opérations gérées',
                de: 'Volumen der verwalteten Vorgänge',
                va: 'Volum d\'operacions gestionades'
            },
            sold_per_month: {
                es: 'Promedio mensual en la comarca',
                en: 'Monthly average in the region',
                fr: 'Moyenne mensuelle dans la région',
                de: 'Monatlicher Durchschnitt in der Region',
                va: 'Mitjana mensual a la comarca'
            },
            days: {
                es: 'Desde la captación hasta la venta',
                en: 'From listing to final sale',
                fr: 'De la mise en vente à la signature',
                de: 'Vom Inserat bis zum Verkauf',
                va: 'Des de la captació fins a la venda'
            },
            active_listings: {
                es: 'Cartera activa de inmuebles exclusivos',
                en: 'Active portfolio of exclusive listings',
                fr: 'Portefeuille actif de biens exclusifs',
                de: 'Aktives Portfolio exklusiver Immobilien',
                va: 'Cartera activa d\'immobles exclusius'
            },
            success: {
                es: 'Según encuestas de satisfacción post-venta',
                en: 'According to post-sale satisfaction surveys',
                fr: 'Selon les enquêtes de satisfaction post-vente',
                de: 'Laut Kundenzufriedenheitsbefragungen',
                va: 'Segons enquestes de satisfacció postvenda'
            }
        };
        return notes[key]?.[language] || notes[key]?.['es'] || '';
    };

    const STATS = [
        {
            value: 10,
            prefix: '',
            suffix: '',
            label: t('stats.sold_per_month.label'),
            note: getNotes('sold_per_month'),
            ariaLabel: `10 ${t('stats.sold_per_month.label')}`,
            delay: 0,
        },
        {
            value: 30,
            prefix: '',
            suffix: ` ${language === 'en' ? 'days' : language === 'fr' ? 'jours' : language === 'de' ? 'Tage' : 'días'}`,
            label: t('stats.days.label'),
            note: getNotes('days'),
            ariaLabel: `30 ${t('stats.days.label')}`,
            delay: 0.1,
        },
        {
            value: 150,
            prefix: '+',
            suffix: '',
            label: t('stats.active_listings.label'),
            note: getNotes('active_listings'),
            ariaLabel: `Más de 150 ${t('stats.active_listings.label')}`,
            delay: 0.2,
        },
        {
            value: 95,
            prefix: '',
            suffix: '%',
            label: t('stats.success.label'),
            note: getNotes('success'),
            ariaLabel: `95% ${t('stats.success.label')}`,
            delay: 0.3,
        },
    ] as const;

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
                                {t('stats.status')} · 2025
                            </span>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-8 text-white">
                            {language === 'va' ? 'Números' : language === 'en' ? 'Numbers' : language === 'fr' ? 'Nombres' : language === 'de' ? 'Zahlen' : 'Números'}<br />
                            <span className="text-white/60">
                                {language === 'va' ? 'que parlen.' : language === 'en' ? 'that speak.' : language === 'fr' ? 'qui parlent.' : language === 'de' ? 'die sprechen.' : 'que hablan.'}
                            </span>
                        </h2>

                        <p className="text-gray-200 text-base leading-relaxed font-medium max-w-sm">
                            {language === 'es' || language === 'va'
                                ? 'Más de 15 años vendiendo propiedades en Gandía y La Safor. Estos son los resultados de Essencia Inmobiliaria.'
                                : language === 'fr'
                                ? 'Plus de 15 ans d\'expérience dans la vente de propriétés à Gandía et La Safor. Voici les résultats d\'Essencia Inmobiliaria.'
                                : language === 'de'
                                ? 'Über 15 Jahre Erfahrung im Verkauf von Immobilien in Gandía und La Safor. Dies sind die Ergebnisse von Essencia Inmobiliaria.'
                                : 'More than 15 years selling properties in Gandía and La Safor. These are the results of Essencia Inmobiliaria.'}
                        </p>

                        {/* Volume Stat Highlight inside left column */}
                        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="text-3xl md:text-4xl font-black text-brand-blue-500 tracking-tight leading-none mb-2">
                                <AnimatedCounter value={13000000} suffix=" €" />
                            </div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">
                                {t('stats.vol.label')}
                            </p>
                            <p className="text-[11px] text-gray-400 font-medium">
                                {getNotes('vol')}
                            </p>
                        </div>

                        {/* Divider decoration */}
                        <div className="mt-8 pt-8 border-t border-white/10">
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
