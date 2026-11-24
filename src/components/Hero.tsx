import React from 'react';
import {ArrowRight, Check, ShieldCheck} from 'lucide-react';
import {IMAGES} from '../data/clinicData';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

const SUPPORTING_POINTS = [
  'Comprehensive Dental Treatments',
  'Patient-Centred Care',
  'Modern Dental Facilities',
  'Care for Children & Adults',
];

export const Hero: React.FC<HeroProps> = ({onBookClick, onExploreServices}) => {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#E9F6F3]/85 overflow-hidden"
    >
      {/* Soft Radial Architectural Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-[#159A9C]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 -left-24 w-[380px] h-[380px] rounded-full bg-[#C7A76C]/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-3">
              Dr. SK Dental Clinic · Hyderabad, Telangana
            </p>

            <h1
              className="text-[2.45rem] sm:text-[3.1rem] lg:text-[3.65rem] font-bold text-[#153B50] leading-[1.1] tracking-tight"
              style={{textWrap: 'balance'}}
            >
              Your Smile Deserves{' '}
              <em className="italic font-semibold text-[#159A9C]">
                Expert Care.
              </em>
            </h1>

            <p className="mt-5 text-base sm:text-[17px] text-[#243746]/85 leading-relaxed max-w-xl">
              Personalized dental care, modern treatment solutions and a
              comfortable experience for every smile.
            </p>

            {/* Supporting Points */}
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3.5 max-w-xl">
              {SUPPORTING_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-sm font-semibold text-[#153B50]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#E9F6F3] border border-[#159A9C]/30 text-[#159A9C] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" strokeWidth={2.75} aria-hidden="true" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Primary & Secondary CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C7A76C] text-[#153B50] font-bold text-sm tracking-wide hover:bg-[#b89557] transition-all duration-150 shadow-[0_10px_24px_rgba(199,167,108,0.34)] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>BOOK AN APPOINTMENT</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#153B50]/25 bg-white/90 text-[#153B50] font-semibold text-sm tracking-wide hover:border-[#159A9C] hover:text-[#159A9C] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                EXPLORE OUR SERVICES
              </button>
            </div>

            <div className="mt-7 pt-5 border-t border-[#153B50]/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#243746]/75">
              <span>
                Lead Dentist:{' '}
                <strong className="font-semibold text-[#153B50]">
                  Dr. Safreena Khathun
                </strong>
              </span>
              <span aria-hidden="true" className="text-[#C7A76C]">·</span>
              <span>Healthy Smiles. Confident Lives.</span>
            </div>
          </div>

          {/* Right Column: Layered Luxury Clinic Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-[#E9F6F3] border border-[#153B50]/10 aspect-[4/3] lg:aspect-[5/4.1] shadow-[0_24px_60px_rgba(21,59,80,0.14)]">
              <img
                src={IMAGES.heroConsultation}
                alt="Dr. Safreena Khathun consulting a patient in a bright modern dental clinic"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#153B50]/85 via-[#153B50]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="flex items-center gap-3 text-white">
                  <ShieldCheck
                    className="w-5 h-5 text-[#C7A76C] shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm sm:text-[15px] font-medium leading-snug">
                    Unhurried consultations, clear treatment explanations, and calm
                    clinical hygiene.
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle Secondary Inset Card (Desktop) */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 w-44 rounded-2xl overflow-hidden border-4 border-white shadow-[0_14px_30px_rgba(21,59,80,0.18)] bg-white">
              <div className="aspect-[4/3] overflow-hidden bg-[#E9F6F3]">
                <img
                  src={IMAGES.dentalChair}
                  alt="Modern sterilized dental operatory chair"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-3 py-2 bg-white">
                <p className="text-[11px] font-semibold text-[#153B50] leading-tight">
                  Modern Operatories
                </p>
                <p className="text-[10px] text-[#159A9C] mt-0.5">
                  Hyderabad Clinic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Information Strip */}
      <div className="bg-gradient-to-r from-[#153B50] via-[#14586A] to-[#159A9C] text-white border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p
            className="text-lg sm:text-xl font-semibold text-white tracking-tight"
            style={{fontFamily: 'var(--font-heading)'}}
          >
            Your Family’s Dental Care Partner in Hyderabad.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-[#E9F6F3]/95 font-medium">
            <span>Preventive &amp; Diagnostic</span>
            <span aria-hidden="true" className="text-[#C7A76C]">·</span>
            <span>Restorative &amp; Cosmetic</span>
            <span aria-hidden="true" className="text-[#C7A76C]">·</span>
            <span>Orthodontics &amp; Implants</span>
            <span aria-hidden="true" className="text-[#C7A76C]">·</span>
            <span>Pediatric &amp; Emergency</span>
          </div>
        </div>
      </div>
    </section>
  );
};
