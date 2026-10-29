# Day Flow v4 — Global compact sizing pass

This pass applies a consistent sizing scale across the existing product instead of only changing the Today view.

## Changes
- Reduced shared padding, vertical spacing, common typography sizes, and border radii across legacy feature sections.
- Resized common panels, headings, buttons, inputs, popovers/modals, undo/top controls, habit rows, and the large boss illustration.
- Tightened the Today task rows and editor while preserving practical touch targets.
- Compact responsive adjustments for mobile and desktop; mobile bottom navigation remains scrollable so labels are not crushed.
- Kept existing feature markup and application logic intact.

## Validation
- `node --check build.js`: passed.
- `npm run test:parser`: passed (3 parser scenarios).
- Full web/APK build and device visual QA: not run in this environment; dependency installation/build needs to be run in the project's normal environment.
