"use client";
import React, { useState } from "react";
import {
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Select,
  SelectItem,
} from "@heroui/react";
import { Input, Slider } from "@heroui/react";
import { Button } from "@heroui/button";
import { FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface FilterPropertyModalProps {
  buttonLabel?: string;
}

const FilterPropertyModal: React.FC<FilterPropertyModalProps> = ({ buttonLabel }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState<string>("");
  const [unitType, setUnitType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    1000000, 50000000,
  ]);
  const router = useRouter();

  const unitOptions = [
    { value: "1", label: "1 Bedroom" },
    { value: "2", label: "2 Bedroom" },
    { value: "3", label: "Studio Type" },
  ];



  const handleSearch = (onClose: () => void) => {
    setLoading(true)
    const query = {
      location: location || "",
      unit_type: unitType || "",
      min_price: priceRange[0].toString(),
      max_price: priceRange[1].toString(),
    };
    const queryString = new URLSearchParams(query).toString();
    router.push(`/property-finder?${queryString}`);
  };

  return (
    <div>
      <Button className="text-white bg-green-700" radius="lg" variant="solid" onPress={onOpen}>
        <FaFilter /> {buttonLabel}
      </Button>
      <Drawer isDismissable={false} className="py-4 -z-50" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                What are you looking for?
              </DrawerHeader>
              <DrawerBody>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(onClose);
                  }}
                >
                  <Input
                    size="lg"
                    label="Enter Location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                  <Select
                    size="lg"
                    label="Select Unit/PS Type"
                    value={unitType || ""}
                    onChange={(e) => setUnitType(e.target.value)}
                  >
                    {unitOptions.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Slider
                    className="max-w-md"
                    formatOptions={{ style: "currency", currency: "PHP" }}
                    label="Price Range"
                    maxValue={50000000}
                    minValue={1000000}
                    step={100000}
                    value={priceRange}
                    onChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                  />

                  <Button isLoading={loading} color="primary" size="lg" type="submit">
                    Search Property
                  </Button>
                </form>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FilterPropertyModal;