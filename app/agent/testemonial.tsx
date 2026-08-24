import { Card, CardBody, Pagination } from "@heroui/react";
import React, { useState } from "react";

interface Testimonial {
  name: string;
  message: string;
  status?: string;
}

interface AgentTestimonialProps {
  testimonials: Testimonial[];
  itemsPerPage?: number;
}

const AgentTestimonial: React.FC<AgentTestimonialProps> = ({
  testimonials,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Filter only active testimonials
  const activeTestimonials = testimonials.filter(
    (t) => t.status === "active"
  );

  const totalPages = Math.ceil(activeTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTestimonials = activeTestimonials.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {currentTestimonials.map((testimonial, index) => (
          <Card key={index} className="shadow-none border">
            <CardBody>
              <p className="text-sm text-default-500 italic">
                &quot;{testimonial.message}&quot;
              </p>
              <h1 className="font-bold text-lg mt-4 text-default-600">
                {testimonial.name}
              </h1>
            </CardBody>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="py-4 flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </>
  );
};

export default AgentTestimonial;
