"use client";

import React, { useState, useEffect } from "react";

import PropertyFilter from "../../components/property/filter";
import { getAuthHeaders } from "../auth";

import RecommendedCard from "@/components/modal/propertycard";
import PropertySkeleton from "@/components/skeleton/propertyskeleton";
import { Spinner, Input, Select, SelectItem } from "@heroui/react";
import { LuSearch } from "react-icons/lu";

interface Listings {
  id: string;
  name: string;
  location: string;
  unit_name: string;
  unit_location: string;
  unit_type: string;
  status: string;
  unit_price: number;
  images: string;
  property: {
    name: string;
    location: string;
    description: string;
  };
}

const priceRanges = [
  { key: "All", value: "All" },
  { key: "1M - 2M", value: "1000000-2000000" },
  { key: "2M - 3M", value: "2000000-3000000" },
  { key: "3M - 5M", value: "3000000-5000000" },
  { key: "5M+", value: "5000000-100000000" },
];

async function fetchProperties(): Promise<Listings[]> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";
  const endpoint = `${apiUrl}/api/user/listings`;

  try {
    const headers = getAuthHeaders();
    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch properties: ${res.status} - ${res.statusText}`,
      );
      return [];
    }

    const data = await res.json();
    return data.records;
  } catch (error) {
    console.error("An error occurred while fetching properties:", error);
    return [];
  }
}

export default function ListingsPage() {
  const [properties, setProperties] = useState<Listings[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Listings[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  useEffect(() => {
    async function loadProperties() {
      const data = await fetchProperties();
      setProperties(data);
      setFilteredProperties(data);
      setLoading(false);
    }

    loadProperties();
  }, []);

  useEffect(() => {
    let filtered = properties.filter(
      (property) =>
        property.property.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.property.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );

    if (selectedPriceRange && selectedPriceRange !== "All") {
      // If a specific price range is selected, split the range and apply the filter
      const [minPrice, maxPrice] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(
        (property) =>
          property.unit_price >= minPrice && property.unit_price <= maxPrice,
      );
    }

    // If "All" is selected, show all properties without filtering
    if (selectedPriceRange === "All") {
      filtered = properties; // Reset to all properties
    }

    setFilteredProperties(filtered);
  }, [searchTerm, selectedPriceRange, properties]);

  return (
    <div className="container mx-auto flex-grow max-w-7xl px-2">
      {loading ? (
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading Properties..." />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-end gap-2 py-8 w-full">
            <Input
              startContent={<LuSearch />}
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 rounded-md py-2"
            />
            <Select
              aria-label="Filter listings by price"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full max-w-32 rounded-md py-2"
              defaultSelectedKeys={["All"]}
            >
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.key}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-2">
            <RecommendedCard data={filteredProperties} type="listing" />
          </div>
        </>
      )}
    </div>
  );
}
