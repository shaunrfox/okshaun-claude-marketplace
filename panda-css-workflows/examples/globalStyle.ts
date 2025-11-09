import { defineGlobalStyles } from "@pandacss/dev";
import { fontVariants } from "./primitives";

// includes some normalize styles from:
// https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css

export const globalCss = defineGlobalStyles({
  "*, *::before, *::after": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    _focusVisible: {
      outlineColor: { base: "neutral.90", _dark: "neutral.0" },
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },
  html: {
    fontSize: "16",
    lineHeight: "calc(1em + 0.5rem)",
    "-webkit-text-size-adjust": "100%",
    tabSize: "4",
  },
  body: {
    fontFamily: "body",
    fontVariationSettings: fontVariants.body,
    bg: { base: "neutral.0", _dark: "neutral.90" },
    color: { base: "neutral.60", _dark: "neutral.30" },
    fontWeight: "normal",
  },
  "h1, h2, h3, h4, h5, h6": {
    color: { base: "neutral.90", _dark: "neutral.5" },
    fontWeight: "black",
    lineHeight: "calc(1em + 0.5rem)",
  },
  p: {
    marginBottom: "0.5rem",
  },
  "b, strong": {
    fontWeight: "bold",
  },
  "i, em": {
    fontStyle: "italic",
    fontVariationSettings: fontVariants["body-italic"],
  },
  u: {
    textDecoration: "underline",
  },
  "code, kbd, samp, pre": {
    fontFamily: "mono",
    fontVariationSettings: fontVariants.mono,
    fontSize: "1em",
  },
  table: {
    borderColor: { base: "neutral.10", _dark: "neutral.60" },
  },
  "button, input, optgroup, select, textarea": {
    fontFamily: "body",
    fontSize: "100%",
    lineHeight: "calc(1em + 0.5rem)",
    margin: "0",
  },
  'button, [type="button"], [type="reset"], [type="submit"]': {
    "-webkit-appearance": "button",
  },
  legend: {
    padding: "0",
  },
  progress: {
    verticalAlign: "baseline",
  },
  "::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
    height: "auto",
  },
  '[type="search"]': {
    "-webkit-appearance": "textfield",
    outlineOffset: "-2px",
  },
  "::-webkit-search-decoration": {
    "-webkit-appearance": "none",
  },
  "::-webkit-file-upload-button": {
    "-webkit-appearance": "button",
    font: "inherit",
  },
  summary: {
    display: "list-item",
  },
});
