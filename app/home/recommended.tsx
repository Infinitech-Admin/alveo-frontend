"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { getAuthHeaders } from "../auth";
import RecommendedCard from "@/components/modal/recomendedproperty";
import { Spinner } from "@heroui/react";


const RecommendedForYou = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchProperties = async () => {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";
      const headers = getAuthHeaders();

      try {
        const response = await fetch(`${apiUrl}/api/user/property?limit=5`, {
          method: "GET",
          headers,
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommended properties.");
        }

        const data = await response.json();

        setProperties(data.records.slice(0, 5) || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Error fetching properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  return (
    <section className="flex flex-col">
      <h1 className="font-bold text-3xl pb-2 pt-12 uppercase">Recommended For You</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <p className="text-md text-default-500 max-w-lg">
          ALVEO Land believes in building world-class communities fit for your
          every need. Take a look at these other communities!
        </p>
        <Button
          isLoading={buttonLoading}
          className="bg-[#192D4D] text-white text-sm uppercase px-4 py-2 rounded-xl hover:bg-[#192D4D]/80 hover:shadow-lg transition duration-300 ease-in-out"
          variant="solid"
          onPress={() => {
            setButtonLoading(true);
            router.push(`/properties`);
          }}
        >
          see all properties →
        </Button>
      </div>

      {properties && properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-4 py-6">
          <RecommendedCard data={properties} />
        </div>
      ) :
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading Propperties...." />
        </div>
      }
    </section>
  );
};

export default RecommendedForYou;

