import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Client } from '../../types/client';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  client: Client | null;
  count?: number; // For batch deletion
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  client,
  count,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    await new Promise((res) => setTimeout(res, 350));
    onConfirm();
    setIsDeleting(false);
    onClose();
  };

  const isBatch = typeof count === 'number' && count > 1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isBatch ? `Delete ${count} Selected Clients?` : 'Delete Client Profile?'}
      maxWidth="sm"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-200 text-xs">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">This action cannot be undone.</p>
            <p className="text-rose-700 dark:text-rose-300">
              {isBatch
                ? `You are about to permanently remove ${count} client accounts and their associated history.`
                : `Are you sure you want to delete ${client?.name} (${client?.email}) from your directory?`}
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            isLoading={isDeleting}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            {isBatch ? `Delete ${count} Clients` : 'Delete Client'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
