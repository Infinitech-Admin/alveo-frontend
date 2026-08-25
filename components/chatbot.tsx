"use client";
//deploy
import { getAuthHeaders } from "@/app/auth";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ChatBot from "react-chatbotify";
import { Params } from "react-chatbotify";
import { LuMessageCircle } from "react-icons/lu";

const Chatbot = () => {
  const helpOptions = [
    "About Alveo",
    "Locations",
    "Properties",
    "Buying Guide",
  ];
  const [properties, setProperties] = useState<any[]>([]);
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";
  const endpoint = `${apiUrl}/api/user/properties`;

  const pathname = usePathname();

  // Guard to ensure properties are fetched only ONCE per session,
  // regardless of how many times pathname changes (navigation) or
  // how many times the effect re-runs (e.g. React Strict Mode in dev).
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (pathname.includes("/room-planner")) {
      return;
    }

    if (hasFetchedRef.current) {
      return;
    }
    hasFetchedRef.current = true;

    const fetchProperties = async () => {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: getAuthHeaders(),
          cache: "no-cache",
        });
        const data = await response.json();
        setProperties(data.records);
      } catch (error) {
        console.error("Error fetching properties:", error);
        // Allow retry on next navigation if the fetch failed
        hasFetchedRef.current = false;
      }
    };

    fetchProperties();
  }, [pathname, endpoint]);

  if (pathname.includes("/room-planner")) {
    return null;
  }

  const flow = {
    start: {
      message: "Welcome to Alveo Land! How can I assist you today?",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message: "What would you like to know about?",
      options: helpOptions,
      path: "process_options",
    },
    prompt_again: {
      message: "Do you need any other help?",
      options: helpOptions,
      path: "process_options",
    },
    unknown_input: {
      message: "Sorry, I can only answer questions related to Alveo Land",
      options: helpOptions,
      path: "process_options",
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params: Params) => {
        let message = "";
        switch (params.userInput) {
          case "About Alveo":
            message =
              "About Alveo Land\n\n" +
              "As Ayala Land's upscale residential arm, Alveo offers a dynamic portfolio of prime spaces for living and working well, set within thriving and emerging growth centers all across the Philippines.\n\n" +
              "Armed with sharper foresight, unparalleled excellence, and total commitment, the company is committed to providing thoughtfully-designed and master planned living environments for the unique needs of its discerning market.";
            break;
          case "Locations":
            message =
              "Our Locations\n\n" +
              "Alveo Land has developments across Batangas, Cagayan de Oro, Cavite, Cebu, Davao, Laguna, Las Piñas-Alabang, Makati, Manila, Pampanga, Pasig, Quezon City, and Taguig City.";
            break;
          case "Properties":
            if (properties.length > 0) {
              message =
                "🏡 **Here are some of our properties:**\n\n" +
                properties
                  .map((property: any) => `🏢 ${property.name}`)
                  .join("\n\n");
            } else {
              message =
                "🏡 **Some of our featured properties:**\n\n" +
                "🏢 Astela at Circuit Makati\n\n" +
                "🏢 Patio Suites Abreeza (Davao)\n\n" +
                "🏢 Mergent Residences (Makati)\n\n" +
                "🏢 Sentrove at Cloverleaf (Quezon City)\n\n" +
                "🏢 Callisto at Circuit Makati\n\n" +
                "🏢 Westborough (Cavite)\n\n" +
                "🏢 Hillside Ridge Southmont (Cavite)";
            }
            break;
          case "Buying Guide":
            message =
              "Ready to buy your Alveo Property?\n\n" +
              "Allow us to walk you through what you need to know before choosing to invest with Alveo Land. Visit our Buying Guide page for details, or reach us at (+632) 8848 5000 / info@alveoland.com.";
            break;
          default:
            return "unknown_input";
        }

        await params.injectMessage(message);
        return "repeat";
      },
    },

    repeat: {
      transition: { duration: 500 },
      path: "prompt_again",
    },
  };

  return (
    <ChatBot
      flow={flow}
      settings={{
        general: {
          primaryColor: "#0b1f3a",
          secondaryColor: "#0b1f3a",
          showFooter: false,
        },

        header: {
          title: "Alveo Land",
          avatar: "/alveo-logo-white-small-768x396.png",
        },

        botBubble: {
          showAvatar: true,
          avatar: "/alveo-logo-white-small-768x396.png",
        },

        chatButton: {
          icon: LuMessageCircle,
        },

        tooltip: {
          mode: "NEVER",
        },
      }}
    />
  );
};

export default Chatbot;
