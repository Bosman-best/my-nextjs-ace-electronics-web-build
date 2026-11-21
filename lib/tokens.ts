// ACE Electronics Design Tokens — Reference-aligned visual foundation
export const tokens = {
  colors: {
    background: '#F5F8FF',
    backgroundGradientStart: '#EAF1FF',
    heading: '#0B1B3A',
    body: '#5B6B84',
    blue: '#0A5CE8',
    blueHover: '#0748BE',
    navy: '#0B1B3A',
    white: '#FFFFFF',
    surface: '#FFFFFF',
    paleBlue: '#EAF1FF',
    border: '#DAE6F8',
    stars: '#FFB400',
  },
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  radius: { button: '14px', card: '20px', large: '24px' },
  spacing: { sectionYDesktop: '72px', sectionYMobile: '48px', gridGap: '24px' },
  breakpoints: { mobile: 390, tablet: 768, desktop: 1440 },
} as const
