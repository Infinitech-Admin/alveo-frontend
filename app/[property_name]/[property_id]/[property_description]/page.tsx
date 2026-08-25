import { getAuthHeaders } from "@/app/auth";
import { generateMetadata } from "./metadata";
import DetailSection from "./detailsection";
import MasterPlanSection from "./unitplan";
import GeneralFacilities from "./generalfacilities";
import PropertyImage from "./propertymedia";
import InquiryContainer from "./inquirycontainer";
import Map from "./map";
import UnitAmenities from "./amenities";
import ContactUs from "@/app/home/contactus";
import BuildingPlanSection from "./buildingplan";

type paramsTypes = {
  property_name: string;
  property_id: string;
  property_description: string;
};

export { generateMetadata };

export default async function SinglePropertyPage({
  params,
}: {
  params: Promise<paramsTypes>;
}) {
  const { property_id } = await params;
  const headers = getAuthHeaders();

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/property/${property_id}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
        },
      );

      const data = await response.json();
      return data.record;
    } catch (error) {}
  };
  const properties = await fetchProperty();

  if (!properties) {
    return (
      <section className="flex items-center justify-center w-full min-h-screen bg-gray-100">
        <p>Failed to load single properties.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto px-4 xl:px-24 py-8">
      <PropertyImage data={properties} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-3 xl:col-span-2">
          <DetailSection data={properties} />
          <Map data={properties.property} />
          <UnitAmenities data={properties} />
          <GeneralFacilities data={properties.property.facilities} />
          <MasterPlanSection data={properties} />
          <BuildingPlanSection
            plan={properties.property.plan}
            propertyPlanType={properties.property_plan_type}
          />
          <ContactUs />
        </div>

        <div className="col-span-3 xl:col-span-1 min-h-screen">
          <div className="sticky top-10">
            <InquiryContainer data={properties} />
          </div>
        </div>
      </div>
    </section>
  );
}
