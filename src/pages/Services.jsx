import { Shield, TrendingUp, Users } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Insurance Services",
    description:
      "Comprehensive life, health, and general insurance plans tailored to protect you and your loved ones from life's uncertainties.",
    features: ["Life Insurance", "Health Insurance", "Term Plans", "Child Plans"],
  },
  {
    icon: TrendingUp,
    title: "Mutual Fund Investment",
    description:
      "Expert-guided mutual fund portfolios designed to maximize returns while managing risk according to your financial goals.",
    features: ["SIP Planning", "Equity Funds", "Debt Funds", "Tax Saving Funds"],
  },
  {
    icon: Users,
    title: "1-to-1 Consultation",
    description:
      "Personalized financial planning sessions with certified advisors who understand your unique needs and aspirations.",
    features: [
      "Goal Planning",
      "Risk Assessment",
      "Portfolio Review",
      "Retirement Planning",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16 scroll-animate">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Our Services
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4 font-serif">
            What We Offer
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive financial solutions designed to help you achieve your goals with confidence and clarity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="scroll-animate group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-yellow-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={26} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Bottom hover line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;