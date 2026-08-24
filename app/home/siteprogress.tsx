"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

import { getAuthHeaders } from "../auth";
import SiteProgressCard from "@/components/modal/siteprogresscard";
import EmptyData from "@/components/fallback/emptydata";
import NoDataFound from "@/components/fallback/nodatafound";
import { Spinner } from "@heroui/react";

interface Property {
  name: string;
  property_location: string;
  status: string;
  min_price: number;
  max_price: number;
  percent: number;
  images: string;
}

const SiteProgress = () => {
  const [propertyData, setPropertyData] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";      const headers = getAuthHeaders();

      try {
        const response = await fetch(`${apiUrl}/api/user/properties`, {
          method: "GET",
          headers,
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommended properties");
        }

        const data = await response.json();
        const properties: Property[] = data.records.filter((record: Property) => {
          return record.percent < 100;
        });

        if (properties.length === 0) {
          setError("No properties available.");
        } else {
          setPropertyData(properties);
        }
      } catch (err) {
        setError("Error fetching properties. Please try again later.");
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  return (
    <section className="flex flex-col">
      <h1 className="font-bold text-3xl pb-2 pt-4 uppercase">Site Progress</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <p className="text-md text-default-500 max-w-lg">
          ALVEO Land is dedicated to delivering quality developments on time
          or even ahead of what we promised.
        </p>
      </div>

      {!propertyData || propertyData.length === 0 ? (
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading Data..." />
        </div>
      ) : propertyData.length > 0 ? (
        <SiteProgressCard data={propertyData} />
      ) : (
        <NoDataFound />
      )}
    </section>
  );
};

export default SiteProgress;
