import {
  HomeModernIcon,
  FireIcon,
  WifiIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  KeyIcon,
  TvIcon,
  BeakerIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  SunIcon,
  BuildingOffice2Icon,
  TruckIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  GiftIcon,
  CameraIcon,
  ArrowsPointingOutIcon,
  WrenchIcon,
  BuildingStorefrontIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowPathRoundedSquareIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  ClockIcon,
  PresentationChartLineIcon,
  UsersIcon,Squares2X2Icon,CubeIcon
} from "@heroicons/react/24/outline";

export type AmenityItem = {
  item: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const allAmenities: AmenityItem[] = [
  {item: "Ceiling Fans", icon: ArrowPathRoundedSquareIcon }, // air circulation
  { item: "Swimming Pool", icon: SparklesIcon }, // water-like sparkle
  { item: "Gym", icon: BoltIcon }, // strength/power
  { item: "Garden", icon: GlobeAltIcon }, // nature-related
  { item: "Air Conditioning", icon: SunIcon }, // temperature/light
  { item: "Balcony", icon: EyeIcon }, // view from balcony
  { item: "Fireplace", icon: FireIcon }, // exact match
  { item: "Washer/Dryer", icon: WrenchScrewdriverIcon }, // appliance/utility
  { item: "Dishwasher", icon: WrenchIcon }, // plumbing/appliance
  { item: "Microwave", icon: BoltIcon }, // power/heating
  { item: "Refrigerator", icon: CubeIcon }, // storage/cool shape (needs manual import)
  { item: "Elevator", icon: ArrowsPointingOutIcon }, // up/down motion
  { item: "Pet Friendly", icon: UserGroupIcon  }, // pet symbol (custom, needs manual icon or emoji fallback)
  { item: "Furnished", icon: GiftIcon }, // pre-packaged = furnished
  { item: "Wi-Fi", icon: WifiIcon }, // exact match
  { item: "Security System", icon: ShieldCheckIcon }, // security shield
  { item: "Storage", icon: BuildingStorefrontIcon }, // place to store
  { item: "Hot Tub", icon: FireIcon }, // heat
  { item: "Sauna", icon: FireIcon }, // again heat
  { item: "Outdoor BBQ Area", icon: FireIcon }, // fire-based cooking
  { item: "Guest House", icon: HomeModernIcon }, // small house
  { item: "Home Theater", icon: TvIcon }, // media display
  { item: "Smart Home Features", icon: DevicePhoneMobileIcon }, // mobile/device control
  { item: "Private Beach Access", icon: GlobeAltIcon }, // outdoor/nature
  { item: "Walk-in Closet", icon: ArrowPathRoundedSquareIcon }, // indoor loop
  { item: "Granite Countertops", icon: ChartBarIcon }, // style/data metaphor
  { item: "Hardwood Floors", icon: Squares2X2Icon }, // floor-like pattern (needs import)
  { item: "Waterfront", icon: GlobeAltIcon }, // water/earth symbol
  { item: "Mountain View", icon: EyeIcon }, // scenic
  { item: "City View", icon: BuildingOffice2Icon }, // city
  { item: "Double Glazed Windows", icon: Squares2X2Icon }, // window/grid symbol
  { item: "Electric Vehicle Charging Station", icon: BoltIcon }, // electricity
  { item: "Game Room", icon: PuzzlePieceIcon }, // fun/games
  { item: "On-site Maintenance", icon: WrenchIcon }, // tools
  { item: "24/7 Concierge Service", icon: UsersIcon }, // people/service
  { item: "Business Center", icon: PresentationChartLineIcon }, // work/meeting
  { item: "Clubhouse", icon: BuildingLibraryIcon }, // facility/building
];



export const getAmenity = (name: string): AmenityItem | undefined =>
  allAmenities.find((amenity) => amenity.item === name);