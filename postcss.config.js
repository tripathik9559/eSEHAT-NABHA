// PostCSS configuration for Nabha Telemedicine Platform
// Optimized for production builds and cross-browser compatibility

module.exports = {
  plugins: [
    // Tailwind CSS - Main utility framework
    require('tailwindcss'),
    
    // Autoprefixer - Adds vendor prefixes for browser compatibility
    require('autoprefixer')({
      // Target browsers for rural areas (including older devices)
      overrideBrowserslist: [
        '>0.2%',
        'not dead',
        'not op_mini all',
        'ie >= 11',
        'chrome >= 60',
        'firefox >= 60',
        'safari >= 10',
        'edge >= 16',
        // Mobile browsers common in rural India
        'and_chr >= 60',
        'and_ff >= 60',
        'android >= 7',
        'ios >= 10'
      ],
      // Add prefixes for flexbox (important for older browsers)
      flexbox: 'no-2009',
      // Grid support for modern layouts
      grid: 'autoplace'
    }),

    // CSS Nano - Minifies CSS for production builds
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('cssnano')({
            preset: ['default', {
              // Optimize for better compression
              discardComments: {
                removeAll: true,
              },
              // Normalize whitespace
              normalizeWhitespace: true,
              // Merge rules
              mergeRules: true,
              // Optimize font weights
              minifyFontValues: true,
              // Optimize selectors
              minifySelectors: true,
              // Remove unused at-rules
              discardUnused: true,
              // Reduce calc() expressions
              calc: true,
              // Convert colors to shorter formats
              colormin: true,
              // Optimize SVG paths
              svgo: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              }
            }]
          })
        ]
      : []
    ),

    // PostCSS Import - Handle @import statements
    require('postcss-import'),

    // PostCSS Nested - Support for nested CSS (Sass-like)
    require('postcss-nested'),

    // PostCSS Custom Properties - CSS Variables support for older browsers
    require('postcss-custom-properties')({
      // Preserve custom properties for modern browsers
      preserve: true,
      // Export custom properties for JavaScript
      exportTo: 'src/styles/custom-properties.js'
    }),

    // PostCSS Media Minmax - Use modern media query syntax
    require('postcss-media-minmax'),

    // PostCSS Focus Within - Polyfill for :focus-within
    require('postcss-focus-within'),

    // PostCSS Focus Visible - Polyfill for :focus-visible
    require('postcss-focus-visible'),

    // PostCSS Logical - Logical properties polyfill
    require('postcss-logical')({
      // Preserve logical properties
      preserve: true
    }),

    // Performance optimizations
    ...(process.env.NODE_ENV === 'production'
      ? [
          // Remove unused CSS (works with Tailwind's purge)
          require('@fullhuman/postcss-purgecss')({
            content: [
              './src/**/*.{js,jsx,ts,tsx}',
              './public/index.html'
            ],
            // Safelist important classes
            safelist: [
              /^bg-/,
              /^text-/,
              /^border-/,
              /^hover:/,
              /^focus:/,
              /^active:/,
              /^group-hover:/,
              'lucide',
              /^lucide-/
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
        ]
      : []
    ),

    // Critical CSS extraction for better performance
    ...(process.env.EXTRACT_CRITICAL === 'true'
      ? [
          require('postcss-critical-split')({
            output: 'critical',
            modules: ['./src/styles/critical.css']
          })
        ]
      : []
    )
  ],

  // Parser options
  parser: require('postcss-scss'),

  // Map configuration for development
  map: process.env.NODE_ENV === 'development' ? {
    inline: false,
    annotation: true,
    sourcesContent: true
  } : false
}