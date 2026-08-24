"use client";
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
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const NewsBlogs: React.FC<NewsBlogsDataProps> = ({ articles }) => {
  const defaultImage =
    "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg";

  // Sort articles by date in descending order (latest first)
  const sortedArticles = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-2 py-4">
      {sortedArticles.map((newsItem, index) => {
        // Format the date to a long format (e.g., "January 8, 2025")
        const formattedDate = new Date(newsItem.date).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        );

        return (
          <Link key={index} href={`view/articles?id=${newsItem.id}`}>
            <Card className="flex flex-col h-full">
              <CardBody className="overflow-visible py-1 px-1 flex flex-col h-full">
                <div className="overflow-hidden rounded-lg mb-4">
                  <Image
                    isZoomed
                    alt="Card background"
                    className="object-cover rounded-xl w-full min-h-32 md:h-48 aspect-w-16"
                    src={
                      newsItem.image
                        ? `${apiUrl}/articles/${newsItem.image}`
                        : defaultImage
                    }
                    width={1000}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-4 px-2">
                  <h4 className="font-bold text-sm md:text-lg uppercase line-clamp-1">
                    {newsItem.headline}
                  </h4>
                  <small className="text-default-500 line-clamp-3 md:line-clamp-3 leading-4">
                    {newsItem.content}
                  </small>
                  <p className="text-tiny uppercase font-bold pt-2">
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
