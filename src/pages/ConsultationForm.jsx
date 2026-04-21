import { useState } from 'react';
import { Crown, FileText, CheckCircle, AlertTriangle, Clock, Zap, ArrowRight, ArrowLeft, User, Mail, Phone, Calendar, Heart, Users, Briefcase, Shield, Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const EMPTY_MEMBER = { name: '', relationship: '', dob: '', gender: '', smoker: '', medicalHistory: '' };

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  #contact, #contact * { font-family: 'Poppins', sans-serif !important; }
`;

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3">
    <CheckCircle size={18} className="text-green-400" />
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white text-xs">✕</button>
  </div>
);

const FieldError = ({ msg }) => msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
const RequiredStar = () => <span className="text-red-500 ml-0.5">*</span>;

const ConsultationSection = () => {
  const [step, setStep] = useState('initial');
  const [fadeClass, setFadeClass] = useState('opacity-100 translate-y-0');
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const transition = (next) => {
    setFadeClass('opacity-0 translate-y-4');
    setTimeout(() => {
      setStep(next);
      setFadeClass('opacity-100 translate-y-0');
    }, 300);
  };

  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);

  const handleQualificationSubmit = () => {
    const yesCount = [q1, q2, q3].filter(Boolean).length;
    transition(yesCount >= 2 ? 'paid-booking' : 'redirect-message');
  };

  const [booking, setBooking] = useState({ name: '', email: '', phone: '', time: '' });
  const [bookingErrors, setBookingErrors] = useState({});

  const validateBooking = () => {
    const e = {};
    if (!booking.name.trim()) e.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(booking.phone.replace(/\D/g, ''))) e.phone = 'Valid 10-digit number required';
    if (!booking.time) e.time = 'Select a time';
    setBookingErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (validateBooking()) {
      showToast('Consultation booked! Check your email for confirmation.');
      setBooking({ name: '', email: '', phone: '', time: '' });
      setBookingErrors({});
    }
  };

  const [detailed, setDetailed] = useState({
    name: '', email: '', phone: '', whatsapp: '', cityPincode: '',
    lookingFor: '', occupation: '', annualIncome: '',
    existingPolicies: '', additionalInfo: '', consent: false
  });
  const [detailedErrors, setDetailedErrors] = useState({});
  const [familyMembers, setFamilyMembers] = useState([{ ...EMPTY_MEMBER }]);
  const [expandedMembers, setExpandedMembers] = useState([0]);
  const [memberErrors, setMemberErrors] = useState([{}]);

  const toggleMember = (idx) => {
    setExpandedMembers(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const addMember = () => {
    const newIdx = familyMembers.length;
    setFamilyMembers(prev => [...prev, { ...EMPTY_MEMBER }]);
    setExpandedMembers(prev => [...prev, newIdx]);
    setMemberErrors(prev => [...prev, {}]);
  };

  const removeMember = (idx) => {
    if (familyMembers.length === 1) return;
    setFamilyMembers(prev => prev.filter((_, i) => i !== idx));
    setExpandedMembers(prev => prev.filter(i => i !== idx).map(i => (i > idx ? i - 1 : i)));
    setMemberErrors(prev => prev.filter((_, i) => i !== idx));
  };

  const updateMember = (idx, field, value) => {
    setFamilyMembers(prev => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
    setMemberErrors(prev => prev.map((e, i) => (i === idx ? { ...e, [field]: undefined } : e)));
  };

  const validateMember = (member) => {
    const e = {};
    if (!member.name.trim()) e.name = 'Required';
    if (!member.relationship) e.relationship = 'Required';
    if (!member.dob) e.dob = 'Required';
    if (!member.gender) e.gender = 'Required';
    if (!member.smoker) e.smoker = 'Required';
    return e;
  };

  const validateDetailed = () => {
    const e = {};
    if (!detailed.name.trim()) e.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detailed.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(detailed.phone.replace(/\D/g, ''))) e.phone = 'Valid 10-digit number required';
    if (!detailed.whatsapp.trim()) e.whatsapp = 'Required';
    if (!detailed.cityPincode.trim()) e.cityPincode = 'Required';
    if (!detailed.lookingFor) e.lookingFor = 'Required';
    if (!detailed.occupation) e.occupation = 'Required';
    if (!detailed.annualIncome.trim()) e.annualIncome = 'Required';
    if (!detailed.consent) e.consent = 'You must confirm before submitting';
    setDetailedErrors(e);

    const mErrors = familyMembers.map(validateMember);
    setMemberErrors(mErrors);

    const errIdxs = mErrors.map((me, i) => (Object.keys(me).length > 0 ? i : -1)).filter(i => i >= 0);
    if (errIdxs.length > 0) {
      setExpandedMembers(prev => [...new Set([...prev, ...errIdxs])]);
    }

    return Object.keys(e).length === 0 && mErrors.every(me => Object.keys(me).length === 0);
  };

  const handleDetailedSubmit = async (e) => {
    e.preventDefault();
    if (!validateDetailed()) return;
    setIsSubmitting(true);
    const payload = { ...detailed, familyMembers };
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbyv6Vimp9m7pt421dHoRQPDrmU5EtGRwjsKx-qDNDQuevY5hZgv9uQeY2lIFpbKFxzl/exec',
        { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      );
      showToast('Form submitted! Our team will reach out within 24 hours.');
      setDetailed({ name: '', email: '', phone: '', whatsapp: '', cityPincode: '', lookingFor: '', occupation: '', annualIncome: '', existingPolicies: '', additionalInfo: '', consent: false });
      setFamilyMembers([{ ...EMPTY_MEMBER }]);
      setExpandedMembers([0]);
      setMemberErrors([{}]);
    } catch (error) {
      console.error(error);
      showToast('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Green-themed input class
  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-white resize-none text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 ${
      hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-green-500'
    }`;

  const SectionLabel = ({ icon: Icon, text }) => (
    <h4 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
      <Icon size={16} className="text-green-600" /> {text}
    </h4>
  );

  const QualificationQuestion = ({ label, value, onChange, icon: Icon }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-green-600" />
        </div>
        <p className="text-gray-800 font-medium text-sm md:text-base">{label}</p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button type="button" onClick={() => onChange(true)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${value === true ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
          Yes
        </button>
        <button type="button" onClick={() => onChange(false)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${value === false ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
          No
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <section
        id="contact"
        className="py-24 bg-white relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 45% at 85% 20%, rgba(187,247,208,0.5) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 10% 85%, rgba(187,247,208,0.35) 0%, transparent 60%)
          `
        }}
      >
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}

        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 384, height: 384, borderRadius: '50%', background: 'rgba(187,247,208,0.35)', filter: 'blur(60px)', transform: 'translate(50%, -50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 288, height: 288, borderRadius: '50%', background: 'rgba(220,252,231,0.45)', filter: 'blur(50px)', transform: 'translate(-50%, 50%)', pointerEvents: 'none' }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            {/* Trust pill style badge */}
            <span
              className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm tracking-wider uppercase mb-3"
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 999,
                padding: '7px 18px',
                fontSize: 12.5,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.25)', display: 'inline-block', flexShrink: 0 }} />
              Expert Guidance
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">How Can We Help You Today?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Get a quick consultation or receive guided assistance from our experts</p>
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-300 ${fadeClass}`}>

            {/* ── INITIAL CHOICE ── */}
            {step === 'initial' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Premium card */}
                <button onClick={() => transition('qualification')}
                  className="group relative bg-white border-2 border-green-200 rounded-2xl p-8 text-left hover:border-green-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 60px rgba(22,163,74,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div
                    className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                    style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}
                  >
                    <Crown size={12} /> Premium
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-5">
                    <Zap size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">I Already Understand My Insurance Needs</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">Book a quick paid consultation with an expert and skip the queue</p>
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">Get Started <ArrowRight size={16} /></div>
                </button>

                {/* Standard card */}
                <button onClick={() => transition('detailed-form')}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-8 text-left hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                    <FileText size={24} className="text-gray-500" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">I Need Help Understanding My Insurance</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">Fill a detailed form and get guided assistance from our team</p>
                  <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm group-hover:gap-3 group-hover:text-green-600 transition-all">Fill Form <ArrowRight size={16} /></div>
                </button>
              </div>
            )}

            {/* ── QUALIFICATION ── */}
            {step === 'qualification' && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-xl">
                <button onClick={() => transition('initial')} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors mb-6 text-sm"><ArrowLeft size={16} /> Back</button>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Quick Qualification Check</h3>
                <p className="text-gray-500 mb-8">Please answer these questions to proceed with your paid consultation.</p>
                <div className="space-y-4 mb-8">
                  <QualificationQuestion label="Do you know your required insurance coverage?" value={q1} onChange={setQ1} icon={Shield} />
                  <QualificationQuestion label="Have you calculated your financial needs?" value={q2} onChange={setQ2} icon={Briefcase} />
                  <QualificationQuestion label="Do you already have an existing policy?" value={q3} onChange={setQ3} icon={CheckCircle} />
                </div>
                <button
                  onClick={handleQualificationSubmit}
                  disabled={q1 === null || q2 === null || q3 === null}
                  className="w-full text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', boxShadow: '0 6px 22px rgba(22,163,74,0.35)' }}
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            )}

            {/* ── REDIRECT ── */}
            {step === 'redirect-message' && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-xl text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={28} className="text-green-600" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">We Recommend Guided Assistance</h3>
                <p className="text-gray-500 max-w-lg mx-auto mb-8">This consultation is best suited for users with prior understanding of their insurance needs. Please fill the detailed form instead.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => transition('detailed-form')}
                    className="text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                    style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', boxShadow: '0 6px 22px rgba(22,163,74,0.35)' }}
                  >
                    <FileText size={18} /> Fill Detailed Form
                  </button>
                  <button onClick={() => transition('initial')} className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all">Go Back</button>
                </div>
              </div>
            )}

            {/* ── PAID BOOKING ── */}
            {step === 'paid-booking' && (
              <div className="bg-white border-2 border-green-200 rounded-2xl p-8 md:p-10 shadow-xl">
                <button onClick={() => transition('qualification')} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors mb-6 text-sm"><ArrowLeft size={16} /> Back</button>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                    style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}
                  >
                    <Crown size={12} /> Premium Consultation
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">Book Your Expert Session</h3>
                <p className="text-gray-500 mb-8">Fill in your details below to schedule your paid consultation.</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-medium border border-green-100">
                    <Clock size={14} /> Limited slots available
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-medium border border-green-100">
                    <Zap size={14} /> Skip the queue
                  </div>
                </div>
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input className={inputClass(!!bookingErrors.name)} placeholder="John Doe" value={booking.name} onChange={e => setBooking({ ...booking, name: e.target.value })} maxLength={100} />
                      <FieldError msg={bookingErrors.name} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" className={inputClass(!!bookingErrors.email)} placeholder="john@example.com" value={booking.email} onChange={e => setBooking({ ...booking, email: e.target.value })} maxLength={255} />
                      <FieldError msg={bookingErrors.email} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input type="tel" className={inputClass(!!bookingErrors.phone)} placeholder="98765 43210" value={booking.phone} onChange={e => setBooking({ ...booking, phone: e.target.value })} maxLength={15} />
                      <FieldError msg={bookingErrors.phone} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                      <select className={inputClass(!!bookingErrors.time)} value={booking.time} onChange={e => setBooking({ ...booking, time: e.target.value })}>
                        <option value="">Select a slot</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 7 PM)</option>
                      </select>
                      <FieldError msg={bookingErrors.time} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:-translate-y-0.5 mt-4"
                    style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', boxShadow: '0 6px 22px rgba(22,163,74,0.35)' }}
                  >
                    <Crown size={20} /> Pay & Book Consultation
                  </button>
                </form>
              </div>
            )}

            {/* ── DETAILED FORM ── */}
            {step === 'detailed-form' && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-xl">
                <button onClick={() => transition('initial')} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors mb-6 text-sm"><ArrowLeft size={16} /> Back</button>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">Detailed Insurance Assessment</h3>
                <p className="text-gray-500 mb-8">Tell us about yourself and our experts will craft a personalised insurance plan for you.</p>

                <form onSubmit={handleDetailedSubmit} className="space-y-8">

                  {/* Personal Details */}
                  <div>
                    <SectionLabel icon={User} text="Personal Details" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <RequiredStar /></label>
                        <input className={inputClass(!!detailedErrors.name)} placeholder="e.g. Anuj Paul" value={detailed.name} onChange={e => setDetailed({ ...detailed, name: e.target.value })} maxLength={100} />
                        <FieldError msg={detailedErrors.name} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number <RequiredStar /></label>
                        <input type="tel" className={inputClass(!!detailedErrors.phone)} placeholder="e.g. 98765 43210" value={detailed.phone} onChange={e => setDetailed({ ...detailed, phone: e.target.value })} maxLength={15} />
                        <FieldError msg={detailedErrors.phone} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email ID <RequiredStar /></label>
                        <input type="email" className={inputClass(!!detailedErrors.email)} placeholder="e.g. anuj@example.com" value={detailed.email} onChange={e => setDetailed({ ...detailed, email: e.target.value })} maxLength={255} />
                        <FieldError msg={detailedErrors.email} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          WhatsApp Number <RequiredStar />
                          <span className="text-gray-400 font-normal ml-1 text-xs">(write "same" if same as mobile)</span>
                        </label>
                        <input type="text" className={inputClass(!!detailedErrors.whatsapp)} placeholder='e.g. 98765 43210 or "same"' value={detailed.whatsapp} onChange={e => setDetailed({ ...detailed, whatsapp: e.target.value })} maxLength={20} />
                        <FieldError msg={detailedErrors.whatsapp} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          City & Pincode as per Aadhaar <RequiredStar />
                          <span className="text-gray-400 font-normal ml-1 text-xs">(e.g. Delhi - 110001)</span>
                        </label>
                        <input className={inputClass(!!detailedErrors.cityPincode)} placeholder="e.g. Delhi - 110001" value={detailed.cityPincode} onChange={e => setDetailed({ ...detailed, cityPincode: e.target.value })} maxLength={100} />
                        <FieldError msg={detailedErrors.cityPincode} />
                      </div>
                    </div>
                  </div>

                  {/* Occupation & Requirements */}
                  <div>
                    <SectionLabel icon={Briefcase} text="Occupation & Requirements" />
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Looking for guidance on <RequiredStar /></label>
                        <select className={inputClass(!!detailedErrors.lookingFor)} value={detailed.lookingFor} onChange={e => setDetailed({ ...detailed, lookingFor: e.target.value })}>
                          <option value="">Select option</option>
                          <option value="Life Insurance">Life Insurance</option>
                          <option value="Health Insurance">Health Insurance</option>
                          <option value="Both">Both</option>
                        </select>
                        <FieldError msg={detailedErrors.lookingFor} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Occupation <RequiredStar /></label>
                        <select className={inputClass(!!detailedErrors.occupation)} value={detailed.occupation} onChange={e => setDetailed({ ...detailed, occupation: e.target.value })}>
                          <option value="">Select occupation</option>
                          <option value="Salaried">Salaried</option>
                          <option value="Self Employed">Self Employed</option>
                          <option value="Unemployed">Unemployed</option>
                        </select>
                        <FieldError msg={detailedErrors.occupation} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Annual Income <RequiredStar /></label>
                        <input className={inputClass(!!detailedErrors.annualIncome)} placeholder="e.g. Rs. 6,00,000" value={detailed.annualIncome} onChange={e => setDetailed({ ...detailed, annualIncome: e.target.value })} maxLength={30} />
                        <FieldError msg={detailedErrors.annualIncome} />
                      </div>
                    </div>
                  </div>

                  {/* Family Members */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-gray-800 font-semibold flex items-center gap-2">
                        <Users size={16} className="text-green-600" />
                        Details of Members to be Insured <RequiredStar />
                      </h4>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                        {familyMembers.length} member{familyMembers.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">At least 1 member required. All fields per member are mandatory.</p>

                    <div className="space-y-3">
                      {familyMembers.map((member, idx) => {
                        const isOpen = expandedMembers.includes(idx);
                        const hasErr = Object.values(memberErrors[idx] || {}).some(Boolean);
                        const label = member.name
                          ? `${member.name}${member.relationship ? ` - ${member.relationship}` : ''}`
                          : `Member ${idx + 1}`;

                        return (
                          <div key={idx} className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${hasErr ? 'border-red-300' : isOpen ? 'border-green-300' : 'border-gray-200'}`}>
                            <div
                              className={`flex items-center justify-between px-5 py-4 cursor-pointer select-none transition-colors ${isOpen ? 'bg-green-50 border-b border-green-100' : 'bg-white hover:bg-gray-50'}`}
                              onClick={() => toggleMember(idx)}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${hasErr ? 'bg-red-100' : 'bg-green-100'}`}>
                                  <User size={14} className={hasErr ? 'text-red-600' : 'text-green-700'} />
                                </div>
                                <span className="text-sm font-semibold text-gray-800">{label}</span>
                                {hasErr && <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full">Incomplete</span>}
                              </div>
                              <div className="flex items-center gap-2">
                                {familyMembers.length > 1 && (
                                  <button type="button" onClick={e => { e.stopPropagation(); removeMember(idx); }}
                                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                                    <Trash2 size={14} />
                                  </button>
                                )}
                                {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                              </div>
                            </div>

                            {isOpen && (
                              <div className="p-5 bg-white">
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name <RequiredStar /></label>
                                    <input className={inputClass(!!memberErrors[idx]?.name)} placeholder="e.g. Anuj Paul" value={member.name} onChange={e => updateMember(idx, 'name', e.target.value)} maxLength={100} />
                                    <FieldError msg={memberErrors[idx]?.name} />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Relationship <RequiredStar /></label>
                                    <select className={inputClass(!!memberErrors[idx]?.relationship)} value={member.relationship} onChange={e => updateMember(idx, 'relationship', e.target.value)}>
                                      <option value="">Select relationship</option>
                                      <option>Self</option>
                                      <option>Spouse</option>
                                      <option>Son</option>
                                      <option>Daughter</option>
                                      <option>Father</option>
                                      <option>Mother</option>
                                      <option>Sibling</option>
                                      <option>Other</option>
                                    </select>
                                    <FieldError msg={memberErrors[idx]?.relationship} />
                                  </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth <RequiredStar /></label>
                                    <input type="date" className={inputClass(!!memberErrors[idx]?.dob)} value={member.dob} onChange={e => updateMember(idx, 'dob', e.target.value)} />
                                    <FieldError msg={memberErrors[idx]?.dob} />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender <RequiredStar /></label>
                                    <select className={inputClass(!!memberErrors[idx]?.gender)} value={member.gender} onChange={e => updateMember(idx, 'gender', e.target.value)}>
                                      <option value="">Select gender</option>
                                      <option>Male</option>
                                      <option>Female</option>
                                      <option>Other</option>
                                    </select>
                                    <FieldError msg={memberErrors[idx]?.gender} />
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Smoking Status <RequiredStar /></label>
                                  <div className="flex gap-2">
                                    {['Smoker', 'Non-Smoker'].map(opt => (
                                      <button key={opt} type="button" onClick={() => updateMember(idx, 'smoker', opt)}
                                        className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                                          member.smoker === opt
                                            ? opt === 'Smoker' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-green-500 border-green-500 text-white'
                                            : memberErrors[idx]?.smoker ? 'bg-white border-red-300 text-gray-500' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                                        }`}>
                                        {opt}
                                      </button>
                                    ))}
                                  </div>
                                  <FieldError msg={memberErrors[idx]?.smoker} />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Medical History or Medicines
                                    <span className="text-gray-400 font-normal ml-1">(write "None" if not applicable)</span>
                                  </label>
                                  <textarea className={inputClass(false)} rows={2}
                                    placeholder="e.g. History of Disc Prolapse, No medicines — or write None"
                                    value={member.medicalHistory} onChange={e => updateMember(idx, 'medicalHistory', e.target.value)} maxLength={500} />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <button type="button" onClick={addMember}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-green-300 text-green-600 font-semibold text-sm hover:border-green-500 hover:bg-green-50 transition-all duration-200">
                      <Plus size={16} /> Add Member
                    </button>
                  </div>

                  {/* Existing Policy */}
                  <div>
                    <SectionLabel icon={Shield} text="Existing Policy (if any)" />
                    <textarea className={inputClass(false)} rows={3}
                      placeholder={"Company name, sum insured, renewal date\n(We will ask for the PDF over WhatsApp)\ne.g. LIC Rs.10L renewal Jan 2026, Star Health Rs.5L renewal Mar 2026"}
                      value={detailed.existingPolicies} onChange={e => setDetailed({ ...detailed, existingPolicies: e.target.value })} maxLength={500} />
                  </div>

                  {/* Additional Info */}
                  <div>
                    <SectionLabel icon={Heart} text="Any Other Information You Want to Share" />
                    <textarea className={inputClass(false)} rows={3}
                      placeholder="Children's education, home loan, retirement goals, or anything else..."
                      value={detailed.additionalInfo} onChange={e => setDetailed({ ...detailed, additionalInfo: e.target.value })} maxLength={500} />
                  </div>

                  {/* Consent */}
                  <div className={`rounded-2xl border-2 p-5 transition-colors ${detailedErrors.consent ? 'border-red-300 bg-red-50' : 'border-green-100 bg-green-50'}`}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input type="checkbox" checked={detailed.consent} onChange={e => setDetailed({ ...detailed, consent: e.target.checked })} className="sr-only" />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${detailed.consent ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300 group-hover:border-green-400'}`}>
                          {detailed.consent && <CheckCircle size={12} className="text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 leading-relaxed">
                        I confirm that the information shared above is accurate and I consent to being contacted for insurance advisory. <RequiredStar />
                      </span>
                    </label>
                    <FieldError msg={detailedErrors.consent} />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:-translate-y-0.5 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', boxShadow: '0 6px 22px rgba(22,163,74,0.35)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FileText size={20} /> Submit & Join Queue
                      </>
                    )}
                  </button>

                </form>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
};

export default ConsultationSection;