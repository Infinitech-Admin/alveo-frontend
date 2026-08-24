"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenuItem,
  NavbarItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Tooltip,
} from "@heroui/react";

import { useDisclosure } from "@heroui/react";
import NextLink from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LuDownload } from "react-icons/lu";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { BrandLogo } from "@/components/icons";
import FormUtilities from "./navbar/formsutilities";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ROOM PLANNER MODAL (temporarily disabled)
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [selectedLink, setSelectedLink] = useState("");

  // PWA INSTALL STATE
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // PWA INSTALL
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstallButton(false);
    }

    setDeferredPrompt(null);
  };

  // NAVIGATION
  const handleLinkClick = (href: string) => {
    // ROOM PLANNER MODAL (temporarily disabled)
    // if (href === siteConfig.links.planner) {
    //   setSelectedLink(href);
    //   onOpen();
    // } else {
    //   setMenuOpen(false);
    //   router.push(href);
    // }
    setMenuOpen(false);
    router.push(href);
  };

  // const handleConfirmNavigation = () => {
  //   window.open(selectedLink, "_blank", "noopener,noreferrer");
  //
  //   onClose();
  // };

  return (
    <>
      <NextUINavbar
        isMenuOpen={menuOpen}
        maxWidth="full"
        onMenuOpenChange={setMenuOpen}
        className={clsx(
          "text-white transition-all duration-500 ease-in-out xl:px-12",
          scrolled
            ? "bg-[#192D4D]/95 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "bg-[#0F1B2E]",
        )}
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3">
            <NextLink
              href="/"
              className="flex items-center justify-between gap-1"
            >
              <p className="text-2xl font-bold">ALVEO LAND</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation */}
        <NavbarContent className="hidden xl:flex" justify="center">
          <ul className="flex items-center gap-8">
            {siteConfig.navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className={clsx(
                      "group relative inline-flex items-center py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-300",
                      isActive
                        ? "font-bold text-[#658DCD]"
                        : "text-white hover:text-[#658DCD]",
                    )}
                  >
                    {item.label}

                    <span
                      className={clsx(
                        "absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#658DCD] transition-transform duration-300",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden basis-1/5 sm:basis-full xl:flex"
          justify="end"
        >
          <NavbarItem className="flex items-center gap-3">
            <FormUtilities />

            {showInstallButton && (
              <Tooltip content="Install App">
                <Button
                  type="button"
                  size="md"
                  radius="full"
                  variant="flat"
                  isIconOnly
                  onPress={handleInstallApp}
                  className="border-[#B2C6E6] text-gray-200 transition-all hover:bg-[#B2C6E6]/10"
                >
                  <LuDownload size={16} />
                </Button>
              </Tooltip>
            )}
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Header */}
        <NavbarContent className="basis-1 pl-4 xl:hidden" justify="end">
          {/* <ThemeSwitch /> */}

          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          <div className="mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <button
                  className={clsx(
                    "w-full text-left",
                    pathname === item.href && "font-bold text-[#3C6CB9]",
                  )}
                  onClick={() => handleLinkClick(item.href)}
                >
                  {item.label}
                </button>
              </NavbarMenuItem>
            ))}

            <Divider className="my-4" />

            <div className="space-y-1">
              <p className="text-small text-default-400">Form & Utilities</p>
            </div>

            {siteConfig.navMenuItemsLinks.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                {item.disabled ? (
                  <span
                    className="block w-full cursor-not-allowed text-left text-gray-500"
                    title={`${item.label} is currently unavailable`}
                  >
                    {item.label}
                  </span>
                ) : item.download ? (
                  <a
                    href={item.href}
                    download
                    className={clsx(
                      "block w-full text-left",
                      pathname === item.href && "font-bold text-blue-500",
                    )}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    className={clsx(
                      "w-full text-left",
                      pathname === item.href && "font-bold text-blue-500",
                    )}
                    onClick={() => handleLinkClick(item.href)}
                  >
                    {item.label}
                  </button>
                )}
              </NavbarMenuItem>
            ))}

            {/* Install App */}
            {showInstallButton && (
              <NavbarMenuItem
                className="cursor-pointer font-medium text-[#192D4D]"
                onClick={() => {
                  handleInstallApp();
                  setMenuOpen(false);
                }}
              >
                Install App
              </NavbarMenuItem>
            )}
          </div>
        </NavbarMenu>
      </NextUINavbar>

      {/* Modal for Planner Navigation Confirmation (temporarily disabled) */}
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Open Room Planner</ModalHeader>

          <ModalBody>
            <p>Are you sure you want to open the room planner in a new tab?</p>
          </ModalBody>

          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>

            <Button variant="light" onPress={handleConfirmNavigation}>
              Open Planner
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};
