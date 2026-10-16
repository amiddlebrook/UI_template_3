/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace']
      },
      colors: {
        bio: {
          void: '#080b0b',
          membrane: '#121a19',
          nucleus: '#edf3ec',
          plasma: '#c8f26c',
          enzyme: '#ff7897',
          lipid: '#263531',
          subtle: '#94a69b'
        }
      },
      animation: {
        morph: 'morph 12s ease-in-out infinite',
        'pulse-fast': 'pulse 2s ease-in-out infinite',
        drift: 'drift 20s linear infinite'
      },
      keyframes: {
        morph: {
          '0%, 100%': { borderRadius: '28% 36% 30% 26% / 24% 30% 32% 35%' },
          '50%': { borderRadius: '34% 25% 33% 24% / 30% 22% 35% 27%' }
        },
        drift: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' }
        }
      }
    }
  },
  plugins: []
};
