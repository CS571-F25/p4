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
                bg: 'var(--bg)',
                'bg-dark': 'var(--bg-dark)',
                'bg-superdark': 'var(--bg-superdark)',
                text: 'var(--text)',
                primary: 'var(--primary)',
            },
            fontSize: {
                xxs: 'var(--text-xxs)',
                xs: 'var(--text-xs)',
                sm: 'var(--text-sm)',
                md: 'var(--text-md)',
                lg: 'var(--text-lg)',
                xl: 'var(--text-xl)',
                logo: 'var(--text-logo)',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};
