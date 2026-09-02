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
          'text-primary': 'rgb(var(--ace-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--ace-text-secondary) / <alpha-value>)',
          'text-muted': 'rgb(var(--ace-text-muted) / <alpha-value>)',
          'border-light': 'var(--ace-border-light)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading-display, "Space Grotesk")', 'Poppins', 'sans-serif'],
        body: ['var(--font-body-display, Inter)', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        // Subtle, neutral elevation only — no colored glow.
        'ace-glow': '0 2px 8px rgba(0,0,0,0.06)',
        'ace-glow-strong': '0 8px 24px rgba(0,0,0,0.10)',
        'ace-card': '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
      },
      maxWidth: { 'ace': '1280px' },
      screens: { 'xs': '480px' },
      backgroundImage: { 'ace-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F7 100%)' }
    },
  },
  plugins: [],
}
