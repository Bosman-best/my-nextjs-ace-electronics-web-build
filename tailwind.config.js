/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ace: {
          black: 'rgb(var(--ace-black) / <alpha-value>)',
          midnight: 'rgb(var(--ace-midnight) / <alpha-value>)',
          navy: 'rgb(var(--ace-navy) / <alpha-value>)',
          blue: 'rgb(var(--ace-blue) / <alpha-value>)',
          'blue-bright': 'rgb(var(--ace-blue-bright) / <alpha-value>)',
          'pale-blue': 'rgb(var(--ace-pale-blue) / <alpha-value>)',
          background: 'rgb(var(--ace-background) / <alpha-value>)',
          electric: 'rgb(var(--ace-electric) / <alpha-value>)',
          'electric-button': 'rgb(var(--ace-electric-button) / <alpha-value>)',
          'electric-dark': 'rgb(var(--ace-electric-dark) / <alpha-value>)',
          'electric-darker': 'rgb(var(--ace-electric-darker) / <alpha-value>)',
          silver: 'rgb(var(--ace-silver) / <alpha-value>)',
          white: 'rgb(var(--ace-white) / <alpha-value>)',
          glass: 'var(--ace-glass)',
          'glass-border': 'var(--ace-glass-border)',
          'glass-hover': 'var(--ace-glass-hover)',
          'surface-primary': 'rgb(var(--ace-surface-primary) / <alpha-value>)',
          'surface-secondary': 'rgb(var(--ace-surface-secondary) / <alpha-value>)',
          'border-light': 'rgb(var(--ace-border-light) / <alpha-value>)',
          'text-primary': 'rgb(var(--ace-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--ace-text-secondary) / <alpha-value>)',
          'text-muted': 'rgb(var(--ace-text-muted) / <alpha-value>)',
          link: 'rgb(var(--ace-link) / <alpha-value>)',
        }
      },
      fontFamily: {
        heading: ['Poppins', '"Trebuchet MS"', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        xl: '18px',
        '2xl': '18px',
        full: '999px',
      },
      boxShadow: {
        'ace-glow': '0 2px 12px rgba(0,0,0,0.08)',
        'ace-glow-strong': '0 4px 16px rgba(0,0,0,0.12)',
        'ace-card': '0 2px 12px rgba(0,0,0,0.08)',
      },
      fontSize: {
        hero: ['80px', { lineHeight: '1.05', letterSpacing: '-0.003em' }],
        'hero-sm': ['48px', { lineHeight: '1.1', letterSpacing: '-0.003em' }],
        'section-heading': ['56px', { lineHeight: '1.05' }],
        'section-heading-sm': ['36px', { lineHeight: '1.1' }],
        'heading-3': ['28px', { lineHeight: '1.1' }],
        body: ['17px', { lineHeight: '1.6' }],
        caption: ['12px', { lineHeight: '1.6', letterSpacing: '0.08em' }],
      },
      spacing: {
        section: '140px',
        'section-sm': '80px',
        hero: '80px',
      },
      maxWidth: { ace: '1280px' },
      screens: { xs: '480px' },
      backgroundImage: { 'ace-gradient': 'linear-gradient(180deg, rgb(var(--ace-surface-secondary)) 0%, rgb(var(--ace-background)) 100%)' }
    },
  },
  plugins: [],
}