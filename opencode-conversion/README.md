# Panda CSS Workflows for OpenCode

Expert Panda CSS workflows for React + Vite projects, converted from Claude Code plugin format to OpenCode.

## What's Included

This package provides comprehensive Panda CSS guidance through:

### Commands (7)
Slash commands for quick access to workflows:
- `/panda-setup` - Setup and configuration
- `/panda-tokens` - Token architecture
- `/panda-recipes` - Recipe patterns
- `/panda-component` - Component implementation
- `/panda-stories` - Storybook integration
- `/panda-forms` - Form architecture
- `/panda-review` - Component review

### Agent (1)
Specialized subagent for complex architectural work:
- `panda-architect` - Handles multi-step Panda CSS projects, refactoring, and design system work

### Instructions (7)
Detailed guidance documents:
- `panda-setup-config` - Configuration and build integration
- `panda-token-architecture` - Token system design
- `panda-recipe-patterns` - Recipe creation patterns
- `panda-component-impl` - Component implementation
- `panda-create-stories` - Storybook documentation
- `panda-form-architecture` - Form component patterns
- `panda-review-component` - Component assessment

## Installation

### Option 1: Global Installation (Recommended)

Copy the entire directory structure to your global OpenCode config:

```bash
# Create the directory if it doesn't exist
mkdir -p ~/.config/opencode

# Copy all files
cp -r opencode-conversion/agent ~/.config/opencode/
cp -r opencode-conversion/command ~/.config/opencode/
cp -r opencode-conversion/instructions ~/.config/opencode/
cp opencode-conversion/opencode.json ~/.config/opencode/panda-workflows.json
```

Then reference the config in your global `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "extends": ["./panda-workflows.json"]
}
```

### Option 2: Project-Specific Installation

Copy to your project's `.opencode` directory:

```bash
# Create project .opencode directory if it doesn't exist
mkdir -p .opencode

# Copy all files
cp -r opencode-conversion/agent .opencode/
cp -r opencode-conversion/command .opencode/
cp -r opencode-conversion/instructions .opencode/
cp opencode-conversion/opencode.json .opencode/
```

## Usage

### Using Commands

In OpenCode, type `/` to see available commands:

```
/panda-setup
```

This will load the setup guidance and help you configure Panda CSS in your project.

### Using the Agent

You can invoke the panda-architect agent in two ways:

1. **@ Mention** (manual invocation):
   ```
   @panda-architect help me set up a complete design system
   ```

2. **Automatic invocation** - The agent will be automatically suggested for complex Panda CSS architectural tasks based on its description.

### Using Instructions

The instruction files are automatically loaded into OpenCode's context via the `opencode.json` configuration. They provide detailed guidance that the AI can reference when helping you with Panda CSS work.

## Directory Structure

```
~/.config/opencode/
├── agent/
│   └── panda-architect.md
├── command/
│   ├── panda-setup.md
│   ├── panda-tokens.md
│   ├── panda-recipes.md
│   ├── panda-component.md
│   ├── panda-stories.md
│   ├── panda-forms.md
│   └── panda-review.md
├── instructions/
│   ├── panda-setup-config.md
│   ├── panda-token-architecture.md
│   ├── panda-recipe-patterns.md
│   ├── panda-component-impl.md
│   ├── panda-create-stories.md
│   ├── panda-form-architecture.md
│   └── panda-review-component.md
└── panda-workflows.json
```

## What Changed from Claude Code?

### Skills → Instructions
- Claude Code "skills" became OpenCode "instructions"
- These are referenced in `opencode.json` instead of a plugin manifest
- Content remains identical - they're still markdown guidance documents

### Agent → Agent
- Nearly 1:1 conversion
- Changed `type: general-purpose` to `mode: subagent`
- Updated model to `anthropic/claude-sonnet-4-20250514`
- Removed `skills` array and replaced references with instruction file guidance

### Commands → Commands
- Minimal changes required
- Commands now reference instruction files instead of invoking skills
- Frontmatter format is compatible between both systems

## Features

### Comprehensive Panda CSS Guidance
- **Setup**: Complete project configuration for React + Vite
- **Tokens**: Two-layer token architecture (base + semantic)
- **Recipes**: Component styling with variants and compound variants
- **Components**: React component implementation with TypeScript
- **Forms**: Atomic design form architecture
- **Storybook**: Component documentation and testing
- **Review**: Systematic component assessment

### Best Practices Built-In
- strictTokens enforcement
- Theme-aware design (light/dark modes)
- Accessibility-first patterns
- TypeScript integration
- Recipe-based styling
- Responsive design patterns

### Example Files Included
The instructions reference working examples from a production codebase for concrete patterns.

## Troubleshooting

### Commands not showing up
Make sure you've either:
1. Copied the `command/` directory to `~/.config/opencode/command/`
2. OR copied to `.opencode/command/` in your project

Restart OpenCode if needed.

### Agent not available
Verify the agent file exists at:
- `~/.config/opencode/agent/panda-architect.md`
- OR `.opencode/agent/panda-architect.md`

Try mentioning it explicitly with `@panda-architect`

### Instructions not loading
Check that `opencode.json` correctly references the instruction files and that the file paths are correct relative to the config file location.

## Credits

Originally created as a Claude Code plugin by Shaun Fox.
Converted to OpenCode format for broader compatibility.

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Original Claude Code plugin: https://github.com/shaunrfox/okshaun-claude-marketplace
- OpenCode documentation: https://opencode.ai/docs
