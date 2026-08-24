"use client";
import { Button } from "@heroui/button";
import Link from "next/link";
import React, { useState } from "react";
import { FaViber } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiTelegramFill,
  RiWechat2Fill,
  RiWhatsappFill,
} from "react-icons/ri";

const Footer = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.includes("/room-planner")) {
    return null;
  }

  return (
    <footer className="bg-[#0F1B2E] text-white">
      <div className="mx-auto px-6 xl:px-20 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center text-center md:text-left">
          {/* About Section */}
          <div className="max-w-xs">
            <h2 className="text-lg font-bold uppercase mb-4 tracking-wide text-center">
              ALVEO Land
            </h2>
            <p className="text-sm text-gray-200 leading-snug text-justify">
              With skill, passion, and dedication, we continue our quest in
              attaining engineering excellence in quality homebuilding and
              community development that shall endure generations.
            </p>

            {/* <div className="mt-4 text-center">
              <Button
                size="sm"
                className="uppercase text-white bg-[#192D4D] hover:bg-[#192D4D]/80 shadow-md"
                endContent={<MdArrowOutward />}
                isLoading={buttonLoading}
                variant="solid"
                onPress={() => {
                  setButtonLoading(true);
                  router.push(`https://dmci-admin-website.vercel.app/auth/login`);
                }}
              >
                Log in as Admin
              </Button>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="max-w-md">
            <h2 className="text-lg font-bold uppercase mb-4 tracking-wide text-center">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-1 text-sm text-justify">
                <li><Link className="hover:text-[#658DCD]" href="/">Home</Link></li>
                <li><Link className="hover:text-[#658DCD]" href="/about">About Us</Link></li>
                <li><Link className="hover:text-[#658DCD]" href="/properties">Properties</Link></li>
                <li><Link className="hover:text-[#658DCD]" href="/agent">Agent</Link></li>
                <li><Link className="hover:text-[#658DCD]" href="/contact">Contact Us</Link></li>
              </ul>
              <ul className="space-y-1 text-sm text-justify">
                <li>
                  <Link
                    className="hover:text-[#658DCD]"
                    href="https://apps.dmcihomes.com/OnlineCRF/Main?ac=EL25650"
                    aria-disabled
                  >
                    Customer Reservation Form
                  </Link>
                </li>
                {/* <li><Link className="hover:text-[#658DCD]" href="/room-planner" target="_blank" aria-disabled>Room Planner</Link></li> */}
                <li><Link className="hover:text-[#658DCD]" href="/appointment" aria-disabled>Set Appointment</Link></li>
                <li><Link className="hover:text-[#658DCD]" href="/calculator" aria-disabled>Loan Calculator</Link></li>
                <li><Link className="hover:text-[#658DCD]" href="/career" aria-disabled>Apply Now</Link></li>
              </ul>
            </div>
          </div>

          {/* Connect With Us */}
          <div className="max-w-xs">
            <h2 className="text-lg font-bold uppercase mb-4 tracking-wide text-center">
              Connect With Us
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link aria-label="Facebook" href="https://www.facebook.com/share/We79XYCKWCDWmhE2/?mibextid=JRoKGi" className="hover:text-blue-400 transition">
                <RiFacebookBoxFill className="h-5 w-5" />
              </Link>
              <Link aria-label="Instagram" href="https://www.instagram.com/ella.dmcihomes" className="hover:text-pink-400 transition">
                <RiInstagramFill className="h-5 w-5" />
              </Link>
              <Link aria-label="Telegram" href="https://t.me/+639175480999" className="hover:text-blue-400 transition">
                <RiTelegramFill className="h-5 w-5" />
              </Link>
              <Link aria-label="WhatsApp" href="https://wa.me/639175480999" className="hover:text-green-400 transition">
                <RiWhatsappFill className="h-5 w-5" />
              </Link>
              <Link aria-label="WeChat" href="weixin://dl/chat?number=639175480999" className="hover:text-green-400 transition">
                <RiWechat2Fill className="h-5 w-5" />
              </Link>
              <Link aria-label="Viber" href="viber://chat?number=%2B639175480999" className="hover:text-purple-400 transition">
                <FaViber className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/40 my-6" />

        {/* Footer Bottom */}
        <div className="text-center text-xs text-gray-300">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="https://infinitech-website.vercel.app"
            target="_blank"
            className="hover:text-[#658DCD]"
          >
            Infinitech Advertising Corporation
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
