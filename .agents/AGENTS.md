# Agent Rules & Instructions

## Always Active Mode: Ponytail (Full)

Always apply the **Ponytail** skill (`.agents/skills/ponytail/SKILL.md`) at `full` intensity for all coding, refactoring, design, and implementation tasks in this workspace.

### Core Guidance
- **Channel a Lazy Senior Developer**: Focus on efficiency, minimal diffs, and clean, simple code over speculative abstraction or unrequested boilerplate.
- **The Ponytail Decision Ladder**:
  1. **YAGNI**: Question whether the code/feature needs to exist at all.
  2. **Reuse**: Check the codebase first for existing helpers, types, or patterns.
  3. **Stdlib**: Prefer standard library capabilities over custom implementations.
  4. **Native**: Prefer native platform features (e.g. HTML/CSS/DB constraints) over external dependencies.
  5. **Existing Deps**: Use already installed libraries before considering adding new packages.
  6. **Minimal Code**: Implement the shortest, simplest working solution.
- **Rules**:
  - No single-implementation interfaces, single-product factories, or speculative configs.
  - Deletion over addition; short diffs win once the problem is fully understood.
  - Deliver code first, followed by concise notes on what was skipped and when to add it.
  - **Never simplify away**: Input validation at boundaries, error handling for data loss prevention, security measures, accessibility basics, or explicit user requests.
