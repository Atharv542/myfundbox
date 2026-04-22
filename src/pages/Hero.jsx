import { useTypingAnimation } from "../hooks/useTypingAnimation";
import { ArrowRight, Phone, ShieldCheck, CheckCircle, Users } from "lucide-react";

const words = ["Future", "Family", "Dreams", "Wealth"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  .pf { font-family: 'Poppins', sans-serif; }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideLeft {
    from { opacity:0; transform:translateX(40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes floatY {
    0%,100% { transform:translateY(0); }
    50%     { transform:translateY(-10px); }
  }
  @keyframes floatY2 {
    0%,100% { transform:translateY(0) scale(1); }
    50%     { transform:translateY(-12px) scale(1.02); }
  }
  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes shimmerBar {
    0%   { background-position:-200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulseSoft {
    0%,100% { box-shadow:0 0 0 0 rgba(22,163,74,0.3); }
    50%     { box-shadow:0 0 0 8px rgba(22,163,74,0); }
  }
  @keyframes spinSlow { to { transform:rotate(360deg); } }

  .afu1 { animation: fadeUp .75s ease both; animation-delay:.15s; }
  .afu2 { animation: fadeUp .75s ease both; animation-delay:.35s; }
  .afu3 { animation: fadeUp .75s ease both; animation-delay:.52s; }
  .afu4 { animation: fadeUp .75s ease both; animation-delay:.70s; }
  .asl  { animation: slideLeft .9s ease both; animation-delay:.3s; }

  .float1    { animation: floatY  6s ease-in-out infinite; }
  .float2    { animation: floatY2 7s ease-in-out infinite; animation-delay:.8s; }
  .float3    { animation: floatY  5s ease-in-out infinite; animation-delay:1.5s; }
  .blink     { animation: blink 1s step-end infinite; }
  .pulseSoft { animation: pulseSoft 2.5s ease-in-out infinite; }
  .spinSlow  { animation: spinSlow 28s linear infinite; }

  /* ── Background ── */
  .hero-bg {
    background: #ffffff;
    background-image:
      radial-gradient(ellipse 65% 55% at 75% 35%, rgba(209,250,229,0.65) 0%, transparent 65%),
      radial-gradient(ellipse 45% 45% at 10% 85%, rgba(187,247,208,0.40) 0%, transparent 60%),
      radial-gradient(ellipse 30% 30% at 90% 85%, rgba(220,252,231,0.30) 0%, transparent 55%);
  }
  .dot-grid {
    background-image: radial-gradient(rgba(22,163,74,0.09) 1.5px, transparent 1.5px);
    background-size: 32px 32px;
  }

  /* ── Trust pill ── */
  .trust-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 999px;
    padding: 7px 16px;
    font-family: 'Poppins', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    color: #15803d;
  }
  .pulse-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.25);
    display: inline-block;
    flex-shrink: 0;
  }

  /* ── Shimmer heading word ── */
  .shimmer-word {
    background: linear-gradient(90deg, #15803d, #22c55e, #86efac, #22c55e, #15803d);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerBar 3.2s linear infinite;
  }

  /* ── Buttons ── */
  .btn-green {
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
    color: #fff;
    border-radius: 14px;
    padding: 14px 28px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 15px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border: none;
    box-shadow: 0 6px 22px rgba(22,163,74,0.38);
    transition: all .25s ease;
    white-space: nowrap;
  }
  .btn-green:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(22,163,74,0.52); }

  .btn-out {
    background: #fff;
    color: #15803d;
    border: 1.5px solid #bbf7d0;
    border-radius: 14px;
    padding: 14px 28px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 15px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: all .25s ease;
    white-space: nowrap;
  }
  .btn-out:hover { border-color: #16a34a; background: #f0fdf4; transform: translateY(-2px); }

  /* ── Photo frame ── */
  .photo-frame {
    border-radius: 36px 36px 110px 36px;
    overflow: hidden;
    box-shadow: 0 40px 90px rgba(22,163,74,0.16), 0 10px 30px rgba(0,0,0,0.09);
    position: relative;
    width: 100%;
    height: 100%;
  }
  .photo-frame img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .photo-ring {
    position: absolute;
    inset: -14px;
    border-radius: 48px 48px 124px 48px;
    border: 2px dashed rgba(22,163,74,0.22);
    pointer-events: none;
  }

  /* ── Floating badges ── */
  .badge {
    position: absolute;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 36px rgba(0,0,0,0.11), 0 2px 6px rgba(0,0,0,0.06);
    padding: 11px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    z-index: 20;
    font-family: 'Poppins', sans-serif;
  }
  .badge-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .badge-title { font-size: 12px; font-weight: 700; color: #0f172a; line-height: 1.2; }
  .badge-sub   { font-size: 10.5px; color: #6b7280; margin-top: 1px; }

  /* ── LAYOUT: hero inner ── */
  .hero-inner {
    display: flex;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 130px 60px 80px;
    gap: 60px;
    position: relative;
    z-index: 1;
  }
  .hero-left  { flex: 0 0 52%; max-width: 580px; }
  .hero-right { flex: 1; position: relative; height: 520px; }

  /* ── TABLET: <= 1024px ── */
  @media (max-width: 1024px) {
    .hero-inner  { padding: 110px 40px 60px; gap: 40px; }
    .hero-right  { height: 440px; }
    /* pull badges slightly inward so they don't overflow */
    .badge-tl { left: -10px !important; }
    .badge-br { right: -10px !important; }
    .badge-mr { right: -10px !important; }
  }

  /* ── MOBILE: <= 768px ── */
  @media (max-width: 768px) {
    .hero-inner {
      flex-direction: column;
      padding: 100px 24px 56px;
      gap: 48px;
      align-items: flex-start;
    }
    .hero-left  { flex: none; width: 100%; max-width: 100%; }
    .hero-right {
      width: 100%;
      height: 340px;
      /* extra side room for badges */
      margin: 0 auto;
      max-width: 480px;
      align-self: center;
    }
    /* reduce badge overflow on mobile */
    .badge-tl { top: 16px !important; left: 10px !important; }
    .badge-br { bottom: 20px !important; right: 10px !important; }
    .badge-mr { display: none !important; }

    .btn-green,
    .btn-out   { width: 100%; justify-content: center; font-size: 14.5px; padding: 14px 20px; }
    .btn-row   { flex-direction: column !important; }

    .trust-pill { font-size: 11.5px; }
  }

  /* ── SMALL MOBILE: <= 420px ── */
  @media (max-width: 420px) {
    .hero-right { height: 280px; }
    .badge       { padding: 9px 12px; gap: 8px; }
    .badge-icon  { width: 30px; height: 30px; }
    .badge-title { font-size: 11px; }
    .badge-sub   { font-size: 10px; }
  }
`;

const HeroSection = () => {
  const typedWord = useTypingAnimation(words, 120, 80, 1800);

  return (
    <>
      <style>{styles}</style>

      <section
        id="home"
        className="pf hero-bg"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", position: "relative" }}
      >
        {/* Dot grid */}
        <div className="dot-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />

        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:-120, right:-80, width:480, height:480, borderRadius:"50%", background:"rgba(187,247,208,0.4)", filter:"blur(60px)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"absolute", bottom:-80, left:-60, width:340, height:340, borderRadius:"50%", background:"rgba(220,252,231,0.55)", filter:"blur(50px)", pointerEvents:"none", zIndex:0 }} />

        <div className="hero-inner">

          {/* ── LEFT ── */}
          <div className="hero-left">

            {/* Trust pill */}
            <div className="trust-pill afu1" style={{ marginBottom: 26 }}>
              <span className="pulse-dot pulseSoft" />
              Trusted by 1000+ families
            </div>

            {/* Heading */}
            <h1 className="afu2" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(36px, 4.8vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.13,
              color: "#0f172a",
              marginBottom: 18,
              letterSpacing: "-0.5px",
            }}>
              Protect What<br />
              Matters —<br />
              Your{" "}
              <span className="shimmer-word">{typedWord}</span>
              <span className="blink" style={{ color: "#22c55e", marginLeft: 2 }}>|</span>
            </h1>

            {/* Sub-heading */}
            <p className="afu3" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(14px, 1.5vw, 16.5px)",
              color: "#4b5563",
              lineHeight: 1.8,
              maxWidth: 490,
              marginBottom: 34,
              fontWeight: 400,
            }}>
              Expert term insurance plans, policy evaluation &amp; personalised
              financial guidance — making security simple for every Indian family.
            </p>

            {/* Buttons */}
            <div className="afu4 btn-row" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                className="btn-green"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started <ArrowRight size={17} />
              </button>
              <button
                className="btn-out"
                onClick={() => document.getElementById("insurance-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Phone size={15} /> Book a Consultation
              </button>
            </div>

          </div>

          {/* ── RIGHT — lifestyle photo ── */}
          <div className="hero-right asl">

            {/* Rotating dashed ring */}
            <div className="photo-ring spinSlow" />

            {/* Photo */}
            <div className="photo-frame float1">
              <img
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=720&h=900&fit=crop&crop=center&q=85"
                alt="Happy family protected by FinGrow insurance"
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
                background: "linear-gradient(to top, rgba(240,253,244,0.55), transparent)",
                pointerEvents: "none",
              }} />
            </div>

           

           

           

            {/* Decorative circle */}
            <div style={{
              position: "absolute", bottom: -20, left: -20,
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg,#4ade80,#16a34a)",
              opacity: 0.18, zIndex: 0, pointerEvents: "none",
            }} />

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;