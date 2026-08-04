# Developer Contribution Guide & Codebase Architecture Details

This guide offers deep technical context for engineers contributing to the codebase.

---

## 🛠 Project Environment Setup

- **Node.js**: v18.0.0 or higher required.
- **Package Manager**: `npm` v9.0.0 or higher.
- **Recommended IDE**: Visual Studio Code with ESLint and Tailwind CSS IntelliSense extensions.

---

## 💅 Styling & Design System Rules

- **Tailwind CSS v4**: Utility classes should be ordered logically (layout -> flexbox/grid -> spacing -> typography -> visual background/border -> hover/focus states).
- **Dark Mode Support**: Ensure dark mode color variants (`dark:bg-slate-800`, `dark:text-white`, `dark:border-slate-700`) are applied to every user interface element.
- **Focus Rings**: Maintain visible focus indicators on interactive buttons and inputs (`focus:ring-2 focus:ring-indigo-500`).

---

## ⚡ Performance Optimization Guidelines

1. **Memoization**: Wrap complex table calculations and filtered lists in `useMemo`.
2. **Callback Stabilization**: Use `useCallback` for event handlers passed down to deeply nested list items.
3. **Bundle Splitting**: Views (`AnalyticsView`, `SettingsView`, `HelpDocsView`) can be lazy-loaded using `React.lazy()` if bundle size grows.
