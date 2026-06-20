/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563EB',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        dark: {
          bg:     '#0A0F1E',
          card:   '#111827',
          border: '#1f2d45',
          muted:  '#2e3f5c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-blue':   '0 0 20px rgba(37,99,235,0.35)',
        'glow-green':  '0 0 20px rgba(16,185,129,0.35)',
        'glow-red':    '0 0 20px rgba(239,68,68,0.35)',
        'card-hover':  '0 8px 32px rgba(0,0,0,0.12)',
        'glass':       '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      backdropBlur: { xs: '4px' },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  plugins: [],
}
