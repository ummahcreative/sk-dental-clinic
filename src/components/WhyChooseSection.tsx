import React from 'react';
import {
  ClipboardCheck,
  HeartHandshake,
  Layers,
  MessageSquareText,
  ScanLine,
  Users,
} from 'lucide-react';
import {motion} from 'motion/react';
import {WHY_CHOOSE_ITEMS} from '../data/clinicData';

const ICONS: Record<string, React.ReactNode> = {
  'patient-focused': <HeartHandshake className="w-5 h-5" aria-hidden="true" />,
  'clear-explanations': <MessageSquareText className="w-5 h-5" aria-hidden="true" />,
  'comprehensive-services': <Layers className="w-5 h-5" aria-hidden="true" />,
  'diagnostic-support': <ScanLine className="w-5 h-5" aria-hidden="true" />,
  'comfortable-environment': <ClipboardCheck className="w-5 h-5" aria-hidden="true" />,
  'all-age-groups': <Users className="w-5 h-5" aria-hidden="true" />,
};

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-18 lg:py-26 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2">
            Our Practice Values
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50]"
            style={{textWrap: 'balance'}}
          >
            Why Choose{' '}
            <em className="italic font-semibold text-[#159A9C]">
              Dr. SK Dental Clinic?
            </em>
          </h2>
          <p className="mt-3 text-base text-[#243746]/80 leading-relaxed">
            Built around clear communication, modern clinical assessment, and a
            calm experience for patients of all ages.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 'some'}}
              transition={{duration: 0.35, delay: (idx % 3) * 0.05}}
              className="group rounded-3xl bg-[#FAF8F5] border border-[#153B50]/10 p-7 hover:bg-[#E9F6F3]/65 hover:border-[#159A9C]/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#159A9C]/25 text-[#159A9C] flex items-center justify-center shadow-xs group-hover:bg-[#153B50] group-hover:text-white transition-colors">
                  {ICONS[item.id]}
                </div>
                <span
                  className="text-2xl font-bold italic text-[#C7A76C]/80 tabular-nums"
                  style={{fontFamily: 'var(--font-heading)'}}
                >
                  0{idx + 1}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#153B50]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm text-[#243746]/80 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
