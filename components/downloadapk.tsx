import { Link } from "@heroui/link";
import React from "react";
import { LuDownload } from "react-icons/lu";

const menuItems = [
  {
    key: "apk-download",
    label: "Download App",
    icon: <LuDownload className="text-md text-white" />,
    link: "dmci-application.apk",
    download: true,
  },
];

const DownloadApk = () => {
  return (
    <div className="flex items-center gap-2">
      {menuItems.map((item) => (
        <Link
          key={item.key}
          className="flex items-center gap-2 px-4 py-2 text-md  text-white rounded-md hover:bg-blue-600 transition"
          download={item.download ? true : undefined}
          href={item.link}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default DownloadApk;
