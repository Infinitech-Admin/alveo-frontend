import { Suspense } from "react";
import SubscriptionContent from "./SubscriptionContent";

export default function SubscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  );
}
