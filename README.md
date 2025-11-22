# Log Analyzer

<img width="1307" height="652" alt="image" src="https://github.com/user-attachments/assets/0bc0c971-4834-4399-b1b3-8a58716a326d" />


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

# LogNebula 🌌

**LogNebula** (formerly Log File Analyzer) is a modern, high-performance log analysis tool featuring a stunning "Nebula Glass" aesthetic. It allows developers and system administrators to visualize, filter, and analyze log files with ease.

![LogNebula Dashboard](https://via.placeholder.com/800x450.png?text=LogNebula+Dashboard+Preview)

## ✨ Features

*   **Nebula Glass Design**: A premium dark-mode interface with glassmorphism effects, vibrant gradients, and smooth animations.
*   **Interactive Timeline**: Visualize error and warning trends over time with a dynamic chart.
*   **Smart Pattern Detection**: Automatically groups similar error messages to identify recurring issues.
*   **Powerful Filtering**: Filter logs by severity (ERROR, WARN, INFO, etc.) and search keywords instantly.
*   **Drag & Drop Upload**: Easily analyze local log files with a simple drag-and-drop interface.
*   **Responsive Layout**: Optimized for various screen sizes with a persistent glass header and sidebar.

## 🚀 Getting Started

### Prerequisites

*   **Node.js**: Version 16 or higher.
*   **npm** or **yarn**: Package manager.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/lognebula.git
    cd lognebula
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 🛠️ Tech Stack

*   **Framework**: React + Vite
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Components**: Shadcn UI + Headless UI
*   **Charts**: Recharts
*   **Icons**: Phosphor Icons

## 🎨 Design System

The "Nebula Glass" theme is built using Tailwind CSS with custom configuration:

*   **Colors**: Deep space background (`#0b0b15`), Electric Purple (`#7c3aed`), Cyan (`#06b6d4`).
*   **Effects**: Backdrop blur (`backdrop-blur-xl`), translucent backgrounds (`bg-white/5`), and glowing borders.
*   **Typography**: Inter / Sans-serif for clean readability.

## 📄 License

This project is licensed under the MIT License.

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

## 🚀 Deploy to GitHub Pages

1. Enable GitHub Pages: In your repository settings, set Pages source to GitHub Actions ("Build and deployment" -> Source: GitHub Actions).
2. Workflow File: See `.github/workflows/deploy.yml` added in this repo.
3. Project vs. User Site:
   - If deploying to `https://USERNAME.github.io/REPO_NAME/` (project site) set `GH_PAGES_BASE` to `/REPO_NAME/` in the workflow (already placeholder).
   - If deploying to `https://USERNAME.github.io/` (user/org site) change `GH_PAGES_BASE` to `/`.
4. Replace `REPO_NAME` placeholder in workflow with your actual repository name.
5. Commit & push to `main` (or `master`). Workflow will build and publish `dist`.
6. Access deployed site from the workflow summary or Pages settings once finished.

Local test of production build:

```bash
npm ci
npm run build
npm run preview
```

If you later add client-side routing, ensure `404.html` fallback or configure SPA redirect in Pages.

## 📊 Analytics (Необязательно)

Поддерживаются три провайдера через переменные:

| Провайдер | Переменная | Пример значения |
|-----------|------------|-----------------|
| Plausible | `VITE_PLAUSIBLE_DOMAIN` | `logs.example.com` |
| Google Analytics (gtag) | `VITE_GA_ID` | `G-XXXXXXXXXX` |
| Yandex Metrica | `VITE_YM_ID` | `12345678` |

Приоритет: repository variables → secrets. Если значение отсутствует — скрипт не вставляется.

Локальная проверка (пример только Plausible + GA):

```bash
VITE_PLAUSIBLE_DOMAIN=logs.example.com VITE_GA_ID=G-ABCD1234 npm run dev
```

Компонент `Analytics` добавляет соответствующие `<script>` теги в `<head>` после монтирования.

Статус интеграции отображается в выводе `npm run prod:check`.

## 🧭 404 Fallback

Файл `404.html` добавлен и автоматически перенаправляет на базовый путь репозитория (определяет тип страницы: пользовательский или проект). Это помогает будущей SPA-навигации, даже если будут добавлены маршруты.
