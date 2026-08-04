# Component Library Documentation

The application utilizes a custom, fully accessible design system composed of modular components written in React 18 and Tailwind CSS v4.

---

## 🧩 Core Component Breakdown

### 1. Navigation Components
- **`Navbar`**: Fixed top header containing live search, notification drawer toggle, dark/light theme switch, and user profile dropdown.
- **`Sidebar`**: Vertical navigation drawer supporting active route highlighting, collapsible state, and mobile responsive overlay.

### 2. Client Management Components
- **`ClientTable`**: High-performance data table offering:
  - Multi-column sorting (Name, Status, MRR, Company).
  - Bulk checkbox selection with batch actions.
  - Multi-format CSV and JSON exports.
  - Paginated row navigation with dynamic page-size adjustments.
- **`StatusBadge`**: Status-indicator pill badge displaying visual variants for `active`, `pending`, `churned`, and `trial`.

### 3. Modal Dialog Subsystem
- **`Modal`**: Base accessible dialog wrapper with backdrop blurring, ESC key closure, and focus trapping.
- **`AddClientModal`**: Controlled form modal for onboarding new client records with real-time validation.
- **`EditClientModal`**: Form modal pre-populated with existing client attributes for updating details.
- **`ClientDetailsModal`**: Detailed view modal displaying client contacts, assigned team lead, MRR breakdown, and activity log timeline.
- **`DeleteConfirmModal`**: Destructive action confirmation dialog with safety warnings.

### 4. Utility & UI Feedback Components
- **`StatsCard`**: Analytics KPI card featuring trend indicators, metric labels, and icon backgrounds.
- **`EmptyState`**: Scalable visual fallback for empty search results, blank tables, or filtered states.
- **`Toast`**: Slide-in notification banner supporting `success`, `error`, and `info` visual tones.
- **`ErrorBoundary`**: Class component catching uncaught JavaScript runtime errors.
