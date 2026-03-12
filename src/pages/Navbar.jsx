import { useState, useEffect } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import logo from '../assets/logo.png'
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex cursor-pointer items-center gap-2 group"
          >
        
              <img src={logo} className="w-9 h-9"/>
            

            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl text-green-700 tracking-tight">
                my<span className="text-orange-500">fund</span>box
              </span>

              <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                Financial Services
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-4 cursor-pointer py-2 text-sm font-medium text-gray-700 hover:text-green-700 rounded-md transition-colors duration-200"
              >
                {link.label} 
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-700 to-green-500 text-white text-sm font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-4 space-y-1 shadow-lg">

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-100 rounded-md transition-colors"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2">
            <button
              onClick={() => scrollTo("#contact")}
              className="w-full px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-700 to-green-500 text-white text-sm font-semibold shadow-md"
            >
              Get Started
            </button>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;