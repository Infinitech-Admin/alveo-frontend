"use client";
import React, { useEffect, useState } from "react";

import { getAuthHeaders } from "../auth";

import NewsBlogs from "@/components/property/news";
import { Spinner } from "@heroui/react";

interface NewsBlogsData {
  id: string;
  headline: string;
  image: string;
  content: string;
  date: string;
}

const NewsandArticles = () => {
  const [news, setNews] = useState<NewsBlogsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";
      const headers = getAuthHeaders();

      try {
        const response = await fetch(`${apiUrl}/api/user/articles`, {
          method: "GET",
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the news.");
        }

        const data = await response.json();

        setNews(data.records || []); // Ensure `data.records` is assigned or fallback to an empty array
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Error fetching news details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array ensures the effect runs once

  return (
    <section className="container mx-auto flex-grow max-w-7xl px-2 flex flex-col py-6 md:py-12">
      <h1 className="font-bold text-3xl">News and Updates</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <p className="text-sm text-default-500 max-w-md">
          Get to know the latest news and updates about ALVEO Land.
        </p>
      </div>

      {news && news.length > 0 ? (
        <NewsBlogs articles={news} />
      ) : (
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading News..." />
        </div>
      )}
    </section>
  );
};

export default NewsandArticles;
