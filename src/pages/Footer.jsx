import {
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import logo from '../assets/logo.png'
const quickLinks = ["Home", "About Us", "Services", "Why Us", "Our Team", "Contact"];

const services = [
  "Investment Advisory",
  "Mutual Fund Management",
  "Wealth Planning",
  "Insurance Solutions",
  "Fixed Income & Bonds",
  "Tax & Compliance",
];

const Footer = () => {
  const scrollTo = (id) => {
    const map = {
      Home: "#home",
      "About Us": "#about",
      Services: "#services",
      "Why Us": "#why-us",
      "Our Team": "#team",
      Contact: "#contact",
    };

    const el = document.querySelector(map[id] || "#home");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-green-900 text-white">

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-2 mb-5">
              <img src={logo} className="w-9 h-9"/>

              <div>
                <div className="font-bold text-xl tracking-tight">
                  my<span className="text-orange-500">fund</span>box
                </div>

                <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Financial Services
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted financial partner since 2009. SEBI registered,
              transparent, and committed to your wealth creation journey.
            </p>

            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-5 text-white">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200 text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-base mb-5 text-white">
              Our Services
            </h4>

            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo("Services")}
                    className="text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200 text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-base mb-5 text-white">
              Contact Info
            </h4>

            <div className="space-y-4">

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <div className="text-gray-400 text-xs mb-0.5">Call</div>
                  <div className="text-sm text-white">+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <div className="text-gray-400 text-xs mb-0.5">Email</div>
                  <div className="text-sm text-white">info@myfundbox.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <div className="text-gray-400 text-xs mb-0.5">Office</div>
                  <div className="text-sm text-white leading-relaxed">
                    14th Floor, DLF Cyber City,<br />
                    Gurugram, Haryana 122002
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-xs">
            © 2024 myfundbox Financial Services. All rights reserved.
          </p>

          <div className="flex items-center gap-4">

            <a
              href="#"
              className="text-gray-500 hover:text-white text-xs transition-colors"
            >
              Privacy Policy
            </a>

            <span className="text-gray-700">|</span>

            <a
              href="#"
              className="text-gray-500 hover:text-white text-xs transition-colors"
            >
              Terms of Service
            </a>

            <span className="text-gray-700">|</span>

            <a
              href="#"
              className="text-gray-500 hover:text-white text-xs transition-colors"
            >
              Disclaimer
            </a>

          </div>
        </div>

      </div>

      {/* Regulatory Disclaimer */}
      <div className="bg-black/20 border-t border-white/10">

        <div className="container mx-auto px-4 sm:px-6 py-3">

          <p className="text-gray-500 text-[10px] leading-relaxed text-center">
            Mutual fund investments are subject to market risks. Please read all
            scheme related documents carefully before investing. myfundbox is a
            SEBI Registered Investment Advisor (RIA). Registration No:
            INA000XXXXXX.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;