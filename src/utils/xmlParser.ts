
import { Property } from '../types/property';

export const fetchProperties = async (): Promise<Property[]> => {
    try {
        const response = await fetch('/api/feed');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const properties: Property[] = [];
        const propertyNodes = xmlDoc.getElementsByTagName("property");

        for (let i = 0; i < propertyNodes.length; i++) {
            const node = propertyNodes[i];

            try {
                // Helper to safe get text content
                const getTag = (tagName: string) => {
                    const el = node.getElementsByTagName(tagName)[0];
                    return el ? el.textContent || "" : "";
                };

                const toTitleCase = (str: string) => {
                    return str.replace(
                        /\w\S*/g,
                        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
                    );
                };

                const id = parseInt(getTag("id"));
                // Skip if no ID
                if (!id) continue;
                // Remove early title const, we build it deeper down now
                // if (!id) continue;
                const location = toTitleCase(getTag("town")) + ", " + getTag("province");
                // Price might be number in XML, we want formatted string for UI for now, or number for sorting
                const priceRaw = getTag("price");
                // Basic formatting
                const price = "€" + parseInt(priceRaw).toLocaleString();

                const beds = parseInt(getTag("beds")) || 0;
                const baths = parseInt(getTag("baths")) || 0;
                const size = getTag("built") + " m²";

                // Images extraction
                const imagesNode = node.getElementsByTagName("images")[0];
                const images: string[] = [];
                let image = "";

                if (imagesNode) {
                    const imageNodes = imagesNode.getElementsByTagName("image");
                    for (let j = 0; j < imageNodes.length; j++) {
                        const url = imageNodes[j].getElementsByTagName("url")[0]?.textContent;
                        if (url) images.push(url);
                    }
                    if (images.length > 0) image = images[0];
                }

                // Type mapping
                // Type mapping for consistent English internal usage but Spanish display if needed
                let type: any = 'Villa';
                let typeEs = 'Villa';
                const typeRaw = getTag("type").toLowerCase();

                if (typeRaw.includes("apartment") || typeRaw.includes("flat")) {
                    type = 'Apartment';
                    typeEs = 'Apartamento';
                }
                if (typeRaw.includes("villa") || typeRaw.includes("house")) {
                    type = 'Villa';
                    typeEs = 'Villa';
                }
                if (typeRaw.includes("land") || typeRaw.includes("plot")) {
                    type = 'Project';
                    typeEs = 'Parcela';
                }
                if (typeRaw.includes("commercial") || typeRaw.includes("business")) {
                    type = 'Commercial';
                    typeEs = 'Local Comercial';
                }

                // Force Spanish title by default with Title Cased town
                const title = typeEs + " en " + toTitleCase(getTag("town"));

                // Description extraction
                const descNode = node.getElementsByTagName("desc")[0];
                let description = { en: "", es: "" };
                if (descNode) {
                    description.en = descNode.getElementsByTagName("en")[0]?.textContent || "";
                    description.es = descNode.getElementsByTagName("es")[0]?.textContent || "";
                }

                // Features extraction
                const featuresNode = node.getElementsByTagName("features")[0];
                const features: string[] = [];
                if (featuresNode) {
                    const featureNodes = featuresNode.getElementsByTagName("feature");
                    for (let k = 0; k < featureNodes.length; k++) {
                        const f = featureNodes[k].textContent;
                        if (f) features.push(f);
                    }
                }

                const lat = parseFloat(getTag("latitude"));

                const lng = parseFloat(getTag("longitude"));

                // Status parsing
                const stateRaw = getTag("state");
                const state = stateRaw ? stateRaw.toLowerCase() : 'free';
                const isReserved = getTag("reserved") === "1";

                let status: 'available' | 'reserved' | 'sold' = 'available';

                if (state === 'sold' || state === 'sold subject to contract') {
                    status = 'sold';
                } else if (state === 'reserved' || state === 'under offer' || isReserved) {
                    status = 'reserved';
                }

                const priceFreq = getTag("price_freq") === 'rent' ? 'rent' : 'sale';

                properties.push({
                    id,
                    title,
                    location,
                    price,
                    beds,
                    baths,
                    size,
                    image,
                    images,
                    description,
                    features,
                    type,
                    dateListed: getTag("date").split(" ")[0],
                    lat,

                    lng,
                    status,
                    priceFreq
                    // badges: [] // Could add logic for badges
                });

            } catch (err) {
                console.warn("Skipping property due to parse error", err);
            }
        }

        return properties;

    } catch (error) {
        console.error("Failed to fetch or parse XML feed:", error);
        return [];
    }
};
