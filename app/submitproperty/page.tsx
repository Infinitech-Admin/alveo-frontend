"use client";
import { useEffect, useState } from "react";
import ProfileCard from "../agent/profilecard";
import SubmitForm from "./submitform";
import { getAuthHeaders } from "../auth";

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

export default function BlogPage() {
  const [profile, setProfile] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";
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
    return <div>Loading Profile Data...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {/* Profile Sidebar */}
      <div className="w-full col-span-2 md:col-span-1 bg-blue-800 text-white rounded-lg px-6 py-8 order-2 md:order-1">
        <ProfileCard profile={profile} />
      </div>

      {/* Main Content */}
      <SubmitForm />
    </div>
  );
}
` `;
