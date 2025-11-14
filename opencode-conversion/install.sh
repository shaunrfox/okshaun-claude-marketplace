#!/bin/bash

# Panda CSS Workflows for OpenCode - Installation Script
# This script copies the converted files to your global OpenCode configuration

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OPENCODE_DIR="$HOME/.config/opencode"

echo "======================================"
echo "Panda CSS Workflows - OpenCode Setup"
echo "======================================"
echo ""

# Check if OpenCode config directory exists
if [ ! -d "$OPENCODE_DIR" ]; then
    echo "Creating OpenCode config directory..."
    mkdir -p "$OPENCODE_DIR"
fi

# Copy agent
echo "Installing agent..."
mkdir -p "$OPENCODE_DIR/agent"
cp "$SCRIPT_DIR/agent/panda-architect.md" "$OPENCODE_DIR/agent/"

# Copy commands
echo "Installing commands..."
mkdir -p "$OPENCODE_DIR/command"
cp "$SCRIPT_DIR/command/"*.md "$OPENCODE_DIR/command/"

# Copy instructions
echo "Installing instructions..."
mkdir -p "$OPENCODE_DIR/instructions"
cp "$SCRIPT_DIR/instructions/"*.md "$OPENCODE_DIR/instructions/"

# Copy config
echo "Installing configuration..."
cp "$SCRIPT_DIR/opencode.json" "$OPENCODE_DIR/panda-workflows.json"

echo ""
echo "======================================"
echo "Installation Complete!"
echo "======================================"
echo ""
echo "Files installed to: $OPENCODE_DIR"
echo ""
echo "Installed:"
echo "  - 1 agent (panda-architect)"
echo "  - 7 commands (/panda-*)"
echo "  - 7 instruction files"
echo "  - 1 configuration file"
echo ""
echo "Next steps:"
echo "1. Add this to your ~/.config/opencode/opencode.json:"
echo ""
echo '   {'
echo '     "$schema": "https://opencode.ai/config.json",'
echo '     "extends": ["./panda-workflows.json"]'
echo '   }'
echo ""
echo "2. Restart OpenCode"
echo "3. Try typing: /panda-setup"
echo "4. Or mention the agent: @panda-architect"
echo ""
echo "For troubleshooting, see README.md"
echo ""
