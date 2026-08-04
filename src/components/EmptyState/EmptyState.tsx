import React from 'react';
import { Users, SearchX, Plus } from 'lucide-react';
import { Button } from '../Button/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  isSearchEmpty?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  isSearchEmpty = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center my-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 shadow-inner">
        {isSearchEmpty ? (
          <SearchX className="w-8 h-8 stroke-[1.5]" />
        ) : (
          <Users className="w-8 h-8 stroke-[1.5]" />
        )}
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {title || (isSearchEmpty ? 'No matching clients found' : 'No clients added yet')}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description ||
          (isSearchEmpty
            ? 'Try adjusting your search criteria or filters to find what you are looking for.'
            : 'Get started by creating your first client profile in your agency portal.')}
      </p>
      {onAction && actionText && (
        <Button
          onClick={onAction}
          variant="primary"
          leftIcon={isSearchEmpty ? undefined : <Plus className="w-4 h-4" />}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};
