import RecommendedCard from "@/components/modal/recomendedproperty";
import { filterMaxPrice } from "@/utils/priceformat";

interface Property {
  id: string;
  property_location: string;
  status: string;
  property_price: number;
  property_type: string;
  images: string;
  property_description: string;
  property_size: string;
  property_level: string;
  property: {
    name: string;
    location: string;
  };
}

// Fetch properties from the API, passing any query parameters for filtering
async function fetchProperties(searchParams: string) {
  try {
    const userId = process.env.NEXT_PUBLIC_API_USER_ID || "";
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    if (!userId) {
      throw new Error("API User ID is missing.");
    }
    console.log(
      "URL:",
      `${apiBase}/api/user/filter-properties?${searchParams}`,
    );

    const res = await fetch(
      `${apiBase}/api/user/filter-properties?${searchParams}`,
      {
        cache: "no-store",
        headers: {
          "User-ID": userId,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Data:", data.records);
    return data.records || [];
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

export default async function PropertyFinder({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const location = resolvedSearchParams.location || "";
  const types = resolvedSearchParams.types || "";
  const min_price = resolvedSearchParams.min_price || "";
  const max_price = resolvedSearchParams.max_price || "";

  const queryParams = new URLSearchParams();
  if (location) queryParams.append("location", location);
  if (types) queryParams.append("types", types);
  if (min_price) queryParams.append("min_price", min_price);
  if (max_price) queryParams.append("max_price", max_price);

  const queryString = queryParams.toString();
  const properties = queryString ? await fetchProperties(queryString) : [];

  const options = [
    "Studio",
    "1 Bedroom",
    "2 Bedroom",
    "3 Bedroom",
    "Tandem Unit",
    "Studio w/ Parking",
    "1 Bedroom w/ Parking",
    "2 Bedroom w/ Parking",
    "3 Bedroom w/ Parking",
    "Tandem Unit w/ Parking",
    "Studio w/ Tandem Parking",
    "1 Bedroom w/ Tandem Parking",
    "2 Bedroom w/ Tandem Parking",
    "3 Bedroom w/ Tandem Parking",
    "Tandem Unit w/ Tandem Parking",
    "1 Parking Slot",
    "Tandem Parking",
  ];

  let title = "";
  if (location && types) {
    title = `${location} - ${types}`;
  } else if (location) {
    title = location;
  } else if (types) {
    title = types;
  }

  return (
    <section className="container flex-grow px-2 flex flex-col gap-4 py-6 md:py-8">
      <div className="text-start">
        <p className="text-lg">Search Results: {title}</p>

        {properties.length > 0 ? (
          <div className="grid grid-cols-2 py-8 gap-1 md:grid-cols-4 md:gap-2">
            <RecommendedCard data={properties} />
          </div>
        ) : (
          <div className="flex justify-center items-center py-12 h-96">
            <p className="text-lg text-gray-500">
              No properties found. Try modifying your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
