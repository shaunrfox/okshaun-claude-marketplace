import { defineConfig } from "@pandacss/dev";
import { reynardPreset } from "./src/preset";

export default defineConfig({
  eject: true,
  gitignore: true,
  jsxFramework: "react",
  jsxStyleProps: "all",
  jsxFactory: "styled",
  watch: true,
  // strictTokens: true,
  // importMap: "@styled-system",
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Use our custom Reynard preset
  presets: ["@pandacss/dev/presets", reynardPreset],

  // The output directory for your css system
  outdir: "styled-system",
});
