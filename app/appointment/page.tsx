"use client";
import { useEffect, useState } from "react";
import ProfileCard from "../agent/profilecard";

import AppointmentCard from "./appoitnmentcard";
import { getAuthHeaders } from "../auth";
import { Spinner } from "@heroui/react";

interface AgentData {
  id: string;
  user_id: string;
  name: string;
  message: string;
  created_at: string;
  image: string;
  title: string;
  about: string;
  position: string;
  facebook: string;
  email: string;
  phone: string;
}


export default function Appointment() {


  const [profile, setProfile] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      window.scrollTo(0, 0)

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = `${apiUrl}/api/user`;

      try {
        const headers = getAuthHeaders();
        const response = await fetch(endpoint, {
          method: "GET",
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch testimonials: ${response.status} - ${response.statusText}`,
          );
        }

        const data = await response.json();

        setProfile(data.record || []);


      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12 h-96">
      <Spinner size="lg" label="Loading Forms..." />
    </div>;
  }


  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start px-4 xl:px-24">
      {/* Profile Sidebar */}
      <div className="w-full order-2 md:order-1 col-span-2 md:col-span-1 bg-blue-800 text-white rounded-lg px-6 py-8">
        <ProfileCard profile={profile} />
      </div>

      {/* Main Content */}
      <AppointmentCard />
    </div>
  );
}
