import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import {
  User,
  Mail,
  ShieldCheck,
  Bell,
  Moon,
  Sun,
  Key,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [displayName, setDisplayName] = useState(user?.displayName || 'Sarah Miller');
  const [email] = useState(user?.email || 'sarah.m@consulting.com');
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsWeekly, setNotificationsWeekly] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((res) => setTimeout(res, 400));
    setIsSaving(false);
    showToast('Profile and preferences updated successfully.', 'success');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please enter both current and new passwords.', 'error');
      return;
    }
    setIsSaving(true);
    await new Promise((res) => setTimeout(res, 400));
    setIsSaving(false);
    setCurrentPassword('');
    setNewPassword('');
    showToast('Password updated successfully.', 'success');
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
      {/* Account Info */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Admin Profile Settings</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your personal information and contact details
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 capitalize">
            {user?.role || 'Administrator'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Email Address"
            value={email}
            disabled
            leftIcon={<Mail className="w-4 h-4" />}
            helperText="Contact system admin to change email address"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="primary" isLoading={isSaving}>
            Save Profile Changes
          </Button>
        </div>
      </form>

      {/* Appearance & Interface */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Interface Theme</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize appearance mode for comfortable view
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => theme === 'dark' && toggleTheme()}
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-amber-500" />
              <div className="text-left">
                <p className="text-xs font-bold">Light Mode</p>
                <p className="text-[11px] opacity-70">Clean high-contrast workspace</p>
              </div>
            </div>
            {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
          </button>

          <button
            type="button"
            onClick={() => theme === 'light' && toggleTheme()}
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              theme === 'dark'
                ? 'border-blue-600 bg-blue-950/60 text-blue-100 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-indigo-400" />
              <div className="text-left">
                <p className="text-xs font-bold">Dark Mode</p>
                <p className="text-[11px] opacity-70">Low-light eye-comfort dark canvas</p>
              </div>
            </div>
            {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
          </button>
        </div>
      </div>

      {/* Notifications & Alert Preferences */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure system alerts and email updates
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">New Client Registration Alerts</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive email notification when a new client profile is added</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationsEmail}
              onChange={(e) => setNotificationsEmail(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Weekly Executive Summary</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive weekly client growth & active retainer report</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationsWeekly}
              onChange={(e) => setNotificationsWeekly(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Security & Password */}
      <form onSubmit={handleChangePassword} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Security & Password</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Update your authentication password
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            leftIcon={<Key className="w-4 h-4" />}
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="outline" isLoading={isSaving}>
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};
