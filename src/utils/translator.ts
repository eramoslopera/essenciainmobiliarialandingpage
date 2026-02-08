
export const translateFeature = (feature: string, lang: 'es' | 'en' | 'fr' | 'de' | 'va'): string => {
    const dictionary: Record<string, { es: string, en: string, fr: string, de: string, va: string }> = {
        'telephone': { es: 'Teléfono', en: 'Telephone', fr: 'Téléphone', de: 'Telefon', va: 'Telèfon' },
        'light': { es: 'Luz', en: 'Mains Electric', fr: 'Électricité', de: 'Strom', va: 'Llum' },
        'water': { es: 'Agua', en: 'Mains Water', fr: 'Eau', de: 'Wasser', va: 'Aigua' },
        'automatic doors': { es: 'Puertas Automáticas', en: 'Automatic Doors', fr: 'Portes Automatiques', de: 'Automatische Türen', va: 'Portes Automàtiques' },
        'storeroom': { es: 'Trastero', en: 'Storeroom', fr: 'Débarras', de: 'Abstellraum', va: 'Traster' },
        'terrace': { es: 'Terraza', en: 'Terrace', fr: 'Terrasse', de: 'Terrasse', va: 'Terrassa' },
        'air conditioning': { es: 'Aire Acondicionado', en: 'Air Conditioning', fr: 'Climatisation', de: 'Klimaanlage', va: 'Aire Condicionat' },
        'heating': { es: 'Calefacción', en: 'Heating', fr: 'Chauffage', de: 'Heizung', va: 'Calefacció' },
        'pool': { es: 'Piscina', en: 'Pool', fr: 'Piscine', de: 'Pool', va: 'Piscina' },
        'garage': { es: 'Garaje', en: 'Garage', fr: 'Garage', de: 'Garage', va: 'Garatge' },
        'garden': { es: 'Jardín', en: 'Garden', fr: 'Jardin', de: 'Garten', va: 'Jardí' },
        'sea view': { es: 'Vistas al Mar', en: 'Sea View', fr: 'Vue Mer', de: 'Meerblick', va: 'Vistes al Mar' },
        'mountain view': { es: 'Vistas a la Montaña', en: 'Mountain View', fr: 'Vue Montagne', de: 'Bergblick', va: 'Vistes a la Muntanya' },
        'furnished': { es: 'Amueblado', en: 'Furnished', fr: 'Meublé', de: 'Möbliert', va: 'Moblat' },
        'parking': { es: 'Parking', en: 'Parking', fr: 'Parking', de: 'Parkplatz', va: 'Pàrquing' },
        'lift': { es: 'Ascensor', en: 'Lift', fr: 'Ascenseur', de: 'Aufzug', va: 'Ascensor' },
        'elevator': { es: 'Ascensor', en: 'Elevator', fr: 'Ascenseur', de: 'Aufzug', va: 'Ascensor' },
        'balcony': { es: 'Balcón', en: 'Balcony', fr: 'Balcon', de: 'Balkon', va: 'Balcó' },
        'alarm': { es: 'Alarma', en: 'Alarm', fr: 'Alarme', de: 'Alarm', va: 'Alarma' },
        'fitted wardrobes': { es: 'Armarios Empotrados', en: 'Fitted Wardrobes', fr: 'Placards', de: 'Einbauschränke', va: 'Armaris Encastats' },
        'wardrobes cupboard': { es: 'Armarios Empotrados', en: 'Fitted Wardrobes', fr: 'Placards', de: 'Einbauschränke', va: 'Armaris Encastats' },
        'double glazing': { es: 'Doble Acristalamiento', en: 'Double Glazing', fr: 'Double Vitrage', de: 'Doppelverglasung', va: 'Doble Vidre' },
        'solarium': { es: 'Solarium', en: 'Solarium', fr: 'Solarium', de: 'Solarium', va: 'Solàrium' },
        'barbecue': { es: 'Barbacoa', en: 'Barbecue', fr: 'Barbecue', de: 'Grill', va: 'Barbacoa' },
        'fenced plot': { es: 'Parcela Vallada', en: 'Fenced Plot', fr: 'Terrain Clôturé', de: 'Eingezäuntes Grundstück', va: 'Parcel·la Vallada' },
        'chimney': { es: 'Chimenea', en: 'Chimney', fr: 'Cheminée', de: 'Kamin', va: 'Xemeneia' },
        'fireplace': { es: 'Chimenea', en: 'Fireplace', fr: 'Cheminée', de: 'Kamin', va: 'Llar de Foc' },
        'white goods': { es: 'Electrodomésticos', en: 'White Goods', fr: 'Électroménager', de: 'Haushaltsgeräte', va: 'Electrodomèstics' },
        'near beach': { es: 'Cerca de playa', en: 'Near Beach', fr: 'Près Plage', de: 'Strandnah', va: 'A prop de la platja' },
        'near amenities': { es: 'Cerca de servicios', en: 'Near Amenities', fr: 'Près Commodités', de: 'Nahe Dienstleistungen', va: 'A prop de serveis' },
        'internet': { es: 'Internet', en: 'Internet', fr: 'Internet', de: 'Internet', va: 'Internet' },
        'wifi': { es: 'WiFi', en: 'WiFi', fr: 'WiFi', de: 'WLAN', va: 'WiFi' },
        'laundry room': { es: 'Lavadero', en: 'Laundry Room', fr: 'Buanderie', de: 'Waschküche', va: 'Safareig' },
        'utility room': { es: 'Lavadero', en: 'Utility Room', fr: 'Buanderie', de: 'Hauswirtschaftsraum', va: 'Safareig' },
    };

    const lowerKey = feature.toLowerCase().trim();
    // Try exact match
    if (dictionary[lowerKey]) {
        return dictionary[lowerKey][lang] || dictionary[lowerKey]['en']; // Fallback to EN if specific lang missing
    }

    // Simple fallback: return original if not found (capitalized)
    return feature.charAt(0).toUpperCase() + feature.slice(1);
};
