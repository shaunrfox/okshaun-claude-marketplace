---
name: panda-create-stories
description: Create Storybook stories that document and demonstrate Panda CSS components with variants, accessibility testing, and interactive controls
---

# Panda CSS Component Stories

## When to Use This Skill

Use this skill when:
- Creating Storybook documentation for Panda CSS components
- Demonstrating component variants and props
- Building a component library with visual documentation
- Testing component accessibility interactively
- Showcasing responsive behavior and theme switching
- Creating a design system playground
- Onboarding developers to component APIs

This skill assumes you have:
- An existing component (use **panda-component-impl** skill to create one)
- Storybook installed and configured in your project
- Basic understanding of component props and variants

## Storybook Setup Prerequisites

### Quick Storybook Check

Before creating stories, verify Storybook is installed:

```bash
# Check for Storybook dependencies
ls -la .storybook/

# Look for Storybook scripts in package.json
cat package.json | grep storybook
```

### If Storybook Not Installed

Install Storybook with modern defaults:

```bash
npx storybook@latest init
```

**Recommended addons for Panda CSS projects**:
```bash
npm install --save-dev @storybook/addon-a11y @storybook/addon-themes @storybook/test
```

### Storybook Configuration for Panda CSS

Ensure `.storybook/main.ts` includes your Panda CSS output:

```typescript
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',         // Accessibility testing
    '@storybook/addon-themes',       // Theme switching
    '@storybook/addon-interactions', // Interactive testing
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
```

Configure theme switching in `.storybook/preview.tsx`:

```typescript
import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'

// Import Panda CSS output
import '../styled-system/styles.css'

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',          // No class for light (default)
        dark: 'dark',       // Add 'dark' class for dark mode
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
```

## Story File Structure

### File Naming Convention

Stories are **colocated** with components:

```
src/
  components/
    Button/
      Button.tsx          # Component implementation
      Button.stories.tsx  # Stories file
      index.tsx           # Public exports
    CheckBox/
      CheckBox.tsx
      CheckBox.stories.tsx
      index.tsx
```

**Pattern**: `ComponentName.stories.tsx` in same directory as component.

### Basic Story Structure (CSF3 Format)

CSF3 (Component Story Format 3) is the modern, concise format.

Create: `src/components/Button/Button.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

// Meta defines default component configuration
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Default story - most common usage
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
  },
}

// Additional variant stories
export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'medium',
  },
}

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    size: 'medium',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'medium',
  },
}

// Size variants
export const Small: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'large',
  },
}

// State stories
export const Disabled: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    loading: true,
  },
}

// With icons (if component supports)
export const WithLeftIcon: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    leftIcon: '←',
  },
}
```

## Story Creation Process with TodoWrite

When creating stories for a component, use TodoWrite to track systematic coverage:

### Create Story Creation Checklist

```typescript
TodoWrite({
  todos: [
    { content: "Read component file and inspect actual props", status: "pending", activeForm: "Reading component file and inspecting actual props" },
    { content: "Create story file with meta configuration", status: "pending", activeForm: "Creating story file with meta configuration" },
    { content: "Document props with argTypes (only actual component props)", status: "pending", activeForm: "Documenting props with argTypes" },
    { content: "Add Default story showing primary usage", status: "pending", activeForm: "Adding Default story showing primary usage" },
    { content: "Add All States story showing all variants/states together", status: "pending", activeForm: "Adding All States story showing all variants/states together" },
    { content: "Add example stories with 'Ex:' prefix (interactive, patterns)", status: "pending", activeForm: "Adding example stories with 'Ex:' prefix" },
    { content: "Add accessibility stories with 'A11y:' prefix (keyboard, focus)", status: "pending", activeForm: "Adding accessibility stories with 'A11y:' prefix" },
    { content: "Test stories in Storybook UI", status: "pending", activeForm: "Testing stories in Storybook UI" },
  ]
})
```

### CRITICAL: Inspect Component Props First

**Before creating argTypes**, read the component file to understand its actual props:

```typescript
// Read the component file
const componentCode = await Read({ file_path: 'src/components/Button/Button.tsx' })

// Identify the prop type definition
// Example: export type ButtonProps = BoxProps & ButtonVariantProps & { ... }

// Only include props that are:
// 1. Explicitly defined in the component's prop type
// 2. Relevant for user control (not internal implementation details)
// 3. Actually used by the component

// DO NOT include props from base components (like 'as' from Box) unless the component explicitly exposes them
```

## Meta Configuration Patterns

### Basic Meta

```typescript
const meta = {
  title: 'Components/Button',           // Sidebar organization
  component: Button,                    // Component reference
  tags: ['autodocs'],                   // Generate docs automatically
} satisfies Meta<typeof Button>
```

### Meta with Parameters

```typescript
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',                 // Center in canvas
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and states.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>
```

### Meta with ArgTypes (Control Panel)

```typescript
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    onClick: {
      action: 'clicked',                // Log to Actions panel
    },
    disabled: {
      control: 'boolean',
    },
    // Hide props that shouldn't be controlled
    className: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Button>
```

## Story Patterns for Panda CSS Components

### Recommended Story Structure

**Prefer this structure** for better Storybook organization:

1. **Default** - Most common usage (1 story)
2. **All States** - All variants/states shown together (1 story)
3. **Ex: [Pattern Name]** - Example patterns and use cases (multiple stories)
4. **A11y: [Test Name]** - Accessibility testing stories (multiple stories)

**Why this approach?**
- **Reduces clutter**: One "All States" story instead of 6+ individual state stories
- **Better scanning**: Prefixes group related stories together in sidebar
- **Easier comparison**: See all states side-by-side
- **Clearer purpose**: "Ex:" for examples, "A11y:" for accessibility tests

### Pattern 1: All States Story (Preferred)

Show all variant combinations and states in one comprehensive view:

```typescript
export const AllVariants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="20">
      {/* Primary variants */}
      <Box display="flex" gap="12">
        <Button variant="primary" size="small">Small</Button>
        <Button variant="primary" size="medium">Medium</Button>
        <Button variant="primary" size="large">Large</Button>
      </Box>

      {/* Secondary variants */}
      <Box display="flex" gap="12">
        <Button variant="secondary" size="small">Small</Button>
        <Button variant="secondary" size="medium">Medium</Button>
        <Button variant="secondary" size="large">Large</Button>
      </Box>

      {/* Outline variants */}
      <Box display="flex" gap="12">
        <Button variant="outline" size="small">Small</Button>
        <Button variant="outline" size="medium">Medium</Button>
        <Button variant="outline" size="large">Large</Button>
      </Box>

      {/* Ghost variants */}
      <Box display="flex" gap="12">
        <Button variant="ghost" size="small">Small</Button>
        <Button variant="ghost" size="medium">Medium</Button>
        <Button variant="ghost" size="large">Large</Button>
      </Box>
    </Box>
  ),
}
```

### Pattern 2: Example Stories (Use "Ex:" Prefix)

Show interactive patterns and real-world use cases. Use "Ex:" prefix in the story name for better organization:

```typescript
// Note: Story names in sidebar will show as "Ex: Interactive Toggle"
export const ExInteractiveToggle: Story = {
  name: 'Ex: Interactive Toggle',
  render: () => {
    const [isOn, setIsOn] = useState(false)
    return (
      <Button
        variant="primary"
        onClick={() => setIsOn(!isOn)}
        aria-pressed={isOn}
      >
        {isOn ? 'On' : 'Off'}
      </Button>
    )
  },
}

export const ExFormIntegration: Story = {
  name: 'Ex: Form Integration',
  render: () => (
    <form onSubmit={(e) => { e.preventDefault(); alert('Submitted!') }}>
      <Button type="submit" variant="primary">Submit Form</Button>
    </form>
  ),
}

export const ExLoadingSimulation: Story = {
  name: 'Ex: Loading Simulation',
  render: () => {
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }
    return (
      <Button variant="primary" loading={loading} onClick={handleClick}>
        {loading ? 'Loading...' : 'Click to Load'}
      </Button>
    )
  },
}
```

**Why "Ex:" prefix?**
- Groups all example stories together in Storybook sidebar
- Clearly indicates these are usage examples, not baseline states
- Easier to scan and find relevant patterns

### Pattern 3: Theme Comparison

Show light and dark themes side by side:

```typescript
export const ThemeComparison: Story = {
  render: () => (
    <Box display="flex" gap="40">
      {/* Light theme */}
      <Box p="20" bg="white">
        <Box mb="8" fontSize="sm" fontWeight="semibold">Light Theme</Box>
        <Box display="flex" flexDirection="column" gap="12">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </Box>
      </Box>

      {/* Dark theme */}
      <Box className="dark" p="20" bg="slate.90">
        <Box mb="8" fontSize="sm" fontWeight="semibold" color="white">Dark Theme</Box>
        <Box display="flex" flexDirection="column" gap="12">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </Box>
      </Box>
    </Box>
  ),
}
```

### Pattern 4: Responsive Behavior

Show responsive props:

```typescript
export const Responsive: Story = {
  render: () => (
    <Box
      display={{ base: 'block', md: 'flex' }}
      gap={{ md: '12' }}
    >
      <Button
        size={{ base: 'small', md: 'medium', lg: 'large' }}
        variant="primary"
      >
        Responsive Size
      </Button>
      <Button
        width={{ base: 'full', md: 'auto' }}
        variant="secondary"
      >
        Responsive Width
      </Button>
    </Box>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
```

## Accessibility Stories with Play Functions (Use "A11y:" Prefix)

Play functions enable automated accessibility testing. Use "A11y:" prefix for these stories to group them together in the sidebar.

### Basic Click Interaction

```typescript
import { userEvent, within, expect } from '@storybook/test'

export const A11yClickInteraction: Story = {
  name: 'A11y: Click Interaction',
  args: {
    children: 'Click Me',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the button
    const button = canvas.getByRole('button', { name: /click me/i })

    // Click it
    await userEvent.click(button)

    // Verify it's clickable (no errors thrown)
  },
}
```

### Keyboard Navigation Test

```typescript
export const A11yKeyboardNavigation: Story = {
  name: 'A11y: Keyboard Navigation',
  render: () => (
    <Box display="flex" gap="12">
      <Button variant="primary">First</Button>
      <Button variant="primary">Second</Button>
      <Button variant="primary">Third</Button>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const firstButton = canvas.getByRole('button', { name: /first/i })

    // Focus first button
    firstButton.focus()

    // Tab to next button
    await userEvent.tab()

    // Verify second button is focused
    const secondButton = canvas.getByRole('button', { name: /second/i })
    expect(secondButton).toHaveFocus()
  },
}
```

### Form Interaction Test

```typescript
export const A11yFormSubmission: Story = {
  name: 'A11y: Form Submission',
  render: () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Form submitted')
    }

    return (
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="12">
          <input type="text" placeholder="Name" />
          <Button type="submit" variant="primary">Submit</Button>
        </Box>
      </form>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Type in input
    const input = canvas.getByPlaceholderText('Name')
    await userEvent.type(input, 'John Doe')

    // Click submit
    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
  },
}
```

### Accessibility Validation

```typescript
import { expect } from '@storybook/test'

export const A11yAccessibilityCheck: Story = {
  name: 'A11y: Accessibility Check',
  args: {
    children: 'Accessible Button',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')

    // Verify button has accessible name
    expect(button).toHaveAccessibleName()

    // Verify focus visible on keyboard interaction
    button.focus()
    expect(button).toHaveFocus()

    // Verify disabled buttons are not clickable
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
}
```

## Slot Recipe Component Stories

Multi-part components require special story patterns.

### CheckBox Stories Example

Create: `src/components/CheckBox/CheckBox.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { CheckBox } from './CheckBox'

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Accept terms',
  },
}

export const Checked: Story = {
  args: {
    label: 'Checked',
    checked: true,
  },
}

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate',
    indeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Has error',
    error: true,
  },
}

// Show all states together
export const AllStates: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="12">
      <CheckBox label="Unchecked" />
      <CheckBox label="Checked" checked />
      <CheckBox label="Indeterminate" indeterminate />
      <CheckBox label="Disabled" disabled />
      <CheckBox label="Checked Disabled" checked disabled />
      <CheckBox label="Error" error />
    </Box>
  ),
}

// Interactive checkbox group
export const CheckboxGroup: Story = {
  render: () => {
    const [checked, setChecked] = React.useState({
      option1: false,
      option2: true,
      option3: false,
    })

    return (
      <Box display="flex" flexDirection="column" gap="12">
        <CheckBox
          label="Option 1"
          checked={checked.option1}
          onChange={(e) => setChecked({ ...checked, option1: e.target.checked })}
        />
        <CheckBox
          label="Option 2"
          checked={checked.option2}
          onChange={(e) => setChecked({ ...checked, option2: e.target.checked })}
        />
        <CheckBox
          label="Option 3"
          checked={checked.option3}
          onChange={(e) => setChecked({ ...checked, option3: e.target.checked })}
        />
      </Box>
    )
  },
}
```

## ArgTypes Configuration Reference

### Control Types

```typescript
argTypes: {
  // Select dropdown
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'outline'],
  },

  // Radio buttons (for fewer options)
  size: {
    control: 'radio',
    options: ['small', 'medium', 'large'],
  },

  // Text input
  label: {
    control: 'text',
  },

  // Number input with range
  opacity: {
    control: { type: 'range', min: 0, max: 1, step: 0.1 },
  },

  // Boolean checkbox
  disabled: {
    control: 'boolean',
  },

  // Color picker
  backgroundColor: {
    control: 'color',
  },

  // Date picker
  publishDate: {
    control: 'date',
  },

  // Object editor
  config: {
    control: 'object',
  },

  // Action logger (for event handlers)
  onClick: {
    action: 'clicked',
  },

  // Hide from controls
  className: {
    table: { disable: true },
  },
}
```

### ArgType Documentation

```typescript
argTypes: {
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'outline', 'ghost'],
    description: 'The visual style variant of the button',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'primary' },
      category: 'Appearance',
    },
  },
  size: {
    control: 'radio',
    options: ['small', 'medium', 'large'],
    description: 'Controls the size and padding of the button',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'medium' },
      category: 'Appearance',
    },
  },
  disabled: {
    control: 'boolean',
    description: 'Disables the button and prevents interaction',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
      category: 'State',
    },
  },
}
```

## Best Practices Checklist

Create TodoWrite items when creating stories:

- [ ] Read component file and inspect actual props before creating argTypes
- [ ] Story file is colocated with component (same directory)
- [ ] Using CSF3 format (modern, concise)
- [ ] Default story shows most common usage
- [ ] All States story shows all variants/states together (preferred over individual state stories)
- [ ] ArgTypes document only actual component props (not inherited props like 'as' from Box)
- [ ] Example stories use "Ex:" prefix for better sidebar organization
- [ ] Accessibility stories use "A11y:" prefix for better sidebar organization
- [ ] Interactive examples use play functions
- [ ] Accessibility checked with @storybook/addon-a11y
- [ ] Theme switching works (light/dark) if component is theme-aware
- [ ] Responsive behavior demonstrated if applicable
- [ ] Stories follow consistent naming convention
- [ ] Stories don't include implementation details
- [ ] Meta title follows hierarchy (Components/Category/Name)

## Common Story Patterns

### Composition Story

Show how component composes with others:

```typescript
export const ComposedWithIcon: Story = {
  render: () => (
    <Button variant="primary">
      <Icon name="check" size="16" />
      <span>With Icon</span>
    </Button>
  ),
}
```

### Custom Styling Override

Show how to override with Panda CSS props:

```typescript
export const CustomStyling: Story = {
  render: () => (
    <Button
      variant="primary"
      bg="purple.50"        // Override background
      px="40"               // Override padding
      borderRadius="full"   // Override border radius
    >
      Custom Styled
    </Button>
  ),
}
```

### Loading State Simulation

Demonstrate async behavior:

```typescript
export const LoadingSimulation: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false)

    const handleClick = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }

    return (
      <Button
        variant="primary"
        loading={loading}
        onClick={handleClick}
      >
        {loading ? 'Loading...' : 'Click to Load'}
      </Button>
    )
  },
}
```

## Story Organization

### Title Hierarchy

Organize stories in logical groups:

```typescript
// Button variations
title: 'Components/Button'           // Basic components
title: 'Components/Inputs/TextInput' // Nested categories
title: 'Patterns/Forms/LoginForm'    // Pattern examples
title: 'Layouts/Grid'                // Layout components
```

### Parameters for Layout

```typescript
parameters: {
  layout: 'centered',     // Center in canvas (default for small components)
  layout: 'fullscreen',   // Full viewport (for pages/layouts)
  layout: 'padded',       // Add padding around component
}
```

### Tags

```typescript
tags: [
  'autodocs',           // Generate documentation automatically
  'dev',                // Only show in dev environment
  'test',               // Mark as test story
]
```

## Accessing Storybook Documentation

For advanced patterns and latest best practices:

```typescript
// Resolve Storybook library ID
mcp__MCP_DOCKER__resolve-library-id({ libraryName: "storybook" })

// Fetch relevant documentation
mcp__MCP_DOCKER__get-library-docs({
  context7CompatibleLibraryID: "/storybookjs/storybook",
  topic: "writing-stories" // or "args", "play-function", "theming"
})
```

**Topics to reference**:
- `writing-stories` - CSF3 format and story patterns
- `args` - ArgTypes and controls
- `play-function` - Interactive testing
- `theming` - Theme switching and decoration

## Common Pitfalls

### Avoid: Complex Logic in Stories

```typescript
// BAD: Business logic in story
export const BadStory: Story = {
  render: () => {
    const data = fetchDataFromAPI() // Don't fetch real data
    const processed = complexProcessing(data) // Don't do heavy computation
    return <Button>{processed}</Button>
  },
}

// GOOD: Simple, declarative stories
export const GoodStory: Story = {
  args: {
    children: 'Button Text',
    variant: 'primary',
  },
}
```

### Avoid: Testing Implementation Details

```typescript
// BAD: Testing internal state
export const BadTest: Story = {
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('.button-internal-class')
    expect(button.state.isActive).toBe(true) // Don't access internal state
  },
}

// GOOD: Testing user-visible behavior
export const GoodTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
  },
}
```

### Avoid: Not Using ArgTypes

```typescript
// BAD: No controls
const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

// GOOD: Document with argTypes
const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof Button>
```

## Integration with Panda CSS Workflows

This skill works with:

- **panda-component-impl**: Reference component patterns for story examples
- **panda-recipe-patterns**: Use recipe variants in story demonstrations
- **panda-review-component**: Stories help validate component accessibility

## Complete Example: Button Stories

This example demonstrates all the recommended patterns:

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { userEvent, within, expect } from '@storybook/test'
import { Button } from './Button'
import { Box } from '../Box/Box'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Built with Panda CSS recipes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // IMPORTANT: Only include props that are explicitly defined in ButtonProps
    // Do NOT include inherited props like 'as' from BoxProps unless Button explicitly exposes them
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    onClick: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// 1. Default - Most common usage
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

// 2. All States - Show everything together (PREFERRED over individual state stories)
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <Box display="flex" flexDirection="column" gap="20">
      <Box display="flex" gap="12">
        <Button variant="primary" size="small">Small</Button>
        <Button variant="primary" size="medium">Medium</Button>
        <Button variant="primary" size="large">Large</Button>
      </Box>
      <Box display="flex" gap="12">
        <Button variant="secondary" size="small">Small</Button>
        <Button variant="secondary" size="medium">Medium</Button>
        <Button variant="secondary" size="large">Large</Button>
      </Box>
      <Box display="flex" gap="12">
        <Button variant="outline" size="small">Small</Button>
        <Button variant="outline" size="medium">Medium</Button>
        <Button variant="outline" size="large">Large</Button>
      </Box>
      <Box display="flex" gap="12">
        <Button variant="ghost" size="small">Small</Button>
        <Button variant="ghost" size="medium">Medium</Button>
        <Button variant="ghost" size="large">Large</Button>
      </Box>
    </Box>
  ),
}

// 3. Example Stories - Use "Ex:" prefix for patterns and use cases
export const ExInteractiveToggle: Story = {
  name: 'Ex: Interactive Toggle',
  render: () => {
    const [isOn, setIsOn] = useState(false)
    return (
      <Button
        variant="primary"
        onClick={() => setIsOn(!isOn)}
        aria-pressed={isOn}
      >
        {isOn ? 'On' : 'Off'}
      </Button>
    )
  },
}

export const ExLoadingSimulation: Story = {
  name: 'Ex: Loading Simulation',
  render: () => {
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }
    return (
      <Button variant="primary" loading={loading} onClick={handleClick}>
        {loading ? 'Loading...' : 'Click to Load'}
      </Button>
    )
  },
}

export const ExFormIntegration: Story = {
  name: 'Ex: Form Integration',
  render: () => (
    <form onSubmit={(e) => { e.preventDefault(); alert('Submitted!') }}>
      <Box display="flex" flexDirection="column" gap="12">
        <input type="text" placeholder="Name" />
        <Button type="submit" variant="primary">Submit</Button>
      </Box>
    </form>
  ),
}

// 4. Accessibility Stories - Use "A11y:" prefix for accessibility tests
export const A11yAccessibilityCheck: Story = {
  name: 'A11y: Accessibility Check',
  args: {
    children: 'Accessible Button',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    // Verify accessible name
    expect(button).toHaveAccessibleName('Accessible Button')

    // Test keyboard focus
    button.focus()
    expect(button).toHaveFocus()

    // Test click
    await userEvent.click(button)
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
}

export const A11yKeyboardNavigation: Story = {
  name: 'A11y: Keyboard Navigation',
  render: () => (
    <Box display="flex" gap="12">
      <Button variant="primary">First</Button>
      <Button variant="primary">Second</Button>
      <Button variant="primary">Third</Button>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const firstButton = canvas.getByRole('button', { name: /first/i })
    firstButton.focus()

    await userEvent.tab()

    const secondButton = canvas.getByRole('button', { name: /second/i })
    expect(secondButton).toHaveFocus()
  },
}
```

**Story Organization in Storybook Sidebar:**
- Default
- All States
- Ex: Form Integration
- Ex: Interactive Toggle
- Ex: Loading Simulation
- A11y: Accessibility Check
- A11y: Keyboard Navigation

## Skill Usage Summary

When creating stories for a Panda CSS component:

1. **Read component file** - Inspect actual props and types before creating stories
2. **Verify Storybook setup** - Check installation and configuration
3. **Create story file** - Colocate with component: `ComponentName.stories.tsx`
4. **Define meta** - Configure title, component, argTypes (only actual component props)
5. **Create Default story** - Show most common usage
6. **Create All States story** - Show all variants/states together (preferred over individual stories)
7. **Add example stories** - Use "Ex:" prefix for patterns and use cases
8. **Add accessibility stories** - Use "A11y:" prefix for accessibility tests with play functions
9. **Test in Storybook** - Run `npm run storybook` and verify all stories
10. **Use TodoWrite** - Track systematic coverage throughout

**Key Improvements from User Feedback:**
- ✅ Only use appropriate props (inspect component first)
- ✅ Prefer "All States" over individual state stories
- ✅ Use "Ex:" prefix for example/pattern stories
- ✅ Use "A11y:" prefix for accessibility testing stories
- ✅ Better sidebar organization and scanning

Stories provide living documentation and enable visual regression testing. They're essential for component libraries and design systems built with Panda CSS.
