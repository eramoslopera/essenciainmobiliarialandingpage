
export interface Badge {
    text: string;
    type: 'standard' | 'photo' | 'coming-soon';
    variant?: 'primary' | 'black' | 'white';
}

export interface Property {
    id: number | string;
    title: string;
    location: string;
    price: string;
    beds?: number;
    baths?: number;
    size: string;
    image: string;
    images?: string[];
    description?: {
        en: string;
        es: string;
    };
    features?: string[];
    type: 'Villa' | 'Apartment' | 'Project' | 'Estate' | 'Townhouse' | 'House';
    badges?: Badge[];
    isComingSoon?: boolean;
    dateListed: string;
    dateSold?: string;
    lat: number;
    lng: number;
    status: 'available' | 'reserved' | 'sold';
    priceFreq: 'sale' | 'rent';
}
