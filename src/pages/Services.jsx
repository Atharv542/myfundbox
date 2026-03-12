import {
  TrendingUp,
  PiggyBank,
  BarChart2,
  Shield,
  Landmark,
  FileText,
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Analysis of current Situation",
    description:
      "A one-to-one meeting with you where we discuss & analyze your current financial situation & help you finalize your financial goals.",
    color: "bg-green-100 text-green-700",
    border: "hover:border-green-400",
  },
  {
    icon: PiggyBank,
    title: "Risk & Investment Profiling",
    description:
      "Assessment of your current risk & investment profile through a scientifically designed questionnaire. ",
    color: "bg-orange-100 text-orange-500",
    border: "hover:border-orange-400",
  },
  {
    icon: BarChart2,
    title: "Assessment & Analysis",
    description:
      "Careful assessment & analysis of the data provided by you (kept completely confidential) to create a customized plan for you.",
    color: "bg-green-100 text-green-700",
    border: "hover:border-green-400",
  },
  {
    icon: Shield,
    title: "Financial Plan- Design & delivery",
    description:
      "Basis the discussions & the data gathered, we deliver to you a tailored comprehensive plan that includes recommendations for investments, insurance, retirement & your other unique financial goals. ",
    color: "bg-orange-100 text-orange-500",
    border: "hover:border-orange-400",
  },
  
  {
    icon: FileText,
    title: "Plan Execution & Review",
    description:
      "We put your financial plan into action. We will work with you to implement the recommendations outlined in your customized plan & adjust them as needed to ensure that you are on track to meet your financial goals.",
    color: "bg-orange-100 text-orange-500",
    border: "hover:border-orange-400",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
              Our Services
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-green-700 to-orange-500 bg-clip-text text-transparent">
              Financial Solutions
            </span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            From investment planning to tax advisory, we offer end-to-end
            financial services to help you achieve every milestone with clarity
            and confidence.
          </p>

        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group bg-white rounded-2xl p-7 border border-gray-200 ${service.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              style={{ animationDelay: `${i * 100}ms` }}
            >

              <div
                className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                <service.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Services;