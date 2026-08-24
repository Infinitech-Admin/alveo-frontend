"use client";
import { Divider, Image } from "@heroui/react";
import React from "react";

import AgentContactInfo from "./contactinfo";

import SubscribeForm from "@/components/subscribe";

interface AgentData {
  about: string;
  image: string;
  name: string;
  position: string;
}

interface AgentDataProps {
  profile: AgentData;
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

const ProfileCard: React.FC<any> = ({ profile }) => {
  return (
    <div>
      <Image
        alt="Card background"
        className="object-cover object-top overflow-hidden rounded-xl w-full mb-4"
        height={450}
        src={`${apiUrl}/profiles/${profile.profile.image}`}
        width={"auto"}
      />
      <h1 className="font-bold text-2xl">{profile.name}</h1>
      <p className="text-sm mb-4 leading-3">{profile.profile.position}</p>
      <p className="text-sm">{profile.profile.about}</p>

      <Divider className="my-4" />

      {/* Agent contact Information */}
      <AgentContactInfo data={profile} />

      {/* Additional Content */}
      <SubscribeForm />
    </div>
  );
};

export default ProfileCard;
