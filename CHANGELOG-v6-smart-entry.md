# Day Flow v6 — Persian smart-entry improvements

- Preserved the current interface and existing task data format.
- Improved local Persian parsing for colloquial phrases and number words for hours (e.g. «فردا ساعت هشت پاشم»).
- Added boundary detection for common routine activities even when the user omits commas and conjunctions.
- Split «بعدش / سپس» into a new task while preserving ordinary noun lists such as «میوه و سبزی بخرم» as one task.
- Kept dates, repeat settings, per-task time extraction, editable preview, and manual-entry fallback.
- Added regression cases for the reported sentence and common unpunctuated morning routines.

Tests: `npm run test:parser` (10 scenarios passed in the local Node test harness).
