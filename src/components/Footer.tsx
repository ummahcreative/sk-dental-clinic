import React, {useEffect, useState} from 'react';
import {
  Calendar,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  X,
} from 'lucide-react';
import {CLINIC_INFO, SERVICE_CATEGORIES} from '../data/clinicData';
import {Logo} from './Logo';

interface FooterProps {
  onOpenStaffPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({onOpenStaffPortal}) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    if (!legalModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLegalModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [legalModal]);

  return (
    <footer className="bg-[#153B50] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" />
            <p className="text-sm text-[#E9F6F3]/80 leading-relaxed max-w-sm">
              Led by Dr. Safreena Khathun in Hyderabad, Telangana. Providing
              preventive, restorative, cosmetic, orthodontic, and family-friendly
              dental care.
            </p>
            <p className="text-xs font-medium text-[#C7A76C]">
              “{CLINIC_INFO.tagline}”
            </p>

            {/* Social Placeholders */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CLINIC_INFO.placeholders.instagramUrl}
                aria-label="Instagram (Placeholder)"
                title="Instagram Placeholder"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#159A9C] flex items-center justify-center text-white transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={CLINIC_INFO.placeholders.facebookUrl}
                aria-label="Facebook (Placeholder)"
                title="Facebook Placeholder"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#159A9C] flex items-center justify-center text-white transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E9F6F3]/80">
              <li>
                <a href="#home" className="hover:text-[#C7A76C] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C7A76C] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-[#C7A76C] transition-colors">
                  Our Doctors
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#C7A76C] transition-colors">
                  Patient Reviews
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C7A76C] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C7A76C] transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Dental Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">
              Dental Services
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E9F6F3]/80">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#treatments"
                    className="hover:text-[#C7A76C] transition-colors"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Appointment */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white">
              Contact &amp; Directions
            </h3>

            <div className="space-y-2.5 text-sm text-[#E9F6F3]/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C7A76C] mt-1 shrink-0" aria-hidden="true" />
                <span>{CLINIC_INFO.placeholders.addressDisplay}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C7A76C] shrink-0" aria-hidden="true" />
                <span>{CLINIC_INFO.placeholders.phoneDisplay}</span>
              </p>
            </div>

            <div className="pt-1 flex flex-col gap-2.5">
              <a
                href="#book-appointment"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C7A76C] text-[#153B50] text-sm font-bold hover:bg-[#b89557] transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Book Appointment</span>
              </a>

              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E9F6F3]/75">
          <p>© 2026 Dr. SK Dental Clinic. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <button
              type="button"
              onClick={onOpenStaffPortal}
              className="hover:text-[#C7A76C] transition-colors cursor-pointer"
            >
              Clinic Staff Desk
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy / Terms Modal */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2533]/75 backdrop-blur-sm"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white text-[#243746] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-[#E9F6F3] border-b border-[#153B50]/10 flex items-center justify-between">
              <h3 id="legal-modal-title" className="text-lg font-bold text-[#153B50]">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full bg-white text-[#153B50] flex items-center justify-center hover:bg-[#153B50] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-sm text-[#243746]/85 space-y-3 leading-relaxed max-h-[70vh] overflow-y-auto">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Dr. SK Dental Clinic respects your privacy. Personal details
                    submitted through our appointment request or contact forms
                    (such as name, phone number, WhatsApp number, email, and
                    dental concern notes) are used solely to coordinate your
                    consultation and respond to your enquiries.
                  </p>
                  <p>
                    We do not sell or rent patient enquiry details to third
                    parties. Please avoid sharing sensitive diagnostic reports
                    unless requested directly by our clinical team.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Information provided on this website—including treatment
                    descriptions and oral care articles—is for general patient
                    education and does not substitute for an in-person dental
                    examination or diagnosis.
                  </p>
                  <p>
                    Online appointment submissions represent consultation
                    requests and are confirmed only after our clinic staff
                    contacts you to verify your slot.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
