---
name: panda-setup-config
description: Guide Panda CSS initial setup, configuration, preset architecture, and build integration for new projects
---

# Panda CSS Setup & Configuration

## When to Use This Skill

Use this skill when:
- Starting a new Panda CSS project from scratch
- Integrating Panda CSS into an existing React + Vite project
- Creating a reusable Panda CSS preset for multiple projects
- Configuring build tools and import aliases
- Setting up the foundation for a design system

For complex multi-project architecture or refactoring large codebases, use the **panda-architect** agent instead.

## Prerequisites Check

Before starting, verify:
- [ ] Project uses React 18+ and Vite 4+
- [ ] TypeScript is configured (recommended but not required)
- [ ] You understand the project's design token needs

## Installation Checklist

Create TodoWrite items for each step:

### 1. Install Panda CSS

```bash
npm install -D @pandacss/dev
```

### 2. Initialize Panda CSS

```bash
npx panda init
```

This creates:
- `panda.config.ts` - Main configuration file
- `styled-system/` - Generated CSS and utilities (add to .gitignore)

### 3. Configure panda.config.ts

**Critical Settings:**

```typescript
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // STRICT MODE: Prevents hard-coded values (enforce tokens-only)
  strictTokens: true,
  strictPropertyValues: true,

  // Source files to scan for Panda CSS usage
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}'
  ],

  // Files to ignore
  exclude: [],

  // React integration
  jsxFramework: 'react',
  jsxStyleProps: 'all',  // Enable style props on all components

  // Generated code location
  outdir: 'styled-system',

  // Optional: Namespace your CSS classes
  prefix: 'app',

  // Optional: Custom import path
  importMap: '@styled-system',

  // Theme configuration
  theme: {
    extend: {
      // tokens, recipes, etc. go here
    }
  }
})
```

**Key Decision Points:**

- **strictTokens**: Set to `true` to enforce design system consistency
- **prefix**: Use for avoiding CSS class conflicts (especially in design systems)
- **importMap**: Customize if you want cleaner imports (e.g., `@styled-system` instead of `../styled-system`)

### 4. Add Import Alias (Vite)

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styled-system': path.resolve(__dirname, './styled-system'),
      '~': path.resolve(__dirname, './src')  // Optional: src alias
    }
  }
})
```

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@styled-system/*": ["./styled-system/*"],
      "~/*": ["./src/*"]
    }
  }
}
```

### 5. Add Build Scripts

Update `package.json`:

```json
{
  "scripts": {
    "prepare": "panda codegen",
    "dev": "panda --watch & vite",
    "build": "panda codegen && vite build",
    "lint": "eslint ."
  }
}
```

**Pattern**: Always run `panda codegen` before builds and in watch mode during dev.

### 6. Import Global Styles

In your app entry point (e.g., `src/main.tsx` or `src/App.tsx`):

```typescript
import '@styled-system/styles.css'
```

This imports the generated CSS including:
- CSS reset
- Design tokens as CSS variables
- Utility classes
- Recipe styles

### 7. Add styled-system to .gitignore

```
# Panda CSS generated files
styled-system/
```

**Why**: Generated code should not be committed (similar to node_modules).

## Preset Architecture (For Design Systems)

If you're building a **reusable design system**, create a separate preset file:

### Create a Preset File

**File**: `panda-preset.ts`

```typescript
import { definePreset } from '@pandacss/dev'
import type { Preset } from '@pandacss/types'

const customPreset: Preset = definePreset({
  theme: {
    extend: {
      tokens: {
        // Your design tokens
      },
      semanticTokens: {
        // Theme-aware tokens
      },
      recipes: {
        // Component recipes
      },
      slotRecipes: {
        // Multi-part component recipes
      }
    }
  },
  conditions: {
    // Custom conditions (pseudo-classes, states, etc.)
  },
  patterns: {
    // Custom patterns
  },
  utilities: {
    // Custom utility functions
  }
})

export default customPreset
```

### Use the Preset

In consuming projects' `panda.config.ts`:

```typescript
import { defineConfig } from '@pandacss/dev'
import customPreset from './panda-preset'
// Or: import customPreset from 'your-design-system/preset'

export default defineConfig({
  presets: [
    '@pandacss/preset-base',  // Always include base preset
    customPreset
  ],

  // Project-specific config
  include: ['./src/**/*.{ts,tsx}'],
  strictTokens: true,

  // Optionally override preset values
  theme: {
    extend: {
      // Project-specific tokens
    }
  }
})
```

**Pattern**: Preset provides defaults, consuming projects can extend/override.

## Configuration Best Practices

### 1. Separate Concerns

```
src/
  styles/
    tokens.ts           # Base design tokens
    semanticTokens.ts   # Theme-aware tokens
    conditions.ts       # Custom conditions
    globalStyles.ts     # Global CSS
  recipes/
    index.ts           # Export all recipes
    button.ts          # Individual recipe files
    input.ts
  patterns/
    index.ts           # Custom patterns
```

Import in `panda.config.ts`:

```typescript
import { tokens } from './src/styles/tokens'
import { semanticTokens } from './src/styles/semanticTokens'
import { conditions } from './src/styles/conditions'
import * as recipes from './src/recipes'

export default defineConfig({
  theme: {
    extend: {
      tokens,
      semanticTokens,
      recipes: {
        ...recipes
      }
    }
  },
  conditions
})
```

### 2. Enable Useful Features

```typescript
export default defineConfig({
  // Generate JSDoc comments for better autocomplete
  emitTokensOnly: false,

  // Hash class names in production
  hash: process.env.NODE_ENV === 'production',

  // Minify output
  minify: process.env.NODE_ENV === 'production',

  // Optimize build
  optimize: true,

  // Enable container queries
  containerQueries: true
})
```

### 3. Configure Output Paths for Distribution

If building a **library**:

```typescript
export default defineConfig({
  outdir: 'styled-system',

  // Generate separate token files
  outExtension: 'js',

  // Export as ES modules
  emitPackage: true
})
```

In `package.json`:

```json
{
  "exports": {
    "./preset": "./panda-preset.js",
    "./styles.css": "./styled-system/styles.css"
  },
  "files": [
    "styled-system",
    "panda-preset.js"
  ]
}
```

## Accessing Official Panda CSS Docs

When you need up-to-date information about Panda CSS features, configuration options, or API changes:

### Use MCP Tools (Recommended)

1. **Resolve the library ID:**
   ```
   Use mcp__MCP_DOCKER__resolve-library-id with libraryName: "panda-css"
   ```

2. **Fetch documentation:**
   ```
   Use mcp__MCP_DOCKER__get-library-docs with:
   - context7CompatibleLibraryID: (from step 1)
   - topic: "configuration" | "recipes" | "patterns" | etc.
   ```

### Topics to Search

- "configuration" - Config options, presets
- "tokens" - Design tokens, semantic tokens
- "recipes" - Component recipes, variants
- "patterns" - Built-in and custom patterns
- "conditions" - Responsive, state, pseudo-classes
- "utilities" - Utility functions and utilities

## Troubleshooting

### Issue: "Token not found" errors with strictTokens

**Solution**: Either add the token to your tokens config, or disable strictTokens (not recommended).

```typescript
// Add missing token
tokens: {
  colors: {
    brand: { value: '#FF0000' }
  }
}
```

### Issue: Styles not updating during development

**Solution**: Ensure Panda watch mode is running:

```bash
panda --watch
```

Or update dev script:

```json
"dev": "panda --watch & vite"
```

### Issue: Import errors for @styled-system

**Solution**:
1. Run `npm run prepare` to generate files
2. Verify `tsconfig.json` has correct path mapping
3. Check Vite alias configuration

### Issue: CSS not loading

**Solution**: Ensure you imported styles in app entry:

```typescript
import '@styled-system/styles.css'
```

## Next Steps

After setup is complete:

1. **Design tokens**: Use the **panda-token-architecture** skill to organize your design system
2. **Recipes**: Use the **panda-recipe-patterns** skill to create component styles
3. **Components**: Use the **panda-component-impl** skill to build React components

For complex architectural decisions or refactoring, launch the **panda-architect** agent.

## Reference Files from Best Practices Repo

- Config example: `panda.config.ts`
- Preset example: `cetec-preset.ts`
- Token organization: `src/styles/tokens.ts`, `src/styles/semanticTokens.ts`
- Build integration: `vite.config.ts`, `package.json`
