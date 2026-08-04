import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Client, ClientFormData, ClientStatus } from '../../types/client';
import { Mail, User as UserIcon, Building2, Briefcase, Phone } from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (data: ClientFormData) => void;
  existingClients: Client[];
}

export const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onAddClient,
  existingClients,
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    status: 'active',
    company: '',
    role: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      status: 'active',
      company: '',
      role: '',
      phone: '',
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address.';
    } else {
      const isDuplicate = existingClients.some(
        (c) => c.email.toLowerCase() === emailTrimmed.toLowerCase()
      );
      if (isDuplicate) {
        newErrors.email = 'A client with this email address already exists.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate small smooth delay for UI responsiveness
    await new Promise((res) => setTimeout(res, 400));

    onAddClient({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      status: formData.status,
      company: formData.company?.trim() || 'Independent Client',
      role: formData.role?.trim() || 'Client Lead',
      phone: formData.phone?.trim() || '',
    });

    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Client"
      subtitle="Enter client profile details to register them into your dashboard."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Sarah Jenkins"
          leftIcon={<UserIcon className="w-4 h-4" />}
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          error={errors.name}
          autoFocus
        />

        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. sjenkins@elevateagency.com"
          leftIcon={<Mail className="w-4 h-4" />}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          error={errors.email}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            placeholder="e.g. Elevate Agency"
            leftIcon={<Building2 className="w-4 h-4" />}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />

          <Input
            label="Role / Title"
            placeholder="e.g. Client Partner"
            leftIcon={<Briefcase className="w-4 h-4" />}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        <Input
          label="Phone Number"
          placeholder="e.g. +1 (555) 234-5678"
          leftIcon={<Phone className="w-4 h-4" />}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Initial Account Status
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, status: 'active' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                formData.status === 'active'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Active
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, status: 'inactive' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                formData.status === 'inactive'
                  ? 'border-slate-400 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              Inactive
            </button>
          </div>
        </div>

        <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Add Client
          </Button>
        </div>
      </form>
    </Modal>
  );
};
