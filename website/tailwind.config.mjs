/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#096829", // Blue
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#10B981", // Green
                    foreground: "#FFFFFF",
                },
                accent: {
                    DEFAULT: "#48e27c", // Purple
                    foreground: "#FFFFFF",
                },
                background: {
                    DEFAULT: "#F3F4F6", // Light Gray
                    foreground: "#1F2937",
                },
            },
        },
    },
    plugins: [],
};
