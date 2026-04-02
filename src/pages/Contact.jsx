import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Valid email is required";
    }

    if (
      !form.phone.trim() ||
      !/^\d{10}$/.test(form.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Valid 10-digit phone is required";
    }

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 rounded-xl border-2 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
      errors[field]
        ? "border-red-500"
        : "border-gray-300 focus:border-yellow-500"
    }`;

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16 scroll-animate">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Get in Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4 font-serif">
            Let's Talk About Your Future
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ready to take the first step? Reach out and our experts will guide you.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6 scroll-animate-left">

            {/* Contact Info */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 font-serif">
                Contact Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Mail size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">info@myfundbox.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Phone size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <MapPin size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Office</p>
                    <p className="font-medium">
                      Kullu, HP, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-2 font-serif">
                Schedule a Free Call
              </h4>

              <p className="text-sm mb-4 opacity-90">
                Get a personalized consultation with our financial experts at no cost.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90"
              >
                <Phone size={16} /> Book Now
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 scroll-animate-right">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-xl"
            >

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={inputClass("name")}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={inputClass("email")}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  className={inputClass("phone")}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your financial goals..."
                  className={inputClass("message")}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 shadow-lg"
              >
                <Send size={20} /> Send Message
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;