import React from 'react';
import {Calendar, UserRound} from 'lucide-react';
import {motion} from 'motion/react';
import {DOCTORS, DoctorProfile} from '../data/clinicData';

interface DoctorsSectionProps {
  onBookDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({onBookDoctor}) => {
  const handleSelectDoctor = (doc: DoctorProfile) => {
    onBookDoctor(doc.name);
  };

  return (
    <section id="doctors" className="py-18 lg:py-26 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2">
              Our Clinical Team
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50]"
              style={{textWrap: 'balance'}}
            >
              Meet{' '}
              <em className="italic font-semibold text-[#159A9C]">
                Our Doctors
              </em>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#243746]/80 max-w-md leading-relaxed">
            Dedicated dental professionals committed to attentive evaluation,
            clear guidance, and gentle care.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
          {DOCTORS.map((doc, idx) => (
            <motion.article
              key={doc.id}
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 'some'}}
              transition={{duration: 0.4, delay: idx * 0.06}}
              className="group flex flex-col rounded-3xl bg-white border border-[#153B50]/10 overflow-hidden clinic-card-shadow hover:clinic-card-shadow-hover transition-all duration-200 hover:-translate-y-1"
            >
              {/* Portrait Frame */}
              <div className="relative aspect-[4/4.3] bg-[#E9F6F3] overflow-hidden">
                {doc.photo ? (
                  <>
                    <img
                      src={doc.photo}
                      alt={`${doc.name}, ${doc.designation} at Dr. SK Dental Clinic`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#153B50]/70 to-transparent" />
                    <p className="absolute bottom-3.5 left-5 text-xs font-semibold uppercase tracking-wider text-[#E9F6F3]">
                      {doc.designation}
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#E9F6F3] via-[#F2FAF8] to-[#DCEEE9]">
                    <div className="w-20 h-20 rounded-full bg-white border border-[#159A9C]/25 flex items-center justify-center text-[#153B50] shadow-sm">
                      <UserRound
                        className="w-10 h-10 text-[#159A9C]"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#153B50]">
                      Doctor Portrait Placeholder
                    </p>
                    <p className="mt-1 text-xs text-[#243746]/70 max-w-[220px]">
                      Verified photograph &amp; credentials will be added here.
                    </p>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  {doc.isPlaceholder && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#159A9C] mb-1">
                      {doc.designation}
                    </p>
                  )}
                  <h3 className="text-2xl font-bold text-[#153B50]">
                    {doc.name}
                  </h3>

                  <dl className="mt-4 space-y-3 text-sm border-t border-[#153B50]/10 pt-4">
                    <div>
                      <dt className="text-xs font-medium text-[#243746]/65">
                        Qualifications
                      </dt>
                      <dd className="text-[#243746] font-medium mt-0.5">
                        {doc.qualifications}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#243746]/65">
                        Specialization
                      </dt>
                      <dd className="text-[#153B50] font-semibold mt-0.5">
                        {doc.specialization}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 pt-5 border-t border-[#153B50]/10">
                  <button
                    type="button"
                    onClick={() => handleSelectDoctor(doc)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#153B50] text-white text-sm font-semibold hover:bg-[#159A9C] transition-colors duration-150 cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
