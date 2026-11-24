import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {createServer as createViteServer} from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');

interface AppointmentRecord {
  id: string;
  referenceCode: string;
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  doctor: string;
  service: string;
  preferredDate: string;
  preferredTimeSlot: string;
  concern: string;
  patientType: 'First Visit' | 'Existing Patient';
  status: 'Pending Confirmation' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface ContactRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface EnquiriesStore {
  appointments: AppointmentRecord[];
  contacts: ContactRecord[];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface EmailSendResult {
  sent: boolean;
  reason?: string;
}

async function sendClinicEmail(params: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn('Resend notification skipped: RESEND_API_KEY is not set.');
    return {sent: false, reason: 'missing_api_key'};
  }

  const recipient =
    process.env.CLINIC_NOTIFICATION_EMAIL?.trim() ||
    'maryamproductivity10@gmail.com';
  const fromAddress =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Dr. SK Dental Clinic <onboarding@resend.dev>';

  try {
    const payload: Record<string, unknown> = {
      from: fromAddress,
      to: [recipient],
      subject: params.subject,
      html: params.html,
      text: params.text,
    };

    if (params.replyTo && isValidEmail(params.replyTo)) {
      payload.reply_to = params.replyTo;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API returned non-OK status:', response.status, errorText);
      return {sent: false, reason: `resend_status_${response.status}`};
    }

    return {sent: true};
  } catch (err) {
    console.error('Failed to dispatch Resend notification email:', err);
    return {sent: false, reason: 'network_error'};
  }
}

function ensureStore(): EnquiriesStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
  }
  if (!fs.existsSync(DATA_FILE)) {
    const empty: EnquiriesStore = {appointments: [], contacts: []};
    fs.writeFileSync(DATA_FILE, JSON.stringify(empty, null, 2), 'utf-8');
    return empty;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<EnquiriesStore>;
    return {
      appointments: Array.isArray(parsed.appointments) ? parsed.appointments : [],
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
    };
  } catch {
    return {appointments: [], contacts: []};
  }
}

function saveStore(store: EnquiriesStore): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

function normalizeIndianMobile(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  const trimmed =
    digits.length === 12 && digits.startsWith('91')
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith('0')
        ? digits.slice(1)
        : digits;

  if (/^[6-9]\d{9}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPastDate(dateString: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return true;
  }
  const now = new Date();
  // Local IST/device today string YYYY-MM-DD
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  return dateString < todayStr;
}

function generateReferenceCode(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SKDC-${y}${m}${d}-${rand}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({limit: '1mb'}));

  app.get('/api/health', (_req, res) => {
    res.json({status: 'ok', clinic: 'Dr. SK Dental Clinic'});
  });

  app.get('/api/appointments', (_req, res) => {
    const store = ensureStore();
    res.json({
      appointments: store.appointments,
      contacts: store.contacts,
    });
  });

  app.post('/api/appointments', async (req, res) => {
    const body = req.body ?? {};
    const fullName = String(body.fullName ?? '').trim();
    const rawMobile = String(body.mobileNumber ?? '').trim();
    const rawWhatsapp = String(body.whatsappNumber ?? '').trim();
    const email = String(body.email ?? '').trim();
    const doctor = String(body.doctor ?? '').trim();
    const service = String(body.service ?? '').trim();
    const preferredDate = String(body.preferredDate ?? '').trim();
    const preferredTimeSlot = String(body.preferredTimeSlot ?? '').trim();
    const concern = String(body.concern ?? '').trim();
    const patientType =
      body.patientType === 'Existing Patient' ? 'Existing Patient' : 'First Visit';

    if (fullName.length < 2) {
      res.status(400).json({error: 'Please enter your full name.'});
      return;
    }

    const mobileNumber = normalizeIndianMobile(rawMobile);
    if (!mobileNumber) {
      res.status(400).json({
        error: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.',
      });
      return;
    }

    const whatsappNumber = normalizeIndianMobile(rawWhatsapp);
    if (!whatsappNumber) {
      res.status(400).json({
        error: 'Please enter a valid 10-digit Indian WhatsApp number starting with 6, 7, 8, or 9.',
      });
      return;
    }

    if (email && !isValidEmail(email)) {
      res.status(400).json({error: 'Please enter a valid email address.'});
      return;
    }

    if (!doctor) {
      res.status(400).json({error: 'Please select a preferred doctor.'});
      return;
    }

    if (!service) {
      res.status(400).json({error: 'Please select a dental service.'});
      return;
    }

    if (!preferredDate || isPastDate(preferredDate)) {
      res.status(400).json({
        error: 'Please choose today or a future preferred appointment date.',
      });
      return;
    }

    if (!preferredTimeSlot) {
      res.status(400).json({error: 'Please select a preferred time window.'});
      return;
    }

    const store = ensureStore();
    const record: AppointmentRecord = {
      id: `apt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      referenceCode: generateReferenceCode(),
      fullName,
      mobileNumber: `+91 ${mobileNumber}`,
      whatsappNumber: `+91 ${whatsappNumber}`,
      email,
      doctor,
      service,
      preferredDate,
      preferredTimeSlot,
      concern,
      patientType,
      status: 'Pending Confirmation',
      createdAt: new Date().toISOString(),
    };

    store.appointments.unshift(record);
    saveStore(store);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #243746; max-width: 600px; margin: 0 auto; border: 1px solid #d9e5ea; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #153B50; color: #ffffff; padding: 20px 24px;">
          <p style="margin: 0; font-size: 12px; color: #C7A76C; text-transform: uppercase; letter-spacing: 1px;">Dr. SK Dental Clinic · Hyderabad</p>
          <h2 style="margin: 6px 0 0; font-size: 20px;">New Appointment Request (${escapeHtml(record.referenceCode)})</h2>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #5b6e7d; width: 170px;">Reference Code</td><td style="padding: 8px 0; font-weight: bold; color: #153B50;">${escapeHtml(record.referenceCode)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Patient Name</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(record.fullName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Patient Type</td><td style="padding: 8px 0;">${escapeHtml(record.patientType)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Mobile Number</td><td style="padding: 8px 0;">${escapeHtml(record.mobileNumber)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">WhatsApp Number</td><td style="padding: 8px 0;">${escapeHtml(record.whatsappNumber)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Email</td><td style="padding: 8px 0;">${record.email ? escapeHtml(record.email) : 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Selected Doctor</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(record.doctor)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Dental Service</td><td style="padding: 8px 0; font-weight: bold; color: #159A9C;">${escapeHtml(record.service)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Preferred Date</td><td style="padding: 8px 0;">${escapeHtml(record.preferredDate)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Preferred Time</td><td style="padding: 8px 0;">${escapeHtml(record.preferredTimeSlot)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d; vertical-align: top;">Dental Concern</td><td style="padding: 8px 0;">${record.concern ? escapeHtml(record.concern) : 'None specified'}</td></tr>
          </table>
        </div>
      </div>
    `;

    const emailText = [
      `New Appointment Request - ${record.referenceCode}`,
      `Patient Name: ${record.fullName} (${record.patientType})`,
      `Mobile: ${record.mobileNumber}`,
      `WhatsApp: ${record.whatsappNumber}`,
      `Email: ${record.email || 'Not provided'}`,
      `Doctor: ${record.doctor}`,
      `Service: ${record.service}`,
      `Preferred Date: ${record.preferredDate}`,
      `Preferred Time: ${record.preferredTimeSlot}`,
      `Concern: ${record.concern || 'None specified'}`,
    ].join('\n');

    const emailResult = await sendClinicEmail({
      subject: `Appointment Request [${record.referenceCode}] — ${record.fullName} (${record.service})`,
      html: emailHtml,
      text: emailText,
      replyTo: record.email || undefined,
    });

    res.status(201).json({
      message:
        'Appointment request received. Your appointment is a request until confirmed by our clinic staff.',
      appointment: record,
      emailDelivered: emailResult.sent,
    });
  });

  app.patch('/api/appointments/:id', (req, res) => {
    const {id} = req.params;
    const status = String(req.body?.status ?? '');
    const allowed = ['Pending Confirmation', 'Confirmed', 'Completed', 'Cancelled'];
    if (!allowed.includes(status)) {
      res.status(400).json({error: 'Invalid status value.'});
      return;
    }

    const store = ensureStore();
    const index = store.appointments.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({error: 'Appointment request not found.'});
      return;
    }

    store.appointments[index].status = status as AppointmentRecord['status'];
    saveStore(store);

    res.json({appointment: store.appointments[index]});
  });

  app.post('/api/contact', async (req, res) => {
    const body = req.body ?? {};
    const name = String(body.name ?? '').trim();
    const rawPhone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const subject = String(body.subject ?? '').trim() || 'General Enquiry';
    const message = String(body.message ?? '').trim();

    if (name.length < 2) {
      res.status(400).json({error: 'Please enter your name.'});
      return;
    }

    const phone = normalizeIndianMobile(rawPhone);
    if (!phone) {
      res.status(400).json({
        error: 'Please enter a valid 10-digit Indian mobile number.',
      });
      return;
    }

    if (email && !isValidEmail(email)) {
      res.status(400).json({error: 'Please enter a valid email address.'});
      return;
    }

    if (message.length < 5) {
      res.status(400).json({error: 'Please enter your message or enquiry.'});
      return;
    }

    const store = ensureStore();
    const record: ContactRecord = {
      id: `cnt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name,
      phone: `+91 ${phone}`,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    store.contacts.unshift(record);
    saveStore(store);

    const contactHtml = `
      <div style="font-family: Arial, sans-serif; color: #243746; max-width: 600px; margin: 0 auto; border: 1px solid #d9e5ea; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #153B50; color: #ffffff; padding: 20px 24px;">
          <p style="margin: 0; font-size: 12px; color: #C7A76C; text-transform: uppercase; letter-spacing: 1px;">Dr. SK Dental Clinic · Website Contact Form</p>
          <h2 style="margin: 6px 0 0; font-size: 20px;">New Enquiry: ${escapeHtml(record.subject)}</h2>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #5b6e7d; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(record.name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Mobile Number</td><td style="padding: 8px 0;">${escapeHtml(record.phone)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Email</td><td style="padding: 8px 0;">${record.email ? escapeHtml(record.email) : 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d;">Topic</td><td style="padding: 8px 0; font-weight: bold; color: #159A9C;">${escapeHtml(record.subject)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5b6e7d; vertical-align: top;">Message</td><td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(record.message)}</td></tr>
          </table>
        </div>
      </div>
    `;

    const contactText = [
      `New Contact Form Enquiry - ${record.subject}`,
      `Name: ${record.name}`,
      `Phone: ${record.phone}`,
      `Email: ${record.email || 'Not provided'}`,
      `Message: ${record.message}`,
    ].join('\n');

    const emailResult = await sendClinicEmail({
      subject: `Website Contact Enquiry: ${record.subject} — ${record.name}`,
      html: contactHtml,
      text: contactText,
      replyTo: record.email || undefined,
    });

    res.status(201).json({
      message: 'Thank you for contacting Dr. SK Dental Clinic. Our staff will get back to you shortly.',
      contact: record,
      emailDelivered: emailResult.sent,
    });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dr. SK Dental Clinic server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
