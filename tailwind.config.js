/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "hsl(24 100% 52%)",
          orange2: "hsl(24 100% 60%)",
          amber: "hsl(38 100% 50%)",
          ink: "hsl(220 15% 12%)",
          steel: "hsl(220 12% 18%)",
          line: "hsl(220 10% 30%)",
          paper: "hsl(40 25% 95%)",
        },
      },
      fontFamily: {
        display: ["'Exo 2'", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0.5rem hsl(24 100% 52% / 0.6), 0 0 1.25rem hsl(38 100% 50% / 0.35)"
      },
      keyframes: {
        'pulse-glow': { 
          '0%,100%': { boxShadow: '0 0 0.5rem hsl(24 100% 52% / .5)' },
          '50%': { boxShadow: '0 0 1.1rem hsl(38 100% 50% / .4)' } 
        },
        'underline': { 
          '0%': { transform: 'scaleX(0)' }, 
          '100%': { transform: 'scaleX(1)' } 
        }
      },
      animation: {
        glow: 'pulse-glow 2.2s ease-in-out infinite',
        underline: 'underline .35s ease-out forwards'
      }
    }
  },
  plugins: [],
}