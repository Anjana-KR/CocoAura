/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          darkest: '#091410',
          dark: '#0e1e17',
          deep: '#152b22',
          surface: '#1d382c',
          card: '#224032',
          accent: '#2f5945',
          border: '#325744',
        },
        gold: {
          50: '#fdf9ee',
          100: '#fbf1d5',
          200: '#f6e2a6',
          300: '#efcd6c',
          400: '#e5b438',
          500: '#d49b22',
          600: '#ba7b19',
          700: '#945817',
          800: '#7a461a',
          900: '#673a19',
        },
        cream: {
          50: '#fcfbf8',
          100: '#f8f4ec',
          200: '#f0e8d9',
          300: '#e5d7c0',
          400: '#d5be9f',
          800: '#4a3c2c',
          900: '#2b2319',
        },
        coconut: {
          white: '#FEFCFA',
          milk: '#F7F4EE',
          husk: '#6D4E3A',
          oil: '#E8CA65',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(212, 175, 55, 0.3)',
        'glow-botanical': '0 0 45px -10px rgba(47, 89, 69, 0.4)',
        'luxe': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulseGlow 4s ease-in-out infinite',
        ripple: 'ripple 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      }
    },
  },
  plugins: [],
}
