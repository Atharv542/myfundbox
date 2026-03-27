import heroBg from "../assets/hero-bg.jpg";
import { useTypingAnimation } from "../hooks/useTypingAnimation";
import { ArrowRight, Phone } from "lucide-react";

const words = ["Future", "Family", "Dreams"];

const HeroSection = () => {
  const typedWord = useTypingAnimation(words, 120, 80, 1800);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Financial services background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl px-6 pt-12 md:pt-24 pb-8 md:pb-16">

        <div className="max-w-6xl">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-yellow-500/10 border md:mx-32 border-yellow-500/30 rounded-full px-4 py-2 mb-8 opacity-0 animate-fadeUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-yellow-400 text-sm font-medium">
              Trusted by 10,000+ clients across India
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:px-32 text-white font-serif opacity-0 animate-fadeUp"
            style={{ animationDelay: "0.4s" }}
          >
            Secure Your
            <br />

            <span className="text-yellow-500 relative">
              {typedWord}
              <span className="ml-1 animate-pulse">|</span>
            </span>

            <br />
            with Smart Decisions
          </h1>

          {/* Description */}
          <p
            className="text-gray-300 text-lg md:text-xl max-w-4xl mb-10 md:px-32 font-light leading-relaxed opacity-0 animate-fadeUp"
            style={{ animationDelay: "0.6s" }}
          >
            Expert insurance, mutual fund guidance, and personalized financial
            consultation to help you build lasting wealth.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col md:px-32 sm:flex-row gap-4 opacity-0 animate-fadeUp"
            style={{ animationDelay: "0.8s" }}
          >
            <button
              onClick={() => {
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 cursor-pointer text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
            >
              Get Started <ArrowRight size={20} />
            </button>

            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="border-2 cursor-pointer border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:border-yellow-400 hover:text-yellow-400 transition-all"
            >
              <Phone size={20} /> Book a Consultation
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 to-transparent" />
    </section>
  );
};

export default HeroSection;