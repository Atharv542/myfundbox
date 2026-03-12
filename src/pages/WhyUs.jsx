import { Award, Clock, Users, HeadphonesIcon, LineChart, Lock } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Award-Winning Advisory",
    description: "Recognized by AMFI and CRISIL for excellence in financial advisory and client satisfaction.",
    bg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    icon: Clock,
    title: "Timely Market Insights",
    description: "Weekly research reports, market analysis, and alerts to keep your portfolio ahead of the curve.",
    bg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description: "Every financial plan is 100% customized — no cookie-cutter advice. Your goals, our mission.",
    bg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated relationship managers and round-the-clock support for all your financial queries.",
    bg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    icon: LineChart,
    title: "Proven Track Record",
    description: "Consistent alpha generation over benchmark indices across 15+ years of market cycles.",
    bg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Your data and investments are protected with enterprise-grade encryption and regulatory oversight.",
    bg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-700" />

            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            The myfundbox{" "}
            <span className="bg-gradient-to-r from-green-700 to-orange-500 bg-clip-text text-transparent">
              Advantage
            </span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We combine deep financial expertise with technology and human touch to
            deliver outcomes that matter to you.
          </p>

        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group flex gap-5 bg-white p-7 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300"
            >

              <div className={`w-12 h-12 rounded-xl ${reason.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className={`w-6 h-6 ${reason.iconColor}`} />
              </div>

              <div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyUs;