import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, ExternalLink, Quote} from 'lucide-react';
import {CLINIC_INFO, PATIENT_REVIEWS} from '../data/clinicData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = PATIENT_REVIEWS.length;

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const current = PATIENT_REVIEWS[activeIndex];
  const prevReview = PATIENT_REVIEWS[prevIndex];
  const nextReview = PATIENT_REVIEWS[nextIndex];

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);

  return (
    <section
      id="reviews"
      className="py-18 lg:py-26 bg-gradient-to-b from-[#FAF8F5] to-[#FFFFFF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2">
            Patient Reviews
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50]"
            style={{textWrap: 'balance'}}
          >
            What Our{' '}
            <em className="italic font-semibold text-[#159A9C]">
              Hyderabad Patients
            </em>{' '}
            Share
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#243746]/80 leading-relaxed">
            Selected patient review excerpts from visits at Dr. SK Dental
            Clinic.
          </p>
        </div>

        {/* Carousel matching reference aesthetic */}
        <div className="mt-12 relative flex items-center justify-center gap-6">
          {/* Left Flanking Card */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label={`View review by ${prevReview.name}`}
            className="hidden lg:flex flex-col justify-between text-left w-72 min-h-[280px] rounded-3xl bg-white border border-[#153B50]/10 p-6 opacity-50 hover:opacity-80 transition-opacity cursor-pointer shrink-0 blur-[0.4px] hover:blur-none"
          >
            <div>
              <Quote className="w-6 h-6 text-[#159A9C]/40 mb-3" aria-hidden="true" />
              <p className="text-sm text-[#243746]/80 line-clamp-5 leading-relaxed">
                “{prevReview.text}”
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#153B50]/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E9F6F3] text-[#153B50] text-xs font-bold flex items-center justify-center shrink-0">
                {prevReview.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#153B50] truncate">
                  {prevReview.name}
                </p>
                <p className="text-xs text-[#243746]/65 truncate">
                  {prevReview.treatmentContext}
                </p>
              </div>
            </div>
          </button>

          {/* Active Featured Teal Card */}
          <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-[#159A9C] to-[#0E747B] text-white p-8 sm:p-10 shadow-[0_24px_55px_rgba(21,59,80,0.20)] flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <Quote className="w-9 h-9 text-[#C7A76C]" aria-hidden="true" />
                <span className="text-xs font-medium text-[#E9F6F3]/90">
                  Selected Google Review Excerpt
                </span>
              </div>

              <blockquote
                className="text-lg sm:text-[1.35rem] font-medium leading-relaxed text-white"
                style={{fontFamily: 'var(--font-heading)'}}
              >
                “{current.text}”
              </blockquote>
            </div>

            <div className="mt-8 pt-5 border-t border-white/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#C7A76C] text-[#153B50] font-bold text-sm flex items-center justify-center shrink-0">
                  {current.initials}
                </div>
                <div>
                  <p className="font-semibold text-base text-white">
                    {current.name}
                  </p>
                  <p className="text-xs text-[#E9F6F3]/85">
                    {current.treatmentContext}
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-[#E9F6F3]/90 tabular-nums">
                {activeIndex + 1} / {total}
              </span>
            </div>
          </div>

          {/* Right Flanking Card */}
          <button
            type="button"
            onClick={handleNext}
            aria-label={`View review by ${nextReview.name}`}
            className="hidden lg:flex flex-col justify-between text-left w-72 min-h-[280px] rounded-3xl bg-white border border-[#153B50]/10 p-6 opacity-50 hover:opacity-80 transition-opacity cursor-pointer shrink-0 blur-[0.4px] hover:blur-none"
          >
            <div>
              <Quote className="w-6 h-6 text-[#159A9C]/40 mb-3" aria-hidden="true" />
              <p className="text-sm text-[#243746]/80 line-clamp-5 leading-relaxed">
                “{nextReview.text}”
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#153B50]/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E9F6F3] text-[#153B50] text-xs font-bold flex items-center justify-center shrink-0">
                {nextReview.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#153B50] truncate">
                  {nextReview.name}
                </p>
                <p className="text-xs text-[#243746]/65 truncate">
                  {nextReview.treatmentContext}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Dots & Google Reviews Link */}
        <div className="mt-9 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous patient review"
              className="w-10 h-10 rounded-full border border-[#153B50]/20 bg-white text-[#153B50] flex items-center justify-center hover:bg-[#153B50] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {PATIENT_REVIEWS.map((review, idx) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show review ${idx + 1} by ${review.name}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'w-7 bg-[#153B50]'
                      : 'w-2.5 bg-[#153B50]/25 hover:bg-[#159A9C]'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next patient review"
              className="w-10 h-10 rounded-full border border-[#153B50]/20 bg-white text-[#153B50] flex items-center justify-center hover:bg-[#153B50] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#153B50]/25 bg-white text-[#153B50] text-sm font-semibold hover:border-[#159A9C] hover:text-[#159A9C] transition-colors whitespace-nowrap"
          >
            <span>READ MORE GOOGLE REVIEWS</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>

          <p className="text-xs text-[#243746]/65 text-center max-w-lg">
            Displayed quotes are selected patient review excerpts. Full clinic
            reviews can be viewed on Google Maps.
          </p>
        </div>
      </div>
    </section>
  );
};
