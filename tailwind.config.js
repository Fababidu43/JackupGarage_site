/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          900: '#0B0B0F',
          800: '#111217',
          700: '#171923',
        },
        text: {
          primary: '#E6E6E9',
          muted: '#A9ABB3',
        },
        brand: {
          400: '#FF8A1E',
          500: '#FF6A00',
          600: '#E35F00',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 106, 0, 0.35)',
      },
      keyframes: {
        bgpan: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' }
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        bgpan: 'bgpan 12s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
};