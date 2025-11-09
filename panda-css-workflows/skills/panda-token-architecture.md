---
name: panda-token-architecture
description: Design token systems, semantic tokens, theme structures, and responsive design tokens following best practices
---

# Panda CSS Token Architecture

## When to Use This Skill

Use this skill when:
- Designing a design system's token architecture
- Organizing color palettes, spacing, typography, and other design tokens
- Setting up theme switching (light/dark modes)
- Creating semantic token layers for intent-based naming
- Establishing responsive design token patterns

For implementing these tokens in recipes or components, use **panda-recipe-patterns** or **panda-component-impl** skills.

## Token Architecture Principles

### Two-Layer Token System

**Layer 1: Base Tokens** - Raw design values
- Color palettes with numeric scales
- Sizing and spacing scales
- Typography scales
- Static values that rarely change

**Layer 2: Semantic Tokens** - Context-aware aliases
- Theme-dependent (light/dark mode)
- Intent-based naming (success, error, brand)
- References to base tokens
- Changes based on context/theme

**Why**: Separation enables theme switching without redefining entire palettes.

## Base Tokens

Create: `src/styles/tokens.ts`

### Color Palettes

**Pattern**: Use numeric scales (0-100 or 1-90) for lightness/darkness:

```typescript
import { defineTokens } from '@pandacss/dev'

export const tokens = defineTokens({
  colors: {
    // Grayscale: 0 = lightest, 100 = darkest
    slate: {
      0: { value: '#FFFFFF' },
      5: { value: '#F8F9FA' },
      10: { value: '#F1F3F5' },
      20: { value: '#E9ECEF' },
      30: { value: '#DEE2E6' },
      40: { value: '#CED4DA' },
      50: { value: '#ADB5BD' },
      60: { value: '#868E96' },
      70: { value: '#495057' },
      80: { value: '#343A40' },
      90: { value: '#212529' },
      100: { value: '#000000' }
    },

    // Brand colors with tints/shades
    blue: {
      5: { value: '#E7F5FF' },
      10: { value: '#D0EBFF' },
      20: { value: '#A5D8FF' },
      30: { value: '#74C0FC' },
      40: { value: '#4DABF7' },
      50: { value: '#339AF0' },  // Base brand blue
      60: { value: '#228BE6' },
      70: { value: '#1C7ED6' },
      80: { value: '#1971C2' },
      90: { value: '#1864AB' }
    },

    // Semantic palette colors
    green: { /* success shades */ },
    red: { /* error shades */ },
    yellow: { /* warning shades */ },
    cyan: { /* info shades */ }
  }
})
```

**Naming Convention**:
- 0-100 scale: 0 = lightest, 100 = darkest
- Or 1-90 scale: 1 = lightest, 90 = darkest
- Choose one convention and stick to it

### Spacing & Sizing

**Pattern**: Unified scale for both spacing and sizing:

```typescript
const sizes = {
  // Utility sizes
  0: { value: '0' },
  auto: { value: 'auto' },
  full: { value: '100%' },
  min: { value: 'min-content' },
  max: { value: 'max-content' },
  fit: { value: 'fit-content' },
  prose: { value: '65ch' },

  // Numeric scale in rem (16px base)
  1: { value: '0.0625rem' },   // 1px
  2: { value: '0.125rem' },    // 2px
  4: { value: '0.25rem' },     // 4px
  6: { value: '0.375rem' },    // 6px
  8: { value: '0.5rem' },      // 8px
  12: { value: '0.75rem' },    // 12px
  16: { value: '1rem' },       // 16px
  20: { value: '1.25rem' },    // 20px
  24: { value: '1.5rem' },     // 24px
  32: { value: '2rem' },       // 32px
  40: { value: '2.5rem' },     // 40px
  48: { value: '3rem' },       // 48px
  64: { value: '4rem' },       // 64px
  80: { value: '5rem' },       // 80px
  96: { value: '6rem' },       // 96px
  // ... extend as needed
}

export const tokens = defineTokens({
  sizes,
  spacing: sizes  // Reuse same scale for spacing
})
```

**Why**: Unified scale ensures consistency between width/height and padding/margin.

### Container Sizes

**Pattern**: Named breakpoint containers:

```typescript
export const tokens = defineTokens({
  sizes: {
    // ... numeric sizes above ...

    // Named container sizes
    '2xs': { value: '16rem' },    // 256px
    xs: { value: '20rem' },       // 320px
    sm: { value: '24rem' },       // 384px
    md: { value: '28rem' },       // 448px
    lg: { value: '32rem' },       // 512px
    xl: { value: '36rem' },       // 576px
    '2xl': { value: '42rem' },    // 672px
    '3xl': { value: '48rem' },    // 768px
    '4xl': { value: '56rem' },    // 896px
    '5xl': { value: '64rem' },    // 1024px
    '6xl': { value: '72rem' },    // 1152px
    '7xl': { value: '80rem' },    // 1280px
    '8xl': { value: '90rem' }     // 1440px
  }
})
```

### Typography

**Pattern**: Separate font families, weights, sizes, and line heights:

```typescript
export const tokens = defineTokens({
  fonts: {
    body: { value: 'Inter, -apple-system, sans-serif' },
    heading: { value: 'Inter, -apple-system, sans-serif' },
    mono: { value: 'JetBrains Mono, Consolas, monospace' }
  },

  fontWeights: {
    thin: { value: '100' },
    light: { value: '300' },
    normal: { value: '400' },
    medium: { value: '500' },
    semibold: { value: '600' },
    bold: { value: '700' },
    extrabold: { value: '800' }
  },

  fontSizes: {
    '2xs': { value: '0.625rem' },   // 10px
    xs: { value: '0.75rem' },       // 12px
    sm: { value: '0.875rem' },      // 14px
    md: { value: '1rem' },          // 16px
    lg: { value: '1.125rem' },      // 18px
    xl: { value: '1.25rem' },       // 20px
    '2xl': { value: '1.5rem' },     // 24px
    '3xl': { value: '1.875rem' },   // 30px
    '4xl': { value: '2.25rem' },    // 36px
    '5xl': { value: '3rem' },       // 48px
    '6xl': { value: '3.75rem' },    // 60px
    '7xl': { value: '4.5rem' }      // 72px
  },

  lineHeights: {
    none: { value: '1' },
    tight: { value: '1.25' },
    snug: { value: '1.375' },
    normal: { value: '1.5' },
    relaxed: { value: '1.625' },
    loose: { value: '2' }
  }
})
```

### Other Design Tokens

```typescript
export const tokens = defineTokens({
  radii: {
    none: { value: '0' },
    sm: { value: '0.125rem' },     // 2px
    base: { value: '0.25rem' },    // 4px
    md: { value: '0.375rem' },     // 6px
    lg: { value: '0.5rem' },       // 8px
    xl: { value: '0.75rem' },      // 12px
    '2xl': { value: '1rem' },      // 16px
    full: { value: '9999px' }
  },

  shadows: {
    xs: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    sm: { value: '0 1px 3px 0 rgb(0 0 0 / 0.1)' },
    md: { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
    lg: { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)' },
    xl: { value: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
    inner: { value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' }
  },

  easings: {
    default: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    linear: { value: 'linear' },
    in: { value: 'cubic-bezier(0.4, 0, 1, 1)' },
    out: { value: 'cubic-bezier(0, 0, 0.2, 1)' },
    inOut: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' }
  },

  durations: {
    fast: { value: '150ms' },
    normal: { value: '250ms' },
    slow: { value: '350ms' },
    slower: { value: '500ms' }
  }
})
```

## Semantic Tokens

Create: `src/styles/semanticTokens.ts`

### Purpose

Semantic tokens provide:
- Theme-aware values (light/dark mode)
- Intent-based naming (success, error, warning)
- Contextual meaning (background, foreground, border)
- Easier token updates without touching components

### Pattern: Theme-Aware Colors

```typescript
import { defineSemanticTokens } from '@pandacss/dev'

export const semanticTokens = defineSemanticTokens({
  colors: {
    // Background colors
    bg: {
      canvas: {
        value: { base: '{colors.slate.0}', _dark: '{colors.slate.90}' }
      },
      surface: {
        value: { base: '{colors.slate.5}', _dark: '{colors.slate.80}' }
      },
      overlay: {
        value: { base: '{colors.slate.10}', _dark: '{colors.slate.70}' }
      }
    },

    // Foreground/text colors
    fg: {
      default: {
        value: { base: '{colors.slate.90}', _dark: '{colors.slate.10}' }
      },
      muted: {
        value: { base: '{colors.slate.60}', _dark: '{colors.slate.40}' }
      },
      subtle: {
        value: { base: '{colors.slate.50}', _dark: '{colors.slate.50}' }
      }
    },

    // Border colors
    border: {
      default: {
        value: { base: '{colors.slate.20}', _dark: '{colors.slate.70}' }
      },
      muted: {
        value: { base: '{colors.slate.10}', _dark: '{colors.slate.80}' }
      }
    },

    // Intent-based colors
    success: {
      default: {
        value: { base: '{colors.green.40}', _dark: '{colors.green.30}' }
      },
      emphasis: {
        value: { base: '{colors.green.50}', _dark: '{colors.green.40}' }
      },
      muted: {
        value: { base: '{colors.green.10}', _dark: '{colors.green.80}' }
      }
    },

    error: {
      default: {
        value: { base: '{colors.red.40}', _dark: '{colors.red.30}' }
      },
      emphasis: {
        value: { base: '{colors.red.50}', _dark: '{colors.red.40}' }
      },
      muted: {
        value: { base: '{colors.red.10}', _dark: '{colors.red.80}' }
      }
    },

    warning: {
      default: {
        value: { base: '{colors.yellow.40}', _dark: '{colors.yellow.30}' }
      },
      emphasis: {
        value: { base: '{colors.yellow.50}', _dark: '{colors.yellow.40}' }
      },
      muted: {
        value: { base: '{colors.yellow.10}', _dark: '{colors.yellow.80}' }
      }
    },

    // Brand colors
    brand: {
      default: {
        value: { base: '{colors.blue.50}', _dark: '{colors.blue.40}' }
      },
      emphasis: {
        value: { base: '{colors.blue.60}', _dark: '{colors.blue.30}' }
      },
      muted: {
        value: { base: '{colors.blue.10}', _dark: '{colors.blue.80}' }
      }
    }
  }
})
```

### Token Reference Syntax

Reference base tokens using `{category.name.shade}`:

```typescript
value: { base: '{colors.blue.50}', _dark: '{colors.blue.40}' }
//              ^-- Reference to base token
```

**Why**: References enable token changes to cascade through semantic layer.

### Nesting Semantic Tokens

Create hierarchies for better organization:

```typescript
export const semanticTokens = defineSemanticTokens({
  colors: {
    button: {
      primary: {
        bg: {
          value: { base: '{colors.brand.default}', _dark: '{colors.brand.default}' }
        },
        fg: {
          value: { base: '{colors.slate.0}', _dark: '{colors.slate.0}' }
        },
        border: {
          value: { base: '{colors.brand.emphasis}', _dark: '{colors.brand.emphasis}' }
        }
      },
      secondary: {
        bg: {
          value: { base: '{colors.bg.surface}', _dark: '{colors.bg.surface}' }
        },
        fg: {
          value: { base: '{colors.fg.default}', _dark: '{colors.fg.default}' }
        }
      }
    }
  }
})
```

Usage in recipes:

```typescript
bg: 'button.primary.bg',
color: 'button.primary.fg',
borderColor: 'button.primary.border'
```

## Text Styles

**Pattern**: Define complete typography presets:

```typescript
import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  // Display text
  display: {
    lg: {
      value: {
        fontSize: '5xl',
        fontWeight: 'bold',
        lineHeight: 'tight',
        letterSpacing: '-0.02em'
      }
    },
    md: {
      value: {
        fontSize: '4xl',
        fontWeight: 'bold',
        lineHeight: 'tight'
      }
    }
  },

  // Headings
  heading: {
    lg: {
      value: {
        fontSize: '3xl',
        fontWeight: 'semibold',
        lineHeight: 'tight'
      }
    },
    md: {
      value: {
        fontSize: '2xl',
        fontWeight: 'semibold',
        lineHeight: 'snug'
      }
    },
    sm: {
      value: {
        fontSize: 'xl',
        fontWeight: 'semibold',
        lineHeight: 'snug'
      }
    }
  },

  // Body text
  body: {
    lg: {
      value: {
        fontSize: 'lg',
        fontWeight: 'normal',
        lineHeight: 'normal'
      }
    },
    md: {
      value: {
        fontSize: 'md',
        fontWeight: 'normal',
        lineHeight: 'normal'
      }
    },
    sm: {
      value: {
        fontSize: 'sm',
        fontWeight: 'normal',
        lineHeight: 'normal'
      }
    }
  }
})
```

Usage:

```typescript
// In recipes or components
textStyle: 'heading.lg'
textStyle: 'body.md'
```

## Responsive Token Patterns

### Breakpoint Tokens

Define in config (not as tokens):

```typescript
// In panda.config.ts
export default defineConfig({
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  }
})
```

Usage with responsive object syntax:

```typescript
fontSize: { base: 'sm', md: 'md', lg: 'lg' }
px: { base: '16', md: '20', lg: '24' }
```

### Container Query Tokens

For component-based responsive design:

```typescript
// In panda.config.ts
export default defineConfig({
  theme: {
    extend: {
      containerSizes: {
        sm: '384px',
        md: '448px',
        lg: '512px',
        xl: '576px'
      }
    }
  }
})
```

## Integration with panda.config.ts

Import and extend theme:

```typescript
import { defineConfig } from '@pandacss/dev'
import { tokens } from './src/styles/tokens'
import { semanticTokens } from './src/styles/semanticTokens'
import { textStyles } from './src/styles/textStyles'

export default defineConfig({
  // ... other config ...

  theme: {
    extend: {
      tokens,
      semanticTokens,
      textStyles
    }
  }
})
```

## Best Practices Checklist

Create TodoWrite items when organizing tokens:

- [ ] Separate base tokens from semantic tokens (different files)
- [ ] Use consistent numeric scales (0-100 or 1-90, pick one)
- [ ] Create semantic tokens for all theme-dependent values
- [ ] Use intent-based naming (success, error, warning, not green, red, yellow)
- [ ] Unify spacing and sizing scales
- [ ] Define text styles for common typography patterns
- [ ] Reference base tokens in semantic tokens (don't duplicate values)
- [ ] Document token purpose and usage in comments
- [ ] Test tokens in both light and dark themes
- [ ] Validate strictTokens mode catches hard-coded values

## Common Pitfalls

### Avoid: Duplicating Values

```typescript
// BAD: Duplicates color value
semanticTokens: {
  colors: {
    success: {
      value: { base: '#22C55E', _dark: '#4ADE80' }
    }
  }
}

// GOOD: References base token
semanticTokens: {
  colors: {
    success: {
      value: { base: '{colors.green.40}', _dark: '{colors.green.30}' }
    }
  }
}
```

### Avoid: Too Many Token Layers

Keep it simple: Base → Semantic → Components (2-3 layers max)

```typescript
// BAD: Too many indirection levels
semantic → alias → component → variant → state

// GOOD: Clear, direct references
base → semantic → component
```

### Avoid: Mixing Concerns

```typescript
// BAD: Mixing spacing into colors
tokens: {
  colors: {
    buttonPadding: { value: '12px' }  // Wrong category!
  }
}

// GOOD: Correct categorization
tokens: {
  spacing: {
    buttonPadding: { value: '12' }
  }
}
```

## Accessing Official Panda CSS Docs

For token-specific documentation:

1. **Resolve library ID**: `mcp__MCP_DOCKER__resolve-library-id` with `libraryName: "panda-css"`
2. **Fetch docs**: `mcp__MCP_DOCKER__get-library-docs` with `topic: "tokens"` or `topic: "semantic-tokens"`

## Next Steps

After organizing tokens:

1. **Create recipes**: Use **panda-recipe-patterns** skill to build component styles
2. **Implement components**: Use **panda-component-impl** skill for React components
3. **Validate design system**: Ensure all components use tokens (strictTokens catches violations)

## Reference Files from Best Practices Repo

- Base tokens: `src/styles/tokens.ts`
- Semantic tokens: `src/styles/semanticTokens.ts`
- Config integration: `panda.config.ts`, `cetec-preset.ts`
