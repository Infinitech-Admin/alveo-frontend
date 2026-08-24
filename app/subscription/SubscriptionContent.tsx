"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function SubscriptionContent() {
  const searchParams = useSearchParams();
  const email: string | null = searchParams.get("email");
  const hasUnsubscribed = useRef(false); // 🔒 Add a ref to prevent double call

  const handleUnsubscribe = async (email: string) => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/unsubscribe/${encodedEmail}`,
      );
      const data = await response.json();

      if (data.message === "Unsubscribed To Newsletter") {
      } else {
        toast.error("Something went wrong.");
      }
    } catch {
      toast.error("Failed to unsubscribe.");
    }
  };

  useEffect(() => {
    if (email && !hasUnsubscribed.current) {
      hasUnsubscribed.current = true;
      handleUnsubscribe(email);
    }
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Unsubscribed</h1>
        <p className="text-gray-600 mb-6">
          You&apos;ve been unsubscribed from our newsletter.
        </p>
      </div>
    </div>
  );
}
