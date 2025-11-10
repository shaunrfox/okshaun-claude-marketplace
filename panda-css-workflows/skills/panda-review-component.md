---
name: panda-review-component
description: Systematically assess an existing component against Panda CSS best practices, create prioritized recommendations, and implement approved changes
---

# Panda CSS Component Review

## When to Use This Skill

Use this skill when:
- Reviewing an existing component for Panda CSS best practices compliance
- Auditing components before production deployment
- Refactoring components to use Panda CSS patterns
- Onboarding legacy components to a Panda CSS design system
- Identifying technical debt in component styling
- Learning from existing implementations to improve other components

**Important**: This skill creates recommendations and presents them for approval BEFORE making any changes.

## Review Process Overview

The review follows a systematic four-phase approach:

1. **Discovery Phase**: Gather component code and context
2. **Assessment Phase**: Evaluate against best practices using comprehensive checklist
3. **Recommendation Phase**: Generate prioritized improvement list with explanations
4. **Implementation Phase**: Execute approved changes (only after user confirmation)

## Phase 1: Discovery - Gather Component Context

### Step 1: Identify Component Files

Create TodoWrite items for discovery:
- [ ] Locate component implementation file(s)
- [ ] Find associated recipe/pattern definitions
- [ ] Check for TypeScript type definitions
- [ ] Identify any test files or stories
- [ ] Review import statements and dependencies

Ask the user:
- Component name or file path
- Is this a standalone component or part of a component library?
- Are there related components that should be reviewed together?

### Step 2: Read Component Code

Use Read tool to examine:
- Component implementation (`.tsx`, `.jsx`)
- Recipe definitions (if separate file)
- Exported types and interfaces
- Related utilities (splitProps, theme context, etc.)

### Step 3: Access Official Panda CSS Documentation

For accurate assessment, reference latest Panda CSS best practices:

```typescript
// 1. Resolve Panda CSS library ID
mcp__MCP_DOCKER__resolve-library-id({ libraryName: "panda-css" })

// 2. Fetch relevant documentation
mcp__MCP_DOCKER__get-library-docs({
  context7CompatibleLibraryID: "/cschroeter/park-ui", // or resolved ID
  topic: "recipes" // or "patterns", "typescript", "styling"
})
```

**Topics to reference**:
- `recipes` - Recipe patterns and slot recipes
- `patterns` - Built-in patterns usage
- `typescript` - Type integration
- `styling` - Style prop patterns

## Phase 2: Assessment - Comprehensive Checklist

Create TodoWrite items for each assessment category:

### Architecture & Structure Assessment
- [ ] **Component file organization**: Is the component in its own directory with proper exports?
- [ ] **Import structure**: Are imports from correct Panda CSS packages?
- [ ] **Base component usage**: Does it use Box as foundation for polymorphic behavior?
- [ ] **Recipe/pattern usage**: Are recipes/patterns properly imported and applied?
- [ ] **File separation**: Are recipes defined in proper location (separate file in `src/recipes/` or inline)?

### TypeScript Integration Assessment
- [ ] **Recipe types**: Are generated variant types imported and used (e.g., `ButtonVariantProps`)?
- [ ] **Prop type composition**: Are types properly composed (BoxProps + VariantProps)?
- [ ] **Prop conflicts**: Are conflicting props properly omitted using `Omit`?
- [ ] **Conditional types**: Are `ConditionalValue` and token types used for responsive/theme-aware props?
- [ ] **Type exports**: Are prop types exported for consuming code?

### Styling Pattern Assessment
- [ ] **Recipe application**: Is the recipe correctly applied with variant props?
- [ ] **Slot recipes**: For multi-part components, are all slots properly destructured and applied?
- [ ] **className merging**: Is `cx()` used to merge recipe + custom classes?
- [ ] **splitProps usage**: Is `splitProps` utility used to separate CSS from HTML props?
- [ ] **Style prop support**: Does component accept Panda CSS style props (bg, px, etc.)?
- [ ] **Theme awareness**: Are colors/tokens using theme-aware values with `_dark` conditions?
- [ ] **No style mixing**: Avoid mixing inline styles, external CSS, and Panda CSS?

### State & Interaction Assessment
- [ ] **Pseudo-states**: Are hover, active, focus states defined in recipe?
- [ ] **Focus visibility**: Is `_focusVisible` used for keyboard navigation?
- [ ] **Disabled state**: Is `_disabled` properly styled and handled?
- [ ] **Loading state**: If applicable, is loading state visually indicated?
- [ ] **Data attributes**: Are custom states using data attributes (e.g., `data-indeterminate`)?
- [ ] **Condition matching**: Do conditions match multiple state selectors (native + custom)?

### Accessibility Assessment
- [ ] **Semantic HTML**: Is the correct HTML element used (button, input, etc.)?
- [ ] **ARIA attributes**: Are proper ARIA attributes included (aria-label, aria-busy, etc.)?
- [ ] **Keyboard interaction**: Can the component be used with keyboard only?
- [ ] **Focus management**: Is focus properly managed in interactive components?
- [ ] **Screen reader support**: Will screen readers announce the component correctly?
- [ ] **Color contrast**: Do color combinations meet WCAG contrast requirements?

### Responsive & Adaptive Assessment
- [ ] **Responsive props**: Are responsive values using object syntax correctly?
- [ ] **Breakpoint usage**: Are breakpoints from theme tokens used consistently?
- [ ] **Container queries**: If needed, are container queries implemented properly?
- [ ] **Mobile-first**: Are base styles mobile-first with progressive enhancement?

### Token & Design System Assessment
- [ ] **Semantic tokens**: Are semantic tokens used instead of primitive values?
- [ ] **Spacing tokens**: Is spacing using token values (not arbitrary px values)?
- [ ] **Color tokens**: Are colors from token system (not hardcoded hex/rgb)?
- [ ] **Typography tokens**: Are font sizes, weights, line heights from tokens?
- [ ] **Animation tokens**: Are transitions using token durations and easings?

### Performance & Best Practices Assessment
- [ ] **Recipe optimization**: Are compound variants used efficiently?
- [ ] **Unnecessary wrapping**: Is there unnecessary Box wrapping?
- [ ] **Conditional rendering**: Is conditional rendering implemented efficiently?
- [ ] **Prop spreading**: Is prop spreading used appropriately (not spreading into recipe)?
- [ ] **Recipe size**: Is recipe definition reasonably sized (not overly complex)?

### Documentation & Developer Experience Assessment
- [ ] **Component exports**: Are component and types properly exported?
- [ ] **Prop documentation**: Are props clear and self-documenting?
- [ ] **Usage examples**: Are there examples or stories showing usage?
- [ ] **Default props**: Are sensible defaults provided?

## Phase 3: Recommendations - Generate Prioritized List

After completing the assessment, generate a structured recommendation report.

### Priority Levels

**P0 (Critical)**: Blocks functionality, security issues, major accessibility violations
- Examples: Missing keyboard support, broken TypeScript types, non-functional styles

**P1 (High)**: Significant best practice violations, maintainability issues
- Examples: Not using recipe types, missing theme awareness, no splitProps usage

**P2 (Medium)**: Optimization opportunities, minor best practice gaps
- Examples: Inefficient compound variants, missing responsive props, token misuse

**P3 (Low)**: Nice-to-haves, polish items, documentation improvements
- Examples: Component documentation, additional variants, example refinements

### Recommendation Format

For each recommendation, provide:

1. **Priority Level**: P0, P1, P2, or P3
2. **Category**: Architecture, TypeScript, Styling, Accessibility, etc.
3. **Issue Description**: What's wrong or missing
4. **Impact**: Why it matters (performance, maintainability, accessibility, etc.)
5. **Solution**: Specific implementation approach
6. **Code Example**: Show before/after if applicable
7. **Effort Estimate**: Small (< 15 min), Medium (15-45 min), Large (> 45 min)

### Example Recommendation

```markdown
**P1 - TypeScript Integration**

**Issue**: Component not using generated recipe variant types

**Impact**:
- TypeScript types can drift out of sync with recipe definition
- No autocomplete for variant values
- Manual maintenance of prop types

**Solution**: Import and use `ButtonVariantProps` from generated recipe types

**Before**:
```typescript
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
}
```

**After**:
```typescript
import { type ButtonVariantProps } from '@styled-system/recipes'

type ButtonProps = BoxProps & ButtonVariantProps & {
  loading?: boolean
}
```

**Effort**: Small (5 minutes)
```

## Phase 4: Present Recommendations for Approval

### Create Summary Report

Before showing recommendations, create a summary:

```markdown
# Component Review: [ComponentName]

## Overview
- **File**: path/to/Component.tsx
- **Type**: [Recipe-based | Pattern-based | Inline CSS]
- **Issues Found**: [Total count]
- **Critical (P0)**: [count]
- **High (P1)**: [count]
- **Medium (P2)**: [count]
- **Low (P3)**: [count]

## Overall Assessment
[Brief 2-3 sentence assessment of component health]

## Strengths
- [What the component does well]
- [Existing best practices being followed]

## Areas for Improvement
[High-level summary of main issues]
```

### Present Recommendations

Display recommendations grouped by priority:

```markdown
## Recommendations

### Critical Priority (P0)
[List P0 items with full detail as shown above]

### High Priority (P1)
[List P1 items with full detail]

### Medium Priority (P2)
[List P2 items with full detail]

### Low Priority (P3)
[List P3 items with full detail]
```

### Request User Approval

After presenting recommendations, explicitly ask:

**"Which recommendations would you like me to implement?"**

Options:
- "All recommendations" - Implement everything
- "Only P0 and P1" - Focus on critical and high priority
- "Let me select specific ones" - User chooses from list
- "None, I just wanted the review" - Stop here

**DO NOT proceed with implementation until user responds.**

## Phase 5: Implementation - Execute Approved Changes

Only after user approval, proceed with changes.

### Create Implementation TodoWrite Items

For each approved recommendation, create a specific todo:

```typescript
TodoWrite({
  todos: [
    { content: "Update Button types to use ButtonVariantProps", status: "pending", activeForm: "Updating Button types to use ButtonVariantProps" },
    { content: "Add splitProps utility to Button component", status: "pending", activeForm: "Adding splitProps utility to Button component" },
    { content: "Implement _focusVisible styles in button recipe", status: "pending", activeForm: "Implementing _focusVisible styles in button recipe" },
    // ... more items
  ]
})
```

### Implementation Guidelines

1. **Make one change at a time**: Mark todo as in_progress, implement, mark completed
2. **Test after each change**: Verify component still works
3. **Group related changes**: When multiple changes affect same code block, batch them
4. **Preserve functionality**: Don't change behavior, only improve implementation
5. **Follow existing patterns**: Match the code style and patterns in the codebase

### Post-Implementation Verification

After implementing changes, create verification todos:

- [ ] Component renders correctly
- [ ] All variants still work
- [ ] TypeScript types are correct
- [ ] No console errors or warnings
- [ ] Accessibility features work
- [ ] Responsive behavior intact

## Using This Skill - Quick Reference

### Typical Workflow

```bash
# User requests review
"Review the Button component for best practices"

# 1. Discovery
- Read component file(s)
- Identify recipe/pattern usage
- Note dependencies and utilities

# 2. Assessment
- Create TodoWrite items for each assessment category
- Systematically check each item
- Reference Panda CSS docs via MCP as needed
- Document findings

# 3. Generate Recommendations
- Prioritize issues (P0 > P1 > P2 > P3)
- Format each recommendation with detail
- Estimate effort for each

# 4. Present for Approval
- Show summary report
- Display recommendations by priority
- Ask user which to implement
- WAIT for response

# 5. Implement (only after approval)
- Create implementation todos
- Execute changes one by one
- Verify after each change
- Mark todos complete
```

## Accessing Official Panda CSS Documentation

Throughout the review process, reference official docs for accuracy:

### Recipe Patterns
```typescript
mcp__MCP_DOCKER__get-library-docs({
  context7CompatibleLibraryID: "/cschroeter/park-ui",
  topic: "recipes"
})
```

### TypeScript Integration
```typescript
mcp__MCP_DOCKER__get-library-docs({
  context7CompatibleLibraryID: "/cschroeter/park-ui",
  topic: "typescript"
})
```

### Styling Best Practices
```typescript
mcp__MCP_DOCKER__get-library-docs({
  context7CompatibleLibraryID: "/cschroeter/park-ui",
  topic: "styling"
})
```

## Common Review Findings

### Most Common Issues (seen in practice)

1. **Not using generated recipe types** (P1)
   - Fix: Import and use `*VariantProps` types

2. **Missing splitProps utility** (P1)
   - Fix: Add splitProps to separate CSS from HTML props

3. **No _focusVisible styles** (P0 for interactive components)
   - Fix: Add focus styles in recipe

4. **Hardcoded colors instead of tokens** (P2)
   - Fix: Replace with semantic token references

5. **Missing ARIA attributes** (P0 for complex components)
   - Fix: Add appropriate aria-* attributes

6. **Not using Box as foundation** (P1)
   - Fix: Refactor to use Box with `as` prop

7. **Mixing CSS approaches** (P1)
   - Fix: Remove inline styles and external CSS, use only Panda

8. **No theme awareness (_dark conditions)** (P2)
   - Fix: Add _dark variants for all colors

## Best Practices for Conducting Reviews

### DO:
- Be thorough but not pedantic
- Prioritize issues that impact users (accessibility, functionality)
- Provide clear, actionable recommendations
- Show code examples for complex changes
- Reference official docs for validation
- Acknowledge what's already done well
- Estimate effort realistically
- Wait for user approval before changing code

### DON'T:
- Make changes without approval
- Recommend changes without explaining why
- Suggest subjective style preferences as "best practices"
- Overwhelm with low-priority nitpicks
- Skip the assessment checklist
- Forget to create TodoWrite items for tracking
- Implement everything as one large change
- Sacrifice readability for minor optimizations

## Example Review Session

### User Request
```
"Review my Button component at src/components/Button/Button.tsx"
```

### Your Response
```
I'll systematically review your Button component against Panda CSS best practices. Let me start by reading the component and gathering context.

[Use Read tool to examine component]
[Create discovery TodoWrite items]
[Read recipe if separate]
[Access Panda CSS docs for recipe patterns]

[Complete assessment checklist with TodoWrite items]
[Document findings in each category]

# Component Review: Button

## Overview
- **File**: src/components/Button/Button.tsx
- **Type**: Recipe-based component
- **Issues Found**: 5
- **Critical (P0)**: 1
- **High (P1)**: 2
- **Medium (P2)**: 2
- **Low (P3)**: 0

## Overall Assessment
The Button component follows basic Panda CSS patterns but has several opportunities for improvement, particularly around TypeScript integration and prop handling.

## Strengths
- Uses recipe for variant management
- Implements hover and active states
- Has clear variant names

## Areas for Improvement
- Missing focus visible styles (accessibility concern)
- Not using generated recipe types
- No splitProps utility for prop separation

## Recommendations

### Critical Priority (P0)

**P0 - Accessibility: Missing focus visible styles**
[Full recommendation detail...]

### High Priority (P1)

**P1 - TypeScript: Not using generated recipe types**
[Full recommendation detail...]

**P1 - Architecture: Missing splitProps utility**
[Full recommendation detail...]

[... more recommendations ...]

---

Which recommendations would you like me to implement?
- "All recommendations" - Implement everything
- "Only P0 and P1" - Focus on critical and high priority
- "Let me select specific ones" - Choose from list
- "None, I just wanted the review" - Stop here
```

### After User Approves
```
Great! I'll implement the P0 and P1 recommendations. Let me create a plan:

[Create implementation TodoWrite items]

Now I'll start with the critical accessibility fix...
[Implement changes one by one, marking todos complete]
```

## Integration with Other Skills

This review skill works well with:

- **panda-component-impl**: Reference for proper component patterns
- **panda-recipe-patterns**: Reference for recipe best practices
- **panda-token-architecture**: Reference for token usage
- **panda-setup-config**: Reference for configuration patterns

When recommendations involve significant refactoring, consider suggesting:
- Creating a new component following best practices
- Incremental migration approach
- Using the panda-architect agent for complex architectural changes

## Skill Usage Checklist

When using this skill, ensure you:

- [ ] Create TodoWrite items for discovery phase
- [ ] Read all relevant component files
- [ ] Reference official Panda CSS documentation via MCP
- [ ] Create TodoWrite items for assessment checklist
- [ ] Complete all assessment categories systematically
- [ ] Prioritize findings (P0, P1, P2, P3)
- [ ] Format recommendations with full detail
- [ ] Present summary report before recommendations
- [ ] Explicitly wait for user approval
- [ ] DO NOT implement anything without approval
- [ ] Create implementation TodoWrite items after approval
- [ ] Make changes incrementally
- [ ] Mark todos complete as you go
- [ ] Verify functionality after implementation
