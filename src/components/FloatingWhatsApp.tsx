import React from 'react';

const FloatingWhatsApp: React.FC = () => {
    // Replace with actual phone number if provided, otherwise use a placeholder or generic link
    // Format: https://wa.me/<number>
    const whatsappUrl = "https://wa.me/34600000000";

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
            aria-label="Contact on WhatsApp"
        >
            <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:animate-ping"></div>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-8 h-8 filter brightness-0 invert"
            />
        </a>
    );
};

export default FloatingWhatsApp;
