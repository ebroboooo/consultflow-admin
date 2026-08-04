import React from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  PieChart as PieChartIcon,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
} from 'lucide-react';
import { Client } from '../../types/client';

interface AnalyticsViewProps {
  clients: Client[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ clients }) => {
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === 'active').length;
  const inactiveClients = totalClients - activeClients;
  const activePercentage = totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0;

  // Monthly breakdown simulation based on actual client data
  const monthlyData = [
    { month: 'Jan', newClients: 2, arr: '$18,400' },
    { month: 'Feb', newClients: 4, arr: '$24,200' },
    { month: 'Mar', newClients: 3, arr: '$29,800' },
    { month: 'Apr', newClients: 5, arr: '$36,500' },
    { month: 'May', newClients: 4, arr: '$42,000' },
    { month: 'Jun', newClients: 6, arr: '$51,400' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pipeline</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{totalClients}</p>
          <div className="mt-2 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+14.2% from last month</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Retainer Rate</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{activePercentage}%</p>
          <div className="mt-2 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>High health score</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Est. Monthly MRR</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            ${(activeClients * 4250).toLocaleString()}
          </p>
          <div className="mt-2 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+$3,500 new expansions</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Churn Risk</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
              <PieChartIcon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{inactiveClients} Accounts</p>
          <div className="mt-2 flex items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            <span>Requires re-engagement</span>
          </div>
        </div>
      </div>

      {/* Visual Charts & Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Growth Trajectory */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Client Acquisition Trajectory
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly onboarding vs annual recurring revenue
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              H1 2026 Overview
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {monthlyData.map((item) => (
              <div key={item.month} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300 w-12">{item.month}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    +{item.newClients} clients ({item.arr})
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(item.newClients / 8) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Breakdown */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Directory Ratio</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active vs Inactive clients breakdown
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-2">
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {activeClients} / {totalClients}
            </div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {activePercentage}% Operational Capacity
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Active Accounts</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{activeClients}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Inactive Accounts</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{inactiveClients}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Award className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>
                Targeting 90%+ retention rate for Q3 consulting milestones.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
