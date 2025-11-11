# Panda CSS Workflows Plugin

A comprehensive Claude Code plugin providing expert guidance for building React applications with Panda CSS. Includes specialized skills and an autonomous agent for Panda CSS architecture, tokens, recipes, and component implementation.

## What's Included

### Skills (Manual Invocation)
- **panda-setup-config** - Initial Panda CSS setup, configuration, and build integration
- **panda-token-architecture** - Token system design, semantic tokens, and theme structures
- **panda-recipe-patterns** - Recipe development (regular + slot recipes) and organization
- **panda-component-impl** - React component implementation with Panda CSS

### Agent (Autonomous)
- **panda-architect** - Specialized agent for complex multi-step architectural work

## Installation

### Option 1: Copy Plugin to Project

1. Copy the `panda-css-workflows` directory to your project:
   ```bash
   cp -r panda-css-workflows /path/to/your/project/.claude/plugins/
   ```

2. The plugin will be automatically detected by Claude Code

### Option 2: Install as Git Submodule (Recommended for Multiple Projects)

1. Add as submodule to your `.claude/plugins/` directory:
   ```bash
   cd /path/to/your/project
   git submodule add https://github.com/your-org/panda-css-workflows .claude/plugins/panda-css-workflows
   ```

2. Update in other projects:
   ```bash
   git submodule update --remote
   ```

### Option 3: Symlink (For Development)

1. Clone the plugin repository:
   ```bash
   git clone https://github.com/your-org/panda-css-workflows ~/panda-css-workflows
   ```

2. Symlink to your project:
   ```bash
   ln -s ~/panda-css-workflows /path/to/your/project/.claude/plugins/panda-css-workflows
   ```

## Usage

### Using Skills

Skills provide targeted guidance for specific tasks. Invoke them using the `Skill` tool:

#### Skill: panda-setup-config

**When to use**: Setting up Panda CSS in a new or existing React + Vite project

```
Use the Skill tool with: "panda-css-workflows:panda-setup-config"
```

**What it covers**:
- Installing and initializing Panda CSS
- Configuring panda.config.ts with best practices
- Setting up Vite aliases and TypeScript paths
- Creating preset architecture for design systems
- Build script integration

**Example**:
> "I need to set up Panda CSS in my React + Vite project"

Claude will invoke the panda-setup-config skill and guide you through the setup process with checklists.

#### Skill: panda-token-architecture

**When to use**: Designing or organizing design tokens

```
Use the Skill tool with: "panda-css-workflows:panda-token-architecture"
```

**What it covers**:
- Base tokens vs semantic tokens (two-layer system)
- Color palettes with numeric scales
- Spacing, typography, and design token organization
- Theme-aware semantic tokens for light/dark modes
- Text styles and responsive token patterns

**Example**:
> "Help me design a token system for my design system"

#### Skill: panda-recipe-patterns

**When to use**: Creating component style recipes

```
Use the Skill tool with: "panda-css-workflows:panda-recipe-patterns"
```

**What it covers**:
- Regular recipes for single-part components
- Slot recipes for multi-part components (checkbox, tooltip, menu)
- Variants and compound variants
- When to use recipes vs patterns vs inline CSS
- Recipe organization best practices

**Example**:
> "I want to create a button recipe with variants"

#### Skill: panda-component-impl

**When to use**: Implementing React components with Panda CSS

```
Use the Skill tool with: "panda-css-workflows:panda-component-impl"
```

**What it covers**:
- Box component as polymorphic foundation
- Using recipes in React components
- TypeScript integration with Panda CSS
- Accessibility patterns (ARIA, keyboard, focus)
- Component composition strategies

**Example**:
> "How do I build a React component that uses a Panda CSS recipe?"

### Using the Agent

The **panda-architect** agent handles complex, multi-step architectural work autonomously.

**When to use**:
- Setting up Panda CSS in new projects (full setup)
- Designing comprehensive token systems
- Creating design system presets
- Refactoring existing CSS to Panda CSS
- Making architectural decisions about organization

**How to invoke**:

```
Use the Task tool with:
{
  subagent_type: "panda-architect",
  prompt: "Your detailed task description",
  description: "Short task summary"
}
```

**Example scenarios**:

1. **New Project Setup**:
   ```
   Task: "Set up Panda CSS in this React + Vite project with a complete token system,
   including colors, spacing, typography, and create example button and input recipes
   to validate the setup."
   ```

2. **Token System Design**:
   ```
   Task: "Design a comprehensive token architecture for a design system supporting
   light and dark themes, with base tokens, semantic tokens, and text styles for
   typography presets."
   ```

3. **Refactoring**:
   ```
   Task: "Refactor this styled-components codebase to use Panda CSS. Extract the
   current theme values into Panda tokens, convert styled-components to recipes,
   and update components to use the new system."
   ```

**Agent Features**:
- Creates TodoWrite checklists for systematic work
- Automatically fetches official Panda CSS docs via MCP when needed
- Enforces best practices (strictTokens, accessibility, etc.)
- Validates setup and configuration
- Tests in light and dark themes

### MCP Servers

This plugin can use the Context7 MCP tools to fetch up-to-date official documentation for things like Panda CSS. Skills and agent will automatically use MCP tools when needed and it only uses tokens when invoked.

- Docs are fetched on-demand and typically use 1-5k tokens per fetch
- Toggle with `@context7 off/on` if you want to disable it temporarily

#### Tools

 - `resolve-library-id` to find Panda CSS library
 - `get-library-docs` to fetch relevant documentation

**No manual configuration required** - the plugin handles MCP integration automatically when available.

## Examples

### Example 1: Setting Up a New Project

**User**: "I'm starting a new React + Vite project and want to use Panda CSS with a design system"

**Claude** (using panda-architect agent):
1. Creates TodoWrite checklist for setup
2. Guides installation and initialization
3. Configures panda.config.ts with strictTokens
4. Sets up token structure (colors, spacing, typography)
5. Creates example recipes to validate
6. Sets up build integration
7. Creates a test component to verify everything works

### Example 2: Creating a Token System

**User**: "Help me organize design tokens for my app"

**Claude** (using panda-token-architecture skill):
1. Guides base token organization (colors with 0-100 scale)
2. Shows semantic token layer for theme switching
3. Demonstrates responsive token patterns
4. Provides text styles for typography
5. Validates tokens work with strictTokens mode

### Example 3: Building a Component

**User**: "I want to create a checkbox component with Panda CSS"

**Claude** (using panda-recipe-patterns + panda-component-impl skills):
1. First creates slot recipe for checkbox (container, input, indicator, label)
2. Then implements React component using the recipe
3. Adds accessibility (ARIA, keyboard interaction)
4. Tests in light and dark themes
5. Provides usage examples

## Best Practices Enforced

This plugin ensures you follow Panda CSS best practices:

1. **Tokens First**: strictTokens mode prevents hard-coded values
2. **Two-Layer Tokens**: Base tokens → Semantic tokens for theme switching
3. **Recipe-Based Styling**: Reusable component styles via recipes
4. **Accessibility**: ARIA attributes, keyboard interaction, visible focus
5. **Type Safety**: Generated TypeScript types from recipes
6. **Theme Support**: Light and dark mode built-in from the start
7. **Responsive Design**: Mobile-first breakpoints and container queries

## Skill vs Agent Decision Tree

```
Need help with Panda CSS?
│
├─ Simple, focused task (one skill area)
│  └─ Use appropriate Skill
│     ├─ Setup/config → panda-setup-config
│     ├─ Tokens → panda-token-architecture
│     ├─ Recipes → panda-recipe-patterns
│     └─ Components → panda-component-impl
│
└─ Complex, multi-step task (spans multiple areas)
   └─ Use panda-architect Agent
      ├─ Full project setup
      ├─ Complete token system design
      ├─ Refactoring existing codebase
      └─ Architectural decisions
```

## File Structure Reference

```
panda-css-workflows/
├── plugin.json                      # Plugin metadata
├── README.md                        # This file
├── skills/
│   ├── panda-setup-config.md       # Setup & configuration
│   ├── panda-token-architecture.md # Token design
│   ├── panda-recipe-patterns.md    # Recipe development
│   └── panda-component-impl.md     # Component implementation
└── agents/
    └── panda-architect.md        # Autonomous agent config
```

## Reference Implementation

This plugin is based on best practices from the [Cetec ERP Design System](https://github.com/your-org/cetec-design-system), which demonstrates:
- Production-ready Panda CSS configuration
- Comprehensive token architecture
- Recipe library with regular and slot recipes
- Accessible React component library
- Build and distribution setup

## Contributing

To improve this plugin:

1. Fork the repository
2. Make your changes
3. Test with real projects
4. Submit a pull request

## License

MIT

## Support

For issues or questions:
- File an issue on GitHub
- Check official Panda CSS docs: https://panda-css.com
- Join Panda CSS Discord: https://discord.gg/panda-css

---

**Made for Claude Code** | Built with patterns from production design systems
