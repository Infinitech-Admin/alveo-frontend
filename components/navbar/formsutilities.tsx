"use client";

import { siteConfig } from "@/config/site";
import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import {
  LuCalendarCheck,
  LuCalendarFold,
  LuCalculator,
  LuFileUser,
} from "react-icons/lu";

const utilities = [
  {
    name: "Customer Reservation Form",
    href: siteConfig.links.crf,
    icon: <LuCalendarCheck size={18} />,
    newTab: true,
    disabled: true, // gated pending CSRF-safe flow
  },
  {
    name: "Set Appointment",
    href: siteConfig.links.appointment,
    icon: <LuCalendarFold size={16} />,
    newTab: false,
    disabled: false,
  },
  {
    name: "Loan Calculator",
    href: siteConfig.links.loancalculator,
    icon: <LuCalculator size={16} />,
    newTab: false,
    disabled: false,
  },
  {
    name: "Apply Now",
    href: siteConfig.links.career,
    icon: <LuFileUser size={16} />,
    newTab: false,
    disabled: false,
  },
];

const FormUtilities = () => {
  return (
    <div className="flex items-center gap-2">
      {utilities.map((utility) => (
        <Tooltip
          key={utility.name}
          content={
            utility.disabled
              ? `${utility.name} is currently unavailable`
              : utility.name
          }
        >
          {utility.disabled ? (
            <span>
              <Button
                type="button"
                size="md"
                radius="full"
                variant="flat"
                isIconOnly
                isDisabled
                className="cursor-not-allowed text-gray-200 opacity-40"
              >
                {utility.icon}
              </Button>
            </span>
          ) : (
            <Link
              href={utility.href}
              target={utility.newTab ? "_blank" : undefined}
              rel={utility.newTab ? "noopener noreferrer" : undefined}
            >
              <Button
                type="button"
                size="md"
                radius="full"
                variant="flat"
                isIconOnly
                className="border-[#B2C6E6] text-gray-200 transition-all hover:bg-[#B2C6E6]/10"
              >
                {utility.icon}
              </Button>
            </Link>
          )}
        </Tooltip>
      ))}
    </div>
  );
};

export default FormUtilities;
