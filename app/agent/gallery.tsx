import { Image } from "@heroui/react";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface AgentData {
  image: string;
  name: string;
}

interface AgentDataProps {
  agentdata: AgentData[];
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const AgentGallery: React.FC<AgentDataProps> = ({ agentdata }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      <PhotoProvider>
        {agentdata.map((data, index) => (
          <PhotoView
            key={index}
            data-title={data.name}
            src={`${apiUrl}/images/${data.image}`}
          >
            <Image
              isZoomed
              alt={data.name}
              className="bg-cover object-cover rounded-xl w-full"
              height={300}
              width={500} // Add a width to maintain aspect ratio
              src={`${apiUrl}/images/${data.image}`}
            />
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  );
};

export default AgentGallery;
