/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Custom color palette for Nabha Telemedicine
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Main brand blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Main brand green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },
        accent: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fbd8a5',
          300: '#f9bc6d',
          400: '#f59332',
          500: '#f97316', // Orange accent
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407'
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      },
      // Custom font family
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      // Custom spacing for better mobile experience
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem'
      },
      // Custom breakpoints for rural mobile devices
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Rural-specific breakpoints
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px'
      },
      // Custom border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      // Custom shadows for depth
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 25px 0 rgba(0, 0, 0, 0.15)',
        'hard': '0 10px 40px 0 rgba(0, 0, 0, 0.2)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
      },
      // Animation configurations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-soft': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      // Custom gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f97316 0%, #f59332 50%, #22c55e 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #22c55e 100%)'
      },
      // Typography scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      // Custom z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    }
  },
  plugins: [
    // Form styling plugin
     require('@tailwindcss/forms')({ strategy: 'class' }),({
      strategy: 'class'
    }),
    // Typography plugin for better text rendering
    require('@tailwindcss/typography'),
    // Aspect ratio plugin for responsive media
    require('@tailwindcss/aspect-ratio'),
    // Container queries plugin
    require('@tailwindcss/container-queries'),
    // Custom plugin for healthcare-specific utilities
    function({ addUtilities, addComponents, theme }) {
      // Healthcare status indicators
      addUtilities({
        '.status-available': {
          '@apply bg-green-100 text-green-800 border border-green-200': {}
        },
        '.status-busy': {
          '@apply bg-red-100 text-red-800 border border-red-200': {}
        },
        '.status-offline': {
          '@apply bg-gray-100 text-gray-800 border border-gray-200': {}
        },
        '.status-online': {
          '@apply bg-blue-100 text-blue-800 border border-blue-200': {}
        }
      });

      // Card components
      addComponents({
        '.card': {
          '@apply bg-white rounded-xl shadow-soft border border-gray-100 p-6': {}
        },
        '.card-hover': {
          '@apply transition-all duration-300 hover:shadow-medium hover:-translate-y-1': {}
        },
        '.card-interactive': {
          '@apply cursor-pointer transition-all duration-200 hover:shadow-medium active:scale-95': {}
        }
      });

      // Button variants
      addComponents({
        '.btn': {
          '@apply px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2': {}
        },
        '.btn-primary': {
          '@apply bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500': {}
        },
        '.btn-secondary': {
          '@apply bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500': {}
        },
        '.btn-accent': {
          '@apply bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500': {}
        },
        '.btn-outline': {
          '@apply border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500': {}
        }
      });

      // Mobile-first responsive typography
      addUtilities({
        '.text-mobile-h1': {
          '@apply text-2xl sm:text-3xl lg:text-4xl font-bold': {}
        },
        '.text-mobile-h2': {
          '@apply text-xl sm:text-2xl lg:text-3xl font-semibold': {}
        },
        '.text-mobile-h3': {
          '@apply text-lg sm:text-xl lg:text-2xl font-medium': {}
        },
        '.text-mobile-body': {
          '@apply text-base sm:text-lg leading-relaxed': {}
        }
      });
    }
  ],
  // Dark mode configuration
  darkMode: 'class',
  // Safelist important classes that might be dynamically generated
  safelist: [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-orange-500',
    'bg-purple-500',
    'text-blue-500',
    'text-green-500',
    'text-red-500',
    'text-orange-500',
    'text-purple-500',
    'border-blue-500',
    'border-green-500',
    'border-red-500',
    'border-orange-500',
    'border-purple-500',
    {
      pattern: /bg-(blue|green|red|orange|purple)-(100|500|600)/,
    },
    {
      pattern: /text-(blue|green|red|orange|purple)-(500|600|700|800)/,
    },
    {
      pattern: /border-(blue|green|red|orange|purple)-(200|300|500)/,
    }
  ]
}