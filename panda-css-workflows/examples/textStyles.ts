import { defineTextStyles, defineStyles } from "@pandacss/dev";
import { fontVariants } from "./primitives";
import { color as semanticColors } from "./semantics/semantics.color.tokens";

const baseHeadingStyles = defineStyles({
  value: {
    fontFamily: "heading",
    fontWeight: "black",
    color: semanticColors.text,
  },
});

const baseBodyTextStyles = defineStyles({
  value: {
    fontFamily: "body",
    fontVariationSettings: fontVariants.body,
    color: semanticColors.text.subtle,
  },
});

const baseMonoStyles = defineStyles({
  value: {
    fontFamily: "mono",
    fontVariationSettings: fontVariants.mono,
    color: semanticColors.text.subtle,
  },
});

export const textStyles = defineTextStyles({
  display: {
    lg: {
      value: {
        ...baseHeadingStyles,
        fontSize: "72",
      },
    },
    md: {
      value: {
        ...baseHeadingStyles,
        fontSize: "64",
      },
    },
    sm: {
      value: {
        ...baseHeadingStyles,
        fontSize: "56",
      },
    },
    xs: {
      value: {
        ...baseHeadingStyles,
        fontSize: "48",
      },
    },
  },
  heading: {
    lg: {
      value: {
        ...baseHeadingStyles,
        fontSize: "40",
      },
    },
    md: {
      value: {
        ...baseHeadingStyles,
        fontSize: "32",
      },
    },
    sm: {
      value: {
        ...baseHeadingStyles,
        fontSize: "24",
      },
    },
    xs: {
      value: {
        ...baseHeadingStyles,
        fontSize: "20",
      },
    },
  },
  body: {
    lg: {
      value: {
        ...baseBodyTextStyles,
        fontSize: "20",
      },
    },
    md: {
      value: {
        ...baseBodyTextStyles,
        fontSize: "16",
      },
    },
    sm: {
      value: {
        ...baseBodyTextStyles,
        fontSize: "14",
      },
    },
    xs: {
      value: {
        ...baseBodyTextStyles,
        fontSize: "12",
      },
    },
  },
  mono: {
    lg: {
      value: {
        ...baseMonoStyles,
        fontSize: "20",
      },
    },
    md: {
      value: {
        ...baseMonoStyles,
        fontSize: "16",
      },
    },
    sm: {
      value: {
        ...baseMonoStyles,
        fontSize: "14",
      },
    },
    xs: {
      value: {
        ...baseMonoStyles,
        fontSize: "12",
      },
    },
  },
});
