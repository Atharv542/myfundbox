import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import heroImage from "../assets/hero-finance.png";

const Hero = () => {

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-green-100 opacity-60" />

        

        <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-orange-500 opacity-40" />

        <div
          className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-green-700 opacity-30"
        />

      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-16 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
              <ShieldCheck className="w-4 h-4 text-green-700" />

              <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
                Trusted Financial Partner
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-gray-900">
              Grow Your{" "}
              <span className="bg-gradient-to-r from-green-700 to-orange-500 bg-clip-text text-transparent">
                Wealth
              </span>{" "}
              with Confidence
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              myfundbox provides comprehensive financial services tailored to
              your goals — from investment advisory to fund management and
              wealth planning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">

              <button
                onClick={() => scrollTo("#services")}
                className="flex cursor-pointer items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-700 to-green-500 text-white font-semibold text-base shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("#contact")}
                className="flex cursor-pointer items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 text-white font-semibold text-base shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                Talk to an Expert
              </button>

            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6">

              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-700" />
                <span className="text-sm font-medium text-gray-600">
                  SEBI Registered
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-600">
                  ISO Certified
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-700 inline-block" />
                <span className="text-sm font-medium text-gray-600">
                  15+ Years Experience
                </span>
              </div>

            </div>

          </div>

          {/* Right Content */}
          <div className="relative flex justify-center lg:justify-end">

            <div className="relative w-full max-w-lg">

              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500 rounded-3xl opacity-10 blur-2xl scale-110" />

              <div className="relative bg-white rounded-3xl shadow-xl p-6 border border-gray-200">

                <img
                  src={heroImage}
                  alt="Financial growth chart"
                  className="w-full h-auto rounded-2xl"
                />

                

               

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;