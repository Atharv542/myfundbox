import { Award, UserCheck, ShieldCheck, BarChart3 } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

const stats = [
  { label: "Clients Served", end: 800, suffix: "+" },
  { label: "Success Rate", end: 95, suffix: "%" },
  { label: "Years Experience", end: 5, suffix: "+" },
];

const reasons = [
  {
    icon: Award,
    title: "Expert Advisors",
    description:
      "Certified financial experts with deep market knowledge and years of experience.",
  },
  {
    icon: UserCheck,
    title: "Personalized Solutions",
    description:
      "Every plan is custom-built around your unique goals, risk appetite, and timeline.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    description:
      "No hidden fees, no surprises. Complete clarity in every step of your financial journey.",
  },
  {
    icon: BarChart3,
    title: "Secure Investments",
    description:
      "We partner only with top-rated, SEBI-registered institutions for your safety.",
  },
];

const StatItem = ({ label, end, suffix }) => {
  const { count, ref } = useCountUp(end, 2000, suffix);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-green-700 font-serif">
  {count}
</div>
<div className="text-gray-600 text-sm mt-1 font-medium">{label}</div>
    </div>
  );
};

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16 scroll-animate">
          <span className="text-green-600 font-semibold text-sm tracking-wider uppercase">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4 font-serif">
            Built on <span className="text-green-700">Trust & Excellence</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Complete transparency & life long relationships
          </p>
        </div>

        {/* Stats */}
  <div
  className="scroll-animate grid grid-cols-2 md:grid-cols-3 gap-8 rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden bg-white"
  style={{
    transitionDelay: "0.2s",
    border: "1px solid #dcfce7",
    boxShadow:
      "0 20px 50px rgba(22,163,74,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
    backgroundImage:
      "radial-gradient(ellipse 60% 80% at 0% 0%, rgba(187,247,208,0.5) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(220,252,231,0.6) 0%, transparent 60%)",
  }}
>

  {stats.map((stat) => (
    <StatItem key={stat.label} {...stat} />
  ))}
</div>


        {/* Reasons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="scroll-animate group text-center p-6 rounded-2xl border border-green-100 bg-white hover:border-green-400 transition-all duration-500 hover:shadow-xl hover:shadow-green-100 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-5 group-hover:bg-gradient-to-r from-green-500 via-green-600 to-green-700 transition-all duration-300">
                <reason.icon
                  size={26}
                  className="text-green-600 group-hover:text-white transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
