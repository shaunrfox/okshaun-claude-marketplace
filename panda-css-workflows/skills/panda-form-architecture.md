---
name: panda-form-architecture
description: Design and implement composable form component architectures using atomic design principles with Panda CSS
---

# Panda CSS Form Architecture

## When to Use This Skill

Use this skill when:
- Building a form component system from scratch
- Refactoring existing forms to use composable patterns
- Creating form field wrappers for consistent accessibility and error handling
- Implementing a design system's form components
- Establishing form component hierarchy and composition patterns

For implementing individual form components (buttons, inputs), also reference **panda-component-impl**.
For creating recipes for these components, use **panda-recipe-patterns**.

## Form Component Composability Philosophy

Form components should follow a progressive composition model where simpler components combine into more complex ones. This atomic design approach creates:
- **Reusability**: Foundational components work in multiple contexts
- **Consistency**: Shared primitives ensure visual and behavioral uniformity
- **Flexibility**: Compose components differently for different use cases
- **Maintainability**: Changes to primitives cascade to all consumers

## Three-Layer Architecture

### Layer 1: Atomic Components (Primitives)

The foundational styled elements that map directly to HTML form controls.

**Characteristics:**
- Single responsibility (one HTML element)
- No internal composition
- Accept Panda CSS style props for customization
- Minimal logic (mostly styling)

**Components:**
```typescript
<Box>        // Polymorphic base (any HTML element)
<Button>     // Styled <button> or <a>
<TextInput>  // Styled <input type="text">
<Textarea>   // Styled <textarea>
<CheckBox>   // Styled <input type="checkbox">
<Toggle>     // Styled <input type="checkbox"> for toggle switches
<Radio>      // Styled <input type="radio">
<Text>       // Styled text for labels, help text, errors
<Label>      // Styled <label> element
```

**Example Implementation (Atomic):**

Create: `src/components/TextInput/TextInput.tsx`

```typescript
import { type FC, type InputHTMLAttributes } from 'react'
import { cx } from '@styled-system/css'
import { textInput, type TextInputVariantProps } from '@styled-system/recipes'
import { Box, type BoxProps } from '../Box/Box'
import { splitProps } from '~/utils/splitProps'

export type TextInputProps =
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  BoxProps &
  TextInputVariantProps &
  {
    error?: boolean
  }

export const TextInput: FC<TextInputProps> = ({
  size,
  error = false,
  ...props
}) => {
  const [className, otherProps] = splitProps(props)

  return (
    <Box
      as="input"
      type="text"
      className={cx(textInput({ size }), className)}
      {...(error && { 'data-error': true })}
      aria-invalid={error}
      {...otherProps}
    />
  )
}
```

**Key Points:**
- Simple wrapper around native input
- Applies Panda CSS recipe for styling
- Supports error state via data attribute
- Includes ARIA attribute for accessibility
- Allows style overrides via props

### Layer 2: Molecular Components (Composed Primitives)

Combine atomic components for common patterns. These handle basic composition without complex logic.

**Characteristics:**
- Combine 2-3 atomic components
- Handle common use cases (input + label)
- Still relatively simple
- Improve ergonomics (less boilerplate for consumers)

**Components:**
```typescript
<ToggleInput>    // Toggle + Label
<CheckboxInput>  // CheckBox + Label
<RadioInput>     // Radio + Label
```

**Example Implementation (Molecular):**

Create: `src/components/CheckboxInput/CheckboxInput.tsx`

```typescript
import { type FC, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '@styled-system/css'
import { checkboxInput } from '@styled-system/recipes'
import { CheckBox, type CheckBoxProps } from '../CheckBox/CheckBox'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'

export type CheckboxInputProps =
  Omit<CheckBoxProps, 'label'> &
  {
    label?: ReactNode
    description?: string
  }

export const CheckboxInput: FC<CheckboxInputProps> = ({
  label,
  description,
  size,
  id,
  ...props
}) => {
  // Generate ID if not provided (for label/input association)
  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  const { container, labelText, descriptionText } = checkboxInput({ size })

  return (
    <Box as="label" htmlFor={inputId} className={container}>
      <CheckBox
        id={inputId}
        size={size}
        {...props}
      />

      {label && (
        <Box className={labelText}>
          {label}
        </Box>
      )}

      {description && (
        <Text className={descriptionText} color="gray.60">
          {description}
        </Text>
      )}
    </Box>
  )
}
```

**Pattern Breakdown:**
1. Wraps CheckBox (atomic) with label and description
2. Auto-generates ID for accessibility if not provided
3. Uses slot recipe for layout styling
4. Accepts ReactNode for flexible label content
5. Optional description for additional context

**When to Use Molecular vs Atomic:**
- Use **atomic** when you need maximum flexibility and custom layouts
- Use **molecular** for standard form layouts (label beside/above input)
- Both should be available in your component library

### Layer 3: Organism Components (Complex Wrappers)

Higher-level components that provide structure, accessibility features, and common patterns like error handling.

**Characteristics:**
- Orchestrate multiple components
- Provide consistent patterns (labels, help text, errors)
- Handle accessibility concerns (ARIA attributes, ID linking)
- Accept children for maximum flexibility

**Primary Component: FormField**

`FormField` is a critical wrapper that provides:
- Consistent label/input/error layout
- Automatic accessibility (aria-describedby, aria-invalid)
- Error and help text display
- Required field indication

**Example Implementation (Organism):**

Create: `src/components/FormField/FormField.tsx`

```typescript
import { type FC, type ReactNode, type ReactElement, cloneElement, isValidElement } from 'react'
import { formField } from '@styled-system/recipes'
import { Box } from '../Box/Box'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'

export type FormFieldProps = {
  label: string
  helpText?: string
  errorText?: string
  required?: boolean
  children: ReactNode
  htmlFor?: string
}

export const FormField: FC<FormFieldProps> = ({
  label,
  helpText,
  errorText,
  required = false,
  children,
  htmlFor,
}) => {
  // Generate IDs for accessibility linking
  const fieldId = htmlFor || `field-${Math.random().toString(36).substr(2, 9)}`
  const helpTextId = `${fieldId}-help`
  const errorTextId = `${fieldId}-error`

  const { container, labelSlot, helpTextSlot, errorTextSlot } = formField()

  // Clone children to inject ARIA attributes
  const enhancedChildren = isValidElement(children)
    ? cloneElement(children as ReactElement<any>, {
        id: fieldId,
        'aria-describedby': [
          helpText ? helpTextId : null,
          errorText ? errorTextId : null,
        ]
          .filter(Boolean)
          .join(' ') || undefined,
        'aria-invalid': !!errorText,
        'aria-required': required,
      })
    : children

  return (
    <Box className={container}>
      <Label htmlFor={fieldId} className={labelSlot}>
        {label}
        {required && (
          <Text as="span" color="red.50" aria-label="required">
            {' '}*
          </Text>
        )}
      </Label>

      {helpText && (
        <Text id={helpTextId} className={helpTextSlot} color="gray.60">
          {helpText}
        </Text>
      )}

      {enhancedChildren}

      {errorText && (
        <Text
          id={errorTextId}
          className={errorTextSlot}
          color="red.50"
          role="alert"
        >
          {errorText}
        </Text>
      )}
    </Box>
  )
}
```

**Advanced Pattern Breakdown:**
1. **Auto-generates IDs**: Ensures proper label/input/error association
2. **Clones children**: Injects ARIA attributes into child input
3. **aria-describedby**: Links input to help text and errors
4. **aria-invalid**: Marks input as invalid when error present
5. **aria-required**: Indicates required fields to screen readers
6. **role="alert"**: Announces errors to screen readers immediately

**Accessibility Features:**
- Proper label/input association via `htmlFor` and `id`
- Help text linked via `aria-describedby`
- Error text linked via `aria-describedby` and marked as `role="alert"`
- Required fields indicated both visually (*) and semantically
- Screen reader support through proper ARIA attributes

## Full Form Implementation Example

Here's how all three layers compose into a complete, accessible form:

Create: `src/pages/UserProfileForm.tsx`

```typescript
import { type FC, type FormEvent, useState } from 'react'
import { Box } from '~/components/Box/Box'
import { FormField } from '~/components/FormField/FormField'
import { TextInput } from '~/components/TextInput/TextInput'
import { Textarea } from '~/components/Textarea/Textarea'
import { RadioInput } from '~/components/RadioInput/RadioInput'
import { CheckboxInput } from '~/components/CheckboxInput/CheckboxInput'
import { Button } from '~/components/Button/Button'

export const UserProfileForm: FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const favColors = ['blue', 'red', 'yellow', 'green']

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Form validation logic here
    const formData = new FormData(e.currentTarget)

    // Example validation
    const firstName = formData.get('firstName') as string
    if (!firstName) {
      setErrors({ firstName: 'First name is required' })
      return
    }

    // Submit form...
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap="24"
      maxWidth="600px"
      margin="0 auto"
      p="32"
    >
      <FormField
        label="First name"
        required
        errorText={errors.firstName}
        helpText="Enter your legal first name"
      >
        <TextInput
          name="firstName"
          placeholder="John"
          error={!!errors.firstName}
        />
      </FormField>

      <FormField
        label="Last name"
        required
        errorText={errors.lastName}
      >
        <TextInput
          name="lastName"
          placeholder="Doe"
          error={!!errors.lastName}
        />
      </FormField>

      <FormField
        label="Bio"
        helpText="Tell us about yourself (optional)"
      >
        <Textarea
          name="bio"
          placeholder="I'm a developer who loves..."
          rows={4}
        />
      </FormField>

      <FormField label="Favorite color" required>
        <Box display="flex" flexDirection="column" gap="12">
          {favColors.map((color) => (
            <RadioInput
              key={color}
              name="favoriteColor"
              value={color}
              label={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          ))}
        </Box>
      </FormField>

      <CheckboxInput
        name="newsletter"
        label="Subscribe to newsletter"
        description="Receive updates about new features and releases"
      />

      <CheckboxInput
        name="terms"
        label="I agree to the terms and conditions"
        required
      />

      <Box display="flex" justifyContent="flex-end" gap="12">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Profile
        </Button>
      </Box>
    </Box>
  )
}
```

**Form Pattern Highlights:**
1. **FormField wrapper**: Consistent layout for all fields
2. **Error handling**: Centralized error state, passed to FormField
3. **Help text**: Contextual guidance for users
4. **Required indicators**: Visual and semantic marking
5. **Accessible structure**: Proper labels, ARIA attributes, semantic HTML
6. **Flexible composition**: Mix atomic and molecular components as needed
7. **Layout control**: Panda CSS props for spacing and arrangement

## Recipe Architecture for Form Components

### Atomic Component Recipes

Each atomic component should have its own recipe:

Create: `src/styles/recipes/text-input.recipe.ts`

```typescript
import { defineRecipe } from '@pandacss/dev'

export const textInputRecipe = defineRecipe({
  className: 'textInput',
  description: 'Text input field styles',

  base: {
    width: 'full',
    px: '12',
    py: '8',
    fontSize: 'md',
    fontFamily: 'body',
    borderWidth: '1',
    borderColor: { base: 'gray.30', _dark: 'gray.70' },
    borderRadius: '6',
    bg: { base: 'white', _dark: 'slate.90' },
    color: { base: 'gray.90', _dark: 'gray.10' },
    transition: 'all 0.2s',

    _placeholder: {
      color: { base: 'gray.50', _dark: 'gray.60' },
    },

    _focus: {
      outline: 'none',
      borderColor: { base: 'blue.50', _dark: 'blue.40' },
      boxShadow: '0 0 0 3px token(colors.blue.20)',
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      bg: { base: 'gray.10', _dark: 'gray.80' },
    },

    // Error state
    '&[data-error=true]': {
      borderColor: { base: 'red.50', _dark: 'red.40' },
      _focus: {
        boxShadow: '0 0 0 3px token(colors.red.20)',
      },
    },
  },

  variants: {
    size: {
      sm: {
        px: '8',
        py: '6',
        fontSize: 'sm',
      },
      md: {
        px: '12',
        py: '8',
        fontSize: 'md',
      },
      lg: {
        px: '16',
        py: '12',
        fontSize: 'lg',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
```

**Recipe Best Practices:**
- Use data attributes for custom states (`data-error`)
- Include all interactive states (_focus, _disabled, _hover)
- Support both light and dark themes
- Use semantic token references
- Provide size variants

### Molecular Component Slot Recipes

Molecular components need layout coordination between primitives:

Create: `src/styles/recipes/checkbox-input.recipe.ts`

```typescript
import { defineSlotRecipe } from '@pandacss/dev'

export const checkboxInputRecipe = defineSlotRecipe({
  className: 'checkboxInput',
  description: 'Checkbox with label composition',

  slots: ['container', 'labelText', 'descriptionText'],

  base: {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12',
      cursor: 'pointer',

      _hover: {
        '& input': {
          borderColor: { base: 'blue.40', _dark: 'blue.50' },
        },
      },
    },

    labelText: {
      fontSize: 'md',
      fontWeight: 'medium',
      color: { base: 'gray.90', _dark: 'gray.10' },
      lineHeight: '1.5',
      userSelect: 'none',
    },

    descriptionText: {
      fontSize: 'sm',
      color: { base: 'gray.60', _dark: 'gray.50' },
      mt: '4',
    },
  },

  variants: {
    size: {
      sm: {
        container: { gap: '8' },
        labelText: { fontSize: 'sm' },
        descriptionText: { fontSize: 'xs' },
      },
      md: {
        container: { gap: '12' },
        labelText: { fontSize: 'md' },
        descriptionText: { fontSize: 'sm' },
      },
      lg: {
        container: { gap: '16' },
        labelText: { fontSize: 'lg' },
        descriptionText: { fontSize: 'md' },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
```

**Slot Recipe Pattern:**
- Define all component parts as slots
- Coordinate sizing across slots with variants
- Include hover states that affect children
- Use userSelect: 'none' on labels for better UX

### Organism Component Slot Recipes

FormField needs comprehensive slot management:

Create: `src/styles/recipes/form-field.recipe.ts`

```typescript
import { defineSlotRecipe } from '@pandacss/dev'

export const formFieldRecipe = defineSlotRecipe({
  className: 'formField',
  description: 'Form field wrapper with label, help text, and error text',

  slots: ['container', 'labelSlot', 'helpTextSlot', 'errorTextSlot'],

  base: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8',
      width: 'full',
    },

    labelSlot: {
      fontSize: 'sm',
      fontWeight: 'semibold',
      color: { base: 'gray.90', _dark: 'gray.10' },
      mb: '4',
    },

    helpTextSlot: {
      fontSize: 'sm',
      color: { base: 'gray.60', _dark: 'gray.50' },
      mt: '4',
    },

    errorTextSlot: {
      fontSize: 'sm',
      fontWeight: 'medium',
      color: { base: 'red.60', _dark: 'red.40' },
      mt: '4',

      // Icon support
      display: 'flex',
      alignItems: 'center',
      gap: '6',
    },
  },
})
```

## Best Practices Checklist

When building form architecture, create TodoWrite items for:

- [ ] Create atomic components (TextInput, CheckBox, Radio, etc.)
- [ ] Create recipes for atomic components with all variants
- [ ] Implement molecular compositions (CheckboxInput, RadioInput, etc.)
- [ ] Create slot recipes for molecular components
- [ ] Build FormField organism with accessibility features
- [ ] Create FormField slot recipe
- [ ] Test all components with keyboard navigation
- [ ] Test all components with screen reader
- [ ] Verify ARIA attributes are properly applied
- [ ] Test error states and error announcements
- [ ] Verify required field indicators work
- [ ] Test form submission and validation flow
- [ ] Verify light and dark theme support
- [ ] Test responsive behavior on mobile devices
- [ ] Create Storybook stories for all form components
- [ ] Document composition patterns and usage examples

## Common Pitfalls

### Avoid: Skipping the FormField Wrapper

```typescript
// BAD: Manual label/error handling (inconsistent, inaccessible)
<div>
  <label htmlFor="email">Email</label>
  <TextInput id="email" />
  {error && <span style={{ color: 'red' }}>{error}</span>}
</div>

// GOOD: Use FormField for consistency
<FormField label="Email" errorText={error}>
  <TextInput />
</FormField>
```

**Why**: FormField ensures consistent accessibility, ARIA attributes, and visual design.

### Avoid: Not Linking Help Text and Errors

```typescript
// BAD: Screen readers can't connect help text to input
<Label>First name</Label>
<Text>Enter your legal name</Text>
<TextInput />

// GOOD: FormField automatically links via aria-describedby
<FormField label="First name" helpText="Enter your legal name">
  <TextInput />
</FormField>
```

**Why**: Proper ARIA linking helps screen reader users understand context.

### Avoid: Over-composing Too Early

```typescript
// BAD: Creating rigid mega-components
<MagicFormInput
  label="Email"
  type="email"
  helpText="..."
  errorText="..."
  icon="email"
  suffix="@company.com"
  tooltip="..."
/>

// GOOD: Compose flexibly from primitives
<FormField label="Email" helpText="..." errorText="...">
  <Box display="flex" alignItems="center">
    <Icon name="email" />
    <TextInput type="email" />
    <Text>@company.com</Text>
  </Box>
</FormField>
```

**Why**: Flexible composition beats rigid mega-components. Keep primitives simple, compose as needed.

### Avoid: Inconsistent Error Handling

```typescript
// BAD: Different error patterns across forms
<TextInput className={error ? 'error' : ''} />
<CheckBox style={{ borderColor: error ? 'red' : 'gray' }} />

// GOOD: Consistent error prop
<TextInput error={!!errors.email} />
<CheckBox error={!!errors.terms} />
```

**Why**: Consistent error APIs make forms predictable and maintainable.

## Form Validation Integration

FormField works seamlessly with form libraries:

### React Hook Form Example

```typescript
import { useForm } from 'react-hook-form'

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Email"
        required
        errorText={errors.email?.message}
      >
        <TextInput
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
        />
      </FormField>
    </form>
  )
}
```

### Formik Example

```typescript
import { Formik, Form } from 'formik'

export const ProfileForm = () => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <FormField
            label="Email"
            required
            errorText={touched.email && errors.email}
          >
            <TextInput
              name="email"
              value={values.email}
              onChange={handleChange}
              error={!!(touched.email && errors.email)}
            />
          </FormField>
        </Form>
      )}
    </Formik>
  )
}
```

## Progressive Enhancement

Start simple, add complexity as needed:

**Phase 1: Atomic components only**
```typescript
<Box as="form">
  <Label htmlFor="email">Email</Label>
  <TextInput id="email" name="email" />
  <Button type="submit">Submit</Button>
</Box>
```

**Phase 2: Add molecular compositions**
```typescript
<Box as="form">
  <CheckboxInput name="terms" label="I agree" />
  <Button type="submit">Submit</Button>
</Box>
```

**Phase 3: Add organism wrapper**
```typescript
<Box as="form">
  <FormField label="Email" helpText="...">
    <TextInput name="email" />
  </FormField>
  <Button type="submit">Submit</Button>
</Box>
```

**Phase 4: Full validation and error handling**
```typescript
<Box as="form" onSubmit={handleSubmit}>
  <FormField
    label="Email"
    required
    helpText="We'll never share your email"
    errorText={errors.email}
  >
    <TextInput
      name="email"
      error={!!errors.email}
    />
  </FormField>
  <Button type="submit" loading={isSubmitting}>
    Submit
  </Button>
</Box>
```

## Testing Form Components

### Accessibility Testing

```typescript
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { FormField } from './FormField'
import { TextInput } from '../TextInput/TextInput'

expect.extend(toHaveNoViolations)

test('FormField has no accessibility violations', async () => {
  const { container } = render(
    <FormField label="Email" helpText="Enter your email">
      <TextInput />
    </FormField>
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

test('FormField properly links label and input', () => {
  render(
    <FormField label="Email">
      <TextInput />
    </FormField>
  )

  const input = screen.getByLabelText('Email')
  expect(input).toBeInTheDocument()
})

test('FormField announces errors to screen readers', () => {
  render(
    <FormField label="Email" errorText="Email is required">
      <TextInput />
    </FormField>
  )

  const error = screen.getByRole('alert')
  expect(error).toHaveTextContent('Email is required')

  const input = screen.getByLabelText('Email')
  expect(input).toHaveAttribute('aria-invalid', 'true')
})
```

## Summary

The form architecture follows a clear hierarchy:

**Atomic → Molecular → Organism**

1. **Atomic**: Individual styled form controls (TextInput, CheckBox, Button)
2. **Molecular**: Simple compositions (CheckboxInput = CheckBox + Label)
3. **Organism**: Complex wrappers (FormField = Label + HelpText + Input + ErrorText + ARIA)

**Key Principles:**
- Compose upward, never downward
- Provide both atomic and molecular variants
- Use FormField for consistent accessibility
- Keep primitives simple and flexible
- Test accessibility thoroughly
- Integrate with form libraries as needed

This architecture ensures your forms are accessible, maintainable, and consistent across your application.
