# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **Claude Code plugin marketplace** that distributes plugins for modern web development workflows. It follows the Claude Code plugin marketplace specification with a root manifest (`.claude-plugin/marketplace.json`) referencing individual plugin directories.

## Repository Architecture

### Marketplace Structure

```
okshaun-claude-marketplace/               # Root marketplace directory
├── .claude-plugin/
│   └── marketplace.json         # Marketplace manifest (defines available plugins)
├── plugin-name/                 # Each plugin is a directory at root level
│   ├── .claude-plugin/
│   │   └── plugin.json         # Plugin manifest (metadata, skills, agents)
│   ├── skills/                 # Skill markdown files
│   ├── agents/                 # Agent JSON configurations
│   ├── commands/               # Optional slash commands
│   └── README.md
└── README.md                   # Marketplace documentation
```

**Critical architectural rules:**
1. **Marketplace manifest** (`.claude-plugin/marketplace.json` at root) lists all plugins
2. **Plugin manifests** (`.claude-plugin/plugin.json` in each plugin) define plugin components
3. **Plugin.json MUST be in `.claude-plugin/` subdirectory** - not at plugin root
4. **Relative paths in marketplace.json** use `"source": "./plugin-directory"`
5. **All manifests use relative paths** starting with `./`

### Marketplace Distribution

This marketplace is distributed via GitHub:
- Repository: `shaunrfox/okshaun-plugins`
- Users add: `/plugin marketplace add shaunrfox/okshaun-plugins`
- Users install plugins: `/plugin install plugin-name@okshaun-plugins`

## Release Workflow

### Adding a New Plugin

1. Create plugin directory structure:
   ```bash
   mkdir -p new-plugin/.claude-plugin
   mkdir -p new-plugin/skills
   ```

2. Create `new-plugin/.claude-plugin/plugin.json`:
   ```json
   {
     "name": "new-plugin",
     "version": "1.0.0",
     "description": "What it does",
     "author": "Author name",
     "skills": [
       {
         "name": "skill-name",
         "description": "When to use this skill",
         "file": "skills/skill-name.md"
       }
     ]
   }
   ```

3. Add plugin to root `.claude-plugin/marketplace.json`:
   ```json
   {
     "plugins": [
       {
         "name": "new-plugin",
         "source": "./new-plugin",
         "version": "1.0.0",
         "description": "Brief description"
       }
     ]
   }
   ```

4. Create plugin README at `new-plugin/README.md`

### Versioning and Releases

Use **semantic versioning** (major.minor.patch) for both plugins and marketplace:

**For plugin updates:**
1. Update version in `plugin-name/.claude-plugin/plugin.json`
2. Update version in root `.claude-plugin/marketplace.json` entry
3. Commit: `git commit -m "Update plugin-name to v1.1.1"`
4. Tag: `git tag v1.1.1`
5. Push: `git push origin main && git push origin v1.1.1`

**For new plugin additions:**
1. Add plugin directory and manifest
2. Add entry to marketplace.json
3. Commit: `git commit -m "Add new-plugin v1.0.0"`
4. Tag marketplace version: `git tag v2.0.0` (marketplace version, not plugin)
5. Push: `git push origin main && git push origin v2.0.0`

### Testing Changes Locally

Before pushing, test via development marketplace:

1. Install directly from local path:
   ```bash
   /plugin marketplace add /Users/shaunfox/Documents/bigfootcode/claude-marketplace
   /plugin install plugin-name@claude-marketplace
   ```

2. Restart Claude Code to load changes

3. Verify functionality, then uninstall:
   ```bash
   /plugin uninstall plugin-name@claude-marketplace
   ```

## Plugin Component Types

Plugins can contain:

- **Skills** (`skills/*.md`) - Manual invocation for focused tasks, written in markdown with frontmatter
- **Agents** (`agents/*.md`) - Autonomous sub-agents for complex multi-step work
- **Commands** (`commands/*.md`) - Slash commands for quick actions
- **Hooks** (`hooks/*.sh`) - Event-driven scripts (require executable permissions)
- **MCP Servers** (`mcp/*/`) - Model Context Protocol server integrations

## Current Plugins

### panda-css-workflows (v1.0.0)

Expert Panda CSS workflows for React + Vite projects.

**Components:**
- 4 skills: setup-config, token-architecture, recipe-patterns, component-impl
- 1 agent: panda-architect (for complex architectural work)
- Optional MCP integration for live Panda CSS documentation

**Architecture notes:**
- Skills follow checklist-based workflows with TodoWrite integration
- Agent uses Task tool pattern for autonomous execution
- MCP dependency is optional (graceful degradation if unavailable)

## Common Errors to Avoid

1. **Placing plugin.json at plugin root** - Must be in `.claude-plugin/` subdirectory
2. **Hardcoding absolute paths** - Always use relative paths with `./`
3. **Forgetting to update both manifests** - Plugin version must match in both files
4. **Not making hooks executable** - Run `chmod +x hooks/*.sh`
5. **Mixing marketplace.json and plugin.json** - They serve different purposes

## References

- Claude Code plugin spec: https://docs.claude.com/en/docs/claude-code/plugins
- Plugin marketplace spec: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces
- Semantic versioning: https://semver.org
