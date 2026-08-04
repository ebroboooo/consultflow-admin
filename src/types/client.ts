export type ClientStatus = 'active' | 'inactive';

export interface Client {
  id: string;
  name: string;
  email: string;
  status: ClientStatus;
  dateAdded: string; // ISO string e.g., '2026-07-15'
  company?: string;
  role?: string;
  avatar?: string;
  phone?: string;
}

export interface ClientFormData {
  name: string;
  email: string;
  status: ClientStatus;
  company?: string;
  role?: string;
  phone?: string;
}

export type SortField = 'name' | 'email' | 'dateAdded' | 'status';
export type SortOrder = 'asc' | 'desc';
