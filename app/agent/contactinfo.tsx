import { Divider, Link, Button } from "@heroui/react";
import React from "react";
import { FaSquareInstagram, FaTelegram, FaViber, FaWhatsapp } from "react-icons/fa6";
import { MdEmail, MdFacebook, MdPhone } from "react-icons/md";

interface AgentData {
  email: string;
  profile: {
    facebook: string;
    instagram: string;
    phone: string;
  };
}

interface AgentDataProps {
  data: AgentData;
}

const AgentContactInfo: React.FC<AgentDataProps> = ({ data }) => {
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  const handleSaveContact = () => {
    // You can replace this link with your actual vCard (.vcf) file
    const vcfUrl = "/contacts/ella-sarmiento.vcf";
    const link = document.createElement("a");
    link.href = vcfUrl;
    link.download = "EllaSarmiento.vcf";
    link.click();
  };

  return (
    <div className="flex flex-col mb-4">
      {/* Contact Info */}
      <div>
        <h2 className="text-sm font-semibold mb-2">Contact Info</h2>

        {/* Email */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className="bg-blue-100 p-1 rounded-lg shrink-0">
            <MdEmail className="text-blue-700" size={18} />
          </div>
          <span className="shrink-0">:</span>
          <div className="flex-1 min-w-0">
            <a
              className="text-blue-200 hover:underline break-words"
              href={`mailto:${data.email}`}
            >
              {data.email}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className="bg-blue-100 py-1 px-1 rounded-lg">
            <MdPhone className="text-blue-700" size={18} />
          </div>
          <span>:</span>
          <a
            className="text-blue-200 hover:underline"
            href={`tel:+63${data.profile.phone}`}
          >
            (+63) {formatPhoneNumber(data.profile.phone)}
          </a>
        </div>

        {/* Telegram */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className="bg-blue-100 py-1 px-1 rounded-lg">
            <FaTelegram className="text-blue-700" size={18} />
          </div>
          <span>:</span>
          <a
            className="text-blue-200 hover:underline"
            href={`https://t.me/+63${data.profile.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ella Sarmiento
          </a>
        </div>

        {/* Viber */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className="bg-blue-100 py-1 px-1 rounded-lg">
            <FaViber className="text-blue-700" size={18} />
          </div>
          <span>:</span>
          <a
            className="text-blue-200 hover:underline"
            href={`viber://chat?number=%2B63${data.profile.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ella Sarmiento
          </a>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className="bg-blue-100 py-1 px-1 rounded-lg">
            <FaWhatsapp className="text-blue-700" size={18} />
          </div>
          <span>:</span>
          <a
            className="text-blue-200 hover:underline"
            href={`https://wa.me/63${data.profile.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ella Sarmiento
          </a>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Social Links */}
      <div className="mb-6 relative">
        <h2 className="text-sm font-semibold mb-2">Social Links</h2>
        <ul className="space-y-2">
          {/* Facebook */}
          <li className="flex items-center gap-2 text-sm">
            <div className="bg-blue-100 py-1 px-1 rounded-lg">
              <MdFacebook className="text-blue-700" size={18} />
            </div>
            <span>:</span>
            <Link
              className="text-blue-200 text-tiny break-words line-clamp-1 hover:underline"
              href={data.profile.facebook}
              target="_blank"
            >
              Sonora Garden Residences - ALVEO Land by Ella Sarmiento
            </Link>
          </li>

          {/* Instagram */}
          <li className="flex items-center gap-2 text-sm">
            <div className="bg-blue-100 py-1 px-1 rounded-lg">
              <FaSquareInstagram className="text-blue-700" size={18} />
            </div>
            <span>:</span>
            <Link
              className="text-blue-200 text-tiny break-words line-clamp-1 hover:underline"
              href={data.profile.instagram}
              target="_blank"
            >
              ALVEO Land by Ella Sarmiento
            </Link>
          </li>
        </ul>

        {/* ✅ Save Contact Button - under Instagram, right aligned */}
       {/* ✅ Save Contact Button - visible only on mobile */}
<div className="flex justify-end mt-3 md:hidden">
  <Button
    size="sm"
    color="primary"
    variant="solid"
    className="font-semibold text-white"
    onPress={handleSaveContact}
  >
    Save Contact
  </Button>
</div>

      </div>
    </div>
  );
};

export default AgentContactInfo;
