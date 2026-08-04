import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { Client } from '../../types/client';
import {
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Pencil,
  Trash2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onToggleStatus: (id: string) => void;
}

export const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  isOpen,
  onClose,
  client,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  if (!client) return null;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Client Profile & Details"
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Header Profile Section */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
          {client.avatar ? (
            <img
              src={client.avatar}
              alt={client.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0">
              {getInitials(client.name)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                {client.name}
              </h3>
              <StatusBadge status={client.status} />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>{client.role || 'Client Lead'}</span>
              <span>•</span>
              <span>{client.company || 'Independent'}</span>
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                ID: {client.id}
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> SLA Active
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
            <a
              href={`mailto:${client.email}`}
              className="mt-1 font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 truncate"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{client.email}</span>
            </a>
          </div>

          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone Number</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{client.phone || '+1 (555) 019-2831'}</span>
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Organization</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{client.company || 'N/A'}</span>
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Date Added</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatDate(client.dateAdded)}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onToggleStatus(client.id);
            }}
          >
            Set as {client.status === 'active' ? 'Inactive' : 'Active'}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Pencil className="w-3.5 h-3.5" />}
              onClick={() => {
                onClose();
                onEdit(client);
              }}
            >
              Edit Profile
            </Button>

            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={() => {
                onClose();
                onDelete(client);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
