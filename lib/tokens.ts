// ACE Electronics Design Tokens — Stage 1 / 3 Locked
export const tokens = {
  colors: {
    black: '#0B0F1A',
    midnight: '#0F1B3D',
    electric: '#3B82F6',
    electricButton: '#2563EB', // WCAG AA compliant button fill
    electricDark: '#1D4ED8',
    silver: '#C0C7D1',
    white: '#FFFFFF',
  },
  fonts: {
    heading: '"Space Grotesk", "Poppins", sans-serif',
    body: '"Inter", "Roboto", sans-serif',
  },
  radius: { button: '16px', card: '24px' },
  spacing: { sectionYDesktop: '120px', sectionYMobile: '64px', gridGap: '32px' },
  breakpoints: { mobile: 480, tablet: 768, desktop: 1024, xl: 1280 }
} as const
