"use client";

import React, { useState } from "react";
import { Card, CardBody, Image, Link } from "@heroui/react";

interface NewsBlogsData {
  id: string;
  headline: string;
  image: string;
  content: string;
  date: string;
}

interface NewsBlogsDataProps {
  articles: NewsBlogsData[];
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://infinitech-api26.site";

// Fallback image
const defaultImage ="/photo_2026-08-25_11-13-34.jpg";

const NewsBlogs: React.FC<NewsBlogsDataProps> = ({
  articles,
}) => {
  // Track images that failed to load
  const [failedImages, setFailedImages] =
    useState<Set<string>>(new Set());

  const handleImageError = (
    imageUrl: string,
  ) => {
    setFailedImages((previous) => {
      if (previous.has(imageUrl)) {
        return previous;
      }

      const next = new Set(previous);
      next.add(imageUrl);

      return next;
    });
  };

  const sortedArticles = [...(articles ?? [])].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime(),
  );

  return (
    <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 md:gap-2 lg:grid-cols-5">
      {sortedArticles.map((newsItem) => {

        const formattedDate = new Date(
          newsItem.date,
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const imageUrl = newsItem.image
          ? `${apiUrl}/articles/${newsItem.image}`
          : defaultImage;

        const isFallback =
          !newsItem.image ||
          failedImages.has(imageUrl);

        const displayedImage = isFallback
          ? defaultImage
          : imageUrl;

        return (
          <Link
            key={newsItem.id}
            href={`/view/articles?id=${newsItem.id}`}
            className="h-full"
          >
            <Card className="flex h-full flex-col overflow-hidden">
              <CardBody className="flex h-full flex-col overflow-visible p-1">
                <div
                  className="relative h-48 w-full overflow-hidden rounded-xl"
                >
                  <Image
                    isZoomed={!isFallback}
                    alt={
                      newsItem.headline ||
                      "Article Image"
                    }
                    src={displayedImage}
                    width={1000}
                    height={400}
                    removeWrapper
                    className={`h-full w-full rounded-xl transition-transform duration-300 ${
                      isFallback
                        ? "object-contain p-10"
                        : "object-cover"
                    }`}
                    onError={() =>
                      handleImageError(
                        imageUrl,
                      )
                    }
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between px-2 py-4">
                  {/* Headline */}

                  <h4 className="line-clamp-2 text-sm font-bold uppercase md:text-lg">
                    {newsItem.headline ||
                      "No Headline Available"}
                  </h4>

                  {/* Content */}

                  <small className="mt-2 line-clamp-3 leading-4 text-default-500">
                    {newsItem.content ||
                      "No content available."}
                  </small>

                  {/* Date */}

                  <p className="pt-3 text-tiny font-bold uppercase">
                    {formattedDate}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default NewsBlogs;