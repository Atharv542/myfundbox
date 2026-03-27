import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Logo + About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center">
                <span className="font-bold text-white text-lg font-serif">M</span>
              </div>

              <span className="font-bold text-xl font-serif">
                MyFundbox
              </span>
            </div>

            <p className="text-gray-400 max-w-sm leading-relaxed">
              Your trusted partner in building financial security. Expert guidance in insurance, investments, and personalized financial planning.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-serif">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {["Home", "Services", "About", "Why Us", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-serif">
              Services
            </h4>

            <ul className="space-y-3">
              {[
                "Life Insurance",
                "Health Insurance",
                "Mutual Funds",
                "SIP Planning",
                "Consultation",
              ].map((s) => (
                <li key={s}>
                  <span className="text-gray-400 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-700 mb-8" />

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MyFundbox. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;