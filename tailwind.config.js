export const colors = {
    bg: {
        DEFAULT: '#2b4b5f',
        dark: '#1A344A',
        superdark: '#0D1A2B',
    },
    text: {
        DEFAULT: '#F3F3FF',
    },
    primary: {
        DEFAULT: '#FFE0CA',
    },
};

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
            colors: {
                bg: colors.bg.DEFAULT,
                'bg-dark': colors.bg.dark,
                'bg-superdark': colors.bg.superdark,
                text: colors.text.DEFAULT,
                primary: colors.primary.DEFAULT,
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};
