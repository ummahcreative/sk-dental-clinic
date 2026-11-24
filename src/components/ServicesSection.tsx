import React, {useEffect, useState} from 'react';
import {
  ArrowRight,
  Check,
  HeartPulse,
  Microscope,
  Shield,
  Smile,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import {motion} from 'motion/react';
import {SERVICE_CATEGORIES, ServiceCategory} from '../data/clinicData';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'preventive-diagnostic': <Microscope className="w-5 h-5" aria-hidden="true" />,
  'restorative-dentistry': <Shield className="w-5 h-5" aria-hidden="true" />,
  'cosmetic-dentistry': <Sparkles className="w-5 h-5" aria-hidden="true" />,
  orthodontics: <Smile className="w-5 h-5" aria-hidden="true" />,
  'oral-surgery-implants': <Stethoscope className="w-5 h-5" aria-hidden="true" />,
  'specialized-dental-care': <HeartPulse className="w-5 h-5" aria-hidden="true" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({onBookService}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null);

  useEffect(() => {
    if (!activeCategory) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategory(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeCategory]);

  return (
    <section
      id="treatments"
      className="py-18 lg:py-26 bg-gradient-to-b from-[#E9F6F3]/85 to-[#E9F6F3]/45"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2">
              Our Dental Services in Hyderabad
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50] leading-[1.15]"
              style={{textWrap: 'balance'}}
            >
              Complete Dental Care —{' '}
              <em className="italic font-semibold text-[#159A9C]">
                All Under One Roof
              </em>
            </h2>
          </div>

          <div className="max-w-md flex flex-col sm:items-start lg:items-end gap-3.5">
            <p className="text-sm sm:text-[15px] text-[#243746]/80 leading-relaxed lg:text-right">
              From routine checkups and cleanings to restorative, cosmetic,
              orthodontic, and implant assessments explained clearly before care
              begins.
            </p>
            <button
              type="button"
              onClick={() => onBookService('General Consultation')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C7A76C] text-[#153B50] text-sm font-bold hover:bg-[#b89557] transition-colors cursor-pointer whitespace-nowrap shadow-[0_8px_20px_rgba(199,167,108,0.28)]"
            >
              <span>Book An Appointment</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Six Service Category Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICE_CATEGORIES.map((category, idx) => (
            <motion.article
              key={category.id}
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 'some'}}
              transition={{duration: 0.4, delay: (idx % 3) * 0.06}}
              className="group flex flex-col rounded-3xl bg-white border border-[#153B50]/10 overflow-hidden clinic-card-shadow hover:clinic-card-shadow-hover transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10.5] bg-[#153B50] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#153B50]/95 via-[#153B50]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-[#E9F6F3]/90">
                      {category.shortTag}
                    </p>
                    <h3 className="text-xl font-bold text-white leading-snug mt-0.5">
                      {category.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[#C7A76C] flex items-center justify-center shrink-0">
                    {CATEGORY_ICONS[category.id]}
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-[#243746]/85 leading-relaxed">
                    {category.description}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-[#153B50]/10 pt-4">
                    {category.procedures.map((proc) => (
                      <li
                        key={proc}
                        className="flex items-start gap-2 text-[13px] text-[#243746]"
                      >
                        <Check
                          className="w-3.5 h-3.5 text-[#159A9C] mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#153B50]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#153B50] hover:text-[#159A9C] transition-colors cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookService(category.defaultBookingService)}
                    className="text-xs font-semibold text-[#159A9C] hover:text-[#153B50] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Treatment Details Modal */}
      {activeCategory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#153B50]/70 backdrop-blur-sm"
          onClick={() => setActiveCategory(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-[#153B50]/15 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-56 bg-[#153B50] shrink-0">
              <img
                src={activeCategory.image}
                alt={activeCategory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#153B50]/95 via-[#153B50]/35 to-transparent" />
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                aria-label="Close treatment details"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-[#153B50] flex items-center justify-center hover:bg-white transition-colors shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6">
                <p className="text-xs font-medium text-[#E9F6F3]">
                  {activeCategory.shortTag}
                </p>
                <h3
                  id="service-modal-title"
                  className="text-2xl sm:text-3xl font-bold text-white mt-0.5"
                >
                  {activeCategory.title}
                </h3>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <p className="text-[15px] text-[#243746] leading-relaxed">
                {activeCategory.description}
              </p>

              <div className="rounded-2xl bg-[#FAF8F5] border border-[#153B50]/10 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#159A9C] mb-1.5">
                  Clinical Approach
                </p>
                <p className="text-sm text-[#243746]/85 leading-relaxed">
                  {activeCategory.consultationNote}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#153B50] mb-3">
                  Treatments &amp; Assessments Included
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeCategory.procedures.map((proc) => (
                    <li
                      key={proc}
                      className="flex items-start gap-2.5 text-sm text-[#243746] bg-[#E9F6F3]/65 rounded-xl px-3.5 py-2.5"
                    >
                      <Check
                        className="w-4 h-4 text-[#159A9C] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 bg-[#FAF8F5] border-t border-[#153B50]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <p className="text-xs text-[#243746]/70">
                Final treatment suitability is determined after an in-clinic evaluation.
              </p>
              <button
                type="button"
                onClick={() => {
                  const chosen = activeCategory.defaultBookingService;
                  setActiveCategory(null);
                  onBookService(chosen);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#C7A76C] text-[#153B50] text-sm font-bold hover:bg-[#b89557] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Request Appointment</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
