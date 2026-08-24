import { Image } from "@heroui/react";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// Declare the agent data types
interface AgentData {
  image: string;
  title: string;
}

interface AgentDataProps {
  agentdata: AgentData[];
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api6.site";

const AgentCertificates: React.FC<AgentDataProps> = ({ agentdata }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      <PhotoProvider>
        {agentdata.map((Certificate, index) => (
          <PhotoView
          key={index}
            data-title={Certificate.title}
            src={`${apiUrl}/certificates/${Certificate.image}`}
          >
            <Image
              isZoomed
              alt={Certificate.title}
              height={300}
              width={1000}
              src={`${apiUrl}/certificates/${Certificate.image}`}
            />
          </PhotoView>
        ))}
      </PhotoProvider>

    </div>
  );
};

export default AgentCertificates;
