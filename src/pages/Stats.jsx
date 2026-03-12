import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "₹500Cr+", label: "Assets Under Management" },
  { value: "10,000+", label: "Happy Clients" },
  { value: "15+", label: "Years of Expertise" },
  { value: "98%", label: "Client Retention Rate" },
];

const Stats = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-green-700 to-green-500">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >

              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>

              <div className="text-sm text-white/80 font-medium">
                {stat.label}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Stats;