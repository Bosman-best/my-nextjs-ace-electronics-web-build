/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
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
        heading: ['"Space Grotesk"', 'Poppins', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'ace-glow': '0 0 40px rgba(59,130,246,0.15)',
        'ace-glow-strong': '0 8px 32px rgba(59,130,246,0.30)',
        'ace-card': '0 0 24px rgba(59,130,246,0.08)',
      },
      maxWidth: { 'ace': '1280px' },
      screens: { 'xs': '480px' },
      backgroundImage: { 'ace-gradient': 'linear-gradient(180deg, rgb(var(--ace-midnight)) 0%, rgb(var(--ace-black)) 100%)' }
    },
  },
  plugins: [],
}