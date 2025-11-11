# OKShaun Plugins

A curated collection of Claude Code plugins for modern web development workflows.

## Installation

Add this marketplace to Claude Code:

```bash
/plugin marketplace add shaunrfox/okshaun-claude-marketplace
```

Then install any plugin:

```bash
/plugin install panda-css-workflows@okshaun-plugins
```

Restart Claude Code to activate the plugins.

## Available Plugins

### Panda CSS Workflows

Expert Panda CSS workflows for React + Vite projects, covering:
- Initial setup and configuration
- Token architecture and design systems
- Recipe patterns and component styling
- React component implementation

**Version:** 1.0.0
**Skills:** 4
**Agents:** 1

[Learn more](./panda-css-workflows/README.md)

## Adding New Plugins

To add a new plugin to this marketplace:

1. Create a new directory for your plugin:
   ```bash
   mkdir my-new-plugin
   ```

2. Create the plugin structure:
   ```
   my-new-plugin/
     .claude-plugin/
       plugin.json
     skills/
     README.md
   ```

3. Update `.claude-plugin/marketplace.json` to include your plugin:
   ```json
   {
     "name": "my-new-plugin",
     "source": "./my-new-plugin",
     "version": "1.0.0",
     "description": "Brief description"
   }
   ```

4. Commit and push your changes
5. Version and tag the release

## Plugin Structure

Each plugin should follow this structure:

```
plugin-name/
  .claude-plugin/
    plugin.json          # Required: Plugin manifest
  skills/                # Optional: Skill definitions
    skill-name.md
  commands/              # Optional: Slash commands
    command-name.md
  agents/                # Optional: Agent configurations
    agent-name.md
  hooks/                 # Optional: Hook scripts
    hook-name.sh
  mcp/                   # Optional: MCP server configs
    server-name/
  README.md              # Recommended: Plugin documentation
```

## Contributing

Contributions are welcome! Please:
1. Follow the plugin structure above
2. Include a comprehensive README for each plugin
3. Test your plugin locally before submitting
4. Use semantic versioning

## License

Each plugin may have its own license. Check individual plugin directories for details.
