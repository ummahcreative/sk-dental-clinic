import React, {useEffect, useState} from 'react';
import {RefreshCw, X} from 'lucide-react';

interface AppointmentRecord {
  id: string;
  referenceCode: string;
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  doctor: string;
  service: string;
  preferredDate: string;
  preferredTimeSlot: string;
  concern: string;
  patientType: string;
  status: 'Pending Confirmation' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface ContactRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface StaffPortalModalProps {
  open: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS: AppointmentRecord['status'][] = [
  'Pending Confirmation',
  'Confirmed',
  'Completed',
  'Cancelled',
];

export const StaffPortalModal: React.FC<StaffPortalModalProps> = ({
  open,
  onClose,
}) => {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [tab, setTab] = useState<'appointments' | 'contacts'>('appointments');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || []);
        setContacts(data.contacts || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    loadData();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleStatusChange = async (
    id: string,
    status: AppointmentRecord['status']
  ) => {
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({status}),
    });
    if (res.ok) {
      setAppointments((prev) =>
        prev.map((item) => (item.id === id ? {...item, status} : item))
      );
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Clinic Staff Reception Desk"
      className="fixed inset-0 z-50 bg-[#0D2533]/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-[#153B50]/15 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#153B50] text-white flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Clinic Staff Reception Desk</h2>
            <p className="text-xs text-[#E9F6F3]/80">
              Manage incoming appointment requests and patient enquiries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              aria-label="Refresh requests"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close staff desk"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-6 pt-4 pb-2 border-b border-[#153B50]/10 flex items-center gap-2 bg-[#F7FAFC]">
          <button
            type="button"
            onClick={() => setTab('appointments')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              tab === 'appointments'
                ? 'bg-[#153B50] text-white'
                : 'bg-white text-[#243746] border border-[#153B50]/15'
            }`}
          >
            Appointment Requests ({appointments.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('contacts')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              tab === 'contacts'
                ? 'bg-[#153B50] text-white'
                : 'bg-white text-[#243746] border border-[#153B50]/15'
            }`}
          >
            Contact Messages ({contacts.length})
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {tab === 'appointments' ? (
            appointments.length === 0 ? (
              <p className="text-sm text-[#243746]/70 text-center py-10">
                No appointment requests have been submitted yet.
              </p>
            ) : (
              appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="rounded-xl border border-[#153B50]/15 bg-[#F7FAFC] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#159A9C] font-semibold tabular-nums">
                      <span>{apt.referenceCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>{apt.patientType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{apt.preferredDate}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#153B50]">
                      {apt.fullName}
                    </h3>
                    <p className="text-xs text-[#243746]/80">
                      {apt.service} with {apt.doctor} · {apt.preferredTimeSlot}
                    </p>
                    <p className="text-xs text-[#243746]/75 tabular-nums">
                      Mobile: {apt.mobileNumber} · WhatsApp: {apt.whatsappNumber}
                      {apt.email ? ` · ${apt.email}` : ''}
                    </p>
                    {apt.concern && (
                      <p className="text-xs text-[#243746]/80 pt-1">
                        Concern: “{apt.concern}”
                      </p>
                    )}
                  </div>

                  <div className="shrink-0">
                    <label
                      htmlFor={`status-${apt.id}`}
                      className="block text-[11px] font-semibold text-[#243746]/65 mb-1"
                    >
                      Confirmation Status
                    </label>
                    <select
                      id={`status-${apt.id}`}
                      value={apt.status}
                      onChange={(e) =>
                        handleStatusChange(
                          apt.id,
                          e.target.value as AppointmentRecord['status']
                        )
                      }
                      className="rounded-lg border border-[#153B50]/20 bg-white px-3 py-2 text-xs font-semibold text-[#153B50]"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))
            )
          ) : contacts.length === 0 ? (
            <p className="text-sm text-[#243746]/70 text-center py-10">
              No contact messages have been submitted yet.
            </p>
          ) : (
            contacts.map((cnt) => (
              <div
                key={cnt.id}
                className="rounded-xl border border-[#153B50]/15 bg-[#F7FAFC] p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs text-[#159A9C] font-semibold">
                  <span>{cnt.subject}</span>
                  <span className="tabular-nums text-[#243746]/65">
                    {new Date(cnt.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#153B50]">
                  {cnt.name}
                </h3>
                <p className="text-xs text-[#243746]/75 tabular-nums">
                  Phone: {cnt.phone}
                  {cnt.email ? ` · ${cnt.email}` : ''}
                </p>
                <p className="text-sm text-[#243746]/85 pt-1">{cnt.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
