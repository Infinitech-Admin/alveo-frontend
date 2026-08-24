import EmptyData from "@/components/fallback/emptydata";
import React from "react";

interface MapData {
  location: string;
}

interface MapDataProps {
  data: MapData;
}

const Map: React.FC<MapDataProps> = ({ data }) => {
  // data.location is a plain address string (e.g. "Poblacion, Makati City, Metro Manila"),
  // NOT a URL. We must build a proper Google Maps embed URL from it,
  // otherwise the browser resolves it as a relative path against the
  // current page — which re-loads this very page inside the iframe.
  const mapEmbedSrc = data.location
    ? `https://maps.google.com/maps?q=${encodeURIComponent(data.location)}&output=embed`
    : null;

  return (
    <div className="w-full rounded-xl h-[450px] py-8">
      {mapEmbedSrc ? (
        <iframe
          src={mapEmbedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl border-2 border-gray-700"
        />
      ) : (
        <div className="flex justify-center items-center w-full rounded-xl h-[450px] bg-gray-300">
          <EmptyData fallbackname="Location" />
        </div>
      )}
    </div>
  );
};

export default Map;
