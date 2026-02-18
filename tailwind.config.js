/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#222222",
                "primary-dark": "#000000",
                "background-light": "#FFFFFF",
                "background-dark": "#222222",
                "editorial-black": "#222222",
                "editorial-gray": "#f6f7f8",
                charcoal: "#36454F",
                "brand-grey": {
                    50: "#e9e9e9",
                    100: "#bababa",
                    200: "#999999",
                    300: "#6b6b6b",
                    400: "#4e4e4e",
                    500: "#222222",
                    600: "#1f1f1f",
                    700: "#181818",
                    800: "#131313",
                    900: "#0e0e0e",
                },
                "brand-blue": {
                    50: "#e9fbfd",
                    100: "#baf1fa",
                    200: "#99ebf7",
                    300: "#6be2f4",
                    400: "#4edcf1",
                    500: "#22d3ee",
                    600: "#1fc0d9",
                    700: "#1896a9",
                    800: "#137483",
                    900: "#0e5964",
                },
            },
            fontFamily: {
                display: ["Manrope", "sans-serif"],
                serif: ["Playfair Display", "serif"],
            },
            borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem",
                "2xl": "1rem",
                full: "9999px",
                none: "0px",
            },
            boxShadow: {
                editorial: "0 20px 40px -10px rgba(0, 0, 0, 0.05)",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
