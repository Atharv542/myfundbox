import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import logo from '../assets/Myfundbox logo-16.png'
const navLinks = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Why Us", id: "why-us" },
  
];

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  .nav-pf { font-family: 'Poppins', sans-serif; }

  .nav-scrolled {
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(18px);
    box-shadow: 0 1px 0 rgba(0,0,0,0.07), 0 4px 20px rgba(0,0,0,0.05);
    border-bottom: 1px solid rgba(187,247,208,0.5);
  }
  .nav-top { background: transparent; }

  .nav-link {
    font-size: 14px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: #374151;
    position: relative;
    padding-bottom: 2px;
    background: none; border: none; cursor: pointer;
    transition: color .2s;
  }
  .nav-link::after {
    content:'';
    position:absolute; bottom:-2px; left:0;
    width:0; height:2px;
    background: #16a34a;
    border-radius:2px;
    transition: width .25s ease;
  }
  .nav-link:hover { color: #15803d; }
  .nav-link:hover::after { width:100%; }

  .nav-link-top {
    font-size: 14px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: #1a2e1c;
    position: relative;
    padding-bottom: 2px;
    background: none; border: none; cursor: pointer;
    transition: color .2s;
  }
  .nav-link-top::after {
    content:'';
    position:absolute; bottom:-2px; left:0;
    width:0; height:2px;
    background:#16a34a;
    border-radius:2px;
    transition:width .25s ease;
  }
  .nav-link-top:hover { color:#16a34a; }
  .nav-link-top:hover::after { width:100%; }

  .cta-btn {
    background: linear-gradient(135deg,#16a34a,#15803d);
    color:#fff; border:none;
    border-radius:12px;
    padding: 10px 22px;
    font-family:'Poppins',sans-serif;
    font-size:13.5px; font-weight:600;
    cursor:pointer;
    box-shadow:0 3px 14px rgba(22,163,74,0.32);
    transition:all .25s ease;
  }
  .cta-btn:hover { transform:translateY(-1px); box-shadow:0 5px 20px rgba(22,163,74,0.45); }

  .mobile-panel {
    animation: slideDown .22s ease forwards;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(187,247,208,0.6);
    border-radius: 18px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.10);
  }
  @keyframes slideDown {
    from { opacity:0; transform:translateY(-8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .logo-ring {
    background: linear-gradient(135deg,#16a34a,#4ade80);
    box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
  }

  @media (max-width:768px) {
    .hidden-mobile { display:none !important; }
    .mobile-toggle { display:flex !important; }
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <style>{navStyles}</style>
      <nav className={`nav-pf fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "nav-scrolled py-3" : "nav-top py-5"}`}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px" }}>

          {/* Logo */}
          <button
            onClick={() => handleScrollTo("home")}
            style={{ display:"flex", alignItems:"center", gap:12, background:"none", border:"none", cursor:"pointer" }}
          >
           <img src={logo} alt="Logo" className=" w-30 md:w-40 h-auto"/>
          </button>

          {/* Desktop links */}
          <div className="hidden-mobile" style={{ display:"flex", alignItems:"center", gap:32 }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={scrolled ? "nav-link" : "nav-link-top"}
              >
                {link.label}
              </button>
            ))}
            <button className="cta-btn" onClick={() => handleScrollTo("insurance-form")}>
              Book Call
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background:"none", border:"none", cursor:"pointer", color:"#374151", display:"none" }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mobile-panel" style={{ margin:"12px 16px 0", padding:"20px" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  style={{
                    textAlign:"left", background:"none", border:"none", cursor:"pointer",
                    padding:"11px 12px", borderRadius:10,
                    fontSize:14, fontWeight:500, color:"#374151",
                    fontFamily:"'Poppins',sans-serif",
                    transition:"all .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background="#f0fdf4"; e.currentTarget.style.color="#16a34a"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.color="#374151"; }}
                >
                  {link.label}
                </button>
              ))}
              <button
                className="cta-btn"
                onClick={() => handleScrollTo("contact")}
                style={{ marginTop:8, width:"100%", borderRadius:12, padding:"12px" }}
              >
                Book Call
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;