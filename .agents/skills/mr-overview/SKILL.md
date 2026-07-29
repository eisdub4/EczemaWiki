---
name: mr-overview
description: >
  Generate a Merge Request (MR) / Pull Request (PR) overview description for current branch changes. Alias for create-merge-request. Use when user says "mr overview", "pr overview", "create mr overview", or invokes /mr-overview.
---

See [create-merge-request](../create-merge-request/SKILL.md) for full instructions.

## Quick Workflow

1. Inspect branch changes: `git diff origin/main...HEAD` & `git log origin/main..HEAD --oneline`
2. Synthesize structured MR title & overview (Summary, Key Changes, Verification, Checklist)
3. Output ready-to-run `gh pr create` / `glab mr create` commands.
