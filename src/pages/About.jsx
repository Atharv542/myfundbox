import { Target, Eye, Award } from "lucide-react";
import anujImg from "../assets/Anuj.png";

const AboutSection = () => {
  return (
    <section id="about" className="pf py-24 bg-white relative overflow-hidden">
      {/* Soft green background accents (matches hero) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 50% at 90% 10%, rgba(209,250,229,0.55) 0%, transparent 65%), radial-gradient(ellipse 45% 45% at 5% 95%, rgba(187,247,208,0.40) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(22,163,74,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#15803d",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "#22c55e",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.25)",
              }}
            />
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-slate-900">
            Who <span style={{ color: "#15803d" }}>We Are</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            MyFundbox is a trusted financial services company committed to helping
            individuals and families make smarter financial decisions. With years of
            experience in insurance and investments, we combine expertise with a
            personal touch to deliver solutions that truly work for you.
          </p>
        </div>

        {/* Founder block */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          {/* Image — left */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Dashed ring */}
              <div
                className="absolute -inset-4 rounded-[40px] pointer-events-none"
                style={{
                  border: "2px dashed rgba(22,163,74,0.25)",
                  borderRadius: "40px 40px 110px 40px",
                }}
              />
              {/* Photo frame */}
              <div
                className="relative overflow-hidden bg-green-50"
                style={{
                  borderRadius: "32px 32px 100px 32px",
                  boxShadow:
                    "0 40px 90px rgba(22,163,74,0.18), 0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={anujImg}
                  alt="Anuj Paul, Founder & CEO of MyFundbox"
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* Floating credential badge */}
              <div
                className="absolute -bottom-5 -right-3 bg-white rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  boxShadow:
                    "0 10px 36px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                  }}
                >
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    15+ Years
                  </div>
                  <div className="text-xs text-slate-500">BFSI Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content — right */}
          <div className="lg:col-span-7">
            <span
              className="inline-block text-xs font-semibold tracking-wider uppercase mb-3"
              style={{ color: "#15803d" }}
            >
              Meet Our Founder
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
              Anuj Paul
            </h3>
            <p
              className="text-base font-semibold mb-5"
              style={{ color: "#16a34a" }}
            >
              Founder &amp; CEO
            </p>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Hailing from the picturesque landscapes of Himachal Pradesh, Anuj
                Paul’s journey is defined by a lifelong passion for personal finance.
              </p>
              <p>
                After earning his B.Tech from VNIT Nagpur in 2009 and gaining
                valuable insights during 5 years in the Manufacturing Sector, Anuj
                furthered his knowledge by pursuing an MBA in Finance &amp; Banking
                in 2016. His professional trajectory spans a diverse range of
                experiences in the BFSI Sector, including the significant
                achievement of managing portfolios valued at approximately{" "}
                <span className="font-semibold text-slate-900">₹500 Crores</span>{" "}
                as Regional Head – Sales at ICICI Bank.
              </p>
              <p>
                During his tenure as Chief Manager at ICICI Bank, Anuj identified a
                pressing need for improved financial education among the salaried
                population. This revelation sparked his unwavering commitment to
                making a meaningful difference — assisting clients through holistic
                planning and innovative financial strategies.
              </p>
            
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div
            className="bg-white scroll-animate-left rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
            style={{
              border: "1px solid #bbf7d0",
              boxShadow: "0 10px 30px rgba(22,163,74,0.08)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              }}
            >
              <Target size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Our mission is to empower our clients with sound financial advice and strategies to help them achieve their financial goals. We are committed to providing personalized service and building long-term relationships based on trust and transparency. We strive to educate and empower our clients to make informed financial decisions and achieve financial freedom.
            </p>
          </div>

          {/* Vision */}
          <div
            className="bg-white scroll-animate-right rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
            style={{
              border: "1px solid #bbf7d0",
              boxShadow: "0 10px 30px rgba(22,163,74,0.08)",
            }}
          >
            <div
              className="w-12 h-12  rounded-xl flex items-center justify-center mb-5"
              style={{
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              }}
            >
              <Eye size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
      Our vision is to be a leading financial planning firm known for our commitment to excellence and our unwavering dedication to our clients’ success. We aspire to be a trusted advisor to our clients, providing comprehensive financial planning services that are tailored to their unique needs and goals. We aim to make a positive impact on the lives of our clients by helping them achieve financial freedom and peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
