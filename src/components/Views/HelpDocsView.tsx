import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  ShieldCheck,
  Zap,
  Users,
} from 'lucide-react';
import { Button } from '../Button/Button';
import { useToast } from '../../contexts/ToastContext';

export const HelpDocsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { showToast } = useToast();

  const faqs = [
    {
      q: 'How do I add a new client to the directory?',
      a: 'Click the "Add Client" button in the header or top right of the Client Directory. Fill in the required fields (Name and Email) and optional details (Company, Role, Phone), then click "Save Client Profile".',
    },
    {
      q: 'How can I filter clients by Active or Inactive status?',
      a: 'Use the status filter buttons located directly above the Client List table. You can toggle between "All", "Active", and "Inactive" views with a single click.',
    },
    {
      q: 'How do I export client data to CSV or JSON?',
      a: 'Click the "Export" button above the Client Table. You can choose "Export as CSV" or "Export as JSON". If you select specific clients via checkboxes, only selected clients will be exported.',
    },
    {
      q: 'Is my client data stored persistently?',
      a: 'Yes, all client modifications are immediately synchronized with your secure LocalStorage cache. The application architecture is also built ready for Firebase Firestore cloud database migration.',
    },
    {
      q: 'How do I batch update client statuses or delete multiple entries?',
      a: 'Select the checkboxes next to the clients you wish to manage. A blue Batch Actions toolbar will appear at the top of the table allowing you to set status or delete selected entries at once.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Help & Knowledge Base</h2>
            <p className="text-xs text-blue-100 mt-0.5">
              Documentation and guides for managing your SaaS Client Directory
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search documentation and questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
        </div>
      </div>

      {/* Quick Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2">
          <div className="p-2 w-fit rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Client Management</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Learn how to manage client profiles, update status badges, and search directory records.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2">
          <div className="p-2 w-fit rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Batch Operations</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Perform bulk status updates, batch deletions, and client directory exports in seconds.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2">
          <div className="p-2 w-fit rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Security & Firebase</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Understand how client data security rules work with ready-to-deploy Firebase Auth.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3 pt-2">
          {filteredFaqs.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">
              No answers matching "{search}". Try searching for another topic.
            </p>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Contact Support Footer */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-blue-400" />
          <div>
            <h4 className="text-xs font-bold">Still need technical assistance?</h4>
            <p className="text-[11px] text-slate-400">
              Our engineering team is ready to assist with deployment & Firebase migration.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            showToast('Support request submitted. An engineer will follow up shortly.', 'info');
          }}
          className="whitespace-nowrap"
        >
          Contact Technical Support
        </Button>
      </div>
    </div>
  );
};
