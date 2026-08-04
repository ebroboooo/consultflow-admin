# Contributing Guidelines

Thank you for your interest in contributing to the **Client Portal & SaaS Analytics Dashboard**! We welcome contributions from developers of all skill levels.

---

## 🚀 Getting Started

1. **Fork the Repository**: Create your own copy of the repository on GitHub.
2. **Clone the Fork**:
   ```bash
<<<<<<< HEAD
   git clone https://github.com/ebramnakash/client-portal-saas-dashboard.git
=======
   git clone https://github.com/your-username/client-portal-saas-dashboard.git
>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
   cd client-portal-saas-dashboard
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

---

## 🛠 Branch Naming Standards

Follow conventional branch naming formats:

- `feature/description` (e.g., `feature/custom-date-filters`)
- `fix/description` (e.g., `fix/export-null-phone-number`)
- `docs/description` (e.g., `docs/update-architecture-diagram`)
- `refactor/description` (e.g., `refactor/table-pagination-hook`)

---

## 📝 Commit Message Style

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat: add PDF export option for client profiles`
- `fix: resolve status badge color mismatch in dark mode`
- `docs: update deployment guidelines for Cloud Run`
- `style: fix padding and focus ring on modal inputs`
- `refactor: optimize table filter memoization`

---

## 💻 Coding Standards

- **Language**: All code must be written in strict **TypeScript**.
- **Styling**: Use utility classes from **Tailwind CSS**. Avoid inline styles and separate `.css` modules.
- **Icons**: Import visual icons solely from `lucide-react`.
- **Components**: Keep components modular, single-responsibility, and typed with explicit props interfaces.
- **Type Checking**: Verify type safety before opening a Pull Request by running:
  ```bash
  npm run lint
  ```

---

## 🔍 Pull Request Expectations

Before submitting a Pull Request (PR):

1. Ensure the code compiles cleanly (`npm run lint` and `npm run build`).
2. Verify all interactive flows work properly (create client, edit, delete, export).
3. Fill out the Pull Request template provided in `.github/PULL_REQUEST_TEMPLATE.md`.
4. Link any related issues in the PR description.
