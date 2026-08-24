"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import React from "react";
import {
  LuGlobe,
  LuX,
} from "react-icons/lu";
import {
  FaFacebookF,
  FaPhoneAlt,
  FaInstagram,
  FaViber,
  FaTelegramPlane,
  FaWeixin,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

// Array of social media data using icons
const social = [
  {
    id: 1,
    icon: <FaFacebookF className="text-white w-5 h-5" />,
    link: "https://www.facebook.com/share/We79XYCKWCDWmhE2/?mibextid=JRoKGi",
  },
  {
    id: 2,
    icon: <FaPhoneAlt className="text-white w-5 h-5" />,
    link: "tel:+639175480999",
  },
  {
    id: 3,
    icon: <FaEnvelope className="text-white w-5 h-5" />,
    link: "mailto:elladmcihomes.ph@gmail.com",
  },
  {
    id: 4,
    icon: <FaInstagram className="text-white w-5 h-5" />,
    link: "https://www.instagram.com/ella.dmcihomes",
  },
  {
    id: 5,
    icon: <FaViber className="text-white w-5 h-5" />,
    link: "viber://chat?number=639175480999",
  },
  {
    id: 6,
    icon: <FaTelegramPlane className="text-white w-5 h-5" />,
    link: "https://t.me/+639175480999",
  },
  {
    id: 7,
    icon: <FaWeixin className="text-white w-5 h-5" />,
    link: "weixin://dl/chat?number=639175480999",
  },
  {
    id: 8,
    icon: <FaWhatsapp className="text-white w-5 h-5" />,
    link: "https://wa.me/639175480999",
  },
];

const FloatingIcons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("/room-planner")) {
    return null;
  }

  return (
    <>
      {/* Desktop Social Icons */}
      <div className="fixed top-1/2 right-9 transform -translate-y-1/2 z-50 hidden lg:flex">
        <div className="flex flex-col gap-4">
          {social.map((item) => (
            <a
              key={item.id}
              href={item.link}
              rel="noopener noreferrer"
              target="_blank"
              className="bg-[#192D4D] p-3 rounded-full shadow-lg hover:bg-[#192D4D]/80 transition"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Globe Toggle Button (when closed) */}
      {!isOpen && (
        <div className="fixed bottom-28 right-8 lg:hidden z-[999]">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-700 p-3 rounded-full shadow-lg"
          >
            <LuGlobe className="text-white w-6 h-6" />
          </button>
        </div>
      )}

      {/* Mobile Social Icons + Close Button (when open) */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 flex flex-col items-end gap-2 lg:hidden z-[999] max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {social.map((item) => (
              <a
                key={item.id}
                href={item.link}
                rel="noopener noreferrer"
                target="_blank"
                className="bg-blue-700 p-3 rounded-full shadow-lg hover:bg-blue-800 transition"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="bg-blue-700 p-3 rounded-full shadow-lg"
          >
            <LuX className="text-white w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingIcons;
