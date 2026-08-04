# State Management Architecture

The state management strategy balances global context providers with local component state to maintain high performance and low latency.

---

## 🌐 Global Context Providers

| Provider | File Location | Responsibility |
| :--- | :--- | :--- |
| `AuthProvider` | `src/contexts/AuthContext.tsx` | Manages authenticated user state, login/logout methods, and session checks. |
| `ThemeProvider` | `src/contexts/ThemeContext.tsx` | Controls global dark/light mode toggle and updates document root class tags. |
| `ToastProvider` | `src/contexts/ToastContext.tsx` | Provides an imperative `showToast(message, type)` trigger and queue for visual alerts. |

---

## 💾 Local Storage Hooks

The `useLocalStorage<T>` hook (`src/hooks/useLocalStorage.ts`) acts as a reactive storage sync mechanism:
- Initialized with initial mock datasets (e.g. initial client roster).
- Safely serializes state updates to `window.localStorage`.
- Listens to cross-tab storage events to maintain state synchronization across multiple browser windows.
