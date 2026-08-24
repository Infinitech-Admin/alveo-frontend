"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Spinner,
  Divider,
  Link,
  Button,
  Image,
  Card,
  CardBody,
  Pagination,
} from "@heroui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  FaSquareInstagram,
  FaTelegram,
  FaViber,
  FaWhatsapp,
} from "react-icons/fa6";
import { MdEmail, MdFacebook, MdPhone } from "react-icons/md";
import { getAuthHeaders } from "../auth";
import SubscribeForm from "@/components/subscribe";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://infinitech-api26.site";

// ---------- Types ----------
interface Testimonial {
  name: string;
  message: string;
  status?: string;
}

interface MediaItem {
  image: string;
  title?: string;
  name?: string;
}

interface AgentProfile {
  image: string;
  about: string;
  position: string;
  facebook: string;
  instagram: string;
  phone: string;
}

interface AgentRecord {
  name: string;
  email: string;
  profile?: AgentProfile;
  testimonials: Testimonial[];
  certificates: MediaItem[];
  images: MediaItem[];
}

// ---------- Layout ----------
function AgentPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="flex flex-col items-center inset-0 justify-center w-full h-52 bg-cover bg-center bg-no-repeat py-8"
        style={{ backgroundImage: `url('/page-banner.png')` }}
      >
        <h1 className="uppercase text-3xl md:text-5xl text-white font-bold">
          agent profile
        </h1>
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-8">
        {children}
      </section>
    </>
  );
}

// ---------- Contact Info ----------
function AgentContactInfo({
  data,
}: {
  data: AgentRecord & { profile: AgentProfile };
}) {
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  const handleSaveContact = () => {
    const vcfUrl = "/contacts/ella-sarmiento.vcf";
    const link = document.createElement("a");
    link.href = vcfUrl;
    link.download = "EllaSarmiento.vcf";
    link.click();
  };

  return (
    <div className="flex flex-col mb-4">
      <div>
        <h2 className="text-sm font-semibold mb-2">Contact Info</h2>

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

      <div className="mb-6 relative">
        <h2 className="text-sm font-semibold mb-2">Social Links</h2>
        <ul className="space-y-2">
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
}

// ---------- Profile Card ----------
function ProfileCard({
  profile,
}: {
  profile: AgentRecord & { profile: AgentProfile };
}) {
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

      <AgentContactInfo data={profile} />

      <SubscribeForm />
    </div>
  );
}

// ---------- Certificates ----------
function AgentCertificates({ agentdata }: { agentdata: MediaItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      <PhotoProvider>
        {agentdata.map((certificate, index) => (
          <PhotoView
            key={index}
            data-title={certificate.title}
            src={`${apiUrl}/certificates/${certificate.image}`}
          >
            <Image
              isZoomed
              alt={certificate.title}
              height={300}
              width={1000}
              src={`${apiUrl}/certificates/${certificate.image}`}
            />
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  );
}

// ---------- Gallery ----------
function AgentGallery({ agentdata }: { agentdata: MediaItem[] }) {
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
              width={500}
              src={`${apiUrl}/images/${data.image}`}
            />
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  );
}

// ---------- Testimonials ----------
function AgentTestimonial({
  testimonials,
  itemsPerPage = 10,
}: {
  testimonials: Testimonial[];
  itemsPerPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const activeTestimonials = testimonials.filter((t) => t.status === "active");

  const totalPages = Math.ceil(activeTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTestimonials = activeTestimonials.slice(
    startIndex,
    startIndex + itemsPerPage,
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
}

// ---------- Main Page ----------
const AgentPage = () => {
  const [activeTab, setActiveTab] = useState<string>("certificates");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [certificates, setCertificates] = useState<MediaItem[]>([]);
  const [images, setGallery] = useState<MediaItem[]>([]);
  const [profile, setProfile] = useState<AgentRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const endpoint = `${apiUrl}/api/user`;

      try {
        const headers = getAuthHeaders();
        const response = await fetch(endpoint, {
          method: "GET",
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch testimonials: ${response.status} - ${response.statusText}`,
          );
        }

        const data = await response.json();
        const record = data.record;

        setTestimonials(record?.testimonials || []);
        setCertificates(record?.certificates || []);
        setGallery(record?.images || []);
        setProfile(record?.profile ? record : null);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <AgentPageLayout>
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading Agent Profile..." />
        </div>
      </AgentPageLayout>
    );
  }

  const completeProfile = profile?.profile
    ? (profile as AgentRecord & { profile: AgentProfile })
    : null;

  if (!testimonials.length || !completeProfile) {
    return (
      <AgentPageLayout>
        <div className="flex justify-center py-12 h-96">
          No testimonials available.
        </div>
      </AgentPageLayout>
    );
  }

  return (
    <AgentPageLayout>
      <div className="mx-auto flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 items-start px-4 xl:px-24">
        {/* Profile Sidebar */}
        <div className="w-full col-span-2 md:col-span-1 bg-blue-900 text-white rounded-lg px-6 py-8">
          <ProfileCard profile={completeProfile} />
        </div>

        {/* Main Content */}
        <div className="col-span-2">
          <Tabs
            aria-label="Agent Details Tabs"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
          >
            <Tab key="certificates" title="Certificates">
              <AgentCertificates agentdata={certificates} />
            </Tab>

            <Tab key="gallery" title="Gallery">
              <AgentGallery agentdata={images} />
            </Tab>

            <Tab key="testimonials" title="Testimonials">
              <AgentTestimonial testimonials={testimonials} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </AgentPageLayout>
  );
};

export default AgentPage;
