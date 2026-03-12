import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import Navbar from "./pages/Navbar";
import Services from "./pages/Services";
import Stats from "./pages/Stats";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonial";
import WhyUs from "./pages/WhyUs";


function App() {
  return (
    <div className="bg-white text-gray-900">

      <Navbar />

      <main>

        <Hero />
         <Services />
        <About />
       
        <WhyUs />
        <Team />
        <Testimonials />
        <Contact />

      </main>

      <Footer />

    </div>
  );
}

export default App;