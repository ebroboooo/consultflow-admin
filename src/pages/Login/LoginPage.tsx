import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
<<<<<<< HEAD
import { Mail, Lock, Eye, EyeOff, Sparkles, Shield, CheckCircle2 } from 'lucide-react';
=======
import { Mail, Lock, Eye, EyeOff, Sparkles, Shield, KeyRound, CheckCircle2 } from 'lucide-react';
>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated, redirect to /dashboard
  if (isAuthenticated && !authLoading) {
    return <Navigate to="/dashboard" replace />;
  }

<<<<<<< HEAD
=======
  const handleFillDemo = () => {
    setEmail('admin@example.com');
    setPassword('password123');
    setErrorMessage(null);
    showInfo('Demo Credentials Applied', 'Click "Sign In" or press Enter to access the dashboard.');
  };

>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
        rememberMe,
      });

<<<<<<< HEAD
      showSuccess('Welcome Back!', 'Successfully authenticated to Client Portal.');
=======
      showSuccess('Welcome Back!', 'Successfully authenticated to Sarah M. Consulting Agency Portal.');
>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      const msg = err?.message || 'Invalid credentials. Please verify your email and password.';
      setErrorMessage(msg);
      showError('Authentication Failed', msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 mb-4">
            <Sparkles className="w-6 h-6 fill-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Sign in to access your Client Operations & Agency Dashboard
          </p>
        </div>

<<<<<<< HEAD
=======
        {/* Demo Credentials Helper Pill */}
        <div className="mb-6 p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <KeyRound className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div className="truncate">
              <p className="font-semibold text-blue-100">Quick Demo Credentials</p>
              <p className="text-[11px] text-blue-300/80 truncate">admin@example.com / password123</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex-shrink-0 shadow-sm"
          >
            Auto-fill
          </button>
        </div>

>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2.5 animate-in slide-in-from-top-1">
            <Shield className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Authentication Error</p>
              <p className="text-rose-300/90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
<<<<<<< HEAD
            placeholder="you@company.com"
=======
            placeholder="admin@example.com"
>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            autoComplete="email"
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-200 transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            autoComplete="current-password"
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() =>
                showInfo(
<<<<<<< HEAD
                  'Password Reset Instructions',
                  'Please contact your organization administrator to reset your account password.'
=======
                  'Password Reset',
                  'For demo purposes, use "password123" or click the Auto-fill button above.'
>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
                )
              }
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2 font-semibold shadow-lg shadow-blue-600/25"
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
<<<<<<< HEAD
          <p>Client Operations & SaaS Analytics Portal</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Encrypted Session</span>
=======
          <p>Sarah M. Consulting Agency Portal</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Firebase Auth Architecture Prototype</span>
>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
          </div>
        </div>
      </div>
    </div>
  );
};
