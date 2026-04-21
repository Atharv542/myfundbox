import AboutSection from "./pages/About";
import Footer from "./pages/Footer";
import HeroSection from "./pages/Hero";
import Navbar from "./pages/Navbar";

import WhyChooseUsSection from "./pages/WhyUs";
import { Toaster } from "sonner";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import InsuranceCalculator from "./pages/InsuranceCalculator";
import ConsultationSection from "./pages/ConsultationForm";
import ServicesSection from "./pages/Services";

function App() {
  useScrollAnimation();
  return (
    <div className="bg-gray-100 text-gray-900 font-sans">
      
      {/* Toast */}
      <Toaster position="top-right" richColors />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="overflow-hidden">

        <HeroSection />

        <ServicesSection />

        <AboutSection />

        <WhyChooseUsSection />

        <InsuranceCalculator/>

        <ConsultationSection/>

        

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;