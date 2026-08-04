# Changelog

All notable changes to the **Client Portal & SaaS Analytics Dashboard** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-08-04

### Added
- **Client Lifecycle Management**: Complete CRUD operations for client accounts, including add, view details, edit, and delete workflows.
- **Analytics Dashboard**: Real-time KPI summaries (Total Clients, Active Accounts, Monthly Recurring Revenue, Churn Rate) and detailed metrics breakdown views.
- **Multi-Format Export Engine**: Instant client-side export capabilities for filtered and selected records to CSV and JSON formats.
- **Advanced Filtering & Search**: Multi-criteria client table searching, status filtering, company categorization, and paginated navigation.
- **Authentication System**: Secure session management via `AuthContext`, mock credentials validation, and protected route wrappers.
- **Dark Mode & Light Mode**: Seamless theme switching with persistent client storage state using `ThemeContext`.
- **Toast Notification Subsystem**: Global notification queue for async user action feedback.
- **Error Handling**: React `ErrorBoundary` wrapper to catch uncaught UI errors gracefully without screen crashing.
- **Enterprise Documentation & CI**: CI workflows with GitHub Actions, Dependabot configuration, issue templates, and comprehensive technical documentation suite under `docs/`.
