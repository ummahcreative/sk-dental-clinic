import {useState} from 'react';
import {AboutSection} from './components/AboutSection';
import {AppointmentSection} from './components/AppointmentSection';
import {ContactSection} from './components/ContactSection';
import {DoctorsSection} from './components/DoctorsSection';
import {EducationSection} from './components/EducationSection';
import {FaqSection} from './components/FaqSection';
import {Footer} from './components/Footer';
import {GallerySection} from './components/GallerySection';
import {Header} from './components/Header';
import {Hero} from './components/Hero';
import {ServicesSection} from './components/ServicesSection';
import {StaffPortalModal} from './components/StaffPortalModal';
import {TestimonialsSection} from './components/TestimonialsSection';
import {WhyChooseSection} from './components/WhyChooseSection';
import {CLINIC_INFO} from './data/clinicData';

export default function App() {
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Safreena Khathun');
  const [selectedService, setSelectedService] = useState('General Consultation');
  const [staffOpen, setStaffOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const handleBookClick = () => {
    scrollToSection('book-appointment');
  };

  const handleBookDoctor = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    scrollToSection('book-appointment');
  };

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToSection('book-appointment');
  };

  const whatsappText = encodeURIComponent(
    'Hello Dr. SK Dental Clinic, I would like to enquire about booking a dental appointment in Hyderabad.'
  );
  const whatsappHref = CLINIC_INFO.placeholders.whatsappDigits
    ? `https://wa.me/${CLINIC_INFO.placeholders.whatsappDigits}?text=${whatsappText}`
    : `https://wa.me/?text=${whatsappText}`;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#243746]">
      <Header
        onBookClick={handleBookClick}
        whatsappHref={whatsappHref}
      />

      <main className="flex-1">
        <Hero
          onBookClick={handleBookClick}
          onExploreServices={() => scrollToSection('treatments')}
        />

        <AboutSection />

        <DoctorsSection onBookDoctor={handleBookDoctor} />

        <ServicesSection onBookService={handleBookService} />

        <WhyChooseSection />

        <TestimonialsSection />

        <AppointmentSection
          preselectedDoctor={selectedDoctor}
          preselectedService={selectedService}
        />

        <GallerySection />

        <EducationSection onBookClick={handleBookClick} />

        <FaqSection />

        <ContactSection />
      </main>

      <Footer onOpenStaffPortal={() => setStaffOpen(true)} />

      <StaffPortalModal open={staffOpen} onClose={() => setStaffOpen(false)} />
    </div>
  );
}
