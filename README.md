<div align="center">

# Client Portal & SaaS Analytics Dashboard

**An enterprise-grade client management, MRR tracking, and SaaS analytics dashboard built for professional service agencies and software teams.**

[![React Version](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](./LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg?style=for-the-badge)](#-development--build-commands)

</div>

---

## 📋 Table of Contents

- [📌 Project Overview](#-project-overview)
- [🎯 Business Use Case & Target Audience](#-business-use-case--target-audience)
- [✨ Key Features](#-key-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏛 Architecture Overview](#-architecture-overview)
- [📂 Repository Structure](#-repository-structure)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [💻 Development & Build Commands](#-development--build-commands)
- [🔑 Authentication Flow](#-authentication-flow)
- [🧩 Core Components Breakdown](#-core-components-breakdown)
- [🔐 Environment Variables](#-environment-variables)
- [🖼 Screenshots Placeholder](#-screenshots-placeholder)
- [📱 Responsive Design & Accessibility](#-responsive-design--accessibility)
- [🔥 Future Firebase Integration](#-future-firebase-integration)
- [☁️ Deployment Instructions](#️-deployment-instructions)
- [🔧 Troubleshooting](#-troubleshooting)
- [🔮 Roadmap](#-roadmap)
- [⚠️ Known Limitations](#️-known-limitations)
- [❓ FAQ](#-faq)
- [📄 Documentation Index](#-documentation-index)
- [📜 License](#-license)
- [👤 Author & Acknowledgements](#-author--acknowledgements)

---

## 📌 Project Overview

The **Client Portal & SaaS Analytics Dashboard** is a high-performance web application engineered to streamline client lifecycle management, track monthly recurring revenue (MRR), monitor client health metrics, and visualize agency analytics in real time.

Designed with modern single-page application (SPA) standards, it features multi-attribute filtering, column sorting, batch operations, multi-format exports (CSV and JSON), persistent client-side storage state, dark/light theme toggling, and robust authentication guards.

---

## 🎯 Business Use Case & Target Audience

- **Consulting Agencies**: Track client projects, retainer values, contact leads, and health metrics in one centralized location.
- **SaaS Operations**: Monitor subscriber onboarding, active accounts, MRR streams, churn rates, and growth distributions.
- **Freelancers & Service Providers**: Maintain professional records of active clients, contract roles, and communication feeds.

---

## ✨ Key Features

| Feature Module | Capabilities Description |
| :--- | :--- |
| **Client Lifecycle Management** | Full CRUD operations: Create, View, Edit, and Delete clients with instant UI reactivity and optimistic local persistence. |
| **Data Dense Table Engine** | Multi-column sorting (Name, Status, MRR, Company), paginated navigation, search filtering, and multi-row bulk selection. |
| **Data Portability & Export** | One-click export of filtered or selected records to **CSV** and **JSON** formats. |
| **Analytics & KPIs** | Live metric cards for Total Clients, Active Accounts, Monthly Recurring Revenue (MRR), and Churn Rate. |
| **Visual Breakdown Views** | Status distribution charts, revenue leaderboards, and recent activity timelines. |
| **Authentication System** | Protected routing (`/dashboard`), mock session validation, and persistent token handling. |
| **Theme System** | Smooth Dark and Light mode transitions with system preference detection and local storage persistence. |
| **Error Resiliency** | Custom React `ErrorBoundary` wrapper preventing white-screen crashes and providing graceful reset controls. |

---

## 🛠 Tech Stack

- **Frontend Framework**: React 18 (TypeScript)
- **Bundler & Build Tool**: Vite 6
- **Styling & Design System**: Tailwind CSS v4, Motion (Framer Motion)
- **Iconography**: Lucide React
- **Routing**: React Router v7
- **State Management**: React Context API + Custom Hooks (`useLocalStorage`, `useAuth`, `useTheme`)
- **Type Safety**: Strict TypeScript v5.8 compilation

---

## 🏛 Architecture Overview

The system adheres to a decoupled, client-first architecture separating visual presentation, state providers, and service abstractions:

```
+------------------------------------------------------------------+
|                            React 18 SPA                          |
|                                                                  |
|   [ AuthContext ] -------> [ ThemeContext ] -----> [ ToastContext] |
|          |                        |                       |      |
|          +------------------------+-----------------------+      |
|                                   |                              |
|                       [ DashboardLayout ]                        |
|                                   |                              |
|          +------------------------+------------------------+     |
|          |                        |                        |     |
|   [ ClientTable ]          [ AnalyticsView ]        [ Modal Subsystem ]
|          |                        |                        |     |
|          +------------------------+------------------------+     |
|                                   |                              |
|                          [ useLocalStorage ]                     |
|                                   |                              |
|                         ( Browser Storage )                      |
+------------------------------------------------------------------+
```

*For detailed architectural specifications, read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).*

---

## 📂 Repository Structure

```
.
├── .github/                        # GitHub Actions, Dependabot & Issue Templates
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── question.md
│   ├── workflows/
│   │   └── ci.yml                 # CI Build & Type Check Pipeline
│   ├── dependabot.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                           # Engineering Documentation
│   ├── ARCHITECTURE.md
│   ├── AUTHENTICATION.md
│   ├── COMPONENTS.md
│   ├── CONTRIBUTING_GUIDE.md
│   ├── DEPLOYMENT.md
│   ├── FIREBASE_INTEGRATION.md
│   ├── PROJECT_STRUCTURE.md
│   └── STATE_MANAGEMENT.md
├── src/                            # Source Code
│   ├── components/                 # UI Component Library
│   ├── contexts/                   # React Context Providers
│   ├── hooks/                      # Custom React Hooks
│   ├── layouts/                    # Layout Wrappers
│   ├── pages/                      # Page Routes (Login, Dashboard)
│   ├── services/                   # Service Layer (Auth, Firebase)
│   ├── types/                      # TypeScript Definitions
│   ├── App.tsx                     # Main Router Definition
│   ├── index.css                   # Global Tailwind Stylesheet
│   └── main.tsx                    # React DOM Entry
├── .env.example                    # Environment Variables Template
├── CHANGELOG.md                    # Semantic Release History
├── CODE_OF_CONDUCT.md              # Community Standards
├── CONTRIBUTING.md                 # Contribution Guidelines
├── LICENSE                         # MIT License
├── README.md                       # Main Documentation
├── SECURITY.md                     # Security Vulnerability Policy
├── package.json                    # Dependencies & Manifest
└── vite.config.ts                  # Vite Configuration
```

---

## 🚀 Quick Start & Installation

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/client-portal-saas-dashboard.git
   cd client-portal-saas-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 💻 Development & Build Commands

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Boots local Vite development server on port 3000 |
| `npm run build` | Compiles optimized production bundle in `dist/` |
| `npm run preview` | Previews production build locally |
| `npm run lint` | Runs TypeScript compilation and type checks (`tsc --noEmit`) |

---

## 🔑 Authentication Flow

The application comes pre-configured with a login page (`/login`) for demonstration:

- **Demo Email**: `admin@saasportal.com`
- **Demo Password**: `admin123`

Navigating to protected routes without a valid session automatically triggers a redirect to `/login`. Session state persists securely in `localStorage` across page refreshes.

---

## 🧩 Core Components Breakdown

- **`ClientTable`**: Features sorting, pagination, search filter integration, bulk selection, and CSV/JSON exporter.
- **`Modal` System**: Modular dialogs (`AddClientModal`, `EditClientModal`, `ClientDetailsModal`, `DeleteConfirmModal`).
- **`ErrorBoundary`**: Prevents UI crash cascades by rendering a fallback error state with reload triggers.
- **`StatsCard`**: Renders dynamic metric indicators with status-colored trend icons.

---

## 🔐 Environment Variables

Reference template in `.env.example`:

| Environment Variable | Required | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional | Server-side API key for optional Gemini features |
| `APP_URL` | Optional | Application base URL |

---

## 🖼 Screenshots Placeholder

*(Screenshots ready for portfolio showcase)*

- **Dashboard Dark Mode**: `![Dashboard Overview Dark Mode](./docs/screenshots/dashboard-dark.png)`
- **Client Details Modal**: `![Client Details View](./docs/screenshots/client-details.png)`
- **Analytics Visuals**: `![Analytics Breakdown](./docs/screenshots/analytics-light.png)`

---

## 📱 Responsive Design & Accessibility

- **Mobile First**: Fluid grids and responsive flex layouts adapted for mobile screens, tablets, and ultra-wide desktops.
- **Accessible Inputs**: Form inputs include semantic label associations, touch targets >= 44px, and high-contrast focus rings.
- **WCAG AA Compliant**: Carefully calibrated color contrast ratios across light and dark themes.

---

## 🔥 Future Firebase Integration

The repository includes pre-built abstractions in `src/services/firebase.ts` to allow instant migration to **Firebase Firestore** and **Firebase Authentication**:

1. Populate credentials in `.env`.
2. Connect `useLocalStorage` state updates to Firestore's `onSnapshot()` realtime stream.
3. Switch `src/services/auth.ts` to use Firebase Auth SDK observers.

*See [docs/FIREBASE_INTEGRATION.md](./docs/FIREBASE_INTEGRATION.md) for full setup instructions.*

---

## ☁️ Deployment Instructions

### Vercel / Netlify / Cloud Run

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: `20.x`

*Read [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for step-by-step hosting walkthroughs.*

---

## 🔧 Troubleshooting

### Common Issues & Fixes

- **Port Conflict**: If port 3000 is occupied, update `--port` flag in `package.json`'s `dev` script.
- **TypeScript Errors**: Ensure all required packages are installed by running `npm install`.

---

## 🔮 Roadmap

- [ ] **Realtime Firebase Firestore Sync**: Live multi-user collaboration and instant updates.
- [ ] **Role-Based Access Control (RBAC)**: Custom permissions for Admins, Managers, and Viewers.
- [ ] **Invoicing & Stripe Integration**: Generate and dispatch invoices per client directly from MRR records.

---

## ⚠️ Known Limitations

- **Client Storage Persistence**: Initial client records are seeded into `localStorage`. Clearing browser data resets modifications.

---

## ❓ FAQ

**Q: Can I use this project as a foundation for a commercial SaaS?**  
A: Yes! This repository is licensed under the MIT License and can be adapted for commercial applications.

**Q: Does it support backend databases out of the box?**  
A: By default, it operates on a responsive local state layer, with ready-to-wire Firebase Firestore connectors in `src/services/firebase.ts`.

---

## 📄 Documentation Index

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Component Library](./docs/COMPONENTS.md)
- [Authentication Workflow](./docs/AUTHENTICATION.md)
- [State Management](./docs/STATE_MANAGEMENT.md)
- [Project Structure](./docs/PROJECT_STRUCTURE.md)
- [Firebase Setup](./docs/FIREBASE_INTEGRATION.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guide](./docs/CONTRIBUTING_GUIDE.md)

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.

---

## 👤 Author & Acknowledgements

Developed with precision and engineering craft by the Senior Engineering Lead. Special thanks to the open-source maintainers of React, Tailwind CSS, Vite, and Lucide Icons.

---

<div align="center">

**[⭐ Star this repository on GitHub](https://github.com/your-username/client-portal-saas-dashboard)** if you found it useful!

</div>
