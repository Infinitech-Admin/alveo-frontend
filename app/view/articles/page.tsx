import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import SingleNews from "./SingleNews";

export default function ArticlesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading Results..." />
        </div>
      }
    >
      <SingleNews />
    </Suspense>
  );
}
