# Day Flow v16 — compact functional redesign

This is a replacement-oriented update: it reorganizes existing surfaces rather than adding new top-level pages.

## UI and task workflow
- Replaced the daily progress bar with a compact circular progress ring.
- Replaced the three-priorities card with a seven-day completed-task chart, using local completion timestamps.
- Kept the daily note and the existing task-first layout.
- Added collapsed optional task fields for date, time, and category, so the quick-add form remains compact by default.
- Added task filters for status, date range (today/upcoming/all dates), and category in the existing list.
- Added category editing and displays scheduled dates when tasks are not scheduled for today.
- Legacy tasks without a category are treated as personal without rewriting their stored records until edited.
- Existing local backup/import format remains compatible; imports now preserve category and completion timestamp when present.
- Bumped Service Worker cache name to `dayflow-v15` so clients can fetch the updated app shell.

## Important data limitation
The weekly chart counts completed tasks with a stored `completedAt` timestamp. Old completed tasks that predate timestamp tracking cannot be assigned to historical dates and are not fabricated into the chart.

## Validation
- Inline JavaScript syntax checks passed for all five inline scripts.
- HTML parser check found 255 IDs and no duplicate IDs.
- ZIP/package integrity and Android build are not yet validated here. No APK was produced in this step. Run the GitHub Actions workflow and test on a real device before replacing the production build.
