# Log Analyzer

Turn raw application logs into actionable insight directly in your browser.

## 🌟 Overview

Log Analyzer parses plain-text log files, classifies entries by severity, identifies recurring error patterns, and visualizes temporal trends — all client-side for privacy. Ideal for quick triage, post-incident reviews, and spotting noisy regressions before they escalate.

## 🔍 Key Features

- Local-only parsing (no data leaves the browser)
- Automatic severity detection (FATAL, ERROR, WARN, INFO, DEBUG, TRACE)
- Pattern normalization groups similar errors (numbers, UUIDs, hex, quoted strings masked)
- Frequency table & timeline visualization
- Raw log viewer with filtering by severity & search term
- Dialog drill-down into specific error pattern occurrences

## ✅ Usage Rules & Guidelines

Follow these rules to ensure reliable analysis and responsible use:

1. Accepted formats: plain text `.log`, `.txt` (binary files ignored).
2. Severity tokens recognized case-insensitively: `FATAL`, `CRITICAL`, `ERROR`, `ERR`, `WARN`, `WARNING`, `INFO`, `INFORMATION`, `DEBUG`, `DBG`, `TRACE`.
3. Timestamp formats supported: ISO-8601, `MM/DD/YYYY HH:MM:SS`, `Mon DD, YYYY HH:MM:SS`, and raw epoch (10–13 digits; seconds or milliseconds).
4. Lines without a recognized severity default to `INFO`.
5. Normalization masks numbers, UUIDs, hex addresses, and quoted strings to cluster recurring error shapes.
6. Recommended file size < **5MB** (≈ 50–75k lines) for smooth client performance.
7. Malformed timestamps / exotic formats may not be classified; they will appear with `null` timestamp.
8. Refreshing the page clears all loaded data (ephemeral processing).
9. Redact personal / sensitive data before loading. The tool does not enforce redaction.
10. Do not treat output as forensic-grade; use for exploratory diagnostics.

## 💳 Pricing Model (Conceptual)

The UI demonstrates tiers — billing not implemented in this repository:

- Free: up to 25k lines per session, core visualizations.
- Pro: extended limits, persistent pattern history, export summaries.
- Team: collaboration, custom severity mapping, early feature access.

> Integrating real payments would require adding authentication, persistence, and a billing provider (e.g., Stripe). Currently omitted by design.

## 🚀 Quick Start (Development)

```bash
pnpm install
pnpm dev
```

Then open the local dev URL (typically `http://localhost:5173`) and drag a `.log` file into the analyzer after launching from the landing page.

## 🧪 Tech Stack

- Vite + React + TypeScript
- Tailwind CSS for styling
- Shadcn-style UI components
- Client-side parsing logic in `src/lib/logParser.ts`

## 📁 Core Files

- `src/App.tsx` – App shell and conditional landing/analyzer views
- `src/components/LandingPage.tsx` – Marketing & rules/ pricing content
- `src/lib/logParser.ts` – Parsing, pattern extraction, stats, time-series

## 🔒 Privacy

All operations occur in the browser memory. No network requests are made for file content. Close or refresh the tab to clear state.

## 📈 Future Enhancements (Ideas)

- Persistent workspace (IndexedDB) for multi-session comparisons
- Configurable pattern normalization rules
- Severity remapping UI
- Export to CSV / Markdown / JSON
- Diff mode between two log files

## 📄 License

MIT. See `LICENSE` for details.

---
Feel free to submit ideas or improvements. Enjoy faster log insights! ✨
