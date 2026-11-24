export interface DoctorProfile {
  id: string;
  name: string;
  designation: string;
  qualifications: string;
  specialization: string;
  photo: string | null;
  isPlaceholder: boolean;
  bio: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortTag: string;
  description: string;
  procedures: string[];
  image: string;
  consultationNote: string;
  defaultBookingService: string;
}

export interface PatientReview {
  id: string;
  name: string;
  initials: string;
  treatmentContext: string;
  text: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
}

export interface EducationArticle {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  tips: string[];
  paragraphs: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CLINIC_INFO = {
  name: 'Dr. SK Dental Clinic',
  leadDentist: 'Dr. Safreena Khathun',
  location: 'Hyderabad, Telangana, India',
  tagline: 'Healthy Smiles. Confident Lives.',
  googleMapsUrl:
    'https://maps.google.com/maps?rlz=1C1GCEA_enAE1193AE1193&sca_esv=88c7d83db6111882&udm&fvr=1&pvq=IiAKGnNlcnZpY2VzIGZvciBkZW50YWwgY2xpbmljEAIYAzK6BkNCQVFBUmdJSWhNSW1NbnEtcm1nbUFNVkZtbHdBeDJlNkRBOUtBRXlzQVFTclFRdllXTnNhejl6WVQxTUptRnBQVVJEYUhOVFJYZHBkV3RmUkRaMVlVTlpRWGhWYlhwVWQwTklXVjltU0RWaldVRkRTVU5EUVVWUlRXaHZRMk15V1NaamJ6MHhKbUZ6WlQweUptZGpiR2xrUFVOcU5FdERVV2xCYVVwWVdVSm9SRjlCVWtsMFFVRjRNa0ZJYm1jNGVFOVBSRXAwWTFjMk9YbG9iMFpoYkY4d01IQTRTRmh3WXpKcFkyUkZjVWRuYldKVVV6bEpjbEJ1WlZCYVVVUjFkRTVYUjJkS00wUlNRVU00VURoSVFWRW1aV2s5V0cwMFJtRTFhV2xKTldKVGQyTnpVRzUwU0VRMlVVMG1iR0ZpWld3OVpuSmxaVjl3YzE5M1pXSnphWFJsSm1OcFpEMURRVUZUZFhkSWEyRkdkWEZLYVdWaGNrbEljVFI0TVd4QlFtaFJiazR3TXpoVldUZEdTWGszV1haQ1NHbEJWbXMxWTI5bVVWTlFTbmh4UzJVME9VbDJXSGRmYVVOWVQyaHBiREE0Y21oaVNXcEROME5LVDJsaE9XOTJVREpRZVVWcWIxUkViRzltVFd0emJWZ3dlWEp6VEhONVlsZENhMEZDUTJ0cFZVcFRTazFUZGpoTFYwVmZkemRCV0hOdU5sUmpla3gzTUc1WmIwUjNiRlE1WWtsc1NVOHhlWEJHVEhkaFEyUnFMV0ZsYWtoS01rNURSMlkyTVdSUWRucFVXVXhEY1VKVVNtcEhTR2szU1c5SFVXRkhORlpQZW5aUlJqY3hlVEJHYTNZMldUUmhhblJXZVhoWmNGQkhPVzFyUkdkT2EwUmpTRmRTVm14WVZFcEVXWGRMSm1OalpUMHlKbU5oZEdWbmIzSjVQV0ZqY21Od1gzWXhYek15Sm5OcFp6MUJUMFEyTkY4eWVHVlFUelpaUXpBeWJHSkJOVE5wTTBOeGMxQlRibUptVjI5QkptRmtkWEpzUFRnQldoY0lBUklUQ0pqSjZ2cTVvSmdERlJacGNBTWRudWd3UFE6JTB4M2JjYjk3MjE2MTRkMDdhZjoweGI4YmE0NDVmOTM3MDc5ZjZKGnNlcnZpY2VzIGZvciBkZW50YWwgY2xpbmljiQH2eXCTX0S6uA',
  placeholders: {
    phoneDisplay: '+91 [Add Clinic Phone Number]',
    phoneHref: 'tel:+910000000000',
    whatsappDisplay: '+91 [Add Clinic WhatsApp Number]',
    whatsappDigits: '',
    emailDisplay: '[Add Clinic Email Address]',
    addressDisplay: '[Add Complete Street Address & Landmark], Hyderabad, Telangana, India',
    timingsDisplay: '[Add Verified Clinic Timings]',
    googleReviewsUrl: '#reviews',
    instagramUrl: '#contact',
    facebookUrl: '#contact',
  },
};

export const IMAGES = {
  heroConsultation: '/src/assets/images/hero_dentist_consultation_1795518881360.jpg',
  drSafreenaPortrait: '/src/assets/images/dr_safreena_portrait_1795518883069.jpg',
  drShireenPortrait: '/src/assets/images/dr_shireen_portrait_1795521079513.jpg',
  drSirajPortrait: '/src/assets/images/dr_siraj_portrait_clean_1795521095896.jpg',
  clinicReception: '/src/assets/images/clinic_reception_1795518883202.jpg',
  treatmentRoom: '/src/assets/images/dental_treatment_room_1795518881918.jpg',
  diagnosticsCbct: '/src/assets/images/dental_diagnostics_cbct_1795518883242.jpg',
  teamCare: '/src/assets/images/dental_team_care_1795518884291.jpg',
  dentalChair: '/src/assets/images/dental_chair_equipment_1795518922702.jpg',
};

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'dr-safreena-khathun',
    name: 'Dr. Safreena Khathun',
    designation: 'Lead Dentist',
    qualifications: 'BDS',
    specialization: 'General Dentistry & Comprehensive Dental Care',
    photo: IMAGES.drSafreenaPortrait,
    isPlaceholder: false,
    bio: 'Leads patient consultations and comprehensive dental care at Dr. SK Dental Clinic with a calm, informative, and patient-centred approach.',
  },
  {
    id: 'dr-shireen-khatun',
    name: 'Dr. Shireen Khatun',
    designation: 'Associate Dentist',
    qualifications: 'BDS, MDS',
    specialization: 'Specialist Dental Care',
    photo: IMAGES.drShireenPortrait,
    isPlaceholder: false,
    bio: 'Associate Dentist at Dr. SK Dental Clinic focused on attentive evaluation and patient-friendly treatment.',
  },
  {
    id: 'dr-siraj-khan',
    name: 'Dr. Siraj Khan',
    designation: 'Associate Dentist',
    qualifications: 'BDS',
    specialization: 'General Dentistry',
    photo: IMAGES.drSirajPortrait,
    isPlaceholder: false,
    bio: 'Associate Dentist at Dr. SK Dental Clinic providing comprehensive routine and restorative dental care.',
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'preventive-diagnostic',
    title: 'Preventive & Diagnostic Dentistry',
    shortTag: '01. Preventive & Diagnostic',
    description:
      'Maintain healthy teeth and gums through regular examinations, preventive care and modern diagnostic assessment.',
    procedures: [
      'Routine Dental Checkups',
      'Teeth Cleaning & Scaling',
      'Fluoride Treatments',
      'Dental Sealants',
      'Dental X-rays',
      'Cone Beam CT (CBCT) Scans',
    ],
    image: IMAGES.diagnosticsCbct,
    consultationNote:
      'Every preventive visit begins with a gentle oral examination and clear discussion of findings so you know exactly how to protect your teeth and gums.',
    defaultBookingService: 'Teeth Cleaning & Scaling',
  },
  {
    id: 'restorative-dentistry',
    title: 'Restorative Dentistry',
    shortTag: '02. Restorative Dentistry',
    description:
      'Restore damaged or missing teeth with appropriate treatment options designed to improve dental function and appearance.',
    procedures: [
      'Dental Fillings',
      'Root Canal Treatment (RCT)',
      'Dental Crowns',
      'Dental Bridges',
      'Partial Dentures',
      'Complete Dentures',
    ],
    image: IMAGES.treatmentRoom,
    consultationNote:
      'Restorative care focuses on preserving natural tooth structure whenever possible and explaining suitable restorative materials clearly before treatment.',
    defaultBookingService: 'Root Canal Treatment',
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    shortTag: '03. Cosmetic Dentistry',
    description:
      'Explore cosmetic dental treatments that can improve the appearance of your smile.',
    procedures: [
      'Teeth Whitening & Bleaching',
      'Dental Veneers',
      'Dental Bonding',
      'Smile Designing',
      'Gum Depigmentation',
    ],
    image: IMAGES.heroConsultation,
    consultationNote:
      'A clinical assessment evaluates tooth shade, enamel health, and gum contours before recommending a customized cosmetic plan.',
    defaultBookingService: 'Teeth Whitening',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    shortTag: '04. Orthodontics',
    description:
      'Dental alignment solutions to help improve tooth positioning and bite concerns.',
    procedures: [
      'Metal Braces',
      'Ceramic Braces',
      'Clear Aligners',
      'Invisalign (subject to availability and provider eligibility)',
      'Bite Correction',
    ],
    image: IMAGES.dentalChair,
    consultationNote:
      'Orthodontic consultations assess spacing, crowding, and jaw alignment to outline realistic timelines and suitable appliance options.',
    defaultBookingService: 'Braces & Aligners',
  },
  {
    id: 'oral-surgery-implants',
    title: 'Oral Surgery & Dental Implants',
    shortTag: '05. Oral Surgery & Implants',
    description:
      'Professional evaluation and treatment planning for tooth replacement and oral surgical needs.',
    procedures: [
      'Single Tooth Implants',
      'Full-Mouth Dental Implants',
      'Tooth Extractions',
      'Wisdom Tooth Removal',
      'Impacted Wisdom Teeth Treatment',
      'Dental Trauma Assessment',
    ],
    image: IMAGES.clinicReception,
    consultationNote:
      'Surgical and implant procedures are planned after thorough clinical and radiographic evaluation, with clear post-procedure recovery guidance.',
    defaultBookingService: 'Dental Implants',
  },
  {
    id: 'specialized-dental-care',
    title: 'Specialized Dental Care',
    shortTag: '06. Specialized Care',
    description:
      'Dental care options for children, adults and senior patients.',
    procedures: [
      'Pediatric Dentistry',
      'Gum Disease Treatment (Periodontics)',
      'Senior Citizen Dental Care',
      'Emergency Dental Care',
      'Acute Toothache Assessment',
      'Broken Tooth Assessment',
    ],
    image: IMAGES.teamCare,
    consultationNote:
      'Adapted care for young children, seniors, and urgent dental pain—prioritizing calm communication and timely clinical assessment.',
    defaultBookingService: 'Pediatric Dentistry',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    id: 'patient-focused',
    title: 'Patient-Focused Approach',
    description:
      'Every consultation begins by listening carefully to your symptoms, comfort level, and oral health goals.',
  },
  {
    id: 'clear-explanations',
    title: 'Clear Treatment Explanations',
    description:
      'Treatment options, steps, and preventive care guidance are explained in plain language so you can decide with confidence.',
  },
  {
    id: 'comprehensive-services',
    title: 'Comprehensive Dental Services',
    description:
      'Preventive, restorative, cosmetic, orthodontic, implant, and urgent dental assessments available under one clinic roof.',
  },
  {
    id: 'diagnostic-support',
    title: 'Modern Diagnostic Support',
    description:
      'Digital dental X-rays and Cone Beam CT (CBCT) diagnostic imaging support accurate assessment and thoughtful treatment planning.',
  },
  {
    id: 'comfortable-environment',
    title: 'Comfortable Clinic Environment',
    description:
      'A calm, well-maintained, and hygienic clinical setting designed to make routine and specialized visits feel reassuring.',
  },
  {
    id: 'all-age-groups',
    title: 'Care for All Age Groups',
    description:
      'Tailored dental attention for children, working adults, and senior citizens across Hyderabad.',
  },
];

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'review-1',
    name: 'Md Sanaullah',
    initials: 'MS',
    treatmentContext: 'Wisdom Tooth Extraction',
    text: 'After suffering from severe wisdom tooth pain for nearly a month, I consulted Dr. Safreena Khathun at SK Dental Clinic. She accurately identified the root cause, explained everything clearly, and performed the extraction smoothly.',
  },
  {
    id: 'review-2',
    name: 'PARVEZ MOHAMMED',
    initials: 'PM',
    treatmentContext: 'Root Canal Treatment',
    text: 'Got my root canal treatment done by Dr. Safreena, and the experience was fantastic. The doctor was very calm and explained everything in a simple way.',
  },
  {
    id: 'review-3',
    name: 'Asma Mustari',
    initials: 'AM',
    treatmentContext: 'Root Canal Treatment',
    text: 'Underwent painless Root canal treatment & felt comfortable throughout the process. Would highly recommend Dr. SK Dental Clinic & staff.',
  },
  {
    id: 'review-4',
    name: 'Jhon',
    initials: 'JH',
    treatmentContext: 'Dental Consultation & Care',
    text: 'Had a very good experience at Dr SK Dental Clinic. Dr Safreena is highly skilled and explains the treatment clearly. The clinic is clean and well maintained.',
  },
  {
    id: 'review-5',
    name: 'Shireen Rehi',
    initials: 'SR',
    treatmentContext: 'Braces Treatment',
    text: 'I underwent braces treatment & it went very well & smooth. The follow up from Dr. Safreena and staff is always appreciated.',
  },
  {
    id: 'review-6',
    name: 'Syeda Aisha Banu',
    initials: 'SA',
    treatmentContext: 'Routine Check-up & Cleaning',
    text: 'I visited for a routine dental check-up and cleaning. The doctor was gentle, explained every step and gave helpful tips for oral care.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-reception',
    title: 'Clinic Reception',
    category: 'Patient Welcome Area',
    caption: 'Calm, hygienic reception lounge designed to put patients and families at ease from arrival.',
    image: IMAGES.clinicReception,
  },
  {
    id: 'gallery-treatment-room',
    title: 'Dental Treatment Room',
    category: 'Clinical Operatory',
    caption: 'Bright, sanitized treatment operatory equipped for preventive, restorative, and specialized dental care.',
    image: IMAGES.treatmentRoom,
  },
  {
    id: 'gallery-chair-equipment',
    title: 'Dental Chair & Equipment',
    category: 'Clinical Equipment',
    caption: 'Ergonomic patient chair, overhead clinical lighting, and sterilized instrument setup.',
    image: IMAGES.dentalChair,
  },
  {
    id: 'gallery-consultation',
    title: 'Dentist Consultation',
    category: 'Patient-Centred Care',
    caption: 'Clear one-on-one consultations walking patients through diagnostic findings and treatment options.',
    image: IMAGES.heroConsultation,
  },
  {
    id: 'gallery-diagnostics',
    title: 'Dental Diagnostic Equipment',
    category: 'Imaging & Assessment',
    caption: 'Modern digital X-ray and CBCT imaging suite supporting accurate diagnosis and treatment planning.',
    image: IMAGES.diagnosticsCbct,
  },
  {
    id: 'gallery-team',
    title: 'Professional Dental Team',
    category: 'Family & Pediatric Care',
    caption: 'Attentive care for children and adults with step-by-step oral hygiene guidance.',
    image: IMAGES.teamCare,
  },
];

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: 'maintain-healthy-teeth',
    title: 'How to Maintain Healthy Teeth',
    summary:
      'Consistent daily brushing, gentle flossing, and balanced dietary habits form the foundation of lifelong oral health.',
    readTime: '3 min read',
    tips: [
      'Brush twice daily for two full minutes using a soft-bristled toothbrush and fluoride toothpaste.',
      'Clean between teeth once a day with dental floss or interdental brushes to remove plaque along the gumline.',
      'Rinse with plain water after sugary or acidic snacks, and limit frequent snacking between meals.',
      'Replace your toothbrush every 3 months or sooner if the bristles begin to fray.',
    ],
    paragraphs: [
      'Daily oral hygiene removes bacterial plaque before it hardens into tartar or irritates the gums. Brushing gently at a 45-degree angle toward the gumline cleans effectively without wearing down enamel.',
      'Because toothbrush bristles cannot reach tight spaces between teeth, daily flossing plays an equally important role in preventing cavities between teeth and early gum inflammation.',
    ],
  },
  {
    id: 'regular-checkups-matter',
    title: 'Why Regular Dental Checkups Matter',
    summary:
      'Routine dental examinations help spot early signs of decay or gum trouble long before pain begins.',
    readTime: '3 min read',
    tips: [
      'Many dental concerns—such as early cavities and gum inflammation—develop quietly without immediate pain.',
      'Professional scaling removes hardened tartar deposits that brushing alone cannot clear.',
      'Periodic dental X-rays when clinically indicated reveal hidden concerns beneath fillings or between teeth.',
      'Early detection often allows simpler, more conservative treatment options.',
    ],
    paragraphs: [
      'Waiting until a tooth hurts often means an issue has progressed deeper into the tooth or surrounding bone. Routine checkups give your dentist an opportunity to monitor existing restorations, gum pockets, and enamel wear.',
      'During a routine visit at Dr. SK Dental Clinic, we also review your daily brushing technique and answer questions tailored to your age and oral health needs.',
    ],
  },
  {
    id: 'when-to-visit-dentist',
    title: 'When Should You Visit a Dentist?',
    summary:
      'Know the key warning signs that call for prompt dental evaluation rather than waiting for your next routine checkup.',
    readTime: '3 min read',
    tips: [
      'Persistent toothache, throbbing pain, or sensitivity to hot, cold, or sweet foods.',
      'Bleeding, swollen, or tender gums while brushing or flossing.',
      'Chipped, cracked, loose teeth, or a dislodged filling or crown.',
      'Pain or swelling near the back of the jaw around erupting or impacted wisdom teeth.',
    ],
    paragraphs: [
      'Alongside regular checkups, certain symptoms benefit from prompt assessment. Addressing sensitivity, bleeding gums, or a broken tooth early helps prevent complications and relieves discomfort safely.',
      'If you experience severe acute dental pain or facial swelling, contact the clinic promptly for an emergency dental assessment.',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How can I book an appointment?',
    answer:
      'You can request an appointment online using the booking form on this page or reach out via the clinic’s WhatsApp or phone contact options. Please note that online submissions are appointment requests until our clinic staff confirms your date and time.',
  },
  {
    id: 'faq-2',
    question: 'Do you accept walk-in patients?',
    answer:
      'Walk-in patients are welcome, though scheduling an appointment in advance helps minimize waiting time and ensures dedicated consultation time with your preferred dentist—especially for specialized procedures or urgent dental pain.',
  },
  {
    id: 'faq-3',
    question: 'Do you treat children?',
    answer:
      'Yes. We provide Pediatric Dentistry and gentle routine dental care for children as well as adults and senior citizens, focusing on a calm, reassuring experience and preventive habits.',
  },
  {
    id: 'faq-4',
    question: 'Do you provide root canal treatment?',
    answer:
      'Yes. Root Canal Treatment (RCT) is part of our Restorative Dentistry services. Before starting, the dentist examines the tooth, explains the findings clearly, and discusses suitable crown or restoration options.',
  },
  {
    id: 'faq-5',
    question: 'Do you offer braces and clear aligners?',
    answer:
      'Yes. Our Orthodontics services include Metal Braces, Ceramic Braces, Clear Aligners, Bite Correction, and Invisalign (subject to availability and provider eligibility following clinical evaluation).',
  },
  {
    id: 'faq-6',
    question: 'Is teeth cleaning painful?',
    answer:
      'Routine teeth cleaning and scaling is generally comfortable for most patients. If you have sensitive teeth or tender gums, please let the dentist know beforehand so gentle adjustments can be made.',
  },
  {
    id: 'faq-7',
    question: 'How long does a dental appointment take?',
    answer:
      'The duration depends on the type of visit. A routine consultation or cleaning is usually straightforward, whereas root canal therapy, extractions, or diagnostic imaging may take longer. Your dentist will outline the expected time during your evaluation.',
  },
  {
    id: 'faq-8',
    question: 'Do you provide dental implants?',
    answer:
      'Yes. We offer evaluation and treatment planning for Single Tooth Implants and Full-Mouth Dental Implants, supported by appropriate dental imaging such as X-rays or CBCT scans when indicated.',
  },
  {
    id: 'faq-9',
    question: 'What should I do in case of severe tooth pain?',
    answer:
      'Please contact our clinic promptly for an Emergency Dental Care or Acute Toothache Assessment. Rinse gently with lukewarm water, avoid placing aspirin directly on the gum or tooth, and refrain from chewing on the painful side until evaluated.',
  },
  {
    id: 'faq-10',
    question: 'Where is Dr. SK Dental Clinic located?',
    answer:
      'Dr. SK Dental Clinic is located in Hyderabad, Telangana, India. You can use the Get Directions button in the Contact & Location section to open our exact Google Maps location.',
  },
];

export const APPOINTMENT_SERVICES = [
  'General Consultation',
  'Teeth Cleaning & Scaling',
  'Root Canal Treatment',
  'Dental Filling',
  'Tooth Extraction',
  'Wisdom Tooth Removal',
  'Dental Implants',
  'Braces & Aligners',
  'Teeth Whitening',
  'Pediatric Dentistry',
  'Gum Treatment',
  'Emergency Dental Consultation',
  'Other',
];

export const PREFERRED_TIME_WINDOWS = [
  'Morning Preference (10:00 AM – 1:00 PM)',
  'Afternoon Preference (1:00 PM – 4:00 PM)',
  'Evening Preference (4:00 PM – 8:00 PM)',
  'Any Time (Flexible)',
];
