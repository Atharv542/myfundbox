import { CheckCircle, Target, Eye } from "lucide-react";


const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Mission & Vision */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">

              <div className=" p-10 text-white">

                {/* Mission */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 text-green-500 rounded-xl">
                    <Target className="w-6 h-6" />
                  </div>

                  <div className="text-2xl text-green-500 font-bold">
                    Our Mission
                  </div>
                </div>

                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Our mission is to empower our clients with sound financial advice and strategies to help them achieve their financial goals. We are committed to providing personalized service and building long-term relationships based on trust and transparency. We strive to educate and empower our clients to make informed financial decisions and achieve financial freedom.

 


                </p>

                {/* Vision */}
                <div className="flex items-center gap-3 mb-4 pt-6 border-t border-white/20">
                  <div className="p-2 text-black  rounded-xl">
                    <Eye className="w-6 h-6 text-orange-500" />
                  </div>

                  <div className="text-2xl text-orange-500 font-bold">
                    Our Vision
                  </div>
                </div>

                <p className="text-gray-500 text-base leading-relaxed">
                 Our vision is to be a leading financial planning firm known for our commitment to excellence and our unwavering dedication to our clients’ success. We aspire to be a trusted advisor to our clients, providing comprehensive financial planning services that are tailored to their unique needs and goals. We aim to make a positive impact on the lives of our clients by helping them achieve financial freedom and peace of mind.
                </p>

              </div>
            </div>

            {/* Decorative shapes */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-100 rounded-3xl border border-orange-200 -z-10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-green-100 rounded-3xl border border-green-200 -z-10" />

          </div>

          {/* Right Content */}
          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-700" />

              <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
                About myfundbox
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Your Trusted Partner in{" "}
              <span className="bg-gradient-to-r from-green-700 to-orange-500 bg-clip-text text-transparent">
                Financial Growth
              </span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              At MyFundbox, we believe in the core values of{" "}
              <strong className="text-green-700">"Lifetime Relationships"</strong>{" "}
              and{" "}
              <strong className="text-green-700">"Complete Transparency"</strong>.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Headquartered in "Queen of the Hills",
              <strong className="text-gray-900"> Shimla, Himachal Pradesh</strong>,
              MyFundbox Financial Services (A Unit of Northoak Enterprises LLP,
              an AMFI-registered Mutual Fund Distributor) was incorporated on
              <strong className="text-gray-900"> 7th December 2022</strong>. We
              provide <strong className="text-gray-900">Comprehensive Financial Planning Services</strong>
              through an exhaustive step-by-step approach including Retirement
              Planning, Investment Planning, Insurance Planning, Income Tax
              Planning, Estate Planning, Loans and Real Estate.
            </p>

           

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;