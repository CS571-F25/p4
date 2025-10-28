import { heroui } from '@heroui/react';

export const colors = {
    bg: {
        DEFAULT: '#234255',
        dark: '#1A344A',
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
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
            colors: {
                'bg': colors.bg.DEFAULT,
                'bg-dark': colors.bg.dark,
                'text': colors.text.DEFAULT,
                'primary': colors.primary.DEFAULT,
            },
        },
    },
    darkMode: 'class',
    plugins: [
        heroui({
            themes: {
                dark: {
                    colors,
                },
                light: {
                    colors,
                },
            },
        }),
    ],
};
