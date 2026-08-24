"use client";

import React, { useState, useEffect } from "react";
import PropertyFilter from "../../components/property/filter";
import { getAuthHeaders } from "../auth";
import RecommendedCard from "@/components/modal/recomendedproperty";
import PropertySkeleton from "@/components/skeleton/propertyskeleton";
import { Input, Select, SelectItem, Spinner } from "@heroui/react";
import FilterPropertyModal from "@/components/modal/fileterproperty";
import ComparePreview from "@/components/comparepreview";
import { LuSearch } from "react-icons/lu";

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

const priceRanges = [
  { key: "All", value: "All" },
  { key: "1M - 2M", value: "1000000-2000000" },
  { key: "2M - 3M", value: "2000000-3000000" },
  { key: "3M - 4M", value: "3000000-4000000" },
  { key: "4M - 5M", value: "4000000-5000000" },
  { key: "5M - 6M", value: "5000000-6000000" },
  { key: "6M - 7M", value: "6000000-7000000" },
  { key: "7M - 8M", value: "7000000-8000000" },
  { key: "8M - 9M", value: "8000000-9000000" },
  { key: "9M - 10M", value: "9000000-10000000" },
  { key: "10M+", value: "10000000-100000000" },
];

async function fetchProperties() {
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

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  useEffect(() => {
    async function loadProperties() {
      const data = await fetchProperties();
      // Guard at the source: drop any record missing a valid nested `property`
      // object before it ever reaches state. This is what stops the
      // "Cannot read properties of null (reading 'name')" crash downstream,
      // in both this component's filter and RecommendedCard's sort.
      const safeData = (data ?? []).filter(
        (item: Property) => item && item.property && item.property.name,
      );
      setProperties(safeData);
      setFilteredProperties(safeData);
      setLoading(false);
    }

    loadProperties();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    let filtered = properties.filter((property) => {
      if (!property || !property.property || !property.property.name) {
        return false;
      }

      return (
        property.property.name.toLowerCase().includes(term) ||
        (property.property_location || "").toLowerCase().includes(term) ||
        (property.property_type || "").toLowerCase().includes(term)
      );
    });

    if (selectedPriceRange && selectedPriceRange !== "All") {
      const [minPrice, maxPrice] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(
        (property) =>
          property.property_price >= minPrice &&
          property.property_price <= maxPrice,
      );
    }

    if (selectedPriceRange === "All") {
      filtered = properties; // Reset to all (already-safe) properties
    }

    setFilteredProperties(filtered);
  }, [searchTerm, selectedPriceRange, properties]);

  return (
    <div className="flex-grow px-4 xl:px-24">
      {loading ? (
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading Properties..." />
        </div>
      ) : (
        <>
          <div className="sticky top-20 z-20">
            <ComparePreview />
          </div>
          <div className="flex items-center justify-end gap-2 py-8 w-full min-w-screen">
            <Input
              startContent={<LuSearch />}
              type="text"
              placeholder="Search properties and address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 rounded-md py-2"
            />
            <Select
              aria-label="Filter properties by price"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <RecommendedCard data={filteredProperties} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

// "use client";

// import React, { useState, useEffect } from "react";
// import PropertyFilter from "../../components/property/filter";
// import { getAuthHeaders } from "../auth";
// import RecommendedCard from "@/components/modal/recomendedproperty";
// import PropertySkeleton from "@/components/skeleton/propertyskeleton";
// import { Input, Select, SelectItem, Spinner, Chip } from "@heroui/react";
// import FilterPropertyModal from "@/components/modal/fileterproperty";
// import ComparePreview from "@/components/comparepreview";
// import { LuSearch, LuSlidersHorizontal } from "react-icons/lu";

// interface Property {
//   id: string;
//   property_location: string;
//   status: string;
//   property_price: number;
//   property_type: string;
//   images: string;
//   property_description: string;
//   property_size: string;
//   property_level: string;
//   property: {
//     name: string;
//     location: string;
//   };
// }

// const priceRanges = [
//   { key: "All", value: "All" },
//   { key: "1M - 2M", value: "1000000-2000000" },
//   { key: "2M - 3M", value: "2000000-3000000" },
//   { key: "3M - 4M", value: "3000000-4000000" },
//   { key: "4M - 5M", value: "4000000-5000000" },
//   { key: "5M - 6M", value: "5000000-6000000" },
//   { key: "6M - 7M", value: "6000000-7000000" },
//   { key: "7M - 8M", value: "7000000-8000000" },
//   { key: "8M - 9M", value: "8000000-9000000" },
//   { key: "9M - 10M", value: "9000000-10000000" },
//   { key: "10M+", value: "10000000-100000000" },
// ];

// async function fetchProperties() {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const endpoint = `${apiUrl}/api/property`;

//   try {
//     const headers = getAuthHeaders();
//     const res = await fetch(endpoint, {
//       method: "GET",
//       headers,
//       cache: "no-cache",
//     });

//     if (!res.ok) {
//       console.error(
//         `Failed to fetch properties: ${res.status} - ${res.statusText}`,
//       );
//       return [];
//     }
//     const data = await res.json();
//     return data.records;
//   } catch (error) {
//     console.error("An error occurred while fetching properties:", error);
//     return [];
//   }
// }

// const HomePage = () => {
//   const [loading, setLoading] = useState(true);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPriceRange, setSelectedPriceRange] = useState("");

//   useEffect(() => {
//     async function loadProperties() {
//       const data = await fetchProperties();
//       // Guard at the source: drop any record missing a valid nested `property`
//       // object before it ever reaches state. This is what stops the
//       // "Cannot read properties of null (reading 'name')" crash downstream,
//       // in both this component's filter and RecommendedCard's sort.
//       const safeData = (data ?? []).filter(
//         (item: Property) => item && item.property && item.property.name,
//       );
//       setProperties(safeData);
//       setFilteredProperties(safeData);
//       setLoading(false);
//     }

//     loadProperties();
//   }, []);

//   useEffect(() => {
//     const term = searchTerm.toLowerCase();

//     let filtered = properties.filter((property) => {
//       if (!property || !property.property || !property.property.name) {
//         return false;
//       }

//       return (
//         property.property.name.toLowerCase().includes(term) ||
//         (property.property_location || "").toLowerCase().includes(term) ||
//         (property.property_type || "").toLowerCase().includes(term)
//       );
//     });

//     if (selectedPriceRange && selectedPriceRange !== "All") {
//       const [minPrice, maxPrice] = selectedPriceRange.split("-").map(Number);
//       filtered = filtered.filter(
//         (property) =>
//           property.property_price >= minPrice &&
//           property.property_price <= maxPrice,
//       );
//     }

//     if (selectedPriceRange === "All") {
//       filtered = properties; // Reset to all (already-safe) properties
//     }

//     setFilteredProperties(filtered);
//   }, [searchTerm, selectedPriceRange, properties]);

//   const hasActiveFilters =
//     searchTerm.trim().length > 0 ||
//     (selectedPriceRange && selectedPriceRange !== "All");

//   return (
//     <div className="flex-grow">
//       <style>{`
//         :root {
//           --plan-ink: 27 27 24;
//           --plan-brass: #a9895f;
//           --plan-pine: #2f4a3d;
//         }
//         .plan-grid-bg {
//           background-image:
//             linear-gradient(rgba(var(--plan-ink), 0.05) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(var(--plan-ink), 0.05) 1px, transparent 1px);
//           background-size: 40px 40px;
//         }
//       `}</style>

//       {/* ---------------------------------------------------------------- */}
//       {/* TOOLBAR HEADER                                                    */}
//       {/* ---------------------------------------------------------------- */}
//       <div className="plan-grid-bg relative border-b border-default-200 px-4 xl:px-24 py-8 md:py-10">
//         <div className="relative">
//           <p className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-medium text-[var(--plan-brass)]">
//             <span className="h-1.5 w-1.5 rounded-full bg-[var(--plan-brass)]" />
//             Property Listings
//           </p>
//           <h1 className="font-serif text-2xl md:text-3xl text-default-900 mt-3">
//             Find your next address.
//           </h1>

//           <div className="flex flex-col md:flex-row md:items-center gap-3 mt-6">
//             <Input
//               startContent={<LuSearch className="text-default-400" />}
//               type="text"
//               placeholder="Search properties and address..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               radius="none"
//               variant="bordered"
//               classNames={{
//                 inputWrapper: "border-default-300 bg-background",
//               }}
//               className="w-full md:max-w-md"
//             />
//             <Select
//               value={selectedPriceRange}
//               onChange={(e) => setSelectedPriceRange(e.target.value)}
//               defaultSelectedKeys={["All"]}
//               radius="none"
//               variant="bordered"
//               classNames={{
//                 trigger: "border-default-300 bg-background",
//               }}
//               className="w-full md:w-44"
//               aria-label="Price range"
//             >
//               {priceRanges.map((range) => (
//                 <SelectItem key={range.value} value={range.value}>
//                   {range.key}
//                 </SelectItem>
//               ))}
//             </Select>

//             {/*
//               PropertyFilter / FilterPropertyModal are imported but not wired
//               in the original page and their props aren't visible from this
//               file alone, so behavior is intentionally left unchanged here.
//               This is the natural slot for an "Advanced filters" trigger,
//               e.g.:
//                 <FilterPropertyModal onApply={(filters) => ...} />
//               or an inline <PropertyFilter /> panel toggled by this button.
//             */}
//             <button
//               type="button"
//               disabled
//               title="Wire up FilterPropertyModal or PropertyFilter here"
//               className="flex items-center justify-center gap-2 border border-dashed border-default-300 text-default-400 text-sm px-4 py-2 md:ml-auto cursor-not-allowed"
//             >
//               <LuSlidersHorizontal size={16} />
//               Advanced filters
//             </button>
//           </div>

//           {hasActiveFilters && (
//             <div className="flex flex-wrap items-center gap-2 mt-4">
//               <span className="text-xs uppercase tracking-wide text-default-400">
//                 Active:
//               </span>
//               {searchTerm.trim() && (
//                 <Chip
//                   size="sm"
//                   radius="none"
//                   variant="flat"
//                   onClose={() => setSearchTerm("")}
//                   className="bg-default-100 text-default-700"
//                 >
//                   &ldquo;{searchTerm}&rdquo;
//                 </Chip>
//               )}
//               {selectedPriceRange && selectedPriceRange !== "All" && (
//                 <Chip
//                   size="sm"
//                   radius="none"
//                   variant="flat"
//                   onClose={() => setSelectedPriceRange("All")}
//                   className="bg-default-100 text-default-700"
//                 >
//                   {priceRanges.find((r) => r.value === selectedPriceRange)?.key}
//                 </Chip>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ---------------------------------------------------------------- */}
//       {/* COMPARE PREVIEW                                                   */}
//       {/* ---------------------------------------------------------------- */}
//       <div className="sticky top-20 z-20">
//         <ComparePreview />
//       </div>

//       {/* ---------------------------------------------------------------- */}
//       {/* RESULTS                                                           */}
//       {/* ---------------------------------------------------------------- */}
//       <div className="px-4 xl:px-24 py-8">
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//             {Array.from({ length: 10 }).map((_, i) => (
//               <PropertySkeleton key={i} />
//             ))}
//           </div>
//         ) : filteredProperties.length === 0 ? (
//           <div className="relative border border-dashed border-default-300 py-20 px-6 text-center">
//             <p className="font-serif italic text-lg text-default-700">
//               No properties match your search.
//             </p>
//             <p className="text-sm text-default-500 mt-2">
//               Try a different keyword or widen the price range.
//             </p>
//           </div>
//         ) : (
//           <>
//             <p className="text-xs uppercase tracking-wide text-default-400 mb-4">
//               {filteredProperties.length} result
//               {filteredProperties.length === 1 ? "" : "s"}
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//               <RecommendedCard data={filteredProperties} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
