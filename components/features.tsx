"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LuCalculator, LuCalendarCheck, LuCalendarFold, LuChevronDown, LuFileUser, LuLampDesk } from "react-icons/lu";

const menuItems = [
  {
    key: "crf",
    label: "Customer Reservation Form",
    icon: <LuCalendarCheck className="text-xl text-default-500" />,
    link: "http://apps.dmcihomes.com/OnlineCRF/Main?ac=EL25650",
  },
  {
    key: "appointment",
    label: "Set Appointment",
    icon: <LuCalendarFold className="text-xl text-default-500" />,
    link: siteConfig.links.appointment,
  },
  {
    key: "planner",
    label: "Room Planner",
    icon: <LuLampDesk className="text-xl text-default-500" />,
    link: siteConfig.links.planner,
  },
  {
    key: "calculator",
    label: "Loan Calculator",
    icon: <LuCalculator className="text-xl text-default-500" />,
    link: siteConfig.links.loancalculator,
  },
  {
    key: "careers",
    label: "Apply Now",
    icon: <LuFileUser className="text-xl text-default-500" />,
    link: siteConfig.links.career,
  },
];

export default function AppFeatures() {
  const { isOpen: isPlannerOpen, onOpen: onPlannerOpen, onOpenChange: onPlannerOpenChange } = useDisclosure();
  const [roomPlannerLink, setRoomPlannerLink] = useState("");

  const handleOpenPlannerModal = (link: string) => {
    setRoomPlannerLink(link);
    onPlannerOpen();
  };

  const handleConfirmOpenPlanner = () => {
    window.open(roomPlannerLink, "_blank", "noopener noreferrer");
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            aria-label="Open menu"
            className="text-white text-md bg-green-700"
            endContent={<LuChevronDown size={16} />}
            variant="solid"
          >
            Form & Utilities
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu with icons" className="text-black" variant="faded">
          {menuItems.map(({ key, label, icon, link }) => (
            <DropdownItem
              key={key}
              onPress={key === "planner" ? () => handleOpenPlannerModal(link) : undefined}
            >
              {key === "planner" ? (
                <span className="flex items-center gap-2 cursor-pointer">
                  {icon}
                  {label}
                </span>
              ) : (
                <Link
                  href={link}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  {...(key === "crf" ? { target: "_blank" } : {})}
                >
                  {icon}
                  {label}
                </Link>
              )}
            </DropdownItem>

          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Modal for Room Planner Confirmation */}
      <Modal isOpen={isPlannerOpen} onOpenChange={onPlannerOpenChange}>
        <ModalContent>
          <ModalHeader>Warning!!</ModalHeader>
          <ModalBody>
            <p>The Room Planner is optimized for larger screens. For the best experience, use a desktop or laptop.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onPlannerOpenChange}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleConfirmOpenPlanner}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
