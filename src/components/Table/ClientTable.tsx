import React, { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  Mail,
  Filter,
  CheckCircle2,
  XCircle,
  Building,
  Eye,
  Pencil,
  Download,
  CheckSquare,
  Square,
  FileSpreadsheet,
  FileCode,
} from 'lucide-react';
import { Client, ClientStatus, SortField, SortOrder } from '../../types/client';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { SearchBar } from '../SearchBar/SearchBar';
import { EmptyState } from '../EmptyState/EmptyState';
import { Button } from '../Button/Button';

interface ClientTableProps {
  clients: Client[];
  onDeleteClient: (id: string) => void;
  onBatchDeleteClients: (ids: string[]) => void;
  onToggleStatus: (id: string) => void;
  onBatchSetStatus: (ids: string[], status: ClientStatus) => void;
  onOpenAddModal: () => void;
  onViewClientDetails: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onRequestDelete: (client: Client) => void;
  onRequestBatchDelete: (ids: string[]) => void;
}

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onDeleteClient,
  onBatchDeleteClients,
  onToggleStatus,
  onBatchSetStatus,
  onOpenAddModal,
  onViewClientDetails,
  onEditClient,
  onRequestDelete,
  onRequestBatchDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ClientStatus>('all');
  const [sortField, setSortField] = useState<SortField>('dateAdded');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedClients = useMemo(() => {
    return clients
      .filter((client) => {
        // Status filter
        if (statusFilter !== 'all' && client.status !== statusFilter) {
          return false;
        }
        // Search filter
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          client.name.toLowerCase().includes(q) ||
          client.email.toLowerCase().includes(q) ||
          (client.company && client.company.toLowerCase().includes(q)) ||
          (client.role && client.role.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortField === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortField === 'email') {
          comparison = a.email.localeCompare(b.email);
        } else if (sortField === 'dateAdded') {
          comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        } else if (sortField === 'status') {
          comparison = a.status.localeCompare(b.status);
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [clients, searchQuery, statusFilter, sortField, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage) || 1;

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const exportRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedClients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedClients, currentPage, itemsPerPage]);

  // Selection handlers
  const isAllPaginatedSelected =
    paginatedClients.length > 0 &&
    paginatedClients.every((c) => selectedIds.includes(c.id));

  const toggleSelectAll = () => {
    if (isAllPaginatedSelected) {
      const pageIds = new Set(paginatedClients.map((c) => c.id));
      setSelectedIds(selectedIds.filter((id) => !pageIds.has(id)));
    } else {
      const pageIds = paginatedClients.map((c) => c.id);
      setSelectedIds(Array.from(new Set([...selectedIds, ...pageIds])));
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Export CSV
  const exportCSV = () => {
    const dataToExport = selectedIds.length > 0
      ? clients.filter((c) => selectedIds.includes(c.id))
      : filteredAndSortedClients;

    const headers = ['ID', 'Name', 'Email', 'Status', 'Company', 'Role', 'Date Added', 'Phone'];
    const rows = dataToExport.map((c) => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      c.status,
      `"${(c.company || '').replace(/"/g, '""')}"`,
      `"${(c.role || '').replace(/"/g, '""')}"`,
      c.dateAdded,
      `"${(c.phone || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clients_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportMenuOpen(false);
  };

  // Export JSON
  const exportJSON = () => {
    const dataToExport = selectedIds.length > 0
      ? clients.filter((c) => selectedIds.includes(c.id))
      : filteredAndSortedClients;

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataToExport, null, 2)
    )}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `clients_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportMenuOpen(false);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
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

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls Header: Search & Filters & Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
        />

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
            <button
              onClick={() => {
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All ({clients.length})
            </button>
            <button
              onClick={() => {
                setStatusFilter('active');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'active'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Active ({clients.filter((c) => c.status === 'active').length})
            </button>
            <button
              onClick={() => {
                setStatusFilter('inactive');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'inactive'
                  ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Inactive ({clients.filter((c) => c.status === 'inactive').length})
            </button>
          </div>

          {/* Export Dropdown */}
          <div className="relative" ref={exportRef}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="py-1.5 px-3 text-xs"
            >
              Export
            </Button>

            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={exportCSV}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  Export as CSV
                </button>
                <button
                  onClick={exportJSON}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <FileCode className="w-4 h-4 text-blue-500" />
                  Export as JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Batch Actions Toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 text-xs animate-in slide-in-from-top-1">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-semibold">
            <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{selectedIds.length} client(s) selected</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onBatchSetStatus(selectedIds, 'active');
                setSelectedIds([]);
              }}
              className="py-1 px-2.5 h-7 text-xs bg-white dark:bg-slate-900"
            >
              Set Active
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onBatchSetStatus(selectedIds, 'inactive');
                setSelectedIds([]);
              }}
              className="py-1 px-2.5 h-7 text-xs bg-white dark:bg-slate-900"
            >
              Set Inactive
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onRequestBatchDelete(selectedIds);
              }}
              className="py-1 px-2.5 h-7 text-xs"
            >
              Delete Selected
            </Button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs ml-1 underline"
            >
              Deselect
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm overflow-hidden">
        {filteredAndSortedClients.length === 0 ? (
          <EmptyState
            isSearchEmpty={searchQuery.length > 0 || statusFilter !== 'all'}
            onAction={
              searchQuery || statusFilter !== 'all'
                ? () => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }
                : onOpenAddModal
            }
            actionText={
              searchQuery || statusFilter !== 'all' ? 'Reset Search Filters' : 'Add First Client'
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  <th className="py-3.5 px-4 w-10">
                    <button
                      onClick={toggleSelectAll}
                      className="p-1 rounded hover:bg-slate-200/50 dark:hover:bg-slate-700/50 text-slate-400"
                      title={isAllPaginatedSelected ? 'Deselect Page' : 'Select Page'}
                    >
                      {isAllPaginatedSelected ? (
                        <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </th>
                  <th className="py-3.5 px-4">
                    <button
                      onClick={() => handleSort('name')}
                      className="group inline-flex items-center gap-1.5 focus:outline-none hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      <span>Client Details</span>
                      {renderSortIcon('name')}
                    </button>
                  </th>
                  <th className="py-3.5 px-4">
                    <button
                      onClick={() => handleSort('email')}
                      className="group inline-flex items-center gap-1.5 focus:outline-none hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      <span>Email</span>
                      {renderSortIcon('email')}
                    </button>
                  </th>
                  <th className="py-3.5 px-4">
                    <button
                      onClick={() => handleSort('status')}
                      className="group inline-flex items-center gap-1.5 focus:outline-none hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      <span>Status</span>
                      {renderSortIcon('status')}
                    </button>
                  </th>
                  <th className="py-3.5 px-4">
                    <button
                      onClick={() => handleSort('dateAdded')}
                      className="group inline-flex items-center gap-1.5 focus:outline-none hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      <span>Date Added</span>
                      {renderSortIcon('dateAdded')}
                    </button>
                  </th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {paginatedClients.map((client) => {
                  const isSelected = selectedIds.includes(client.id);

                  return (
                    <tr
                      key={client.id}
                      onClick={() => onViewClientDetails(client)}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors group ${
                        isSelected ? 'bg-blue-50/50 dark:bg-blue-950/30' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4" onClick={(e) => toggleSelectOne(client.id, e)}>
                        <button className="p-1 rounded text-slate-400">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </td>

                      {/* Client Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {client.avatar ? (
                            <img
                              src={client.avatar}
                              alt={client.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center border border-blue-200 dark:border-blue-800 flex-shrink-0">
                              {getInitials(client.name)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {client.name}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                              <Building className="w-3 h-3 text-slate-400 flex-shrink-0" />
                              <span className="truncate">{client.company || 'Client'}</span>
                              {client.role && <span className="opacity-60">• {client.role}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 text-xs" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`mailto:${client.email}`}
                          className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>{client.email}</span>
                        </a>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <StatusBadge status={client.status} />
                      </td>

                      {/* Date Added */}
                      <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {formatDate(client.dateAdded)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => onViewClientDetails(client)}
                            title="View Profile Details"
                            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onEditClient(client)}
                            title="Edit Client"
                            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleStatus(client.id)}
                            title={client.status === 'active' ? 'Mark Inactive' : 'Mark Active'}
                            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            {client.status === 'active' ? (
                              <XCircle className="w-4 h-4 text-amber-500" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => onRequestDelete(client)}
                            title="Delete Client"
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {filteredAndSortedClients.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-800/20 text-xs text-slate-500 dark:text-slate-400">
            <div>
              Showing{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{' '}
              to{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {Math.min(currentPage * itemsPerPage, filteredAndSortedClients.length)}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {filteredAndSortedClients.length}
              </span>{' '}
              clients
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-2">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={20}>20</option>
              </select>

              <div className="flex items-center gap-1 ml-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="py-1 px-2.5 h-8 text-xs"
                >
                  Previous
                </Button>
                <span className="px-2 font-medium">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="py-1 px-2.5 h-8 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
