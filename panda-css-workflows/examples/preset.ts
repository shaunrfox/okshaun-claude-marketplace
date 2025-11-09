import {
  definePreset,
  defineTokens,
  defineSemanticTokens,
} from "@pandacss/dev";
import pandaBasePreset from "@pandacss/preset-base";
import * as primitives from "./primitives";
import * as semantics from "./semantics";
import { conditions } from "./conditions";
import { textStyles } from "./textStyles";
import { globalCss } from "./globalStyle";
import * as uiRecipes from "@reynard/ui/src/recipes";

// https://panda-css.com/docs/concepts/extend#removing-something-from-the-base-presets
// omit default patterns here
const { box, divider, ...pandaBasePresetPatterns } = pandaBasePreset.patterns;
const pandaBasePresetConditions = pandaBasePreset.conditions;
const pandaBasePresetUtilities = pandaBasePreset.utilities;
const pandaBasePresetGlobalCss = pandaBasePreset.globalCss;

// using pandas methods to define type-safe tokens
const theme = {
  tokens: defineTokens({
    aspectRatios: primitives.aspectRatios,
    borders: primitives.borders,
    easings: primitives.easings,
    durations: primitives.durations,
    letterSpacings: primitives.letterSpacings,
    lineHeights: primitives.lineHeights,
    blurs: primitives.blurs,
    animations: primitives.animations,
    colors: primitives.primitiveColors,
    fonts: primitives.fonts,
    fontSizes: primitives.fontSizes,
    fontWeights: primitives.fontWeights,
    sizes: primitives.sizes,
    numericSizes: primitives.numericSizes,
    spacing: primitives.sizes,
    radii: primitives.radii,
    keyframes: primitives.keyframes,
    containerSizes: primitives.containerSizes,
    breakpoints: primitives.breakpoints,
    opacity: primitives.opacityTokens,
  }),
  semanticTokens: defineSemanticTokens({
    ...semantics,
  }),
};

export const reynardPreset = definePreset({
  name: "reynard",
  theme: {
    extend: {
      tokens: {
        colors: theme.tokens.colors,
        fonts: theme.tokens.fonts,
        fontWeights: theme.tokens.fontWeights,
        fontSizes: theme.tokens.fontSizes,
        lineHeights: theme.tokens.lineHeights,
        letterSpacings: theme.tokens.letterSpacings,
        sizes: theme.tokens.sizes,
        spacing: theme.tokens.sizes,
        radii: theme.tokens.radii,
        opacity: theme.tokens.opacity,
        borders: theme.tokens.borders,
        aspectRatios: theme.tokens.aspectRatios,
        easings: theme.tokens.easings,
        durations: theme.tokens.durations,
        blurs: theme.tokens.blurs,
        animations: theme.tokens.animations,
      },
      breakpoints: theme.tokens.breakpoints,
      keyframes: theme.tokens.keyframes,
      semanticTokens: {
        ...theme.semanticTokens,
      },
      textStyles,
      // recipes: {
      //   ...uiRecipes,
      // },
    },
  },
  patterns: {
    // icon: {
    //   properties: {
    //     size: {
    //       type: "enum",
    //       value: Object.keys(theme.tokens.sizes),
    //     },
    //   },
    //   transform(props) {
    //     const { size, ...rest } = props;
    //     return {
    //       width: size,
    //       height: size,
    //       ...rest,
    //     };
    //   },
    // },
    extend: {
      ...pandaBasePresetPatterns,
      container: {
        transform(props) {
          return Object.assign(
            {
              position: "relative",
              width: "100%",
              maxWidth: "7xl",
              mx: "auto",
              px: { base: "24", md: "20", sm: "16" },
            },
            props
          );
        },
      },
    },
  },
  utilities: {
    ...pandaBasePresetUtilities,
  },

  // Global styles
  globalCss: {
    ...pandaBasePresetGlobalCss,
    ...globalCss,
    html: {
      "--global-font-heading": "fonts.heading",
      "--global-font-body": "fonts.body",
      "--global-font-mono": "fonts.mono",
    },
  },

  // Conditions for responsive and state-based styling
  conditions: {
    ...pandaBasePresetConditions,
    ...conditions,
  },
});
