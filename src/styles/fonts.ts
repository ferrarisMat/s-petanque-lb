export const FONTS = {
  primary: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const;

export const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

export const FONT_STYLES = {
  semibold: `
    font-family: ${FONTS.primary};
    font-weight: ${FONT_WEIGHTS.semibold};
  `,
  medium: `
    font-family: ${FONTS.primary};
    font-weight: ${FONT_WEIGHTS.medium};
  `,
  regular: `
    font-family: ${FONTS.primary};
    font-weight: ${FONT_WEIGHTS.regular};
  `,
} as const;