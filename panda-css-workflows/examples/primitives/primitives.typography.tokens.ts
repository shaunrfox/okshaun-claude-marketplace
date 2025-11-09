export const fonts = {
  heading: {
    value:
      "'IBM Plex Sans Variable', 'IBM Plex Sans', Source Sans, Geneva, Tahoma, Verdana, sans-serif",
  },
  body: {
    value:
      "'IBM Plex Sans Variable', 'IBM Plex Sans', Geneva, Tahoma, Verdana, sans-serif",
  },
  mono: {
    value:
      "'IBM Plex Mono', 'Andale Mono', monaco, Consolas, 'Lucida Console', monospace",
  },
};

// IBM Plex Sans Variable supports: wdth (85-100), wght (100-700)
// Note: italic is a style (font-style: italic), NOT an axis
// For IBM Plex Sans Variable font-variation-settings
export const fontVariants = {
  body: '"wdth" 100, "wght" 400',
  "body-italic": '"wdth" 100, "wght" 400',
  "body-narrow": '"wdth" 85, "wght" 400',
  "body-narrow-italic": '"wdth" 85, "wght" 400',
  "body-bold": '"wdth" 100, "wght" 700',
  "body-bold-italic": '"wdth" 100, "wght" 700',
  // IBM Plex Mono is static, no font-variation-settings needed
  mono: "normal",
  "mono-italic": "normal",
};

export const fontWeights = {
  light: { value: 300 },
  normal: { value: 400 },
  medium: { value: 500 },
  bold: { value: 700 },
  black: { value: 900 },
};

export const fontSizes = {
  "12": { value: "{sizes.12}" },
  "14": { value: "{sizes.14}" },
  "16": { value: "{sizes.16}" },
  "20": { value: "{sizes.20}" },
  "24": { value: "{sizes.24}" },
  "32": { value: "{sizes.32}" },
  "40": { value: "{sizes.40}" },
  "48": { value: "{sizes.48}" },
  "64": { value: "{sizes.64}" },
  "72": { value: "{sizes.72}" },
  "80": { value: "{sizes.80}" },
  "96": { value: "{sizes.96}" },
};

export const lineHeights = {
  none: {
    value: "1",
  },
  tight: {
    value: "1em + 0.25rem", // 4
  },
  default: {
    value: "1em + 0.5rem", // 8
  },
  loose: {
    value: "1em + 0.75rem", // 12
  },
};

export const letterSpacings = {
  tighter: {
    value: "-0.05em",
  },
  tight: {
    value: "-0.025em",
  },
  normal: {
    value: "0em",
  },
  wide: {
    value: "0.025em",
  },
  wider: {
    value: "0.05em",
  },
  widest: {
    value: "0.1em",
  },
};
