import { getAuthHeaders } from "../auth";
import CompareLayout from "./comparelayout";




async function fetchProperties(){
  const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";  const endpoint = `${apiUrl}/api/user/property`;
  const headers = getAuthHeaders();

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error(`Failed to fetch properties: ${res.status} - ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data.records;
  } catch (error) {
    console.error("An error occurred while fetching properties:", error);
    return [];
  }
}

const CompareProperties = async () => {
  const properties = await fetchProperties(); 

  return (
    <div className="container mx-auto flex-grow max-w-7xl px-2">
      <CompareLayout initialData={properties} />
    </div>
  );
};

export default CompareProperties;
