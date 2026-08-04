import React from 'react';
import { Card } from '../Card/Card';
import { UserPlus, CheckCircle, ShieldAlert, Clock, RefreshCw } from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'client_added' | 'status_changed' | 'login_success' | 'system';
  title: string;
  description: string;
  timestamp: string;
}

export const RecentActivityCard: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'client_added':
        return <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'status_changed':
        return <RefreshCw className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'login_success':
        return <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBg = (type: ActivityItem['type']) => {
    switch (type) {
      case 'client_added':
        return 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/60 dark:border-emerald-900/60';
      case 'status_changed':
        return 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/60 dark:border-blue-900/60';
      case 'login_success':
        return 'bg-purple-50 dark:bg-purple-950/60 border-purple-200/60 dark:border-purple-900/60';
      default:
        return 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time audit log of client & team updates
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      <div className="mt-4 space-y-3.5">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-3 group">
            <div
              className={`p-2 rounded-xl border flex-shrink-0 mt-0.5 transition-transform group-hover:scale-105 ${getBg(
                item.type
              )}`}
            >
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {item.title}
                </p>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 flex-shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
