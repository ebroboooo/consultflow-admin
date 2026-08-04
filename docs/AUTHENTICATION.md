# Authentication Architecture

The application includes a complete frontend authentication lifecycle managed via `AuthContext` and route guards.

---

## 🔒 Authentication Flow Diagram

```
[ Unauthenticated User ]
          |
          v
   Attempts /dashboard
          |
          v
   +---------------+
   | ProtectedRoute| ---- (No Auth Token) ----> Redirects to /login
   +---------------+
          |
          v
     [ Login Page ]
          |
  Submits credentials
          |
          v
   +---------------+
   | AuthService   | ---- (Valid Credentials) -> Stores Session in localStorage
   +---------------+                              + Updates AuthContext State
          |
          v
   Redirects to /dashboard
```

---

## 🔑 Key Authentication Features

<<<<<<< HEAD
- **User Sign-In**: Validates email and password credentials with real-time UI status feedback.
=======
- **Demo Credentials**: Pre-configured demo login credentials (`admin@saasportal.com` / `admin123`).
>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
- **Session Persistence**: Authentication state persists across browser reloads via `localStorage`.
- **Protected Routes**: `<ProtectedRoute>` wrapper validates active sessions and seamlessly redirects unauthorized users.
- **Logout Flow**: Instantly clears active session tokens and state, redirecting to `/login` with a confirmation toast.
