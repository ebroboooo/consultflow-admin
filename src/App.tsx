import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { LoginPage } from './pages/Login/LoginPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

// Root Route Handler to avoid flash
const RootRedirect: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Root Redirect */}
                <Route path="/" element={<RootRedirect />} />

                {/* Public Login Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Dashboard Route */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
