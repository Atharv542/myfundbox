import { Target, Eye } from "lucide-react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 bg-gray-100 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16 scroll-animate">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4 font-serif">
            Who We Are
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto scroll-animate">
          <p className="text-lg text-gray-600 leading-relaxed text-center mb-12">
            MyFundbox is a trusted financial services company committed to helping individuals and families
            make smarter financial decisions. With years of experience in insurance and investments,
            we combine expertise with a personal touch to deliver solutions that truly work for you.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Mission */}
            <div className="scroll-animate-left bg-white rounded-2xl p-8 border border-gray-200 hover:border-yellow-400 transition-all duration-500 hover:shadow-xl">
              
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center mb-5">
                <Target size={24} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">
                Our Mission
              </h3>

              <p className="text-gray-600 leading-relaxed">
               Our mission is to empower our clients with sound financial advice and strategies to help them achieve their financial goals. We are committed to providing personalized service and building long-term relationships based on trust and transparency. We strive to educate and empower our clients to make informed financial decisions and achieve financial freedom.
              </p>
            </div>

            {/* Vision */}
            <div className="scroll-animate-right bg-white rounded-2xl p-8 border border-gray-200 hover:border-yellow-400 transition-all duration-500 hover:shadow-xl">
              
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center mb-5">
                <Eye size={24} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">
                Our Vision
              </h3>

              <p className="text-gray-600 leading-relaxed">
               Our vision is to be a leading financial planning firm known for our commitment to excellence and our unwavering dedication to our clients’ success. We aspire to be a trusted advisor to our clients, providing comprehensive financial planning services that are tailored to their unique needs and goals. We aim to make a positive impact on the lives of our clients by helping them achieve financial freedom and peace of mind.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;