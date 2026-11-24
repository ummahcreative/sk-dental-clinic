import React, {useEffect, useState} from 'react';
import {ArrowRight, Menu, MessageCircle, X} from 'lucide-react';
import {Logo} from './Logo';

interface HeaderProps {
  onBookClick: () => void;
  whatsappHref: string;
}

const NAV_LINKS = [
  {label: 'Home', href: '#home'},
  {label: 'About Us', href: '#about'},
  {label: 'Our Doctors', href: '#doctors'},
  {label: 'Treatments', href: '#treatments'},
  {label: 'Patient Reviews', href: '#reviews'},
  {label: 'Gallery', href: '#gallery'},
  {label: 'Contact', href: '#contact'},
];

export const Header: React.FC<HeaderProps> = ({onBookClick, whatsappHref}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {/* Subtle Non-Sticky Clinic Utility Ribbon (Desktop) */}
      <div className="hidden lg:block bg-[#153B50] text-[#E9F6F3] text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-9 flex items-center justify-between">
          <p className="font-medium tracking-wide">
            Family &amp; Comprehensive Dentistry in Hyderabad, Telangana ·
            Healthy Smiles. Confident Lives.
          </p>
          <p className="text-[#C7A76C] font-medium">
            Lead Dentist: Dr. Safreena Khathun
          </p>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_28px_rgba(21,59,80,0.08)] border-b border-[#153B50]/10'
            : 'bg-white/95 backdrop-blur-sm border-b border-[#153B50]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[74px] flex items-center justify-between gap-4 lg:gap-8">
          <a
            href="#home"
            aria-label="Dr. SK Dental Clinic Home"
            className="shrink-0 focus-visible:rounded-lg"
          >
            <Logo variant="light" compact />
          </a>

          {/* Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-6 text-[14px] font-medium text-[#243746]"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1.5 whitespace-nowrap shrink-0 text-[#243746] hover:text-[#159A9C] transition-colors duration-150 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#C7A76C] hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Appointment Enquiry"
              title="WhatsApp Enquiry"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#159A9C]/30 bg-[#E9F6F3] text-[#153B50] hover:bg-[#159A9C] hover:text-white transition-colors duration-150 shrink-0"
            >
              <MessageCircle className="w-[18px] h-[18px]" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onBookClick}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C7A76C] text-[#153B50] text-sm font-semibold hover:bg-[#b89557] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_4px_14px_rgba(199,167,108,0.32)]"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#153B50]/15 text-[#153B50] hover:bg-[#F7FAFC] transition-colors cursor-pointer shrink-0"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-[#153B50]/10 bg-white px-4 py-4 shadow-xl">
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-[15px] font-medium text-[#243746] hover:bg-[#E9F6F3] hover:text-[#153B50] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-[#153B50]/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onBookClick();
                  }}
                  className="w-full py-3 px-4 rounded-full bg-[#C7A76C] text-[#153B50] text-sm font-semibold hover:bg-[#b89557] transition-colors cursor-pointer"
                >
                  Book Appointment
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
