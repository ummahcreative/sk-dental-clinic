import React, {useState} from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
} from 'lucide-react';
import {CLINIC_INFO} from '../data/clinicData';

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

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSentMessage(null);

    if (name.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }

    const validPhone = normalizeIndianMobile(phone);
    if (!validPhone) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (message.trim().length < 5) {
      setError('Please write your message or question.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name.trim(),
          phone: validPhone,
          email: email.trim(),
          subject,
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Could not send message.');
        return;
      }

      setSentMessage(
        data.message ||
          'Thank you for reaching out. Our clinic team will respond shortly.'
      );
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch {
      setError('Unable to send message right now. Please try again shortly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-18 lg:py-26 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2">
            Location &amp; Contact
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50]"
            style={{textWrap: 'balance'}}
          >
            Visit{' '}
            <em className="italic font-semibold text-[#159A9C]">
              Dr. SK Dental Clinic
            </em>
          </h2>
          <p className="mt-3 text-base text-[#243746]/80 leading-relaxed">
            Located in Hyderabad, Telangana, India. Reach out for clinic
            directions, general queries, or follow-up guidance.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Clinic Contact Details + Map Placeholder */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="rounded-3xl bg-white border border-[#153B50]/10 p-6 sm:p-8 space-y-5 clinic-card-shadow">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E9F6F3] text-[#159A9C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#153B50]">
                    Clinic Address
                  </h3>
                  <p className="text-sm text-[#243746]/85 mt-1">
                    {CLINIC_INFO.placeholders.addressDisplay}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#153B50]/10">
                <a
                  href={CLINIC_INFO.placeholders.phoneHref}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E9F6F3] text-[#153B50] group-hover:bg-[#159A9C] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#153B50]">
                      Phone Number
                    </p>
                    <p className="text-xs text-[#243746]/80 mt-0.5 break-words">
                      {CLINIC_INFO.placeholders.phoneDisplay}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E9F6F3] text-[#153B50] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#153B50]">
                      WhatsApp Number
                    </p>
                    <p className="text-xs text-[#243746]/80 mt-0.5 break-words">
                      {CLINIC_INFO.placeholders.whatsappDisplay}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#153B50]/10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E9F6F3] text-[#153B50] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#153B50]">
                      Clinic Email
                    </p>
                    <p className="text-xs text-[#243746]/80 mt-0.5 break-words">
                      {CLINIC_INFO.placeholders.emailDisplay}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#153B50]">
                    Clinic Timings
                  </p>
                  <p className="text-xs text-[#243746]/80 mt-0.5">
                    {CLINIC_INFO.placeholders.timingsDisplay}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Placeholder & Exact Get Directions Button */}
            <div className="flex-1 rounded-3xl bg-[#E9F6F3] border border-[#159A9C]/25 p-6 sm:p-7 flex flex-col justify-between min-h-[240px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#159A9C]">
                    Google Maps Location
                  </p>
                  <h3 className="text-xl font-bold text-[#153B50] mt-1">
                    Dr. SK Dental Clinic — Hyderabad, Telangana
                  </h3>
                  <p className="text-sm text-[#243746]/80 mt-1.5 max-w-md">
                    Google Maps embed placeholder. Use the verified directions
                    button below to open our clinic pin directly in Google Maps.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-white text-[#153B50] flex items-center justify-center shadow-xs shrink-0">
                  <Navigation className="w-5 h-5 text-[#159A9C]" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#153B50]/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-medium text-[#243746]/70">
                  Hyderabad, Telangana, India
                </span>

                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#153B50] text-white text-sm font-semibold hover:bg-[#159A9C] transition-colors whitespace-nowrap"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-6">
            <div className="h-full rounded-3xl bg-white border border-[#153B50]/10 p-6 sm:p-8 lg:p-9 clinic-card-shadow">
              <h3 className="text-2xl font-bold text-[#153B50]">
                Send Us a Message
              </h3>
              <p className="text-sm text-[#243746]/75 mt-1">
                Have a question about treatments, clinic location, or visiting
                with family? Write to us below.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2.5 text-sm text-red-800"
                  >
                    <AlertCircle
                      className="w-4 h-4 mt-0.5 shrink-0 text-red-600"
                      aria-hidden="true"
                    />
                    <span>{error}</span>
                  </div>
                )}

                {sentMessage && (
                  <div
                    role="status"
                    className="rounded-xl bg-[#E9F6F3] border border-[#159A9C]/30 px-4 py-3 flex items-start gap-2.5 text-sm text-[#153B50]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 shrink-0 text-[#159A9C]"
                      aria-hidden="true"
                    />
                    <span>{sentMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#153B50] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] focus:bg-white focus:border-[#159A9C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#153B50] mb-1.5"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit Indian mobile"
                      className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] tabular-nums focus:bg-white focus:border-[#159A9C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#153B50] mb-1.5"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] focus:bg-white focus:border-[#159A9C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold text-[#153B50] mb-1.5"
                    >
                      Enquiry Topic
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] focus:bg-white focus:border-[#159A9C]"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Treatment Information">
                        Treatment Information
                      </option>
                      <option value="Directions & Timings">
                        Directions &amp; Timings
                      </option>
                      <option value="Follow-up Question">
                        Follow-up Question
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#153B50] mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our dental team assist you?"
                    className="w-full rounded-xl border border-[#153B50]/20 bg-[#F7FAFC] px-3.5 py-2.5 text-sm text-[#243746] focus:bg-white focus:border-[#159A9C]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#153B50] text-white text-sm font-semibold hover:bg-[#159A9C] disabled:opacity-60 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
