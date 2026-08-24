"use client";
import React from "react";
import { Card, Skeleton } from "@heroui/react";

const TestimonialSkeleton = () => {
  return (
    <>
      {Array.from({ length: 1 }).map((_, index) => (
        <Card
          key={index}
          className="w-[180] h-auto space-y-5 p-4 gap-4 md:gap-4 md:w-full"
          radius="lg"
        >

          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </Card>
      ))}
    </>
  );
};

export default TestimonialSkeleton;
