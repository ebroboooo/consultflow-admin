import { LoginCredentials, User } from '../types/auth';

/**
 * Authentication Service Interface Layer
 * 
 * CURRENT STATUS: Mock Implementation for Client Prototype
 * 
 * TODO (Future Milestone - Firebase Migration):
 * - Replace mock authentication logic with Firebase Auth functions:
 *   - `signInWithEmailAndPassword(auth, email, password)`
 *   - `signOut(auth)`
 *   - `onAuthStateChanged(auth, user => ...)`
 */

const MOCK_ADMIN_USER: User = {
  uid: 'usr-admin-001',
  email: 'admin@example.com',
  displayName: 'Sarah Miller',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00.000Z',
};

const MOCK_PASSWORD = 'password123';

export async function loginWithEmailAndPassword(
  credentials: LoginCredentials
): Promise<User> {
  // Simulate network delay for realistic SaaS loading states
  await new Promise((resolve) => setTimeout(resolve, 600));

  const trimmedEmail = credentials.email.trim().toLowerCase();

  if (!trimmedEmail || !credentials.password) {
    throw new Error('Email and password are required.');
  }

  if (!trimmedEmail.includes('@') || credentials.password.length < 3) {
    throw new Error('Invalid credentials format. Please enter a valid email and password.');
  }

  const namePart = trimmedEmail.split('@')[0];
  const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

  return {
    uid: 'usr-' + Math.random().toString(36).substring(2, 9),
    email: trimmedEmail,
    displayName: formattedName || 'Portal Admin',
    role: 'admin',
    createdAt: new Date().toISOString(),
  };
}

export async function logoutUser(): Promise<void> {
  // Simulate logout delay
  await new Promise((resolve) => setTimeout(resolve, 300));
}

export function getCurrentStoredUser(): User | null {
  try {
    const data = localStorage.getItem('saas_admin_auth_user');
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error reading stored user:', err);
    return null;
  }
}

export function setStoredUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem('saas_admin_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('saas_admin_auth_user');
    }
  } catch (err) {
    console.error('Error setting stored user:', err);
  }
}
