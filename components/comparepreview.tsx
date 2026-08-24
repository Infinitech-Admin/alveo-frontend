import { getAuthHeaders } from "@/app/auth";
import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // Import toast

interface Property {
  id: string;
  name: string;
  property: {
    name: string;
  };
}

async function fetchProperties(): Promise<Property[]> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";
  const endpoint = `${apiUrl}/api/user/property`;

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

const ComparePreview = () => {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();

  const loadCompareList = () => {
    const storedCompareList = JSON.parse(
      localStorage.getItem("compareList") || "[]",
    );
    setCompareList(storedCompareList);
  };

  useEffect(() => {
    loadCompareList();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "compareList") {
        loadCompareList();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProperties();
      setProperties(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = properties.filter((property) =>
      compareList.includes(property.id),
    );
    setFilteredProperties(filtered);
  }, [compareList, properties]);

  useEffect(() => {
    const interval = setInterval(loadCompareList, 100);
    return () => clearInterval(interval);
  }, []);

  const removeProperty = (id: string) => {
    const updatedCompareList = compareList.filter(
      (propertyId) => propertyId !== id,
    );

    localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
    setCompareList(updatedCompareList);
    window.dispatchEvent(new Event("storage"));
  };

  const handleCompareClick = () => {
    if (compareList.length <= 1) {
      toast.error("You must select at least two properties to compare.");
      return;
    }
    setButtonLoading(true);
    router.push(`/compare`);
  };

  if (compareList.length === 0) return null;

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <h1 className="text-sm font-semibold uppercase text-center md:text-left">
            Compare Properties:
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center bg-green-400 py-1 px-3 md:py-2 md:px-4 rounded-md text-sm md:text-base"
                >
                  <span className="mr-2">{property.property.name}</span>
                  <button
                    onClick={() => removeProperty(property.id)}
                    className="text-red-600 font-bold ml-2 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <Button
              className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 bg-blue-800 text-white"
              isLoading={buttonLoading}
              onPress={handleCompareClick}
            >
              Compare
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ComparePreview;
