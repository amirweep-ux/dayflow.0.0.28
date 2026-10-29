# Day Flow v15 — functional compact redesign

## Scope
This version replaces existing UI elements rather than adding new navigation destinations.

- Replaced the daily progress bar with a compact SVG progress ring.
- Replaced the "three priorities" card with a compact seven-day completed-task chart.
- Added optional date, time, and category fields behind a collapsed "زمان و دسته‌بندی" disclosure in quick task entry.
- Added category filtering to the existing task list.
- Added category editing while preserving existing tasks; legacy tasks without a category default to "شخصی".
- Kept the existing daily note, backup/import, theme, animated sky, and manual task entry.
- Weekly chart uses completion timestamps recorded locally. Historical completed tasks without `completedAt` cannot be reconstructed and are not counted in earlier days.

## Validation status
- HTML/JS syntax and structural checks are performed during packaging.
- Android APK build and on-device UI/functional tests have not been performed in this environment; run the GitHub Actions workflow and test before replacing the production build.
