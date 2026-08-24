import { cache } from "react";
import { getAuthHeaders } from "@/app/auth";

export const getProperty = cache(async (property_id: string) => {
  const headers = getAuthHeaders();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/property/${property_id}`,
      {
        method: "GET",
        headers,
        cache: "no-store",
      },
    );
    const data = await response.json();
    return data.record;
  } catch (error) {
    return null;
  }
});
