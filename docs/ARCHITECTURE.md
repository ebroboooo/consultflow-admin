# Architecture Overview

The **Client Portal & SaaS Analytics Dashboard** is engineered as a modern, decoupled Single Page Application (SPA) designed with a strict client-first architecture, clear separation of concerns, and modular state management.

---

## 🏛 High-Level System Architecture

```
+-----------------------------------------------------------------------+
|                             USER BROWSER                              |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |                         React 18 SPA                            |  |
|  |                                                                 |  |
|  |  +-------------------+  +-------------------+  +-------------+  |  |
|  |  |    AuthContext    |  |   ThemeContext    |  |ToastContext |  |  |
|  |  +---------+---------+  +---------+---------+  +------+------+  |  |
|  |            |                      |                   |         |  |
|  |  +---------v----------------------v-------------------v------+  |  |
|  |  |                     Dashboard Layout                      |  |  |
|  |  |  +---------------+  +---------------+  +---------------+  |  |  |
|  |  |  | Client Table  |  | Analytics View|  | Settings View |  |  |  |
|  |  |  +---------------+  +---------------+  +---------------+  |  |  |
|  |  +-----------------------------------------------------------+  |  |
|  +-----------------------------------------------------------------+  |
|                                  |                                    |
|                      +-----------v-----------+                        |
|                      |  useLocalStorage Hook |                        |
|                      +-----------+-----------+                        |
|                                  |                                    |
|                      +-----------v-----------+                        |
|                      |  Browser Local Storage |                        |
|                      +-----------------------+                        |
+-----------------------------------------------------------------------+
```

---

## 🔑 Architectural Principles

1. **Unidirectional Data Flow**: Data flows predictably down from page and layout providers to presentation components via typed props and custom React context hooks.
2. **Defensive Error Boundaries**: A top-level React `ErrorBoundary` wraps the component tree to prevent catastrophic white-screen crashes and provide graceful fallback controls.
3. **Optimistic Local Storage Sync**: Local data state changes (e.g. client updates, theme preferences) are persisted synchronously to `localStorage` with error handling for quota edge cases.
4. **Decoupled Service Layer**: Mock authentication services (`src/services/auth.ts`) and database handlers (`src/services/firebase.ts`) are structured as independent service interfaces to enable zero-downtime migration to live backends.
