import React, {useState} from 'react';
import {ArrowRight, ChevronDown} from 'lucide-react';
import {FAQ_ITEMS} from '../data/clinicData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-18 lg:py-26 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2">
              Common Questions
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50] leading-[1.15]"
              style={{textWrap: 'balance'}}
            >
              Frequently Asked{' '}
              <em className="italic font-semibold text-[#159A9C]">
                Questions
              </em>
            </h2>
            <p className="mt-4 text-base text-[#243746]/80 leading-relaxed">
              Clear, patient-friendly answers about booking appointments,
              treatments, and visiting Dr. SK Dental Clinic in Hyderabad.
            </p>

            <div className="mt-7 rounded-2xl bg-[#FAF8F5] border border-[#153B50]/10 p-6">
              <p className="text-sm font-semibold text-[#153B50]">
                Still have a specific dental question?
              </p>
              <p className="text-xs text-[#243746]/75 mt-1.5 leading-relaxed">
                Send us an enquiry or request a consultation and our team will
                be glad to help.
              </p>
              <a
                href="#book-appointment"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#159A9C] hover:text-[#153B50] transition-colors"
              >
                <span>Request an Appointment</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? 'bg-[#E9F6F3]/65 border-[#159A9C]/40'
                      : 'bg-[#FAF8F5] border-[#153B50]/10 hover:border-[#153B50]/20'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base font-semibold text-[#153B50]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#159A9C] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-panel-${item.id}`}
                      className="px-6 pb-5 pt-0 text-sm sm:text-[15px] text-[#243746]/85 leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
