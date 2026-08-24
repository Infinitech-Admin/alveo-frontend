export type SiteConfig = typeof siteConfig;

type NavMenuLink = {
  label: string;
  href: string;
  download?: boolean;
  disabled?: boolean;
};

export const siteConfig = {
  name: "Alveo Land | Real Estate Philippines",
  description:
    "Welcome to Alveo Land's official website. Explore prime house and lots, real estate properties, and condos for sale in the Philippines. Learn more today!",
  navItems: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Properties", href: "/properties" },
    { label: "Agent", href: "/agent" },
    { label: "Contact Us", href: "/contact" },
  ],

  navMenuItems: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Properties", href: "/properties" },
    { label: "Agent", href: "/agent" },
    { label: "Contact Us", href: "/contact" },
  ],

  navMenuItemsLinks: [
    {
      label: "Customer Reservation Form",
      href: "http://apps.alveoland.com.ph/OnlineCRF/Main?ac=EL25650",
      disabled: true, // CSRF-safe flow not ready yet — gated
    },
    {
      label: "Set Appointment",
      href: "/appointment",
    },
    // Room Planner temporarily disabled
    // {
    //   label: "Room Planner",
    //   href: "/room-planner",
    // },
    {
      label: "Loan Calculator",
      href: "/calculator",
    },
    {
      label: "Apply Now",
      href: "/career",
    },
  ] as NavMenuLink[],

  links: {
    crf: "http://apps.alveoland.com.ph/OnlineCRF/Main?ac=EL25650",
    loancalculator: "/calculator",
    appointment: "/appointment",
    planner: "/room-planner",
    download: "alveo-application.apk",
    career: "/career",
    agent: "/agent",
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
