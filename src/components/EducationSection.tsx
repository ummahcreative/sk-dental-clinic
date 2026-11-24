import React, {useEffect, useState} from 'react';
import {ArrowRight, BookOpen, CheckCircle2, X} from 'lucide-react';
import {motion} from 'motion/react';
import {EDUCATION_ARTICLES, EducationArticle} from '../data/clinicData';

interface EducationSectionProps {
  onBookClick: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  onBookClick,
}) => {
  const [selectedArticle, setSelectedArticle] =
    useState<EducationArticle | null>(null);

  useEffect(() => {
    if (!selectedArticle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedArticle]);

  return (
    <section className="py-18 lg:py-26 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2">
              Patient Education
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50]"
              style={{textWrap: 'balance'}}
            >
              A Little Care{' '}
              <em className="italic font-semibold text-[#159A9C]">
                Goes a Long Way
              </em>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#243746]/80 max-w-md leading-relaxed">
            Practical everyday guidance to help you and your family protect
            your teeth and gums between visits.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
          {EDUCATION_ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 'some'}}
              transition={{duration: 0.35, delay: idx * 0.06}}
              className="flex flex-col justify-between rounded-3xl bg-white border border-[#153B50]/10 p-7 clinic-card-shadow hover:clinic-card-shadow-hover transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#243746]/65 font-medium">
                  <span>0{idx + 1}. Oral Care Guide</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="mt-3.5 text-2xl font-bold text-[#153B50] leading-snug">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm text-[#243746]/80 leading-relaxed">
                  {article.summary}
                </p>

                <ul className="mt-5 pt-4 border-t border-[#153B50]/10 space-y-2.5">
                  {article.tips.slice(0, 2).map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2.5 text-[13px] text-[#243746]"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#159A9C] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#153B50]/10">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#153B50] hover:text-[#159A9C] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#153B50]/70 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-[#153B50]/15 overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 bg-[#E9F6F3] border-b border-[#153B50]/10 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#159A9C]">
                  Patient Education · {selectedArticle.readTime}
                </p>
                <h3
                  id="article-modal-title"
                  className="text-2xl font-bold text-[#153B50] mt-1"
                >
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article"
                className="w-9 h-9 rounded-full bg-white text-[#153B50] flex items-center justify-center hover:bg-[#153B50] hover:text-white transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {selectedArticle.paragraphs.map((para) => (
                <p
                  key={para}
                  className="text-[15px] text-[#243746]/90 leading-relaxed"
                >
                  {para}
                </p>
              ))}

              <div className="rounded-2xl bg-[#FAF8F5] border border-[#153B50]/10 p-5 mt-2">
                <h4 className="text-sm font-semibold text-[#153B50] mb-3">
                  Practical Key Takeaways
                </h4>
                <ul className="space-y-2.5">
                  {selectedArticle.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2.5 text-sm text-[#243746]"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#159A9C] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#153B50]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-[#243746]/70">
                Educational guidance only; consult a dentist for personalized evaluation.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedArticle(null);
                  onBookClick();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#C7A76C] text-[#153B50] text-sm font-bold hover:bg-[#b89557] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Schedule a Checkup</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
