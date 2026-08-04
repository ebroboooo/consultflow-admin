# Detailed Project Structure

```
.
├── .github/                        # GitHub Actions, Dependabot & Issue Templates
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── question.md
│   ├── workflows/
│   │   └── ci.yml                 # Automated CI Build & Lint Pipeline
│   ├── dependabot.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                           # Comprehensive Engineering Documentation
│   ├── ARCHITECTURE.md
│   ├── AUTHENTICATION.md
│   ├── COMPONENTS.md
│   ├── CONTRIBUTING_GUIDE.md
│   ├── DEPLOYMENT.md
│   ├── FIREBASE_INTEGRATION.md
│   ├── PROJECT_STRUCTURE.md
│   └── STATE_MANAGEMENT.md
├── src/                            # Application Source Code
│   ├── components/                 # Design System & UI Components
│   │   ├── ActivityCard/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── EmptyState/
│   │   ├── ErrorBoundary/
│   │   ├── Input/
│   │   ├── LoadingSpinner/
│   │   ├── Modal/
│   │   ├── Navbar/
│   │   ├── ProtectedRoute/
│   │   ├── SearchBar/
│   │   ├── Sidebar/
│   │   ├── StatsCard/
│   │   ├── StatusBadge/
│   │   ├── Table/
│   │   ├── Toast/
│   │   └── Views/
│   ├── contexts/                   # React Context Providers
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── ToastContext.tsx
│   ├── hooks/                      # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── useTheme.ts
│   ├── layouts/                    # Layout Containers
│   │   └── DashboardLayout.tsx
│   ├── pages/                      # Page Route Views
│   │   ├── Dashboard/
│   │   └── Login/
│   ├── services/                   # Service Abstraction Layer
│   │   ├── auth.ts
│   │   └── firebase.ts
│   ├── types/                      # Shared TypeScript Type Interfaces
│   │   ├── auth.ts
│   │   └── client.ts
│   ├── App.tsx                     # Main Router Definition
│   ├── index.css                   # Global Tailwind CSS Stylesheet
│   └── main.tsx                    # Entry DOM Mount Point
├── .env.example                    # Environment Variable Template
├── CHANGELOG.md                    # Release Version History
├── CODE_OF_CONDUCT.md              # Community Standards Guidelines
├── CONTRIBUTING.md                 # Contribution Walkthrough
├── LICENSE                         # MIT License
├── README.md                       # Main Repository Overview & Documentation
├── SECURITY.md                     # Vulnerability Reporting Policy
├── package.json                    # Dependencies & NPM Scripts
├── tsconfig.json                   # TypeScript Config
└── vite.config.ts                  # Vite Bundler Config
```
