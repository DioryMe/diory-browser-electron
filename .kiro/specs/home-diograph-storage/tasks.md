# Tasks: Home Diograph Storage

## Completed

- [x] 1. Create `electron/lib/getHomeDiograph.js` + spec
- [x] 2. Create `electron/lib/saveHomeDiograph.js`
- [x] 3. Update `electron/preload.js` — wire new channel handlers
- [x] 4. Update `src/shared/constants.js` — rename channels
- [x] 5. Update `homeActionTypes.js` — rename action types
- [x] 6. Update `homeReducer.js` — store diograph, use new action types
- [x] 7. Update `homeActions.js` — getHomeAddress uses channel, addHomeFolder added
- [x] 8. Update `useGetHomeEffect.js` — guard on diograph
- [x] 9. Update `Home.js` — read from state.home.diograph
- [x] 10. Delete old electron lib files
- [x] 11. Add default diograph fallback in `homeActions.js` (frontend) — `DEFAULT_HOME_DIOGRAPH` used when the channel returns `{ diograph: undefined }`. Placeholder `diory` entry has **only `text`** (no `image` — background image is now handled generically by `HomeView` rendering `<BackgroundDiory diory={story}/>`, same pattern as `DiographView`/`TimelineView`; it just renders nothing when there's no image).
  - Req: FR-2, FR-6
- [x] 12. Renamed `getHomeAddress` → `getHomeDiograph` in `homeActions.js` and `useGetHomeEffect.js`
  - Req: consistency with channel/action type naming
- [x] 13. `homeActions.js`'s connect-folder action ended up named `addHomeDiory` (not `saveHomeDiograph` as originally planned) — see task 14 note for why.
  - Req: consistency with channel/action type naming
- [x] 14. Updated `Home.js` onStoryClick and added `addHomeDiory(address)` in `homeActions.js`.
  - `onStoryClick`: if `diory.key === diory.id` (no alias resolved — see below) → run `addHomeDiory`; else navigate via `setDiographAddress(diory.key, true)`.
  - `addHomeDiory(address)`: `generateDiograph(address, '/', { saveDiograph: true })` (persists the picked folder's own `diograph.json` to disk — this **must** be `true`, not the `{ saveDiograph: false }` used for transient in-memory generation elsewhere, since the picked folder becomes a real, independently-navigable location) → pull the generated root's `text`/`image`/`links` (`getDiory({id:'/'})`) → merge into home's existing `diory` entry via `.update(...)` → `addDiory({id:'diory'}, address)` to create an **alias entry** keyed by the real address, pointing at `id:'diory'` → `.toObject()` → save.
  - Rejected approaches (kept here so we don't re-derive them): (a) a literal `address`/`temporalHomeAddress` field on the diory — not a real `Diory` schema field, `propIsValid` in `@diograph/diograph`'s validators silently drops anything outside text/image/latlng/date/data/links/created/modified, and worse, it doesn't survive `addHomeFolder`'s later `.toObject()` calls (data loss). (b) a sibling `state.home.temporalHomeAddress` / separate settingsStore field — unnecessary, since the diograph's own alias-key mechanism (`getDiory.js` resolving `key !== id`) already solves "give me the real address for this diory," and it's the same mechanism `addHomeFolder` already uses for linked folders — no new field or storage shape needed anywhere.
  - Req: FR-4, FR-7
- [x] 15. Deleted `Welcome.js` — `HomeView` already renders the story diory full-bleed with a click handler, so the placeholder state (`diory.key === diory.id`, i.e. no alias yet) is handled by `Home`/`HomeView` alone. No more double-render of `Welcome` + `Home` on first run.
  - Req: architecture simplification
- [x] 16. Simplified `Root.js` — removed `Welcome` import and rendering
  - Req: architecture simplification
- [x] 17. Renamed `useSaveHomeAddress.js` → `utils/useAddHomeDiory.js`, exporting `useAddHomeDiory` (kept as its own hook rather than inlining into `Home.js`, matching the existing `useAddFolderTool.js` precedent of a dedicated hook for a single call site). Dropped two dead imports (`resetStore`, `generateDiograph`) that were unused in the original. Used in `Home.js` for both `onStoryClick`'s no-alias branch and `HomeNavigation`'s `onLogout` prop (which is really "connect/switch home folder", not a real logout — there's no session/auth concept in this app).
  - Req: architecture simplification
- [x] 18. Updated `client.mock.js` — rename mock import to `GET_HOME_DIOGRAPH`
  - Req: consistency
- [x] 19. Renamed `mockResponses/GET_HOME_ADDRESS.json` → `GET_HOME_DIOGRAPH.json` with diograph structure
  - Req: consistency
- [x] 20. Typo `{ id: 'folders '}` — subsumed by the `addHomeDiory` rewrite (task 14), which drops that whole block entirely (it was reaching into the picked folder's own diograph, not home's, and is unnecessary now that `folders` always exists in home's diograph from the default/loaded state).
  - Req: bug fix
- [x] 21. Created `electron/lib/saveHomeDiograph.spec.js`, mirroring `getHomeDiograph.spec.js`'s `settingsStore` mocking pattern
  - Req: test coverage

- [x] 22. End-to-end verification: fresh start → placeholder diory shown → click → select folder → home loads with real content → restart → home reloads from settingsStore with the address alias intact → switch to a different folder via `onLogout` → new folder's content/address is picked up correctly. Manually tested and passing.
  - Req: FR-1 through FR-7
  - Bug found and fixed during this pass: switching home to a different folder left the *old* address's alias entry in place (`Diograph.addDiory` only adds/overwrites, never removes), so `getDiory.js`'s `Object.entries().find()` alias resolution kept returning the old (first-inserted) address instead of the new one — clicking the story after a switch navigated to the stale folder. Fixed in `addHomeDiory` by looking up the previous alias via `getDiory('diory', currentDiograph)` and calling `home.removeDiory({ id: previousStory.key })` before adding the new one.
