export const getAuthHeaders = (): HeadersInit => {
  const id = process.env.NEXT_PUBLIC_API_USER_ID;

  if (!id) {
    console.warn("No token available for authorization.");

    return {};
  }

  return {
    "User-ID": `${id}`,
    "Content-Type": "application/json",
  };
};
