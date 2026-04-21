import { Shield, TrendingUp, Users, FileSearch, ArrowRight, CalendarCheck, Crown } from "lucide-react";

const NEETOCAL_LINK = "https://anujpaul.neetocal.com/meeting-with-anuj-paul";

const services = [
  {
    icon: Shield,
    title: "Insurance Services",
    description:
      "Comprehensive life, health, and general insurance plans tailored to protect you and your loved ones from life's uncertainties.",
    features: ["Life Insurance", "Health Insurance", "Term Plans", "Child Plans"],
    accent: "#16a34a",
    accentLight: "#f0fdf4",
    accentBorder: "#bbf7d0",
    isPremium: true,
    premiumLabel: "Paid Advisory",
    cta: { type: "form", label: "Fill the form to get started" },
  },
  {
    icon: TrendingUp,
    title: "Mutual Fund Investment",
    description:
      "Expert-guided mutual fund portfolios designed to maximise returns while managing risk according to your financial goals.",
    features: ["SIP Planning", "Equity Funds", "Debt Funds", "Tax Saving Funds"],
    accent: "#0ea5e9",
    accentLight: "#f0f9ff",
    accentBorder: "#bae6fd",
    isPremium: false,
    cta: null,
  },
  {
    icon: FileSearch,
    title: "Policy Evaluation",
    description:
      "Get a thorough, unbiased review of your existing insurance policies to ensure you are getting the right coverage at the right price.",
    features: ["Coverage Analysis", "Premium Audit", "Gap Identification", "Upgrade Guidance"],
    accent: "#8b5cf6",
    accentLight: "#faf5ff",
    accentBorder: "#ddd6fe",
    isPremium: true,
    premiumLabel: "Paid Advisory",
    cta: { type: "form", label: "Fill the form to get started" },
  },
  {
    icon: Users,
    title: "1-to-1 Consultation",
    description:
      "Personalised financial planning sessions with certified advisors who understand your unique needs and aspirations.",
    features: ["Goal Planning", "Risk Assessment", "Portfolio Review", "Retirement Planning"],
    accent: "#16a34a",
    accentLight: "#f0fdf4",
    accentBorder: "#bbf7d0",
    isPremium: true,
    premiumLabel: "Book a Slot",
    cta: { type: "neetocal", label: "Book a free call" },
  },
];

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
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 999px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 600;
    color: #15803d;
    letter-spacing: .06em;
    text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
  }
  .svc-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22c55e;
  }

  .svc-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-top: 52px;
  }

  /* ── Card: very subtle lift only ── */
  .svc-card {
    background: #ffffff;
    border-radius: 22px;
    padding: 32px 28px 28px;
    border: 1.5px solid #e5e7eb;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
    cursor: default;
  }
  .svc-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 36px rgba(0,0,0,0.07);
  }

  /* thin top accent bar — fades in on hover */
  .svc-top-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    border-radius: 22px 22px 0 0;
    opacity: 0;
    transition: opacity .35s ease;
  }
  .svc-card:hover .svc-top-bar { opacity: 1; }

  /* icon box */
  .svc-icon-box {
    width: 48px; height: 48px;
    border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
    flex-shrink: 0;
    transition: transform .3s ease;
  }
  .svc-card:hover .svc-icon-box { transform: scale(1.07); }

  /* premium pill */
  .premium-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Poppins', sans-serif;
    font-size: 10px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 999px;
    letter-spacing: 0.04em;
    position: absolute;
    top: 16px;
    right: 16px;
  }

  /* feature list */
  .svc-feature {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 13px;
    color: #4b5563;
    font-weight: 400;
  }
  .svc-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── Link-style CTA ── */
  .svc-link-cta {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin-top: 20px;
    position: relative;
    width: fit-content;
    transition: gap .2s ease;
  }
  .svc-link-cta::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1.5px;
    border-radius: 2px;
    transition: width .25s ease;
  }

  .svc-link-cta:hover { gap: 8px; }

  .svc-divider {
    border: none;
    border-top: 1px solid #f3f4f6;
    margin: 16px 0 0;
  }

  @media (max-width: 600px) {
    .svc-grid    { grid-template-columns: 1fr; gap: 18px; }
    .svc-section { padding: 72px 0 80px; }
    .svc-card    { padding: 26px 22px 22px; }
  }
`;

const ServicesSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>

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
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: 14,
              letterSpacing: "-0.4px",
              lineHeight: 1.15,
            }}>
              Everything You Need to{" "}
              <span style={{
                background: "linear-gradient(90deg, #15803d, #22c55e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Secure Your Future
              </span>
            </h2>

            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 16,
              color: "#6b7280",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.75,
              fontWeight: 400,
            }}>
              Comprehensive financial solutions designed to protect, grow, and plan — all under one roof.
            </p>
          </div>

          {/* Cards */}
          <div className="svc-grid">
            {services.map((svc) => {
              const Icon = svc.icon;
              const isNeetocal = svc.cta?.type === "neetocal";

              return (
                <div
                  key={svc.title}
                  className="svc-card"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = svc.accentBorder; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
                >
                  {/* Top accent bar */}
                  <div
                    className="svc-top-bar"
                    style={{ background: `linear-gradient(90deg, ${svc.accent}, ${svc.accentBorder})` }}
                  />

                  {/* Premium pill */}
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

                  {/* Icon */}
                  <div
                    className="svc-icon-box"
                    style={{ background: svc.accentLight, border: `1.5px solid ${svc.accentBorder}` }}
                  >
                    <Icon size={22} color={svc.accent} strokeWidth={2.2} />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}>
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 13.5,
                    color: "#6b7280",
                    lineHeight: 1.75,
                    marginBottom: 18,
                    fontWeight: 400,
                    flex: 1,
                  }}>
                    {svc.description}
                  </p>

                  {/* Features */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {svc.features.map(f => (
                      <div key={f} className="svc-feature">
                        <div className="svc-dot" style={{ background: svc.accent }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Link-style CTA */}
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
                      ) : (
                        <button
                          onClick={scrollToContact}
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