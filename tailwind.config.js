/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
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
