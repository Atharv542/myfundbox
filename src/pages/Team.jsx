import { useState } from "react";
import anujPaul from "../assets/Anuj.png";
import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Anuj Paul",
    role: "CEO & Founder",
    image: anujPaul,
    bio: "Hailing from the picturesque landscapes of Himachal Pradesh, Anuj Paul’s journey is defined by a lifelong passion for personal finance. After earning his B. Tech degree from VNIT Nagpur in 2009 and gaining valuable insights during 5 years in the Manufacturing Sector, Anuj furthered his knowledge by pursuing an MBA in Finance & Banking in 2016. His professional trajectory encompassed a diverse range of experiences in the BFSI Sector, including the significant achievement of managing portfolios valued at approximately ₹500 Crores in his role as Regional Head – Sales at ICICI Bank. Notably, during his tenure as Chief Manager at ICICI Bank, Anuj Paul identified a pressing need for improved financial education among the general salaried population. This revelation sparked his unwavering commitment to making a meaningful difference. Anuj is dedicated to assisting clients through holistic planning and innovative financial strategies. Beyond his professional pursuits, Anuj takes pleasure in exploring the latest in technology and cherishing moments spent with family and close friends.",
    linkedin: "#",
    twitter: "#",
    email: "anuj@myfundbox.com",
    badge: "Founder",
  },
];

const Team = () => {
  const [expanded, setExpanded] = useState(false);

  const previewLength = 280;

  return (
    <section id="team" className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
              Leadership
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Meet the{" "}
            <span className="bg-gradient-to-r from-green-700 to-orange-500 bg-clip-text text-transparent">
              Visionary
            </span>{" "}
            Behind myfundbox
          </h2>

          <p className="text-gray-600">
            Our leadership brings decades of combined experience in finance,
            technology, and client advisory.
          </p>

        </div>

        <div className="flex justify-center">

          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden max-w-xl w-full"
            >

              {/* Top */}
              <div className="relative">

                <div className="bg-gradient-to-r from-green-700 to-green-500 h-32" />

                <div className="absolute -bottom-16 left-8">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                    {member.badge}
                  </span>
                </div>

              </div>

              {/* Content */}
              <div className="pt-20 px-8 pb-8">

                <h3 className="text-2xl font-bold text-gray-900">
                  {member.name}
                </h3>

                <p className="text-green-700 font-semibold text-sm mb-4">
                  {member.role}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {expanded
                    ? member.bio
                    : `${member.bio.slice(0, previewLength)}...`}
                </p>

                {/* Read More Button */}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-green-700 font-semibold text-sm hover:underline mb-6"
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>

                {/* Social Icons */}
                <div className="flex gap-3">

                  <a
                    href={member.linkedin}
                    className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-700 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a
                    href={member.twitter}
                    className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-700 hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>

                  <a
                    href={`mailto:${member.email}`}
                    className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>

                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Team;