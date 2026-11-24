import React, {useEffect, useMemo, useState} from 'react';
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Copy,
  MessageCircle,
  Phone,
  ShieldAlert,
} from 'lucide-react';
import {
  APPOINTMENT_SERVICES,
  CLINIC_INFO,
  PREFERRED_TIME_WINDOWS,
} from '../data/clinicData';

interface AppointmentSectionProps {
  preselectedDoctor: string;
  preselectedService: string;
}

interface BookingResponse {
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
  patientType: 'First Visit' | 'Existing Patient';
  status: string;
}

const DOCTOR_OPTIONS = [
  'Dr. Safreena Khathun',
  'Dr. Shireen Khatun',
  'Dr. Siraj Khan',
  'Any Available Doctor',
];

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function normalizeIndianMobile(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  const trimmed =
    digits.length === 12 && digits.startsWith('91')
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith('0')
        ? digits.slice(1)
        : digits;
  return /^[6-9]\d{9}$/.test(trimmed) ? trimmed : null;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  preselectedDoctor,
  preselectedService,
}) => {
  const todayStr = useMemo(() => getTodayDateString(), []);

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [doctor, setDoctor] = useState('Dr. Safreena Khathun');
  const [service, setService] = useState('General Consultation');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(
    PREFERRED_TIME_WINDOWS[0]
  );
  const [concern, setConcern] = useState('');
  const [patientType, setPatientType] = useState<
    'First Visit' | 'Existing Patient'
  >('First Visit');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedRecord, setConfirmedRecord] =
    useState<BookingResponse | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (preselectedDoctor) {
      setDoctor(preselectedDoctor);
    }
  }, [preselectedDoctor]);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const effectiveWhatsapp = sameAsMobile ? mobileNumber : whatsappNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const validMobile = normalizeIndianMobile(mobileNumber);
    if (!validMobile) {
      setErrorMsg(
        'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).'
      );
      return;
    }

    const validWhatsapp = normalizeIndianMobile(effectiveWhatsapp);
    if (!validWhatsapp) {
      setErrorMsg(
        'Please enter a valid 10-digit Indian WhatsApp number (starting with 6, 7, 8, or 9).'
      );
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address or leave it blank.');
      return;
    }

    if (!preferredDate || preferredDate < todayStr) {
      setErrorMsg('Please select today or a future preferred appointment date.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobileNumber: validMobile,
          whatsappNumber: validWhatsapp,
          email: email.trim(),
          doctor,
          service,
          preferredDate,
          preferredTimeSlot,
          concern: concern.trim(),
          patientType,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Could not submit your appointment request.');
        return;
      }

      setConfirmedRecord(data.appointment);
    } catch {
      setErrorMsg(
        'Unable to reach the clinic booking server right now. Please try again or use WhatsApp enquiry.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const buildWhatsAppMessage = (record?: BookingResponse | null) => {
    if (record) {
      return `Hello Dr. SK Dental Clinic, I have submitted an appointment request.\nReference: ${record.referenceCode}\nName: ${record.fullName}\nPatient Type: ${record.patientType}\nDoctor: ${record.doctor}\nService: ${record.service}\nPreferred Date: ${record.preferredDate}\nPreferred Time: ${record.preferredTimeSlot}${record.concern ? `\nConcern: ${record.concern}` : ''}`;
    }
    return `Hello Dr. SK Dental Clinic, I would like to request a dental appointment.\nName: ${fullName || '[Your Name]'}\nMobile: ${mobileNumber || '[Your Mobile]'}\nService: ${service}\nDoctor: ${doctor}\nPreferred Date: ${preferredDate || '[Date]'}\nPreferred Time: ${preferredTimeSlot}`;
  };

  const getWhatsAppHref = (record?: BookingResponse | null) => {
    const text = encodeURIComponent(buildWhatsAppMessage(record));
    return CLINIC_INFO.placeholders.whatsappDigits
      ? `https://wa.me/${CLINIC_INFO.placeholders.whatsappDigits}?text=${text}`
      : `https://wa.me/?text=${text}`;
  };

  const handleCopyReference = async (refCode: string) => {
    try {
      await navigator.clipboard.writeText(refCode);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    } catch {
      // Clipboard unsupported
    }
  };

  const handleReset = () => {
    setConfirmedRecord(null);
    setFullName('');
    setMobileNumber('');
    setWhatsappNumber('');
    setSameAsMobile(true);
    setEmail('');
    setPreferredDate('');
    setConcern('');
    setErrorMsg(null);
  };

  return (
    <section
      id="book-appointment"
      className="py-18 lg:py-26 bg-gradient-to-br from-[#153B50] via-[#124659] to-[#0F5B63] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Booking Guidance & Separate Acute Pain Emergency Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#C7A76C] tracking-wide mb-2">
                Appointment Portal
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white leading-[1.14]"
                style={{textWrap: 'balance'}}
              >
                Book Your{' '}
                <em className="italic font-semibold text-[#C7A76C]">
                  Dental Appointment
                </em>
              </h2>
              <p className="mt-4 text-base text-[#E9F6F3]/85 leading-relaxed">
                Take the first step towards better oral health. Schedule a
                consultation with our dental team.
              </p>
            </div>

            {/* Process Guidance */}
            <div className="rounded-3xl bg-white/8 border border-white/15 p-6 space-y-4 backdrop-blur-xs">
              <h3 className="text-base font-semibold text-white">
                How Request Confirmation Works
              </h3>
              <ol className="space-y-3 text-sm text-[#E9F6F3]/85">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#159A9C] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                    1
                  </span>
                  <span>
                    Submit your preferred doctor, service, date, and time window
                    using the form.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#159A9C] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                    2
                  </span>
                  <span>
                    Receive an instant unique enquiry reference number and
                    optional WhatsApp summary.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#159A9C] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                    3
                  </span>
                  <span>
                    Our clinic staff contacts you via phone or WhatsApp to
                    confirm your exact appointment slot.
                  </span>
                </li>
              </ol>
            </div>

            {/* Separate Emergency Contact CTA Card */}
            <div className="rounded-3xl bg-[#FAF8F5] text-[#153B50] p-6 border border-[#C7A76C]/45 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#153B50] text-[#C7A76C] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#159A9C]">
                    Acute Dental Pain?
                  </p>
                  <h3 className="text-xl font-bold text-[#153B50] mt-0.5">
                    Urgent &amp; Emergency Dental Assessment
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-sm text-[#243746]/85 leading-relaxed">
                Experiencing severe toothache, swelling, or a broken tooth?
                Request an urgent assessment directly or reach our clinic desk.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2.5">
                <a
                  href={CLINIC_INFO.placeholders.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#153B50] text-white text-sm font-semibold hover:bg-[#159A9C] transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Call Clinic Desk</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setService('Emergency Dental Consultation');
                    setPreferredDate(todayStr);
                    document
                      .getElementById('concern')
                      ?.focus();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#153B50]/25 bg-white text-[#153B50] text-sm font-semibold hover:border-[#159A9C] hover:text-[#159A9C] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Select Emergency Slot</span>
                </button>
              </div>
              <p className="mt-3 text-xs text-[#243746]/70">
                Clinic Phone: {CLINIC_INFO.placeholders.phoneDisplay}
              </p>
            </div>
          </div>

          {/* Right Column: Integrated Appointment Request Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white text-[#243746] p-6 sm:p-8 lg:p-10 shadow-[0_24px_65px_rgba(10,25,36,0.30)]">
              {confirmedRecord ? (
                <div className="py-4 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E9F6F3] text-[#159A9C] flex items-center justify-center shrink-0">
                      <CalendarCheck className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#159A9C]">
                        Request Received · Pending Staff Confirmation
                      </p>
                      <h3 className="text-2xl font-bold text-[#153B50] mt-1">
                        Thank You, {confirmedRecord.fullName}
                      </h3>
                      <p className="mt-2 text-sm text-[#243746]/80 leading-relaxed">
                        Your appointment request has been logged for our clinic
                        team. Please note that appointments remain requests
                        until confirmed by clinic staff.
                      </p>
                    </div>
                  </div>

                  {/* Unique Reference Banner */}
                  <div className="rounded-xl bg-[#F7FAFC] border border-[#153B50]/15 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-[#243746]/70">
                        Unique Enquiry Reference
                      </p>
                      <p className="text-xl font-bold text-[#153B50] tracking-wide tabular-nums mt-0.5">
                        {confirmedRecord.referenceCode}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyReference(confirmedRecord.referenceCode)
                      }
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#153B50]/20 bg-white text-xs font-semibold text-[#153B50] hover:bg-[#E9F6F3] transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{copiedRef ? 'Copied Reference' : 'Copy Reference'}</span>
                    </button>
                  </div>

                  {/* Summary Details */}
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-y border-[#153B50]/10 py-5">
                    <div>
                      <dt className="text-xs text-[#243746]/65">Doctor</dt>
                      <dd className="font-semibold text-[#153B50] mt-0.5">
                        {confirmedRecord.doctor}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#243746]/65">Service</dt>
                      <dd className="font-semibold text-[#153B50] mt-0.5">
                        {confirmedRecord.service}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#243746]/65">
                        Preferred Date
                      </dt>
                      <dd className="font-semibold text-[#153B50] mt-0.5 tabular-nums">
                        {confirmedRecord.preferredDate}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#243746]/65">
                        Preferred Time Window
                      </dt>
                      <dd className="font-semibold text-[#153B50] mt-0.5">
                        {confirmedRecord.preferredTimeSlot}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#243746]/65">
                        Mobile / WhatsApp
                      </dt>
                      <dd className="font-semibold text-[#153B50] mt-0.5 tabular-nums">
                        {confirmedRecord.mobileNumber}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#243746]/65">
                        Visit Status
                      </dt>
                      <dd className="font-semibold text-[#153B50] mt-0.5">
                        {confirmedRecord.patientType}
                      </dd>
                    </div>
                  </dl>

                  {/* WhatsApp Integration & Another Request */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={getWhatsAppHref(confirmedRecord)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#159A9C] text-white text-sm font-semibold hover:bg-[#128284] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Reference via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-[#153B50]/20 text-sm font-semibold text-[#153B50] hover:bg-[#F7FAFC] transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#153B50]/10">
                    <div>
                      <h3 className="text-xl font-bold text-[#153B50]">
                        Appointment Request Form
                      </h3>
                      <p className="text-xs text-[#243746]/70 mt-0.5">
                        Fields marked with * are required.
                      </p>
                    </div>

                    {/* 10. First Visit / Existing Patient */}
                    <div
                      role="group"
                      aria-label="Patient Visit Type"
                      className="inline-flex rounded-xl bg-[#F7FAFC] p-1 border border-[#153B50]/10 shrink-0"
                    >
                      {(['First Visit', 'Existing Patient'] as const).map(
                        (type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setPatientType(type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                              patientType === type
                                ? 'bg-[#153B50] text-white shadow-xs'
                                : 'text-[#243746]/75 hover:text-[#153B50]'
                            }`}
                          >
                            {type}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2.5 text-sm text-red-800"
                    >
                      <AlertCircle
                        className="w-4 h-4 mt-0.5 shrink-0 text-red-600"
                        aria-hidden="true"
                      />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Mobile Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="apt-fullname"
                        className="block text-xs font-semibold text-[#153B50] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="apt-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter patient full name"
                        className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] placeholder:text-[#243746]/45 focus:bg-white focus:border-[#159A9C]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="apt-mobile"
                        className="block text-xs font-semibold text-[#153B50] mb-1.5"
                      >
                        Mobile Number (India) *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#153B50]/20 bg-[#E9F6F3] text-xs font-semibold text-[#153B50] tabular-nums">
                          +91
                        </span>
                        <input
                          id="apt-mobile"
                          type="tel"
                          required
                          inputMode="numeric"
                          maxLength={14}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="10-digit mobile number"
                          className="w-full rounded-r-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] tabular-nums placeholder:text-[#243746]/45 focus:bg-white focus:border-[#159A9C]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: WhatsApp Number & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="apt-whatsapp"
                          className="block text-xs font-semibold text-[#153B50]"
                        >
                          WhatsApp Number *
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#159A9C] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sameAsMobile}
                            onChange={(e) => setSameAsMobile(e.target.checked)}
                            className="rounded border-[#153B50]/30 accent-[#159A9C]"
                          />
                          <span>Same as mobile</span>
                        </label>
                      </div>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#153B50]/20 bg-[#E9F6F3] text-xs font-semibold text-[#153B50] tabular-nums">
                          +91
                        </span>
                        <input
                          id="apt-whatsapp"
                          type="tel"
                          required
                          inputMode="numeric"
                          maxLength={14}
                          disabled={sameAsMobile}
                          value={effectiveWhatsapp}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          placeholder="10-digit WhatsApp number"
                          className={`w-full rounded-r-xl border border-[#153B50]/20 px-3.5 py-2.5 text-sm tabular-nums placeholder:text-[#243746]/45 ${
                            sameAsMobile
                              ? 'bg-[#F7FAFC]/70 text-[#243746]/65 cursor-not-allowed'
                              : 'bg-[#F7FAFC] text-[#243746] focus:bg-white focus:border-[#159A9C]'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="apt-email"
                        className="block text-xs font-semibold text-[#153B50] mb-1.5"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="apt-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] placeholder:text-[#243746]/45 focus:bg-white focus:border-[#159A9C]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Select Doctor & Select Dental Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="apt-doctor"
                        className="block text-xs font-semibold text-[#153B50] mb-1.5"
                      >
                        Select Doctor *
                      </label>
                      <select
                        id="apt-doctor"
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] focus:bg-white focus:border-[#159A9C]"
                      >
                        {DOCTOR_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="apt-service"
                        className="block text-xs font-semibold text-[#153B50] mb-1.5"
                      >
                        Select Dental Service *
                      </label>
                      <select
                        id="apt-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] focus:bg-white focus:border-[#159A9C]"
                      >
                        {APPOINTMENT_SERVICES.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Preferred Date & Preferred Time Window */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="apt-date"
                        className="block text-xs font-semibold text-[#153B50] mb-1.5"
                      >
                        Preferred Appointment Date *
                      </label>
                      <input
                        id="apt-date"
                        type="date"
                        required
                        min={todayStr}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] tabular-nums focus:bg-white focus:border-[#159A9C]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="apt-time"
                        className="block text-xs font-semibold text-[#153B50] mb-1.5"
                      >
                        Preferred Time Window *
                      </label>
                      <select
                        id="apt-time"
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                        className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] focus:bg-white focus:border-[#159A9C]"
                      >
                        {PREFERRED_TIME_WINDOWS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Briefly Describe Your Dental Concern */}
                  <div>
                    <label
                      htmlFor="concern"
                      className="block text-xs font-semibold text-[#153B50] mb-1.5"
                    >
                      Briefly Describe Your Dental Concern
                    </label>
                    <textarea
                      id="concern"
                      rows={3}
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                      placeholder="Share any symptoms, toothache, sensitivity, or specific questions..."
                      className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] placeholder:text-[#243746]/45 focus:bg-white focus:border-[#159A9C]"
                    />
                  </div>

                  {/* Disclaimer */}
                  <div className="rounded-xl bg-[#E9F6F3] px-4 py-3 flex items-start gap-2.5 text-xs text-[#153B50]">
                    <CheckCircle2
                      className="w-4 h-4 text-[#159A9C] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      Appointments are requests until confirmed by clinic staff.
                      Final slot availability will be shared when our team
                      reaches out to you.
                    </span>
                  </div>

                  {/* Submit & Quick WhatsApp Enquiry */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C7A76C] text-[#153B50] font-bold text-sm tracking-wide hover:bg-[#b89557] disabled:opacity-60 transition-colors cursor-pointer shadow-[0_8px_20px_rgba(199,167,108,0.28)]"
                    >
                      <span>
                        {submitting
                          ? 'SUBMITTING REQUEST...'
                          : 'REQUEST MY APPOINTMENT'}
                      </span>
                    </button>

                    <a
                      href={getWhatsAppHref(null)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#159A9C]/35 bg-[#E9F6F3] text-[#153B50] font-semibold text-sm hover:bg-[#159A9C] hover:text-white transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>WhatsApp Enquiry</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
