"use client";

import React, { useState } from "react";
import {
  Select,
  SelectItem,
  Card,
  CardBody,
  Input,
  Slider,
  Button,
  Divider,
} from "@heroui/react";
import { useRouter } from "next/navigation";

const FilterPropertyModal = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [types, setTypes] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    1000000,
    50000000,
  ]);

  const router = useRouter();

  const options = [
    "Studio",
    "1 Bedroom",
    "2 Bedroom",
    "3 Bedroom",
    "Tandem Unit",
    "Studio w/ Parking",
    "1 Bedroom w/ Parking",
    "2 Bedroom w/ Parking",
    "3 Bedroom w/ Parking",
    "Tandem Unit w/ Parking",
    "Studio w/ Tandem Parking",
    "1 Bedroom w/ Tandem Parking",
    "2 Bedroom w/ Tandem Parking",
    "3 Bedroom w/ Tandem Parking",
    "Tandem Unit w/ Tandem Parking",
    "1 Parking Slot",
    "Tandem Parking",
  ];

  const handleSearch = () => {
    setLoading(true);

    const query = {
      location: location.trim(),
      types,
      min_price: priceRange[0].toString(),
      max_price: priceRange[1].toString(),
    };

    const queryString = new URLSearchParams(query).toString();

    router.push(`/property-finder?${queryString}`);
  };

  return (
    <Card className="w-full rounded-2xl border border-white/40 bg-white/20 shadow-xl backdrop-blur-xl">
      <CardBody className="p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            What are you looking for?
          </h2>

          <Divider className="mt-3 bg-white/30" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end"
        >
          {/* Location */}
          <div className="sm:col-span-1 lg:col-span-3">
            <Input
              size="lg"
              label="Enter Location"
              placeholder="e.g. Makati"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              classNames={{
                inputWrapper: "bg-white/80",
              }}
            />
          </div>

          {/* Unit Type */}
          <div className="sm:col-span-1 lg:col-span-3">
            <Select
              size="lg"
              label="Select Unit / PS Type"
              selectedKeys={types ? [types] : []}
              onChange={(e) => setTypes(e.target.value)}
              classNames={{
                trigger: "bg-white/80",
              }}
              popoverProps={{
                classNames: {
                  content: "max-h-[300px]",
                },
              }}
            >
              {options.map((option) => (
                <SelectItem key={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Price Range */}
          <div className="flex min-h-[64px] flex-col justify-center rounded-xl px-2 sm:col-span-2 lg:col-span-4">
            <Slider
              className="w-full"
              label="Price Range"
              formatOptions={{
                style: "currency",
                currency: "PHP",
                maximumFractionDigits: 0,
              }}
              minValue={1000000}
              maxValue={50000000}
              step={100000}
              value={priceRange}
              onChange={(value) =>
                setPriceRange(value as [number, number])
              }
              classNames={{
                label: "text-white",
                value: "text-white",
              }}
            />
          </div>

          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Button
              isLoading={loading}
              size="lg"
              type="submit"
              className="w-full bg-[#192D4D] text-white font-semibold shadow-md transition-all hover:bg-[#192D4D] hover:scale-[1.02]"
            >
              Search Property
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default FilterPropertyModal;