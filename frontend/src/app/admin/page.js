'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fetchAdminDashboard } from '@/utils/api';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'contacts' | 'consultations' | 'healthCheckups' | 'leadMagnets' | 'applications'
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminDashboard();
      setDashboardData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stats = dashboardData?.stats || {
    totalContacts: 0,
    totalConsultations: 0,
    totalHealthCheckups: 0,
    totalLeadMagnets: 0,
    totalApplications: 0,
  };

  const local = dashboardData?.localData || {
    contacts: [],
    consultations: [],
    healthCheckups: [],
    leadMagnets: [],
    applications: [],
  };

  const getListForTab = () => {
    switch (activeTab) {
      case 'contacts':
        return local.contacts;
      case 'consultations':
        return local.consultations;
      case 'healthCheckups':
        return local.healthCheckups;
      case 'leadMagnets':
        return local.leadMagnets;
      case 'applications':
        return local.applications;
      default:
        return [];
    }
  };

  const currentList = getListForTab();

  return (
    <div className="pt-28 pb-20 min-h-screen bg-dark-100">
      {/* Top Banner */}
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dark-400">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-accent uppercase tracking-widest text-gold font-bold">
                COMMAND CENTER & LEAD OPS
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-black text-white mt-1">
              Riyadvi Executive Admin Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="px-4 py-2 rounded-xl bg-dark-300 hover:bg-dark-400 border border-dark-400 text-xs text-white font-accent transition-colors flex items-center gap-2"
            >
              <span>🔄</span> Refresh Data
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-gold text-dark text-xs font-accent font-bold hover:bg-gold-light transition-colors"
            >
              Public Site →
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-6 space-y-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div
            onClick={() => setActiveTab('consultations')}
            className={`p-5 rounded-2xl bg-dark-200 border cursor-pointer transition-all ${
              activeTab === 'consultations' ? 'border-gold bg-gold/10' : 'border-dark-400 hover:border-dark-300'
            }`}
          >
            <div className="text-[11px] font-accent uppercase text-neutral-400 font-semibold">
              Consultations
            </div>
            <div className="text-3xl font-heading font-black text-white mt-1">
              {stats.totalConsultations}
            </div>
            <div className="text-[10px] text-gold font-medium mt-1">High Intent Leads</div>
          </div>

          <div
            onClick={() => setActiveTab('contacts')}
            className={`p-5 rounded-2xl bg-dark-200 border cursor-pointer transition-all ${
              activeTab === 'contacts' ? 'border-gold bg-gold/10' : 'border-dark-400 hover:border-dark-300'
            }`}
          >
            <div className="text-[11px] font-accent uppercase text-neutral-400 font-semibold">
              General Inquiries
            </div>
            <div className="text-3xl font-heading font-black text-white mt-1">
              {stats.totalContacts}
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">Direct Contact Form</div>
          </div>

          <div
            onClick={() => setActiveTab('healthCheckups')}
            className={`p-5 rounded-2xl bg-dark-200 border cursor-pointer transition-all ${
              activeTab === 'healthCheckups' ? 'border-gold bg-gold/10' : 'border-dark-400 hover:border-dark-300'
            }`}
          >
            <div className="text-[11px] font-accent uppercase text-neutral-400 font-semibold">
              Health Audits
            </div>
            <div className="text-3xl font-heading font-black text-white mt-1">
              {stats.totalHealthCheckups}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">Maturity Assessments</div>
          </div>

          <div
            onClick={() => setActiveTab('leadMagnets')}
            className={`p-5 rounded-2xl bg-dark-200 border cursor-pointer transition-all ${
              activeTab === 'leadMagnets' ? 'border-gold bg-gold/10' : 'border-dark-400 hover:border-dark-300'
            }`}
          >
            <div className="text-[11px] font-accent uppercase text-neutral-400 font-semibold">
              Guide Downloads
            </div>
            <div className="text-3xl font-heading font-black text-white mt-1">
              {stats.totalLeadMagnets}
            </div>
            <div className="text-[10px] text-sky-400 mt-1">Blueprint Leads</div>
          </div>

          <div
            onClick={() => setActiveTab('applications')}
            className={`p-5 rounded-2xl bg-dark-200 border cursor-pointer transition-all ${
              activeTab === 'applications' ? 'border-gold bg-gold/10' : 'border-dark-400 hover:border-dark-300'
            }`}
          >
            <div className="text-[11px] font-accent uppercase text-neutral-400 font-semibold">
              Job Candidates
            </div>
            <div className="text-3xl font-heading font-black text-white mt-1">
              {stats.totalApplications}
            </div>
            <div className="text-[10px] text-purple-400 mt-1">Engineering Talent</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-dark-400 pb-3">
          {[
            { id: 'overview', label: '📊 System Overview' },
            { id: 'consultations', label: '⚡ Consultations' },
            { id: 'contacts', label: '✉️ Inquiries' },
            { id: 'healthCheckups', label: '🩺 Health Audits' },
            { id: 'leadMagnets', label: '📘 Guide Leads' },
            { id: 'applications', label: '💼 Candidates' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-accent font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gold text-dark font-bold'
                  : 'bg-dark-300 text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="py-20 text-center text-sm text-neutral-400">
            Loading dashboard data...
          </div>
        ) : activeTab === 'overview' ? (
          /* Overview View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Status */}
            <div className="p-6 rounded-3xl bg-dark-200 border border-dark-400 space-y-4">
              <h3 className="text-lg font-heading font-bold text-white flex items-center justify-between">
                <span>Recent Consultations & Bookings</span>
                <button
                  onClick={() => setActiveTab('consultations')}
                  className="text-xs text-gold hover:underline"
                >
                  View All →
                </button>
              </h3>

              {local.consultations.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500 bg-dark-300 rounded-2xl">
                  No consultation requests logged yet. Use the Contact page to simulate or submit.
                </div>
              ) : (
                <div className="space-y-3">
                  {local.consultations.slice(0, 4).map((c) => (
                    <div
                      key={c._id}
                      onClick={() => setSelectedRecord(c)}
                      className="p-4 rounded-xl bg-dark-300 border border-dark-400 hover:border-gold/40 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-heading font-bold text-sm text-white">{c.name}</div>
                        <div className="text-xs text-neutral-400">{c.email} • {c.company || 'Private Client'}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-accent uppercase px-2 py-0.5 rounded bg-gold/20 text-gold font-bold">
                          {c.budget || 'Custom'}
                        </span>
                        <div className="text-[10px] text-neutral-500 mt-1">
                          {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recent'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Candidates */}
            <div className="p-6 rounded-3xl bg-dark-200 border border-dark-400 space-y-4">
              <h3 className="text-lg font-heading font-bold text-white flex items-center justify-between">
                <span>Recent Candidate Applications</span>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs text-gold hover:underline"
                >
                  View All →
                </button>
              </h3>

              {local.applications.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500 bg-dark-300 rounded-2xl">
                  No job applications received yet. Submit a test application via the Careers page.
                </div>
              ) : (
                <div className="space-y-3">
                  {local.applications.slice(0, 4).map((app) => (
                    <div
                      key={app._id}
                      onClick={() => setSelectedRecord(app)}
                      className="p-4 rounded-xl bg-dark-300 border border-dark-400 hover:border-gold/40 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-heading font-bold text-sm text-white">{app.name}</div>
                        <div className="text-xs text-neutral-400">{app.jobTitle || 'Role'} • {app.email}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-accent uppercase px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-bold">
                          {app.status || 'Under Review'}
                        </span>
                        <div className="text-[10px] text-neutral-500 mt-1">
                          {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recent'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Records Table for Selected Tab */
          <div className="p-6 rounded-3xl bg-dark-200 border border-dark-400">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-400">
              <h3 className="text-lg font-heading font-bold text-white capitalize">
                {activeTab} Records ({currentList.length})
              </h3>
              <span className="text-xs text-neutral-400">
                Click any row to view complete payload details
              </span>
            </div>

            {currentList.length === 0 ? (
              <div className="py-16 text-center text-xs text-neutral-500 bg-dark-300 rounded-2xl">
                No entries stored in this category yet. Submissions from the live forms will immediately populate here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-dark-400 text-neutral-400 font-accent uppercase">
                      <th className="py-3 px-4">Contact / Name</th>
                      <th className="py-3 px-4">Email / Phone</th>
                      <th className="py-3 px-4">Key Details</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-400/50">
                    {currentList.map((item) => (
                      <tr
                        key={item._id}
                        onClick={() => setSelectedRecord(item)}
                        className="hover:bg-dark-300/80 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 font-bold text-white">
                          {item.name || item.fullName || 'Anonymous'}
                          {item.company && (
                            <div className="text-[11px] text-neutral-400 font-normal">
                              {item.company}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-neutral-300">
                          <div>{item.email}</div>
                          <div className="text-neutral-500">{item.phone}</div>
                        </td>
                        <td className="py-3 px-4 text-neutral-300">
                          {item.service && <span className="text-gold">{item.service}</span>}
                          {item.jobTitle && <span className="text-purple-300">{item.jobTitle}</span>}
                          {item.score && <span className="text-emerald-400">Score: {item.score}/100</span>}
                          {item.guideName && <span className="text-sky-300">{item.guideName}</span>}
                          {item.message && (
                            <p className="line-clamp-1 text-neutral-400">{item.message}</p>
                          )}
                        </td>
                        <td className="py-3 px-4 text-neutral-400">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRecord(item);
                            }}
                            className="px-3 py-1 rounded bg-dark-400 hover:bg-gold hover:text-dark text-neutral-300 transition-colors text-[10px] font-accent font-bold"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-dark-200 border border-gold/40 rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-dark-400">
              <div>
                <span className="text-[10px] font-accent uppercase text-gold font-bold">
                  RECORD INSPECTOR
                </span>
                <h3 className="text-xl font-heading font-black text-white">
                  {selectedRecord.name || 'Submission Payload'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 rounded-full bg-dark-300 hover:bg-dark-400 text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono bg-dark-300 p-4 rounded-2xl border border-dark-400 overflow-x-auto text-neutral-300">
              <pre>{JSON.stringify(selectedRecord, null, 2)}</pre>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="btn-secondary text-xs !py-2 !px-5"
              >
                Close Inspector
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
