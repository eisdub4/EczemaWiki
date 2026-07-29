---
name: create-merge-request
description: >
  Generate a comprehensive Merge Request (MR) or Pull Request (PR) overview description from current branch diffs and commit history. Use when user says "create merge request", "create MR", "generate MR description", "PR overview", "MR overview", "create pull request", "create PR", or invokes /create-mr or /create-merge-request.
---

Generate a complete, high-signal Merge Request (MR) or Pull Request (PR) overview description based on the diff between the active branch and the target base branch (`main` or `master`).

## Workflow

### 1. Gather Context & Diff

- **Identify Current Branch & Target Base**:
  - Run `git branch --show-current` to get the source branch name.
  - Determine target base branch (default to `main`, `master`, or `origin/main`).
- **Inspect Commit Log & Changes**:
  - `git log origin/main..HEAD --oneline` (or `git log main..HEAD --oneline`).
  - `git diff --stat origin/main..HEAD`.
  - Summarize the exact changes with `git diff origin/main...HEAD`.
- **Detect Linked Issues & Specs**:
  - Check branch name for ticket keys (e.g. `ECW-0000-initial-implementation` -> `ECW-0000`).
  - Check commit messages for references like `#123`, `Closes #45`, or GitLab `!67`.
  - Look for relevant feature specs under `.specify/`, `docs/`, or `specs/`.

### 2. Synthesize MR Overview Structure

Generate a formatted MR description containing:

1. **Title**:
   `<type>(<scope>): <concise, imperative summary>`
   *Types*: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `style`, `build`, `ci`.

2. **Summary / Overview**:
   2–3 concise sentences explaining *what* was implemented/fixed and *why* (business intent or problem solved).

3. **Key Changes**:
   Grouped logically (e.g., Features, Components/Logic, Styling/UI, Configuration, Specs/Docs). Focus on high-level impact rather than restating line-by-line code diffs.

4. **Motivation & Background**:
   Context on why this change is necessary and links to relevant issue(s) or specs (`Closes #X` / `Refs #X`).

5. **Verification & Testing**:
   - Automated tests run and results (`npm test`, `jest`, `vitest`, etc.).
   - Clear manual testing steps to verify the changes work as expected.

6. **Checklist**:
   - [ ] Code follows project standards & conventions
   - [ ] Self-review completed
   - [ ] Automated tests pass
   - [ ] Documentation / specs updated (if required)
   - [ ] No residual debug logs or unintended changes

7. **Visuals / Artifacts** *(if UI changes exist)*:
   - Placeholder or embedded media links for UI changes.

### 3. CLI Command Generation

Provide ready-to-run CLI commands so the user can immediately open the MR/PR:
- **GitLab CLI**: `glab mr create --title "..." --description "..."`
- **GitHub CLI**: `gh pr create --title "..." --body "..."`
- **Web Link**: Note any remote MR creation URL returned by `git push` (e.g., GitHub / GitLab push output link).

## Rules & Constraints

- **Ponytail principle**: High signal-to-noise ratio. Concise explanations over verbose fluff.
- **Why over What**: Code diffs show *what* changed; the MR overview must explain *why*.
- **Never alter git state**: This skill only generates and formats the overview/command. It does not force push, merge, or close branches without explicit user request.
