import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Business Owner, Delhi",
    text: "myfundbox completely transformed how I manage my wealth. Anuj's team guided me through a diversified portfolio that has grown 28% in two years. I couldn't be happier!",
    rating: 5,
    initials: "PS",
    color: "bg-green-700 text-white",
  },
  {
    name: "Rajesh Menon",
    role: "Senior Engineer, Bangalore",
    text: "The SIP recommendations and tax planning advice from myfundbox saved me lakhs in taxes while building a solid retirement corpus. Highly professional team.",
    rating: 5,
    initials: "RM",
    color: "bg-orange-500 text-white",
  },
  {
    name: "Neha Agarwal",
    role: "Doctor, Mumbai",
    text: "As someone new to investing, I was nervous. The team at myfundbox explained everything patiently, created a risk-appropriate plan, and I've seen 19% returns.",
    rating: 5,
    initials: "NA",
    color: "bg-green-700 text-white",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white ">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500" />

            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-green-700 to-orange-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Over 10,000 satisfied clients trust myfundbox with their financial future.
          </p>

        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

              {/* Rating */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-green-700/20 mb-4" />

              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold text-sm`}
                >
                  {t.initials}
                </div>

                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </div>

                  <div className="text-xs text-gray-600">
                    {t.role}
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;