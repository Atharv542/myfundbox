import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from '../assets/logo.png'
const Footer = () => {
  
  return (
    <footer style={{ background: '#0a0a0a', fontFamily: "'Poppins', sans-serif" }} className="text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Logo + About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
             <img src={logo} className="w-60 h-auto object-cover"/>
            </div>

            <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#6b7280' }}>
              Your trusted partner in building financial security. Expert guidance in insurance, investments, and personalized financial planning.
            </p>

            {/* Trust badge */}
            <div
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-xs font-medium"
              style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', color: '#4ade80' }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)', display: 'inline-block', flexShrink: 0 }} />
              Trusted by 1000+ families
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.2)', color: '#4ade80' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#16a34a';
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(22,163,74,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(22,163,74,0.2)';
                    e.currentTarget.style.color = '#4ade80';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: '#16a34a' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Services", "About", "Why Us"].map((link) => (
                <li key={link} className="flex items-center gap-2">
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#16a34a', display: 'inline-block', flexShrink: 0 }} />
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#9ca3af' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#4ade80'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: '#16a34a' }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Insurance Services",
                "Mutual Funds",
                "Policy Evaluation",
                "1:1 Consultation",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#15803d', display: 'inline-block', flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: '#9ca3af' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'linear-gradient(to right, transparent, rgba(22,163,74,0.5), transparent)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#4b5563' }}>
            © {new Date().getFullYear()} MyFundbox. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs" style={{ color: '#4b5563' }}>
            <span>Made with</span>
            <span style={{ color: '#16a34a', fontSize: 14 }}>♥</span>
            <span>for every Indian family</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;