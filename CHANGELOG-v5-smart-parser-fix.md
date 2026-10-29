# Day Flow v5 — Smart task splitting fix

- Kept the existing UI and compact layout unchanged.
- Improved Persian smart-entry parsing so punctuation-separated activities and action clauses joined with «و» / «بعدش» / «سپس» can become separate task suggestions.
- Preserved the existing local rule-based parser, date/repeat handling, editable preview, and manual entry fallback.
- Added regression checks for multiple activities, dates, times, daily repeats, and noun lists such as «میوه و سبزی بخرم».

Run `npm run test:parser` to run the parser regression tests.
