"use client";
import { Image, Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getAuthHeaders } from "@/app/auth";
import Link from "next/link";

interface NewsBlogsData {
  id: string;
  headline: string;
  image: string;
  content: string;
  date: string;
  url: string;
}

const SingleNews = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Extract the "id" parameter
  const [news, setNews] = useState<NewsBlogsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";
      const headers = getAuthHeaders();

      try {
        const response = await fetch(`${apiUrl}/api/user/articles/${id}`, {
          method: "GET",
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the news details.");
        }

        const data = await response.json();
        setNews(data.record);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Error fetching news details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12 h-96">
        <Spinner size="lg" label="Loading Results..." />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!news) {
    return <div>No news found.</div>;
  }

  return (
    <section className="container mx-auto flex-grow max-w-7xl px-2 w-full py-8">
      <div className="py-4">
        <h1 className="font-semibold text-4xl">{news.headline}</h1>
        <p className="text-default-500">
          {new Date(news.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div>
        <img
          alt="News image"
          className="w-full h-[200px] md:h-[600px] object-cover object-center rounded-lg"
          src={`https://infinitech-testing5.online/articles/${news.image}`}
          width={1400}
          height={600}
        />

        <div className="py-2">
          Read More:
          <Link className="text-blue-700" href={news.url} target="_blank">
            {" "}
            {news.url}
          </Link>
        </div>
      </div>

      <div className="py-4">
        <p className="text-gray-700 leading-relaxed dark:text-gray-100">
          {news?.content
            ?.split(/(?<=[.!?])\s+/)
            .reduce<React.ReactNode[]>((acc, sentence, index) => {
              if (index % 2 === 0 && index !== 0)
                acc.push(
                  <br key={`br-${index}`} />,
                  <br key={`br2-${index}`} />,
                );
              acc.push(sentence + " ");
              return acc;
            }, [])}
        </p>
      </div>
    </section>
  );
};

export default SingleNews;
