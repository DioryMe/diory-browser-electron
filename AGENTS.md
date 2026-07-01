# AGENTS.md

Pointers and conventions for working in this repo. For setup/run instructions and the feature list, see `README.md` — not duplicated here.

## Commands

- `yarn test` — full check: electron specs, prettier, eslint, react specs (this is what CI/pre-commit expects to pass)
- `yarn test-electron` — `electron/**/*.spec.js` only (jest)
- `yarn test-react` — react-scripts test (jest, watch mode by default)
- `yarn eslint` / `yarn prettier` — fix lint/format in place

## Patterns — see these files first, don't reinvent

- **Redux feature module** (actionTypes/actions/reducer/effect hook, one folder per feature): `src/react/features/home/` — canonical for a simple feature; `src/react/features/diograph/` for one with a `utils/` folder. New feature reducers get added to `combineReducers` in `src/react/store/reducer.js`.
- **Electron IPC**: main-process handlers live in `electron/lib/` (one file per operation, e.g. `getHomeDiograph.js`), wired into channels in `electron/preload.js`, with channel name constants in `src/shared/constants.js`. Follow `electron/lib/getHomeDiograph.js` + its `.spec.js` as the reference for a new IPC operation.
- **Tool action** (a toolbar action under `Tools.js`): `src/react/features/tools/actions/addFolder/` — `use<Name>Tool.js` (logic hook) + `buttons.js` (button id/label/icon). Registered manually as an import + JSX entry in `src/react/features/tools/Tools.js` (no auto-discovery).
- **Lens** (a view mode, e.g. map/timeline/graph): `src/react/features/lenses/timeline/` as reference — component + optional `utils/`, registered via `lensesReducer`/`Lenses.js`.
- **Pure components, no direct store access**: both `src/react/components/` (shared) and `features/*/components/` (per-feature) are prop-in, no `useSelector`/`useDispatch`. Store access is confined to `use*` hooks and feature/tool/lens root files (e.g. `Home.js`, `CreateDioryTool.js`, `FolderLens.js`), which pass data down as props.
- **Visual component + Storybook story**, colocated: see `src/react/features/tools/components/TextInput.js` + `TextInput.stories.js`.
- **Cypress-cucumber `.feature` files** are colocated with the tool/lens they test (e.g. `actions/createDiory/createTool.feature`), not centralized; step definitions live in `src/react/utils/cypress/step-definitions` (see `package.json` → `cypress-cucumber-preprocessor`).
- **Client mocking** for react tests: `src/react/client/client.mock.js` + `src/react/client/mockResponses/*.json`.

## Gotchas

- There are two AI-planning doc trees in this repo: `.kiro/specs/` and `aidlc-docs/`. **`.kiro/specs/<feature>/tasks.md` is the authoritative, current tracker for in-flight work.** `aidlc-docs/` is an earlier, stale pass (reverse-engineering + a draft construction plan with duplicated/conflicting content) — treat it as historical, not a source of truth.
- These planning docs are temporal by design: once a `.kiro/specs/<feature>/` task list is fully done and merged, it's fine to let it go stale rather than maintain it — it documents work-in-flight, not the system.
