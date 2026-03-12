import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-700" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              Contact Us
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Let's Start Your{" "}
            <span className="bg-gradient-to-r from-green-700 to-orange-500 bg-clip-text text-transparent">
              Financial Journey
            </span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Speak with one of our expert advisors and get a free, no-obligation
            financial consultation today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-gradient-to-br from-gray-900 to-green-900 rounded-2xl p-7 text-white">
              <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>

              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Our team is ready to help you take control of your finances and
                build long-term wealth.
              </p>

              <div className="space-y-5">

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-700/40 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Call Us</div>
                    <div className="font-semibold text-sm">+91 98765 43210</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-700/40 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Email Us</div>
                    <div className="font-semibold text-sm">info@myfundbox.com</div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-700/40 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Head Office</div>
                    <div className="font-semibold text-sm">
                      14th Floor, DLF Cyber City,<br />
                      Gurugram, Haryana 122002
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-4">Business Hours</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday – Friday</span>
                  <span className="font-medium text-gray-900">9:00 AM – 7:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-900">10:00 AM – 4:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-orange-500 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">

              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">

                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-green-700" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>

                  <p className="text-gray-600 text-sm">
                    Thank you for reaching out. Our advisor will contact you within 24 hours.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-lg bg-green-100 text-green-700 text-sm font-semibold hover:bg-green-700 hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>

                </div>
              ) : (

                <form onSubmit={handleSubmit} className="space-y-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name <span className="text-orange-500">*</span>
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Anuj Paul"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-700 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address <span className="text-orange-500">*</span>
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-700 transition-all"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-700 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Service Interested In
                      </label>

                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-700 transition-all"
                      >
                        <option value="">Select a service</option>
                        <option>Investment Advisory</option>
                        <option>Mutual Fund Management</option>
                        <option>Wealth Planning</option>
                        <option>Insurance Solutions</option>
                        <option>Fixed Income & Bonds</option>
                        <option>Tax & Compliance</option>
                      </select>
                    </div>

                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Message <span className="text-orange-500">*</span>
                    </label>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your financial goals and how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-700 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-green-700 to-green-500 text-white font-semibold text-base shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;