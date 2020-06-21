export const COLOR = {
  BACKGROUND: '#EEF3F1',
  BACKGROUND_LIGHT: '#F8FBFA',
  BACKGROUND_DARK: '#E1E8E7',
  TEXT: '#000000',

  ACCENT: {
    PRIMARY: '#9EFFA9',
    SECONDARY: '#26D97D',
  },

  HIGHLIGHT: '#C8D7FF',
  SHADOW: '#00463C',
}

const FAMILY = {
  BODY: 'interstate, sans-serif',
  DECORATIVE: 'cosmopolitan, sans-serif',
}

const SIZE = {
  XXS: '0.5em',
  XS: '0.625em',
  S: '0.75em',
  M: '1em',
  L: '1.5em',
  XL: '2em',
  XXL: '2.5em',
}

const WEIGHT = {
  REGULAR: 400,
  BOLD: 700,
}

export const FONT = {
  FAMILY,
  SIZE,
  WEIGHT,
}

export const BREAKPOINT = {
  S: 500,
  M: 900,
  L: 1300,
}

export const BORDER_RADIUS = {
  S: '2px',
  M: '4px',
}

export const FILTER_UNDERLINE_STYLE = `
  text-decoration: underline;
  text-decoration-color: ${COLOR.ACCENT.PRIMARY};
  text-decoration-style: wavy;
  text-decoration-skip-ink: none;
`
