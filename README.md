# conv-commit-liner

A lightweight conventional commit message generator that analyzes your staged changes and suggests appropriate commit messages.

## Installation

```bash
# Using npm
npm install -g conv-commit-liner

# Using bun
bun install -g conv-commit-liner
```

## Usage

After staging your changes with `git add`, simply run:

```bash
ccl
```

This will analyze your staged changes and suggest an appropriate conventional commit message.

### Options

- `-s, --scope <scope>`: Specify the commit scope
- `-b, --breaking`: Mark as a breaking change
- `-t, --type <type>`: Override the commit type

### Examples

```bash
# Basic usage
ccl

# With scope
ccl -s api

# Breaking change
ccl -b

# Override type
ccl -t feat

# Combine options
ccl -t fix -s auth -b
```

### Commit Types

The tool automatically determines the commit type based on the changed files:

- `test`: Changes to test files
- `docs`: Changes to documentation
- `chore`: Changes to package files
- `ci`: Changes to CI configuration
- `feat`: Default for other changes

## License

MIT
