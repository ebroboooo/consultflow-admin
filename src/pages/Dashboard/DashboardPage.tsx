import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Plus,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { INITIAL_MOCK_CLIENTS } from '../../data/mockClients';
import { Client, ClientFormData, ClientStatus } from '../../types/client';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { ClientTable } from '../../components/Table/ClientTable';
import { AddClientModal } from '../../components/Modal/AddClientModal';
import { EditClientModal } from '../../components/Modal/EditClientModal';
import { ClientDetailsModal } from '../../components/Modal/ClientDetailsModal';
import { DeleteConfirmModal } from '../../components/Modal/DeleteConfirmModal';
import { RecentActivityCard, ActivityItem } from '../../components/ActivityCard/RecentActivityCard';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { AnalyticsView } from '../../components/Views/AnalyticsView';
import { SettingsView } from '../../components/Views/SettingsView';
import { HelpDocsView } from '../../components/Views/HelpDocsView';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showInfo, showError } = useToast();

  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useLocalStorage<Client[]>('saas_clients_data', INITIAL_MOCK_CLIENTS);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clientForDetails, setClientForDetails] = useState<Client | null>(null);
  const [clientForEdit, setClientForEdit] = useState<Client | null>(null);
  const [clientForDelete, setClientForDelete] = useState<Client | null>(null);
  const [batchDeleteIds, setBatchDeleteIds] = useState<string[]>([]);

  // Recent activity logs state
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 'act-001',
      type: 'login_success',
      title: 'Admin Session Authenticated',
      description: `${user?.email || 'admin@example.com'} signed into portal`,
      timestamp: 'Just now',
    },
    {
      id: 'act-002',
      type: 'client_added',
      title: 'New Client Registered',
      description: 'Olivia Martinez added to Crestview Partners',
      timestamp: '2 hours ago',
    },
    {
      id: 'act-003',
      type: 'status_changed',
      title: 'Status Updated',
      description: 'Sophia Wilson set to Inactive status',
      timestamp: 'Yesterday',
    },
  ]);

  // Calculated Stats
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === 'active').length;
  const inactiveClients = clients.filter((c) => c.status === 'inactive').length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newThisMonth = clients.filter((c) => {
    try {
      const d = new Date(c.dateAdded);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    } catch {
      return false;
    }
  }).length;

  // Handlers
  const handleAddClient = (formData: ClientFormData) => {
    const newClient: Client = {
      id: `cli-${Date.now().toString(36)}`,
      name: formData.name,
      email: formData.email,
      status: formData.status,
      dateAdded: new Date().toISOString().split('T')[0],
      company: formData.company || 'Independent Client',
      role: formData.role || 'Client Lead',
      phone: formData.phone || '',
    };

    setClients([newClient, ...clients]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'client_added',
      title: 'Client Profile Created',
      description: `${newClient.name} (${newClient.company})`,
      timestamp: 'Just now',
    };
    setActivities([newActivity, ...activities]);

    showSuccess('Client Added Successfully', `${formData.name} is now registered in your client list.`);
  };

  const handleUpdateClient = (id: string, updatedData: ClientFormData & { phone?: string }) => {
    setClients(
      clients.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            ...updatedData,
          };
        }
        return c;
      })
    );

    showSuccess('Profile Updated', `${updatedData.name}'s information was updated.`);
  };

  const handleDeleteClient = (id: string) => {
    const clientToDelete = clients.find((c) => c.id === id);
    setClients(clients.filter((c) => c.id !== id));

    if (clientToDelete) {
      showInfo('Client Removed', `${clientToDelete.name} was removed from the database.`);
    }
  };

  const handleBatchDeleteClients = (ids: string[]) => {
    setClients(clients.filter((c) => !ids.includes(c.id)));
    showInfo('Batch Operation Complete', `${ids.length} clients removed from directory.`);
    setBatchDeleteIds([]);
  };

  const handleBatchSetStatus = (ids: string[], status: ClientStatus) => {
    setClients(
      clients.map((c) => (ids.includes(c.id) ? { ...c, status } : c))
    );
    showSuccess('Status Batch Updated', `${ids.length} accounts set to ${status.toUpperCase()}.`);
  };

  const handleToggleStatus = (id: string) => {
    setClients(
      clients.map((c) => {
        if (c.id === id) {
          const newStatus = c.status === 'active' ? 'inactive' : 'active';
          showInfo(
            'Status Changed',
            `${c.name} is now marked as ${newStatus.toUpperCase()}.`
          );

          setActivities([
            {
              id: `act-${Date.now()}`,
              type: 'status_changed',
              title: 'Client Status Toggled',
              description: `${c.name} set to ${newStatus}`,
              timestamp: 'Just now',
            },
            ...activities,
          ]);

          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-6">
        {/* Top Header / Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Good day, {user?.displayName || 'Sarah'}
              </h1>
              <span className="text-lg">👋</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {activeTab === 'analytics'
                ? 'Performance metrics and client trajectory analytics.'
                : activeTab === 'settings'
                ? 'System settings and admin profile preferences.'
                : activeTab === 'help' || activeTab === 'docs'
                ? 'Knowledge base and technical support center.'
                : 'Here is your agency client roster and operational metrics for today.'}
            </p>
          </div>

          {(activeTab === 'clients' || activeTab === 'dashboard') && (
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={() => setIsAddModalOpen(true)}
                leftIcon={<Plus className="w-4 h-4" />}
                className="shadow-md shadow-blue-500/20 text-xs sm:text-sm"
              >
                Add New Client
              </Button>
            </div>
          )}
        </div>

        {/* Dynamic Views Rendering */}
        {activeTab === 'analytics' ? (
          <AnalyticsView clients={clients} />
        ) : activeTab === 'settings' ? (
          <SettingsView />
        ) : activeTab === 'help' || activeTab === 'docs' ? (
          <HelpDocsView />
        ) : (
          <>
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Clients"
                value={totalClients}
                change="+12% from last month"
                isPositive={true}
                icon={<Users className="w-5 h-5" />}
                subtitle="Active portfolio"
                accentColor="blue"
              />

              <StatsCard
                title="Active Clients"
                value={activeClients}
                change={`${Math.round((activeClients / (totalClients || 1)) * 100)}% active rate`}
                isPositive={true}
                icon={<UserCheck className="w-5 h-5" />}
                subtitle="Engaged accounts"
                accentColor="emerald"
              />

              <StatsCard
                title="Inactive Clients"
                value={inactiveClients}
                change="Requires check-in"
                isPositive={false}
                icon={<UserX className="w-5 h-5" />}
                subtitle="Paused accounts"
                accentColor="amber"
              />

              <StatsCard
                title="New This Month"
                value={newThisMonth}
                change="+4 accounts"
                isPositive={true}
                icon={<UserPlus className="w-5 h-5" />}
                subtitle="Recent onboarding"
                accentColor="purple"
              />
            </div>

            {/* Main Content Layout: Client Table & Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Client List Table - Takes 2 cols on Large */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Client Roster Directory
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Showing {clients.length} registered accounts
                  </span>
                </div>

                <ClientTable
                  clients={clients}
                  onDeleteClient={handleDeleteClient}
                  onBatchDeleteClients={handleBatchDeleteClients}
                  onToggleStatus={handleToggleStatus}
                  onBatchSetStatus={handleBatchSetStatus}
                  onOpenAddModal={() => setIsAddModalOpen(true)}
                  onViewClientDetails={(client) => setClientForDetails(client)}
                  onEditClient={(client) => setClientForEdit(client)}
                  onRequestDelete={(client) => setClientForDelete(client)}
                  onRequestBatchDelete={(ids) => setBatchDeleteIds(ids)}
                />
              </div>

              {/* Sidebar Cards Column */}
              <div className="space-y-6">
                <RecentActivityCard activities={activities} />

                {/* Agency Overview Summary Box */}
                <Card className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                    <Sparkles className="w-4 h-4 fill-blue-400" />
                    Milestone Architecture
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Firebase Auth Migration Ready
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    AuthContext, Auth Services, and Firebase config files are pre-structured for seamless backend integration in the next phase.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 space-y-1.5 font-mono">
                    <p>• src/services/firebase.ts</p>
                    <p>• src/services/auth.ts</p>
                    <p>• src/contexts/AuthContext.tsx</p>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddClient={handleAddClient}
        existingClients={clients}
      />

      {/* Edit Client Modal */}
      <EditClientModal
        isOpen={!!clientForEdit}
        onClose={() => setClientForEdit(null)}
        onUpdateClient={handleUpdateClient}
        client={clientForEdit}
        existingClients={clients}
      />

      {/* Client Details Modal */}
      <ClientDetailsModal
        isOpen={!!clientForDetails}
        onClose={() => setClientForDetails(null)}
        client={clientForDetails}
        onEdit={(client) => setClientForEdit(client)}
        onDelete={(client) => setClientForDelete(client)}
        onToggleStatus={(id) => handleToggleStatus(id)}
      />

      {/* Delete Single Client Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!clientForDelete}
        onClose={() => setClientForDelete(null)}
        onConfirm={() => {
          if (clientForDelete) {
            handleDeleteClient(clientForDelete.id);
          }
        }}
        client={clientForDelete}
      />

      {/* Delete Batch Clients Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={batchDeleteIds.length > 0}
        onClose={() => setBatchDeleteIds([])}
        onConfirm={() => handleBatchDeleteClients(batchDeleteIds)}
        client={null}
        count={batchDeleteIds.length}
      />
    </DashboardLayout>
  );
};
