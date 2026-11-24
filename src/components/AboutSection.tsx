import React from 'react';
import {motion} from 'motion/react';
import {IMAGES} from '../data/clinicData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-18 lg:py-26 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Prose */}
          <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 'some'}}
            transition={{duration: 0.45}}
            className="lg:col-span-6"
          >
            <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2.5">
              About Dr. SK Dental Clinic
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50] leading-[1.16]"
              style={{textWrap: 'balance'}}
            >
              Welcome to{' '}
              <em className="italic font-semibold text-[#159A9C]">
                Dr. SK Dental Clinic
              </em>
            </h2>

            <div className="mt-6 space-y-4 text-[15px] sm:text-base text-[#243746]/85 leading-relaxed">
              <p>
                At Dr. SK Dental Clinic, we believe every patient deserves
                attentive dental care and a healthy, confident smile.
              </p>
              <p>
                Led by{' '}
                <strong className="font-semibold text-[#153B50]">
                  Dr. Safreena Khathun
                </strong>
                , our clinic offers a range of dental treatments, from routine
                preventive care to restorative, cosmetic and specialized dental
                procedures.
              </p>
              <p>
                We focus on understanding each patient’s concerns, explaining
                treatment options clearly and helping patients make informed
                decisions about their oral health.
              </p>
              <p>
                Our goal is to make dental visits comfortable, informative and
                patient-friendly.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#153B50]/10 grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#159A9C]">
                  Lead Dentist
                </p>
                <p className="text-base font-semibold text-[#153B50] mt-1">
                  Dr. Safreena Khathun
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#159A9C]">
                  Location
                </p>
                <p className="text-base font-semibold text-[#153B50] mt-1">
                  Hyderabad, Telangana
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Curated Photography Grid */}
          <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 'some'}}
            transition={{duration: 0.45, delay: 0.08}}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch"
          >
            <div className="sm:col-span-2 rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#153B50]/10 aspect-[16/10] clinic-card-shadow">
              <img
                src={IMAGES.clinicReception}
                alt="Welcoming and hygienic reception lounge at Dr. SK Dental Clinic"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#153B50]/10 aspect-[4/3] clinic-card-shadow">
              <img
                src={IMAGES.teamCare}
                alt="Dentist explaining oral care with a dental model to parent and child"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#153B50] to-[#134D5E] text-white p-6 flex flex-col justify-between clinic-card-shadow">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#C7A76C]">
                  Our Promise
                </p>
                <p
                  className="mt-2.5 text-xl font-semibold text-white leading-snug italic"
                  style={{fontFamily: 'var(--font-heading)'}}
                >
                  “Healthy Smiles. Confident Lives.”
                </p>
              </div>
              <p className="mt-4 text-sm text-[#E9F6F3]/85 leading-relaxed">
                Clean clinical standards, unhurried conversations, and respectful
                care for every generation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
