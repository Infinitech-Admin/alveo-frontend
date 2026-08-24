"use client";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { LuCalendarRange } from "react-icons/lu";
import {
  MdCalendarMonth,
  MdMail,
  MdPhone,
  MdPhoneInTalk,
  MdSmartphone,
} from "react-icons/md";

const CompanyInfo = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-3 pt-8">
        <div className="bg-[#192D4D] inline-flex h-12 items-center py-4 px-2 text-[#658DCD] rounded-lg">
          <MdPhone size={32} />
        </div>

        <div className="">
          <h1 className="font-bold text-xl">Phone</h1>
          <p className="text-sm text-default-500 mb-4">
            Our phone lines are available every{" "}
            <strong>Monday to Friday</strong> from 8AM to 5PM.
          </p>

          <div className="flex-col gap-4 inline-flex">
            <Button
              size="sm"
              onPress={() => (window.location.href = "tel:09622530149")}
              variant="light"
              color="default"
              className="flex items-center gap-2 text-sm lg:text-lg"
            >
              <MdSmartphone size={20} />{" "}
              {/* Changed to the smartphone/cellphone icon */}
              <span>09622530149</span>
            </Button>

            <Button
              size="sm"
              onPress={() => (window.location.href = "tel:(02)7001-6157")}
              variant="light"
              color="default"
              className="flex items-center gap-2 text-sm lg:text-lg"
            >
              <MdPhoneInTalk size={20} /> {/* Changed to the telephone icon */}
              <span>(02)7001-6157</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-8">
        <div className="bg-[#192D4D] inline-flex h-12 items-center py-4 px-2 text-[#658DCD] rounded-lg">
          <MdMail size={32} />
        </div>
        <div className="inline-block">
          <h1 className="font-bold text-xl">Email</h1>
          <p className="text-sm text-default-500 mb-4">
            You may reach us by email for all manner of information. Send an
            enquiry to the following designated email list.
          </p>

          <div className="flex-col gap-4 inline-flex">
            <Button
              size="sm"
              onPress={() =>
                (window.location.href = "mailto:ellandmichomes.ph@gmail.com")
              }
              variant="light"
              color="default"
              className="flex items-center gap-2 text-sm lg:text-lg"
            >
              <MdMail size={20} />
              <span> ellandmichomes.ph@gmail.com</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-8">
        <div className="bg-[#192D4D] inline-flex h-12 items-center py-4 px-2 text-[#658DCD] rounded-lg">
          <MdCalendarMonth size={32} />
        </div>
        <div className="inline-block">
          <h1 className="font-bold text-xl">Set Appointment</h1>
          <p className="text-sm text-default-500 mb-4">
            Avoid the long queues, book your next viewing and consultation.
          </p>
          <div className="flex-col gap-4 inline-flex">
            <Button
              as={Link}
              href="/appointment"
              startContent={<LuCalendarRange />}
              variant="light"
              color="default"
              className="text-md"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
