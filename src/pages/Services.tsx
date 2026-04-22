import { useState, useRef } from "react";
import { Shield, TrendingUp, Users, FileSearch, ArrowRight, CalendarCheck, Crown, X, Upload, CheckCircle, Loader2, FileText, ExternalLink } from "lucide-react";

// ── Config — fill these in ──────────────────────────────────────
const NEETOCAL_LINK        = "https://anujpaul.neetocal.com/meeting-with-anuj-paul";
const GOOGLE_FORM_LINK     = "https://docs.google.com/forms/d/e/1FAIpQLSfM4ORm7B8KL-M9Nkngs513O0kWryWKujAcCKOeLi1KDMf7Cw/viewform"; // ← replace
const EMAILJS_SERVICE_ID   = "YOUR_SERVICE_ID";   // ← from EmailJS dashboard
const EMAILJS_TEMPLATE_ID  = "YOUR_TEMPLATE_ID";  // ← from EmailJS dashboard
const EMAILJS_PUBLIC_KEY   = "YOUR_PUBLIC_KEY";    // ← from EmailJS dashboard
// ────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Shield,
    title: "Insurance Services",
    description:
      "Comprehensive life, health, and general insurance plans tailored to protect you and your loved ones from life's uncertainties.",
    features: ["Life Insurance", "Term Insurance", "General Insurance"],
    accent: "#16a34a",
    accentLight: "#f0fdf4",
    accentBorder: "#bbf7d0",
    isPremium: true,
    premiumLabel: "Advisory",
    cta: { type: "form", label: "Fill the form to get started" },
  },
  {
    icon: TrendingUp,
    title: "Mutual Fund Investment",
    description:
      "Expert-guided mutual fund portfolios designed to maximise returns while managing risk according to your financial goals.",
    features: ["Goal Based Planning", "Investment Planning", "Retirement Planning"],
    accent: "#0ea5e9",
    accentLight: "#f0f9ff",
    accentBorder: "#bae6fd",
    isPremium: true,
    premiumLabel: "Advisory",
    cta: { type: "google-form", label: "Fill the form to get started" },
  },
  {
    icon: FileSearch,
    title: "Policy Evaluation",
    description:
      "Get a thorough, unbiased review of your existing insurance policies to ensure you are getting the right coverage at the right price.",
    features: ["Coverage Analysis", "Gap Identification", "Upgrade Guidance"],
    accent: "#8b5cf6",
    accentLight: "#faf5ff",
    accentBorder: "#ddd6fe",
    isPremium: true,
    premiumLabel: "Advisory",
    cta: { type: "policy-popup", label: "Submit your policy" },
  },
  {
    icon: Users,
    title: "1-to-1 Consultation",
    description:
      "Personalised financial planning sessions with certified advisors who understand your unique needs and aspirations.",
    features: ["Investment / Goal Based Planning", "Retirement Planning", "Risk Assessment"],
    accent: "#16a34a",
    accentLight: "#f0fdf4",
    accentBorder: "#bbf7d0",
    isPremium: true,
    premiumLabel: "Book a Slot",
    cta: { type: "neetocal", label: "Book Now" },
  },
];

// ── EmailJS loader (CDN) ─────────────────────────────────────────
const loadEmailJS = () =>
  new Promise((resolve) => {
    if (window.emailjs) { resolve(window.emailjs); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => { window.emailjs.init(EMAILJS_PUBLIC_KEY); resolve(window.emailjs); };
    document.head.appendChild(s);
  });

// ── File → base64 ────────────────────────────────────────────────
const toBase64 = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

// ── Policy Evaluation Popup ──────────────────────────────────────
const PolicyPopup = ({ onClose }) => {
  const [form, setForm]       = useState({ name: "", email: "", phone: "" });
  const [file, setFile]       = useState(null);
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [errors, setErrors]   = useState({});
  const fileRef               = useRef();

  const validate = () => {
    const e = {};
    if (!form.name.trim())                              e.name  = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) e.phone = "Valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      const ejs = await loadEmailJS();

      const templateParams = {
        from_name:  form.name,
        from_email: form.email,
        phone:      form.phone,
        file_name:  file ? file.name : "No file attached",
        // If you want the file as attachment, attach base64 string below
        // file_data: file ? await toBase64(file) : "",
      };

      await ejs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const inputStyle = (hasErr) => ({
    width: "100%",
    height: 42,
    borderRadius: 10,
    border: `1.5px solid ${hasErr ? "#fca5a5" : "#e5e7eb"}`,
    background: hasErr ? "#fff7f7" : "#fff",
    fontSize: 13.5,
    fontFamily: "'Poppins', sans-serif",
    color: "#111827",
    padding: "0 14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s",
  });

  return (
    // Overlay
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeInOverlay .2s ease",
      }}
    >
      <style>{`
        @keyframes fadeInOverlay { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUpModal  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        .pe-input:focus { border-color: #8b5cf6 !important; }
      `}</style>

      {/* Modal */}
      <div style={{
        background: "#fff",
        borderRadius: 24,
        width: "100%",
        maxWidth: 480,
        boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
        overflow: "hidden",
        animation: "slideUpModal .25s ease",
        position: "relative",
      }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
          padding: "24px 28px 20px",
          position: "relative",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileSearch size={20} color="#fff" strokeWidth={2} />
            </div>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: 0 }}>
              Policy Evaluation Request
            </h3>
          </div>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.75)", margin: 0 }}>
            Share your details & policy document — our advisor will review and get back within 24 hrs.
          </p>
          <button
            onClick={onClose}
            style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.28)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
          >
            <X size={16} color="#fff" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px 28px" }}>
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle size={30} color="#16a34a" strokeWidth={2} />
              </div>
              <h4 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Request Submitted!</h4>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
                We've received your details. Our advisor will reach out within 24 hours.
              </p>
              <button
                onClick={onClose}
                style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: "#8b5cf6", background: "none", border: "none", cursor: "pointer" }}
              >
                Close ✕
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Name */}
              <div>
                <label style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                  Full Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  className="pe-input"
                  style={inputStyle(!!errors.name)}
                  placeholder="e.g. Anuj Paul"
                  value={form.name}
                  onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                  maxLength={100}
                />
                {errors.name && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                  Email ID <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  className="pe-input"
                  type="email"
                  style={inputStyle(!!errors.email)}
                  placeholder="e.g. anuj@example.com"
                  value={form.email}
                  onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                  maxLength={255}
                />
                {errors.email && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                  Phone Number <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  className="pe-input"
                  type="tel"
                  style={inputStyle(!!errors.phone)}
                  placeholder="e.g. 98765 43210"
                  value={form.phone}
                  onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: undefined }); }}
                  maxLength={15}
                />
                {errors.phone && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#ef4444", marginTop: 4 }}>{errors.phone}</p>}
              </div>

              {/* File Upload */}
              <div>
                <label style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                  Upload Policy Document
                  <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: 6 }}>(PDF, JPG, PNG — optional)</span>
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: `2px dashed ${file ? "#8b5cf6" : "#d1d5db"}`,
                    borderRadius: 12,
                    padding: "18px 16px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: file ? "#faf5ff" : "#fafafa",
                    transition: "all .2s",
                  }}
                  onMouseEnter={e => { if (!file) e.currentTarget.style.borderColor = "#8b5cf6"; e.currentTarget.style.background = "#faf5ff"; }}
                  onMouseLeave={e => { if (!file) e.currentTarget.style.borderColor = "#d1d5db"; if (!file) e.currentTarget.style.background = "#fafafa"; }}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={e => setFile(e.target.files[0] || null)}
                  />
                  {file ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <FileText size={18} color="#8b5cf6" />
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7c3aed", fontWeight: 500 }}>{file.name}</span>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setFile(null); }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", alignItems: "center" }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload size={22} color="#9ca3af" style={{ margin: "0 auto 8px" }} />
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, color: "#6b7280", margin: 0 }}>
                        Drag & drop or <span style={{ color: "#8b5cf6", fontWeight: 600 }}>browse</span>
                      </p>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>PDF, JPG or PNG</p>
                    </>
                  )}
                </div>
              </div>

              {status === "error" && (
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#ef4444", textAlign: "center" }}>
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  height: 44,
                  borderRadius: 12,
                  border: "none",
                  background: status === "loading" ? "#a78bfa" : "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
                  color: "#fff",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "opacity .2s, transform .2s",
                  boxShadow: "0 4px 18px rgba(139,92,246,0.35)",
                }}
                onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                {status === "loading" ? (
                  <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</>
                ) : (
                  <>Submit Request <ArrowRight size={15} /></>
                )}
              </button>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Section ─────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  .svc-pf { font-family: 'Poppins', sans-serif; }

  .svc-section {
    background: #f8fafb;
    background-image:
      radial-gradient(ellipse 50% 40% at 100% 0%, rgba(209,250,229,0.45) 0%, transparent 60%),
      radial-gradient(ellipse 40% 35% at 0% 100%, rgba(187,247,208,0.30) 0%, transparent 55%);
    padding: 96px 0 104px;
  }

  .svc-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: #f0fdf4; border: 1px solid #bbf7d0;
    border-radius: 999px; padding: 6px 16px;
    font-size: 12px; font-weight: 600; color: #15803d;
    letter-spacing: .06em; text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
  }
  .svc-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }

  .svc-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 24px; margin-top: 52px;
  }

  .svc-card {
    background: #ffffff; border-radius: 22px; padding: 32px 28px 28px;
    border: 1.5px solid #e5e7eb; position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
    cursor: default;
  }
  .svc-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.07); }

  .svc-top-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    border-radius: 22px 22px 0 0; opacity: 0; transition: opacity .35s ease;
  }
  .svc-card:hover .svc-top-bar { opacity: 1; }

  .svc-icon-box {
    width: 48px; height: 48px; border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px; flex-shrink: 0; transition: transform .3s ease;
  }
  .svc-card:hover .svc-icon-box { transform: scale(1.07); }

  .premium-pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 600;
    padding: 3px 9px; border-radius: 999px; letter-spacing: 0.04em;
    position: absolute; top: 16px; right: 16px;
  }

  .svc-feature { display: flex; align-items: center; gap: 9px; font-size: 13px; color: #4b5563; font-weight: 400; }
  .svc-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  .svc-link-cta {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    text-decoration: none; background: none; border: none; padding: 0;
    cursor: pointer; margin-top: 20px; position: relative; width: fit-content;
    transition: gap .2s ease;
  }
  .svc-link-cta::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1.5px; border-radius: 2px; transition: width .25s ease;
  }
  .svc-link-cta:hover { gap: 8px; }
 

  .svc-divider { border: none; border-top: 1px solid #f3f4f6; margin: 16px 0 0; }

  @media (max-width: 600px) {
    .svc-grid    { grid-template-columns: 1fr; gap: 18px; }
    .svc-section { padding: 72px 0 80px; }
    .svc-card    { padding: 26px 22px 22px; }
  }
`;

const ServicesSection = () => {
  const [showPolicyPopup, setShowPolicyPopup] = useState(false);

  const scrollToContact = () => {
    document.getElementById("insurance-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCTA = (type) => {
    if (type === "form")          scrollToContact();
    if (type === "policy-popup")  setShowPolicyPopup(true);
    if (type === "google-form")   window.open(GOOGLE_FORM_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <style>{styles}</style>

      {showPolicyPopup && <PolicyPopup onClose={() => setShowPolicyPopup(false)} />}

      <section id="services" className="svc-section svc-pf">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

          {/* Heading */}
          <div style={{ textAlign: "center" }}>
            <div className="svc-badge" style={{ marginBottom: 18 }}>
              <span className="svc-badge-dot" />
              Our Services
            </div>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800,
              color: "#0f172a", marginBottom: 14, letterSpacing: "-0.4px", lineHeight: 1.15,
            }}>
              Everything You Need to{" "}
              <span style={{
                background: "linear-gradient(90deg, #15803d, #22c55e)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Secure Your Future
              </span>
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 16, color: "#6b7280",
              maxWidth: 540, margin: "0 auto", lineHeight: 1.75, fontWeight: 400,
            }}>
              Comprehensive financial solutions designed to protect, grow, and plan — all under one roof.
            </p>
          </div>

          {/* Cards */}
          <div className="svc-grid">
            {services.map((svc) => {
              const Icon = svc.icon;
              const isNeetocal    = svc.cta?.type === "neetocal";
              const isGoogleForm  = svc.cta?.type === "google-form";
              const isPolicyPopup = svc.cta?.type === "policy-popup";

              return (
                <div
                  key={svc.title}
                  className="svc-card"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = svc.accentBorder; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
                >
                  <div className="svc-top-bar" style={{ background: `linear-gradient(90deg, ${svc.accent}, ${svc.accentBorder})` }} />

                  {svc.isPremium && (
                    <div
                      className="premium-pill"
                      style={
                        isNeetocal
                          ? { background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff" }
                          : { background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", color: "#15803d" }
                      }
                    >
                      <Crown size={9} />
                      {svc.premiumLabel}
                    </div>
                  )}

                  <div className="svc-icon-box" style={{ background: svc.accentLight, border: `1.5px solid ${svc.accentBorder}` }}>
                    <Icon size={22} color={svc.accent} strokeWidth={2.2} />
                  </div>

                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 10, lineHeight: 1.3 }}>
                    {svc.title}
                  </h3>

                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13.5, color: "#6b7280", lineHeight: 1.75, marginBottom: 18, fontWeight: 400, flex: 1 }}>
                    {svc.description}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {svc.features.map(f => (
                      <div key={f} className="svc-feature">
                        <div className="svc-dot" style={{ background: svc.accent }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  {svc.cta && (
                    <>
                      <hr className="svc-divider" />

                      {isNeetocal ? (
                        <a
                          href={NEETOCAL_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="svc-link-cta"
                          style={{ color: svc.accent }}
                        >
                          <CalendarCheck size={14} strokeWidth={2.2} />
                          {svc.cta.label}
                          <ArrowRight size={13} strokeWidth={2.2} />
                          <style>{`.svc-link-cta::after { background: ${svc.accent}; }`}</style>
                        </a>

                      ) : isGoogleForm ? (
                        <button
                          onClick={() => handleCTA("google-form")}
                          className="svc-link-cta"
                          style={{ color: svc.accent }}
                        >
                          <ExternalLink size={13} strokeWidth={2.2} />
                          {svc.cta.label}
                          <ArrowRight size={13} strokeWidth={2.2} />
                          <style>{`.svc-link-cta::after { background: ${svc.accent}; }`}</style>
                        </button>

                      ) : isPolicyPopup ? (
                        <button
                          onClick={() => handleCTA("policy-popup")}
                          className="svc-link-cta"
                          style={{ color: svc.accent }}
                        >
                          <FileSearch size={13} strokeWidth={2.2} />
                          {svc.cta.label}
                          <ArrowRight size={13} strokeWidth={2.2} />
                          <style>{`.svc-link-cta::after { background: ${svc.accent}; }`}</style>
                        </button>

                      ) : (
                        <button
                          onClick={() => handleCTA("form")}
                          className="svc-link-cta"
                          style={{ color: svc.accent }}
                        >
                          {svc.cta.label}
                          <ArrowRight size={13} strokeWidth={2.2} />
                          <style>{`.svc-link-cta::after { background: ${svc.accent}; }`}</style>
                        </button>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;