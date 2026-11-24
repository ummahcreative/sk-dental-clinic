import React, {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, Expand, X} from 'lucide-react';
import {motion} from 'motion/react';
import {GALLERY_ITEMS} from '../data/clinicData';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const activeItem =
    lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-18 lg:py-26 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#159A9C] tracking-wide mb-2">
              Inside Our Clinic
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#153B50]"
              style={{textWrap: 'balance'}}
            >
              Dental Clinic{' '}
              <em className="italic font-semibold text-[#159A9C]">Gallery</em>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#243746]/80 max-w-md leading-relaxed">
            Explore our reception, operatories, diagnostic tools, and
            consultation rooms. Click any photo to enlarge.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 'some'}}
              transition={{duration: 0.35, delay: (idx % 3) * 0.05}}
              onClick={() => setLightboxIndex(idx)}
              className="group relative text-left rounded-3xl overflow-hidden bg-[#E9F6F3] border border-[#153B50]/10 aspect-[4/3] clinic-card-shadow hover:clinic-card-shadow-hover transition-shadow cursor-pointer focus-visible:ring-2 focus-visible:ring-[#159A9C]"
            >
              <img
                src={item.image}
                alt={`${item.title} — ${item.caption}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#153B50]/90 via-[#153B50]/20 to-transparent" />
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#153B50] flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity shadow-sm">
                <Expand className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-medium text-[#E9F6F3]/90">
                  {item.category}
                </p>
                <p
                  className="text-xl font-bold text-white mt-0.5"
                  style={{fontFamily: 'var(--font-heading)'}}
                >
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery preview: ${activeItem.title}`}
          className="fixed inset-0 z-50 bg-[#0D2533]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white mb-3 px-1">
              <div>
                <p className="text-xs text-[#E9F6F3]/80">{activeItem.category}</p>
                <h3 className="text-xl font-semibold">{activeItem.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#E9F6F3]/80 tabular-nums">
                  {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close gallery lightbox"
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative w-full rounded-3xl overflow-hidden bg-[#153B50] border border-white/15 aspect-[16/10]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + GALLERY_ITEMS.length) %
                      GALLERY_ITEMS.length
                  )
                }
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#153B50]/85 hover:bg-[#159A9C] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)
                }
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#153B50]/85 hover:bg-[#159A9C] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <p className="mt-3 text-sm text-[#E9F6F3]/90 text-center max-w-2xl">
              {activeItem.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
