/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0a0a',
        panel: '#111111',
        card: '#1a1a1a',
        gold: {
          50: '#fdf8e8',
          100: '#faedc5',
          200: '#f5d98a',
          300: '#f0c550',
          400: '#d4a834',
          500: '#b8942e',
          600: '#9a7a28',
          700: '#7c6222',
          800: '#5e4a1c',
          900: '#403216',
        },
      },
      fontFamily: {
        display: ['"SF Pro Display"', 'Inter', 'system-ui', 'sans-serif'],
        text: ['"SF Pro Text"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        'bounce-y': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      animation: {
        'bounce-y': 'bounce-y 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

