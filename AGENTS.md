<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Workflow Rules

- **Auto-commit after every completed task:** Whenever code, config, or content changes are finished and verified (e.g. `npm run lint` / `npm run build` passes), always stage and commit all tracked/intended changes (`git add -A` and `git commit -m "<clear message>"`) before concluding the reply. Never commit secrets or gitignored files (`.env`, `data/payload.db`). Do not push to remote unless explicitly asked.
