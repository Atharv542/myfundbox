import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Why Us", id: "why-us" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Smooth scroll function with offset
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    const offset = 90; // navbar height

    if (element) {
      const top =
        element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    setMobileOpen(false); // close mobile menu
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">

        {/* Logo */}
        <button
          onClick={() => handleScrollTo("home")}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center">
            <span className="font-bold text-white text-lg font-serif">M</span>
          </div>

          <span
            className={`font-bold text-xl transition-colors duration-300 font-serif ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            MyFundbox
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-yellow-500 ${
                scrolled ? "text-gray-700" : "text-white/90"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleScrollTo("contact")}
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition shadow-lg"
          >
            Book a Call
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors ${
            scrolled ? "text-gray-900" : "text-white"
          }`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md mt-2 mx-4 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="text-gray-800 font-medium hover:text-yellow-500 transition-colors py-2 text-left"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleScrollTo("contact")}
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-5 py-3 rounded-lg text-sm font-semibold text-center mt-2"
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;